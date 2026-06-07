#!/usr/bin/env bash
set -euo pipefail

# Usage:
#   ./deploy/deploy-prod.sh [--follow]
#
# Deploys resume-site to production server via SSH.
# Rsyncs the full project (including .env.prod) then rebuilds and restarts
# Docker Compose services remotely.

FOLLOW=0
for arg in "$@"; do
  case "$arg" in
    --follow) FOLLOW=1 ;;
    *)
      echo "ERROR: unknown argument: $arg"
      echo "Usage: $0 [--follow]"
      exit 1
      ;;
  esac
done

# ── Local pre-flight checks ──────────────────────────────────────────────────

DEPLOY_ENV_FILE="${DEPLOY_ENV_FILE:-deploy/deploy.prod.env}"
if [[ ! -f "${DEPLOY_ENV_FILE}" ]]; then
  echo "ERROR: ${DEPLOY_ENV_FILE} not found. Create it from deploy/deploy.prod.env.example"
  exit 1
fi

# shellcheck disable=SC1090
source "${DEPLOY_ENV_FILE}"

SERVER_HOST="${SERVER_HOST:-}"
SERVER_USER="${SERVER_USER:-}"
SERVER_PATH="${SERVER_PATH:-/opt/resume-site}"
SSH_PORT="${SSH_PORT:-22}"
SSH_KEY_PATH="${SSH_KEY_PATH:-}"

if [[ -z "${SERVER_HOST}" || -z "${SERVER_USER}" ]]; then
  echo "ERROR: SERVER_HOST and SERVER_USER are required in ${DEPLOY_ENV_FILE}"
  exit 1
fi
if [[ -n "${SSH_KEY_PATH}" && ! -f "${SSH_KEY_PATH}" ]]; then
  echo "ERROR: SSH key not found at ${SSH_KEY_PATH}"
  exit 1
fi
if [[ ! -f "docker-compose.prod.yml" ]]; then
  echo "ERROR: run this script from the repo root"
  exit 1
fi

# .env.prod is synced to the server — verify it exists locally first
if [[ ! -f ".env.prod" ]]; then
  echo "ERROR: .env.prod not found locally. Create it from .env.prod.example and fill in real values."
  exit 1
fi

# ── SSH / rsync helpers ──────────────────────────────────────────────────────

SSH_CMD=(ssh -p "${SSH_PORT}")
RSYNC_SSH="ssh -p ${SSH_PORT}"
if [[ -n "${SSH_KEY_PATH}" ]]; then
  SSH_CMD+=(-i "${SSH_KEY_PATH}")
  RSYNC_SSH="ssh -i ${SSH_KEY_PATH} -p ${SSH_PORT}"
fi

# ── Rsync ────────────────────────────────────────────────────────────────────

echo "==> Syncing project to ${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}"

RSYNC_FLAGS=(-az --delete)
if [[ "${FOLLOW}" -eq 1 ]]; then
  RSYNC_FLAGS+=(-v --progress)
fi

rsync "${RSYNC_FLAGS[@]}" \
  --exclude='.git' \
  --exclude='.idea' \
  --exclude='.vscode' \
  --exclude='.claude' \
  --exclude='.obsidian' \
  --exclude='graphify-out' \
  --exclude='**/__pycache__' \
  --exclude='**/*.pyc' \
  --exclude='**/.venv' \
  --exclude='**/node_modules' \
  --exclude='**/.next' \
  --exclude='media' \
  --exclude='backend/media' \
  --exclude='.env' \
  --exclude='.env.local' \
  --exclude='*.log' \
  -e "${RSYNC_SSH}" \
  ./ "${SERVER_USER}@${SERVER_HOST}:${SERVER_PATH}/"

# ── Remote deployment ─────────────────────────────────────────────────────────

echo "==> Running remote deployment"

SSH_FLAGS=()
if [[ "${FOLLOW}" -eq 1 ]]; then
  SSH_FLAGS+=(-t)
fi

"${SSH_CMD[@]}" "${SSH_FLAGS[@]}" "${SERVER_USER}@${SERVER_HOST}" \
  "SERVER_PATH='${SERVER_PATH}' FOLLOW='${FOLLOW}' bash -s" <<'REMOTE_SCRIPT'
set -euo pipefail

cd "${SERVER_PATH}"

echo "==> Verifying .env.prod is present"
if [[ ! -f ".env.prod" ]]; then
  echo "ERROR: .env.prod not found at ${SERVER_PATH}/.env.prod (rsync should have synced it)"
  exit 1
fi

# ── Sudo detection ────────────────────────────────────────────────────────────
if [[ "$(id -u)" -eq 0 ]]; then
  SUDO=""
  echo "==> Running as root"
else
  if command -v sudo >/dev/null 2>&1; then
    SUDO="sudo"
    echo "==> Running with sudo"
  else
    echo "ERROR: current user is not root and sudo is not available"
    exit 1
  fi
fi

echo "==> Pulling base images from registry"
$SUDO docker compose -f docker-compose.prod.yml --env-file .env.prod pull || true

echo "==> Building and starting services"
$SUDO docker compose -f docker-compose.prod.yml --env-file .env.prod build --pull
$SUDO docker compose -f docker-compose.prod.yml --env-file .env.prod up -d --remove-orphans

# ── Wait for backend container to start ──────────────────────────────────────
# The entrypoint handles DB readiness, migrations, and collectstatic internally.
# We only need to confirm the container itself is running.

RETRY_COUNT=0
MAX_RETRIES=15

echo "==> Waiting for backend container to start"
until [ "$($SUDO docker inspect -f '{{.State.Status}}' resume_backend 2>/dev/null)" = "running" ]; do
  RETRY_COUNT=$((RETRY_COUNT + 1))
  if [[ $RETRY_COUNT -ge $MAX_RETRIES ]]; then
    echo "ERROR: Backend container failed to start"
    $SUDO docker compose -f docker-compose.prod.yml --env-file .env.prod logs --tail=50 backend
    exit 1
  fi
  echo "  waiting... ($RETRY_COUNT/$MAX_RETRIES)"
  sleep 2
done
echo "Backend container is running."

# ── Verify all containers are running ─────────────────────────────────────────
echo "==> Verifying containers"
EXPECTED_SERVICES=(
  resume_db
  resume_redis
  resume_backend
  resume_frontend
)

ALL_RUNNING=1
for service in "${EXPECTED_SERVICES[@]}"; do
  STATUS=$($SUDO docker inspect -f '{{.State.Status}}' "$service" 2>/dev/null || echo "missing")
  if [[ "$STATUS" != "running" ]]; then
    echo "ERROR: $service is not running (status: $STATUS)"
    $SUDO docker compose -f docker-compose.prod.yml --env-file .env.prod \
      logs --tail=50 "${service#resume_}" || true
    ALL_RUNNING=0
  fi
done

if [[ "$ALL_RUNNING" -ne 1 ]]; then
  echo "ERROR: Some containers failed to start"
  exit 1
fi

# ── Nginx reload (if applicable) ──────────────────────────────────────────────
if command -v nginx >/dev/null 2>&1 && command -v systemctl >/dev/null 2>&1; then
  echo "==> Reloading nginx"
  if $SUDO nginx -t; then
    $SUDO systemctl reload nginx
    echo "Nginx reloaded."
  else
    echo "Warning: nginx config test failed — skipping reload"
  fi
fi

echo "==> Deployment completed successfully"

if [[ "${FOLLOW}" -eq 1 ]]; then
  echo "==> Following logs (Ctrl+C to exit)"
  exec $SUDO docker compose -f docker-compose.prod.yml --env-file .env.prod logs -f
fi
REMOTE_SCRIPT

if [[ "${FOLLOW}" -eq 0 ]]; then
  echo "✅ Deploy finished successfully"
fi

#!/bin/sh
set -e

POSTGRES_HOST="${POSTGRES_HOST:-postgres}"
POSTGRES_PORT="${POSTGRES_PORT:-5432}"

echo "Waiting for database at ${POSTGRES_HOST}:${POSTGRES_PORT}..."
until python -c "
import socket, sys, os
host = os.environ['POSTGRES_HOST']
port = int(os.environ['POSTGRES_PORT'])
try:
    s = socket.create_connection((host, port), timeout=5)
    s.close()
except OSError as e:
    print(f'  {host}:{port} unreachable: {e}', flush=True)
    sys.exit(1)
"; do
  echo "  postgres not ready — retrying in 2s"
  sleep 2
done
echo "Database is ready."

echo "Running migrations..."
python manage.py migrate --noinput

echo "Starting Django development server..."
exec python manage.py runserver 0.0.0.0:8000

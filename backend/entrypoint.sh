#!/bin/sh
set -e

echo "Waiting for database..."
until python -c "
import dj_database_url, psycopg2, os
from decouple import config
url = config('DATABASE_URL')
p = dj_database_url.parse(url)
conn = psycopg2.connect(
    host=p['HOST'], port=p['PORT'] or 5432,
    dbname=p['NAME'], user=p['USER'], password=p['PASSWORD']
)
conn.close()
" 2>/dev/null; do
  echo "  postgres not ready — retrying in 2s"
  sleep 2
done
echo "Database is ready."

echo "Running migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting Gunicorn..."
exec gunicorn core.wsgi:application \
    --bind 0.0.0.0:8000 \
    --workers 4 \
    --timeout 120 \
    --access-logfile - \
    --error-logfile -

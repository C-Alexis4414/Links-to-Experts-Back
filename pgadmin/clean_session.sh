#!/bin/bash
apt-get update && apt-get install -y cron && rm -rf /var/lib/apt/lists/*
cp pgadmin-cron /etc/cron.d/pgadmin-cron
find /var/lib/pgadmin/sessions -type f -mtime +1 -exec rm -f {} \; -exec echo "{} deleted" >> /var/log/cleanup.log \;
echo "0 * * * * /scripts/clean_sessions.sh" > /etc/cron.d/cleanup
chmod 0644 /etc/cron.d/cleanup
crontab /etc/cron.d/cleanup
cron
exec /entrypoint.sh "$@"
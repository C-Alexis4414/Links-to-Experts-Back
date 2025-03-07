#!/bin/sh
copy_config() {
    echo "Copy the PGAdmin configuration file..."
    cp /pgadmin/YoulinkServer.json /var/lib/pgadmin/pgadmin4.db/YoulinkServer.json
    chmod 600 /pgadmin4/pgpass # Securing the password file
}
cleanup_sessions() {
    echo "Cleaning up PGAdmin sessions..."
    rm -rf /var/lib/pgadmin/sessions/*
}
cleanup_sessions
copy_config
exec /entrypoint.sh "$@" # Launch PGAdmin normally
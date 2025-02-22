echo "Copie du fichier de configuration PGAdmin..."
cp /pgadmin/YoulinkServer.json /var/lib/pgadmin/pgadmin4.db/YoulinkServer.json
chmod 600 /pgadmin4/pgpass # Securing the password file
exec /entrypoint.sh "$@" # Launch PGAdmin normally
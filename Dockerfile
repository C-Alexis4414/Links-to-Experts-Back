# Use the specific version of node
FROM node:lts-slim
# Mettre à jour les paquets et installer OpenSSL
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /code
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
FROM node:24.6.0-trixie-slim
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /code
COPY package*.json ./
COPY prisma ./prisma
RUN npm install
RUN npx prisma generate
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
# ---- Build stage ----
FROM node:current-alpine AS builder 
RUN apk add --no-cache openssl libc6-compat
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma
RUN npm ci
RUN npx prisma generate
COPY . .
RUN npm run build

# ---- Runtime stage ----
FROM node:current-alpine AS runner
RUN apk add --no-cache openssl
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./
ENV NODE_ENV production \
    PORT=3000 \
    JWT_SECRET=changeme \
    DATABASE_URL=postgresql://user:password@postgres:5432/mydb
EXPOSE 3000
CMD npx prisma migrate deploy && node ./dist/src/main.js
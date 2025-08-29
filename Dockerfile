# ---- Build stage ----
FROM node:current-alpine AS builder 
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Runtime stage ----
FROM node:current-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    PORT=3000 \
    JWT_SECRET=changeme \
    JWT_REFRESH_TOKEN=changeme2 \
    DATABASE_URL=postgresql://user:password@postgres:5432/mydb \
    YOUTUBE_API_KEY=my_youtube_api_key \
    URL_LINKEDIN_SCRAPER=my_linkedin_scraper_url \
    REQUEST_LINKEDIN_SCRAPER_HOST=my_request_linkedin_scraper_host \
    RAPID_API_KEY=my_rapid_api_key \
    POSTGRES_USER=user \
    POSTGRES_PASSWORD=password \
    POSTGRES_DB=mydb \
    PGADMIN_MAIL=my_pgadmin_mail \
    PGADMIN_PW=my_pgadmin_pw
COPY package*.json ./
RUN apk add --no-cache openssl
COPY --from=builder /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
RUN npm ci --omit=dev --ignore-scripts \
    && npx prisma generate
# RUN ls -R dist
EXPOSE 3000
CMD npx prisma migrate deploy && node ./dist/src/main.js
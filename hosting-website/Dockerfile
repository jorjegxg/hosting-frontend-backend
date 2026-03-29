FROM node:20-alpine AS builder
WORKDIR /app

ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_APP_MODE=production

ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_APP_MODE=$NEXT_PUBLIC_APP_MODE

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/app ./app
COPY --from=builder /app/next.config.ts ./next.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

ENV PORT=4001
EXPOSE 4001
CMD ["npm", "start"]

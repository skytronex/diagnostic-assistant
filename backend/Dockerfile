FROM node:20-slim
WORKDIR /usr/src/app
COPY backend/package.json backend/package-lock.json* ./
RUN npm ci --only=production || true
COPY backend/ .
ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "src/server.js"]

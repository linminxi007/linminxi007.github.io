FROM node:24-bookworm-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY src ./src
COPY schema.sql ./schema.sql
COPY note-paths.json ./note-paths.json
USER node
ENV NODE_ENV=production PORT=8080
EXPOSE 8080
CMD ["node", "src/main.mjs"]


FROM node:18-alpine
RUN apk add --no-cache openssl

EXPOSE 3000

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json* ./

# Use legacy-peer-deps to ignore React 19 conflict
RUN npm install --omit=dev --legacy-peer-deps && npm cache clean --force

# Remove CLI packages since we don't need them in production by default.
RUN npm remove @shopify/cli || true

COPY . .

RUN npm run build

CMD ["npm", "run", "docker-start"]

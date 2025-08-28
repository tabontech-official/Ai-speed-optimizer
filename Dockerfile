# Use lightweight Node 18 base image
FROM node:18-alpine

# Install required system packages
RUN apk add --no-cache openssl

# Set working directory
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Copy only package files first (better layer caching)
COPY package.json package-lock.json* ./

# Install production dependencies with legacy-peer-deps to fix React conflicts
RUN npm install --legacy-peer-deps && npm cache clean --force
# Remove Shopify CLI (not needed in production)
RUN npm remove @shopify/cli || true

# Copy application code
COPY . .

# Build Remix app
RUN npm run build

# Expose app port
EXPOSE 3000

# Default command to start container
CMD ["npm", "run", "docker-start"]

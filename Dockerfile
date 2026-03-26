# Use official Node.js image version 24 on Alpine Linux
# Alpine is a minimal Linux distro — keeps image size small
FROM node:24-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first
# This is a Docker caching trick — if dependencies haven't changed
# Docker reuses the cached layer and skips npm install
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy rest of application code
COPY . .

# Expose port 5000 to outside the container
EXPOSE 5000

# Command to start the server
CMD ["node", "server.js"]
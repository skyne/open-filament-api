# Dockerfile for Fastify API deployment
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy application files
COPY . .

# Create non-root user
RUN addgroup --system fastify && adduser --system -G fastify fastify
RUN chown -R fastify:fastify /app
USER fastify

# Expose port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]

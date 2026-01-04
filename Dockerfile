# Use Node.js base image
FROM node:18-slim

# Install FFmpeg and dependencies
RUN apt-get update && \
    apt-get install -y ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy application code
COPY server.js ./

# Create tmp directory for file processing
RUN mkdir -p /tmp/uploads

# Expose port
EXPOSE 3000

# Set environment variable
ENV NODE_ENV=production

# Start server
CMD ["node", "server.js"]

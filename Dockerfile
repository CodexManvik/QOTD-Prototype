# Use official Node.js 18 Alpine image for small footprint
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./

# Install dependencies (production only)
RUN npm size --omit=dev || npm install --production

# Copy the rest of the application
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "src/server.js"]

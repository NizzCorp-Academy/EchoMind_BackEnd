# Use specific Node.js slim version
FROM node:20.19.1-slim

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock* ./
RUN yarn install --production

# Copy source and prebuilt dist folder
COPY . .

# Run the compiled JavaScript (assuming it's already built)
CMD ["node", "dist/server.js"]

# Expose the port your app uses
EXPOSE 3000

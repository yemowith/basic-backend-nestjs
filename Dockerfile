# Use official Node.js image with Debian (not Alpine)
FROM node:20

WORKDIR /app

# Install system dependencies required for canvas
RUN apt-get update && apt-get install -y \
  python3 \
  make \
  g++ \
  libcairo2-dev \
  libpango1.0-dev \
  libjpeg-dev \
  libgif-dev \
  librsvg2-dev \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the app
RUN npm run build

# Expose app port
EXPOSE 2025

# Run app
CMD ["node", "dist/main"]

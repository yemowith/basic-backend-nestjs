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

# Generate Prisma client (DATABASE_URL not needed for generate, but prisma.config.ts requires it)
# Using a dummy URL for build time
RUN  npx prisma generate

# Build the app
RUN npm run build

# Debug: Check what was built
RUN echo "=== Checking dist structure ===" && \
    if [ -d dist ]; then \
      echo "dist exists" && \
      find dist -name "main*" -type f && \
      echo "=== All files in dist ===" && \
      find dist -type f | head -10; \
    else \
      echo "ERROR: dist not found!" && exit 1; \
    fi

# Define build argument for port
ARG PORT=3000

# Expose app port (uses PORT from environment or defaults to 3000)
EXPOSE ${PORT}

# Run app
CMD ["npm", "run", "start:prod"]

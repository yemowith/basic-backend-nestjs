# Basic Backend - NestJS

A basic NestJS backend application with API documentation, authentication, and database integration.

## Features

- 🚀 **NestJS Framework** - Progressive Node.js framework
- 📚 **Swagger Documentation** - Interactive API documentation
- 🔐 **JWT Authentication** - Bearer token authentication
- 🗄️ **Prisma ORM** - Type-safe database access
- ✅ **Validation** - Request validation with class-validator
- 🌐 **CORS Enabled** - Cross-origin resource sharing
- 📝 **TypeScript** - Type-safe development

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- PostgreSQL (or your preferred database)

## Installation

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
JWT_SECRET="your-secret-key"
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod

# Debug mode
npm run start:debug
```

## API Documentation

Once the application is running, access the Swagger documentation at:

- **Swagger UI**: http://localhost:3000/docs
- **API Base URL**: http://localhost:3000/api/v1

## Available Scripts

```bash
# Development
npm run start:dev      # Start in watch mode
npm run start:debug    # Start in debug mode

# Production
npm run build          # Build the application
npm run start:prod     # Start production server

# Code Quality
npm run lint           # Run ESLint
npm run format         # Format code with Prettier

# Testing
npm run test           # Run unit tests
npm run test:watch     # Run tests in watch mode
npm run test:cov       # Run tests with coverage
npm run test:e2e       # Run end-to-end tests

# Commands
npm run command        # Run CLI commands
```

## Project Structure

```
src/
├── api/              # API modules and controllers
├── clients/          # External service clients (Prisma, etc.)
├── commands/         # CLI commands
├── config/           # Configuration files
├── main.ts           # Application entry point
└── app.module.ts     # Root module
```

## API Endpoints

All API endpoints are prefixed with `/api/v1`.

### Authentication

The API uses JWT Bearer token authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-token>
```

## Database

This project uses Prisma as the ORM. To work with the database:

```bash
# View database in Prisma Studio
npx prisma studio

# Create a new migration
npx prisma migrate dev

# Reset database
npx prisma migrate reset
```

## License

UNLICENSED

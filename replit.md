# TDS Virtual TA - Replit Project Guide

## Overview

This is a TDS (Tools in Data Science) Virtual Teaching Assistant application that automatically answers student questions based on course content and Discourse posts. The system provides an intelligent Q&A interface for TDS course students, helping to reduce the load on teaching assistants while providing instant, accurate responses.

## System Architecture

### Full-Stack Structure
- **Frontend**: React-based SPA using Vite as the build tool
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for schema management
- **Deployment**: Configured for both Replit and Vercel hosting
- **UI Framework**: Shadcn/ui components with Tailwind CSS

### Key Technologies
- **Runtime**: Node.js 20 with ESM modules
- **Database ORM**: Drizzle with PostgreSQL dialect
- **Query Management**: TanStack Query for client-side data fetching
- **Styling**: Tailwind CSS with CSS variables for theming
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: Wouter for client-side routing

## Key Components

### Backend Services
- **Virtual TA Service**: Core question processing logic with knowledge base
- **Storage Layer**: Abstracted storage interface with in-memory implementation
- **API Routes**: RESTful endpoints for question submission and processing
- **Validation**: Zod schemas for request/response validation

### Frontend Components
- **Dashboard**: Main interface for submitting questions and viewing responses
- **UI Components**: Complete Shadcn/ui component library integration
- **Query Client**: Centralized API request handling with error management

### Database Schema
- **Users Table**: Basic user authentication structure
- **Questions Table**: Logging and storage of Q&A interactions
- **Validation Schemas**: Type-safe data validation throughout the stack

## Data Flow

1. **Question Submission**: User submits question through React frontend
2. **Validation**: Zod schema validates request format and required fields
3. **Processing**: Virtual TA service matches question against knowledge base
4. **Response Generation**: System returns structured answer with relevant links
5. **Logging**: Question and response are stored in database for analytics
6. **UI Update**: Frontend displays response with proper formatting and links

## External Dependencies

### Production Dependencies
- **Database**: Neon Database serverless PostgreSQL
- **UI Library**: Radix UI primitives for accessible components
- **Validation**: Zod for runtime type checking
- **HTTP Client**: Built-in fetch with custom error handling

### Development Dependencies
- **Build Tools**: Vite for frontend bundling, ESBuild for backend
- **Type Checking**: TypeScript with strict configuration
- **Development Server**: Hot reload enabled for both frontend and backend

## Deployment Strategy

### Replit Configuration
- **Environment**: Node.js 20 with PostgreSQL 16 module
- **Development**: Auto-restart on file changes with port 5000
- **Build Process**: Parallel frontend and backend building
- **Database**: Environment variable-based connection string

### Vercel Configuration
- **API Routes**: Serverless functions with 30-second timeout
- **Static Assets**: Optimized frontend build serving
- **Environment**: Production-ready with proper error handling

### Database Management
- **Migrations**: Drizzle Kit for schema versioning
- **Connection**: Pooled connections via Neon serverless driver
- **Schema Push**: Direct schema synchronization for development

## Changelog

```
Changelog:
- June 14, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```
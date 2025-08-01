# MoneyBoard - Smart Lending Tracker

## Overview

MoneyBoard is a modern financial tracking application designed for managing personal loans and lending activities. The application provides a comprehensive dashboard for tracking lending transactions, borrowing activities, payment schedules, and financial analytics. Built with a focus on user experience and financial data visualization, it helps users maintain organized records of their lending and borrowing activities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Framework**: shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with a custom financial theme featuring blues and greens, CSS variables for theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Forms**: React Hook Form with Zod validation for type-safe form handling
- **Charts**: Recharts library for financial data visualization (bar charts, pie charts)

### Backend Architecture
- **Runtime**: Node.js with Express.js server framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for development server with hot reloading
- **Build**: esbuild for production bundling with platform-specific optimizations
- **Storage**: Modular storage interface supporting multiple implementations (currently in-memory, designed for PostgreSQL)

### Database & Schema Design
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Database**: Configured for PostgreSQL (Neon serverless) with connection pooling
- **Schema Management**: Centralized schema definitions in `/shared/schema.ts` with Zod validation
- **Migrations**: Drizzle Kit for database migrations and schema changes
- **Data Models**: Users table with extensible schema for future financial entities

### Development & Build Pipeline
- **Monorepo Structure**: Shared code between client and server with path aliases
- **Development Server**: Vite dev server with Express API integration
- **Hot Reloading**: Full-stack hot reloading with error overlay
- **Static Assets**: Vite handles client assets, Express serves API endpoints
- **Production Build**: Separate builds for client (Vite) and server (esbuild)

### Component Architecture
- **Design System**: Financial-themed component library with consistent styling
- **Layout Components**: Responsive layout with mobile-first design approach
- **Feature Components**: Modular components for Dashboard, Loan Management, and Analytics
- **UI Components**: Comprehensive shadcn/ui component set with custom financial variants

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe SQL query builder and ORM
- **@tanstack/react-query**: Server state management and data fetching
- **@hookform/resolvers**: Form validation with Zod integration

### UI & Styling
- **@radix-ui/react-***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework with custom financial theme
- **class-variance-authority**: Type-safe component variants
- **lucide-react**: Modern icon library

### Development Tools
- **tsx**: TypeScript execution for development
- **vite**: Fast build tool and development server
- **esbuild**: JavaScript bundler for production builds
- **drizzle-kit**: Database migration and introspection tool

### Charts & Visualization
- **recharts**: React charting library for financial data visualization
- **embla-carousel-react**: Touch-friendly carousel component

### Form & Validation
- **react-hook-form**: Performant forms with minimal re-renders
- **zod**: TypeScript-first schema validation
- **date-fns**: Date manipulation and formatting utilities

### Session & Authentication
- **connect-pg-simple**: PostgreSQL session store (configured but not yet implemented)
- **nanoid**: Secure unique ID generation
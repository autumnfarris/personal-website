# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build and Development Commands
- `npm run dev`: Run development server with turbopack
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint

## Code Style Guidelines
- Use TypeScript with strict mode enabled
- Follow Next.js App Router conventions
- Use TailwindCSS for styling
- Use path alias `@/*` for imports (e.g., `import { Component } from '@/components/Component'`)
- Use functional components with React hooks
- Use named exports for components, types, and utilities
- Follow kebab-case for file names and PascalCase for component names
- Handle errors with try/catch and appropriate UI feedback
- Add proper type annotations for all variables, parameters, and return types
- Maintain JSX readability with proper indentation and line breaks

## Project Structure
- Place shared components in `app/components`
- Put utility functions in `app/lib`
- Keep page components in `app/(routes)`
- Store types in `app/types`
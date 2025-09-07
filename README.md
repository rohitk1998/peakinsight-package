# PeakInsight Package App

A modern React application built with TypeScript and SCSS, powered by Vite.

## Features

- ⚡ **Vite** - Fast development server and build tool
- ⚛️ **React 18** - Latest React with TypeScript support
- 🎨 **SCSS** - CSS with superpowers and CSS Modules
- 📦 **ESLint** - Code quality and consistency
- 🔧 **Hot Module Replacement** - Instant feedback during development

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── assets/          # Static assets (images, icons, etc.)
├── components/      # React components
├── styles/          # SCSS styles and variables
├── main.tsx        # Application entry point
└── vite-env.d.ts   # Vite type definitions
```

## Styling

This project uses SCSS with CSS Modules for component-scoped styling. Global variables are defined in `src/styles/variables.scss` and are automatically imported in all SCSS files.

## TypeScript

The project is fully configured with TypeScript for type safety and better development experience. Type definitions are included for React and Vite.

## Contributing

1. Follow the existing code style
2. Run `npm run lint` before committing
3. Ensure all TypeScript types are properly defined



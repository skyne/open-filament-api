# Open Filament API - Frontend

A modern Next.js frontend for managing 3D printing filament inventory. Built with React, TypeScript, and Tailwind CSS.

## Features

- 🎨 **Modern UI**: Clean, responsive design using Tailwind CSS
- 📱 **Mobile-friendly**: Responsive design that works on all devices
- 🔗 **API Integration**: Full integration with the Open Filament API backend
- 🚀 **Real-time Updates**: Dynamic data loading and state management
- 📋 **CRUD Operations**: Create, read, update, and delete filaments
- 🏷️ **Type Management**: Browse and filter filaments by type
- ⚡ **Fast**: Built with Next.js 14 and optimized for performance

## Pages

### Home Page (`/`)
- Landing page with navigation to key features
- Overview of the filament management system

### Filament List (`/filaments`)
- View all filaments in your inventory
- Filter and search capabilities
- Quick actions for edit/delete

### Add Filament (`/filaments/create`)
- Form to add new filaments to inventory
- Type selection with descriptions
- Validation and error handling

### Filament Detail (`/filaments/[id]`)
- Detailed view of individual filaments
- Edit and delete actions
- Related information and quick links

### Filament Types (`/filaments/types`)
- Educational page about different filament types
- Printing temperatures and properties
- Common applications for each type

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Build Tool**: Nx
- **Package Manager**: npm

## API Integration

The frontend communicates with the Fastify API backend running on port 3000. Key endpoints:

- `GET /api/v1/filament` - Get all filaments
- `POST /api/v1/filament` - Create new filament
- `GET /api/v1/filament/:id` - Get filament by ID
- `PATCH /api/v1/filament/:id` - Update filament
- `DELETE /api/v1/filament/:id` - Delete filament
- `GET /api/v1/filament/type/:type` - Get filaments by type

## Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Running API service on port 3000

### Getting Started

1. **Install dependencies** (from workspace root):
   ```bash
   npm install
   ```

2. **Start the API service**:
   ```bash
   npx nx serve api-service
   ```

3. **Start the frontend**:
   ```bash
   npx nx serve frontend-web
   ```

4. **Open your browser**:
   Navigate to `http://localhost:4200`

### VS Code Tasks

Use the included VS Code tasks for development:

- **Serve Frontend**: Start the development server
- **Serve API**: Start the API backend
- **Build Frontend**: Create production build
- **Build API**: Build the API service

### Environment Variables

Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Project Structure

```
apps/frontend-web/
├── src/
│   ├── app/                     # Next.js App Router pages
│   │   ├── filaments/          # Filament management pages
│   │   │   ├── create/         # Add new filament
│   │   │   ├── types/          # Filament types info
│   │   │   └── [id]/           # Individual filament detail
│   │   ├── global.css          # Global styles with Tailwind
│   │   ├── layout.tsx          # Root layout component
│   │   └── page.tsx            # Home page
│   └── lib/
│       └── api-client.ts       # API integration layer
├── .env.local                  # Environment variables
├── next.config.js              # Next.js configuration
├── postcss.config.js           # PostCSS configuration
├── project.json                # Nx project configuration
└── tailwind.config.js          # Tailwind CSS configuration
```

## API Client

The `api-client.ts` file provides a clean interface for backend communication:

```typescript
import { filamentApi } from '../lib/api-client';

// Get all filaments
const filaments = await filamentApi.getAllFilaments();

// Create new filament
const newFilament = await filamentApi.createFilament({
  name: "PLA Red",
  type: { id: "pla" }
});
```

## Styling

The application uses Tailwind CSS for styling with:

- Utility-first CSS approach
- Responsive design patterns
- Modern color schemes and typography
- Form components with @tailwindcss/forms plugin

## Error Handling

- Network error handling with user-friendly messages
- Form validation and error display
- Loading states for better UX
- Graceful fallbacks when API is unavailable

## Building for Production

```bash
# Build the frontend
npx nx build frontend-web

# The build output will be in dist/apps/frontend-web
```

## Contributing

1. Follow the existing code style and conventions
2. Use TypeScript for type safety
3. Add error handling for new features
4. Test with the API service running
5. Ensure responsive design principles

## License

MIT License - see the workspace root for details.

# MongoDB Models Documentation

## Overview
This document describes the comprehensive MongoDB models for the Open Filament Database, designed to capture all aspects of 3D printing filament data as shown in the database diagram.

## Database Collections

### 1. Materials (`materials`)
Stores basic material types and their specifications.
```typescript
{
  _id: ObjectId,
  type: string,           // Material type (PLA, ABS, PETG, etc.)
  diameter: number,       // Filament diameter in mm
  created_at: Date,
  updated_at: Date
}
```

### 2. Manufacturers (`manufacturers`)
Stores filament manufacturer/brand information.
```typescript
{
  _id: ObjectId,
  vendor: string,         // Manufacturer name
  website?: string,       // Manufacturer website
  logo?: string,          // Logo URL/path
  created_at: Date,
  updated_at: Date
}
```

### 3. Filaments (`filaments`)
Core filament data with all essential properties.
```typescript
{
  _id: ObjectId,
  name: string,           // Filament product name
  material: string,       // Reference to Material._id
  brand: string,          // Reference to Manufacturer._id
  hex: string,            // Color hex code (#RRGGBB)
  ral?: string,           // RAL color code (optional)
  hotend_min: number,     // Minimum hotend temperature
  hotend_max: number,     // Maximum hotend temperature
  bed_min: number,        // Minimum bed temperature
  bed_max: number,        // Maximum bed temperature
  created_at: Date,
  updated_at: Date
}
```

### 4. Filament Types (`filament_types`)
Categorization of filament types.
```typescript
{
  _id: ObjectId,
  name: string,           // Type name (Standard, Specialty, etc.)
  description?: string,   // Optional description
  created_at: Date,
  updated_at: Date
}
```

### 5. Filament Tech (`filament_tech`)
Technical specifications and material properties.
```typescript
{
  _id: ObjectId,
  density: number,                    // Material density
  vicat: number,                      // Vicat softening point
  hdt: number,                        // Heat deflection temperature
  melting_temp: number,               // Melting temperature
  melt_index: string,                 // Melt flow index
  tensile_strength: string,           // Tensile strength
  breaking_elongation_rate: string,   // Elongation at break
  bending_modulus: string,            // Flexural modulus
  bending_strength: string,           // Flexural strength
  impact_strength: string,            // Impact strength
  created_at: Date,
  updated_at: Date
}
```

### 6. Nozzles (`nozzles`)
Nozzle specifications for tuning parameters.
```typescript
{
  _id: ObjectId,
  size: number,           // Nozzle diameter in mm
  type: string,           // Nozzle type/material
  created_at: Date,
  updated_at: Date
}
```

### 7. Filament Tunes (`filament_tunes`)
Printer tuning parameters for specific filament/nozzle combinations.
```typescript
{
  _id: ObjectId,
  nozzle: string,         // Reference to Nozzle._id
  pa_value: number,       // Pressure advance value
  pa_speed: number,       // Pressure advance speed
  retract_speed: number,  // Retraction speed
  retract_length: number, // Retraction length
  volumetric_flow: number,// Maximum volumetric flow rate
  volumetric_temp: number,// Temperature for volumetric flow
  created_at: Date,
  updated_at: Date
}
```

### 8. Spools (`spools`)
Spool specifications and dimensions.
```typescript
{
  _id: ObjectId,
  type: string,           // Spool type identifier
  weight: number,         // Spool weight in grams
  diameter: number,       // Outer diameter in mm
  inner_diameter: number, // Inner diameter in mm
  depth: number,          // Spool width/depth in mm
  created_at: Date,
  updated_at: Date
}
```

### 9. Flushing Volumes (`flushing_volumes`)
Multi-material printing transition volumes.
```typescript
{
  _id: ObjectId,
  from: string,           // Source filament (Filament._id)
  to: string,             // Target filament (Filament._id)
  value: number,          // Flushing volume in mm³
  long_retract_length: number, // Long retraction length
  created_at: Date,
  updated_at: Date
}
```

## Key Features

### Validation
- Temperature ranges are validated (min < max)
- Hex color codes must match pattern `/^#[0-9A-Fa-f]{6}$/`
- All numeric values have minimum constraints

### Indexes
- Compound index on `filaments.material + filaments.brand` for efficient queries
- Index on `filament_tunes.nozzle` for tuning parameter lookups
- Unique compound index on `flushing_volumes.from + flushing_volumes.to`

### Relationships
- String-based references between collections for flexibility
- References maintained through application logic rather than MongoDB refs

## API Integration

The models are fully integrated with:
- **Service Layer**: Business logic and validation
- **Repository Layer**: Data access and mapping
- **API Layer**: REST endpoints for CRUD operations
- **Type Safety**: Full TypeScript support throughout the stack

This comprehensive model structure supports the community-driven Open Filament Database vision, allowing users to share detailed filament properties, slicer profiles, and printing experiences.

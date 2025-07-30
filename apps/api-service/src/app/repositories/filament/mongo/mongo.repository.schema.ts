import mongoose, { Schema } from 'mongoose';
import {
  RepositoryFilament,
  RepositoryFilamentType,
  RepositoryFilamentTech,
  RepositoryNozzle,
  RepositoryFilamentTune,
  RepositorySpool,
  RepositoryFlushingVolume
} from '../repository.model';

// Filament Schema
const FilamentSchema = new Schema<RepositoryFilament>({
  name: { type: String, required: true },
  material: { type: String, required: true },
  brand: { type: String, required: true },
  hex: { type: String, required: true, match: /^#[0-9A-Fa-f]{6}$/ },
  ral: { type: String, required: false },
  hotend_min: { type: Number, required: true, min: 0 },
  hotend_max: { type: Number, required: true, min: 0 },
  bed_min: { type: Number, required: true, min: 0 },
  bed_max: { type: Number, required: true, min: 0 }
}, {
  collection: 'filaments',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Filament Type Schema
const FilamentTypeSchema = new Schema<RepositoryFilamentType>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: false }
}, {
  collection: 'filament_types',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Filament Tech Schema (Technical specifications)
const FilamentTechSchema = new Schema<RepositoryFilamentTech>({
  density: { type: Number, required: true, min: 0 },
  vicat: { type: Number, required: true, min: 0 },
  hdt: { type: Number, required: true, min: 0 },
  melting_temp: { type: Number, required: true, min: 0 },
  melt_index: { type: String, required: true },
  tensile_strength: { type: String, required: true },
  breaking_elongation_rate: { type: String, required: true },
  bending_modulus: { type: String, required: true },
  bending_strength: { type: String, required: true },
  impact_strength: { type: String, required: true }
}, {
  collection: 'filament_tech',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Nozzle Schema
const NozzleSchema = new Schema<RepositoryNozzle>({
  size: { type: Number, required: true, min: 0 },
  type: { type: String, required: true }
}, {
  collection: 'nozzles',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Filament Tune Schema (Printer tuning parameters)
const FilamentTuneSchema = new Schema<RepositoryFilamentTune>({
  nozzle: { type: String, required: true },
  pa_value: { type: Number, required: true, min: 0 },
  pa_speed: { type: Number, required: true, min: 0 },
  retract_speed: { type: Number, required: true, min: 0 },
  retract_length: { type: Number, required: true, min: 0 },
  volumetric_flow: { type: Number, required: true, min: 0 },
  volumetric_temp: { type: Number, required: true, min: 0 }
}, {
  collection: 'filament_tunes',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Spool Schema
const SpoolSchema = new Schema<RepositorySpool>({
  type: { type: String, required: true },
  weight: { type: Number, required: true, min: 0 },
  diameter: { type: Number, required: true, min: 0 },
  inner_diameter: { type: Number, required: true, min: 0 },
  depth: { type: Number, required: true, min: 0 }
}, {
  collection: 'spools',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Flushing Volume Schema (Multi-material printing)
const FlushingVolumeSchema = new Schema<RepositoryFlushingVolume>({
  from: { type: String, required: true },
  to: { type: String, required: true },
  value: { type: Number, required: true, min: 0 },
  long_retract_length: { type: Number, required: true, min: 0 }
}, {
  collection: 'flushing_volumes',
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

// Add validation for temperature ranges
FilamentSchema.pre('save', function(next) {
  if (this.hotend_min >= this.hotend_max) {
    next(new Error('Hotend minimum temperature must be less than maximum'));
  } else if (this.bed_min >= this.bed_max) {
    next(new Error('Bed minimum temperature must be less than maximum'));
  } else {
    next();
  }
});

// Add compound indexes for better query performance
FilamentSchema.index({ material: 1, brand: 1 });
FilamentTuneSchema.index({ nozzle: 1 });
FlushingVolumeSchema.index({ from: 1, to: 1 }, { unique: true });

// Export models
export const FilamentModel = mongoose.model<RepositoryFilament>('Filament', FilamentSchema);
export const FilamentTypeModel = mongoose.model<RepositoryFilamentType>('FilamentType', FilamentTypeSchema);
export const FilamentTechModel = mongoose.model<RepositoryFilamentTech>('FilamentTech', FilamentTechSchema);
export const NozzleModel = mongoose.model<RepositoryNozzle>('Nozzle', NozzleSchema);
export const FilamentTuneModel = mongoose.model<RepositoryFilamentTune>('FilamentTune', FilamentTuneSchema);
export const SpoolModel = mongoose.model<RepositorySpool>('Spool', SpoolSchema);
export const FlushingVolumeModel = mongoose.model<RepositoryFlushingVolume>('FlushingVolume', FlushingVolumeSchema);

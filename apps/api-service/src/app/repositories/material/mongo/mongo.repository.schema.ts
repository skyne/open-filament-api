import { Schema, model } from "mongoose";
import { RepositoryMaterial } from "../repository.model";

const materialSchema = new Schema<RepositoryMaterial>({
  type: { type: String, required: true },
  description: { type: String, required: false },
  diameter: { type: Number, required: true },
  densityGcm3: { type: Number, required: false },
  youngModulusGpa: { type: Number, required: false },
  tensileStrengthMpa: { type: Number, required: false },
  creep: { type: Boolean, required: false },
  bio: { type: Boolean, required: false },
  fdaCompliant: { type: Boolean, required: false },
  hasAdditives: { type: Boolean, required: false },
  glass_transition_c: { type: Number, required: false },
  melting_point_c: { type: Number, required: false },
  polymer: { type: String, required: false },
}, {
  timestamps: true,
});


export const MaterialModel = model<RepositoryMaterial>("Material", materialSchema);

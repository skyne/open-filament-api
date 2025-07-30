import { z } from "zod";

export const materialSchema = z.object({
  id: z.string().optional(),
  type: z.string().min(1, "Material type is required"),
  description: z.string().optional(),
  diameter: z.number().positive("Diameter must be positive"),
  densityGcm3: z.number().min(0).optional(),
  youngModulusGpa: z.number().min(0).optional(),
  tensileStrengthMpa: z.number().min(0).optional(),
  creep: z.boolean().optional(),
  bio: z.boolean().optional(),
  fdaCompliant: z.boolean().optional(),
  hasAdditives: z.boolean().optional(),
  glass_transition_c: z.number().optional(),
  melting_point_c: z.number().optional(),
  polymer: z.string().optional(),
});

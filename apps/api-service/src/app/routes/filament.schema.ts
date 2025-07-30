import { z } from "zod";

export const filamentSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Filament name is required"),
  material: z.string().min(1, "Material is required"),
  brand: z.string().min(1, "Brand is required"),
  hex: z.string().regex(/^#[0-9A-F]{6}$/i, "Invalid hex color code"),
  ral: z.string().optional(),
  hotend_min: z.number().positive("Hotend min temperature must be positive"),
  hotend_max: z.number().positive("Hotend max temperature must be positive"),
  bed_min: z.number().min(0, "Bed min temperature must be non-negative"),
  bed_max: z.number().positive("Bed max temperature must be positive"),
});

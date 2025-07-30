import { z } from "zod";

export const manufacturerSchema = z.object({
  id: z.string().optional(),
  vendor: z.string().min(1, "Vendor name is required"),
  website: z.string().url("Invalid URL").optional(),
  logo: z.string().optional(),
});

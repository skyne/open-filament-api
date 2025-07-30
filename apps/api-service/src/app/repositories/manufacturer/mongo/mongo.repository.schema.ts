import { Schema, model } from "mongoose";
import { RepositoryManufacturer } from "../repository.model";

const manufacturerSchema = new Schema<RepositoryManufacturer>({
  vendor: { type: String, required: true },
  website: { type: String },
  logo: { type: String },
}, {
  timestamps: true,
});

export const ManufacturerModel = model<RepositoryManufacturer>("Manufacturer", manufacturerSchema);

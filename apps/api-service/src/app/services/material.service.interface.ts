import { Material, Manufacturer } from "./filament.service.model";

export interface MaterialService {
  createMaterial(material: Material): Promise<Material>;
  getMaterial(id: string): Promise<Material>;
  updateMaterial(id: string, material: Material): Promise<Material>;
  deleteMaterial(id: string): Promise<void>;
  getAllMaterials(): Promise<Material[]>;
}

export interface ManufacturerService {
  createManufacturer(manufacturer: Manufacturer): Promise<Manufacturer>;
  getManufacturer(id: string): Promise<Manufacturer>;
  updateManufacturer(id: string, manufacturer: Manufacturer): Promise<Manufacturer>;
  deleteManufacturer(id: string): Promise<void>;
  getAllManufacturers(): Promise<Manufacturer[]>;
}

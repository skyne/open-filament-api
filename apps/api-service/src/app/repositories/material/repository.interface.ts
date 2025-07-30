import { Material, Manufacturer } from "../../services/filament.service.model";

export interface MaterialRepository {
  createMaterial(material: Material): Promise<Material>;
  getMaterial(id: string): Promise<Material>;
  updateMaterial(id: string, material: Material): Promise<Material>;
  deleteMaterial(id: string): Promise<void>;
  getAllMaterials(): Promise<Material[]>;
}

export interface ManufacturerRepository {
  createManufacturer(manufacturer: Manufacturer): Promise<Manufacturer>;
  getManufacturer(id: string): Promise<Manufacturer>;
  updateManufacturer(id: string, manufacturer: Manufacturer): Promise<Manufacturer>;
  deleteManufacturer(id: string): Promise<void>;
  getAllManufacturers(): Promise<Manufacturer[]>;
}

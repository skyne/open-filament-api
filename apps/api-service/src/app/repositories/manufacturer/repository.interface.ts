import { Manufacturer } from "../../services/filament.service.model";

export interface ManufacturerRepository {
  createManufacturer(manufacturer: Manufacturer): Promise<Manufacturer>;
  getManufacturer(id: string): Promise<Manufacturer>;
  updateManufacturer(id: string, manufacturer: Manufacturer): Promise<Manufacturer>;
  deleteManufacturer(id: string): Promise<void>;
  getAllManufacturers(): Promise<Manufacturer[]>;
}

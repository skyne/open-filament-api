import { Service, Container } from "typedi";
import { ManufacturerService } from "./material.service.interface";
import { ManufacturerRepository } from "../repositories/manufacturer/repository.interface";
import { MongoManufacturerRepository } from "../repositories/manufacturer/mongo/mongo.repository";
import { Manufacturer } from "./filament.service.model";

@Service()
export class ManufacturerServiceImpl implements ManufacturerService {
  private readonly manufacturerRepository: ManufacturerRepository;

  constructor() {
    this.manufacturerRepository = Container.get(MongoManufacturerRepository);
  }

  async createManufacturer(manufacturer: Manufacturer): Promise<Manufacturer> {
    return this.manufacturerRepository.createManufacturer(manufacturer);
  }

  async getManufacturer(id: string): Promise<Manufacturer> {
    return this.manufacturerRepository.getManufacturer(id);
  }

  async updateManufacturer(id: string, manufacturer: Manufacturer): Promise<Manufacturer> {
    return this.manufacturerRepository.updateManufacturer(id, manufacturer);
  }

  async deleteManufacturer(id: string): Promise<void> {
    return this.manufacturerRepository.deleteManufacturer(id);
  }

  async getAllManufacturers(): Promise<Manufacturer[]> {
    return this.manufacturerRepository.getAllManufacturers();
  }
}

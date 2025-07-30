
import Container, { Service } from "typedi";
import { Manufacturer } from "../../../services/filament.service.model";
import { IMapper } from "../../generic/mapper.interface";
import { ManufacturerRepository } from "../repository.interface";
import { RepositoryManufacturer } from "../repository.model";
import { MongoManufacturerRepositoryMapper } from "./mongo.repository.mapper";
import { ManufacturerModel } from "./mongo.repository.schema";

@Service()
export class MongoManufacturerRepository implements ManufacturerRepository {
  private readonly mapper: IMapper<RepositoryManufacturer, Manufacturer>;

  constructor() {
    this.mapper = Container.get(MongoManufacturerRepositoryMapper);
  }

  async createManufacturer(manufacturer: Manufacturer): Promise<Manufacturer> {
    const repositoryModel = this.mapper.mapFrom(manufacturer);
    const doc = await ManufacturerModel.create(repositoryModel);
    return this.mapper.mapTo(doc.toObject());
  }

  async getManufacturer(id: string): Promise<Manufacturer> {
    const manufacturer = await ManufacturerModel.findById(id);
    if (!manufacturer) {
      throw new Error("Manufacturer not found");
    }
    return this.mapper.mapTo(manufacturer.toObject());
  }

  async updateManufacturer(id: string, manufacturer: Manufacturer): Promise<Manufacturer> {
    const repositoryModel = this.mapper.mapFrom(manufacturer);
    const updated = await ManufacturerModel.findByIdAndUpdate(
      id,
      repositoryModel,
      { new: true }
    );
    if (!updated) {
      throw new Error("Manufacturer not found");
    }
    return this.mapper.mapTo(updated.toObject());
  }

  async deleteManufacturer(id: string): Promise<void> {
    await ManufacturerModel.findByIdAndDelete(id);
  }

  async getAllManufacturers(): Promise<Manufacturer[]> {
    const docs = await ManufacturerModel.find();
    return docs.map(doc => this.mapper.mapTo(doc.toObject()));
  }
}

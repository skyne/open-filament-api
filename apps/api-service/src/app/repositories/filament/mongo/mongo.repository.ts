import { FilamentRepository } from "../repository.interface";
import Container, { Service } from "typedi";
import { RepositoryFilament } from "../repository.model";
import { FilamentModel } from "./mongo.repository.schema";
import { MongoFilamentRepositoryMapper } from "./mongo.repository.mapper";
import { Filament } from "../../../services/filament.service.model";
import { IMapper } from "../../generic/mapper.interface";

@Service()
export class MongoFilamentRepository implements FilamentRepository {
  private readonly mapper: IMapper<RepositoryFilament, Filament>;

  constructor() {
    this.mapper = Container.get(MongoFilamentRepositoryMapper);
  }
  async createFilament(filament: Filament): Promise<Filament> {
    const repositoryModel = this.mapper.mapFrom(filament);
    const doc = await FilamentModel.create(repositoryModel);
    return this.mapper.mapTo(doc.toObject());
  }

  async getFilament(id: string): Promise<Filament> {
    const filament = await FilamentModel.findById(id);

    if (!filament) {
      throw new Error("Filament not found");
    }

    return this.mapper.mapTo(filament.toObject());
  }

  async updateFilament(id: string, filament: Filament): Promise<Filament> {
    const repositoryModel = this.mapper.mapFrom(filament);
    const updated = await FilamentModel.findByIdAndUpdate(
      id,
      repositoryModel,
      { new: true }
    );
    if (!updated) {
      throw new Error("Filament not found");
    }
    return this.mapper.mapTo(updated.toObject());
  }

  async deleteFilament(id: string): Promise<void> {
    await FilamentModel.findByIdAndDelete(id);
  }

  async getAllFilaments(): Promise<Filament[]> {
    const docs = await FilamentModel.find();
    return docs.map(doc => this.mapper.mapTo(doc.toObject()));
  }

  async getAllFilamentsByType(type: string): Promise<Filament[]> {
    const docs = await FilamentModel.find({ type });
    return docs.map(doc => this.mapper.mapTo(doc.toObject()));
  }
}

import { FilamentRepository } from "../repository.interface";
import { Service } from "typedi";
import { RepositoryFilament } from "../repository.model";
import { FilamentModel } from "./mongo.repository.schema";
import { MongoFilamentRepositoryMapper } from "./mongo.repository.mapper";

@Service()
export class MongoFilamentRepository implements FilamentRepository {
  constructor(readonly mapper: MongoFilamentRepositoryMapper) {}


  async getFilament(id: string): Promise<RepositoryFilament> {
    const filament = await FilamentModel.findById(id);

    if (!filament) {
      throw new Error("Filament not found");
    }

    return this.mapper.mapFrom(filament);
  }
}

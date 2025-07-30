import { IFilamentService } from "./filament.service.interface";
import Container, { Service } from "typedi";
import { Filament } from "./filament.service.model";
import { FilamentRepository } from "../repositories/filament/repository.interface";
import { MongoFilamentRepository } from "../repositories/filament/mongo/mongo.repository";
@Service()
export class FilamentService implements IFilamentService {
    constructor(readonly filamentRepository: FilamentRepository) {
      this.filamentRepository = Container.get(MongoFilamentRepository);
    }


    getFilament(id: string): Promise<Filament> {
      return this.filamentRepository.getFilament(id);
    }

    createFilament(filament: Filament): Promise<Filament> {
      return this.filamentRepository.createFilament(filament);
    }
    updateFilament(id: string, filament: Filament): Promise<Filament> {
      return this.filamentRepository.updateFilament(id, filament);
    }
    deleteFilament(id: string): Promise<void> {
      return this.filamentRepository.deleteFilament(id);
    }
    getAllFilaments(): Promise<Filament[]> {
      return this.filamentRepository.getAllFilaments();
    }

    getAllFilamentsByType(typeId: string): Promise<Filament[]> {
      return this.filamentRepository.getAllFilamentsByType(typeId);
    }
}

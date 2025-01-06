import { Filament } from "../../services/filament.service.interface";
import { RepositoryFilament } from "./repository.model";

export class RepositoryFilamentMapper {
  static toRepositoryFilament(filament: Filament): RepositoryFilament {
    return {
      id: filament.id
    };
  }
}

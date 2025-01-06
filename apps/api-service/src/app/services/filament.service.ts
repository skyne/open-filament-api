import { IFilamentService } from "./filament.service.interface";
import { Service } from "typedi";
import { Filament, FilamentType } from "./filament.service.model";
@Service()
export class FilamentService implements IFilamentService {
    constructor() {
      console.log('FilamentService constructor');
    }
    public getFilament(id: string): Filament {
        return { id, type: FilamentType.PLA };
    }
}

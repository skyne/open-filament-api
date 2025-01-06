import { IFilamentService } from "./filament.service.interface";
import { Service } from "typedi";
@Service()
export class FilamentService implements IFilamentService {
    constructor() {
      console.log('FilamentService constructor');
    }
    public getFilament(id: string) {
        return { id };
    }
}

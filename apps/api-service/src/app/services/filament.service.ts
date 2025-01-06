import { IFilamentService } from "./filament.service.interface";

export class FilamentService implements IFilamentService {
    constructor() {
    }
    getFilament(id: string) {
        return { id: '1' };
    }
}

import { Filament } from "./filament.service.model";

export interface IFilamentService {
    getFilament(id: string): Filament;
}

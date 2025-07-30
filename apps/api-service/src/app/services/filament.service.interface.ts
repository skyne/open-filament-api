import { Filament } from "./filament.service.model";

export interface IFilamentService {
    getFilament(id: string): Promise<Filament>;
    createFilament(filament: Omit<Filament, "id">): Promise<Filament>;
    updateFilament(id: string, filament: Filament): Promise<Filament>;
    deleteFilament(id: string): Promise<void>;
    getAllFilaments(): Promise<Filament[]>;
    getAllFilamentsByType(type: string): Promise<Filament[]>;
}

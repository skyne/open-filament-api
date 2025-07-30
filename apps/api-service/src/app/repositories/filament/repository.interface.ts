import { Filament } from "../../services/filament.service.model";
import { RepositoryFilament } from "./repository.model";

export interface FilamentRepository {
    getFilament(id: string): Promise<Filament>;
    createFilament(filament: Filament): Promise<Filament>;
    updateFilament(id: string, filament: Filament): Promise<Filament>;
    deleteFilament(id: string): Promise<void>;
    getAllFilaments(): Promise<Filament[]>;
    getAllFilamentsByType(type: string): Promise<Filament[]>;
}

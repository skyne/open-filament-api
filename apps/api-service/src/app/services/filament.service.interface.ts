export interface IFilamentService {
    getFilament(id: string): Filament;
}

export interface Filament {
    id: string;
}

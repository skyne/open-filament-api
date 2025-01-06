import { RepositoryFilament } from "./repository.model";

export interface FilamentRepository {
    getFilament(id: string): Promise<RepositoryFilament>;
}

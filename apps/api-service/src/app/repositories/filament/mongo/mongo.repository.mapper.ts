import { Filament } from "../../../services/filament.service.interface";
import { RepositoryFilament } from "../repository.model";
import { IMapper } from "../../common/mapper.interface";
import { Service } from "typedi";

@Service()
export class MongoFilamentRepositoryMapper implements IMapper<RepositoryFilament, Filament> {
    mapFrom(param: Filament): RepositoryFilament {
        return {
            id: param.id
        };
    }

    mapTo(param: RepositoryFilament): Filament {
        return {
            id: param.id
        };
    }
}

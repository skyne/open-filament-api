import { Material, Manufacturer } from "../../../services/filament.service.model";
import { IMapper } from "../../generic/mapper.interface";
import { RepositoryMaterial, RepositoryManufacturer } from "../repository.model";
import { Service } from "typedi";

@Service()
export class MongoMaterialRepositoryMapper implements IMapper<RepositoryMaterial, Material> {
  mapFrom(param: Material): RepositoryMaterial {
    return {
      _id: param.id,
      type: param.type,
      diameter: param.diameter,
    };
  }

  mapTo(param: RepositoryMaterial): Material {
    return {
      id: param._id?.toString(),
      type: param.type,
      diameter: param.diameter,
    };
  }
}

@Service()
export class MongoManufacturerRepositoryMapper implements IMapper<RepositoryManufacturer, Manufacturer> {
  mapFrom(param: Manufacturer): RepositoryManufacturer {
    return {
      _id: param.id,
      vendor: param.vendor,
      website: param.website,
      logo: param.logo,
    };
  }

  mapTo(param: RepositoryManufacturer): Manufacturer {
    return {
      id: param._id?.toString(),
      vendor: param.vendor,
      website: param.website,
      logo: param.logo,
    };
  }
}

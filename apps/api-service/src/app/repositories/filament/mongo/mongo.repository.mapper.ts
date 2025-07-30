
import { Filament } from "../../../services/filament.service.model";
import { IMapper } from "../../generic/mapper.interface";
import { RepositoryFilament } from "../repository.model";
import { Service } from "typedi";

@Service()
export class MongoFilamentRepositoryMapper implements IMapper<RepositoryFilament, Filament> {

  mapFrom(param: Filament): RepositoryFilament {
    return {
      _id: param.id,
      name: param.name,
      material: param.material,
      brand: param.brand,
      hex: param.hex,
      ral: param.ral,
      hotend_min: param.hotend_min,
      hotend_max: param.hotend_max,
      bed_min: param.bed_min,
      bed_max: param.bed_max
    };
  }

  mapTo(param: RepositoryFilament): Filament {
    return {
      id: param._id?.toString(),
      name: param.name,
      material: param.material,
      brand: param.brand,
      hex: param.hex,
      ral: param.ral,
      hotend_min: param.hotend_min,
      hotend_max: param.hotend_max,
      bed_min: param.bed_min,
      bed_max: param.bed_max
    };
  }
}

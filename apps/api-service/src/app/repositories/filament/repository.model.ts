export type RepositoryMaterial = {
  readonly _id?: string;
  readonly type: string;
  readonly diameter: number; // diameter_E in diagram
}

export type RepositoryManufacturer = {
  readonly _id?: string;
  readonly vendor: string;
  readonly website?: string;
  readonly logo?: string;
}

export type RepositoryFilament = {
  readonly _id?: string;
  readonly name: string;
  readonly material: string; // References Material._id
  readonly brand: string; // References Manufacturer._id
  readonly hex: string; // Color hex code
  readonly ral?: string; // RAL color code
  readonly hotend_min: number;
  readonly hotend_max: number;
  readonly bed_min: number;
  readonly bed_max: number;
}

export type RepositoryFilamentType = {
  readonly _id?: string;
  readonly name: string;
  readonly description?: string;
}

export type RepositoryFilamentTech = {
  readonly _id?: string;
  readonly density: number;
  readonly vicat: number;
  readonly hdt: number;
  readonly melting_temp: number;
  readonly melt_index: string;
  readonly tensile_strength: string;
  readonly breaking_elongation_rate: string;
  readonly bending_modulus: string;
  readonly bending_strength: string;
  readonly impact_strength: string;
}

export type RepositoryNozzle = {
  readonly _id?: string;
  readonly size: number;
  readonly type: string; // nozzletype_E
}

export type RepositoryFilamentTune = {
  readonly _id?: string;
  readonly nozzle: string; // References Nozzle._id
  readonly pa_value: number;
  readonly pa_speed: number;
  readonly retract_speed: number;
  readonly retract_length: number;
  readonly volumetric_flow: number;
  readonly volumetric_temp: number;
}

export type RepositorySpool = {
  readonly _id?: string;
  readonly type: string; // spooltype_E
  readonly weight: number;
  readonly diameter: number;
  readonly inner_diameter: number;
  readonly depth: number;
}

export type RepositoryFlushingVolume = {
  readonly _id?: string;
  readonly from: string; // References Filament._id
  readonly to: string; // References Filament._id
  readonly value: number;
  readonly long_retract_length: number;
}

export type ApiFilament = {
  id?: string;
  name: string;
  material: string;
  brand: string;
  hex: string;
  ral?: string;
  hotend_min: number;
  hotend_max: number;
  bed_min: number;
  bed_max: number;
}

export type ApiFilamentType = {
  id?: string;
  name: string;
  description?: string;
}

export type ApiFilamentTech = {
  id?: string;
  density: number;
  vicat: number;
  hdt: number;
  melting_temp: number;
  melt_index: string;
  tensile_strength: string;
  breaking_elongation_rate: string;
  bending_modulus: string;
  bending_strength: string;
  impact_strength: string;
}

export type ApiNozzle = {
  id?: string;
  size: number;
  type: string;
}

export type ApiFilamentTune = {
  id?: string;
  nozzle: string;
  pa_value: number;
  pa_speed: number;
  retract_speed: number;
  retract_length: number;
  volumetric_flow: number;
  volumetric_temp: number;
}

export type ApiSpool = {
  id?: string;
  type: string;
  weight: number;
  diameter: number;
  inner_diameter: number;
  depth: number;
}

export type ApiFlushingVolume = {
  id?: string;
  from: string;
  to: string;
  value: number;
  long_retract_length: number;
}



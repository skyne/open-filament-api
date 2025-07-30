export type Filament = {
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

export type FilamentType = {
  id?: string;
  name: string;
  description?: string;
}

export type Material = {
  id?: string;
  type: string;
  description?: string;
  diameter: number;
  densityGcm3?: number;
  youngModulusGpa?: number;
  tensileStrengthMpa?: number;
  creep?: boolean;
  bio?: boolean;
  fdaCompliant?: boolean;
  hasAdditives?: boolean;
  glass_transition_c?: number;
  melting_point_c?: number;
  polymer?: string;
}

export type Manufacturer = {
  id?: string;
  vendor: string;
  website?: string;
  logo?: string;
}

export type FilamentTech = {
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

export type Nozzle = {
  id?: string;
  size: number;
  type: string;
}

export type FilamentTune = {
  id?: string;
  nozzle: string;
  pa_value: number;
  pa_speed: number;
  retract_speed: number;
  retract_length: number;
  volumetric_flow: number;
  volumetric_temp: number;
}

export type Spool = {
  id?: string;
  type: string;
  weight: number;
  diameter: number;
  inner_diameter: number;
  depth: number;
}

export type FlushingVolume = {
  id?: string;
  from: string;
  to: string;
  value: number;
  long_retract_length: number;
}

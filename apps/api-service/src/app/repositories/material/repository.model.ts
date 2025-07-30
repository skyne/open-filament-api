export type RepositoryMaterial = {
  readonly _id?: string;
  readonly type: string;
  readonly description?: string;
  readonly diameter: number;
  readonly densityGcm3?: number;
  readonly youngModulusGpa?: number;
  readonly tensileStrengthMpa?: number;
  readonly creep?: boolean;
  readonly bio?: boolean;
  readonly fdaCompliant?: boolean;
  readonly hasAdditives?: boolean;
  readonly glass_transition_c?: number;
  readonly melting_point_c?: number;
  readonly polymer?: string;
}

export type RepositoryManufacturer = {
  readonly _id?: string;
  readonly vendor: string;
  readonly website?: string;
  readonly logo?: string;
}

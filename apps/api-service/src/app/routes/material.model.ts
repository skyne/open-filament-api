export type ApiMaterial = {
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

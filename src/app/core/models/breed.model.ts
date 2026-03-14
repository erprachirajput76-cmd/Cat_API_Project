export interface BreedWeight {
  imperial: string;
  metric: string;
}

export interface Breed {
  id: string;
  name: string;
  temperament?: string;
  origin?: string;
  description?: string;
  life_span?: string;
  adaptability?: number;
  affection_level?: number;
  child_friendly?: number;
  dog_friendly?: number;
  energy_level?: number;
  grooming?: number;
  health_issues?: number;
  intelligence?: number;
  shedding_level?: number;
  social_needs?: number;
  stranger_friendly?: number;
  vocalisation?: number;
  experimental?: number;
  hairless?: number;
  natural?: number;
  rare?: number;
  rex?: number;
  suppressed_tail?: number;
  short_legs?: number;
  wikipedia_url?: string;
  weight?: BreedWeight;
  cfa_url?: string;
  vetstreet_url?: string;
  vcahospitals_url?: string;
  country_code?: string;
  country_codes?: string;
}

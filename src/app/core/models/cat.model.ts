import type { Breed } from './breed.model';

export interface CatImage {
  id: string;
  url: string;
  width?: number;
  height?: number;
  breeds?: Breed[];
  breed_ids?: string;
  created_at?: string;
  original_filename?: string;
}

export interface VotePayload {
  image_id: string;
  sub_id?: string;
  value: 1 | 0; // 1 = like, 0 = dislike
}

export interface Vote {
  id: number;
  image_id: string;
  sub_id?: string;
  value: number;
  country_code?: string;
  created_at?: string;
}

export interface CatWithBreed extends CatImage {
  breed?: Breed;
}

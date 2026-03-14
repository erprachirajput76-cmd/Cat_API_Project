import { computed, inject, Injectable, signal } from '@angular/core';
import { CatApiService } from '../core/services/cat-api.service';
import { StorageKey } from '../core/constants/storage.constants';
import { VOTE_VALUE } from '../core/constants/vote.constants';
import type { CatImage } from '../core/models/cat.model';
import type { Breed } from '../core/models/breed.model';

function loadFromStorage<T>(key: string, parse: (raw: string) => T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? parse(raw) : ([] as T);
  } catch {
    return [] as T;
  }
}

function saveToStorage(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

@Injectable({ providedIn: 'root' })
export class CatStore {
  private readonly api = inject(CatApiService);

  readonly cats = signal<CatImage[]>([]);
  readonly breeds = signal<Breed[]>([]);
  readonly votes = signal<{ image_id: string; value: number }[]>([]);
  /** Local vote state per image: 1 = like, 0 = dislike (for UI feedback) */
  readonly localVoteByImageId = signal<Record<string, 0 | 1>>({});
  /** Last liked cat image (for Insights "Most liked" when API votes are empty) */
  readonly lastLikedCatImage = signal<CatImage | null>(null);

  readonly favorites = signal<CatImage[]>(
    loadFromStorage(StorageKey.FAVORITES, (raw) => JSON.parse(raw) as CatImage[])
  );
  readonly exploredIds = signal<Set<string>>(
    new Set(loadFromStorage<string[]>(StorageKey.EXPLORED, (raw) => JSON.parse(raw)))
  );
  readonly viewedBreedIds = signal<Set<string>>(
    new Set(loadFromStorage<string[]>(StorageKey.VIEWED_BREEDS, (raw) => JSON.parse(raw)))
  );

  readonly favoriteCount = computed(() => this.favorites().length);
  readonly exploredCount = computed(() => this.exploredIds().size);
  readonly dislikeCount = computed(
    () =>
      Object.values(this.localVoteByImageId()).filter((v) => v === VOTE_VALUE.DISLIKE).length
  );

  readonly popularBreeds = computed(() => {
    const viewed = this.viewedBreedIds();
    const breeds = this.breeds();
    return [...viewed]
      .map((id) => breeds.find((b) => b.id === id))
      .filter((b): b is Breed => Boolean(b));
  });

  readonly mostLikedImageId = computed(() => {
    const v = this.votes();
    const likes = v.filter((x) => x.value === VOTE_VALUE.LIKE);
    if (likes.length > 0) {
      const counts = likes.reduce<Record<string, number>>((acc, { image_id }) => {
        acc[image_id] = (acc[image_id] ?? 0) + 1;
        return acc;
      }, {});
      const entries = Object.entries(counts);
      if (entries.length > 0) return entries.reduce((a, b) => (a[1] >= b[1] ? a : b))[0];
    }
    const lastLiked = this.lastLikedCatImage();
    if (lastLiked) return lastLiked.id;
    const local = this.localVoteByImageId();
    const likedId = Object.entries(local).find(([, val]) => val === VOTE_VALUE.LIKE)?.[0];
    return likedId ?? null;
  });

  setCats(cats: CatImage[]): void {
    this.cats.set(cats);
  }

  setBreeds(breeds: Breed[]): void {
    this.breeds.set(breeds);
  }

  setVotes(votes: { image_id: string; value: number }[]): void {
    this.votes.set(votes);
    const map: Record<string, 0 | 1> = {};
    votes.forEach((v) => {
      map[v.image_id] = v.value === VOTE_VALUE.LIKE ? VOTE_VALUE.LIKE : VOTE_VALUE.DISLIKE;
    });
    this.localVoteByImageId.set(map);
  }

  setVote(imageId: string, value: 0 | 1, cat?: CatImage): void {
    this.localVoteByImageId.update((prev) => ({ ...prev, [imageId]: value }));
    if (value === VOTE_VALUE.LIKE && cat) this.lastLikedCatImage.set(cat);
  }

  getVote(imageId: string): 0 | 1 | null {
    const v = this.localVoteByImageId()[imageId];
    return v === undefined ? null : v;
  }

  addFavorite(cat: CatImage): void {
    const current = this.favorites();
    if (current.some((c) => c.id === cat.id)) return;
    const next = [...current, cat];
    this.favorites.set(next);
    saveToStorage(StorageKey.FAVORITES, next);
  }

  removeFavorite(cat: CatImage): void {
    const next = this.favorites().filter((c) => c.id !== cat.id);
    this.favorites.set(next);
    saveToStorage(StorageKey.FAVORITES, next);
  }

  isFavorite(id: string): boolean {
    return this.favorites().some((c) => c.id === id);
  }

  toggleFavorite(cat: CatImage): void {
    if (this.isFavorite(cat.id)) this.removeFavorite(cat);
    else this.addFavorite(cat);
  }

  markExplored(id: string): void {
    const next = new Set(this.exploredIds());
    next.add(id);
    this.exploredIds.set(next);
    saveToStorage(StorageKey.EXPLORED, Array.from(next));
  }

  markBreedViewed(breedId: string): void {
    const next = new Set(this.viewedBreedIds());
    next.add(breedId);
    this.viewedBreedIds.set(next);
    saveToStorage(StorageKey.VIEWED_BREEDS, Array.from(next));
  }
}

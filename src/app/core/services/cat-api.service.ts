import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_CONFIG } from '../config/api.config';
import type { CatImage, Vote, VotePayload } from '../models/cat.model';
import type { Breed } from '../models/breed.model';

@Injectable({ providedIn: 'root' })
export class CatApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = API_CONFIG.baseUrl;
  private readonly fallback = API_CONFIG.fallbackBaseUrl;

  /**
   * Try primary API then fallback for compatibility with custom backend.
   */
  private getBase(base: 'primary' | 'fallback' = 'primary'): string {
    return base === 'primary' ? this.baseUrl : this.fallback;
  }

  getRandomCats(limit = 10): Observable<CatImage[]> {
    const params = new HttpParams()
      .set('limit', String(limit))
      .set('size', 'med');
    return this.request<CatImage[]>(this.getBase('primary') + API_CONFIG.endpoints.imagesSearch, { params })
      .pipe(
        catchError(() =>
          this.http.get<CatImage[]>(this.getBase('fallback') + API_CONFIG.endpoints.imagesSearch, { params })
        )
      );
  }

  getBreeds(): Observable<Breed[]> {
    return this.request<Breed[]>(this.getBase('primary') + API_CONFIG.endpoints.breeds).pipe(
      catchError(() => this.http.get<Breed[]>(this.getBase('fallback') + API_CONFIG.endpoints.breeds))
    );
  }

  getImagesByBreed(breedId: string, limit: number = API_CONFIG.breedsImagesLimit): Observable<CatImage[]> {
    const params = new HttpParams()
      .set('breed_ids', breedId)
      .set('limit', String(limit))
      .set('size', 'med');
    return this.request<CatImage[]>(this.getBase('primary') + API_CONFIG.endpoints.imagesSearch, { params }).pipe(
      catchError(() =>
        this.http.get<CatImage[]>(this.getBase('fallback') + API_CONFIG.endpoints.imagesSearch, { params })
      )
    );
  }

  searchCats(query: string, limit = 20): Observable<CatImage[]> {
    const params = new HttpParams()
      .set('limit', String(limit))
      .set('size', 'med');
    const url = `${this.getBase('primary')}${API_CONFIG.endpoints.imagesSearch}`;
    return this.http.get<CatImage[]>(url, { params }).pipe(
      catchError(() => this.http.get<CatImage[]>(this.getBase('fallback') + API_CONFIG.endpoints.imagesSearch, { params })),
      map((images) =>
        query.trim()
          ? images.filter(
              (img) =>
                img.breeds?.some(
                  (b) =>
                    b.name?.toLowerCase().includes(query.toLowerCase()) ||
                    b.id?.toLowerCase().includes(query.toLowerCase())
                )
            )
          : images
      )
    );
  }

  addVote(payload: VotePayload): Observable<unknown> {
    const url = this.getBase('primary') + API_CONFIG.endpoints.votes;
    return this.http.post<unknown>(url, payload).pipe(
      catchError(() => this.http.post<unknown>(this.getBase('fallback') + API_CONFIG.endpoints.votes, payload))
    );
  }

  getVotes(): Observable<Vote[]> {
    const url = this.getBase('primary') + API_CONFIG.endpoints.votes;
    return this.http.get<Vote[]>(url).pipe(
      catchError(() => this.http.get<Vote[]>(this.getBase('fallback') + API_CONFIG.endpoints.votes))
    );
  }

  private request<T>(url: string, options?: { params?: HttpParams }): Observable<T> {
    return this.http.get<T>(url, options);
  }
}

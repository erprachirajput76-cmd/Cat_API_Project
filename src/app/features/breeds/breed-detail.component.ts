import { Component, inject, signal, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CatApiService } from '../../core/services/cat-api.service';
import { API_CONFIG } from '../../core/config/api.config';
import { RoutePathFull } from '../../core/constants/routes.constants';
import { LoaderMessage } from '../../core/constants/loader.constants';
import { CatStore } from '../../state/cat.store';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import type { Breed } from '../../core/models/breed.model';
import type { CatImage } from '../../core/models/cat.model';

@Component({
  selector: 'app-breed-detail',
  standalone: true,
  imports: [
    RouterLink,
    MatExpansionModule,
    MatChipsModule,
    MatButtonModule,
    MatIconModule,
    PageHeaderComponent,
    LoaderComponent,
  ],
  templateUrl: './breed-detail.component.html',
  styleUrl: './breed-detail.component.scss',
})
export class BreedDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(CatApiService);
  private readonly store = inject(CatStore);

  readonly routes = RoutePathFull;
  readonly loaderMessage = LoaderMessage.LOADING_BREED;
  readonly breedsImagesLimit = API_CONFIG.breedsImagesLimit;
  breed = signal<Breed | null>(null);
  mainImage = signal<string | null>(null);
  carouselImages = signal<CatImage[]>([]);
  currentIndex = signal(0);
  loading = signal(true);

  temperamentList = signal<string[]>([]);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id') ?? '';
    this.api.getBreeds().subscribe({
      next: (breeds) => {
        const b = breeds.find((x) => x.id === id) ?? null;
        this.breed.set(b);
        if (b) {
          this.store.markBreedViewed(b.id);
          const list = b.temperament ? b.temperament.split(',').map((s) => s.trim()).filter(Boolean) : [];
          this.temperamentList.set(list);
        }
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
    this.api.getImagesByBreed(id, this.breedsImagesLimit).subscribe({
      next: (imgs) => {
        this.carouselImages.set(imgs);
        if (imgs[0]) this.mainImage.set(imgs[0].url);
      },
    });
  }

  prev(): void {
    const imgs = this.carouselImages();
    if (imgs.length === 0) return;
    const next = (this.currentIndex() - 1 + imgs.length) % imgs.length;
    this.currentIndex.set(next);
  }

  next(): void {
    const imgs = this.carouselImages();
    if (imgs.length === 0) return;
    this.currentIndex.set((this.currentIndex() + 1) % imgs.length);
  }
}

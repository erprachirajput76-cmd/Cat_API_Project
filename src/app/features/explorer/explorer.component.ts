import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { CatApiService } from '../../core/services/cat-api.service';
import { API_CONFIG } from '../../core/config/api.config';
import { toBreedDetail } from '../../core/constants/routes.constants';
import { LoaderMessage } from '../../core/constants/loader.constants';
import { PageHeader } from '../../core/constants/app.constants';
import { VOTE_VALUE } from '../../core/constants/vote.constants';
import { CatStore } from '../../state/cat.store';
import { CatCardComponent } from '../../shared/components/cat-card/cat-card.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import type { CatImage } from '../../core/models/cat.model';
import type { Breed } from '../../core/models/breed.model';

@Component({
  selector: 'app-explorer',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    CatCardComponent,
    PageHeaderComponent,
    LoaderComponent,
  ],
  templateUrl: './explorer.component.html',
  styleUrl: './explorer.component.scss',
})
export class ExplorerComponent implements OnInit {
  private readonly api = inject(CatApiService);
  private readonly store = inject(CatStore);
  private readonly router = inject(Router);

  breeds = signal<Breed[]>([]);
  cats = signal<CatImage[]>([]);
  loading = signal(true);
  selectedBreedId: string | null = null;
  readonly loaderMessage = LoaderMessage.DISCOVERING_CATS;
  readonly pageHeader = PageHeader.EXPLORER;

  /** When a breed is selected, its name for the card labels */
  selectedBreedName = computed(() => {
    const id = this.selectedBreedId;
    if (!id) return null;
    return this.breeds().find((b) => b.id === id)?.name ?? null;
  });

  getBreedLabel(cat: CatImage): string | null {
    return cat.breeds?.[0]?.name ?? this.selectedBreedName() ?? null;
  }

  ngOnInit(): void {
    this.api.getBreeds().subscribe((b) => {
      this.breeds.set(b);
      this.store.setBreeds(b);
    });
    this.loadCats();
  }

  loadCats(): void {
    this.loading.set(true);
    const breedId = this.selectedBreedId;
    const limit = API_CONFIG.explorerListLimit;
    if (breedId) {
      this.api.getImagesByBreed(breedId, limit).subscribe({
        next: (imgs) => {
          this.cats.set(imgs);
          this.loading.set(false);
        },
        error: () => {
          this.cats.set([]);
          this.loading.set(false);
        },
      });
    } else {
      this.api.getRandomCats(limit).subscribe({
        next: (imgs) => {
          this.cats.set(imgs);
          this.store.setCats(imgs);
          this.loading.set(false);
        },
        error: () => {
          this.cats.set([]);
          this.loading.set(false);
        },
      });
    }
  }

  onBreedChange(): void {
    this.loadCats();
  }

  onLike(imageId: string): void {
    this.store.markExplored(imageId);
    const cat = this.cats().find((c) => c.id === imageId);
    this.store.setVote(imageId, VOTE_VALUE.LIKE, cat);
    this.api.addVote({ image_id: imageId, value: VOTE_VALUE.LIKE }).subscribe();
  }

  onDislike(imageId: string): void {
    this.store.setVote(imageId, VOTE_VALUE.DISLIKE);
    this.api.addVote({ image_id: imageId, value: VOTE_VALUE.DISLIKE }).subscribe();
  }

  onViewDetails(cat: CatImage): void {
    const breedId = cat.breeds?.[0]?.id;
    if (breedId) this.router.navigate(toBreedDetail(breedId));
  }
}

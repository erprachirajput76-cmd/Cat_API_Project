import { Component, input, output, inject, signal } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CatStore } from '../../../state/cat.store';
import type { CatImage } from '../../../core/models/cat.model';
import { OrganicImageComponent } from '../organic-image/organic-image.component';

@Component({
  selector: 'app-cat-card',
  standalone: true,
  imports: [MatChipsModule, MatButtonModule, MatIconModule, OrganicImageComponent],
  templateUrl: './cat-card.component.html',
  styleUrl: './cat-card.component.scss',
})
export class CatCardComponent {
  private readonly store = inject(CatStore);
  cat = input.required<CatImage>();
  altText = input<string>('Cat image');
  breedLabel = input<string | null>(null);
  onLike = output<string>();
  onDislike = output<string>();
  onViewDetails = output<CatImage>();
  hover = signal(false);

  displayBreedName(): string {
    const label = this.breedLabel();
    if (label) return label;
    const c = this.cat();
    return c.breeds?.[0]?.name ?? '';
  }

  hasBreedDetail(): boolean {
    return !!this.cat().breeds?.[0]?.id;
  }

  temperament(): string[] {
    const c = this.cat();
    const t = c.breeds?.[0]?.temperament;
    return t ? t.split(',').map((s) => s.trim()).filter(Boolean) : [];
  }

  getVote(): 0 | 1 | null {
    return this.store.getVote(this.cat().id);
  }

  isFavorite(): boolean {
    return this.store.isFavorite(this.cat().id);
  }

  toggleFav(): void {
    this.store.toggleFavorite(this.cat());
  }
}

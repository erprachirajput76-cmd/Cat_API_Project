import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { toBreedDetail } from '../../core/constants/routes.constants';
import { PageHeader } from '../../core/constants/app.constants';
import { CatStore } from '../../state/cat.store';
import { CatCardComponent } from '../../shared/components/cat-card/cat-card.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CatCardComponent, PageHeaderComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss',
})
export class FavoritesComponent {
  private readonly store = inject(CatStore);
  private readonly router = inject(Router);
  readonly pageHeader = PageHeader.FAVORITES;
  favorites = this.store.favorites;

  onLike(_imageId: string): void {}

  onDislike(_imageId: string): void {}

  onViewDetails(cat: { id: string; breeds?: { id: string }[] }): void {
    const breedId = cat.breeds?.[0]?.id;
    if (breedId) this.router.navigate(toBreedDetail(breedId));
  }
}

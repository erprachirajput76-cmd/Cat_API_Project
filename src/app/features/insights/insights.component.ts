import { Component, inject, signal, OnInit, computed } from '@angular/core';
import { CatStore } from '../../state/cat.store';
import { CatApiService } from '../../core/services/cat-api.service';
import { API_CONFIG } from '../../core/config/api.config';
import {
  PageHeader,
  InsightsChart,
  InsightsChartLabel,
} from '../../core/constants/app.constants';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [PageHeaderComponent, MatIconModule, MatTooltipModule],
  templateUrl: './insights.component.html',
  styleUrl: './insights.component.scss',
})
export class InsightsComponent implements OnInit {
  private readonly store = inject(CatStore);
  private readonly api = inject(CatApiService);

  readonly pageHeader = PageHeader.INSIGHTS;
  readonly chartLabels = InsightsChartLabel;

  fetchedMostLikedUrl = signal<string | null>(null);
  mostLikedImageUrl = computed(
    () => this.store.lastLikedCatImage()?.url ?? this.fetchedMostLikedUrl()
  );

  mostLikedImageId = this.store.mostLikedImageId;
  favoriteCount = this.store.favoriteCount;
  exploredCount = this.store.exploredCount;

  dislikeCount = this.store.dislikeCount;

  exploredPercent = computed(() =>
    Math.min(InsightsChart.MAX_PERCENT, this.exploredCount() * InsightsChart.EXPLORED_FACTOR)
  );
  favoritesPercent = computed(() =>
    Math.min(InsightsChart.MAX_PERCENT, this.favoriteCount() * InsightsChart.FAVORITES_FACTOR)
  );
  breedsPercent = computed(() =>
    Math.min(
      InsightsChart.MAX_PERCENT,
      this.store.viewedBreedIds().size * InsightsChart.BREEDS_FACTOR
    )
  );

  ngOnInit(): void {
    this.api.getVotes().subscribe((votes) => {
      this.store.setVotes(votes.map((v) => ({ image_id: v.image_id, value: v.value })));
    });
    if (this.store.breeds().length === 0) {
      this.api.getBreeds().subscribe((b) => this.store.setBreeds(b));
    }
    const id = this.mostLikedImageId();
    if (id && !this.store.lastLikedCatImage()) {
      this.api.getRandomCats(API_CONFIG.insightsFetchLimit).subscribe((cats) => {
        const cat = cats.find((c) => c.id === id);
        if (cat) this.fetchedMostLikedUrl.set(cat.url);
      });
    }
  }
}

import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CatApiService } from '../../core/services/cat-api.service';
import { RoutePathFull } from '../../core/constants/routes.constants';
import { LoaderMessage } from '../../core/constants/loader.constants';
import { PageHeader } from '../../core/constants/app.constants';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { LoaderComponent } from '../../shared/components/loader/loader.component';
import type { Breed } from '../../core/models/breed.model';

@Component({
  selector: 'app-breeds-list',
  standalone: true,
  imports: [RouterLink, MatCardModule, PageHeaderComponent, LoaderComponent],
  templateUrl: './breeds-list.component.html',
  styleUrl: './breeds-list.component.scss',
})
export class BreedsListComponent implements OnInit {
  private readonly api = inject(CatApiService);
  readonly routes = RoutePathFull;
  readonly loaderMessage = LoaderMessage.LOADING_BREEDS;
  readonly pageHeader = PageHeader.BREEDS;
  breeds = signal<Breed[]>([]);
  loading = signal(true);

  ngOnInit(): void {
    this.api.getBreeds().subscribe({
      next: (b) => {
        this.breeds.set(b);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}

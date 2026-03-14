import { Routes } from '@angular/router';
import { RoutePath } from './core/constants';

export const routes: Routes = [
  {
    path: RoutePath.HOME,
    loadComponent: () => import('./layout/shell/shell.component').then((m) => m.ShellComponent),
    children: [
      { path: RoutePath.HOME, loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent) },
      {
        path: RoutePath.EXPLORE,
        loadComponent: () => import('./features/explorer/explorer.component').then((m) => m.ExplorerComponent),
      },
      {
        path: RoutePath.BREEDS,
        loadComponent: () =>
          import('./features/breeds/breeds-list.component').then((m) => m.BreedsListComponent),
      },
      {
        path: RoutePath.BREEDS_DETAIL,
        loadComponent: () =>
          import('./features/breeds/breed-detail.component').then((m) => m.BreedDetailComponent),
      },
      {
        path: RoutePath.FAVORITES,
        loadComponent: () =>
          import('./features/favorites/favorites.component').then((m) => m.FavoritesComponent),
      },
      {
        path: RoutePath.INSIGHTS,
        loadComponent: () =>
          import('./features/insights/insights.component').then((m) => m.InsightsComponent),
      },
    ],
  },
  { path: '**', redirectTo: RoutePath.HOME },
];

/**
 * Application route paths. Use these for routerLink, navigate(), and route config
 * to keep paths in one place.
 */
export const RoutePath = {
  HOME: '',
  EXPLORE: 'explore',
  BREEDS: 'breeds',
  BREEDS_DETAIL: 'breeds/:id',
  FAVORITES: 'favorites',
  INSIGHTS: 'insights',
} as const;

export type RoutePathKey = keyof typeof RoutePath;

/** Build path array for breed detail: e.g. navigate(toBreedDetail('abys')) */
export function toBreedDetail(breedId: string): [string, string] {
  return [RoutePath.BREEDS, breedId];
}

/** Root path for breeds list */
export function toBreeds(): string {
  return '/' + RoutePath.BREEDS;
}

/** Full paths with leading slash for routerLink in templates */
export const RoutePathFull = {
  HOME: '/',
  EXPLORE: '/explore',
  BREEDS: '/breeds',
  FAVORITES: '/favorites',
  INSIGHTS: '/insights',
} as const;

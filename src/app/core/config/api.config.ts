export const API_CONFIG = {
  baseUrl: 'https://gps6cdg7h9.execute-api.eu-central-1.amazonaws.com/prod',
  /** Fallback to public Cat API if custom backend doesn't implement same shape */
  fallbackBaseUrl: 'https://api.thecatapi.com/v1',
  endpoints: {
    imagesSearch: '/images/search',
    breeds: '/breeds',
    votes: '/votes',
  },
  defaultLimit: 10,
  breedsImagesLimit: 8,
  /** Number of random cat images for home hero + about sections */
  homeRandomCatCount: 2,
  /** Explorer grid: images per page when no breed selected or breed selected */
  explorerListLimit: 20,
  /** Insights: fetch batch size when resolving most-liked image URL */
  insightsFetchLimit: 20,
} as const;

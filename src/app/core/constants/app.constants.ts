/**
 * App-wide constants: image sizes, page headers, video, insights chart, etc.
 */
export const ImageSize = {
  HERO: 420,
  ABOUT: 360,
} as const;

export const PageHeader = {
  HOME: { title: 'Feline Grace', subtitle: '' },
  EXPLORER: { title: 'Cat Explorer', subtitle: 'Discover cats by breed and temperament' },
  BREEDS: { title: 'Breeds', subtitle: 'Browse cat breeds and their traits' },
  BREED_DETAIL: { subtitle: '' }, // title comes from breed name
  FAVORITES: { title: 'Favorites', subtitle: "Cats you've saved for later" },
  INSIGHTS: { title: 'Insights', subtitle: 'Your feline discovery at a glance' },
} as const;

/** YouTube embed URL for home page video (cat-themed). */
export const VideoEmbed = {
  URL: 'https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1',
  TITLE: 'Cat video',
} as const;

/** Bar chart scale factors for Insights (bar height %). */
export const InsightsChart = {
  EXPLORED_FACTOR: 5,
  FAVORITES_FACTOR: 10,
  BREEDS_FACTOR: 15,
  MAX_PERCENT: 100,
} as const;

/** Accessibility / aria labels for chart bars */
export const InsightsChartLabel = {
  EXPLORED: 'Explored',
  FAVORITES: 'Favorites',
  BREEDS_VIEWED: 'Breeds viewed',
} as const;

/** Hero image alt text */
export const HeroImageAlt = {
  HERO: 'Elegant cat portrait',
  ABOUT: 'Person petting cats',
} as const;

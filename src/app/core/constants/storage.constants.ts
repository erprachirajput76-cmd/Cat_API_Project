/**
 * LocalStorage keys used by the application.
 */
export const StorageKey = {
  DARK_MODE: 'feline-grace-dark-mode',
  FAVORITES: 'feline-grace-favorites',
  EXPLORED: 'feline-grace-explored',
  VIEWED_BREEDS: 'feline-grace-viewed-breeds',
} as const;

export const DarkModeStorage = {
  ON: '1',
  OFF: '0',
} as const;

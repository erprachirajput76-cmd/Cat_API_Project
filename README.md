# Feline Grace – Warm Organic Cat Explorer

**Copyright (c) 2026 Prachi Rajput.** See [LICENSE](LICENSE) for terms.

A production-grade Angular application that consumes the Cat API to deliver a **premium editorial-style feline discovery platform**. Built with the latest stable Angular (19+), standalone components, signals, and a warm organic design system.

**Live Demo:** [https://erprachirajput76-cmd.github.io/Cat_API_Project/explorer](https://erprachirajput76-cmd.github.io/Cat_API_Project/explorer)

---

## Project overview

**Feline Grace** lets users explore cat breeds and images, save favorites, vote on cats, and view simple insights—all through a magazine-style UI with a warm cream, olive, sage, and coral peach palette.

---

## Architecture

- **Standalone-only**: No `NgModules`; every component, pipe, and directive is standalone.
- **Signals**: State is managed with Angular Signals in a central `CatStore` (favorites, explored count, viewed breeds, votes).
- **Zoneless-friendly**: The app uses `provideZoneChangeDetection({ eventCoalescing: true })` and is structured for future zoneless migration.
- **Strict TypeScript**: No `any`; all API and UI types are explicit.
- **Feature-based structure**: Code is organized by feature (home, explorer, breeds, favorites, insights) with a clear `core` / `shared` / `layout` / `state` split.
- **Clean architecture**: Services in `core`, UI in `shared` and `layout`, feature routes lazy-loaded.

### Folder structure

```
src/app
├── core/                 # Services, models, config
│   ├── config/
│   ├── models/
│   └── services/
├── features/
│   ├── home/
│   ├── explorer/
│   ├── breeds/
│   ├── favorites/
│   └── insights/
├── shared/
│   └── components/       # cat-card, organic-image, page-header
├── layout/
│   ├── header/
│   ├── sidebar/
│   └── shell/
├── state/
│   └── cat.store.ts
├── app.config.ts
├── app.routes.ts
└── main.ts
```

---

## Features

- **Home**: Editorial landing with hero (organic-shaped cat image), trusted partners, and an “About” section with a second organic image and play-style button.
- **Explorer**: Grid of cat cards with search, breed filter, and sort. Each card: image, breed name, temperament chips, like/dislike, favorite, and “View details.”
- **Breeds**: List of breeds as cards linking to breed detail.
- **Breed detail**: Main image, origin, life span, temperament chips, description, and expansion panel for characteristics; image carousel (8 images) with prev/next and dot indicators.
- **Favorites**: Grid of favorited cats (persisted in `localStorage`); remove from favorites.
- **Insights**: Dashboard with “Most liked cat,” “Most viewed breed,” “Cats explored,” “Total favorites,” and a simple bar-style overview.

---

## Angular concepts used

- **Standalone components** and **standalone directives/pipes**
- **Signals** and **computed** for reactive state (`CatStore`)
- **`provideZoneChangeDetection`** with event coalescing
- **`provideHttpClient`**, **`provideRouter`**, **`provideAnimations`**
- **Lazy-loaded routes** via `loadComponent`
- **Typed API layer** (`CatApiService`) with interfaces for all requests/responses
- **Angular Material** (form fields, buttons, chips, expansion panel, icons)
- **Control flow** (`@if`, `@for`) and **input/output** signals where relevant
- **Strict TypeScript** and **template type checking**

---

## API integration

Base URL: `https://gps6cdg7h9.execute-api.eu-central-1.amazonaws.com/prod`  
A fallback to the public Cat API is configured if the custom backend does not match the same response shape.

Every required endpoint is used at least once:

| Method / endpoint usage        | Used in                          |
|--------------------------------|-----------------------------------|
| `getRandomCats()`              | Home (hero/about), Explorer       |
| `getBreeds()`                  | Explorer, Breeds list, Breed detail, Store |
| `getImagesByBreed(breedId)`    | Explorer (breed filter), Breed detail carousel |
| `searchCats(query)`            | Explorer (search)                 |
| `addVote(payload)`             | Explorer (like/dislike)           |
| `getVotes()`                   | Insights                          |

All responses are typed (e.g. `CatImage`, `Breed`, `Vote`).

---

## Global theme – warm organic

- **Colors**: Warm cream `#f0f0e8`, deep olive `#5a5a40`, sage `#a3b18a`, coral peach `#ff9b85`, surface `#fdfdfb`.
- **Typography**: **Cormorant Garamond** for headings, **Inter** for body.
- **Organic shape**: `.organic-shape` with custom `border-radius` for image containers.
- **Cards**: `rounded-[2rem]`, soft shadows, generous spacing.
- **Buttons**: Rounded (e.g. full rounded for primary actions).

---

## Setup

1. **Prerequisites**: Node.js 18+ and npm.
2. **Install**:  
   `npm install`
3. **Run**:  
   `npm start`  
   App is served at `http://localhost:4200`.
4. **Build**:  
   `npm run build`  
   Output in `dist/feline-grace`.

---

## Screenshots

(Add screenshots of Home, Explorer, Breed detail, Favorites, and Insights after running the app.)

---

## Accessibility and practices

- **Alt text** on images; `referrerPolicy="no-referrer"` where required.
- **Lazy loading** for images and lazy-loaded route chunks.
- **Responsive layout** for main sections and grids.
- **Strict typing** and **error handling** in API calls (with fallback base URL).
- **No tables** in the UI (as per requirements).

---

## License

MIT License. Copyright (c) 2026 Prachi Rajput. See [LICENSE](LICENSE) for full terms.

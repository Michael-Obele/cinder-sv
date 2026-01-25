# Copilot Implementation Checklist

Follow these steps to build the Cinder Frontend.

## 🟦 Phase 1: Core Setup

- [ ] Initialize SvelteKit 5 project in `/frontend`.
- [ ] Set up Tailwind CSS and initialize **shadcn-svelte**.
- [ ] Install required shadcn components (`tabs`, `card`, `button`, etc.).
- [ ] Install **Valibot** for schema validation.
- [ ] Configure `THEME_CONFIG.md` (colors, dark mode).
- [ ] Configure environment variables in `.env`.
- [ ] Enable `remoteFunctions` and `experimental.async` in `svelte.config.js`.
- [ ] Implement `src/remote/cinder.remote.ts` using `form()` and `query()` with Valibot.

## 🟩 Phase 2: Components & Types

- [ ] Define TypeScript interfaces for backend responses based on `api-spec.md`.
- [ ] Build **`CodeViewer`** using `shadcn/tabs` and `shadcn/card`.
- [ ] Build **`OptionsSheet`** using `shadcn/sheet` for advanced settings.
- [ ] Build **`ResultCard`** for search results using `shadcn/card`.
- [ ] Set up **`Sonner`** for global notifications.

## 🟨 Phase 3: Playground Implementation

- [ ] Create `/playground` layout with a central input area using `shadcn/input`.
- [ ] Implement **Scrape** tab: Use the `scrape` remote form and bind to primitives using `fields`.
- [ ] Implement **Crawl** tab: Start Job (form submit) -> Polling (query) -> `shadcn/progress` tracker.
- [ ] Implement **Search** tab: Query input (remote form) -> `shadcn/skeleton` loading -> Result mapping.

## 🟧 Phase 4: Polish & Docs

- [ ] Create `/docs` route using Markdown files for documentation.
- [ ] Add Dark/Light mode toggle.
- [ ] Implement error handling and "Fallback" states for when the backend is offline.
- [ ] Add "Copy to Clipboard" functionality for all code results.

## 🟥 Phase 5: Final Review

- [ ] Verify all API calls go through Remote Functions (no leaked backend URL).
- [ ] Ensure Svelte 5 runes are used correctly.
- [ ] Test with different URL types (Static vs Dynamic).

# Features Detail

## 1. Universal Playground

The core feature where users can test all Cinder capabilities in one place.

- **`Tabs` Interface**:
  - **Scrape**: Instant URL-to-Markdown/JSON.
  - **Crawl**: Deep domain scraping with progress tracking.
  - **Search**: Web search followed by automated scraping.

### Scrape Feature

- **Input**: `Input` field with client-side preflight validation using Valibot.
- **Form Pattern**: Uses SvelteKit Remote Functions `form` API with shadcn `Input`, `Label`, and `Button` primitives (NO high-level `Form` wrapper).
- **Options Management**:
  - `Sheet` component for advanced settings (Headers, Cookies, Exclude Tags).
  - `Switch` for toggling JS rendering (Static vs Dynamic).
- **Output View**:
  - `Card` container for code results.
  - Nested `Tabs` for switching between Markdown, HTML, and raw JSON.
  - `Badge` for status codes (e.g., `200 OK` in green).

### Crawl Feature

- **Input**: Base URL `Input`.
- **Job Control**: `Button` to start/stop.
- **Job Status**:
  - `Progress` bar for overall completion.
  - `ScrollArea` for a live log of links found.
  - `Badge` status icons (Success, Running, Failed).

### Search Feature

- **Input**: Native search query `Input`.
- **Result List**:
  - `Card` components for each search hit.
  - `Skeleton` loaders while the search is fetching.
  - `Tooltip` for metadata details.

## 2. API Reference Page

A dedicated section of the site to help developers integrate Cinder.

- **Endpoint List**: Detailed view of Scrape, Crawl, and Search.
- **Example Code**: Snippets in `curl`, `javascript`, and `python`.
- **Response Schema**: Interactive JSON examples showing the data structure.

## 3. History Dashboard (Optional/Local)

- Store the last 10-20 requests in `localStorage`.
- Allow users to quickly "Re-run" a previous scrape or crawl.
- No backend database required for this stage.

## 4. Theme Support

- **Dark Mode**: Defaulting to a high-contrast dark theme (similar to Firecrawl).
- **Light Mode**: Clean, accessible alternative.
- **Tailwind-based**: Easy to customize.

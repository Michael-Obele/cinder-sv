# User Flows

## 1. Simple Scrape

1. User lands on `/playground`.
2. User enters `https://example.com` in the URL bar.
3. User ensures "Scrape" tab is active.
4. User clicks "Scrape".
5. A loading spinner appears.
6. The "Results" section slides up.
7. User toggles between "Markdown", "JSON", and "Metadata" tabs to inspect the output.
8. User clicks "Copy to Clipboard" for the Markdown.

## 2. Dynamic Crawl

1. User switches to the "Crawl" tab.
2. User enters `https://docs.cinder.io`.
3. User opens "Advanced Settings" and sets "Max Depth" to `2`.
4. User clicks "Start Crawl".
5. The UI shows "Crawler Started: [jobId]".
6. A progress bar appears (e.g., 10/100 pages).
7. A scrollable list of links found so far starts populated:
   - `https://docs.cinder.io/getting-started` ✅
   - `https://docs.cinder.io/api-reference` ✅
   - `https://docs.cinder.io/advanced` ... (loading)
8. Once finished, a "Download All as JSON" button appears.

## 3. Deep Search

1. User switches to the "Search" tab.
2. User enters "Best Go scraping libraries".
3. User clicks "Search".
4. The UI displays 10 search results from the Go backend.
5. Each result has a "View Scraped Content" button.
6. Clicking it opens a modal or side-panel with the full Markdown version of that specific result (fetched via the Scrape API).

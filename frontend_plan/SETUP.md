# Setup & Environment Guide

To build and run the Cinder frontend, follow these steps.

## 🚀 Initialization

1. **Scaffold Project**:

   ```bash
   npx sv create frontend --template=skeleton --types=ts --no-install
   ```

2. **Add Tailwind CSS**:

   ```bash
   npx sv add tailwindcss
   ```

3. **Initialize shadcn-svelte**:

   ```bash
   npx shadcn-svelte@latest init
   ```

   _Select 'Slate' as base color, 'src/app.css' for global CSS, and '$lib/components' for alias._

4. **Install UI Components**:

   ```bash
   npx shadcn-svelte@latest add tabs card button input label sheet switch progress badge scroll-area skeleton sonner tooltip sidebar
   ```

5. **Install Additional Dependencies**:
   ```bash
   npm install lucide-svelte valibot clsx tailwind-merge bits-ui svelte-sonner
   ```

## ⚙️ Configuration (.env)

Create a `.env` file in the `frontend` root:

```ini
# Backend URL (INTERNAL - only used by SvelteKit Server)
PRIVATE_CINDER_BACKEND_URL=http://localhost:8080/v1

# API Key for Backend (if any)
PRIVATE_CINDER_API_KEY=your_secret_key

# Public URL (if frontend needs to hit the backend directly - not recommended for prod)
# PUBLIC_CINDER_API_URL=http://localhost:8080/v1
```

## 🛠 SvelteKit Setup

### 1. Enable Remote Functions

Update `svelte.config.js` to enable the experimental remote functions feature and async rune support.

```javascript
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		experimental: {
			remoteFunctions: true
		}
	},
	compilerOptions: {
		experimental: {
			async: true
		}
	}
};
export default config;
```

### 2. Implement Remote Functions

Create `src/remote/cinder.remote.ts` to handle secure communication with the Go backend. Uses **Valibot** for schema validation.

```typescript
import { query, form } from "$app/server";
import {
  PRIVATE_CINDER_BACKEND_URL,
  PRIVATE_CINDER_API_KEY,
} from "$env/static/private";
import { error } from "@sveltejs/kit";
import * as v from "valibot";

const fetchBackend = async (path: string, body: any) => {
  const url = `${PRIVATE_CINDER_BACKEND_URL}${path}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": PRIVATE_CINDER_API_KEY,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw error(response.status, await response.text());
  }
  return response.json();
};

export const scrape = form(
  v.object({
    url: v.pipe(v.string(), v.url()),
    mode: v.optional(v.picklist(["smart", "static", "dynamic"]), "smart"),
    render: v.optional(v.boolean(), false),
  }),
  async (data) => {
    return fetchBackend("/scrape", data);
  },
);

export const search = form(
  v.object({
    query: v.pipe(v.string(), v.minLength(1)),
    limit: v.optional(v.number(), 5),
  }),
  async (data) => {
    return fetchBackend("/search", data);
  },
);

export const startCrawl = form(
  v.object({
    url: v.pipe(v.string(), v.url()),
    render: v.optional(v.boolean(), false),
  }),
  async (data) => {
    return fetchBackend("/crawl", data);
  },
);

export const getCrawlStatus = query(v.string(), async (id) => {
  return fetchBackend(`/crawl/${id}`, {});
});
```

### 3. Usage in Components

Since we are using `form` remote functions, we use the `fields` API to bind to shadcn primitives and handle status.

```html
<script lang="ts">
    import { scrape } from '../remote/cinder.remote';
    import { Input } from "$lib/components/ui/input";
    import { Button } from "$lib/components/ui/button";
    import { Label } from "$lib/components/ui/label";

    const { url } = scrape.fields;
</script>

<form {...scrape}>
    <Label for="url">Target URL</Label>
    <Input {...url.as('text')} placeholder="https://example.com" />

    {#each url.issues() as issue}
        <p class="text-sm text-destructive">{issue.message}</p>
    {/each}

    <Button type="submit" disabled={scrape.pending}>
        {scrape.pending ? 'Scraping...' : 'Submit'}
    </Button>
</form>

{#if scrape.result}
    <pre>{JSON.stringify(scrape.result, null, 2)}</pre>
{/if}
```

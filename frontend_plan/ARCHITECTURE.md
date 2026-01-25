# Architecture Design

## 🏗 High-Level Overview

The frontend will be a SvelteKit application that interacts with the Cinder Go backend. We will utilize **Remote Functions** (introduced in SvelteKit 2.27) to handle secure server-side logic and provide a type-safe RPC-like interface to our Go backend.

### Data Flow

1. **User Interaction**: User enters a URL/Query in a Svelte 5 component.
2. **Remote Function Call**: The component calls a function imported from `src/remote/cinder.remote.ts`.
3. **Execution (Server-Side)**:
   - SvelteKit executes the function on the server.
   - The function retrieves `PRIVATE_CINDER_BACKEND_URL` and `PRIVATE_CINDER_API_KEY` from private environment variables.
   - It performs the `fetch` call to the Go backend.
4. **Backend Response**: Go backend returns the result.
5. **Frontend Update**: SvelteKit serializes the result and returns it directly to the caller in the browser.
6. **UI Rendering**: The UI reactively updates using Runes.

## 🔧 Svelte 5 Runes & Remote Functions

We will use the latest Svelte 5 and SvelteKit patterns:

- **`$state`**: To manage form inputs and local component state.
- **Remote `query`**: For data-fetching operations like `scrape`, and `search`.
- **Remote `form`**: For submitting data (Scrape, Search, Crawl Start). Uses Valibot for schema validation.
- **Remote `command`**: For triggering discrete actions.
- **`$derived`**: For UI logic like computing if a URL is valid or formatting timestamps.
- **`$effect`**: Used for polling job status by calling a remote `query`.

## 🧪 Validation & Form Handling

- **Valibot**: Used for all schema definitions. It is lightweight and works seamlessly with SvelteKit's Remote Functions.
- **Manual Form Rendering**: We will **NOT** use the `shadcn-svelte` Form component. Instead, we use the `form` remote function's built-in `fields` API:
  - Spread `fields.x.as('text')` onto shadcn `Input` primitives.
  - Render validation errors using `{#each fields.x.issues() as issue}`.
  - This provides a clean, native Svelte experience with minimal abstraction.

## 📁 Suggested Directory Structure

```text
/frontend
├── src/
│   ├── lib/
│   │   ├── components/      # UI components (ResultCard, CodeViewer)
│   │   ├── utils/           # Formatting and validation logic
│   ├── remote/              # Remote Functions (RPC-style server logic)
│   │   └── cinder.remote.ts # Scrape, Crawl, and Search remote handlers
│   ├── routes/
│   │   ├── +layout.svelte   # Navbar, Footer, and Global Styles
│   │   └── playground/      # Combined Scrape/Crawl/Search view
├── .env.example             # Template for environment variables
└── svelte.config.js         # Opt-in to experimental Remote Functions
```

## 🔒 Security & Environment

Since the backend lacks native authentication (for now), the frontend must carefully manage secrets.

- **`PRIVATE_CINDER_API_URL`**: Only accessible on the server.
- **`PRIVATE_CINDER_API_KEY`**: Attached to requests in the proxy layer.
- **Client-Side**: Only public URL configuration should be exposed if necessary for direct local dev.

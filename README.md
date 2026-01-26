# Cinder-sv

**A lightweight, Go-powered alternative to Firecrawl.**

[![Svelte 5](https://img.shields.io/badge/Svelte-5.0-ff3e00?logo=svelte)](https://svelte.dev)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?logo=tailwind-css)](https://tailwindcss.com)
[![Bun](https://img.shields.io/badge/Bun-1.1+-f9f1e1?logo=bun)](https://bun.sh)

Cinder-sv is the modern Svelte 5 frontend for the [Cinder Scraper & Crawler Backend](https://github.com/Michael-Obele/cinder).

I built Cinder because I wanted a lightweight, easily deployable version of what Firecrawl offers, leveraging a language that does the job better and easier: **Go**. While Firecrawl is powerful, Cinder focuses on speed, simplicity, and low-overhead deployment.

---

## 👋 About the Author

Hi, I'm [Michael Obele](https://github.com/Michael-Obele). I'm a Network Engineer by trade and a Svelte enthusiast by passion. I've spent a lot of time building specialized MCP servers and exploring the Svelte ecosystem. I'm building Cinder solo for now, focusing on creating high-performance tools that are actually enjoyable to deploy and use.

## 🚀 Key Features

- **Universal Playground**: A single interface to access Scrape, Crawl, and Search.
- **Scrape (Extract)**: Convert any URL into clean Markdown, HTML, or structured JSON. Supports JS rendering and mobile emulation.
- **Deep Crawl**: Domain-wide discovery with real-time progress tracking and live link discovery logs.
- **Integrated Search**: Search the web and immediately scrape the most relevant results into your workspace.
- **Remote Function Architecture**: Uses SvelteKit's RPC-style Remote Functions as a secure bridge to the Cinder Go backend.
- **Cinder Glow Theme**: A purpose-built, Slate and Amber-based high-contrast dark theme optimized for developer focus.

## 🔮 Coming Soon: Cinder MCP

There is already an **MCP version** of Cinder ready! It allows you to use Cinder's scraping and crawling capabilities directly within your AI workflows (like Claude Desktop or Cursor). It will be open-sourced very soon—stay tuned!

## 🛠 Tech Stack

- **Framework**: [SvelteKit 5](https://kit.svelte.dev/) (using [Runes](https://svelte.dev/blog/runes) for reactive state).
- **Communication**: [Remote Functions](https://kit.svelte.dev/docs/server-only-modules#remote-functions) (The primary RPC bridge for now).
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with OKLCH color spaces.
- **Validation**: [Valibot](https://valibot.io/) (Lightweight schema validation).
- **Icons**: [@lucide/svelte](https://lucide.dev/).
- **UI Components**: [Bits UI](https://bits-ui.com/) & [shadcn-svelte](https://shadcn-svelte.com/) primitives.
- **Runtime**: [Bun](https://bun.sh/) (Fastest package manager and task runner).

## 📂 Project Structure

```text
src/
├── remote/            # Remote Functions (Secure RPC proxy to Cinder backend)
│   └── cinder.remote.ts # Current core logic for Scrape, Crawl, and Search
├── lib/
│   ├── components/    # Reusable UI Blocks (ResultCard, CodeViewer, etc.)
│   └── assets/        # Global assets and styles
├── routes/
│   ├── +layout.svelte # Global Navbar/Footer & Theme provider
│   ├── playground/    # Core tool interface
│   └── docs/          # Technical documentation
```

## 🏁 Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed globally.
- A running [Cinder Go Backend](https://github.com/Michael-Obele/cinder) instance.

### Installation

1. Clone the repository and install dependencies:

   ```bash
   bun install
   ```

2. Set up your environment variables:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and provide your backend details:
   ```ini
   PRIVATE_CINDER_BACKEND_URL=http://localhost:8080/v1
   PRIVATE_CINDER_API_KEY=your_secret_key
   ```

### Development

Start the development server:

```bash
bun dev
```

Run type checks:

```bash
bun check
```

## 🏗 Architecture

Cinder-sv follows a "Backend-as-Proxy" architecture using SvelteKit's server-side logic:

1. **RPC-style Calls**: The frontend imports functions from `src/remote/cinder.remote.ts`.
2. **Server-Side Execution**: When called, SvelteKit executes the code on the server, keeping API keys and internal backend URLs private.
3. **Reactive Runes**: The UI uses Svelte 5 `$state` and `$derived` to handle asynchronous results and polling (e.g., checking crawl status) with zero boilerplate.

---

Built with ❤️ by [Michael-Obele](https://github.com/Michael-Obele).

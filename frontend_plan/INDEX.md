# Cinder Frontend Plan

This document outlines the plan for building a modern web frontend for the Cinder Scraper backend.

## 🎯 Objective

Create a professional, user-friendly interface similar to Firecrawl, allowing users to interact with Cinder's scraping, crawling, and search capabilities without using the CLI or API directly.

## 🛠 Tech Stack

- **Framework**: SvelteKit 5 (using Runes: `$state`, `$derived`, `$effect`, etc.)
- **Styling**: Tailwind CSS
- **UI Components**: Bits UI / Shadcn Svelte
- **Icons**: Lucide Svelte
- **Type Safety**: TypeScript & Zod
- **Data Fetching**: Native Fetch API with typed wrappers

## 📂 Plan Structure

1. [Architecture](./ARCHITECTURE.md) - Technical design and data flow.
2. [Features](./FEATURES.md) - Detail of Playground, Scrape, Crawl, and Search.
3. [Setup & Environment](./SETUP.md) - How to initialize and configure.
4. [User Flow](./USER_FLOW.md) - Key user journeys.
5. [Checklist](./CHECKLIST.md) - Implementation steps for Copilot.

---

## 🌟 Key Principles

- **Open Source First**: Easy to self-host with minimal configuration.
- **Privacy**: No external trackers; direct communication with the user's backend.
- **Speed**: Optimized for fast response times and lightweight client-side state.
- **Developer Friendly**: Clean code, well-commented, and typed.

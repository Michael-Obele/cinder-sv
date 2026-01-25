<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Alert from '$lib/components/ui/alert';
	import { Badge } from '$lib/components/ui/badge';
	import {
		ArrowRight,
		Terminal,
		BookOpen,
		Zap,
		Map,
		Grid,
		Code,
		Play,
		Cpu,
		Lock,
		Palette
	} from '@lucide/svelte';
</script>

<div class="space-y-12">
	<!-- Hero Section -->
	<div class="prose prose-sm dark:prose-invert max-w-none">
		<h1 class="mb-4 text-4xl font-bold tracking-tight">Cinder Frontend Documentation</h1>
		<p class="text-xl text-muted-foreground">
			Welcome to the official documentation for the Cinder Frontend. A modern, type-safe web
			interface for the Cinder Scraper backend built with SvelteKit 5, Svelte 5 Runes, and Tailwind
			CSS v4.
		</p>
	</div>

	<!-- Quick Start Cards -->
	<section class="not-prose space-y-4">
		<h2 class="text-2xl font-bold">Quick Start</h2>
		<div class="grid gap-4 md:grid-cols-3">
			<a
				href="/playground"
				class="group relative rounded-lg border p-6 transition-all hover:border-primary hover:bg-muted/50"
			>
				<div class="mb-3 flex items-center gap-2">
					<Play class="h-5 w-5 text-primary" />
					<h3 class="font-semibold">Try Playground</h3>
					<ArrowRight
						class="ml-auto h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
					/>
				</div>
				<p class="text-sm text-muted-foreground">
					Test scraping, crawling, and search interactively with your backend.
				</p>
			</a>

			<a
				href="/docs/setup"
				class="group relative rounded-lg border p-6 transition-all hover:border-primary hover:bg-muted/50"
			>
				<div class="mb-3 flex items-center gap-2">
					<Zap class="h-5 w-5 text-amber-500" />
					<h3 class="font-semibold">Setup Guide</h3>
					<ArrowRight
						class="ml-auto h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
					/>
				</div>
				<p class="text-sm text-muted-foreground">Get the frontend up and running in minutes.</p>
			</a>

			<a
				href="/docs/architecture"
				class="group relative rounded-lg border p-6 transition-all hover:border-primary hover:bg-muted/50"
			>
				<div class="mb-3 flex items-center gap-2">
					<Map class="h-5 w-5 text-blue-500" />
					<h3 class="font-semibold">Architecture</h3>
					<ArrowRight
						class="ml-auto h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
					/>
				</div>
				<p class="text-sm text-muted-foreground">Understand the technical design and data flow.</p>
			</a>
		</div>
	</section>

	<!-- Tech Stack Overview -->
	<section class="not-prose space-y-4">
		<h2 class="text-2xl font-bold">Technology Stack</h2>
		<div class="grid gap-4 md:grid-cols-2">
			<Card.Root class="overflow-hidden">
				<Card.Header class="pb-3">
					<Card.Title class="flex items-center gap-2 text-base">
						<Code class="h-4 w-4" />
						Frontend
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm">
					<div class="flex items-center justify-between">
						<span>SvelteKit 5</span>
						<Badge>Framework</Badge>
					</div>
					<div class="flex items-center justify-between">
						<span>Svelte 5 Runes</span>
						<Badge variant="secondary">Reactivity</Badge>
					</div>
					<div class="flex items-center justify-between">
						<span>Tailwind CSS v4</span>
						<Badge variant="secondary">Styling</Badge>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root class="overflow-hidden">
				<Card.Header class="pb-3">
					<Card.Title class="flex items-center gap-2 text-base">
						<Cpu class="h-4 w-4" />
						Backend Communication
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm">
					<div class="flex items-center justify-between">
						<span>Remote Functions</span>
						<Badge>RPC</Badge>
					</div>
					<div class="flex items-center justify-between">
						<span>Valibot</span>
						<Badge variant="secondary">Validation</Badge>
					</div>
					<div class="flex items-center justify-between">
						<span>TypeScript</span>
						<Badge variant="secondary">Type Safe</Badge>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root class="overflow-hidden">
				<Card.Header class="pb-3">
					<Card.Title class="flex items-center gap-2 text-base">
						<Grid class="h-4 w-4" />
						UI Components
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm">
					<div class="flex items-center justify-between">
						<span>shadcn-svelte</span>
						<Badge>Primitives</Badge>
					</div>
					<div class="flex items-center justify-between">
						<span>Bits UI</span>
						<Badge variant="secondary">Headless</Badge>
					</div>
					<div class="flex items-center justify-between">
						<span>Lucide Icons</span>
						<Badge variant="secondary">Icons</Badge>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root class="overflow-hidden">
				<Card.Header class="pb-3">
					<Card.Title class="flex items-center gap-2 text-base">
						<Lock class="h-4 w-4" />
						Security
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm">
					<div class="flex items-center justify-between">
						<span>Private API Keys</span>
						<Badge>Server-side</Badge>
					</div>
					<div class="flex items-center justify-between">
						<span>No Trackers</span>
						<Badge variant="secondary">Privacy</Badge>
					</div>
					<div class="flex items-center justify-between">
						<span>Type Safety</span>
						<Badge variant="secondary">Validation</Badge>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	</section>

	<!-- Key Principles -->
	<section class="not-prose space-y-4">
		<h2 class="text-2xl font-bold">Key Principles</h2>

		<Alert.Root class="mb-6">
			<Zap class="h-4 w-4" />
			<Alert.Title>Modern Development</Alert.Title>
			<Alert.Description>
				Built with Svelte 5 runes, Remote Functions, and type-safe patterns for a delightful
				developer experience.
			</Alert.Description>
		</Alert.Root>

		<div class="grid gap-4 md:grid-cols-2">
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Open Source First</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm text-muted-foreground">
					Easy to self-host with minimal configuration. Deploy anywhere with zero lock-in.
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Privacy Focused</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm text-muted-foreground">
					No external trackers. Direct communication with your backend. Your data stays yours.
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Lightning Fast</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm text-muted-foreground">
					Optimized bundle size, lazy loading, and efficient state management for snappy
					performance.
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Developer Friendly</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm text-muted-foreground">
					Clean code with TypeScript, well-documented, and following modern Svelte 5 patterns.
				</Card.Content>
			</Card.Root>
		</div>
	</section>

	<!-- Documentation Navigation -->
	<section class="not-prose space-y-4">
		<h2 class="text-2xl font-bold">Documentation</h2>
		<div class="grid gap-3">
			<!-- Getting Started -->
			<a
				href="/docs/setup"
				class="group rounded-lg border p-4 transition-all hover:border-primary hover:bg-muted/50"
			>
				<div class="flex items-start gap-3">
					<BookOpen class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
					<div class="flex-1">
						<h3 class="mb-0.5 text-sm font-semibold">Getting Started</h3>
						<p class="text-xs text-muted-foreground">Introduction and setup guide</p>
					</div>
					<ArrowRight
						class="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary"
					/>
				</div>
			</a>

			<!-- Architecture Design -->
			<a
				href="/docs/architecture"
				class="group rounded-lg border p-4 transition-all hover:border-primary hover:bg-muted/50"
			>
				<div class="flex items-start gap-3">
					<Map class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
					<div class="flex-1">
						<h3 class="mb-0.5 text-sm font-semibold">Architecture Design</h3>
						<p class="text-xs text-muted-foreground">Technical design, data flow, and patterns</p>
					</div>
					<ArrowRight
						class="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary"
					/>
				</div>
			</a>

			<!-- Features Overview -->
			<a
				href="/docs/features"
				class="group rounded-lg border p-4 transition-all hover:border-primary hover:bg-muted/50"
			>
				<div class="flex items-start gap-3">
					<Grid class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
					<div class="flex-1">
						<h3 class="mb-0.5 text-sm font-semibold">Features Overview</h3>
						<p class="text-xs text-muted-foreground">Scrape, Crawl, and Search capabilities</p>
					</div>
					<ArrowRight
						class="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary"
					/>
				</div>
			</a>

			<!-- User Flows -->
			<a
				href="/docs/user-flow"
				class="group rounded-lg border p-4 transition-all hover:border-primary hover:bg-muted/50"
			>
				<div class="flex items-start gap-3">
					<Play class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
					<div class="flex-1">
						<h3 class="mb-0.5 text-sm font-semibold">User Flows</h3>
						<p class="text-xs text-muted-foreground">How users interact with the app</p>
					</div>
					<ArrowRight
						class="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary"
					/>
				</div>
			</a>

			<!-- Theme & Styling -->
			<a
				href="/docs/theme"
				class="group rounded-lg border p-4 transition-all hover:border-primary hover:bg-muted/50"
			>
				<div class="flex items-start gap-3">
					<Palette class="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
					<div class="flex-1">
						<h3 class="mb-0.5 text-sm font-semibold">Theme & Styling</h3>
						<p class="text-xs text-muted-foreground">Customize colors and design tokens</p>
					</div>
					<ArrowRight
						class="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary"
					/>
				</div>
			</a>
		</div>
	</section>

	<!-- Get Help -->
	<section class="not-prose space-y-4 rounded-lg border bg-muted/30 p-6">
		<h2 class="text-xl font-bold">Need Help?</h2>
		<p class="text-sm text-muted-foreground">
			Check out the setup guide to get started, explore the architecture to understand how
			everything works, or browse the features to see what's possible.
		</p>
		<div class="flex flex-wrap gap-3">
			<a
				href="/playground"
				class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
			>
				Open Playground
			</a>
			<a
				href="/docs/setup"
				class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
			>
				View Setup Guide
			</a>
		</div>
	</section>
</div>

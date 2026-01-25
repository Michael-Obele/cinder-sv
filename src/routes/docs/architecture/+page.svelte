<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Cpu, Database, Globe, Lock, Zap, Layers, Code, Shield } from '@lucide/svelte';
</script>

<div class="prose prose-sm dark:prose-invert max-w-none space-y-8">
	<div>
		<h1 class="mb-2 text-3xl font-bold tracking-tight">Architecture Design</h1>
		<p class="text-lg text-muted-foreground">
			Understanding the Cinder Frontend's technical foundation and data flow.
		</p>
	</div>

	<!-- High-Level Overview -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">High-Level Overview</h2>
		<p>
			The Cinder Frontend is a SvelteKit application that interacts with the Cinder Go backend
			through a secure, type-safe RPC-like interface powered by Remote Functions.
		</p>

		<div class="my-6 rounded-lg border bg-muted/30 p-6">
			<h3 class="mb-4 flex items-center gap-2 text-base font-semibold">
				<Layers class="h-5 w-5" />
				Data Flow Pipeline
			</h3>
			<div class="space-y-3 text-sm">
				<div class="flex gap-3">
					<div class="min-w-fit rounded bg-primary/20 px-3 py-2 font-mono text-primary">1</div>
					<div>
						<strong>User Interaction</strong>
						<p class="text-muted-foreground">User enters a URL or query in a Svelte 5 component.</p>
					</div>
				</div>
				<div class="flex gap-3">
					<div class="min-w-fit rounded bg-primary/20 px-3 py-2 font-mono text-primary">2</div>
					<div>
						<strong>Remote Function Call</strong>
						<p class="text-muted-foreground">
							Component calls a function imported from <code class="text-primary"
								>src/remote/cinder.remote.ts</code
							>
						</p>
					</div>
				</div>
				<div class="flex gap-3">
					<div class="min-w-fit rounded bg-primary/20 px-3 py-2 font-mono text-primary">3</div>
					<div>
						<strong>Server-Side Execution</strong>
						<p class="text-muted-foreground">
							SvelteKit executes the function on the server, retrieving private environment
							variables for secure API communication.
						</p>
					</div>
				</div>
				<div class="flex gap-3">
					<div class="min-w-fit rounded bg-primary/20 px-3 py-2 font-mono text-primary">4</div>
					<div>
						<strong>Backend Request</strong>
						<p class="text-muted-foreground">
							The server makes a fetch call to the Go backend with the API key attached.
						</p>
					</div>
				</div>
				<div class="flex gap-3">
					<div class="min-w-fit rounded bg-primary/20 px-3 py-2 font-mono text-primary">5</div>
					<div>
						<strong>Response Serialization</strong>
						<p class="text-muted-foreground">
							SvelteKit serializes the response and returns it directly to the browser.
						</p>
					</div>
				</div>
				<div class="flex gap-3">
					<div class="min-w-fit rounded bg-primary/20 px-3 py-2 font-mono text-primary">6</div>
					<div>
						<strong>Reactive UI Update</strong>
						<p class="text-muted-foreground">
							The UI reactively updates using Svelte 5 runes ($state, $derived, $effect).
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Tech Stack -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Technology Stack</h2>

		<div class="grid gap-4 md:grid-cols-2">
			<Card.Root class="overflow-hidden">
				<Card.Header class="pb-3">
					<Card.Title class="flex items-center gap-2 text-base">
						<Code class="h-4 w-4" />
						Frontend Framework
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm">
					<div class="flex justify-between">
						<span class="font-medium">SvelteKit 5</span>
						<Badge variant="outline">Latest</Badge>
					</div>
					<p class="text-muted-foreground">
						Full-stack meta-framework with remote functions support.
					</p>
				</Card.Content>
			</Card.Root>

			<Card.Root class="overflow-hidden">
				<Card.Header class="pb-3">
					<Card.Title class="flex items-center gap-2 text-base">
						<Zap class="h-4 w-4" />
						Reactivity
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm">
					<div class="flex justify-between">
						<span class="font-medium">Svelte 5 Runes</span>
						<Badge variant="outline">Modern</Badge>
					</div>
					<p class="text-muted-foreground">
						$state, $derived, $effect, $props for fine-grained reactivity.
					</p>
				</Card.Content>
			</Card.Root>

			<Card.Root class="overflow-hidden">
				<Card.Header class="pb-3">
					<Card.Title class="flex items-center gap-2 text-base">
						<Globe class="h-4 w-4" />
						Styling
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm">
					<div class="flex justify-between">
						<span class="font-medium">Tailwind CSS v4</span>
						<Badge variant="outline">OKLCH</Badge>
					</div>
					<p class="text-muted-foreground">
						Utility-first CSS with OKLCH color space & Cinder Glow theme.
					</p>
				</Card.Content>
			</Card.Root>

			<Card.Root class="overflow-hidden">
				<Card.Header class="pb-3">
					<Card.Title class="flex items-center gap-2 text-base">
						<Database class="h-4 w-4" />
						Components
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm">
					<div class="flex justify-between">
						<span class="font-medium">shadcn-svelte</span>
						<Badge variant="outline">Bits UI</Badge>
					</div>
					<p class="text-muted-foreground">Headless component primitives with Tailwind styling.</p>
				</Card.Content>
			</Card.Root>

			<Card.Root class="overflow-hidden">
				<Card.Header class="pb-3">
					<Card.Title class="flex items-center gap-2 text-base">
						<Lock class="h-4 w-4" />
						Validation
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm">
					<div class="flex justify-between">
						<span class="font-medium">Valibot</span>
						<Badge variant="outline">Lightweight</Badge>
					</div>
					<p class="text-muted-foreground">
						Type-safe schema validation for all remote function inputs.
					</p>
				</Card.Content>
			</Card.Root>

			<Card.Root class="overflow-hidden">
				<Card.Header class="pb-3">
					<Card.Title class="flex items-center gap-2 text-base">
						<Shield class="h-4 w-4" />
						API Communication
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm">
					<div class="flex justify-between">
						<span class="font-medium">Remote Functions</span>
						<Badge variant="outline">RPC</Badge>
					</div>
					<p class="text-muted-foreground">
						Type-safe server-side RPC calls with automatic serialization.
					</p>
				</Card.Content>
			</Card.Root>
		</div>
	</section>

	<!-- Svelte 5 Runes & Remote Functions -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Svelte 5 Runes & Remote Functions</h2>

		<Alert.Root class="mb-6">
			<Zap class="h-4 w-4" />
			<Alert.Title>Modern Reactivity</Alert.Title>
			<Alert.Description>
				All components use Svelte 5 runes for fine-grained reactivity. Legacy patterns like
				<pre class="overflow-x-auto rounded bg-muted p-3 text-xs"> <code>let</code>, <code>$:</code
					>, and <code>export let</code></pre>
				are not used.
			</Alert.Description>
		</Alert.Root>

		<div class="space-y-4">
			<div class="rounded-lg border p-4">
				<h4 class="mb-2 flex items-center gap-2 font-semibold">
					<Badge variant="secondary">$state</Badge>
					Component State
				</h4>
				<p class="mb-2 text-sm text-muted-foreground">
					Declares reactive variables that trigger UI updates when changed.
				</p>
				<pre class="overflow-x-auto rounded bg-muted p-3 text-xs"><code
						>{`let url = $state('');
let isLoading = $state(false);`}</code
					></pre>
			</div>

			<div class="rounded-lg border p-4">
				<h4 class="mb-2 flex items-center gap-2 font-semibold">
					<Badge variant="secondary">$derived</Badge>
					Computed Values
				</h4>
				<p class="mb-2 text-sm text-muted-foreground">
					Automatically updated computed values that depend on state.
				</p>
				<pre class="overflow-x-auto rounded bg-muted p-3 text-xs"><code
						>{`let isValid = $derived(url.startsWith('http'));
let errorCount = $derived(errors.length);`}</code
					></pre>
			</div>

			<div class="rounded-lg border p-4">
				<h4 class="mb-2 flex items-center gap-2 font-semibold">
					<Badge variant="secondary">$effect</Badge>
					Side Effects
				</h4>
				<p class="mb-2 text-sm text-muted-foreground">
					Handle side effects like timers, subscriptions, and DOM manipulation.
				</p>
				<pre class="overflow-x-auto rounded bg-muted p-3 text-xs"><code
						>{`$effect(() => {
  if (crawlForm.result?.id) {
    const interval = setInterval(() => {
      statusQuery.refetch(crawlForm.result.id);
    }, 2000);
    return () => clearInterval(interval);
  }
});`}</code
					></pre>
			</div>

			<div class="rounded-lg border p-4">
				<h4 class="mb-2 flex items-center gap-2 font-semibold">
					<Badge variant="secondary">Remote Functions</Badge>
					API Calls
				</h4>
				<p class="mb-2 text-sm text-muted-foreground">
					Type-safe server-side functions for data fetching and mutations.
				</p>
				<pre class="overflow-x-auto rounded bg-muted p-3 text-xs"><code
						>{`// Query pattern - for reading data
let statusQuery = getCrawlStatus();

// Form pattern - for mutations
let scrapeForm = scrapeUrl();
<form method="POST" use:scrapeForm.enhance>
  <input {...scrapeForm.fields.url.as('text')} />
</form>`}</code
					></pre>
			</div>
		</div>
	</section>

	<!-- Directory Structure -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Directory Structure</h2>

		<div class="rounded-lg border bg-muted/30 p-6 font-mono text-sm">
			<pre>{`/src
├── lib/
│   ├── components/        # Reusable UI components
│   │   ├── ui/           # shadcn-svelte primitives
│   │   └── blocks/       # Composed feature blocks
│   └── utils.ts          # Helper functions
├── remote/
│   └── cinder.remote.ts  # Server-side RPC functions
└── routes/
    ├── +layout.svelte    # Global layout
    ├── playground/       # Main feature page
    └── docs/            # Documentation pages
        ├── +layout.svelte
        ├── +page.svelte
        ├── architecture/
        ├── features/
        ├── setup/
        ├── theme/
        └── user-flow/`}</pre>
		</div>

		<p class="mt-4 text-sm text-muted-foreground">
			All backend communication flows through <code class="text-primary"
				>src/remote/cinder.remote.ts</code
			>
			, which handles API calls, validation, and type safety.
		</p>
	</section>

	<!-- Security & Environment -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Security & Environment Variables</h2>

		<Alert.Root variant="destructive" class="mb-6">
			<Shield class="h-4 w-4" />
			<Alert.Title>Secrets Protection</Alert.Title>
			<Alert.Description>
				API keys and authentication credentials are stored in <strong
					>private environment variables</strong
				>
				and never exposed to the browser.
			</Alert.Description>
		</Alert.Root>

		<div class="space-y-4">
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Environment Variables</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-3 text-sm">
					<div>
						<p class="font-medium text-primary">PRIVATE_CINDER_BACKEND_URL</p>
						<p class="text-muted-foreground">Backend service endpoint (server-side only)</p>
					</div>
					<div>
						<p class="font-medium text-primary">PRIVATE_CINDER_API_KEY</p>
						<p class="text-muted-foreground">Authentication key for backend (server-side only)</p>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Data Flow Security</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm text-muted-foreground">
					<p>✓ API keys remain on the server, never sent to the client</p>
					<p>✓ All backend communication happens server-side</p>
					<p>✓ Results are serialized and returned to the browser</p>
					<p>✓ No direct client-to-backend communication</p>
				</Card.Content>
			</Card.Root>
		</div>
	</section>

	<!-- Design Principles -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Design Principles</h2>

		<div class="grid gap-4 md:grid-cols-2">
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Simplicity</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm text-muted-foreground">
					Minimal abstraction layers. Direct communication between UI and backend through type-safe
					remote functions.
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Type Safety</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm text-muted-foreground">
					Full TypeScript support with Valibot schemas for validation. Compile-time and runtime
					checking.
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Reactivity</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm text-muted-foreground">
					Fine-grained reactive state using Svelte 5 runes. Only what changes triggers updates.
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Privacy First</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm text-muted-foreground">
					All sensitive operations stay server-side. No external trackers or analytics.
				</Card.Content>
			</Card.Root>
		</div>
	</section>
</div>

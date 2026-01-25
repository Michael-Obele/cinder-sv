<script>
	import { Button } from '$lib/components/ui/button';
	import { ArrowRight, Terminal } from '@lucide/svelte';
</script>

<div class="prose dark:prose-invert max-w-none">
	<h1>Cinder Frontend Documentation</h1>

	<p class="lead">
		Welcome to the official documentation for the Cinder Frontend. This project provides a modern
		web interface for the Cinder Scraper backend.
	</p>

	<div class="not-prose my-8 grid gap-4 md:grid-cols-2">
		<a
			href="/playground"
			class="group relative rounded-lg border p-6 transition-colors hover:bg-muted/50"
		>
			<h3 class="mb-2 flex items-center gap-2 text-lg font-semibold">
				Playground <ArrowRight
					class="h-4 w-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100"
				/>
			</h3>
			<p class="text-sm text-muted-foreground">
				Try out scraping, crawling, and search interactively.
			</p>
		</a>
		<div class="rounded-lg border bg-muted/20 p-6">
			<h3 class="mb-2 flex items-center gap-2 text-lg font-semibold">
				<Terminal class="h-4 w-4" /> Technical Stack
			</h3>
			<p class="text-sm text-muted-foreground">
				Built with SvelteKit 5, Tailwind CSS v4, and Shadcn UI.
			</p>
		</div>
	</div>

	<h2>Key Principles</h2>
	<ul>
		<li><strong>Open Source First:</strong> Easy to self-host with minimal configuration.</li>
		<li><strong>Privacy:</strong> No external trackers; direct communication with your backend.</li>
		<li>
			<strong>Speed:</strong> Optimized for fast response times and lightweight client-side state.
		</li>
		<li>
			<strong>Developer Friendly:</strong> Clean code, typed with TypeScript and standard tools.
		</li>
	</ul>

	<h2>Start Exploring</h2>
	<p>
		Navigate through the sidebar to learn more about the architecture, features, and setup process.
	</p>
</div>

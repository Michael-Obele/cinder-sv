<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import {
		Search,
		Globe,
		Zap,
		Eye,
		Settings,
		Copy,
		CheckCircle,
		BarChart3,
		Download,
		Clock,
		RefreshCw,
		BookOpen
	} from '@lucide/svelte';
</script>

<div class="prose prose-sm dark:prose-invert max-w-none space-y-8">
	<div>
		<h1 class="mb-2 text-3xl font-bold tracking-tight">Features</h1>
		<p class="text-lg text-muted-foreground">
			Explore the powerful capabilities of the Cinder Frontend.
		</p>
	</div>

	<!-- Universal Playground Intro -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Universal Playground</h2>
		<p>
			The core feature of Cinder is a unified interface where users can test all scraping
			capabilities in one place. Switch between Scrape, Crawl, and Search operations with a single
			interface.
		</p>

		<Alert.Root class="mt-6 mb-6">
			<Zap class="h-4 w-4" />
			<Alert.Title>Unified Experience</Alert.Title>
			<Alert.Description>
				All operations share the same core interface for options, output rendering, and results
				management. Learn once, use everywhere.
			</Alert.Description>
		</Alert.Root>
	</section>

	<!-- Scrape Feature -->
	<section>
		<h2 class="mt-8 mb-4 flex items-center gap-3 text-2xl font-bold">
			<Globe class="h-6 w-6 text-amber-500" />
			Scrape Feature
		</h2>

		<p class="mb-4">
			Instantly convert any URL into clean Markdown, HTML, or JSON. Perfect for quick content
			extraction and one-off website analysis.
		</p>

		<div class="mb-6 grid gap-4 md:grid-cols-2">
			<Card.Root class="overflow-hidden">
				<Card.Header class="pb-3">
					<Card.Title class="flex items-center gap-2 text-base">
						<Zap class="h-4 w-4" />
						Input & Validation
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm text-muted-foreground">
					<p>✓ URL input field with client-side validation</p>
					<p>✓ Valibot schema for type safety</p>
					<p>✓ Real-time validation feedback</p>
					<p>✓ Support for HTTP and HTTPS protocols</p>
				</Card.Content>
			</Card.Root>

			<Card.Root class="overflow-hidden">
				<Card.Header class="pb-3">
					<Card.Title class="flex items-center gap-2 text-base">
						<Settings class="h-4 w-4" />
						Advanced Options
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm text-muted-foreground">
					<p>✓ Custom headers configuration</p>
					<p>✓ Cookie management</p>
					<p>✓ Exclude specific tags</p>
					<p>✓ JavaScript rendering toggle (static vs dynamic)</p>
				</Card.Content>
			</Card.Root>

			<Card.Root class="overflow-hidden">
				<Card.Header class="pb-3">
					<Card.Title class="flex items-center gap-2 text-base">
						<Eye class="h-4 w-4" />
						Output Formats
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm text-muted-foreground">
					<p>✓ Markdown format (human-readable)</p>
					<p>✓ HTML output (preserves structure)</p>
					<p>✓ Raw JSON response</p>
					<p>✓ Status code and metadata</p>
				</Card.Content>
			</Card.Root>

			<Card.Root class="overflow-hidden">
				<Card.Header class="pb-3">
					<Card.Title class="flex items-center gap-2 text-base">
						<Copy class="h-4 w-4" />
						Result Handling
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm text-muted-foreground">
					<p>✓ One-click copy to clipboard</p>
					<p>✓ Download as file (Markdown or JSON)</p>
					<p>✓ Badge indicators for status</p>
					<p>✓ Syntax highlighting for code</p>
				</Card.Content>
			</Card.Root>
		</div>

		<div class="rounded-lg border bg-muted/30 p-4">
			<p class="mb-2 text-sm font-medium">Perfect for:</p>
			<ul class="space-y-1 text-sm text-muted-foreground">
				<li>✓ Quick content extraction</li>
				<li>✓ SEO analysis</li>
				<li>✓ Article downloading</li>
				<li>✓ Data collection for analysis</li>
				<li>✓ Testing website structure</li>
			</ul>
		</div>
	</section>

	<!-- Crawl Feature -->
	<section>
		<h2 class="mt-8 mb-4 flex items-center gap-3 text-2xl font-bold">
			<BarChart3 class="h-6 w-6 text-blue-500" />
			Crawl Feature
		</h2>

		<p class="mb-4">
			Deep domain crawling with automatic link discovery, progress tracking, and comprehensive
			results. Ideal for mapping entire websites and batch processing.
		</p>

		<div class="mb-6 grid gap-4 md:grid-cols-2">
			<Card.Root class="overflow-hidden">
				<Card.Header class="pb-3">
					<Card.Title class="flex items-center gap-2 text-base">
						<BookOpen class="h-4 w-4" />
						Job Control
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm text-muted-foreground">
					<p>✓ Start crawl with base URL</p>
					<p>✓ Pause/resume operations</p>
					<p>✓ Depth configuration</p>
					<p>✓ URL filtering options</p>
				</Card.Content>
			</Card.Root>

			<Card.Root class="overflow-hidden">
				<Card.Header class="pb-3">
					<Card.Title class="flex items-center gap-2 text-base">
						<Clock class="h-4 w-4" />
						Real-Time Monitoring
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm text-muted-foreground">
					<p>✓ Progress bar with percentage</p>
					<p>✓ Live link discovery log</p>
					<p>✓ Status badges (Success/Running/Failed)</p>
					<p>✓ Auto-refresh with polling</p>
				</Card.Content>
			</Card.Root>

			<Card.Root class="overflow-hidden">
				<Card.Header class="pb-3">
					<Card.Title class="flex items-center gap-2 text-base">
						<Download class="h-4 w-4" />
						Results Export
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm text-muted-foreground">
					<p>✓ All crawled links in structured format</p>
					<p>✓ Metadata for each page</p>
					<p>✓ CSV/JSON export options</p>
					<p>✓ Downloadable report</p>
				</Card.Content>
			</Card.Root>

			<Card.Root class="overflow-hidden">
				<Card.Header class="pb-3">
					<Card.Title class="flex items-center gap-2 text-base">
						<RefreshCw class="h-4 w-4" />
						Polling System
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm text-muted-foreground">
					<p>✓ Automatic status updates every 2s</p>
					<p>✓ Efficient network usage</p>
					<p>✓ Graceful cleanup on completion</p>
					<p>✓ Smart error recovery</p>
				</Card.Content>
			</Card.Root>
		</div>

		<div class="rounded-lg border bg-muted/30 p-4">
			<p class="mb-2 text-sm font-medium">Perfect for:</p>
			<ul class="space-y-1 text-sm text-muted-foreground">
				<li>✓ Website mapping and analysis</li>
				<li>✓ Competitive intelligence</li>
				<li>✓ Automated content discovery</li>
				<li>✓ Link verification</li>
				<li>✓ Large-scale data collection</li>
			</ul>
		</div>
	</section>

	<!-- Search Feature -->
	<section>
		<h2 class="mt-8 mb-4 flex items-center gap-3 text-2xl font-bold">
			<Search class="h-6 w-6 text-green-500" />
			Search Feature
		</h2>

		<p class="mb-4">
			Combine web search with automatic content scraping. Enter a query, get ranked results, and
			automatically extract content from matching websites.
		</p>

		<div class="mb-6 grid gap-4 md:grid-cols-2">
			<Card.Root class="overflow-hidden">
				<Card.Header class="pb-3">
					<Card.Title class="flex items-center gap-2 text-base">
						<Search class="h-4 w-4" />
						Query Input
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm text-muted-foreground">
					<p>✓ Natural language search queries</p>
					<p>✓ Advanced search operators</p>
					<p>✓ Result limit configuration</p>
					<p>✓ Real-time search suggestions</p>
				</Card.Content>
			</Card.Root>

			<Card.Root class="overflow-hidden">
				<Card.Header class="pb-3">
					<Card.Title class="flex items-center gap-2 text-base">
						<BarChart3 class="h-4 w-4" />
						Results Display
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm text-muted-foreground">
					<p>✓ Ranked search results</p>
					<p>✓ Card layout for each result</p>
					<p>✓ Title, URL, and snippet</p>
					<p>✓ Metadata and relevance score</p>
				</Card.Content>
			</Card.Root>

			<Card.Root class="overflow-hidden">
				<Card.Header class="pb-3">
					<Card.Title class="flex items-center gap-2 text-base">
						<Eye class="h-4 w-4" />
						Loading States
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm text-muted-foreground">
					<p>✓ Skeleton loaders while fetching</p>
					<p>✓ Progressive content loading</p>
					<p>✓ Error recovery</p>
					<p>✓ Empty state handling</p>
				</Card.Content>
			</Card.Root>

			<Card.Root class="overflow-hidden">
				<Card.Header class="pb-3">
					<Card.Title class="flex items-center gap-2 text-base">
						<CheckCircle class="h-4 w-4" />
						Auto-Scraping
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm text-muted-foreground">
					<p>✓ Click to scrape any result</p>
					<p>✓ Background extraction</p>
					<p>✓ Content preview toggle</p>
					<p>✓ Multiple format support</p>
				</Card.Content>
			</Card.Root>
		</div>

		<div class="rounded-lg border bg-muted/30 p-4">
			<p class="mb-2 text-sm font-medium">Perfect for:</p>
			<ul class="space-y-1 text-sm text-muted-foreground">
				<li>✓ Research and market analysis</li>
				<li>✓ Competitor monitoring</li>
				<li>✓ News aggregation</li>
				<li>✓ Knowledge base building</li>
				<li>✓ Content curation</li>
			</ul>
		</div>
	</section>

	<!-- Common Features -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Cross-Feature Capabilities</h2>

		<div class="grid gap-4 md:grid-cols-3">
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">History Management</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm text-muted-foreground">
					Store and re-run previous requests from localStorage without database overhead.
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Dark/Light Themes</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm text-muted-foreground">
					Auto-detect system preference or manual toggle with persistent selection.
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Responsive Design</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm text-muted-foreground">
					Optimized for mobile, tablet, and desktop with touch-friendly controls.
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Error Handling</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm text-muted-foreground">
					Comprehensive error messages with recovery suggestions and retry options.
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Accessibility</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm text-muted-foreground">
					WCAG 2.1 AA compliant with keyboard navigation and screen reader support.
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Performance</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm text-muted-foreground">
					Optimized bundle size, lazy loading, and efficient state management.
				</Card.Content>
			</Card.Root>
		</div>
	</section>

	<!-- Future Features -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Roadmap</h2>

		<Alert.Root>
			<Zap class="h-4 w-4" />
			<Alert.Title>Coming Soon</Alert.Title>
			<Alert.Description>
				Advanced features like batch processing, scheduled crawls, API key management, and custom
				workflows are planned for future releases.
			</Alert.Description>
		</Alert.Root>
	</section>
</div>

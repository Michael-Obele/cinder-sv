<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import {
		Globe,
		Settings,
		BarChart3,
		Search,
		Copy,
		Download,
		ArrowRight,
		CheckCircle,
		Zap
	} from '@lucide/svelte';
</script>

<div class="prose prose-sm dark:prose-invert max-w-none space-y-8">
	<div>
		<h1 class="mb-2 text-3xl font-bold tracking-tight">User Flow & Interaction Patterns</h1>
		<p class="text-lg text-muted-foreground">
			Understanding how users interact with the Cinder Frontend to accomplish their goals.
		</p>
	</div>

	<!-- Scrape Flow -->
	<section>
		<h2 class="mt-8 mb-4 flex items-center gap-3 text-2xl font-bold">
			<Globe class="h-6 w-6 text-amber-500" />
			Scrape Flow
		</h2>

		<p class="mb-6">The typical user journey when scraping a single URL.</p>

		<div class="mb-8 space-y-3">
			<div class="flex items-start gap-4">
				<div
					class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary"
				>
					1
				</div>
				<div class="flex-1">
					<h4 class="mb-1 font-semibold">Enter URL</h4>
					<p class="text-sm text-muted-foreground">User enters a URL in the input field.</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div
					class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary"
				>
					2
				</div>
				<div class="flex-1">
					<h4 class="mb-1 font-semibold">Optional: Configure Options</h4>
					<p class="text-sm text-muted-foreground">
						Click the Options button to open Sheet with headers, cookies, exclude tags, and
						rendering mode.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div
					class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary"
				>
					3
				</div>
				<div class="flex-1">
					<h4 class="mb-1 font-semibold">Click Scrape Button</h4>
					<p class="text-sm text-muted-foreground">
						Submits the form to the backend via remote function.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div
					class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary"
				>
					4
				</div>
				<div class="flex-1">
					<h4 class="mb-1 font-semibold">View Results</h4>
					<p class="text-sm text-muted-foreground">
						Results appear in tabbed interface: Markdown, HTML, JSON.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div
					class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary"
				>
					5
				</div>
				<div class="flex-1">
					<h4 class="mb-1 font-semibold">Copy or Download</h4>
					<p class="text-sm text-muted-foreground">
						User can copy to clipboard or download as file.
					</p>
				</div>
			</div>
		</div>

		<Card.Root class="bg-muted/30">
			<Card.Header>
				<Card.Title class="text-base">Key Interactions</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-2 text-sm">
				<div class="flex items-start gap-2">
					<CheckCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
					<span>Real-time URL validation</span>
				</div>
				<div class="flex items-start gap-2">
					<CheckCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
					<span>Form progressive enhancement</span>
				</div>
				<div class="flex items-start gap-2">
					<CheckCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
					<span>Instant result tabs</span>
				</div>
				<div class="flex items-start gap-2">
					<CheckCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
					<span>Copy feedback (toast notification)</span>
				</div>
			</Card.Content>
		</Card.Root>
	</section>

	<!-- Crawl Flow -->
	<section>
		<h2 class="mt-8 mb-4 flex items-center gap-3 text-2xl font-bold">
			<BarChart3 class="h-6 w-6 text-blue-500" />
			Crawl Flow
		</h2>

		<p class="mb-6">The user journey for deep domain crawling with job management.</p>

		<div class="mb-8 space-y-3">
			<div class="flex items-start gap-4">
				<div
					class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary"
				>
					1
				</div>
				<div class="flex-1">
					<h4 class="mb-1 font-semibold">Enter Base URL</h4>
					<p class="text-sm text-muted-foreground">
						User enters the domain to crawl (e.g., https://example.com).
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div
					class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary"
				>
					2
				</div>
				<div class="flex-1">
					<h4 class="mb-1 font-semibold">Configure Crawl Depth</h4>
					<p class="text-sm text-muted-foreground">
						Optional: Set depth limit, URL patterns to include/exclude, and max pages.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div
					class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary"
				>
					3
				</div>
				<div class="flex-1">
					<h4 class="mb-1 font-semibold">Click Start Crawl</h4>
					<p class="text-sm text-muted-foreground">
						Initiates the crawl job. Backend returns a job ID.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div
					class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary"
				>
					4
				</div>
				<div class="flex-1">
					<h4 class="mb-1 font-semibold">Monitor Progress</h4>
					<p class="text-sm text-muted-foreground">
						Live progress bar and scrollable log of discovered links. Auto-polls every 2 seconds.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div
					class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary"
				>
					5
				</div>
				<div class="flex-1">
					<h4 class="mb-1 font-semibold">Pause or Stop</h4>
					<p class="text-sm text-muted-foreground">
						User can pause the crawl to examine partial results or stop completely.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div
					class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary"
				>
					6
				</div>
				<div class="flex-1">
					<h4 class="mb-1 font-semibold">Download Results</h4>
					<p class="text-sm text-muted-foreground">
						Once complete, download the full crawl report as CSV or JSON.
					</p>
				</div>
			</div>
		</div>

		<Card.Root class="bg-muted/30">
			<Card.Header>
				<Card.Title class="text-base">Key Interactions</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-2 text-sm">
				<div class="flex items-start gap-2">
					<CheckCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
					<span>Async job management with polling</span>
				</div>
				<div class="flex items-start gap-2">
					<CheckCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
					<span>Real-time progress visualization</span>
				</div>
				<div class="flex items-start gap-2">
					<CheckCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
					<span>Live log with auto-scroll</span>
				</div>
				<div class="flex items-start gap-2">
					<CheckCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
					<span>Status badges for each link</span>
				</div>
			</Card.Content>
		</Card.Root>
	</section>

	<!-- Search Flow -->
	<section>
		<h2 class="mt-8 mb-4 flex items-center gap-3 text-2xl font-bold">
			<Search class="h-6 w-6 text-green-500" />
			Search Flow
		</h2>

		<p class="mb-6">The user journey for web search followed by content extraction.</p>

		<div class="mb-8 space-y-3">
			<div class="flex items-start gap-4">
				<div
					class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary"
				>
					1
				</div>
				<div class="flex-1">
					<h4 class="mb-1 font-semibold">Enter Search Query</h4>
					<p class="text-sm text-muted-foreground">
						User enters natural language search query or advanced search operators.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div
					class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary"
				>
					2
				</div>
				<div class="flex-1">
					<h4 class="mb-1 font-semibold">Configure Search Options</h4>
					<p class="text-sm text-muted-foreground">
						Optional: Set result limit, language, region, time range.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div
					class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary"
				>
					3
				</div>
				<div class="flex-1">
					<h4 class="mb-1 font-semibold">Click Search</h4>
					<p class="text-sm text-muted-foreground">
						Submits search query to backend web search API.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div
					class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary"
				>
					4
				</div>
				<div class="flex-1">
					<h4 class="mb-1 font-semibold">Browse Results</h4>
					<p class="text-sm text-muted-foreground">
						Search results appear as cards with title, URL, snippet, and metadata.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div
					class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary"
				>
					5
				</div>
				<div class="flex-1">
					<h4 class="mb-1 font-semibold">Scrape Individual Result</h4>
					<p class="text-sm text-muted-foreground">
						Click "Scrape" button on any result to extract full content.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-4">
				<div
					class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary"
				>
					6
				</div>
				<div class="flex-1">
					<h4 class="mb-1 font-semibold">View Extracted Content</h4>
					<p class="text-sm text-muted-foreground">
						Content appears in modal/drawer for review and export.
					</p>
				</div>
			</div>
		</div>

		<Card.Root class="bg-muted/30">
			<Card.Header>
				<Card.Title class="text-base">Key Interactions</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-2 text-sm">
				<div class="flex items-start gap-2">
					<CheckCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
					<span>Search suggestions and autocomplete</span>
				</div>
				<div class="flex items-start gap-2">
					<CheckCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
					<span>Skeleton loaders while fetching</span>
				</div>
				<div class="flex items-start gap-2">
					<CheckCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
					<span>Inline scrape without navigation</span>
				</div>
				<div class="flex items-start gap-2">
					<CheckCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
					<span>Multiple result export formats</span>
				</div>
			</Card.Content>
		</Card.Root>
	</section>

	<!-- History & Recovery -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">History & Quick Access</h2>

		<p class="mb-6">Users can store and replay previous requests for efficiency.</p>

		<Alert.Root class="mb-6">
			<Zap class="h-4 w-4" />
			<Alert.Title>Local Storage</Alert.Title>
			<Alert.Description>
				History is stored in localStorage (not a database) for quick access without server overhead.
				Users can clear history anytime.
			</Alert.Description>
		</Alert.Root>

		<div class="grid gap-4 md:grid-cols-2">
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">History Sidebar</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm text-muted-foreground">
					Quick-access list of last 10-20 requests with one-click re-run capability.
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Persistent State</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm text-muted-foreground">
					Forms remember last input values for faster repeated queries.
				</Card.Content>
			</Card.Root>
		</div>
	</section>

	<!-- Error Handling -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Error Handling & Recovery</h2>

		<p class="mb-6">
			The UI gracefully handles errors and provides users with actionable recovery steps.
		</p>

		<div class="space-y-3">
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Network Errors</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm">
					<p class="text-muted-foreground">
						User sees error message with retry button. Form state is preserved.
					</p>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Validation Errors</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm">
					<p class="text-muted-foreground">
						Client-side validation shows errors below the input field. User can fix and resubmit.
					</p>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Backend Errors</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm">
					<p class="text-muted-foreground">
						Specific error messages with HTTP status codes help debugging.
					</p>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Timeout Recovery</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm">
					<p class="text-muted-foreground">
						For long-running operations, timeout errors suggest increasing limits or retrying.
					</p>
				</Card.Content>
			</Card.Root>
		</div>
	</section>

	<!-- Navigation & Accessibility -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Accessibility & Navigation</h2>

		<div class="grid gap-4 md:grid-cols-2">
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Keyboard Navigation</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm text-muted-foreground">
					<p>✓ Tab to navigate through all controls</p>
					<p>✓ Enter to submit forms</p>
					<p>✓ Escape to close modals</p>
					<p>✓ Arrow keys for menus</p>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Screen Reader Support</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm text-muted-foreground">
					<p>✓ ARIA labels on all inputs</p>
					<p>✓ Semantic HTML structure</p>
					<p>✓ Alt text for icons</p>
					<p>✓ Form error announcements</p>
				</Card.Content>
			</Card.Root>
		</div>
	</section>
</div>

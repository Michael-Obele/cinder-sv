<script lang="ts">
	import { scrapeUrl, crawlUrl, searchWeb, getCrawlStatus } from '$lib/remote/cinder.remote';
	import { IsMobile } from '$lib/hooks/is-mobile.svelte';
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import { Tabs, TabsContent, TabsList, TabsTrigger } from '$lib/components/ui/tabs';
	import {
		Search,
		Globe,
		Layers,
		History,
		ExternalLink,
		Loader2,
		AlertCircle,
		Trash2,
		Copy,
		ArrowRight,
		Clock
	} from '@lucide/svelte';
	import CodeViewer from '$lib/components/blocks/code-viewer.svelte';
	import ResultCard from '$lib/components/blocks/result-card.svelte';
	import OptionsSheet from '$lib/components/blocks/options-sheet.svelte';
	import { cn } from '$lib/utils';
	import { PersistedState } from 'runed';
	import { tick } from 'svelte';

	// Local State
	const isMobile = new IsMobile();
	let crawlId = $state<string | null>(null);
	let activeTab = $state('scrape');
	let sidebarOpen = $state(true);

	// Error States
	let scrapeError = $state<string | null>(null);
	let crawlError = $state<string | null>(null);
	let searchError = $state<string | null>(null);

	// Derived query for crawl status
	const statusQuery = $derived(crawlId ? getCrawlStatus(crawlId) : null);

	// History Management
	type HistoryItem = {
		id: string;
		type: 'scrape' | 'crawl' | 'search';
		title: string;
		url: string;
		timestamp: string;
		data?: any;
	};
	const searchHistory = new PersistedState<HistoryItem[]>('cinder-history', []);
	let selectedHistoryItem = $state<HistoryItem | null>(null);

	function addToHistory(item: HistoryItem) {
		searchHistory.current = [item, ...searchHistory.current.slice(0, 19)];
	}

	function clearHistory() {
		searchHistory.current = [];
		selectedHistoryItem = null;
	}

	// Polling for crawl status
	$effect(() => {
		if (crawlId && activeTab === 'crawl' && statusQuery) {
			const interval = setInterval(() => {
				statusQuery.refresh();
			}, 3000);
			return () => clearInterval(interval);
		}
	});

	// Derived states
	let crawlProgress = $derived(statusQuery?.current?.status === 'completed' ? 100 : 50);
	let displayedScrapeResult = $derived(
		selectedHistoryItem?.type === 'scrape' && selectedHistoryItem.data
			? selectedHistoryItem.data
			: scrapeUrl.result
	);
	let displayedSearchResult = $derived(
		selectedHistoryItem?.type === 'search' && selectedHistoryItem.data
			? selectedHistoryItem.data
			: searchWeb.result
	);
	let isCurrentlyLoading = $derived(
		!!scrapeUrl.pending ||
			!!crawlUrl.pending ||
			!!searchWeb.pending ||
			(!!statusQuery?.loading && !!crawlId)
	);

	async function handleScrape(url: string) {
		activeTab = 'scrape';
		// Wait for tab switch and DOM update
		await tick();

		const input = document.getElementById('scrape-url') as HTMLInputElement;
		if (input) {
			input.value = url;
			input.dispatchEvent(new Event('input', { bubbles: true }));
		}
	}
</script>

{#snippet historyContent()}
	<div class="flex h-full flex-col">
		<!-- Header -->
		<div class="flex items-center gap-2 border-b bg-background/50 p-4 backdrop-blur">
			<History class="size-4 text-muted-foreground" />
			<h2 class="text-sm font-semibold">History</h2>
		</div>

		<!-- History List -->
		<div class="flex-1 space-y-2 overflow-y-auto p-3">
			{#each searchHistory.current as item (item.id)}
				<button
					class="group relative w-full rounded-lg border bg-background p-2.5 text-left transition-all hover:border-primary/50"
					onclick={() => {
						activeTab = item.type;
						selectedHistoryItem = item;
						if (item.type === 'crawl' && item.data?.id) {
							crawlId = item.data.id;
						}
					}}
				>
					<div class="mb-1 flex items-center gap-2">
						{#if item.type === 'scrape'}<Globe class="size-3 text-blue-400" />
						{:else if item.type === 'crawl'}<Layers class="size-3 text-amber-400" />
						{:else}<Search class="size-3 text-primary" />
						{/if}
						<span class="text-[10px] font-medium tracking-wider text-muted-foreground uppercase">
							{item.type}
						</span>
					</div>
					<div class="truncate pr-4 text-xs font-medium">{item.title}</div>
					<div class="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
						<Clock class="size-2.5" />
						{new Date(item.timestamp).toLocaleTimeString([], {
							hour: '2-digit',
							minute: '2-digit'
						})}
					</div>
				</button>
			{:else}
				<div
					class="flex flex-col items-center justify-center h-40 text-muted-foreground opacity-50"
				>
					<History class="size-8 mb-2 stroke-[1px]" />
					<p class="text-xs">No history yet</p>
				</div>
			{/each}
		</div>

		<!-- Footer: Clear History Action -->
		<div class="border-t bg-background/50 p-3 backdrop-blur">
			<Button
				variant="destructive"
				size="sm"
				class="w-full"
				onclick={() => clearHistory()}
				title="Clear all history"
			>
				<Trash2 class="mr-2 size-3.5" />
				Clear History
			</Button>
		</div>
	</div>
{/snippet}

<div class="flex h-[calc(100vh-4rem)] overflow-hidden bg-background">
	<!-- History Sidebar (Desktop Only) -->
	{#if !isMobile.current && sidebarOpen}
		<aside class="flex w-80 flex-col border-r bg-muted/30">
			{@render historyContent()}
		</aside>
	{/if}

	<!-- Main Workbench Area -->
	<main class="flex-1 overflow-x-hidden overflow-y-auto">
		<div class="mx-auto max-w-6xl space-y-8 p-6">
			<div class="flex flex-col justify-between gap-4 border-b pb-6 md:flex-row md:items-end">
				<div>
					<h1 class="mb-1 text-3xl font-bold tracking-tight">Workbench</h1>
					<p class="text-muted-foreground">
						Master the web with precision crawling and extraction.
					</p>
				</div>
				<div class="flex items-center gap-2">
					{#if isMobile.current}
						<Sheet.Root>
							<Sheet.Trigger class="inline-flex">
								<Button variant="outline" size="sm">
									<History class="mr-2 size-4" />
									History
								</Button>
							</Sheet.Trigger>
							<Sheet.Content side="left" class="w-80 p-0">
								{@render historyContent()}
							</Sheet.Content>
						</Sheet.Root>
					{:else}
						<Button variant="outline" size="sm" onclick={() => (sidebarOpen = !sidebarOpen)}>
							<History class="mr-2 size-4" />
							{sidebarOpen ? 'Hide History' : 'Show History'}
						</Button>
					{/if}
					<div
						class="flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1.5 text-[10px] font-medium"
					>
						<div
							class={cn(
								'size-2 rounded-full',
								isCurrentlyLoading ? 'animate-pulse bg-primary' : 'bg-emerald-500'
							)}
						></div>
						{isCurrentlyLoading ? 'Processing' : 'System Ready'}
					</div>
				</div>
			</div>

			<Tabs bind:value={activeTab} class="w-full">
				<TabsList class="mb-8 grid w-full max-w-md grid-cols-3">
					<TabsTrigger value="scrape" class="gap-2">
						<Globe class="size-4" />
						Scrape
					</TabsTrigger>
					<TabsTrigger value="crawl" class="gap-2">
						<Layers class="size-4" />
						Crawl
					</TabsTrigger>
					<TabsTrigger value="search" class="gap-2">
						<Search class="size-4" />
						Search
					</TabsTrigger>
				</TabsList>

				<!-- Scrape Tab Content -->
				<TabsContent value="scrape" class="space-y-6 focus-visible:outline-none">
					<section class="overflow-hidden rounded-xl border bg-card/50 shadow-sm backdrop-blur-sm">
						<div class="p-6">
							<form
								{...scrapeUrl.enhance(async ({ submit }) => {
									scrapeError = null;
									selectedHistoryItem = null;
									try {
										await submit();
										if (scrapeUrl.result) {
											addToHistory({
												id: crypto.randomUUID(),
												type: 'scrape',
												title: (scrapeUrl.result as any).metadata?.title || 'Scraped Page',
												url: (scrapeUrl.result as any).url || 'Unknown',
												timestamp: new Date().toISOString(),
												data: scrapeUrl.result
											});
										}
									} catch (e: any) {
										scrapeError = e.message || 'An unexpected error occurred';
									}
								})}
								class="space-y-4"
							>
								<div class="flex flex-col gap-2">
									<label
										for="scrape-url"
										class="pl-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase"
									>
										Target URL
									</label>
									<div class="flex gap-2">
										<div class="relative flex-1">
											<Globe
												class="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
											/>
											<Input
												id="scrape-url"
												{...scrapeUrl.fields.url.as('text')}
												placeholder="https://example.com/article"
												class="h-11 bg-background pl-10"
												aria-invalid={(scrapeUrl.fields.url?.issues()?.length || 0) > 0}
											/>
										</div>
										<OptionsSheet fields={scrapeUrl.fields} />
										<Button
											type="submit"
											disabled={!!scrapeUrl.pending}
											class="h-11 px-8 shadow-md"
										>
											{#if scrapeUrl.pending}
												<Loader2 class="mr-2 size-4 animate-spin" />
												Extracting...
											{:else}
												Scrape
												<ArrowRight class="ml-2 size-4" />
											{/if}
										</Button>
									</div>
									{#each scrapeUrl.fields.url?.issues() || [] as issue (issue.message)}
										<p class="mt-1 flex items-center gap-1.5 pl-1 text-xs text-destructive">
											<AlertCircle class="size-3" />
											{issue.message}
										</p>
									{/each}
								</div>
							</form>
						</div>

						<div
							class="flex items-center justify-between border-t bg-muted/10 p-4 px-6 text-[11px] font-medium text-muted-foreground"
						>
							<div class="flex items-center gap-4">
								<span class="flex items-center gap-1.5"
									><Badge variant="outline" class="h-5 rounded px-1.5 text-[9px] uppercase"
										>Format</Badge
									> Markdown</span
								>
								<span class="flex items-center gap-1.5"
									><Badge variant="outline" class="h-5 rounded px-1.5 text-[9px] uppercase"
										>Engine</Badge
									> Cinder v1</span
								>
							</div>
							<span>Ready for extraction</span>
						</div>
					</section>

					<!-- Results -->
					{#if scrapeUrl.pending}
						<div
							class="flex animate-in flex-col items-center justify-center space-y-4 rounded-xl border border-dashed bg-muted/20 p-20 duration-500 fade-in"
						>
							<div class="relative">
								<div class="absolute inset-0 animate-ping rounded-full bg-primary/20"></div>
								<div class="relative rounded-full bg-primary p-4">
									<Globe class="size-8 text-primary-foreground" />
								</div>
							</div>
							<div class="text-center">
								<h3 class="text-lg font-semibold">Deep Extraction in Progress</h3>
								<p class="text-sm text-muted-foreground">
									Navigating, rendering JavaScript, and refining content...
								</p>
							</div>
						</div>
					{:else if scrapeError}
						<div
							class="flex animate-in gap-4 rounded-xl border border-destructive/20 bg-destructive/10 p-6 text-destructive slide-in-from-top-2"
						>
							<AlertCircle class="size-6 shrink-0" />
							<div>
								<h3 class="mb-1 font-bold">Extraction Failed</h3>
								<p class="text-sm opacity-90">{scrapeError}</p>
							</div>
						</div>
					{:else if displayedScrapeResult}
						<div class="grid animate-in grid-cols-1 gap-6 duration-700 fade-in lg:grid-cols-3">
							<div class="space-y-6 lg:col-span-1">
								<ResultCard result={displayedScrapeResult} />
								<div class="space-y-4 rounded-xl border bg-card p-5">
									<h3 class="flex items-center gap-2 text-sm font-semibold">
										<Layers class="size-4 text-primary" />
										Quick Actions
									</h3>
									<div class="grid grid-cols-2 gap-2">
										<Button
											variant="outline"
											size="sm"
											class="h-9 text-[11px] font-bold"
											onclick={() => {
												if (displayedScrapeResult)
													navigator.clipboard.writeText(
														JSON.stringify(displayedScrapeResult, null, 2)
													);
											}}
										>
											<Copy class="mr-2 size-3" /> JSON
										</Button>
										<Button
											variant="outline"
											size="sm"
											class="h-9 text-[11px] font-bold"
											onclick={() => {
												const result = displayedScrapeResult as any;
												if (result?.markdown) navigator.clipboard.writeText(result.markdown);
											}}
										>
											<Copy class="mr-2 size-3" /> MD
										</Button>
									</div>
								</div>
							</div>
							<div class="lg:col-span-2">
								<CodeViewer result={displayedScrapeResult} />
							</div>
						</div>
					{:else}
						<div
							class="flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/10 p-20 opacity-60"
						>
							<Globe class="mb-4 size-12 stroke-[1px] text-muted-foreground" />
							<p class="text-sm font-medium">Enter a URL above to begin extraction</p>
						</div>
					{/if}
				</TabsContent>

				<!-- Crawl Tab Content -->
				<TabsContent value="crawl" class="space-y-6 focus-visible:outline-none">
					<section class="overflow-hidden rounded-xl border bg-card/50 shadow-sm backdrop-blur-sm">
						<div class="p-6">
							<form
								{...crawlUrl.enhance(async ({ submit }) => {
									crawlError = null;
									selectedHistoryItem = null;
									try {
										await submit();
										const result = crawlUrl.result as any;
										if (result?.id) {
											crawlId = result.id;
											addToHistory({
												id: crypto.randomUUID(),
												type: 'crawl',
												title: `Crawl: ${result.id}`,
												url: 'Crawl Job',
												timestamp: new Date().toISOString(),
												data: { id: result.id }
											});
										}
									} catch (e: any) {
										crawlError = e.message || 'An unexpected error occurred';
									}
								})}
								class="space-y-4"
							>
								<div class="flex flex-col gap-2">
									<label
										for="crawl-url"
										class="pl-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase"
									>
										Crawl Boundary (Sitemap/Domain)
									</label>
									<div class="flex gap-2">
										<div class="relative flex-1">
											<Layers
												class="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
											/>
											<Input
												id="crawl-url"
												{...crawlUrl.fields.url.as('text')}
												placeholder="https://example.com/*"
												class="h-11 bg-background pl-10"
												aria-invalid={(crawlUrl.fields.url?.issues()?.length || 0) > 0}
											/>
										</div>
										<OptionsSheet fields={crawlUrl.fields} />
										<Button type="submit" disabled={!!crawlUrl.pending} class="h-11 px-8 shadow-md">
											{#if crawlUrl.pending}
												<Loader2 class="mr-2 size-4 animate-spin" />
												Initializing...
											{:else}
												Start Crawl
												<Layers class="ml-2 size-4" />
											{/if}
										</Button>
									</div>
									{#each crawlUrl.fields.url?.issues() || [] as issue (issue.message)}
										<p class="mt-1 flex items-center gap-1.5 pl-1 text-xs text-destructive">
											<AlertCircle class="size-3" />
											{issue.message}
										</p>
									{/each}
								</div>
							</form>
						</div>
						<div
							class="flex items-center justify-between border-t bg-muted/10 p-4 px-6 text-[11px] font-medium text-muted-foreground"
						>
							<div class="flex items-center gap-4">
								<span class="flex items-center gap-1.5 text-amber-500">
									<span class="size-1.5 animate-pulse rounded-full bg-amber-500"></span>
									Max Depth: 2
								</span>
								<span class="flex items-center gap-1.5">Limit: 100 pages</span>
							</div>
							<span>Crawl engine idle</span>
						</div>
					</section>

					{#if crawlId}
						<div class="animate-in space-y-6 duration-500 fade-in">
							<div class="rounded-xl border bg-card p-6 shadow-sm">
								<div class="mb-6 flex items-center justify-between">
									<div class="flex items-center gap-3">
										<div class="flex size-10 items-center justify-center rounded-lg bg-amber-100">
											<Layers class="size-5 text-amber-600" />
										</div>
										<div>
											<h3 class="font-bold">Active Crawl Mission</h3>
											<p class="font-mono text-xs tracking-tighter text-muted-foreground uppercase">
												ID: {crawlId}
											</p>
										</div>
									</div>
									<Badge
										class={cn(
											'px-3 py-1',
											statusQuery?.current?.status === 'completed'
												? 'bg-emerald-500 hover:bg-emerald-600'
												: 'animate-pulse bg-amber-500'
										)}
									>
										{statusQuery?.current?.status || 'Processing'}
									</Badge>
								</div>

								<div class="space-y-3">
									<div class="mb-1 flex justify-between text-xs font-bold">
										<span>Crawl Progress</span>
										<span>{(statusQuery?.current as any)?.data?.length || 0} Pages Found</span>
									</div>
									<div class="h-2 w-full overflow-hidden rounded-full border bg-muted">
										<div
											class="h-full bg-amber-500 transition-all duration-500 w-[{crawlProgress}%]"
										></div>
									</div>
									<p class="text-[10px] text-muted-foreground italic">
										Current Mission: Discovery and content extraction on {crawlUrl.fields.url.value() ||
											'target'}
									</p>
								</div>
							</div>

							{#if (statusQuery?.current as any)?.data}
								<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
									{#each (statusQuery?.current as any).data as page (page.url)}
										<div
											class="group rounded-xl border border-l-4 border-l-amber-500/30 bg-card p-4 transition-all hover:shadow-md"
										>
											<div
												class="mb-3 line-clamp-2 min-h-8 truncate pr-4 text-xs leading-relaxed font-medium"
											>
												{page.title || 'Untitled Page'}
											</div>
											<div class="flex items-center justify-between">
												<span
													class="max-w-37.5 truncate font-mono text-[10px] text-muted-foreground"
													>{page.url}</span
												>
												<Button
													variant="ghost"
													size="icon"
													class="size-7 opacity-0 transition-opacity group-hover:opacity-100"
													onclick={() => window.open(page.url, '_blank')}
												>
													<ExternalLink class="size-3.5" />
												</Button>
											</div>
										</div>
									{/each}
								</div>
							{/if}
						</div>
					{:else if crawlError}
						<div
							class="flex animate-in gap-4 rounded-xl border border-destructive/20 bg-destructive/10 p-6 text-destructive slide-in-from-top-2"
						>
							<AlertCircle class="size-6 shrink-0" />
							<div>
								<h3 class="mb-1 font-bold">Crawl Failed</h3>
								<p class="text-sm opacity-90">{crawlError}</p>
							</div>
						</div>
					{:else}
						<div
							class="flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/10 p-20 opacity-60"
						>
							<Layers class="mb-4 size-12 stroke-[1px] text-muted-foreground" />
							<p class="text-center text-sm font-medium">
								Define a boundary to start a massive discovery mission.<br /><span
									class="text-xs font-normal opacity-70"
									>Sitemap exploration and recursive discovery.</span
								>
							</p>
						</div>
					{/if}
				</TabsContent>

				<!-- Search Tab Content -->
				<TabsContent value="search" class="space-y-6 focus-visible:outline-none">
					<section class="overflow-hidden rounded-xl border bg-card/50 shadow-sm backdrop-blur-sm">
						<div class="p-6">
							<form
								{...searchWeb.enhance(async ({ submit }) => {
									searchError = null;
									selectedHistoryItem = null;
									try {
										await submit();
										const result = searchWeb.result as any[];
										if (result?.length) {
											addToHistory({
												id: crypto.randomUUID(),
												type: 'search',
												title: `Search: ${result.length} results`,
												url: 'Search Results',
												timestamp: new Date().toISOString(),
												data: result
											});
										}
									} catch (e: any) {
										searchError = e.body?.message || e.message || 'An unexpected error occurred';
									}
								})}
								class="space-y-4"
							>
								<div class="flex flex-col gap-2">
									<label
										for="search-query"
										class="pl-1 text-xs font-semibold tracking-wider text-muted-foreground uppercase"
									>
										Search Intent
									</label>
									<div class="flex gap-2">
										<div class="relative flex-1">
											<Search
												class="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
											/>
											<Input
												id="search-query"
												{...searchWeb.fields.query.as('text')}
												placeholder="e.g. 'latest openai news' or 'technical documentation for svelte 5'"
												class="h-11 bg-background pl-10"
												aria-invalid={(searchWeb.fields.query?.issues()?.length || 0) > 0}
											/>
										</div>
										<Button
											type="submit"
											disabled={!!searchWeb.pending}
											class="h-11 px-8 shadow-md"
										>
											{#if searchWeb.pending}
												<Loader2 class="mr-2 size-4 animate-spin" />
												Searching...
											{:else}
												Search
												<ArrowRight class="ml-2 size-4" />
											{/if}
										</Button>
									</div>
									{#each searchWeb.fields.query?.issues() || [] as issue (issue.message)}
										<p class="mt-1 flex items-center gap-1.5 pl-1 text-xs text-destructive">
											<AlertCircle class="size-3" />
											{issue.message}
										</p>
									{/each}
								</div>
							</form>
						</div>
						<div
							class="flex items-center justify-between border-t bg-muted/10 p-4 px-6 text-[11px] font-medium text-muted-foreground"
						>
							<div class="flex items-center gap-4">
								<span class="flex items-center gap-1.5">
									<Badge variant="outline" class="h-5 rounded px-1.5 text-[9px] uppercase"
										>Engine</Badge
									> Search API
								</span>
								<span class="flex items-center gap-1.5">Mode: Semantic Discovery</span>
							</div>
							<span>Search systems active</span>
						</div>
					</section>

					{#if searchWeb.pending}
						<div class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
							{#each Array(6) as _, i (i)}
								<div
									class="flex h-32 animate-pulse flex-col justify-between rounded-xl border bg-card/40 p-4"
								>
									<div class="space-y-2">
										<div class="h-4 w-3/4 rounded bg-muted"></div>
										<div class="h-3 w-full rounded bg-muted"></div>
									</div>
									<div class="h-3 w-1/2 rounded bg-muted"></div>
								</div>
							{/each}
						</div>
					{:else if searchError}
						<div
							class="flex animate-in gap-4 rounded-xl border border-destructive/20 bg-destructive/10 p-6 text-destructive slide-in-from-top-2"
						>
							<AlertCircle class="size-6 shrink-0" />
							<div>
								<h3 class="mb-1 font-bold">Search Missed</h3>
								<p class="text-sm opacity-90">{searchError}</p>
							</div>
						</div>
					{:else if displayedSearchResult}
						<div
							class="grid animate-in grid-cols-1 gap-4 duration-500 slide-in-from-bottom-4 md:grid-cols-2 lg:grid-cols-3"
						>
							{#each (displayedSearchResult as any[]) || [] as item (item.url)}
								<div
									class="group flex flex-col justify-between rounded-xl border bg-card p-4 transition-all hover:border-primary/50 hover:shadow-lg"
								>
									<div>
										<h4
											class="mb-2 line-clamp-2 text-sm leading-snug font-bold transition-colors group-hover:text-primary"
										>
											{item.title}
										</h4>
										<p class="mb-4 line-clamp-3 text-xs leading-relaxed text-muted-foreground">
											{item.description || 'No description provided.'}
										</p>
									</div>
									<div class="mt-auto flex items-center justify-between border-t pt-3">
										<span class="max-w-30 truncate font-mono text-[10px] text-muted-foreground"
											>{new URL(item.url || 'http://localhost').hostname}</span
										>
										<Button
											variant="ghost"
											size="icon"
											class="size-7"
											onclick={() => window.open(item.url, '_blank')}
										>
											<ExternalLink class="size-3.5" />
										</Button>
									</div>
									<Button
										variant="secondary"
										size="sm"
										class="mt-2 w-full text-[10px] font-medium"
										onclick={() => handleScrape(item.url)}
									>
										<Globe class="mr-2 size-3" />
										Scrape This
									</Button>
								</div>
							{/each}
						</div>
					{:else}
						<div
							class="flex flex-col items-center justify-center rounded-xl border border-dashed bg-muted/10 p-20 opacity-60"
						>
							<Search class="mb-4 size-12 stroke-[1px] text-muted-foreground" />
							<p class="text-sm font-medium">
								Search across the entire indexed web with AI precision
							</p>
						</div>
					{/if}
				</TabsContent>
			</Tabs>
		</div>
	</main>
</div>

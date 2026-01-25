<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Progress } from '$lib/components/ui/progress';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as Card from '$lib/components/ui/card';

	import { scrapeUrl, crawlUrl, searchWeb, getCrawlStatus } from '../../remote/cinder.remote';
	import CodeViewer from '$lib/components/blocks/code-viewer.svelte';
	import ResultCard from '$lib/components/blocks/result-card.svelte';
	import OptionsSheet from '$lib/components/blocks/options-sheet.svelte';
	import { Loader2, History, Trash2 } from '@lucide/svelte';
	import { PersistedState } from 'runed';
	import superjson from 'superjson';

	// Types
	interface SearchHistoryItem {
		id: string;
		query: string;
		timestamp: Date;
		results: any[];
	}

	// Persisted state for search history
	const searchHistory = new PersistedState<SearchHistoryItem[]>('cinder-search-history', [], {
		serializer: {
			serialize: superjson.stringify,
			deserialize: superjson.parse
		}
	});

	let activeTab = $state('scrape');

	// Scrape Form
	let scrapeSubmitting = $state(false);
	let scrapeError = $state<string | null>(null);

	const scrapeEnhance = scrapeUrl.enhance(async ({ submit }) => {
		scrapeSubmitting = true;
		scrapeError = null;
		try {
			await submit();
		} catch (e: any) {
			scrapeError = e.message || 'An error occurred';
		} finally {
			scrapeSubmitting = false;
		}
	});

	// Crawl Form
	let crawlId = $state('');
	let crawlSubmitting = $state(false);
	let crawlError = $state<string | null>(null);
	let crawlStatus = $derived(crawlId ? getCrawlStatus(crawlId) : null);

	const crawlEnhance = crawlUrl.enhance(async ({ submit }) => {
		crawlSubmitting = true;
		crawlError = null;
		try {
			await submit();
		} catch (e: any) {
			crawlError = e.message || 'An error occurred';
		} finally {
			crawlSubmitting = false;
		}
	});

	$effect(() => {
		if (crawlUrl.result && (crawlUrl.result as any).id) {
			crawlId = (crawlUrl.result as any).id;
		}
	});

	$effect(() => {
		if (crawlId && crawlStatus) {
			const interval = setInterval(() => {
				// @ts-ignore
				if (crawlStatus.refresh) crawlStatus.refresh();
			}, 2000);
			return () => clearInterval(interval);
		}
	});

	// Search Form
	let searchSubmitting = $state(false);
	let searchError = $state<string | null>(null);
	let historicalResults = $state<any[] | null>(null);

	const searchEnhance = searchWeb.enhance(async ({ submit }) => {
		searchSubmitting = true;
		searchError = null;
		historicalResults = null; // Clear historical results when doing new search
		try {
			// Get the query value before submit
			const queryValue = searchWeb.fields.query.value();
			await submit();
			// After successful submit, save to history
			if (searchWeb.result && queryValue) {
				const newItem: SearchHistoryItem = {
					id: crypto.randomUUID(),
					query: queryValue,
					timestamp: new Date(),
					results: searchWeb.result
				};
				// Add to beginning of history, keep only last 10
				searchHistory.current = [newItem, ...searchHistory.current.slice(0, 9)];
			}
		} catch (e: any) {
			searchError = e.message || 'An error occurred';
		} finally {
			searchSubmitting = false;
		}
	});

	// Load previous search
	function loadPreviousSearch(item: SearchHistoryItem) {
		// Display the historical results
		historicalResults = item.results;
		// Clear any current search error
		searchError = null;
	}

	// Clear search history
	function clearSearchHistory() {
		searchHistory.current = [];
	}

	// Remove single history item
	function removeHistoryItem(id: string) {
		searchHistory.current = searchHistory.current.filter((item) => item.id !== id);
	}
</script>

<div class="container mx-auto flex h-[calc(100vh-4rem)] max-w-6xl flex-col py-6">
	<div class="mb-6">
		<h1 class="mb-2 text-3xl font-bold tracking-tight">Cinder Playground</h1>
		<p class="text-muted-foreground">
			Interact with Cinder's Scrape, Crawl, and Search capabilities.
		</p>
	</div>

	<Tabs.Root
		value={activeTab}
		onValueChange={(v) => (activeTab = v)}
		class="flex min-h-0 flex-1 flex-col"
	>
		<Tabs.List class="mb-4 grid w-full max-w-100 grid-cols-3">
			<Tabs.Trigger value="scrape">Scrape</Tabs.Trigger>
			<Tabs.Trigger value="crawl">Crawl</Tabs.Trigger>
			<Tabs.Trigger value="search">Search</Tabs.Trigger>
		</Tabs.List>

		<!-- SCRAPE TAB -->
		<Tabs.Content value="scrape" class="mt-0 flex min-h-0 flex-1 flex-col gap-4">
			<Card.Root class="p-6">
				<form {...scrapeEnhance} class="flex items-end gap-4">
					<div class="flex-1 space-y-2">
						<Label>URL</Label>
						<div class="flex gap-2">
							<Input
								{...scrapeUrl.fields.url.as('text')}
								placeholder="https://example.com"
								class="flex-1"
							/>
							<OptionsSheet fields={scrapeUrl.fields} />
						</div>
						{#each scrapeUrl.fields.url.issues() as issue}
							<p class="text-xs text-destructive">{issue.message}</p>
						{/each}
					</div>
					<Button type="submit" disabled={scrapeSubmitting}>
						{#if scrapeSubmitting}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						{/if}
						Run Scrape
					</Button>
				</form>
			</Card.Root>

			<div class="min-h-0 flex-1">
				{#if scrapeUrl.result}
					<CodeViewer result={scrapeUrl.result} />
				{:else if scrapeError}
					<div
						class="rounded-md border border-destructive/20 bg-destructive/10 p-4 text-destructive"
					>
						Error: {scrapeError}
					</div>
				{:else}
					<div
						class="flex h-full items-center justify-center rounded-lg border-2 border-dashed text-muted-foreground"
					>
						Enter a URL to see the scrape result.
					</div>
				{/if}
			</div>
		</Tabs.Content>

		<!-- CRAWL TAB -->
		<Tabs.Content value="crawl" class="mt-0 flex min-h-0 flex-1 flex-col gap-4">
			<Card.Root class="p-6">
				<form {...crawlEnhance} class="flex items-end gap-4">
					<div class="flex-1 space-y-2">
						<Label>Base URL</Label>
						<Input {...crawlUrl.fields.url.as('text')} placeholder="https://example.com" />
						{#each crawlUrl.fields.url.issues() as issue}
							<p class="text-xs text-destructive">{issue.message}</p>
						{/each}
					</div>
					<div class="w-32 space-y-2">
						<Label>Max Depth</Label>
						<Input {...crawlUrl.fields.maxDepth.as('number')} placeholder="2" />
					</div>
					<Button type="submit" disabled={crawlSubmitting}>
						{#if crawlSubmitting}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						{/if}
						Start Crawl
					</Button>
				</form>
			</Card.Root>

			<div class="flex min-h-0 flex-1 flex-col gap-4">
				{#if crawlId}
					{#await crawlStatus}
						<div class="flex items-center gap-2 p-4 text-muted-foreground">
							<Loader2 class="h-4 w-4 animate-spin" /> Connecting to job {crawlId}...
						</div>
					{:then status}
						<Card.Root class="flex min-h-0 flex-1 flex-col border-0 bg-muted/50 shadow-none">
							<div
								class="flex items-center justify-between border-b bg-background/50 px-4 py-2 backdrop-blur"
							>
								<div class="space-y-1">
									<h3 class="text-sm font-medium">Job {crawlId}</h3>
									<div class="flex items-center gap-2 text-xs text-muted-foreground">
										<span class="capitalize">{status?.status || 'Unknown'}</span>
										<span>•</span>
										<span>{status?.completed || 0} / {status?.total || '?'} pages</span>
									</div>
								</div>
								<Button
									variant="outline"
									size="sm"
									class="h-8 text-xs"
									onclick={() => getCrawlStatus(crawlId).refresh()}
								>
									Refresh
								</Button>
							</div>

							<div class="bg-background/50 px-4 py-1">
								<Progress
									value={((status?.completed || 0) / (status?.total || 1)) * 100}
									class="h-1"
								/>
							</div>

							<ScrollArea class="flex-1 p-4">
								<div class="space-y-2">
									{#each status?.data || [] as page}
										<div
											class="flex items-start justify-between rounded-lg border bg-card p-3 transition-colors hover:border-primary/50"
										>
											<div class="mr-4 min-w-0 flex-1">
												<a
													href={page.url}
													target="_blank"
													class="block truncate text-sm font-medium hover:underline"
													>{page.metadata?.title || page.url}</a
												>
												<p class="truncate text-xs text-muted-foreground">{page.url}</p>
											</div>
											{#if page.markdown}
												<Button variant="secondary" size="sm" class="h-7 text-xs">MD</Button>
											{/if}
										</div>
									{/each}
								</div>
							</ScrollArea>
						</Card.Root>
					{:catch err}
						<div class="p-4 text-destructive">Error loading status: {err.message}</div>
					{/await}
				{:else if crawlError}
					<div
						class="rounded-md border border-destructive/20 bg-destructive/10 p-4 text-destructive"
					>
						Error: {crawlError}
					</div>
				{:else}
					<div
						class="flex h-full items-center justify-center rounded-lg border-2 border-dashed text-muted-foreground"
					>
						Start a crawl job to see progress.
					</div>
				{/if}
			</div>
		</Tabs.Content>

		<!-- SEARCH TAB -->
		<Tabs.Content value="search" class="mt-0 flex min-h-0 flex-1 flex-col gap-4">
			<Card.Root class="p-6">
				<form {...searchEnhance} class="flex items-end gap-4">
					<div class="flex-1 space-y-2">
						<Label>Search Query</Label>
						<div class="flex gap-2">
							<Input
								{...searchWeb.fields.query.as('text')}
								placeholder="e.g. 'cinder docs'"
								class="flex-1"
							/>
							<OptionsSheet fields={searchWeb.fields} />
						</div>
						{#each searchWeb.fields.query.issues() as issue}
							<p class="text-xs text-destructive">{issue.message}</p>
						{/each}
					</div>
					<Button type="submit" disabled={searchSubmitting}>
						{#if searchSubmitting}
							<Loader2 class="mr-2 h-4 w-4 animate-spin" />
						{/if}
						Search
					</Button>
				</form>
			</Card.Root>

			<!-- Search History -->
			{#if searchHistory.current.length > 0}
				<Card.Root class="border-amber-200/50 bg-linear-to-br from-amber-50/50 to-transparent">
					<Card.Header class="pb-3">
						<div class="flex items-center justify-between">
							<div class="flex items-center gap-2">
								<History class="h-4 w-4 text-amber-600" />
								<Card.Title class="text-base">Recent Searches</Card.Title>
								<span class="text-xs text-muted-foreground">({searchHistory.current.length})</span>
							</div>
							<Button
								variant="ghost"
								size="sm"
								class="h-8 text-xs text-muted-foreground hover:text-destructive"
								onclick={clearSearchHistory}
							>
								<Trash2 class="mr-1 h-3 w-3" />
								Clear
							</Button>
						</div>
					</Card.Header>
					<Card.Content>
						<ScrollArea class="h-40 pr-4">
							<div class="space-y-2">
								{#each searchHistory.current as item}
									<button
										class="group flex w-full items-center justify-between rounded-md border border-transparent bg-card px-3 py-2 text-left transition-all hover:border-amber-200 hover:bg-amber-50/50"
										onclick={() => loadPreviousSearch(item)}
									>
										<div class="min-w-0 flex-1">
											<p class="truncate text-sm font-medium group-hover:text-amber-900">
												{item.query}
											</p>
											<p class="text-xs text-muted-foreground">
												{item.timestamp.toLocaleString()} · {item.results.length}
												{item.results.length === 1 ? 'result' : 'results'}
											</p>
										</div>
										<Button
											variant="ghost"
											size="sm"
											class="h-6 w-6 p-0 opacity-0 transition-opacity group-hover:opacity-100"
											onclick={(e) => {
												e.stopPropagation();
												removeHistoryItem(item.id);
											}}
										>
											<Trash2 class="h-3 w-3 text-muted-foreground" />
										</Button>
									</button>
								{/each}
							</div>
						</ScrollArea>
					</Card.Content>
				</Card.Root>
			{/if}

			<div class="flex min-h-0 flex-1 flex-col gap-4">
				<Card.Root class="flex min-h-0 flex-1 flex-col border-0 bg-muted/30 shadow-sm">
					<Card.Header class="border-b bg-background/50 pb-3 backdrop-blur">
						<Card.Title class="text-sm font-medium">
							{#if searchWeb.result || historicalResults}
								{(searchWeb.result || historicalResults)?.length || 0}
								{(searchWeb.result || historicalResults)?.length === 1 ? 'Result' : 'Results'}
							{:else}
								Search Results
							{/if}
						</Card.Title>
					</Card.Header>
					<Card.Content class="flex min-h-0 flex-1 overflow-hidden p-0">
						{#if searchWeb.result || historicalResults}
							<ScrollArea class="h-full w-full">
								<div class="grid gap-4 p-4 pb-4">
									{#each searchWeb.result || historicalResults as item}
										<ResultCard result={item} />
									{/each}
								</div>
							</ScrollArea>
						{:else if searchError}
							<div class="flex w-full items-center justify-center p-8">
								<div
									class="max-w-sm rounded-md border border-destructive/30 bg-destructive/5 p-4 text-center text-destructive"
								>
									<p class="mb-2 font-medium">Search Error</p>
									<p class="text-sm">{searchError}</p>
								</div>
							</div>
						{:else}
							<div class="flex w-full items-center justify-center">
								<div class="text-center text-muted-foreground">
									<p class="text-sm">Enter a search query above to get started</p>
								</div>
							</div>
						{/if}
					</Card.Content>
				</Card.Root>
			</div>
		</Tabs.Content>
	</Tabs.Root>
</div>

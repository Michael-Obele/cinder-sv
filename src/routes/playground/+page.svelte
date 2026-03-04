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
	import ScrapeTab from '$lib/components/blocks/scrape-tab.svelte';
	import CrawlTab from '$lib/components/blocks/crawl-tab.svelte';
	import SearchTab from '$lib/components/blocks/search-tab.svelte';
	import { cn } from '$lib/utils';
	import { tick } from 'svelte';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';
	import { createReactiveDB } from 'svelte-idb/svelte';
	import { PersistedState } from 'runed';

	const scrapeOptions = new PersistedState('cinder-scrape-options', {
		mode: 'smart',
		render: false
	});

	const crawlOptions = new PersistedState('cinder-crawl-options', {
		render: false
	});

	const searchOptions = new PersistedState('cinder-search-options', {
		mode: 'default',
		limit: 5,
		offset: 0,
		maxAge: 0,
		includeDomains: '',
		excludeDomains: '',
		requiredText: ''
	});

	const db = createReactiveDB({
		name: 'cinder-playground',
		version: 1,
		stores: {
			history: { keyPath: 'id' }
		}
	});

	const historyLive = db.history.liveAll();

	// Local State
	const isMobile = new IsMobile();
	let crawlId = $state<string | null>(null);
	let activeTab = $derived(
		['scrape', 'crawl', 'search'].includes(page.url.searchParams.get('tab') || '')
			? page.url.searchParams.get('tab')!
			: 'scrape'
	);

	function setActiveTab(tab: string) {
		const newUrl = new URL(page.url);
		newUrl.searchParams.set('tab', tab);
		goto(newUrl, { replaceState: true, keepFocus: true, noScroll: true });
	}

	let sidebarOpen = $state(true);

	// Error States
	let scrapeError = $state<string | null>(null);
	let crawlError = $state<string | null>(null);
	let searchError = $state<string | null>(null);

	// Derived query for crawl status
	const statusQuery = $derived(crawlId ? getCrawlStatus(crawlId) : null);
	let crawlCurrent = $state<any>(null);

	// History Management
	type HistoryItem = {
		id: string;
		type: 'scrape' | 'crawl' | 'search';
		title: string;
		url: string;
		timestamp: string;
		data?: any;
	};
	let selectedHistoryItem = $state<HistoryItem | null>(null);

	let searchHistory = $derived(
		historyLive.current
			? ([...historyLive.current].sort(
					(a: any, b: any) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
				) as HistoryItem[])
			: []
	);

	async function addToHistory(item: HistoryItem) {
		await db.history.put(item);
		// Keep only latest 20 items
		const allItems = (await db.history.getAll()) as HistoryItem[];
		if (allItems.length > 20) {
			const sorted = allItems.sort(
				(a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
			);
			const toDelete = sorted.slice(20);
			for (const old of toDelete) {
				await db.history.delete(old.id);
			}
		}
	}

	async function clearHistory() {
		await db.history.clear();
		selectedHistoryItem = null;
	}

	// Polling is handled strictly in CrawlTab, but isCurrentlyLoading needs crawlUrl loading bounds.
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
		setActiveTab('scrape');
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
			{#each searchHistory as item (item.id)}
				<button
					class="group relative w-full rounded-lg border bg-background p-2.5 text-left transition-all hover:border-primary/50"
					onclick={() => {
						setActiveTab(item.type);
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

<div class="flex flex-1 flex-col bg-background md:flex-row">
	<!-- History Sidebar (Desktop Only) -->
	{#if !isMobile.current && sidebarOpen}
		<aside
			class="relative flex min-h-[50vh] w-80 shrink-0 flex-col self-start border-r border-b bg-muted/30 md:sticky md:top-16 md:min-h-[calc(100vh-4rem)] md:border-b-0"
		>
			{@render historyContent()}
		</aside>
	{/if}

	<!-- Main Workbench Area -->
	<main class="w-full min-w-0 flex-1">
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

			<Tabs value={activeTab} onValueChange={setActiveTab} class="w-full">
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
					<ScrapeTab
						bind:scrapeError
						bind:selectedHistoryItem
						{scrapeOptions}
						{displayedScrapeResult}
						{addToHistory}
					/>
				</TabsContent>

				<!-- Crawl Tab Content -->
				<TabsContent value="crawl" class="space-y-6 focus-visible:outline-none">
					<CrawlTab
						bind:crawlError
						bind:crawlId
						bind:selectedHistoryItem
						{crawlOptions}
						{addToHistory}
					/>
				</TabsContent>

				<!-- Search Tab Content -->
				<TabsContent value="search" class="space-y-6 focus-visible:outline-none">
					<SearchTab
						bind:searchError
						bind:selectedHistoryItem
						{searchOptions}
						{displayedSearchResult}
						{addToHistory}
						{handleScrape}
					/>
				</TabsContent>
			</Tabs>
		</div>
	</main>
</div>

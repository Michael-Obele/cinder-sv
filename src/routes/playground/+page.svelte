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
	import { Loader2 } from '@lucide/svelte';

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

	const searchEnhance = searchWeb.enhance(async ({ submit }) => {
		searchSubmitting = true;
		searchError = null;
		try {
			await submit();
		} catch (e: any) {
			searchError = e.message || 'An error occurred';
		} finally {
			searchSubmitting = false;
		}
	});
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
						<Input {...searchWeb.fields.query.as('text')} placeholder="e.g. 'cinder docs'" />
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

			<div class="min-h-0 flex-1">
				{#if searchWeb.result}
					<ScrollArea class="h-full pr-4">
						<div class="grid gap-4 pb-4">
							{#each searchWeb.result as item}
								<ResultCard result={item} />
							{/each}
						</div>
					</ScrollArea>
				{:else if searchError}
					<div
						class="rounded-md border border-destructive/20 bg-destructive/10 p-4 text-destructive"
					>
						Error: {searchError}
					</div>
				{:else}
					<div
						class="flex h-full items-center justify-center rounded-lg border-2 border-dashed text-muted-foreground"
					>
						Enter a query to search.
					</div>
				{/if}
			</div>
		</Tabs.Content>
	</Tabs.Root>
</div>

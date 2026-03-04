<script lang="ts">
	import { Globe, ArrowRight, Loader2, AlertCircle, Layers, Copy } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Badge } from '$lib/components/ui/badge';
	import OptionsSheet from '$lib/components/blocks/options-sheet.svelte';
	import ResultCard from '$lib/components/blocks/result-card.svelte';
	import CodeViewer from '$lib/components/blocks/code-viewer.svelte';
	import { scrapeUrl } from '$lib/remote/cinder.remote';

	let {
		scrapeError = $bindable(),
		selectedHistoryItem = $bindable(),
		scrapeOptions,
		displayedScrapeResult,
		addToHistory
	} = $props();
</script>

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
						<Globe class="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
						<Input
							id="scrape-url"
							{...scrapeUrl.fields.url.as('text')}
							placeholder="https://example.com"
							class="h-11 bg-background pl-10"
							aria-invalid={(scrapeUrl.fields.url?.issues()?.length || 0) > 0}
						/>
					</div>
					<input type="hidden" name="mode" value={scrapeOptions.current.mode} />
					{#if scrapeOptions.current.render}
						<input type="hidden" name="render" value="on" />
					{/if}
					<OptionsSheet bind:options={scrapeOptions.current} type="scrape" />
					<Button type="submit" disabled={!!scrapeUrl.pending} class="h-11 px-8 shadow-md">
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
				><Badge variant="outline" class="h-5 rounded px-1.5 text-[9px] uppercase">Format</Badge> Markdown</span
			>
			<span class="flex items-center gap-1.5"
				><Badge variant="outline" class="h-5 rounded px-1.5 text-[9px] uppercase">Engine</Badge> Cinder
				v1</span
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
								navigator.clipboard.writeText(JSON.stringify(displayedScrapeResult, null, 2));
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

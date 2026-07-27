<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Badge } from '$lib/components/ui/badge';
	import { Copy, Check, Image, Camera } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import ImageGallery from './image-gallery.svelte';

	let { result } = $props();
	// Result can be ScrapeResult (markdown, html, images, screenshot, etc.)

	let copied = $state(false);

	// Determine available tabs
	let hasImages = $derived(!!result?.images?.length);
	let hasScreenshot = $derived(!!result?.screenshot?.blob || !!result?.screenshot?.url);
	let tabCount = $derived(4 + (hasImages ? 1 : 0) + (hasScreenshot ? 1 : 0));

	// Default to images when available, then screenshot, else markdown
	// Writable $derived: assigning to it temporarily overrides the computed value
	// until the expression re-evaluates (when result/hasImages/hasScreenshot change)
	let activeTab = $derived(
		!result ? 'markdown' : hasImages ? 'images' : hasScreenshot ? 'screenshot' : 'markdown'
	);

	function copyToClipboard() {
		let content = '';
		if (activeTab === 'markdown') content = result.markdown;
		else if (activeTab === 'html') content = result.html;
		else if (activeTab === 'json') content = JSON.stringify(result, null, 2);
		else if (activeTab === 'links') content = (result.links || []).join('\n');

		navigator.clipboard.writeText(content || '');
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	function getScreenshotSrc(): string {
		const sc = result.screenshot;
		if (!sc) return '';
		if (sc.blob) return `data:image/${sc.format || 'jpeg'};base64,${sc.blob}`;
		return sc.url || '';
	}
</script>

<Card.Root class="flex h-full flex-col border-0 bg-muted/50 shadow-none">
	<Tabs.Root value={activeTab} onValueChange={(v) => (activeTab = v)} class="flex flex-1 flex-col">
		<div
			class="sticky top-0 z-10 flex items-center justify-between border-b bg-background/50 px-4 py-2 backdrop-blur"
		>
			<Tabs.List class="grid w-fit gap-0.5" style="grid-template-columns: repeat({tabCount}, auto)">
				<Tabs.Trigger value="markdown">Markdown</Tabs.Trigger>
				<Tabs.Trigger value="html">HTML</Tabs.Trigger>
				<Tabs.Trigger value="json">JSON</Tabs.Trigger>
				<Tabs.Trigger value="links">Links</Tabs.Trigger>
				{#if hasImages}
					<Tabs.Trigger value="images" class="gap-1.5"><Image class="size-3.5" /> Images</Tabs.Trigger>
				{/if}
				{#if hasScreenshot}
					<Tabs.Trigger value="screenshot" class="gap-1.5"><Camera class="size-3.5" /> Screenshot</Tabs.Trigger>
				{/if}
			</Tabs.List>

			<div class="flex items-center gap-2">
				{#if result.statusCode}
					<Badge
						variant={result.statusCode >= 200 && result.statusCode < 300
							? 'default'
							: 'destructive'}
					>
						{result.statusCode}
					</Badge>
				{/if}
				<Button variant="ghost" size="icon" onclick={copyToClipboard}>
					{#if copied}
						<Check class="h-4 w-4 text-green-500" />
					{:else}
						<Copy class="h-4 w-4" />
					{/if}
				</Button>
			</div>
		</div>

		<div class="relative min-h-0 flex-1">
			<ScrollArea class="h-144 p-4">
				<Tabs.Content value="markdown" class="mt-0">
					<pre class="font-mono text-sm whitespace-pre-wrap text-foreground/80">{result.markdown ||
							'No Markdown content'}</pre>
				</Tabs.Content>
				<Tabs.Content value="html" class="mt-0">
					<pre class="font-mono text-sm whitespace-pre-wrap text-foreground/80">{result.html ||
							'No HTML content'}</pre>
				</Tabs.Content>
				<Tabs.Content value="json" class="mt-0">
					<pre class="font-mono text-sm whitespace-pre-wrap text-foreground/80">{JSON.stringify(
							result,
							null,
							2
						)}</pre>
				</Tabs.Content>
				<Tabs.Content value="links" class="mt-0">
					<pre class="font-mono text-sm whitespace-pre-wrap text-foreground/80">{(
							result.links || []
						).join('\n') || 'No links found'}</pre>
				</Tabs.Content>
				{#if hasImages}
					<Tabs.Content value="images" class="mt-0">
						<ImageGallery images={result.images} className="p-0" />
					</Tabs.Content>
				{/if}
				{#if hasScreenshot}
					<Tabs.Content value="screenshot" class="mt-0">
						{@const screenshotSrc = getScreenshotSrc()}
						<div>
							<div class="mb-3 flex flex-wrap items-center gap-2">
								{#if result.screenshot.width && result.screenshot.height}
									<Badge variant="outline" class="text-[10px]">{result.screenshot.width}×{result.screenshot.height}px</Badge>
								{/if}
								{#if result.screenshot.format}
									<Badge variant="outline" class="text-[10px]">{result.screenshot.format.toUpperCase()}</Badge>
								{/if}
								{#if result.screenshot.size_bytes}
									<Badge variant="outline" class="text-[10px]">{(result.screenshot.size_bytes / 1024).toFixed(1)} KB</Badge>
								{/if}
								{#if result.screenshot.full_page}
									<Badge variant="secondary" class="text-[10px]">Full Page</Badge>
								{/if}
							</div>
							{#if screenshotSrc}
								<div class="overflow-hidden rounded-lg border">
									<img
										src={screenshotSrc}
										alt="Full page screenshot of {result.url}"
										class="w-full"
									/>
								</div>
							{:else}
								<p class="text-sm text-muted-foreground">No screenshot data available.</p>
							{/if}
						</div>
					</Tabs.Content>
				{/if}
			</ScrollArea>
		</div>
	</Tabs.Root>
</Card.Root>

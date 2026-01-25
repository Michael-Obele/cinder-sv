<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs';
	import * as Card from '$lib/components/ui/card';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import { Badge } from '$lib/components/ui/badge';
	import { Copy, Check } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';

	let { result } = $props();
	// Result can be ScrapeResult (markdown, html, etc.)

	let activeTab = $state('markdown');
	let copied = $state(false);

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
</script>

<Card.Root class="flex h-full flex-col border-0 bg-muted/50 shadow-none">
	<Tabs.Root value={activeTab} onValueChange={(v) => (activeTab = v)} class="flex flex-1 flex-col">
		<div
			class="sticky top-0 z-10 flex items-center justify-between border-b bg-background/50 px-4 py-2 backdrop-blur"
		>
			<Tabs.List class="grid w-fit grid-cols-4">
				<Tabs.Trigger value="markdown">Markdown</Tabs.Trigger>
				<Tabs.Trigger value="html">HTML</Tabs.Trigger>
				<Tabs.Trigger value="json">JSON</Tabs.Trigger>
				<Tabs.Trigger value="links">Links</Tabs.Trigger>
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
			</ScrollArea>
		</div>
	</Tabs.Root>
</Card.Root>

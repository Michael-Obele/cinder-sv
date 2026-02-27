<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { Settings } from '@lucide/svelte';

	let {
		options = $bindable(),
		type = 'scrape'
	}: {
		options: Record<string, any>;
		type?: 'scrape' | 'crawl' | 'search';
	} = $props();
</script>

<Sheet.Root>
	<Sheet.Trigger>
		{#snippet child({ props })}
			<Button variant="outline" class="mt-1" size="icon" {...props}>
				<Settings class="size-5" />
			</Button>
		{/snippet}
	</Sheet.Trigger>
	<Sheet.Content class="w-100 overflow-y-auto px-6 sm:w-135">
		<Sheet.Header>
			<Sheet.Title>Advanced Options</Sheet.Title>
			<Sheet.Description>Configure advanced {type} parameters.</Sheet.Description>
		</Sheet.Header>
		<div class="grid gap-6 py-6">
			{#if type === 'scrape' || type === 'crawl'}
				<div class="flex items-center justify-between">
					<Label>Enable Browser Rendering</Label>
					<Switch bind:checked={options.render} />
				</div>
			{/if}

			{#if type === 'scrape'}
				<div class="grid grid-cols-4 items-center gap-4">
					<Label class="text-right text-xs">Extraction Mode</Label>
					<!-- Custom dropdown equivalent logic -->
					<div class="col-span-3 flex shrink-0 items-center justify-start gap-1">
						<Button
							size="sm"
							variant={options.mode === 'smart' ? 'default' : 'outline'}
							onclick={() => (options.mode = 'smart')}>Smart</Button
						>
						<Button
							size="sm"
							variant={options.mode === 'static' ? 'default' : 'outline'}
							onclick={() => (options.mode = 'static')}>Static</Button
						>
						<Button
							size="sm"
							variant={options.mode === 'dynamic' ? 'default' : 'outline'}
							onclick={() => (options.mode = 'dynamic')}>Dynamic</Button
						>
					</div>
				</div>
			{/if}

			{#if type === 'search'}
				<div class="grid grid-cols-4 items-center gap-4">
					<Label class="text-right text-xs">Search Mode</Label>
					<div class="col-span-3 flex shrink-0 items-center justify-start gap-1">
						<Button
							size="sm"
							variant={options.mode === 'default' ? 'default' : 'outline'}
							onclick={() => (options.mode = 'default')}>Default</Button
						>
						<Button
							size="sm"
							variant={options.mode === 'news' ? 'default' : 'outline'}
							onclick={() => (options.mode = 'news')}>News</Button
						>
					</div>
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label class="text-right">Result Limit</Label>
					<Input type="number" bind:value={options.limit} class="col-span-3" placeholder="5" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label class="text-right">Max Age (Days)</Label>
					<Input type="number" bind:value={options.maxAge} class="col-span-3" placeholder="0" />
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label class="text-right leading-tight">Include Domains</Label>
					<Input
						bind:value={options.includeDomains}
						class="col-span-3"
						placeholder="wikipedia.org, github.com"
					/>
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label class="text-right leading-tight">Exclude Domains</Label>
					<Input
						bind:value={options.excludeDomains}
						class="col-span-3"
						placeholder="pinterest.com"
					/>
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label class="text-right leading-tight">Required Text</Label>
					<Input
						bind:value={options.requiredText}
						class="col-span-3"
						placeholder="open source, code"
					/>
				</div>
			{/if}
		</div>
	</Sheet.Content>
</Sheet.Root>

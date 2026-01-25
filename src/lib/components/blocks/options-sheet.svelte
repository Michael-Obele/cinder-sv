<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Switch } from '$lib/components/ui/switch';
	import { Settings } from '@lucide/svelte';

	let { fields } = $props();
</script>

<Sheet.Root>
	<Sheet.Trigger>
		{#snippet child({ props })}
			<Button variant="outline" size="icon" {...props}>
				<Settings class="h-4 w-4" />
			</Button>
		{/snippet}
	</Sheet.Trigger>
	<Sheet.Content class="w-100 overflow-y-auto px-6 sm:w-135">
		<Sheet.Header>
			<Sheet.Title>Advanced Options</Sheet.Title>
			<Sheet.Description>Configure advanced scraping parameters.</Sheet.Description>
		</Sheet.Header>
		<div class="grid gap-6 py-6">
			<div class="grid grid-cols-4 items-center gap-4">
				<Label class="text-right">Wait For (ms)</Label>
				<Input {...fields.waitFor.as('number')} class="col-span-3" placeholder="0" />
			</div>

			<div class="grid grid-cols-4 items-center gap-4">
				<Label class="text-right">Timeout (ms)</Label>
				<Input {...fields.timeout.as('number')} class="col-span-3" placeholder="30000" />
			</div>

			<div class="flex items-center justify-between">
				<Label>Mobile User Agent</Label>
				<Switch checked={fields.mobile.value()} onCheckedChange={(v) => fields.mobile.set(v)} />
			</div>

			<div class="flex items-center justify-between">
				<Label>Skip TLS Verification</Label>
				<Switch
					checked={fields.skipTlsVerification.value()}
					onCheckedChange={(v) => fields.skipTlsVerification.set(v)}
				/>
			</div>

			<!-- Note: Adding more generic tag inputs would require array handling which is complex for this snippet.
             For now, we support the basic toggles and numbers. -->
		</div>
	</Sheet.Content>
</Sheet.Root>

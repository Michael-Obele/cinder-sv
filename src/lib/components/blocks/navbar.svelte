<script lang="ts">
	import {
		Menu,
		X,
		Github,
		Settings,
		LayoutDashboard,
		FileText,
		Play,
		Shield
	} from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import ModeToggle from './mode-toggle.svelte';

	let isOpen = $state(false);

	function toggleMenu() {
		isOpen = !isOpen;
	}

	function closeMenu() {
		isOpen = false;
	}
</script>

<nav
	class="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60"
>
	<div class="container mx-auto px-4">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<div class="flex items-center gap-2">
				<a
					href="/"
					class="flex items-center gap-2 text-lg font-bold text-foreground transition-colors hover:text-primary"
				>
					<div
						class="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-bold text-white"
					>
						C
					</div>
					<span class="hidden sm:inline">Cinder</span>
				</a>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden items-center gap-1 md:flex">
				<Button variant="ghost" size="sm" class="gap-2">
					<LayoutDashboard class="h-4 w-4" />
					<a href="/" class="text-sm font-medium transition-colors hover:text-primary">Home</a>
				</Button>
				<Button variant="ghost" size="sm" class="gap-2">
					<FileText class="h-4 w-4" />
					<a href="/docs" class="text-sm font-medium transition-colors hover:text-primary">Docs</a>
				</Button>
				<Button variant="ghost" size="sm" class="gap-2">
					<Play class="h-4 w-4" />
					<a href="/playground" class="text-sm font-medium transition-colors hover:text-primary"
						>Playground</a
					>
				</Button>
			</div>

			<!-- Desktop Actions -->
			<div class="hidden items-center gap-2 md:flex">
				<Button variant="ghost" size="icon" class="text-muted-foreground hover:text-foreground">
					<a
						href="https://github.com/Michael-Obele/cinder-sv"
						target="_blank"
						rel="noopener noreferrer"
						title="GitHub"
						class="inline-flex"
					>
						<Github class="h-5 w-5" />
					</a>
				</Button>
				<ModeToggle />
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Button {...props} variant="ghost" size="icon" title="Settings">
								<Settings class="h-5 w-5" />
							</Button>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content align="end" class="w-48">
						<DropdownMenu.Label>Settings</DropdownMenu.Label>
						<DropdownMenu.Separator />
						<DropdownMenu.Item class="gap-2">
							<Settings class="h-4 w-4" />
							<span>General</span>
						</DropdownMenu.Item>
						<DropdownMenu.Item class="gap-2">
							<Shield class="h-4 w-4" />
							<span>Privacy</span>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</div>

			<!-- Mobile Menu Button -->
			<Button variant="ghost" size="icon" onclick={toggleMenu} class="md:hidden">
				{#if isOpen}
					<X class="h-6 w-6" />
				{:else}
					<Menu class="h-6 w-6" />
				{/if}
			</Button>
		</div>

		<!-- Mobile Navigation -->
		{#if isOpen}
			<div class="border-t border-border bg-background pb-4 md:hidden">
				<div class="flex flex-col gap-1 pt-4">
					<Button variant="ghost" class="w-full justify-start gap-2" onclick={closeMenu}>
						<LayoutDashboard class="h-4 w-4" />
						<a href="/" class="text-sm font-medium">Home</a>
					</Button>
					<Button variant="ghost" class="w-full justify-start gap-2" onclick={closeMenu}>
						<FileText class="h-4 w-4" />
						<a href="/docs" class="text-sm font-medium">Docs</a>
					</Button>
					<Button variant="ghost" class="w-full justify-start gap-2" onclick={closeMenu}>
						<Play class="h-4 w-4" />
						<a href="/playground" class="text-sm font-medium">Playground</a>
					</Button>
					<div class="my-2 border-t border-border"></div>
					<div class="flex items-center justify-between px-2">
						<div class="flex gap-1">
							<Button
								variant="ghost"
								size="icon"
								class="text-muted-foreground hover:text-foreground"
							>
								<a
									href="https://github.com/Michael-Obele/cinder-sv"
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex"
								>
									<Github class="h-5 w-5" />
								</a>
							</Button>
							<ModeToggle />
						</div>
						<Button variant="ghost" size="icon" onclick={closeMenu} title="Settings">
							<Settings class="h-5 w-5" />
						</Button>
					</div>
				</div>
			</div>
		{/if}
	</div>
</nav>

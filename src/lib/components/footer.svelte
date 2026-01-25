<script lang="ts">
	import { Github, Mail, Twitter, Heart } from '@lucide/svelte';
</script>

<footer class="border-t border-border bg-background py-12">
	<div class="container mx-auto px-4">
		<!-- Main Footer Content -->
		<div class="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
			<!-- Brand -->
			<div class="flex flex-col gap-4">
				<div class="flex items-center gap-2">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-md bg-primary font-bold text-white"
					>
						C
					</div>
					<span class="text-lg font-bold text-foreground">Cinder</span>
				</div>
				<p class="text-sm text-muted-foreground">
					Build amazing web applications with modern tools and technologies.
				</p>
			</div>

			<!-- Documentation -->
			<div class="flex flex-col gap-4">
				<h3 class="font-semibold text-foreground">Documentation</h3>
				<nav class="flex flex-col gap-2">
					<a
						href="/docs/setup"
						class="text-sm text-muted-foreground transition-colors hover:text-primary"
						>Setup Guide</a
					>
					<a
						href="/docs/architecture"
						class="text-sm text-muted-foreground transition-colors hover:text-primary"
						>Architecture</a
					>
					<a
						href="/docs/features"
						class="text-sm text-muted-foreground transition-colors hover:text-primary">Features</a
					>
					<a
						href="/docs/theme"
						class="text-sm text-muted-foreground transition-colors hover:text-primary">Theme</a
					>
				</nav>
			</div>

			<!-- Resources -->
			<div class="flex flex-col gap-4">
				<h3 class="font-semibold text-foreground">Resources</h3>
				<nav class="flex flex-col gap-2">
					<a
						href="/playground"
						class="text-sm text-muted-foreground transition-colors hover:text-primary">Playground</a
					>
					<a
						href="/docs/user-flow"
						class="text-sm text-muted-foreground transition-colors hover:text-primary">User Flow</a
					>
					<a
						href="https://github.com"
						target="_blank"
						rel="noopener noreferrer"
						class="text-sm text-muted-foreground transition-colors hover:text-primary">GitHub</a
					>
					<a
						href="https://twitter.com"
						target="_blank"
						rel="noopener noreferrer"
						class="text-sm text-muted-foreground transition-colors hover:text-primary">Twitter</a
					>
				</nav>
			</div>

			<!-- Connect -->
			<div class="flex flex-col gap-4">
				<h3 class="font-semibold text-foreground">Connect</h3>
				<div class="flex gap-3">
					<a
						href="https://github.com"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
						title="GitHub"
					>
						<Github class="h-5 w-5" />
					</a>
					<a
						href="https://twitter.com"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
						title="Twitter"
					>
						<Twitter class="h-5 w-5" />
					</a>
					<a
						href="mailto:contact@example.com"
						class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-muted transition-colors hover:bg-primary hover:text-primary-foreground"
						title="Email"
					>
						<Mail class="h-5 w-5" />
					</a>
				</div>
			</div>
		</div>

		<!-- Divider -->
		<div class="my-8 border-t border-border"></div>

		<!-- Bottom Section -->
		<div class="flex flex-col items-center justify-between gap-4 md:flex-row">
			<p class="text-sm text-muted-foreground">&copy; 2026 Cinder. All rights reserved.</p>
			<div class="flex items-center gap-1 text-sm text-muted-foreground">
				Made with
				<Heart class="mx-1 h-4 w-4 fill-red-500 text-red-500" />
				by the Cinder team
			</div>
		</div>
	</div>
</footer>

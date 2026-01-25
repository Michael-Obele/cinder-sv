<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { Palette, Settings, Eye, CheckCircle, Code, Moon } from '@lucide/svelte';
</script>

<div class="prose prose-sm dark:prose-invert max-w-none space-y-8">
	<div>
		<h1 class="mb-2 text-3xl font-bold tracking-tight">Theme Configuration</h1>
		<p class="text-lg text-muted-foreground">
			Customize the Cinder Frontend with Tailwind CSS v4 and our "Cinder Glow" theme.
		</p>
	</div>

	<Alert.Root class="mb-8">
		<Palette class="h-4 w-4" />
		<Alert.Title>Tailwind CSS v4</Alert.Title>
		<Alert.Description>
			This project uses Tailwind CSS v4 with OKLCH color space and semantic design tokens.
			Configuration is in <code class="text-primary">src/routes/layout.css</code>
		</Alert.Description>
	</Alert.Root>

	<!-- Color Palette -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Cinder Glow Color Palette</h2>

		<p class="mb-6">
			The "Cinder Glow" theme combines neutral Slate grays with warm Amber and Orange accents,
			creating a modern, accessible color scheme.
		</p>

		<div class="mb-8 grid gap-4 md:grid-cols-2">
			<!-- Primary Colors -->
			<div>
				<h3 class="mb-4 text-base font-semibold">Primary Colors (Amber/Orange)</h3>
				<div class="space-y-2">
					<div class="flex items-center gap-3">
						<div class="h-12 w-12 rounded bg-amber-500"></div>
						<div>
							<p class="font-mono text-sm">--primary</p>
							<p class="text-xs text-muted-foreground">Amber 500</p>
						</div>
					</div>
					<div class="flex items-center gap-3">
						<div class="h-12 w-12 rounded bg-amber-100 dark:bg-amber-950"></div>
						<div>
							<p class="font-mono text-sm">--primary-foreground</p>
							<p class="text-xs text-muted-foreground">Amber 100/950</p>
						</div>
					</div>
				</div>
			</div>

			<!-- Secondary Colors -->
			<div>
				<h3 class="mb-4 text-base font-semibold">Neutral Colors (Slate)</h3>
				<div class="space-y-2">
					<div class="flex items-center gap-3">
						<div class="h-12 w-12 rounded bg-slate-950 dark:bg-slate-50"></div>
						<div>
							<p class="font-mono text-sm">--background</p>
							<p class="text-xs text-muted-foreground">Slate 950/50</p>
						</div>
					</div>
					<div class="flex items-center gap-3">
						<div
							class="h-12 w-12 rounded border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950"
						></div>
						<div>
							<p class="font-mono text-sm">--border</p>
							<p class="text-xs text-muted-foreground">Slate 200/800</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="rounded-lg border bg-muted/30 p-6">
			<h4 class="mb-4 text-base font-semibold">Semantic Color Variables</h4>
			<div class="space-y-2 font-mono text-sm">
				<div class="flex justify-between">
					<span>--primary</span>
					<Badge>Main accent</Badge>
				</div>
				<div class="flex justify-between">
					<span>--secondary</span>
					<Badge variant="outline">Alternative action</Badge>
				</div>
				<div class="flex justify-between">
					<span>--muted-foreground</span>
					<Badge variant="secondary">Subtle text</Badge>
				</div>
				<div class="flex justify-between">
					<span>--destructive</span>
					<Badge variant="destructive">Errors</Badge>
				</div>
			</div>
		</div>
	</section>

	<!-- Light/Dark Mode -->
	<section>
		<h2 class="mt-8 mb-4 flex items-center gap-3 text-2xl font-bold">
			<Moon class="h-6 w-6" />
			Dark & Light Modes
		</h2>

		<Card.Root class="mb-6">
			<Card.Header>
				<Card.Title class="text-base">Dark Mode (Default)</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-2 text-sm text-muted-foreground">
				<p>✓ Primary dark theme with high contrast</p>
				<p>✓ Reduced eye strain for extended use</p>
				<p>✓ Professional appearance aligned with Firecrawl</p>
				<p>✓ Better for accessibility (WCAG AA compliant)</p>
			</Card.Content>
		</Card.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title class="text-base">Light Mode</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-2 text-sm text-muted-foreground">
				<p>✓ Clean, minimal aesthetic</p>
				<p>✓ Bright, readable colors</p>
				<p>✓ Perfect for daylight use</p>
				<p>✓ User can toggle based on preference</p>
			</Card.Content>
		</Card.Root>
	</section>

	<!-- Layout CSS -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Configuration File</h2>

		<p class="mb-4">
			All theme configuration is centralized in <code class="text-primary"
				>src/routes/layout.css</code
			>
			. This file defines CSS custom properties, color variables, and utility classes.
		</p>

		<div class="overflow-x-auto rounded-lg border bg-muted/30 p-6 font-mono text-xs">
			<pre>{`@import 'tailwindcss/theme';

@layer theme {
  --color-primary: oklch(55% 0.12 45);
  --color-primary-foreground: white;
  
  --color-background: oklch(98% 0 0);
  --color-foreground: oklch(2% 0 0);
  
  --color-muted: oklch(96% 0 0);
  --color-muted-foreground: oklch(45% 0 0);
  
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  @layer theme {
    --color-background: oklch(12% 0 0);
    --color-foreground: oklch(98% 0 0);
    --color-muted: oklch(16% 0 0);
    --color-muted-foreground: oklch(64% 0 0);
  }
}`}</pre>
		</div>
	</section>

	<!-- Customization -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Customization Guide</h2>

		<div class="space-y-4">
			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-base">
						<Code class="h-4 w-4" />
						Changing Colors
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm">
					<p class="text-muted-foreground">
						1. Open <code class="text-primary">src/routes/layout.css</code>
					</p>
					<p class="text-muted-foreground">
						2. Modify the OKLCH values in the <code class="text-primary">@layer theme</code> section
					</p>
					<p class="text-muted-foreground">3. Update both light and dark mode variants</p>
					<p class="text-muted-foreground">4. Rebuild and test in browser</p>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-base">
						<Eye class="h-4 w-4" />
						Preview Changes
					</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm text-muted-foreground">
					Use the dev server with hot reload to instantly see theme changes. No build required.
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="flex items-center gap-2 text-base">
						<CheckCircle class="h-4 w-4" />
						OKLCH Color Space
					</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm text-muted-foreground">
					<p>OKLCH provides:</p>
					<ul class="list-inside space-y-1">
						<li>✓ Perceptually uniform colors</li>
						<li>✓ Better color interpolation</li>
						<li>✓ More accessible contrast ratios</li>
						<li>✓ Modern browser support</li>
					</ul>
				</Card.Content>
			</Card.Root>
		</div>
	</section>

	<!-- CSS Classes -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Semantic CSS Classes</h2>

		<p class="mb-4">
			Use these semantic Tailwind classes instead of hardcoded colors for consistency:
		</p>

		<div class="space-y-3">
			{#each [{ class: 'bg-primary', desc: 'Primary action backgrounds' }, { class: 'text-primary', desc: 'Primary text (accents)' }, { class: 'bg-background', desc: 'Page/component backgrounds' }, { class: 'text-foreground', desc: 'Main body text' }, { class: 'bg-muted', desc: 'Secondary backgrounds' }, { class: 'text-muted-foreground', desc: 'Secondary text' }, { class: 'border-border', desc: 'Border lines' }] as color}
				<div class="flex items-center justify-between rounded-lg border p-3">
					<code class="font-mono text-sm text-primary">{color.class}</code>
					<p class="text-xs text-muted-foreground">{color.desc}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- Responsive Design -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Responsive Design Tokens</h2>

		<div class="space-y-3 rounded-lg border p-6">
			<p class="text-sm font-medium">Tailwind breakpoints:</p>
			<div class="space-y-2 font-mono text-sm">
				<div class="flex justify-between">
					<span>sm</span>
					<span class="text-muted-foreground">640px</span>
				</div>
				<div class="flex justify-between">
					<span>md</span>
					<span class="text-muted-foreground">768px</span>
				</div>
				<div class="flex justify-between">
					<span>lg</span>
					<span class="text-muted-foreground">1024px</span>
				</div>
				<div class="flex justify-between">
					<span>xl</span>
					<span class="text-muted-foreground">1280px</span>
				</div>
			</div>
			<p class="mt-4 text-xs text-muted-foreground">
				Use prefixes like <code>md:grid-cols-2</code> for responsive layouts.
			</p>
		</div>
	</section>

	<!-- Best Practices -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Best Practices</h2>

		<Alert.Root class="mb-6">
			<Settings class="h-4 w-4" />
			<Alert.Title>Theme Consistency</Alert.Title>
			<Alert.Description>
				Always use semantic color tokens instead of hardcoding HSL/Hex values. This ensures
				consistency across light/dark modes.
			</Alert.Description>
		</Alert.Root>

		<ul class="space-y-2 text-sm text-muted-foreground">
			<li>✓ Use Tailwind utility classes for styling</li>
			<li>✓ Leverage semantic color variables for theming</li>
			<li>✓ Keep hardcoded colors to a minimum</li>
			<li>✓ Test color contrast for accessibility (WCAG AA)</li>
			<li>✓ Preview changes in both light and dark modes</li>
			<li>✓ Use `cn()` utility for conditional class merging</li>
			<li>✓ Prefer motion-safe utilities for animations</li>
		</ul>
	</section>

	<!-- Tools & Resources -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Tools & Resources</h2>

		<div class="grid gap-4 md:grid-cols-2">
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">OKLCH Color Picker</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm text-muted-foreground">
					Use online tools to convert RGB/Hex colors to OKLCH format for use in CSS.
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Contrast Checker</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm text-muted-foreground">
					Verify color combinations meet WCAG AA accessibility standards.
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Tailwind Docs</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm text-muted-foreground">
					Reference official Tailwind CSS v4 documentation for the latest features.
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Browser DevTools</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm text-muted-foreground">
					Use browser inspector to debug CSS variables and view computed styles.
				</Card.Content>
			</Card.Root>
		</div>
	</section>
</div>

<script lang="ts">
	import * as Alert from '$lib/components/ui/alert';
	import * as Card from '$lib/components/ui/card';
	import { Badge } from '$lib/components/ui/badge';
	import { CheckCircle, Download, Zap, Terminal, FileText, Cpu } from '@lucide/svelte';
</script>

<div class="prose prose-sm dark:prose-invert max-w-none space-y-8">
	<div>
		<h1 class="mb-2 text-3xl font-bold tracking-tight">Setup Guide</h1>
		<p class="text-lg text-muted-foreground">
			Get Cinder up and running in minutes with this comprehensive setup guide.
		</p>
	</div>

	<Alert.Root class="mb-8">
		<Zap class="h-4 w-4" />
		<Alert.Title>Prerequisites</Alert.Title>
		<Alert.Description>
			Node.js 18+ or higher, Bun 1.0+, and a running Cinder Go backend instance.
		</Alert.Description>
	</Alert.Root>

	<!-- Installation Section -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Installation</h2>

		<div class="space-y-4">
			<!-- Step 1 -->
			<div class="rounded-lg border p-6">
				<div class="flex items-start gap-4">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
					>
						1
					</div>
					<div class="flex-1">
						<h3 class="mb-2 font-semibold">Clone the Repository</h3>
						<p class="mb-3 text-sm text-muted-foreground">
							Get the latest source code from GitHub.
						</p>
						<pre class="overflow-x-auto rounded bg-muted p-3 text-xs"><code
								>{`git clone https://github.com/Michael-Obele/cinder-sv.git
cd cinder-sv`}</code
							></pre>
					</div>
				</div>
			</div>

			<!-- Step 2 -->
			<div class="rounded-lg border p-6">
				<div class="flex items-start gap-4">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
					>
						2
					</div>
					<div class="flex-1">
						<h3 class="mb-2 font-semibold">Install Dependencies</h3>
						<p class="mb-3 text-sm text-muted-foreground">
							Use Bun for faster installation and better performance.
						</p>
						<pre class="overflow-x-auto rounded bg-muted p-3 text-xs"><code>{`bun install`}</code
							></pre>
						<p class="mt-3 text-xs text-muted-foreground">
							<strong>Note:</strong> If using npm or pnpm, adjust the commands accordingly.
						</p>
					</div>
				</div>
			</div>

			<!-- Step 3 -->
			<div class="rounded-lg border p-6">
				<div class="flex items-start gap-4">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
					>
						3
					</div>
					<div class="flex-1">
						<h3 class="mb-2 font-semibold">Configure Environment Variables</h3>
						<p class="mb-3 text-sm text-muted-foreground">
							Copy the example environment file and update it with your backend details.
						</p>
						<pre class="overflow-x-auto rounded bg-muted p-3 text-xs"><code
								>{`cp .env.example .env.local`}</code
							></pre>
						<div class="mt-4 rounded bg-amber-50 p-3 text-sm dark:bg-amber-950">
							<p class="mb-2 font-medium text-amber-900 dark:text-amber-100">
								Edit .env.local with:
							</p>
							<pre class="overflow-x-auto text-xs"><code
									>{`PRIVATE_CINDER_BACKEND_URL=http://localhost:8000
PRIVATE_CINDER_API_KEY=your-api-key-here`}</code
								></pre>
						</div>
					</div>
				</div>
			</div>

			<!-- Step 4 -->
			<div class="rounded-lg border p-6">
				<div class="flex items-start gap-4">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground"
					>
						4
					</div>
					<div class="flex-1">
						<h3 class="mb-2 font-semibold">Start Development Server</h3>
						<p class="mb-3 text-sm text-muted-foreground">
							Launch the frontend development server.
						</p>
						<pre class="overflow-x-auto rounded bg-muted p-3 text-xs"><code>{`bun run dev`}</code
							></pre>
						<p class="mt-3 text-xs text-muted-foreground">
							The app will be available at <code>http://localhost:5173</code>
						</p>
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Development Commands -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Development Commands</h2>

		<div class="grid gap-3">
			<div class="flex items-start gap-3 rounded-lg border p-4">
				<Badge variant="secondary" class="mt-1">dev</Badge>
				<div class="flex-1">
					<p class="mb-1 font-mono text-sm">bun run dev</p>
					<p class="text-xs text-muted-foreground">
						Start development server with hot module reloading.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-3 rounded-lg border p-4">
				<Badge variant="secondary" class="mt-1">check</Badge>
				<div class="flex-1">
					<p class="mb-1 font-mono text-sm">bun run check</p>
					<p class="text-xs text-muted-foreground">
						Run TypeScript checks and find type errors. Essential after edits.
					</p>
				</div>
			</div>

			<div class="flex items-start gap-3 rounded-lg border p-4">
				<Badge variant="secondary" class="mt-1">build</Badge>
				<div class="flex-1">
					<p class="mb-1 font-mono text-sm">bun run build</p>
					<p class="text-xs text-muted-foreground">Create production build.</p>
				</div>
			</div>

			<div class="flex items-start gap-3 rounded-lg border p-4">
				<Badge variant="secondary" class="mt-1">preview</Badge>
				<div class="flex-1">
					<p class="mb-1 font-mono text-sm">bun run preview</p>
					<p class="text-xs text-muted-foreground">Preview production build locally.</p>
				</div>
			</div>

			<div class="flex items-start gap-3 rounded-lg border p-4">
				<Badge variant="secondary" class="mt-1">format</Badge>
				<div class="flex-1">
					<p class="mb-1 font-mono text-sm">bun run format</p>
					<p class="text-xs text-muted-foreground">Format code with Prettier.</p>
				</div>
			</div>
		</div>
	</section>

	<!-- Backend Setup -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Backend Configuration</h2>

		<Alert.Root class="mb-6">
			<Cpu class="h-4 w-4" />
			<Alert.Title>Cinder Go Backend Required</Alert.Title>
			<Alert.Description>
				The frontend requires a running Cinder Go backend instance. Ensure the backend is accessible
				and the API key is correctly configured in your environment variables.
			</Alert.Description>
		</Alert.Root>

		<Card.Root>
			<Card.Header>
				<Card.Title class="text-base">Backend Checklist</Card.Title>
			</Card.Header>
			<Card.Content class="space-y-2 text-sm">
				<div class="flex items-start gap-2">
					<CheckCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
					<span>Cinder Go backend is running and accessible</span>
				</div>
				<div class="flex items-start gap-2">
					<CheckCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
					<span>Backend URL is set correctly in PRIVATE_CINDER_BACKEND_URL</span>
				</div>
				<div class="flex items-start gap-2">
					<CheckCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
					<span>API key is valid and set in PRIVATE_CINDER_API_KEY</span>
				</div>
				<div class="flex items-start gap-2">
					<CheckCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
					<span>CORS is properly configured (if running on different domain)</span>
				</div>
				<div class="flex items-start gap-2">
					<CheckCircle class="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
					<span>Network connectivity between frontend and backend is working</span>
				</div>
			</Card.Content>
		</Card.Root>
	</section>

	<!-- Project Structure -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Project Structure Overview</h2>

		<div class="overflow-x-auto rounded-lg border bg-muted/30 p-6 font-mono text-xs">
			<pre>{`cinder-sv/
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ui/          # shadcn-svelte components
│   │   │   └── blocks/      # Feature blocks
│   │   ├── utils.ts         # Utilities
│   │   └── assets/
│   ├── remote/
│   │   └── cinder.remote.ts # Backend RPC calls
│   ├── routes/
│   │   ├── +layout.svelte
│   │   ├── +page.svelte
│   │   ├── playground/
│   │   └── docs/
│   ├── app.html
│   └── app.d.ts
├── static/                  # Static assets
├── frontend_plan/           # Documentation
├── .env.example
├── svelte.config.js
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── package.json`}</pre>
		</div>

		<p class="mt-4 text-sm text-muted-foreground">
			Key files: <code class="text-primary">src/remote/cinder.remote.ts</code> (backend calls),
			<code class="text-primary">src/routes/layout.css</code> (theme configuration).
		</p>
	</section>

	<!-- Troubleshooting -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Troubleshooting</h2>

		<div class="space-y-4">
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Port Already in Use</Card.Title>
				</Card.Header>
				<Card.Content class="text-sm">
					<p class="mb-2 text-muted-foreground">
						If port 5173 is already in use, Vite will use the next available port automatically.
						Check the terminal output for the actual URL.
					</p>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Backend Connection Failed</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm text-muted-foreground">
					<p>1. Verify the backend is running</p>
					<p>2. Check PRIVATE_CINDER_BACKEND_URL is correct</p>
					<p>3. Ensure API key is valid</p>
					<p>4. Check network connectivity and firewall rules</p>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Type Errors After Changes</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm text-muted-foreground">
					<p>Always run <code>bun run check</code> after making changes to catch errors early.</p>
				</Card.Content>
			</Card.Root>

			<Card.Root>
				<Card.Header>
					<Card.Title class="text-base">Dependencies Not Found</Card.Title>
				</Card.Header>
				<Card.Content class="space-y-2 text-sm text-muted-foreground">
					<p>Try deleting node_modules and reinstalling:</p>
					<pre class="mt-2 rounded bg-muted p-2"><code>{`bun install --force`}</code></pre>
				</Card.Content>
			</Card.Root>
		</div>
	</section>

	<!-- Next Steps -->
	<section>
		<h2 class="mt-8 mb-4 text-2xl font-bold">Next Steps</h2>

		<div class="space-y-3">
			<a
				href="/docs/features"
				class="block rounded-lg border p-4 transition-colors hover:bg-muted/50"
			>
				<p class="text-sm font-semibold">→ Explore Features</p>
				<p class="text-xs text-muted-foreground">
					Learn about Scrape, Crawl, and Search capabilities.
				</p>
			</a>

			<a href="/playground" class="block rounded-lg border p-4 transition-colors hover:bg-muted/50">
				<p class="text-sm font-semibold">→ Try the Playground</p>
				<p class="text-xs text-muted-foreground">Test the frontend with your backend.</p>
			</a>

			<a
				href="/docs/architecture"
				class="block rounded-lg border p-4 transition-colors hover:bg-muted/50"
			>
				<p class="text-sm font-semibold">→ Understand Architecture</p>
				<p class="text-xs text-muted-foreground">Deep dive into how everything works together.</p>
			</a>
		</div>
	</section>
</div>

# GitHub Copilot Instructions - Cinder Frontend

## Tech Stack & Architecture

- **Runtime & Tooling**: Bun (`bun`, `bunx`) is the preferred package manager and task runner.
- **Framework**: SvelteKit 5 (using Runes: `$state`, `$props`, `$derived`, `$effect`).
- **Styling**: Tailwind CSS v4 with OKLCH color space "Cinder Glow" theme (Slate + Amber/Orange). Prefer semantic classes (e.g., `btn-primary`, `text-muted-foreground`).
- **Backend Communication**: Remote Functions proxy all API calls to Cinder Go backend.
- **Validation**: Valibot schemas (not Zod).
- **UI Components**: Bits UI / shadcn-svelte primitives.
- **Icons**: Use `@lucide/svelte` (NOT `lucide-svelte`). Import icons as components: `import { IconName } from '@lucide/svelte'`.

## Coding Conventions

### Quality Gate

- **Proactive Checking**: Run `bun check` immediately after substantive edits to catch regressions or type errors.
- **Error Handling**: Only warnings can be ignored; errors must be fixed immediately. Use `<svelte:boundary>` for async operations to handle loading and error states gracefully.

### Package Management

- **Installation**: Always install packages via CLI using `bun add <package>` or `bunx <package>` for one-time use. Never edit package.json directly.
- **Research**: Thoroughly research packages before installation to ensure compatibility, necessity, and alignment with project standards (e.g., check for Svelte 5 compatibility, bundle size, maintenance status).

### Svelte 5 Runes

Always use Svelte 5 runes for reactivity. Never use legacy `export let` or `$:`.

- `$state(value)`: Declare reactive state. Use `$state.raw` for large objects/arrays that don't need deep reactivity.
- `$props()`: Receive component props. Destructure for clarity: `let { prop1, prop2 } = $props();`.
- `$derived(expression)`: Declare derived state. Use `$derived.by(() => ...)` for complex logic.
- `$effect(() => ...)`: Handle side effects (DOM, timers, etc.). Avoid for state synchronization.
- `$bindable()`: Mark a prop as bindable for two-way communication.
- `$inspect(value)`: Debug reactive state in development.
- **Events**: Use modern event attributes (e.g., `onclick`, `onsubmit`, `onchange`) directly on elements.

### Deprecated Svelte Patterns to Avoid

Avoid these deprecated patterns from Svelte 4 and earlier. Use the modern Svelte 5 equivalents instead:

- **State Management**: Never use `let` declarations at the top level for reactivity. Use `$state()` instead.
- **Reactive Statements**: Avoid `$:` for derived state or side effects. Use `$derived()` and `$effect()` instead.
- **Props**: Never use `export let` for component props. Use `$props()` destructuring instead.
- **Event Handlers**: Avoid `on:click={handler}` directives. Use `onclick={handler}` attributes instead.
- **Component Events**: Never use `createEventDispatcher`. Pass callback props instead.
- **Component Instantiation**: Avoid `new Component()`. Use `mount(Component, ...)` instead.
- **Lifecycle Hooks**: Avoid `beforeUpdate`/`afterUpdate`. Use `$effect.pre`/`$effect` instead.
- **Slots**: Avoid `<slot />`. Use `{@render children()}` with snippets instead.
- **Dynamic Components**: Avoid `<svelte:component this={Comp}>`. Use `<Comp />` directly.
- **Legacy Props**: Avoid `$$props` and `$$restProps`. Use destructuring in `$props()` instead.
- **Stores**: Prefer runes over Svelte stores for component-level state.
- **Class Components**: Avoid class-based components. Use function components with runes.

- Use `$app/state` (e.g., `import { page } from '$app/state'`) instead of the deprecated `$app/stores` for accessing `page`, `navigating`, `updated`, etc.

### Data Fetching & Mutations (Remote Functions)

Default to **Remote Functions** for all backend communication with Cinder.

- **Location**: Place remote functions in `src/remote/` with the `.remote.ts` extension.
- **Flavors**:
  - `query`: For reading dynamic data (e.g., crawl status polling). Supports `refresh()`, `loading`, `error`.
  - `form`: For mutations via `<form>` (scrape, crawl start, search). Supports progressive enhancement via `enhance`.
- **Validation**: Always validate inputs using Valibot schemas.
- **Client-side Validation**: Use remote `form`'s built-in `fields` API for validation display.
- **Efficiency**: Use polling with `$effect` for status updates.

### Form Handling

- **DO NOT** use shadcn-svelte Form component
- Use remote `form`'s built-in `fields` API:
  ```svelte
  <input {...fields.url.as('text')} />
  {#each fields.url.issues() as issue}
  	<p>{issue.message}</p>
  {/each}
  ```

### Styling & UI Design

- **Gradients**: NEVER use gradients; prefer solid colors, clean layouts, and professional minimalist aesthetics.
- **Tailwind v4**: Use semantic tokens from the CSS configuration in `src/routes/layout.css`. Avoid hardcoded HSL/Hex strings in components.
- **Responsive**: Use standard Tailwind responsive prefixes (e.g., `lg:flex-row`).
- **Utility**: Use a `cn` utility (clsx + tailwind-merge) for conditional class merging.

## Key Files & Directories Pattern

- `src/remote/`: Remote Functions for Cinder backend API calls.
- `src/lib/components/ui/`: shadcn-svelte / Bits UI primitive components.
- `src/lib/components/blocks/`: Custom components and blocks.
- `src/routes/`: Router logic. Use Remote Functions for data fetching.
- `static/`: Static assets.
- `frontend_plan/`: Project planning and documentation.

## Common Workflows

- **Development**: `bun run dev`
- **Type Checking**: `bun run check`
- **Building**: `bun run build`
- **Formatting**: `bun run format`

## Code Examples

### Scrape Form

```svelte
<script>
	import { scrapeUrl } from '$remote/cinder.remote';
	let form = scrapeUrl();
</script>

<form method="POST" use:form.enhance>
	<input {...form.fields.url.as('text')} placeholder="https://example.com" />
	{#each form.fields.url.issues() as issue}
		<p class="text-red-500">{issue.message}</p>
	{/each}
	<button type="submit">Scrape</button>
</form>

{#if form.result}
	<pre>{JSON.stringify(form.result, null, 2)}</pre>
{/if}
```

### Crawl with Polling

```svelte
<script>
	import { crawlUrl, getCrawlStatus } from '$remote/cinder.remote';
	let crawlForm = crawlUrl();
	let statusQuery = getCrawlStatus();

	$effect(() => {
		if (crawlForm.result?.id) {
			// Poll status every 2 seconds
			const interval = setInterval(() => {
				statusQuery.refetch(crawlForm.result.id);
			}, 2000);
			return () => clearInterval(interval);
		}
	});
</script>
```

### Runes Usage

```svelte
<script>
	let url = $state('');
	let isValid = $derived(url.startsWith('http'));
	let scrapeCount = $state(0);

	$effect(() => {
		if (isValid) {
			console.log('Valid URL entered');
		}
	});
</script>
```

## File References

- `frontend_plan/ARCHITECTURE.md`: Technical design and data flow
- `frontend_plan/FEATURES.md`: Detailed feature specifications
- `src/remote/cinder.remote.ts`: All backend API integrations
- `src/routes/layout.css`: Tailwind v4 theme configuration
- `components.json`: shadcn-svelte configuration

## AI Agent Integration

- **Documentation**: Use `mcp_svelte_get-documentation` for the latest Svelte 5/Kit logic and `mcp_svelte_svelte-autofixer` to validate components before finalizing.

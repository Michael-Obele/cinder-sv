import * as v from 'valibot';
import { query, form, getRequestEvent } from '$app/server';
import { PRIVATE_CINDER_BACKEND_URL, PRIVATE_CINDER_API_KEY } from '$env/static/private';
import { env } from '$env/dynamic/private';
import { error } from '@sveltejs/kit';
import { dailySearchLimiter } from '$lib/server/rate-limiter';

// --- Auth Helper ---
function isAuthenticated(): boolean {
	const event = getRequestEvent();
	if (!event) return false;
	const password = env.MASTRA_PASSWORD;
	const authCookie = event.cookies.get('mastra_auth');
	return !!(password && authCookie === password);
}

function getClientIP(): string {
	const event = getRequestEvent();
	try {
		return event?.getClientAddress() || 'unknown';
	} catch {
		return 'unknown';
	}
}

// --- Types ---

// Scrape
// Scrape
const ScrapeOptionsSchema = v.object({
	url: v.pipe(v.string(), v.url(), v.nonEmpty('URL is required')),
	mode: v.optional(v.union([v.picklist(['smart', 'static', 'dynamic']), v.string()]), 'smart'),
	render: v.optional(v.union([v.pipe(v.string(), v.transform((v) => v === 'on' || v === 'true'), v.boolean()), v.boolean()]), false)
});

// Crawl
const CrawlOptionsSchema = v.object({
	url: v.pipe(v.string(), v.url(), v.nonEmpty('URL is required')),
	render: v.optional(v.union([v.pipe(v.string(), v.transform((v) => v === 'on' || v === 'true'), v.boolean()), v.boolean()]), false)
});

// Search
const SearchOptionsSchema = v.object({
	query: v.pipe(v.string(), v.nonEmpty('Query is required')),
	mode: v.optional(v.union([v.string()]), 'default'),
	limit: v.optional(v.union([v.pipe(v.string(), v.transform(Number), v.number()), v.number()]), 5),
	offset: v.optional(v.union([v.pipe(v.string(), v.transform(Number), v.number()), v.number()]), 0),
	maxAge: v.optional(v.union([v.pipe(v.string(), v.transform(Number), v.number()), v.number()]), 0),
	// Array handling for hidden inputs 
	includeDomains: v.optional(v.union([v.array(v.string()), v.string()]), []),
	excludeDomains: v.optional(v.union([v.array(v.string()), v.string()]), []),
	requiredText: v.optional(v.union([v.array(v.string()), v.string()]), [])
});

// --- Helper ---

async function fetchCinder(endpoint: string, method: string, body?: any) {
	if (!PRIVATE_CINDER_BACKEND_URL) {
		throw new Error('PRIVATE_CINDER_BACKEND_URL is not set');
	}

	const url = `${PRIVATE_CINDER_BACKEND_URL}${endpoint}`;
	const headers: Record<string, string> = {
		'Content-Type': 'application/json'
	};

	if (PRIVATE_CINDER_API_KEY) {
		headers['Authorization'] = `Bearer ${PRIVATE_CINDER_API_KEY}`;
	}

	try {
		const response = await fetch(url, {
			method,
			headers,
			body: body ? JSON.stringify(body) : undefined
		});

		if (!response.ok) {
			const errorText = await response.text();
			// Parse JSON error body for a clean message, fall back to raw text
			let errorMessage = `API Error: ${response.status} - ${errorText}`;
			try {
				const jsonError = JSON.parse(errorText);
				if (jsonError.error || jsonError.message) {
					errorMessage = jsonError.error || jsonError.message;
				}
			} catch {
				// errorText is not JSON — keep the raw fallback message
			}
			throw new Error(errorMessage);
		}

		return await response.json();
	} catch (err: any) {
		console.error('Cinder API Error:', err);
		throw error(500, err.message || 'Internal Server Error');
	}
}

// --- Remote Functions ---

// 1. Scrape
export const scrapeUrl = form(ScrapeOptionsSchema, async (data) => {
	// Transform valibot output to API expectation if needed
	const result = await fetchCinder('/v1/scrape', 'POST', data);
	return result;
});

// 2. Crawl
export const crawlUrl = form(CrawlOptionsSchema, async (data) => {
	const result = await fetchCinder('/v1/crawl', 'POST', data);
	return result; // Should return { id: "..." }
});

export const getCrawlStatus = query(
	v.string(), // ID
	async (id) => {
		const res = await fetchCinder(`/v1/crawl/${id}`, 'GET');
		// The Go backend (asynq) returns `state` and a serialized `result` string when complete.
		let parsedResult = null;
		if (res && res.result) {
			try {
				parsedResult = JSON.parse(res.result);
			} catch {
				// Result is a plain string message (e.g. "Scraped URL successfully")
				parsedResult = { message: res.result };
			}
		}

		// Determine if crawl internally failed despite state=completed
		const crawlFailed = parsedResult?.status === 'failed' || (parsedResult?.failedUrls?.length > 0 && parsedResult?.total === 0);

		return {
			...res,
			parsedResult,
			crawlFailed,
			failedUrls: parsedResult?.failedUrls || []
		};
	}
);

// 3. Search
export const searchWeb = form(SearchOptionsSchema, async (data) => {
	// Enforce daily search limit (authenticated users bypass)
	if (!isAuthenticated()) {
		try {
			const ip = getClientIP();
			await dailySearchLimiter.consume(ip);
		} catch {
			throw error(429, 'Daily search limit reached. Please try again tomorrow.');
		}
	}

	// Pre-process array fields that might come as comma-separated strings
	const processedData = {
		...data,
		includeDomains: typeof data.includeDomains === 'string' && data.includeDomains ? data.includeDomains.split(',').map(s => s.trim()) : Array.isArray(data.includeDomains) ? data.includeDomains : [],
		excludeDomains: typeof data.excludeDomains === 'string' && data.excludeDomains ? data.excludeDomains.split(',').map(s => s.trim()) : Array.isArray(data.excludeDomains) ? data.excludeDomains : [],
		requiredText: typeof data.requiredText === 'string' && data.requiredText ? data.requiredText.split(',').map(s => s.trim()) : Array.isArray(data.requiredText) ? data.requiredText : [],
	};

	const result = await fetchCinder('/v1/search', 'POST', processedData);
	return result.results;
});

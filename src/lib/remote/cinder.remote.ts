import * as v from 'valibot';
import { query, form } from '$app/server';
import { PRIVATE_CINDER_BACKEND_URL, PRIVATE_CINDER_API_KEY } from '$env/static/private';
import { error } from '@sveltejs/kit';

// --- Types ---

// Scrape
const ScrapeOptionsSchema = v.object({
	url: v.pipe(v.string(), v.url(), v.nonEmpty('URL is required')),
	formats: v.optional(
		v.array(
			v.picklist([
				'markdown',
				'html',
				'rawHtml',
				'links',
				'screenshot',
				'extract',
				'screenshot@fullPage'
			])
		),
		['markdown']
	),
	onlyMainContent: v.optional(v.boolean(), true),
	includeTags: v.optional(v.array(v.string()), []),
	excludeTags: v.optional(v.array(v.string()), []),
	headers: v.optional(v.record(v.string(), v.string()), {}),
	waitFor: v.optional(v.number(), 0),
	mobile: v.optional(v.boolean(), false),
	skipTlsVerification: v.optional(v.boolean(), false),
	timeout: v.optional(v.number(), 30000)
});

// Crawl
const CrawlOptionsSchema = v.object({
	url: v.pipe(v.string(), v.url(), v.nonEmpty('URL is required')),
	limit: v.optional(v.number(), 100),
	maxDepth: v.optional(v.number(), 2),
	scrapeOptions: v.optional(ScrapeOptionsSchema)
});

// Search
const SearchOptionsSchema = v.object({
	query: v.pipe(v.string(), v.nonEmpty('Query is required')),
	limit: v.optional(v.number(), 5)
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
			// Try to parse JSON error if possible
			try {
				const jsonError = JSON.parse(errorText);
				throw new Error(jsonError.error || jsonError.message || `API Error: ${response.status}`);
			} catch (e) {
				throw new Error(`API Error: ${response.status} - ${errorText}`);
			}
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
		const result = await fetchCinder(`/v1/crawl/${id}`, 'GET');
		return result;
	}
);

// 3. Search
export const searchWeb = form(SearchOptionsSchema, async (data) => {
	const result = await fetchCinder('/v1/search', 'POST', data);
	return result.results;
});

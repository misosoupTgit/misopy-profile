import type { ModDownloadStats } from '$lib/modStats';

/** Fresh window: no upstream calls. */
export const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6h
/** Browser cache hint. */
export const BROWSER_MAX_AGE = 60 * 60; // 1h
/** CDN / edge cache hint. */
export const EDGE_S_MAXAGE = 6 * 60 * 60; // 6h
/** Serve stale while revalidating at the edge. */
export const STALE_WHILE_REVALIDATE = 24 * 60 * 60; // 24h

type Entry = {
	data: ModDownloadStats;
	expiresAt: number;
};

let entry: Entry | null = null;
let inflight: Promise<ModDownloadStats> | null = null;
let cachedAuthorId: number | null = null;

export function getCachedAuthorId(): number | null {
	return cachedAuthorId;
}

export function setCachedAuthorId(id: number) {
	cachedAuthorId = id;
}

export function getCachedStats(): ModDownloadStats | null {
	if (!entry) return null;
	if (Date.now() > entry.expiresAt) return null;
	return entry.data;
}

export function setCachedStats(data: ModDownloadStats) {
	entry = { data, expiresAt: Date.now() + CACHE_TTL_MS };
}

/** Deduplicate concurrent refreshes (thundering herd). */
export async function withSingleFlight(load: () => Promise<ModDownloadStats>): Promise<ModDownloadStats> {
	const hit = getCachedStats();
	if (hit) return hit;

	if (inflight) return inflight;

	inflight = (async () => {
		try {
			const data = await load();
			setCachedStats(data);
			return data;
		} finally {
			inflight = null;
		}
	})();

	return inflight;
}

export function cacheControlHeader(): string {
	return `public, max-age=${BROWSER_MAX_AGE}, s-maxage=${EDGE_S_MAXAGE}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}`;
}

import { emptyModDownloadStats, type ModDownloadStats } from '$lib/modStats';

const CACHE_KEY = 'misopy_mod_downloads_v1';
const CLIENT_TTL_MS = 60 * 60 * 1000;

type CachePayload = { at: number; data: ModDownloadStats };

export function readCachedModDownloads(): ModDownloadStats | null {
	try {
		const raw = sessionStorage.getItem(CACHE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw) as CachePayload;
		if (Date.now() - parsed.at < CLIENT_TTL_MS) return parsed.data;
	} catch {
		// ignore
	}
	return null;
}

export function writeCachedModDownloads(data: ModDownloadStats) {
	try {
		sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), data } satisfies CachePayload));
	} catch {
		// ignore
	}
}

export async function fetchModDownloads(): Promise<ModDownloadStats> {
	const res = await fetch('/api/mod-downloads');
	if (!res.ok) throw new Error(String(res.status));
	return (await res.json()) as ModDownloadStats;
}

export function failedModDownloads(): ModDownloadStats {
	return emptyModDownloadStats();
}

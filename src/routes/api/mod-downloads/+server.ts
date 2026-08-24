import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { emptyModDownloadStats, type ModDownloadStats } from '$lib/modStats';
import { getCurseforgeApiKey, getEnv } from '$lib/server/secrets';
import {
	cacheControlHeader,
	getCachedAuthorId,
	setCachedAuthorId,
	withSingleFlight
} from '$lib/server/modDownloadsCache';

export const prerender = false;

const MINECRAFT_GAME_ID = 432;
const CF_PAGE_SIZE = 50;

type ModrinthProject = { downloads: number };
type CfAuthor = { id: number; name: string };
type CfMod = { id: number; downloadCount: number; authors?: CfAuthor[] };
type CfSearchResponse = {
	data: CfMod[];
	pagination: { index: number; pageSize: number; resultCount: number; totalCount: number };
};

async function fetchModrinthTotal(username: string): Promise<{ total: number; projects: number }> {
	const res = await fetch(`https://api.modrinth.com/v2/user/${encodeURIComponent(username)}/projects`, {
		headers: { 'User-Agent': 'misopy-profile/1.0 (portfolio)' }
	});
	if (!res.ok) throw new Error(`Modrinth HTTP ${res.status}`);
	const projects = (await res.json()) as ModrinthProject[];
	const total = projects.reduce((sum, p) => sum + (p.downloads ?? 0), 0);
	return { total, projects: projects.length };
}

async function curseforgeSearch(
	apiKey: string,
	params: Record<string, string>
): Promise<CfSearchResponse> {
	const url = new URL('https://api.curseforge.com/v1/mods/search');
	url.searchParams.set('gameId', String(MINECRAFT_GAME_ID));
	for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

	const res = await fetch(url, {
		headers: {
			Accept: 'application/json',
			'x-api-key': apiKey
		}
	});
	if (!res.ok) throw new Error(`CurseForge HTTP ${res.status}`);
	return (await res.json()) as CfSearchResponse;
}

async function resolveCurseforgeAuthorId(
	apiKey: string,
	authorName: string,
	configuredId?: string
): Promise<number | null> {
	if (configuredId && /^\d+$/.test(configuredId)) return Number(configuredId);

	const memo = getCachedAuthorId();
	if (memo != null) return memo;

	const probe = await curseforgeSearch(apiKey, {
		searchFilter: authorName,
		pageSize: '50',
		index: '0'
	});

	const needle = authorName.toLowerCase();
	for (const mod of probe.data ?? []) {
		const match = mod.authors?.find((a) => a.name.toLowerCase() === needle);
		if (match) {
			setCachedAuthorId(match.id);
			return match.id;
		}
	}
	return null;
}

async function fetchCurseforgeTotal(
	apiKey: string,
	authorId: number
): Promise<{ total: number; projects: number }> {
	let index = 0;
	let total = 0;
	let projects = 0;
	let totalCount = Infinity;

	while (index < totalCount) {
		const page = await curseforgeSearch(apiKey, {
			primaryAuthorId: String(authorId),
			pageSize: String(CF_PAGE_SIZE),
			index: String(index)
		});

		const rows = page.data ?? [];
		projects += rows.length;
		total += rows.reduce((sum, m) => sum + (m.downloadCount ?? 0), 0);

		totalCount = page.pagination?.totalCount ?? rows.length;
		index += CF_PAGE_SIZE;
		if (rows.length === 0) break;
	}

	return { total, projects };
}

async function loadStats(): Promise<ModDownloadStats> {
	const modrinthUser = getEnv('MODRINTH_USERNAME', 'MisoPy');
	const cfKey = getCurseforgeApiKey();
	const cfAuthorName = getEnv('CURSEFORGE_AUTHOR_NAME', 'MisoPy');
	const cfAuthorIdEnv = getEnv('CURSEFORGE_AUTHOR_ID', '');

	const result = emptyModDownloadStats();
	const errors: string[] = [];

	try {
		const mr = await fetchModrinthTotal(modrinthUser);
		result.modrinth = mr.total;
		result.modrinthProjects = mr.projects;
	} catch (e) {
		errors.push(e instanceof Error ? e.message : 'Modrinth failed');
	}

	if (cfKey) {
		try {
			const authorId = await resolveCurseforgeAuthorId(cfKey, cfAuthorName, cfAuthorIdEnv);
			if (authorId == null) {
				errors.push('CurseForge author not found');
			} else {
				const cf = await fetchCurseforgeTotal(cfKey, authorId);
				result.curseforge = cf.total;
				result.curseforgeProjects = cf.projects;
			}
		} catch (e) {
			errors.push(e instanceof Error ? e.message : 'CurseForge failed');
		}
	}

	const parts = [result.modrinth, result.curseforge].filter((n): n is number => n != null);
	result.total = parts.length ? parts.reduce((a, b) => a + b, 0) : null;
	if (errors.length) result.error = errors.join('; ');

	return result;
}

export const GET: RequestHandler = async () => {
	const result = await withSingleFlight(loadStats);

	return json(result, {
		headers: {
			'Cache-Control': cacheControlHeader()
		}
	});
};

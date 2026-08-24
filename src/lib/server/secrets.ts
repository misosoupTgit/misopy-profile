import { env } from '$env/dynamic/private';

/**
 * Reads private env from the SvelteKit / platform environment.
 * On Cloudflare Pages, set these in project Variables and secrets.
 * Locally, values come from `.env` (loaded without `$` expansion in vite.config.ts).
 */
export function getEnv(name: string, fallback = ''): string {
	const value = (env as Record<string, string | undefined>)[name]?.trim();
	return value || fallback;
}

export function getCurseforgeApiKey(): string {
	return getEnv('CURSEFORGE_API_KEY');
}

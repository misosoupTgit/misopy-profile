import { env } from '$env/dynamic/private';

type EnvBag = Record<string, unknown> | undefined;

function asString(value: unknown): string {
	return typeof value === 'string' ? value.trim() : '';
}

/**
 * Prefer per-request `platform.env` (Cloudflare Pages / Workers bindings),
 * then fall back to SvelteKit `$env/dynamic/private` (local Vite).
 */
export function getEnv(name: string, platformEnv?: EnvBag, fallback = ''): string {
	return asString(platformEnv?.[name]) || asString(env[name as keyof typeof env]) || fallback;
}

/** Decode base64 without Node Buffer (Workers-safe). */
function decodeBase64(value: string): string {
	try {
		return atob(value.trim());
	} catch {
		return '';
	}
}

/**
 * CurseForge keys contain `$` (bcrypt-like). Prefer `CURSEFORGE_API_KEY_B64` on Cloudflare
 * if the plain secret gets mangled or dropped; otherwise use `CURSEFORGE_API_KEY`.
 */
export function getCurseforgeApiKey(platformEnv?: EnvBag): string {
	const b64 = getEnv('CURSEFORGE_API_KEY_B64', platformEnv);
	if (b64) {
		const decoded = decodeBase64(b64).trim();
		if (decoded) return decoded;
	}
	return getEnv('CURSEFORGE_API_KEY', platformEnv);
}

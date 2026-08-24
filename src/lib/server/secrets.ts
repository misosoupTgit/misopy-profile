import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'dotenv';
import { env } from '$env/dynamic/private';

/**
 * CurseForge keys contain `$` (bcrypt-like). Vite's dotenv-expand mangles them.
 * Locally: read `.env` with `dotenv.parse` (no expansion).
 * On Cloudflare: use platform env (no expansion).
 */
function readLocalEnv(): Record<string, string> | null {
	try {
		const file = resolve(process.cwd(), '.env');
		if (!existsSync(file)) return null;
		return parse(readFileSync(file, 'utf8'));
	} catch {
		// Workers have no readable .env on disk
		return null;
	}
}

export function getEnv(name: string, fallback = ''): string {
	const fromFile = readLocalEnv()?.[name]?.trim();
	if (fromFile) return fromFile;
	const fromPlatform = (env as Record<string, string | undefined>)[name]?.trim();
	return fromPlatform || fallback;
}

export function getCurseforgeApiKey(): string {
	return getEnv('CURSEFORGE_API_KEY');
}

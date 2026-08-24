import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { parse } from 'dotenv';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, type Plugin } from 'vite';

/**
 * CurseForge API keys look like bcrypt hashes (`$2a$10$…`).
 * Vite's default dotenv-expand mangles `$…` sequences; re-apply .env without expansion.
 */
function injectEnvWithoutExpand() {
	const file = resolve(process.cwd(), '.env');
	if (!existsSync(file)) return;
	const parsed = parse(readFileSync(file, 'utf8'));
	for (const [key, value] of Object.entries(parsed)) {
		if (value !== undefined) process.env[key] = value;
	}
}

function envNoExpandPlugin(): Plugin {
	return {
		name: 'env-no-expand',
		config() {
			injectEnvWithoutExpand();
		},
		configResolved() {
			injectEnvWithoutExpand();
		}
	};
}

injectEnvWithoutExpand();

export default defineConfig({
	plugins: [envNoExpandPlugin(), sveltekit()]
});

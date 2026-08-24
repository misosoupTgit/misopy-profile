/// <reference types="@sveltejs/kit" />
/// <reference types="@sveltejs/adapter-cloudflare" />

declare global {
	namespace App {
		interface Platform {
			env: {
				ASSETS: { fetch: typeof fetch };
				CURSEFORGE_API_KEY?: string;
				CURSEFORGE_API_KEY_B64?: string;
				CURSEFORGE_AUTHOR_NAME?: string;
				CURSEFORGE_AUTHOR_ID?: string;
				MODRINTH_USERNAME?: string;
				[key: string]: unknown;
			};
			ctx: ExecutionContext;
			context: ExecutionContext;
			caches: CacheStorage;
			cf?: IncomingRequestCfProperties;
		}
	}
}

export {};

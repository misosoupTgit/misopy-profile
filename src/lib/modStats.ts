export interface ModDownloadStats {
	modrinth: number | null;
	curseforge: number | null;
	total: number | null;
	modrinthProjects: number;
	curseforgeProjects: number;
	error?: string;
}

export function emptyModDownloadStats(): ModDownloadStats {
	return {
		modrinth: null,
		curseforge: null,
		total: null,
		modrinthProjects: 0,
		curseforgeProjects: 0
	};
}

export function formatDownloads(n: number | null | undefined): string {
	if (n == null || Number.isNaN(n)) return '—';
	return new Intl.NumberFormat('en-US').format(n);
}

/** Resolve WebP + raster fallback paths from a JSON image field. */
export function resolveImageSources(image: string): { webp: string | null; fallback: string } {
	const trimmed = image.trim();
	const webpMatch = trimmed.match(/^(.*)\.webp$/i);
	if (webpMatch) {
		// Prefer WebP; keep same path as <img> fallback (universal WebP support).
		return { webp: trimmed, fallback: trimmed };
	}

	const rasterMatch = trimmed.match(/^(.*)\.(png|jpe?g|gif)$/i);
	if (rasterMatch) {
		return {
			webp: `${rasterMatch[1]}.webp`,
			fallback: trimmed
		};
	}

	return {
		webp: `${trimmed}.webp`,
		fallback: `${trimmed}.png`
	};
}

/** Best URL to open in lightbox for a given image field. */
export function preferredImageSrc(image: string): string {
	const { webp, fallback } = resolveImageSources(image);
	return webp ?? fallback;
}

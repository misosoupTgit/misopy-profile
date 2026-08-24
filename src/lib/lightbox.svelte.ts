let src = $state('');
let visible = $state(false);
let open = $state(false);

export function lightboxSrc() {
	return src;
}

export function lightboxVisible() {
	return visible;
}

export function lightboxOpen() {
	return open;
}

export function openLightbox(nextSrc: string) {
	src = nextSrc;
	visible = true;
	requestAnimationFrame(() => {
		open = true;
	});
}

export function closeLightbox() {
	open = false;
	setTimeout(() => {
		visible = false;
		src = '';
	}, 300);
}

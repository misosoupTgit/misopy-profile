<script lang="ts">
	import {
		lightboxSrc,
		lightboxVisible,
		lightboxOpen,
		closeLightbox
	} from '$lib/lightbox.svelte';
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
<div
	id="image-modal"
	class="lightbox"
	class:is-visible={lightboxVisible()}
	class:is-open={lightboxOpen()}
	onclick={closeLightbox}
>
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<img
		id="modal-image"
		src={lightboxSrc()}
		alt=""
		onclick={(e) => e.stopPropagation()}
	/>
	<button type="button" class="lightbox__close" aria-label="Close" onclick={closeLightbox}>
		<svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M6 18L18 6M6 6l12 12"
			></path>
		</svg>
	</button>
</div>

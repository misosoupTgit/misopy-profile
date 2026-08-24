<script lang="ts">
	import { resolveImageSources } from '$lib/image';

	interface Props {
		src: string;
		alt: string;
		onclick?: (e: MouseEvent) => void;
		onfail?: () => void;
	}

	let { src, alt, onclick, onfail }: Props = $props();

	const sources = $derived(resolveImageSources(src));
	let failed = $state(false);

	function handleError() {
		if (failed) return;
		failed = true;
		onfail?.();
	}
</script>

{#if !failed}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
	<picture>
		{#if sources.webp}
			<source srcset={sources.webp} type="image/webp" />
		{/if}
		<img src={sources.fallback} {alt} {onclick} onerror={handleError} />
	</picture>
{/if}

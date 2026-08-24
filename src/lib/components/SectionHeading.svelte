<script lang="ts">
	import PureText from './PureText.svelte';

	interface Props {
		eyebrow: string;
		title: string;
	}

	let { eyebrow, title }: Props = $props();
</script>

<div class="section__head">
	<p class="eyebrow">{eyebrow}</p>
	<PureText text={title} class="section__title" tag="h2" />
</div>

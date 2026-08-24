<script lang="ts">
	interface Props {
		text: string;
		class?: string;
		href?: string;
		title?: string;
		tag?: 'span' | 'a' | 'h1' | 'h2' | 'h3';
	}

	let {
		text,
		class: className = '',
		href,
		title,
		tag = 'span'
	}: Props = $props();

	const element = $derived(tag === 'a' && href ? 'a' : tag === 'a' ? 'span' : tag);
</script>

<svelte:element
	this={element}
	href={element === 'a' ? href : undefined}
	class="notranslate pure-text {className}"
	translate="no"
	data-text={text}
	aria-label={text}
	{title}
></svelte:element>

<script lang="ts">
	import { i18n } from '$lib/i18n/index.svelte';
	import { links } from '$lib/data/site';
	import type { TranslationKey } from '$lib/i18n/translations';

	interface Props {
		discordKey?: TranslationKey;
		/** Hero aligns the dropdown to the left edge of the trigger. */
		menuAlign?: 'start' | 'end';
	}

	let { discordKey = 'contact.discorddm', menuAlign = 'end' }: Props = $props();
</script>

<div class="contact-wrap">
	<button type="button" class="btn btn--solid">
		<span>{i18n.t('contact.btn')}</span>
	</button>
	<div class="contact-menu" style={menuAlign === 'start' ? 'left:0;right:auto;' : undefined}>
		<a href={links.x} target="_blank" rel="noopener noreferrer"
			><span>{i18n.t('contact.xdm')}</span></a
		>
		<button type="button" onclick={() => i18n.copyDiscord()}
			><span>{i18n.t(discordKey)}</span></button
		>
		<button type="button" onclick={() => i18n.copyEmail()}
			><span>{i18n.t('contact.email')}</span></button
		>
	</div>
</div>

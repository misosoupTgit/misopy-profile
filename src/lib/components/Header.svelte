<script lang="ts">
	import PureText from './PureText.svelte';
	import ContactMenu from './ContactMenu.svelte';
	import { i18n } from '$lib/i18n/index.svelte';
	import { navLinks } from '$lib/data/site';

	interface Props {
		onOpenCmdk: () => void;
		cmdkKbd: string;
	}

	let { onOpenCmdk, cmdkKbd }: Props = $props();
</script>

<header class="site-header">
	<div class="site-header__inner">
		<PureText text="MisoPy." class="wordmark" href="#" tag="a" />

		<ul class="nav-links">
			{#each navLinks as link}
				<li><PureText text={link.label} href={link.href} tag="a" /></li>
			{/each}
		</ul>

		<div class="header-actions">
			<button type="button" class="cmdk-trigger" aria-label="Open command palette" onclick={onOpenCmdk}>
				<span>Go</span>
				<kbd>{cmdkKbd}</kbd>
			</button>
			<button type="button" class="lang-btn" onclick={() => i18n.toggle()}>{i18n.label}</button>
			<ContactMenu />
		</div>
	</div>
</header>

<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import BuiltWith from '$lib/components/BuiltWith.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Cmdk from '$lib/components/Cmdk.svelte';
	import Lightbox from '$lib/components/Lightbox.svelte';
	import { onMount } from 'svelte';

	let cmdkOpen = $state(false);
	let cmdkKbd = $state('⌘K');

	function isMacPlatform() {
		return /Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent || '');
	}

	function openCmdk() {
		cmdkOpen = true;
	}

	function closeCmdk() {
		cmdkOpen = false;
	}

	onMount(() => {
		cmdkKbd = isMacPlatform() ? '⌘K' : 'Ctrl K';

		function onKeydown(e: KeyboardEvent) {
			const metaK = (e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K');
			if (metaK) {
				e.preventDefault();
				cmdkOpen = !cmdkOpen;
				return;
			}
			if (e.key === 'Escape' && cmdkOpen) {
				closeCmdk();
			}
		}

		document.addEventListener('keydown', onKeydown);
		return () => document.removeEventListener('keydown', onKeydown);
	});
</script>

<Header onOpenCmdk={openCmdk} {cmdkKbd} />

<main>
	<Hero />
	<About />
	<Skills />
	<Projects />
	<BuiltWith />
</main>

<Footer />
<Cmdk open={cmdkOpen} onClose={closeCmdk} />
<Lightbox />

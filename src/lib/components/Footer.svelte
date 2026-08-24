<script lang="ts">
	import PureText from './PureText.svelte';
	import { i18n } from '$lib/i18n/index.svelte';
	import { abacus, links } from '$lib/data/site';
	import { onMount } from 'svelte';

	let visitorCount = $state('...');
	const year = new Date().getFullYear();

	onMount(async () => {
		const LOCKOUT_MS = 24 * 60 * 60 * 1000;
		const now = Date.now();

		try {
			const lastVisit = localStorage.getItem('misopy_last_visit');
			let url: string = abacus.get;
			let shouldIncrement = false;

			if (!lastVisit || now - parseInt(lastVisit, 10) > LOCKOUT_MS) {
				shouldIncrement = true;
				url = abacus.hit;
			}

			const response = await fetch(url);
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

			const data = await response.json();
			if (data && typeof data.value !== 'undefined') {
				visitorCount = String(data.value);
				if (shouldIncrement) {
					localStorage.setItem('misopy_last_visit', now.toString());
				}
			} else {
				throw new Error('Invalid API response structure');
			}
		} catch (error) {
			console.warn('Visitor counter failed:', error);
			visitorCount = '---';
			try {
				const fallbackResponse = await fetch(abacus.get);
				const fallbackData = await fallbackResponse.json();
				if (fallbackData && typeof fallbackData.value !== 'undefined') {
					visitorCount = String(fallbackData.value);
				}
			} catch {
				// ignore
			}
		}
	});
</script>

<footer class="site-footer">
	<div class="shell site-footer__inner">
		<p>
			&copy; {year}
			<PureText text="MisoPy" />. All rights reserved.
			<span class="visitors">
				· <span>{i18n.t('footer.visits')}</span>:
				<span id="visitor-count">{visitorCount}</span>
			</span>
		</p>
		<div class="site-footer__links">
			<!-- svelte-ignore a11y_invalid_attribute -->
			<a href="#">{i18n.t('footer.privacy')}</a>
			<a href={links.github} target="_blank" rel="noopener noreferrer">GitHub</a>
			<a href={links.x} target="_blank" rel="noopener noreferrer">@wkshy_</a>
		</div>
	</div>
</footer>

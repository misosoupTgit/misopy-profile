<script lang="ts">
	import SectionHeading from './SectionHeading.svelte';
	import { i18n } from '$lib/i18n/index.svelte';
</script>

<section id="about" class="section">
	<div class="shell split">
		<SectionHeading eyebrow="01 / about" title="About" />
		<div class="prose">
			<p>{i18n.t('about.p1')}</p>
			<p>{i18n.t('about.p2')}</p>
		</div>
	</div>
</section>

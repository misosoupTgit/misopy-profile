<script lang="ts">
	import SectionHeading from './SectionHeading.svelte';
	import { i18n } from '$lib/i18n/index.svelte';
	import { builtStack } from '$lib/data/builtStack';
</script>

<section id="built-with" class="section">
	<div class="shell split">
		<SectionHeading eyebrow="04 / built with" title="Built with" />
		<div class="prose">
			<p>{i18n.t('built.p1')}</p>
			<p>{i18n.t('built.p2')}</p>
			<ul class="built-stack">
				{#each builtStack as item}
					<li>
						<span class="built-stack__name">
							<svg class="built-stack__icon" viewBox="0 0 24 24" aria-hidden="true">
								<path fill="currentColor" d={item.path} />
							</svg>
							{item.label}
						</span>
						<span class="tag">{item.tag}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

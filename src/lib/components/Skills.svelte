<script lang="ts">
	import SectionHeading from './SectionHeading.svelte';
	import { i18n } from '$lib/i18n/index.svelte';
	import { skillBlocks } from '$lib/data/skills';
</script>

<section id="skills" class="section section--graphite">
	<div class="shell split">
		<SectionHeading eyebrow="02 / skills" title="Skills" />
		<div>
			{#each skillBlocks as block}
				<div class="skill-block">
					<h3>{i18n.t(block.titleKey)}</h3>
					<ul class="skill-list">
						{#each block.items as item}
							<li>
								<span>{'label' in item ? item.label : i18n.t(item.labelKey)}</span>
								<span class="tag">{item.tag}</span>
							</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>
</section>

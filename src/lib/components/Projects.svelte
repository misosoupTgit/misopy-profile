<script lang="ts">
	import PureText from './PureText.svelte';
	import SectionHeading from './SectionHeading.svelte';
	import { i18n } from '$lib/i18n/index.svelte';
	import { openLightbox } from '$lib/lightbox.svelte';
	import { preferredImageSrc } from '$lib/image';
	import SmartImage from './SmartImage.svelte';
	import projects from '$lib/data/projects.json';

	let failed = $state<Record<string, boolean>>({});

	function noImageHtml(image: string) {
		const path = image.replace(/^\//, '');
		const label = i18n.lang === 'ja' ? '[画像未配置]' : '[No Image]';
		return `${label}<br>${path}<br>(800x500)`;
	}
</script>

<section id="projects" class="section">
	<div class="shell">
		<SectionHeading eyebrow="03 / projects" title="Projects" />

		<div class="project-stack">
			{#each projects as project (project.id)}
				<article class="project">
					<div class="project__media">
						{#if !failed[project.id]}
							<SmartImage
								src={project.image}
								alt={project.title}
								onclick={() => openLightbox(preferredImageSrc(project.image))}
								onfail={() => (failed[project.id] = true)}
							/>
						{/if}
						<span
							class="no-image"
							style:display={failed[project.id] ? 'flex' : 'none'}
							>{@html noImageHtml(project.image)}</span
						>
					</div>
					<div class="project__body">
						<PureText text={project.title} tag="h3" title={project.title} />
						<p>{project.desc[i18n.lang]}</p>
						<div class="tags">
							{#each project.tags as tag}
								<span>{tag}</span>
							{/each}
						</div>
						{#if project.github}
							<a
								href={project.github}
								target="_blank"
								rel="noopener noreferrer"
								class="project__link"
							>
								<span>{@html i18n.t('projects.github_btn')}</span>
							</a>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

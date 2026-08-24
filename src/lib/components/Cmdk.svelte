<script lang="ts">
	import { i18n } from '$lib/i18n/index.svelte';
	import { cmdkNavLinks, links } from '$lib/data/site';

	interface CmdItem {
		group: string;
		label: string;
		run: () => void;
	}

	interface Props {
		open: boolean;
		onClose: () => void;
	}

	let { open, onClose }: Props = $props();

	const items: CmdItem[] = [
		...cmdkNavLinks.map((link) => ({
			group: 'Navigate',
			label: link.label,
			run: () => {
				location.hash = link.href;
			}
		})),
		{ group: 'Actions', label: 'Toggle language', run: () => i18n.toggle() },
		{ group: 'Actions', label: 'Copy Discord ID', run: () => i18n.copyDiscord() },
		{ group: 'Actions', label: 'Copy Email', run: () => i18n.copyEmail() },
		{
			group: 'Links',
			label: 'GitHub',
			run: () => window.open(links.github, '_blank', 'noopener')
		},
		{
			group: 'Links',
			label: 'X / @wkshy_',
			run: () => window.open(links.x, '_blank', 'noopener')
		}
	];

	let query = $state('');
	let index = $state(0);
	let inputEl: HTMLInputElement | undefined = $state();

	const filtered = $derived(
		!query.trim()
			? items
			: items.filter(
					(item) =>
						item.label.toLowerCase().includes(query.trim().toLowerCase()) ||
						item.group.toLowerCase().includes(query.trim().toLowerCase())
				)
	);

	const groups = $derived.by(() => {
		const result: { group: string; items: { item: CmdItem; globalIndex: number }[] }[] = [];
		let last = '';
		filtered.forEach((item, i) => {
			if (item.group !== last) {
				last = item.group;
				result.push({ group: item.group, items: [] });
			}
			result[result.length - 1].items.push({ item, globalIndex: i });
		});
		return result;
	});

	$effect(() => {
		if (open) {
			query = '';
			index = 0;
			document.body.classList.add('is-locked');
			queueMicrotask(() => inputEl?.focus());
		} else {
			document.body.classList.remove('is-locked');
		}
	});

	function select(i: number) {
		const item = filtered[i];
		if (!item) return;
		onClose();
		item.run();
	}

	function onInputKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowDown') {
			e.preventDefault();
			index = Math.min(index + 1, Math.max(filtered.length - 1, 0));
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			index = Math.max(index - 1, 0);
		} else if (e.key === 'Enter') {
			e.preventDefault();
			select(index);
		} else if (e.key === 'Escape') {
			e.preventDefault();
			onClose();
		}
	}
</script>

<div id="cmdk" class="cmdk" class:is-open={open} aria-hidden={!open}>
	<div class="cmdk__backdrop" onclick={onClose} role="presentation"></div>
	<div class="cmdk__panel" role="dialog" aria-modal="true" aria-label="Command palette">
		<div class="cmdk__field">
			<input
				bind:this={inputEl}
				class="cmdk__input"
				type="text"
				placeholder="Jump to…"
				autocomplete="off"
				bind:value={query}
				oninput={() => (index = 0)}
				onkeydown={onInputKeydown}
			/>
			<kbd>esc</kbd>
		</div>
		<div class="cmdk__results">
			{#each groups as g}
				<p class="cmdk__group">{g.group}</p>
				{#each g.items as { item, globalIndex }}
					<button
						type="button"
						class="cmdk__item"
						class:is-active={globalIndex === index}
						onclick={() => select(globalIndex)}
					>
						{item.label}
					</button>
				{/each}
			{/each}
		</div>
		<div class="cmdk__foot">
			<span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
			<span><kbd>↵</kbd> open</span>
			<span><kbd>esc</kbd> close</span>
		</div>
	</div>
</div>

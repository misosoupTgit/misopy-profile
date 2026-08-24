<script lang="ts">
	import PureText from './PureText.svelte';
	import ContactMenu from './ContactMenu.svelte';
	import { i18n } from '$lib/i18n/index.svelte';
	import { formatDownloads, type ModDownloadStats } from '$lib/modStats';
	import {
		birthdayEnd,
		birthdayStart,
		computeAge,
		formatCountdown,
		isBirthdayToday
	} from '$lib/birthday';
	import {
		failedModDownloads,
		fetchModDownloads,
		readCachedModDownloads,
		writeCachedModDownloads
	} from '$lib/modDownloadsClient';
	import { links } from '$lib/data/site';
	import { onMount } from 'svelte';

	let flipped = $state(false);
	let age = $state(14);
	let consoleAge = $state(14);
	let isBirthday = $state(false);
	let countdown = $state('...');
	let img1Failed = $state(false);
	let img2Failed = $state(false);
	let raf = 0;
	let birthdayAnimStarted = false;
	let downloads = $state<ModDownloadStats | null>(null);

	function toggleProfileIcon() {
		flipped = !flipped;
		const favicon = document.getElementById('favicon') as HTMLLinkElement | null;
		if (favicon) {
			favicon.href = flipped ? '/images/icon2.png' : '/images/icon1.png';
		}
	}

	function runBirthdayConsoleIncrement(from: number, to: number) {
		if (from >= to) {
			consoleAge = to;
			return;
		}
		consoleAge = from;
		const step = () => {
			if (consoleAge < to) {
				consoleAge += 1;
				setTimeout(step, 600);
			}
		};
		setTimeout(step, 800);
	}

	function updateTimer() {
		const now = new Date();
		const currentYear = now.getFullYear();
		age = computeAge(now);

		let nextStart = birthdayStart(currentYear);
		let nextEnd = birthdayEnd(currentYear);

		if (now.getTime() > nextEnd.getTime()) {
			nextStart = birthdayStart(currentYear + 1);
			nextEnd = birthdayEnd(currentYear + 1);
		}

		if (isBirthdayToday(now)) {
			isBirthday = true;
			countdown = '🎉 Happy Birthday! 🎉';
			if (!birthdayAnimStarted) {
				birthdayAnimStarted = true;
				runBirthdayConsoleIncrement(age - 1, age);
			}
			raf = requestAnimationFrame(updateTimer);
			return;
		}

		isBirthday = false;
		birthdayAnimStarted = false;
		consoleAge = age;

		countdown = formatCountdown(nextStart.getTime() - now.getTime());
		raf = requestAnimationFrame(updateTimer);
	}

	onMount(() => {
		updateTimer();

		const cached = readCachedModDownloads();
		if (cached) {
			downloads = cached;
			return () => cancelAnimationFrame(raf);
		}

		fetchModDownloads()
			.then((data) => {
				downloads = data;
				writeCachedModDownloads(data);
			})
			.catch(() => {
				downloads = failedModDownloads();
			});

		return () => cancelAnimationFrame(raf);
	});
</script>

<section class="hero section--flush">
	<div class="shell split">
		<div>
			<div class="hero__identity">
				<div
					class="flip-container"
					class:flipped
					onclick={toggleProfileIcon}
					onkeydown={(e) => e.key === 'Enter' && toggleProfileIcon()}
					role="button"
					tabindex="0"
					title="Click to flip!"
				>
					<div class="flip-inner">
						<div class="flip-front">
							{#if !img1Failed}
								<img
									src="/images/icon1.png"
									alt="Profile 1"
									onerror={() => (img1Failed = true)}
								/>
							{/if}
							<span class="no-image" style:display={img1Failed ? 'flex' : 'none'}
								>{@html i18n.t('hero.no_image1')}</span
							>
						</div>
						<div class="flip-back">
							{#if !img2Failed}
								<img
									src="/images/icon2.png"
									alt="Profile 2"
									onerror={() => (img2Failed = true)}
								/>
							{/if}
							<span class="no-image" style:display={img2Failed ? 'flex' : 'none'}
								>{@html i18n.t('hero.no_image2')}</span
							>
						</div>
					</div>
				</div>
				<div>
					<p class="eyebrow">portfolio / systems</p>
					<PureText text="MisoPy" class="hero__title" tag="h1" />
				</div>
			</div>
			<p class="hero__subtitle">{i18n.t('hero.subtitle')}</p>

			<div class="dl-stat" aria-label={i18n.t('hero.downloads.label')}>
				<p class="dl-stat__label">{i18n.t('hero.downloads.label')}</p>
				<p class="dl-stat__total">{formatDownloads(downloads?.total)}</p>
				<p class="dl-stat__via">{i18n.t('hero.downloads.via')}</p>
				<div class="dl-stat__links">
					<a href={links.curseforge} target="_blank" rel="noopener noreferrer">CurseForge</a>
					<span class="dl-stat__sep" aria-hidden="true">·</span>
					<a href={links.modrinth} target="_blank" rel="noopener noreferrer">Modrinth</a>
				</div>
			</div>

			<p class="hero__desc">{i18n.t('hero.desc')}</p>
			<div class="hero__actions">
				<ContactMenu discordKey="contact.discorddm.hero" menuAlign="start" />
				<a
					href={links.github}
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn--ghost"><span>{i18n.t('hero.github')}</span></a
				>
				<a
					href={links.x}
					target="_blank"
					rel="noopener noreferrer"
					class="btn btn--ghost"><span>{i18n.t('hero.x')}</span></a
				>
				<button type="button" onclick={() => i18n.copyDiscord()} class="btn btn--ghost"
					><span>{i18n.t('hero.discord')}</span></button
				>
			</div>
		</div>

		<aside class="hero__panel" aria-label="Runtime status">
			<div class="hero__panel-meta">
				<span>main.rs</span>
				<span class="hero__panel-chip">{isBirthday ? 'bday' : 'ok'}</span>
			</div>
			<code class="rust-src">
				<span class="tok-kw">fn</span> <span class="tok-fn">main</span>() {'{'}<br />
				&nbsp;&nbsp;<span class="tok-kw">let</span> <span class="tok-kw">mut</span> age: <span class="tok-type">u32</span> = <span
					id="dynamic-age"
					class="tok-num">{isBirthday ? age - 1 : age}</span
				>;<br />
				{#if isBirthday}
					&nbsp;&nbsp;age += <span class="tok-num">1</span>;<br />
				{/if}
				&nbsp;&nbsp;<span class="tok-macro">println!</span>(<span class="tok-str">"{'{'}age{'}'}"</span>);<br />
				{'}'}
			</code>
			<div class="rust-console" aria-label="Console output">
				<div class="rust-console__bar">Console</div>
				<pre class="rust-console__out"><span class="tok-muted">$ cargo run</span>
<span class="rust-console__age">{consoleAge}</span></pre>
			</div>
			<div class="hero__countdown">
				<span>{i18n.t('hero.countdown')}</span>
				<strong id="birthday-countdown">{countdown}</strong>
			</div>
		</aside>
	</div>
</section>

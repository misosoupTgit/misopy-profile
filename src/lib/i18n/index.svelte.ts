import { translations, type Lang, type TranslationKey } from './translations';
import { contact } from '$lib/data/site';

class I18n {
	lang = $state<Lang>('en');

	t(key: TranslationKey): string {
		return translations[this.lang][key] ?? key;
	}

	get label(): string {
		return this.lang === 'en' ? 'JA' : 'EN';
	}

	toggle() {
		this.lang = this.lang === 'en' ? 'ja' : 'en';
	}

	async copyDiscord() {
		try {
			await navigator.clipboard.writeText(contact.discord);
			alert(this.t('alert.discord.success'));
		} catch {
			alert(this.t('alert.discord.fail'));
		}
	}

	async copyEmail() {
		try {
			await navigator.clipboard.writeText(contact.email);
			alert(this.t('alert.email.success'));
		} catch {
			alert(this.t('alert.email.fail'));
		}
	}
}

export const i18n = new I18n();

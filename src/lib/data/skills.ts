import type { TranslationKey } from '$lib/i18n/translations';

export type SkillItem =
	| { label: string; tag: string }
	| { labelKey: TranslationKey; tag: string };

export type SkillBlock = {
	titleKey: TranslationKey;
	items: SkillItem[];
};

export const skillBlocks: SkillBlock[] = [
	{
		titleKey: 'skills.languages',
		items: [
			{ label: 'Rust', tag: 'primary' },
			{ label: 'Java', tag: 'primary' },
			{ label: 'C++', tag: 'use' },
			{ label: 'Python', tag: 'use' }
		]
	},
	{
		titleKey: 'skills.specializations',
		items: [
			{ labelKey: 'skills.spec.compiler', tag: 'spec' },
			{ labelKey: 'skills.spec.ide', tag: 'spec' },
			{ labelKey: 'skills.spec.engine', tag: 'spec' },
			{ labelKey: 'skills.spec.low_level', tag: 'spec' }
		]
	}
];

/** Shared profile / contact URLs and identity strings. */

export const links = {
	github: 'https://github.com/misosoupTgit',
	x: 'https://x.com/wkshy_',
	modrinth: 'https://modrinth.com/user/MisoPy',
	curseforge: 'https://www.curseforge.com/members/misopy/projects'
} as const;

export const contact = {
	discord: 'WKSHY_',
	email: 'misopy@outlook.com'
} as const;

export const abacus = {
	namespace: 'misopy_portfolio',
	get: 'https://abacus.jasoncameron.dev/get/misopy_portfolio/visits',
	hit: 'https://abacus.jasoncameron.dev/hit/misopy_portfolio/visits'
} as const;

export const navLinks = [
	{ label: 'About', href: '#about' },
	{ label: 'Skills', href: '#skills' },
	{ label: 'Projects', href: '#projects' }
] as const;

export const cmdkNavLinks = [
	...navLinks,
	{ label: 'Built with', href: '#built-with' }
] as const;

/** Birthday is Nov 7 (month is 0-indexed). */
export const BIRTH_YEAR = 2011;
export const BIRTH_MONTH = 10;
export const BIRTH_DAY = 7;

export function birthdayStart(year: number): Date {
	return new Date(year, BIRTH_MONTH, BIRTH_DAY, 0, 0, 0, 0);
}

export function birthdayEnd(year: number): Date {
	return new Date(year, BIRTH_MONTH, BIRTH_DAY, 23, 59, 59, 999);
}

export function computeAge(now: Date): number {
	const currentYear = now.getFullYear();
	let currentAge = currentYear - BIRTH_YEAR;
	if (now.getTime() < birthdayStart(currentYear).getTime()) {
		currentAge--;
	}
	return currentAge;
}

export function isBirthdayToday(now: Date): boolean {
	const y = now.getFullYear();
	const t = now.getTime();
	return t >= birthdayStart(y).getTime() && t <= birthdayEnd(y).getTime();
}

export function formatCountdown(diffMs: number): string {
	const d = Math.floor(diffMs / (1000 * 60 * 60 * 24));
	const h = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
	const m = Math.floor((diffMs / 1000 / 60) % 60);
	const s = Math.floor((diffMs / 1000) % 60);
	const ms = diffMs % 1000;
	return `${d}d ${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m ${s.toString().padStart(2, '0')}.${ms.toString().padStart(3, '0')}s`;
}

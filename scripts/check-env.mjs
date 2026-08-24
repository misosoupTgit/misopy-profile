import { parse } from 'dotenv';
import { readFileSync } from 'node:fs';

const parsed = parse(readFileSync('.env', 'utf8'));
const k = parsed.CURSEFORGE_API_KEY || '';
console.log(
	JSON.stringify({
		len: k.length,
		prefix: k.slice(0, 20),
		dollarCount: (k.match(/\$/g) || []).length,
		rawLooksIntact: k.startsWith('$2a$10$')
	})
);

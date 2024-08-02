import { env } from '@/env.mjs';

export const siteConfig = {
	title: 'draw.',
	description: 'Canvas App',
	url: () => env.APP_URL,
};

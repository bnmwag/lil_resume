import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';
import partytown from '@astrojs/partytown';
import robotsTxt from 'astro-robots-txt';
import sitemap from '@astrojs/sitemap';
import compress from 'astro-compress';

const site = 'https://f.bnmwag.dev';

// https://astro.build/config
export default defineConfig({
	site,
	integrations: [
		tailwind({
			applyBaseStyles: false,
		}),
		react({
			experimentalReactChildren: true,
		}),
		sitemap(),
		partytown(),
		robotsTxt({
			sitemap: [`${site}/sitemap-index.xml`, `${site}/sitemap-0.xml`],
		}),
		compress({}),
	],
	output: 'server',
	adapter: vercel({
		webAnalytics: { enabled: true },
		speedInsights: { enabled: true },
	}),
});

import type { Project } from '../types.ts';

const exportState = true;

export const data: Project[] = [
	{
		title: 'studio',
		url: 'https://studio.bnmwag.dev',
		branch: 'studio',
		tags: ['anything imaginable'],
		active: false,
	},
	{
		title: 'HW-Technik',
		url: 'https://www-hwtechnik-at.vercel.app/',
		branch: 'freelance',
		tags: ['web', 'design', 'hosting'],
		active: true,
	},
	{
		title: 'assaabloy',
		url: 'https://assaabloy.at',
		branch: 'sps',
		tags: ['web', 'webgl', 'design'],
		active: false,
	},
	{
		title: 'Neuronet.ink',
		url: 'https://neuronet.ink',
		branch: 'freelance',
		tags: ['design', 'web', 'blog', 'cms', 'hosting'],
		active: true,
	},
];

export const projects = exportState ? data : null;

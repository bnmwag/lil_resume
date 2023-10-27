/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: {
				viet: ['Be Vietnam Pro', 'sans-serif'],
			},
			screens: {
				bot: '512px',
				mid: '1100px',
			},
		},
	},
	plugins: [],
};

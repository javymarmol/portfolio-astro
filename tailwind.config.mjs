import defaultTheme  from 'tailwindcss/defaultTheme'
import {addIconSelectors} from "@iconify/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			extend: {
				fontFamily: {
					sans: ['Figtree', ...defaultTheme.fontFamily.sans],
					serif: ['Figtree', ...defaultTheme.fontFamily.serif],
				},
			},
		},
	},
	plugins: [
		addIconSelectors(['ri']),
	],
}

import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],

	css: {
		preprocessorOptions: {
			sass: {
				additionalData: `@use "/src/styles/font-faces" as *\n@use "/src/styles/colors" as *\n@use "/src/styles/typography" as *\n@use "/src/styles/paddings" as *`,
			}
		}
	},
});

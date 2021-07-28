import {
	mdsvex
} from "mdsvex";
import mdsvexConfig from "./mdsvex.config.js";
import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
/** @type {import('vite').UserConfig} */
const config = {
	"extensions": [".svelte", ...mdsvexConfig.extensions],

	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [preprocess({
        "postcss": true
    }), mdsvex(mdsvexConfig)],

	kit: {
		target: '#svelte',
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			fallback: null
		}),
		vite: () => ({
			server: {
				hmr: {
					overlay: false
				}
			}
		})
	}
};

export default config;
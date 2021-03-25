const node = require('@sveltejs/adapter-node');
const pkg = require('./package.json');
const svelte = require("svelte/compiler")
const sveltePreprocess = require("svelte-preprocess")
const image = require('svelte-image');
const { optimizeDeps } = require('vite');

function runOthersBeforeImage(otherProcessors) {
  return {
    markup: async ({ content, filename }) => {
      const otherProcessorsReturn = await svelte.preprocess(
        content,
        otherProcessors,
        { filename },
      )
      content = otherProcessorsReturn.code

      const { code } = await image({
        placeholder: 'blur',
        sizes: [650, 800, 1050, 1400, 1650, 1950],
        breakpoints: [640, 768, 1024, 1366, 1600, 1920]
      }).markup({ content, filename })
      return {
        ...otherProcessorsReturn,
        code,
      }
    },
  }
}

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
  extensions: ['.svelte', '.js', '.ts'],

	kit: {
		// By default, `npm run build` will create a standard Node app.
		// You can create optimized builds for different platforms by
		// specifying a different adapter
		adapter: node(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {})
			},
      optimizeDeps: {
        exclude: ["svelte-image"]
      }
		}
	},
  preprocess: image()
};

// Empeche errors to display in css templates:
// https://github.com/kaisermann/svelte-preprocess#faq
const sveltePreprocess = require('svelte-preprocess');

module.exports = {
    preprocess: sveltePreprocess({
        scss: true
    }),
};
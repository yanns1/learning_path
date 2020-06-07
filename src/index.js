// Global styles
import './styles/reset.css'
import './styles/index.css'
// Svelte components
import App from './components/App.svelte';

const app = new App({
    target: document.body,
});

export default app;
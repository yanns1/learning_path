import { writable } from 'svelte/store';

const layout = writable(
    ["To Learn", "To Revisit", "Learned", "To Not Learn"]
)

const prioritiesColors = writable(
    ["#b00b0b", "#c47e0c", "#228708"]
)

export { layout, prioritiesColors };
import { db, auth } from './init_firebase.js';
import { writable, readable } from 'svelte/store';

const layout = writable(
    ["To Learn", "To Revisit", "Learned", "To Not Learn"]
)

const prioritiesColors = writable(
    ["#b00b0b", "#c47e0c", "#228708"]
)

const userCred = readable(null, set => {
    const unsubscribe = auth.onAuthStateChanged(userCred => set(userCred));
    return () => unsubscribe()
})
export { layout, prioritiesColors, userCred };
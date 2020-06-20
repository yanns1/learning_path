import { db, auth } from './init_firebase.js';
import { readable, derived } from 'svelte/store';

// Be sure to have userCred first because it's used for following stores
export const userCred = readable(null, set => {
    const unsubscribe = auth.onAuthStateChanged(userCred => set(userCred));
    return () => unsubscribe()
})

export const layout = derived(userCred, ($userCred, set) => {
    if ($userCred) {
        const unsubscribe = db.collection("users").doc($userCred.uid)
            .onSnapshot(doc => {
                set(doc.data().layout)
            })
        return () => unsubscribe()
    }
}, ["To Learn", "To Revisit", "Learned", "To Not Learn"])

export const items = derived(userCred, ($userCred, set) => {
    if ($userCred) {
        const unsubscribe = db.collection("users").doc($userCred.uid)
            .onSnapshot(doc => {
                set(doc.data().items)
            })
        return () => unsubscribe()
    }
}, {
    "To Learn": [],
    "To Revisit": [],
    Learned: [],
    "To Not Learn": []
})

export const prioritiesColors = derived(userCred, ($userCred, set) => {
    if ($userCred) {
        const unsubscribe = db.collection("users").doc($userCred.uid)
            .onSnapshot(doc => {
                set(doc.data().prioritiesColors)
            })
        return () => unsubscribe()
    }
}, ["#b00b0b", "#c47e0c", "#228708"])

export const darkTheme = derived(userCred, ($userCred, set) => {
    if ($userCred) {
        const unsubscribe = db.collection("users").doc($userCred.uid)
            .onSnapshot(doc => {
                set(doc.data().darkTheme)
            })
        return () => unsubscribe()
    }
}, false)


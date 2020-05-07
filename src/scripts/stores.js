import { db, auth } from './init_firebase.js';
import { writable, readable } from 'svelte/store';

// Be sure to have userCred first because it's used for following stores
const userCred = readable(null, set => {
    const unsubscribe = auth.onAuthStateChanged(userCred => set(userCred));
    return () => unsubscribe()
})

const layout = writable(
    ["To Learn", "To Revisit", "Learned", "To Not Learn"]
)

const prioritiesColors = readable(["#b00b0b", "#c47e0c", "#228708"], (set, $userCred) => {
    if ($userCred) {
        const unsubscribe = db.collection("users").doc($userCred.uid)
            .onSnapshot(doc => {
                console.log("Current data: ", doc.data().prioritiesColors);
                set(doc.data().prioritiesColors)
            }).catch(err => {
                console.error(`Error listening to prioritiesColors in db: ${err}`)
            })
        return () => unsubscribe()
    }
})


export { userCred, layout, prioritiesColors };
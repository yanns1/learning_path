<script>
  import { createEventDispatcher } from "svelte";
  import { auth, db } from "../../scripts/init_firebase.js";
  import Dialog from "../shared/Dialog.svelte";

  let message = {
    error: "",
    success: ""
  };

  //   Pure
  const dispatch = createEventDispatcher();

  // Impure
  const signIn = e => {
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // Create user account
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCred => {
        // Initialize user doc in db
        db.collection("users")
          .doc(userCred.user.uid)
          .set({
            isDark: false,
            layout: ["To Learn", "To Revisit", "Learned", "To Not Learn"],
            prioritiesColors: ["#b00b0b", "#c47e0c", "#228708"],
            items: {
              "To Learn": [],
              "To Revisit": [],
              Learned: [],
              "To Not Learn": []
            }
          });
      })
      .then(() => {
        dispatch("closedDialog");
      })
      .catch(err => {
        message.error = err.message;
      });
  };
</script>

<style lang="scss">
  .error {
    color: red;
  }
  .success {
    color: green;
  }
</style>

<Dialog on:closedDialog>
  <h3>Sign In</h3>
  <form on:submit|preventDefault={signIn}>
    <label for="email">
      Email:
      <input id="email" type="email" />
    </label>
    <label for="email">
      Password:
      <input id="password" type="password" />
    </label>
    <button>Sign In</button>
  </form>

  {#if message.success}
    <div class="success">{message.success}</div>
  {:else if message.error}
    <div class="error">{message.error}</div>
  {/if}
</Dialog>

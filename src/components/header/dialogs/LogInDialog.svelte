<script>
  import { createEventDispatcher } from "svelte";
  import { auth } from "../../../scripts/init_firebase.js";
  import { userCred } from "../../../scripts/stores.js";
  import Dialog from "../../shared/Dialog.svelte";

  let message = {
    error: "",
    success: ""
  };

  //   Pure
  const dispatch = createEventDispatcher();

  // Impure
  const logIn = e => {
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCred => {
        dispatch("loggedIn");
        // message.success = "Success !";
      })
      .catch(err => {
        message.success = err.message;
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

<Dialog on:click>
  <h3>Log In</h3>
  <form on:submit|preventDefault={logIn}>
    <label for="email">
      Email:
      <input id="email" type="email" />
    </label>
    <label for="email">
      Password:
      <input id="password" type="password" />
    </label>
    <button>Log In</button>
  </form>

  {#if message.success}
    <div class="success">{message.success}</div>
  {:else if message.error}
    <div class="error">{message.error}</div>
  {/if}
</Dialog>

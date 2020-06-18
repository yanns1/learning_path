<script>
  import { createEventDispatcher } from "svelte";
  import { auth } from "../../scripts/init_firebase.js";
  import { userCred } from "../../scripts/stores.js";
  import Dialog from "../shared/Dialog.svelte";
  import Button from "../shared/Button.svelte";

  let message = {
    error: "",
    success: ""
  };
  const buttonStyles = `
    justify-self: end;
  `;

  //   Pure
  const dispatch = createEventDispatcher();

  // Impure
  const logIn = e => {
    const form = e.target;
    const email = form.email.value;
    const password = form.pwd.value;

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch("closedDialog");
      })
      .catch(err => {
        message.error = err.message;
      });
  };
</script>

<style lang="scss">
  h3 {
    color: var(--primary-color);
    text-transform: uppercase;
    font-size: 1.2rem;
    font-family: Montserrat-Bold, Montserrat-Regular, sans-serif;
    margin-bottom: 1.8rem;
  }

  form {
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-gap: 1rem;
  }

  label {
    color: var(--secondary-color);
    font-family: Montserrat-Bold, Montserrat-Regular, sans-serif;
  }

  .message {
    width: min-content;
  }

  .error {
    color: red;
  }
  .success {
    color: green;
  }
</style>

<Dialog on:closedDialog>
  <h3>Login</h3>
  <form on:submit|preventDefault={logIn}>
    <label for="email">
      Email
      <input
        id="email"
        type="email"
        placeholder="Enter your email..."
        required />
    </label>
    <label for="pwd">
      Password
      <input
        id="pwd"
        type="password"
        placeholder="Enter your password..."
        required />
    </label>
    <Button styles={buttonStyles}>Login</Button>
  </form>
  {#if message.success}
    <div class="message success">{message.success}</div>
  {:else if message.error}
    <div class="message error">{message.error}</div>
  {/if}
</Dialog>

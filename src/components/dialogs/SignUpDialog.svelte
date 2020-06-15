<script>
  import { createEventDispatcher } from "svelte";
  import { auth, db } from "../../scripts/init_firebase.js";
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
  const signIn = e => {
    const form = e.target;
    const email = form.email.value;
    const password = form.pwd.value;

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

  .error {
    color: red;
  }
  .success {
    color: green;
  }
</style>

<Dialog on:closedDialog>
  <h3>Signup</h3>
  <form on:submit|preventDefault={signIn}>
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
    <Button styles={buttonStyles}>Signup</Button>
  </form>

  {#if message.success}
    <div class="success">{message.success}</div>
  {:else if message.error}
    <div class="error">{message.error}</div>
  {/if}
</Dialog>

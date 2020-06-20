<script>
  import { createEventDispatcher } from "svelte";
  import Dialog from "../shared/Dialog.svelte";
  import { db } from "../../scripts/init_firebase.js";
  import { userCred, darkTheme } from "../../scripts/stores.js";
  import Button from "../shared/Button.svelte";

  const applyButtonStyles = `
    justify-self: end;
  `;
  const deleteButtonStyles = `
    justify-self: start;
    background-color: #9E0000;
    &:hover, &:focus {
      background-color: #C90101;
    }
  `;
  let delAccountMess = {
    error: "",
    success: "",
    instructions: ""
  };
  let updateAccountMess = {
    email: {
      error: "",
      success: ""
    },
    pwd: {
      error: "",
      success: "",
      instructions: ""
    }
  };
  let email = $userCred.email;
  let pwd = "";
  let confirmed_pwd = "";

  // Pure
  const dispatch = createEventDispatcher();

  // Impure
  const deleteAccount = async () => {
    const res = window.confirm(
      "Are you absolutely sure ?\n\nThis action cannot be undone.\nAll your data will be lost forever.\n\nConfirm if you really want this."
    );
    if (res) {
      // Cannot find a way to delete user data AFTER deleting his account so:
      db.collection("users")
        .doc($userCred.uid)
        .delete()
        .then(() => {
          $userCred.delete();
        })
        .then(() => {
          dispatch("closedDialog");
        })
        .catch(err => {
          delAccountMess.error = `Your data has been deleted, but not your account yet. ${err}`;
          if (err.code === "auth/requires-recent-login") {
            // See why: https://firebase.google.com/docs/auth/web/manage-users?authuser=0#delete_a_user
            delAccountMess.instructions =
              "First, close this dialog. Then, logout and login again. After that, you will be able to delete your account.";
          }
        });
    }
  };

  const changePwd = e => {
    const form = e.target;
    const pwd = form.pwd.value;
    const confirmed_pwd = form.confirmed_pwd.value;

    if (pwd === confirmed_pwd) {
      $userCred
        .updatePassword(pwd)
        .then(() => {
          updateAccountMess.pwd.success = "Password successfully updated !";
        })
        .catch(err => {
          updateAccountMess.pwd.error = `${err}`;
          if (err.code === "auth/requires-recent-login") {
            updateAccountMess.pwd.instructions =
              "First, close this dialog. Then, logout and login again. After that, you will be able to delete your account.";
          }
        });
    } else {
      updateAccountMess.pwd.error =
        "Confirmed password is not the same as the new password !";
    }
  };

  const changeEmail = e => {
    const form = e.target;
    const email = form.email.value;
    if (email !== $userCred.email) {
      $userCred
        .updateEmail(email)
        .then(() => {
          updateAccountMess.email.success = "Email successfully updated !";
        })
        .catch(err => {
          console.log(err.code);
          updateAccountMess.email.error = `${err}`;
        });
    }
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
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }

  label {
    font-family: Montserrat-Bold, Montserrat-Regular, sans-serif;
  }

  .error {
    color: red;
  }
  .success {
    color: green;
  }
  .instructions {
    // allow multilines
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;

    color: blue;
  }
</style>

<!-- certainly simpler and shorter to do with error messages -->
<Dialog
  dialogBg={$userCred && $darkTheme ? '#292C36' : '#ffffff'}
  on:closedDialog>
  <h3>Account</h3>

  <form on:submit|preventDefault={changeEmail}>
    <label
      style={$userCred && $darkTheme ? 'color: #F2F2F2' : 'color: var(--secondary-color)'}
      for="email">
      Email
      <input id="email" type="email" bind:value={email} />
    </label>
    <Button
      styles={applyButtonStyles}
      disabled={email === $userCred.email}
      darkTheme={$userCred && $darkTheme}>
      Apply
    </Button>
    {#if updateAccountMess.email.error}
      <div class="error">{updateAccountMess.email.error}</div>
    {/if}
    {#if updateAccountMess.email.success}
      <div class="success">{updateAccountMess.email.success}</div>
    {/if}
  </form>

  <form on:submit|preventDefault={changePwd}>
    <label
      style={$userCred && $darkTheme ? 'color: #F2F2F2' : 'color: var(--secondary-color)'}
      for="pwd">
      New password
      <input
        id="pwd"
        type="password"
        bind:value={pwd}
        placeholder="Enter your password..." />
    </label>
    <label
      style={$userCred && $darkTheme ? 'color: #F2F2F2' : 'color: var(--secondary-color)'}
      for="confirmed_pwd">
      Confirm password
      <input
        id="confirmed_pwd"
        type="password"
        bind:value={confirmed_pwd}
        placeholder="Enter your password..." />
    </label>
    <Button
      styles={applyButtonStyles}
      disabled={pwd === '' || pwd !== confirmed_pwd}
      darkTheme={$userCred && $darkTheme}>
      Apply
    </Button>
    {#if updateAccountMess.pwd.error}
      <div class="error">{updateAccountMess.pwd.error}</div>
    {/if}
    {#if updateAccountMess.pwd.success}
      <div class="success">{updateAccountMess.pwd.success}</div>
    {/if}
    {#if updateAccountMess.pwd.instructions}
      <div class="instructions">{updateAccountMess.pwd.instructions}</div>
    {/if}
  </form>

  <Button styles={deleteButtonStyles} on:click={deleteAccount}>
    Delete account
  </Button>
  {#if delAccountMess.error}
    <div class="error">{delAccountMess.error}</div>
  {/if}
  {#if delAccountMess.success}
    <div class="success">{delAccountMess.success}</div>
  {/if}
  {#if delAccountMess.instructions}
    <div class="instructions">{delAccountMess.instructions}</div>
  {/if}
</Dialog>

<script>
  import { createEventDispatcher } from "svelte";
  import Dialog from "../../shared/Dialog.svelte";
  import { db } from "../../../scripts/init_firebase.js";
  import { userCred } from "../../../scripts/stores.js";

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

<Dialog on:closedDialog>
  <h3>Account</h3>

  <form on:submit|preventDefault={changeEmail}>
    <label for="email">
      Email:
      <input id="email" type="email" bind:value={email} />
    </label>
    <div class="error">{updateAccountMess.email.error}</div>
    <div class="success">{updateAccountMess.email.success}</div>
    <button disabled={email === $userCred.email}>Change email</button>
  </form>

  <form on:submit|preventDefault={changePwd}>
    <label for="pwd">
      New password:
      <input id="pwd" type="password" bind:value={pwd} />
    </label>
    <label for="confirmed_pwd">
      Confirm password:
      <input id="confirmed_pwd" type="password" bind:value={confirmed_pwd} />
    </label>
    <div class="error">{updateAccountMess.pwd.error}</div>
    <div class="success">{updateAccountMess.pwd.success}</div>
    <div class="instructions">{updateAccountMess.pwd.instructions}</div>
    <button disabled={pwd === '' || pwd !== confirmed_pwd}>
      Change password
    </button>
  </form>

  <button on:click|self={deleteAccount}>Delete account</button>
  <div class="error">{delAccountMess.error}</div>
  <div class="success">{delAccountMess.success}</div>
  <div class="instructions">{delAccountMess.instructions}</div>
</Dialog>

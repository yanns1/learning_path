<script>
  import { createEventDispatcher } from "svelte";
  import Dialog from "../../shared/Dialog.svelte";
  import { db } from "../../../scripts/init_firebase.js";
  import { userCred } from "../../../scripts/stores.js";

  let message = {
    error: "",
    success: "",
    instructions: ""
  };

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
          message.error = `Your data has been deleted, but not your account yet. ${err}`;
          if (err.code === "auth/requires-recent-login") {
            // See why: https://firebase.google.com/docs/auth/web/manage-users?authuser=0#delete_a_user
            message.instructions =
              "First, close this dialog. Then, logout and login again. After that, you will be able to delete your account.";
          }
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
  <div class="email">
    <strong>Email: {$userCred.email}</strong>
  </div>
  <button on:click|self={deleteAccount}>Delete account</button>
  <div class="error">{message.error}</div>
  <div class="success">{message.success}</div>
  <div class="instructions">{message.instructions}</div>
</Dialog>

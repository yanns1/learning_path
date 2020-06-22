<script>
  import { createEventDispatcher } from "svelte";
  import { firebase, db } from "../../scripts/init_firebase.js";
  import { strToInt } from "../../scripts/utils.js";
  import { userCred, darkTheme } from "../../scripts/stores.js";
  import Dialog from "../shared/Dialog.svelte";
  import Button from "../shared/Button.svelte";

  export let type;
  export let category;
  export let content = "";
  export let priority = 3;
  export let itemToChange;

  const buttonStyles = `
    justify-self: end;
  `;

  const categories = ["To Learn", "To Revisit", "Learned", "To Not Learn"];
  let error = "";

  // Pure
  const dispatch = createEventDispatcher();

  //   Impure
  const addItem = e => {
    const form = e.target;
    const category = form.category.value;
    const content = form.content.value;
    const priority = strToInt(form.priority.value);

    const item = { category, content, priority };
    const fieldToUpdate = `items.${category}`;

    // Push item to db
    db.collection("users")
      .doc($userCred.uid)
      .update({
        [fieldToUpdate]: firebase.firestore.FieldValue.arrayUnion(item)
      })
      .then(() => {
        dispatch("closedDialog");
      })
      .catch(err => {
        error = `The item has not been added. ${err}`;
      });
  };

  const changeItem = e => {
    const form = e.target;
    const newItem = {
      category: form.category.value,
      content: form.content.value,
      priority: strToInt(form.priority.value)
    };
    const userDocRef = db.collection("users").doc($userCred.uid);

    db.runTransaction(transaction => {
      return transaction.get(userDocRef).then(userDoc => {
        if (userDoc.exists) {
          const fieldWhereRemoving = `items.${itemToChange.category}`;
          transaction.update(userDocRef, {
            [fieldWhereRemoving]: firebase.firestore.FieldValue.arrayRemove(
              itemToChange
            )
          });
          const fieldWhereAdding = `items.${newItem.category}`;
          transaction.update(userDocRef, {
            [fieldWhereAdding]: firebase.firestore.FieldValue.arrayUnion(
              newItem
            )
          });
        }
      });
    })
      .then(() => {
        dispatch("closedDialog");
      })
      .catch(err => {
        error = `The item has not been changed. ${err}`;
      });
  };

  const deleteItem = e => {
    // based on global variables, is there a better way ?
    const item = { category, content, priority };
    const fieldToUpdate = `items.${category}`;

    // delete in db
    db.collection("users")
      .doc($userCred.uid)
      .update({
        [fieldToUpdate]: firebase.firestore.FieldValue.arrayRemove(item)
      })
      .then(() => {
        dispatch("closedDialog");
      })
      .catch(err => {
        error = `The item has not been deleted. ${err}`;
      });
  };
</script>

<style lang="scss">
  .head-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.8rem;
  }

  h3 {
    color: var(--primary-color);
    text-transform: uppercase;
    font-size: 1.2rem;
    font-family: Montserrat-Bold, Montserrat-Regular, sans-serif;
  }

  form {
    display: grid;
    grid-template-rows: auto;
    gap: 1rem;
  }

  label {
    font-family: Montserrat-Bold, Montserrat-Regular, sans-serif;

    & > select {
      display: block;
      margin: 0.6rem 0;
    }
  }

  .error {
    color: red;
    width: 6rem;
    word-wrap: break-word;
  }

  .delete-icon {
    cursor: pointer;
    width: 1.5rem;
    opacity: 0.5;

    &:hover {
      opacity: 1;
    }
  }
</style>

<Dialog
  dialogBg={$userCred && $darkTheme ? '#292C36' : '#ffffff'}
  on:closedDialog>
  <div class="head-wrapper">
    <h3>{type === 'add' ? 'Add Item' : 'Change Item'}</h3>
    {#if type === 'change'}
      <svg
        on:click={deleteItem}
        class="delete-icon"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        fill={$userCred && $darkTheme ? '#F2F2F2' : '#333333'}
        viewBox="0 0 50 50">
        <title>Delete icon</title>
        <path
          d="M12.5 39.583a4.179 4.179 0 004.167 4.167h16.666a4.179 4.179 0
          004.167-4.167v-25h-25v25zm27.083-31.25h-7.291L30.208
          6.25H19.792l-2.084 2.083h-7.291V12.5h29.166V8.333z" />
      </svg>
    {/if}
  </div>
  <form on:submit|preventDefault={type === 'add' ? addItem : changeItem}>
    <label
      for="content"
      style={$userCred && $darkTheme ? 'color: #F2F2F2' : 'color: var(--secondary-color)'}>
      Content
      <!-- svelte-ignore a11y-autofocus -->
      <!-- Make sense to autofocus because adding/changing the content -->
      <!-- is the thing we want to do when openning the dialog -->
      <!-- see: https://www.brucelawson.co.uk/2009/the-accessibility-of-html-5-autofocus/ -->
      <input id="content" type="text" bind:value={content} required autofocus />
    </label>
    <label
      for="category"
      style={$userCred && $darkTheme ? 'color: #F2F2F2' : 'color: var(--secondary-color)'}>
      Category
      <select name="category" id="category" bind:value={category}>
        {#each categories as category}
          <option value={category}>{category}</option>
        {/each}
      </select>
    </label>
    <label
      for="priority"
      style={$userCred && $darkTheme ? 'color: #F2F2F2' : 'color: var(--secondary-color)'}>
      Priority
      <select name="priority" id="priority" bind:value={priority}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
    </label>
    <Button styles={buttonStyles}>{type === 'add' ? 'Add' : 'Apply'}</Button>
    {#if error}
      <div class="error">{error}</div>
    {/if}
  </form>
</Dialog>

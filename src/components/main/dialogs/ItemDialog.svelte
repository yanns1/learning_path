<script>
  import trashIconSvg from "../../../img/icons/trash_icon.svg";
  import { createEventDispatcher } from "svelte";
  import { firebase, db } from "../../../scripts/init_firebase.js";
  import { strToInt } from "../../../scripts/utils.js";
  import { userCred } from "../../../scripts/stores.js";
  import Dialog from "../../shared/Dialog.svelte";

  export let type;
  export let category;
  export let content = "";
  export let priority = 3;

  let section = "";
  const categories = ["To Learn", "To Revisit", "Learned", "To Not Learn"];
  let error = "";

  // Pure
  const dispatch = createEventDispatcher();

  //   Impure
  const addItem = e => {
    const form = e.target;
    const category = form.category.value;
    const content = form.content.value;
    const section = form.section.value;
    const priority = strToInt(form.priority.value);

    const item = { category, content, section, priority };
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

  const changeItem = e => {};

  const deleteItem = e => {
    // based on global variables, is there a better way ?
    const item = { category, content, section, priority };
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
  .error {
    color: red;
  }

  .trash-icon {
    cursor: pointer;
    padding: 0.2rem;
    width: 1rem;
  }
</style>

<Dialog on:closedDialog>
  <h3>{type === 'add' ? 'Add Item' : 'Change Item'}</h3>
  {#if type === 'change'}
    <img
      class="trash-icon"
      src={trashIconSvg}
      alt="Trash icon"
      on:click={deleteItem} />
  {/if}
  <form on:submit|preventDefault={type === 'add' ? addItem : changeItem}>
    <label for="category">
      Category:
      <select name="category" id="category" bind:value={category}>
        {#each categories as category}
          <option value={category}>{category}</option>
        {/each}
      </select>
    </label>
    <label for="content">
      Content:
      <input id="content" type="text" bind:value={content} required />
    </label>
    <label for="section">
      Section:
      <input id="section" type="text" bind:value={section} />
    </label>
    <label for="priority">
      Priority:
      <select name="priority" id="priority" bind:value={priority}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
    </label>
    <button>{type === 'add' ? 'Add item' : 'Change item'}</button>
    {#if error}
      <div class="error">{error}</div>
    {/if}
  </form>

</Dialog>

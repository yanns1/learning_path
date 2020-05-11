<script>
  import { createEventDispatcher } from "svelte";
  import { firebase, db } from "../../../scripts/init_firebase.js";
  import { userCred } from "../../../scripts/stores.js";
  import Dialog from "../../shared/Dialog.svelte";

  export let category;
  let content = "";
  let section = "";
  let priority = 3;
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
    const priority = form.priority.value;

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
</script>

<style lang="scss">
  .error {
    color: red;
  }
</style>

<Dialog on:closedDialog>
  <h3>Add Item</h3>
  <form on:submit|preventDefault={addItem}>
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
    <button>Add item</button>

  </form>
  {#if error}
    <div class="error">{error}</div>
  {/if}
</Dialog>

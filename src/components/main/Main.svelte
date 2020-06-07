<script>
  import plusIconSvg from "../../img/icons/plus_icon.svg";
  import {
    sortItemsFromDb,
    isFalsyArr,
    strToInt
  } from "../../scripts/utils.js";
  import { layout, items } from "../../scripts/stores.js";
  import Card from "./Card.svelte";
  import Item from "./item/Item.svelte";
  import ItemDialog from "./dialogs/ItemDialog.svelte";

  let showAddItemDialog = false;
  let addItemDialogProps = {};
  let showChangeItemDialog = false;
  let changeItemDialogProps = {};

  // Pure

  // Impure
  const triggerItemChange = item => {
    showChangeItemDialog = true;
    changeItemDialogProps = {
      type: "change",
      ...item,
      itemToChange: item
    };
  };

  const triggerItemAdd = category => {
    showAddItemDialog = true;
    addItemDialogProps = {
      type: "add",
      category
    };
  };
</script>

<style lang="scss">
  .cards-container {
    margin: 0 15%;
  }

  .plus-icon {
    width: 0.5rem;
  }

  .add-item {
    cursor: pointer;
    display: flex;
    align-items: center;
  }
</style>

<main>
  <div class="cards-container">
    {#each $layout as cardTitle}
      <Card>
        <h3>{cardTitle}</h3>
        <div class="add-item" on:click={() => triggerItemAdd(cardTitle)}>
          <img class="plus-icon" src={plusIconSvg} alt="Plus icon" />
          <div class="text">Add item</div>
        </div>
        {#if isFalsyArr($items[cardTitle])}
          <div>No items yet.</div>
        {:else}
          {#each sortItemsFromDb($items)[cardTitle] as item}
            <Item
              content={item.content}
              priority={strToInt(item.priority)}
              on:click={() => triggerItemChange(item)} />
          {/each}
        {/if}
      </Card>
    {/each}
  </div>
</main>
<!-- has to be outside </main> because overlay of dialog needs to have the body has parent -->
{#if showAddItemDialog}
  <ItemDialog
    {...addItemDialogProps}
    on:closedDialog={() => (showAddItemDialog = false)} />
{/if}
{#if showChangeItemDialog}
  <ItemDialog
    {...changeItemDialogProps}
    on:closedDialog={() => (showChangeItemDialog = false)} />
{/if}

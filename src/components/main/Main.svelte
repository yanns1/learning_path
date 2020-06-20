<script>
  import {
    sortItemsFromDb,
    isFalsyArr,
    strToInt
  } from "../../scripts/utils.js";
  import { layout, items, darkTheme, userCred } from "../../scripts/stores.js";
  import Card from "./Card.svelte";
  import Item from "./item/Item.svelte";
  import ItemDialog from "../dialogs/ItemDialog.svelte";

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
  h3 {
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0.5rem;
  }

  .add-item {
    cursor: pointer;
    display: flex;
    align-items: baseline;
    margin: 1rem 0;
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
    & .plus-icon {
      width: 0.5rem;
      padding: 0.1rem;
    }
    & .text {
      padding: 0 0.2rem;
    }
  }

  .cards-container:last-child {
    // space for bottom-navbar in mobile view
    margin-bottom: 7rem;
  }

  main.dark {
    & svg {
      fill: #f2f2f2;
    }
  }

  @media (min-width: 600px) {
    .cards-container {
      margin: 0 10%;
    }
    .cards-container:last-child {
      margin-bottom: 0;
    }
  }

  @media (min-width: 1100px) {
    .cards-container {
      margin: 0 25%;
    }
  }
</style>

<main class:dark={$userCred && $darkTheme}>
  <div class="cards-container">
    {#each $layout as cardTitle}
      <Card dark={$userCred && $darkTheme}>
        <h3>{cardTitle}</h3>
        <div class="add-item" on:click={() => triggerItemAdd(cardTitle)}>
          <svg
            class="plus-icon"
            role="img"
            fill="#000000"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512">
            <title>Plus icon</title>
            <path
              d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32
              32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32
              32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33
              32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
          </svg>
          <div class="text">Add item</div>
        </div>
        {#if isFalsyArr($items[cardTitle])}
          <div>No items yet.</div>
        {:else}
          {#each sortItemsFromDb($items)[cardTitle] as item}
            <Item
              content={item.content}
              priority={cardTitle === 'Learned' || cardTitle === 'To Not Learn' ? -1 : strToInt(item.priority)}
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

<script>
  import plusIconSvg from "../../img/icons/plus_icon.svg";
  import { layout } from "../../scripts/stores.js";
  import Card from "./Card.svelte";
  import Item from "./item/Item.svelte";
</script>

<style lang="scss">
  .plus-icon {
    width: 0.5rem;
  }

  .add-item {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .add-section {
    $color: red;

    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0.7;

    .text {
      color: $color;
      margin: 0 0.5rem;
    }

    &:before {
      content: "";
      display: block;
      background-color: $color;
      height: 1px;
      flex: 1 1 auto;
      opacity: 0.5;
      &:hover {
        opacity: 0.8;
      }
    }
    &:after {
      content: "";
      display: block;
      background-color: $color;
      height: 1px;
      flex: 1 1 auto;
      opacity: 0.5;
      &:hover {
        opacity: 0.8;
      }
    }

    &:hover {
      opacity: 1;
    }
  }
</style>

<main>
  {#each $layout as cardTitle}
    <Card>
      <h3>{cardTitle}</h3>
      <div class="add-item">
        <img class="plus-icon" src={plusIconSvg} alt="Plus icon" />
        <div class="text">Add item</div>
      </div>
      <div class="add-section">
        <div class="text">Add section</div>
      </div>
      <Item />
    </Card>
  {/each}
</main>

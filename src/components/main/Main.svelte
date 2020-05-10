<script>
  import { sortBy, compose, toLower, prop } from "ramda";
  import plusIconSvg from "../../img/icons/plus_icon.svg";
  import { layout, items } from "../../scripts/stores.js";
  import Card from "./Card.svelte";
  import Item from "./item/Item.svelte";

  // Trouver un meilleur moyen de modéliser data
  // docs à part pour items ?
  const fakeItems = {
    "To Learn": [
      {
        section: "test",
        priority: 3
      },
      {
        section: "",
        priority: 2
      },
      {
        section: "test",
        priority: 1
      }
    ],
    Learned: {
      test: [
        {
          section: "test",
          priority: 3
        },
        {
          section: "test",
          priority: 1
        }
      ]
    },
    "": [
      {
        section: "",
        priority: 2
      }
    ]
  };
  // Pure
  const sortBySection = sortBy(
    compose(
      toLower,
      prop("section")
    )
  );
  const sortByPriority = sortBy(prop("priority"));
  const getValueOfEntry = entry => entry[1];
  const b = Object.entries(fakeItems);
  const a = Object.entries(fakeItems).map(entry => {
    const newEntry = [...entry];

    const newValueOfEntry = sortBySection(getValueOfEntry(newEntry));
    console.log(newValueOfEntry);
    const c = newValueOfEntry.map(item => item.section);

    // newEntry[1] = newValueOfEntry;
    return newEntry;
  });
  console.log(b);
  console.log(a);
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
      {#each $items[cardTitle] as item}
        <Item content={item.content} priority={item.priority} />
      {/each}
    </Card>
  {/each}
</main>

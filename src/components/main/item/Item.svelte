<script>
  import { prioritiesColors } from "../../../scripts/stores.js";

  // default values do not apply for rerenders.
  // In fact it's more an "initial default value" than a default value
  export let content;
  export let priority;

  // so workaround...
  let updatedFallbackPriority = 3;
  if (priority) {
    updatedFallbackPriority = priority;
  }
  $: content = content || "";
  $: priority = priority || updatedFallbackPriority;

  //   Impure
</script>

<style lang="scss">
  .item {
    cursor: pointer;
    display: inline-block;
    color: var(--color);
    border: 1px solid var(--color);
    border-radius: 16px;
    margin: 0.5rem;
    transition: all 150ms ease-out;

    &:hover {
      color: #fff;
      box-shadow: inset 0 0 0 2rem var(--color);
      // to make it a bit less projecting
      opacity: 0.95;
    }
    & .content {
      display: inline-block;
      padding: 0.4rem 0.8rem;
    }
  }
</style>

<div
  class="item"
  style="--color: {priority === -1 ? 'black' : $prioritiesColors[priority - 1]}">
  <div class="content" on:click|self>{content}</div>
</div>

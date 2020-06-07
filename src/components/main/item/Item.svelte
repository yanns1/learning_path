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
    border: 1px solid var(--color);
    border-radius: 4px;

    & .content {
      display: inline-block;
      color: var(--color);
      // give it a padding to ensure that the click will be catched
    }
  }
</style>

<div class="item" style="--color: {$prioritiesColors[priority - 1]}">
  <div class="content" on:click|self>{content}</div>
</div>

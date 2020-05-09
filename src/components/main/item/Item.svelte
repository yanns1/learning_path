<script>
  import PriorityDropdown from "./PriorityDropdown.svelte";

  let showPriorityDropdown = false;

  //   Impure
  const togglePriorityDropdown = () => {
    showPriorityDropdown = !showPriorityDropdown;
  };
</script>

<style lang="scss">
  .item {
    display: inline-block;
    border: 1px solid black;
    border-radius: 4px;
  }

  .text {
    display: inline-block;
  }

  .caret-icon {
    display: inline-block;
    width: 0.3rem;
    // padding: .1rem;
    transition: all 0.3s;

    &:hover {
      transform: rotate(90deg);
    }
  }
</style>

<div class="item">
  <div class="text">Item</div>
  <svg
    on:click={togglePriorityDropdown}
    class="caret-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 512">
    <path
      d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9
      0l-22.6-22.6c-9.4-9.4-9.4-24.6
      0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4
      24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z" />
  </svg>
  {#if showPriorityDropdown}
    <PriorityDropdown on:closedDropdown={togglePriorityDropdown} />
  {/if}
</div>

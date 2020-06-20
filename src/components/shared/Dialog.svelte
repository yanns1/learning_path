<script>
  import { onMount, createEventDispatcher } from "svelte";

  export let dialogBg = "#ffffff";

  // Pure
  const dispatch = createEventDispatcher();

  // Impure
  onMount(() => {
    const dispatchIfEsc = e => {
      if (e.key === "Escape") {
        dispatch("closedDialog");
      }
    };
    window.addEventListener("keydown", dispatchIfEsc);

    return () => window.removeEventListener("keydown", dispatchIfEsc);
  });
</script>

<style lang="scss">
  .overlay {
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .dialog {
    padding: 1.5rem;
    border-radius: 16px;
    max-width: 70vw;
    max-height: 80vh;
  }
</style>

<!-- Infos: if slot is longer than max-height, the content goes over the limits -->
<div class="overlay" on:click|self={() => dispatch('closedDialog')}>
  <div class="dialog" style={`background: ${dialogBg}`}>
    <slot />
  </div>
</div>

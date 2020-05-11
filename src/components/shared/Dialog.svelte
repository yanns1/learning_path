<script>
  import { onMount, createEventDispatcher } from "svelte";

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
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  .dialog {
    padding: 2rem;
    border-radius: 10px;
    max-width: 70vw;
    max-height: 80vh;
    margin: 10% auto;
    background-color: #fff;
  }
</style>

<!-- Infos: if slot is longer than max-height, the content goes over the limits -->
<div class="overlay" on:click|self={() => dispatch('closedDialog')}>
  <div class="dialog">
    <slot />
  </div>
</div>

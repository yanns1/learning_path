<script>
  // Infos: if slot is longer than max-height, the content goes over the limits

  // Impure
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
  }
  .dialog {
    padding: 2rem;
    border-radius: 10px;
    max-width: 70vw;
    max-height: 80vh;
    margin: 10% auto;
    background-color: #d7d7d7;
  }
</style>

<div class="overlay" on:click|self>
  <div class="dialog">
    <slot />
  </div>
</div>

<script>
  export let dark = false;
  export let styles = "";
</script>

<style lang="scss">
  .card {
    background: #fff;
    border-radius: 16px;
    padding: 1rem;
    /* 3rem at the bottom instead of 1 because of margin collapsing */
    margin: 1rem 1rem 3rem;
    box-shadow: 10px 15px 30px #d6ddee;

    &.dark {
      background: #282e40;
      box-shadow: none;
    }
  }

  @media (min-width: 600px) {
    .card {
      box-shadow: 20px 30px 30px #d6ddee;
    }
  }

  @media (min-width: 1100px) {
    .card {
      margin: 3rem 1rem;
    }
  }
</style>

<div class={dark ? 'card dark' : 'card'} style={styles}>
  <slot />
</div>

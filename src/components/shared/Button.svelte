<script>
  export let styles;
</script>

<style lang="scss">
  button {
    cursor: pointer;
    display: inline-block;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    color: white;
    font-family: inherit;
    font-weight: 600;
    font-size: 1rem;
    background-color: var(--primary-color);
    border: none;
    border-radius: 16px;
    margin: 0;
    padding: 0.3rem 0.8rem;
    transition: background-color 250ms ease-in-out, transform 150ms ease;

    &:hover {
      background-color: #1226d6;
    }
    &:focus {
      background-color: #1226d6;
      outline: none;
      box-shadow: 0 0 0 1px var(--secondary-color);
    }
    &:active {
      transform: scale(0.99);
    }
  }
</style>

<button on:click|self style={styles}>
  <slot />
</button>

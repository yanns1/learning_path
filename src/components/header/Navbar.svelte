<script>
  import { createEventDispatcher } from "svelte";

  export let tabs = [];
  export let tabsColor = "#333";

  const dispatch = createEventDispatcher();
</script>

<style type="text/scss">
  ul {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    list-style-type: none;
  }
  li {
    margin: 0 1rem;
    padding: 0.4rem;
    font-size: 1.125rem;
    cursor: pointer;
    color: var(--tabs-color);
    opacity: 0.7;
    &:hover {
      opacity: 1;
    }
  }
</style>

<ul style="--tabs-color: {tabsColor}">
  {#each tabs as tab (tab)}
    {#if typeof tab === 'string'}
      <li on:click={() => dispatch('tabChange', tab)}>
        <div>{tab}</div>
      </li>
    {:else}
      <li on:click={() => dispatch('tabChange', tab)}>
        <img
          src={tab.src ? tab.src : ''}
          alt={tab.alt ? tab.alt : ''}
          title={tab.title ? tab.title : ''}
          style="width: {tab.width ? tab.width : ''}" />
      </li>
    {/if}
  {/each}
</ul>

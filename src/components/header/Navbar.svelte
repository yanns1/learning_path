<script>
  import { createEventDispatcher } from "svelte";

  export let tabs = [];
  export let view = "desktop";
  export let tabsColor = "#000000";
  export let mobileBg = "#F2F2F2";

  const dispatch = createEventDispatcher();
</script>

<style type="text/scss">
  ul {
    z-index: 900;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    & > li {
      justify-self: center;
      padding: 0.5rem;
      opacity: 1;
      display: flex;
      flex-flow: column;
      align-items: center;

      & > img {
        width: 1.5rem;
      }

      & .name {
        margin-top: 0.2rem;
      }
    }
  }

  @media (min-width: 600px) {
    ul {
      z-index: 0;
      position: static;
      background: none;

      display: flex;
      justify-content: space-between;

      grid-area: navbar;
      align-self: center;
      justify-self: end;

      & > li {
        display: inline-block;
        cursor: pointer;
        opacity: 0.7;
        margin: 0;

        &:hover {
          opacity: 1;
        }

        & .name {
          margin: 0;
        }
      }
    }
  }
</style>

<ul style={`color: ${tabsColor}; background: ${mobileBg}`}>
  {#each tabs as tab (tab)}
    <li on:click={() => dispatch('tabChange', tab)}>
      {#if view === 'mobile'}
        <img
          class="icon"
          src={tab.icon.src ? tab.icon.src : ''}
          alt={tab.icon.alt ? tab.icon.alt : ''}
          title={tab.icon.title ? tab.icon.title : ''} />
      {/if}
      <div class="name">{tab.name}</div>
    </li>
  {/each}
</ul>

<script>
  import Header from "./header/Header.svelte";
  import Main from "./main/Main.svelte";
  import Footer from "./footer/Footer.svelte";
  import { userCred } from "../scripts/stores.js";

  let dark = false;
</script>

<style>

</style>

<Header {dark} />
{#if $userCred}
  <Main />
{:else}
  <main>
    <div>Not authenticated</div>
  </main>
{/if}
<Footer />

<script>
  import Header from "./header/Header.svelte";
  import Main from "./main/Main.svelte";
  import Footer from "./footer/Footer.svelte";
  import { userCred, darkTheme } from "../scripts/stores.js";
  import wave from "../img/wave.svg";
  import SignUpDialog from "./dialogs/SignUpDialog.svelte";
  import LogInDialog from "./dialogs/LogInDialog.svelte";
  import Button from "./shared/Button.svelte";

  let showSignInDialog = false;
  let showLogInDialog = false;

  document.title = "Learning Path";

  $: {
    if ($userCred && $darkTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }
</script>

<style lang="scss">
  .wave {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -100;
    width: 100%;
  }

  main {
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    padding: 0 15%;
  }

  .call-to-action,
  .demo-text {
    text-align: center;
    color: var(--secondary-color);
    font-size: 1.2rem;
    font-family: Montserrat-Bold, Montserrat-Regular, sans-serif;
  }

  .button-wrapper {
    margin: 2rem 0;
  }
</style>

<!-- Dialogs -->
{#if showSignInDialog}
  <SignUpDialog on:closedDialog={() => (showSignInDialog = false)} />
{/if}
{#if showLogInDialog}
  <LogInDialog on:closedDialog={() => (showLogInDialog = false)} />
{/if}

<!-- wave background -->
<svg
  class="wave"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 1440 299">
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M0 299l60-14.95c60-14.95 180-44.85 300-54.817 120-9.966 240 0
    360-14.95s240-54.816 360-44.85c120 9.967 240 69.767 300 99.667l60
    29.9V0H0v299z"
    fill={$userCred && $darkTheme ? '#273052' : '#D6DDEE'} />
</svg>

<Header />
{#if $userCred}
  <Main />
{:else}
  <main>
    <div class="call-to-action">
      Signup/Login to have access to all the features !
    </div>
    <div class="button-wrapper">
      <Button on:click={() => (showSignInDialog = true)}>Signup</Button>
      <span>or</span>
      <Button on:click={() => (showLogInDialog = true)}>Login</Button>
    </div>
    <div class="demo-text">Quick demo</div>
    <!-- <video src={clip} /> -->
  </main>
{/if}
<Footer />

<script>
  import Header from "./header/Header.svelte";
  import Main from "./main/Main.svelte";
  import Footer from "./footer/Footer.svelte";
  import { userCred } from "../scripts/stores.js";
  import wave from "../img/wave.svg";
  import SignUpDialog from "./dialogs/SignUpDialog.svelte";
  import LogInDialog from "./dialogs/LogInDialog.svelte";
  import Button from "./shared/Button.svelte";

  let dark = false;
  let showSignInDialog = false;
  let showLogInDialog = false;

  document.title = "Learning Path";
</script>

<style lang="scss">
  img {
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
    padding: 0.5rem 1rem;
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

{#if showSignInDialog}
  <SignUpDialog on:closedDialog={() => (showSignInDialog = false)} />
{/if}
{#if showLogInDialog}
  <LogInDialog on:closedDialog={() => (showLogInDialog = false)} />
{/if}

<img src={wave} alt="wave background on top of the page" />
<Header {dark} />
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

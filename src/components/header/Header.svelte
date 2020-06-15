<script>
  import { auth } from "../../scripts/init_firebase.js";
  import { userCred } from "../../scripts/stores.js";
  import logo from "../../img/logo.svg";
  import themeIcon from "../../img/icons/theme_icon.svg";
  import accountIcon from "../../img/icons/account_icon.svg";
  import Navbar from "./Navbar.svelte";
  import SettingsDialog from "../dialogs/settings/SettingsDialog.svelte";
  import AccountDialog from "../dialogs/AccountDialog.svelte";

  export let dark = false;

  let showSettingsDialog = false;
  let showAccountDialog = false;

  let tabsColor = "#333";
  const accountIconTab = {
    src: accountIcon,
    alt: "Account icon",
    title: "Account infos"
  };
  const navTabs = ["Logout", "Settings", accountIconTab];

  // Impure
  const handleTabChange = e => {
    const activeTab = e.detail;
    switch (activeTab) {
      case "Settings":
        showSettingsDialog = true;
        break;
      case "Account infos":
        showAccountDialog = true;
        break;
      case "Logout":
        auth.signOut().catch(err => {
          console.error(`Error signing out: ${err}`);
        });
        break;
      default:
        break;
    }
  };
</script>

<style lang="scss">
  header {
    padding: 1rem;
  }
  .subheader {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .logo {
    cursor: pointer;
    width: 7rem;
  }
  .theme {
    padding: 1rem 0;
    display: flex;
    justify-content: flex-end;
    & > img {
      cursor: pointer;
      width: 1.5rem;
      margin: 0 1rem;
      padding: 0.4rem;
      opacity: 0.7;
      &:hover {
        opacity: 1;
      }
    }
  }
  .intro {
    text-align: center;
    color: #333333;
    margin: 1.5rem 0;
    font-weight: 600;
  }
</style>

<header>
  <div class="subheader">
    <img class="logo" src={logo} alt="Site logo" />
    {#if $userCred}
      <Navbar tabs={navTabs} {tabsColor} on:tabChange={handleTabChange} />
    {/if}
  </div>
  {#if $userCred}
    <div class="theme">
      <img src={themeIcon} alt="" />
    </div>
  {/if}
  <div class="intro">Keep track of your learning path !</div>
</header>
<!-- has to be outside </main> because overlay of dialog needs to have the body has parent -->
{#if showSettingsDialog}
  <SettingsDialog on:closedDialog={() => (showSettingsDialog = false)} />
{/if}
{#if showAccountDialog}
  <AccountDialog on:closedDialog={() => (showAccountDialog = false)} />
{/if}

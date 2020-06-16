<script>
  import { auth } from "../../scripts/init_firebase.js";
  import { userCred } from "../../scripts/stores.js";
  import logo from "../../img/logo.svg";
  import themeIcon from "../../img/icons/theme_icon.svg";
  import accountIcon from "../../img/icons/account_icon.svg";
  import settingsIcon from "../../img/icons/settings_icon.svg";
  import logoutIcon from "../../img/icons/logout_icon.svg";
  import Navbar from "./Navbar.svelte";
  import SettingsDialog from "../dialogs/settings/SettingsDialog.svelte";
  import AccountDialog from "../dialogs/AccountDialog.svelte";

  export let dark = false;

  let showSettingsDialog = false;
  let showAccountDialog = false;

  let tabsColor = "#333";
  const createNavTab = (name, icon) => {
    return {
      name,
      icon: {
        src: icon,
        alt: `${name} icon`,
        title: `${name}`
      }
    };
  };
  const accountTab = createNavTab("Account", accountIcon);
  const settingsTab = createNavTab("Settings", settingsIcon);
  const logoutTab = createNavTab("Logout", logoutIcon);
  // order matters
  const navTabs = [accountTab, settingsTab, logoutTab];

  // Impure
  const mql = window.matchMedia("(max-width: 600px)");
  let mobileView = mql.matches;
  mql.addEventListener("change", e => {
    mobileView = e.matches;
  });

  const handleTabChange = e => {
    const activeTab = e.detail.name;
    switch (activeTab) {
      case "Logout":
        auth.signOut().catch(err => {
          console.error(`Error signing out: ${err}`);
        });
        break;
      case "Settings":
        showSettingsDialog = true;
        break;
      case "Account":
        showAccountDialog = true;
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
    & > img {
      cursor: pointer;
      width: 1.5rem;
    }
  }
  .intro {
    text-align: center;
    color: #333333;
    margin-top: 2rem;
    font-weight: 600;
  }

  @media (min-width: 600px) {
    header {
      padding: 2rem;
    }

    .logo {
      width: 9rem;
      padding: 0.5rem;
      grid-area: logo;
      align-self: start;
      justify-self: start;
    }
    .theme {
      grid-area: theme;
      align-self: start;
      justify-self: end;

      & > img {
        padding: 0.5rem;
        opacity: 0.7;
        &:hover {
          opacity: 1;
        }
      }
    }

    .subheader {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-template-rows: repeat(2, 1fr);
      grid-template-areas:
        "logo . navbar"
        ". . theme";
      row-gap: 1rem;
    }
  }
</style>

<header>
  <div class="subheader">
    <img class="logo" src={logo} alt="Site logo" />
    {#if $userCred}
      <Navbar
        view={mobileView ? 'mobile' : 'desktop'}
        tabs={navTabs}
        {tabsColor}
        on:tabChange={handleTabChange} />
      <div class="theme">
        <img src={themeIcon} alt="" />
      </div>
    {/if}
  </div>
  <div class="intro">Keep track of your learning path !</div>
</header>
<!-- has to be outside </main> because overlay of dialog needs to have the body has parent -->
{#if showSettingsDialog}
  <SettingsDialog on:closedDialog={() => (showSettingsDialog = false)} />
{/if}
{#if showAccountDialog}
  <AccountDialog on:closedDialog={() => (showAccountDialog = false)} />
{/if}

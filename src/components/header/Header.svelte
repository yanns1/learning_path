<script>
  import learningPathLogoWhite from "../../img/learning_path_logo_white.svg";
  import learningPathLogoBlack from "../../img/learning_path_logo_black.svg";
  import themeIcon from "../../img/icons/theme_icon.svg";
  import accountIcon from "../../img/icons/account_icon.svg";
  import Navbar from "./Navbar.svelte";
  import SettingsDialog from "./dialogs/SettingsDialog.svelte";
  import AccountDialog from "./dialogs/AccountDialog.svelte";
  import SignInDialog from "./dialogs/SignInDialog.svelte";

  export let dark = false;

  let isLogged = true;
  let showSettingsDialog = false;
  let showAccountDialog = false;
  let showSignInDialog = false;

  let tabsColor = "#333";
  const accountIconTab = {
    src: accountIcon,
    alt: "Account icon",
    title: "Account infos",
    width: "1.5rem"
  };
  const navTabsIfLoggedIn = ["Logout", "Settings", accountIconTab];
  const navTabsIfLoggedOut = ["SignIn"];

  // Impure
  const handleTabChange = e => {
    const activeTab = e.detail;
    if (activeTab === "Settings") {
      showSettingsDialog = true;
    } else if (activeTab === "Account infos") {
      showAccountDialog = true;
    } else if (activeTab === "SignIn") {
      showSignInDialog = true;
    } else if (activeTab === "Logout") {
      isLogged = false;
    }
  };

  const closeDialogs = () => {
    // Don't try to understand which dialog to close, close all of them
    showSettingsDialog = false;
    showAccountDialog = false;
    showSignInDialog = false;
  };
</script>

<style lang="scss">
  header {
    padding: 1rem 2rem;
  }
  .subheader {
    padding: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .site_logo {
    cursor: pointer;
    width: 20%;
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
  }
</style>

<header>
  <div class="subheader">
    <img
      class="site_logo"
      src={dark ? learningPathLogoWhite : learningPathLogoBlack}
      alt="Site logo" />
    <Navbar
      tabs={isLogged ? navTabsIfLoggedIn : navTabsIfLoggedOut}
      {tabsColor}
      on:tabChange={handleTabChange} />
  </div>
  <div class="theme">
    <img src={themeIcon} alt="" />
  </div>
  <div class="intro">Keep track of your learning path !</div>
</header>
{#if showSettingsDialog}
  <SettingsDialog on:click={closeDialogs} />
{/if}
{#if showAccountDialog}
  <AccountDialog on:click={closeDialogs} />
{/if}
{#if showSignInDialog}
  <SignInDialog on:click={closeDialogs} />
{/if}

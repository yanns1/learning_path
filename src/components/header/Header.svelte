<script>
  import learningPathLogoWhite from "../../img/learning_path_logo_white.svg";
  import learningPathLogoBlack from "../../img/learning_path_logo_black.svg";
  import themeIcon from "../../img/icons/theme_icon.svg";
  import accountIcon from "../../img/icons/account_icon.svg";
  import Navbar from "./Navbar.svelte";

  export let dark = false;
  let isLogged = false;
  let activeTab = "Test";
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
  const changeTab = e => {
    activeTab = e.detail;
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
      alt="" />
    <Navbar
      tabs={isLogged ? navTabsIfLoggedIn : navTabsIfLoggedOut}
      {activeTab}
      {tabsColor}
      on:tabChange={changeTab} />
  </div>
  <div class="theme">
    <img src={themeIcon} alt="" />
  </div>
  <div class="intro">Keep track of your learning path !</div>
</header>

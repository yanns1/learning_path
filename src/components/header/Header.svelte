<script>
  import { auth, db } from "../../scripts/init_firebase.js";
  import { userCred, darkTheme } from "../../scripts/stores.js";
  import logo from "../../img/logo.svg";
  import accountIcon from "../../img/icons/account_icon.svg";
  import settingsIcon from "../../img/icons/settings_icon.svg";
  import logoutIcon from "../../img/icons/logout_icon.svg";
  import whiteAccountIcon from "../../img/icons/account_icon_white.svg";
  import whiteSettingsIcon from "../../img/icons/settings_icon_white.svg";
  import whiteLogoutIcon from "../../img/icons/logout_icon_white.svg";
  import Navbar from "./Navbar.svelte";
  import SettingsDialog from "../dialogs/settings/SettingsDialog.svelte";
  import AccountDialog from "../dialogs/AccountDialog.svelte";

  let showSettingsDialog = false;
  let showAccountDialog = false;

  const mql = window.matchMedia("(max-width: 600px)");
  let mobileView = mql.matches;
  mql.addEventListener("change", e => {
    mobileView = e.matches;
  });

  $: tabsColor = $userCred && $darkTheme ? "#F2F2F2" : "#000000";
  $: mobileBg = mobileView
    ? $userCred && $darkTheme
      ? "#292c36"
      : "#767676"
    : "none";

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

  // order matters
  $: navTabs =
    $userCred && $darkTheme
      ? [
          createNavTab("Account", whiteAccountIcon),
          createNavTab("Settings", whiteSettingsIcon),
          createNavTab("Logout", whiteLogoutIcon)
        ]
      : [
          createNavTab("Account", accountIcon),
          createNavTab("Settings", settingsIcon),
          createNavTab("Logout", logoutIcon)
        ];

  // Impure
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

  const toggleTheme = () => {
    const userDocRef = db.collection("users").doc($userCred.uid);

    db.runTransaction(transaction => {
      return transaction.get(userDocRef).then(userDoc => {
        if (userDoc.exists) {
          transaction.update(userDocRef, {
            darkTheme: !userDoc.data().darkTheme
          });
        }
      });
    }).catch(err => {
      console.error(`Error changing theme in db: ${err}`);
    });
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
    grid-area: theme;
    align-self: start;
    justify-self: end;

    & > svg {
      cursor: pointer;
      display: inline-block;
      width: 1.8rem;
      padding: 0.5rem;
      opacity: 0.7;
      &:hover {
        opacity: 1;
      }
    }
  }
  .intro {
    text-align: center;
    color: #333333;
    margin-top: 2rem;
    font-weight: 600;
  }

  header.dark {
    & svg {
      fill: #f2f2f2;
    }
    & .intro {
      color: #f2f2f2;
    }
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

<!-- has to be outside </main> because overlay of dialog needs to have the body has parent -->
{#if showSettingsDialog}
  <SettingsDialog on:closedDialog={() => (showSettingsDialog = false)} />
{/if}
{#if showAccountDialog}
  <AccountDialog on:closedDialog={() => (showAccountDialog = false)} />
{/if}

<header class:dark={$userCred && $darkTheme}>
  <div class="subheader">
    <img class="logo" src={logo} alt="Site logo" />
    {#if $userCred}
      <Navbar
        view={mobileView ? 'mobile' : 'desktop'}
        tabs={navTabs}
        {tabsColor}
        {mobileBg}
        on:tabChange={handleTabChange} />
      <div class="theme">
        <svg
          on:click={toggleTheme}
          role="img"
          aria-hidden="true"
          fill="#000000"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512">
          <title>Theme icon</title>
          <path
            d="M8 256c0 136.966 111.033 248 248 248s248-111.034 248-248S392.966
            8 256 8 8 119.033 8 256zm248 184V72c101.705 0 184 82.311 184 184 0
            101.705-82.311 184-184 184z" />
        </svg>
      </div>
    {/if}
  </div>
  <div class="intro">Keep track of your learning path !</div>
</header>

<script>
  import { userCred, darkTheme } from "../../scripts/stores.js";
</script>

<style lang="scss">
  footer {
    display: none;
  }

  @media (min-width: 600px) {
    footer {
      font-size: 0.7rem;
      min-height: 5vh;
      padding: 1rem 2.5rem;
      display: grid;
      grid-template-rows: repeat(2, 1fr);
      grid-gap: 0.5rem;
      background-color: #c4c4c4;

      &.dark {
        background-color: #292c36;
      }
    }

    a {
      display: inline;
      color: var(--primary-color);
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }

    .github-credit,
    .font-awesome-credit {
      justify-self: end;
    }
  }
</style>

<footer class:dark={$userCred && $darkTheme}>
  <div class="github-credit">
    Made with ❤️ by
    <a
      target="_blank"
      href="https://github.com/yanns1"
      title="My Github account">
      yanns1
    </a>
    . View source code on
    <a
      target="_blank"
      href="https://github.com/yanns1/learning_path"
      title="Github repo for the project">
      Github
    </a>
    .
  </div>
  <div class="font-awesome-credit">
    Font Awesome icons are used in this project. See
    <a
      target="_blank"
      href="https://fontawesome.com/license/free"
      title="Font Awesome Free Licence">
      license
    </a>
    .
  </div>
</footer>

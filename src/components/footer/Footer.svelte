<script>
  export let backgroundColor = "#4B4A54";
</script>

<style lang="scss">
  footer {
    min-height: 5vh;
    padding: 1rem 2rem;
    display: flex;
    flex-flow: column;
    justify-content: center;
  }
  .github-credit,
  .font-awesome-credit {
    padding: 0.5rem 0;
    display: flex;
    justify-content: flex-end;
    & > a {
      color: #329be0;
      padding: 0 0.3rem;
      text-decoration: none;
      opacity: 0.7;
      &:hover {
        opacity: 1;
      }
    }
  }
</style>

<footer style="background-color: {backgroundColor}">
  <div class="github-credit">
    <!-- Laisser tt aligné pour garder les espaces -->
    Made with ❤️ by
    <a
      target="_blank"
      href="https://github.com/yanns1"
      title="My Github account">
      yanns1
    </a>
    - View source code on
    <a
      target="_blank"
      href="https://github.com/yanns1/learning_path"
      title="Github repo for the project">
      Github
    </a>
  </div>
  <div class="font-awesome-credit">
    Font Awesome icons are used in this project: see
    <a
      target="_blank"
      href="https://fontawesome.com/license/free"
      title="Font Awesome Free Licence">
      license
    </a>
  </div>
</footer>

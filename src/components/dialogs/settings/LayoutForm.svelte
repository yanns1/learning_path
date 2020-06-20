<script>
  import changeLayoutSvg from "../../../img/change_layout.svg";
  import { db } from "../../../scripts/init_firebase.js";
  import { userCred, layout, darkTheme } from "../../../scripts/stores.js";
  import Button from "../../shared/Button.svelte";

  let message = {
    error: "",
    success: ""
  };
  const buttonStyles = `
    grid-column: 2 / span 1;
    justify-self: end;
    align-self: center;
  `;

  // Pure
  const isSelect = el => el.tagName === "SELECT";
  const getValue = el => el.value;
  const hasDuplicates = arr => new Set(arr).size !== arr.length;

  // Impure
  const changeLayout = e => {
    message = {
      error: "",
      success: ""
    };
    const form = e.target;
    const newLayout = Array.from(form.elements)
      .filter(isSelect)
      .map(getValue);

    if (hasDuplicates(newLayout)) {
      message.error = "You can't select the same card multiple times !";
    } else {
      // Update in db
      db.collection("users")
        .doc($userCred.uid)
        .update({
          layout: newLayout
        })
        .then(() => {
          message.success = "Layout successfully updated !";
        })
        .catch(err => {
          message.error = `${err}`;
        });
    }
  };
</script>

<style lang="scss">
  h4 {
    font-family: Montserrat-Bold, Montserrat-Regular, sans-serif;
  }

  img {
    display: block;
    width: 4rem;
    margin: 1rem auto;
  }

  .hint {
    font-size: 0.8rem;
    text-align: center;
    margin-bottom: 1rem;
    & > strong {
      font-weight: bold;
    }
  }

  form {
    margin-bottom: 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    row-gap: 0.5rem;
  }

  label {
    font-weight: bold;

    & > select {
      margin: 0 0.3rem;
      width: 70%;
    }
  }

  .message {
    width: 5rem;
    font-size: 0.8rem;
  }

  .error {
    color: red;
  }

  .success {
    color: green;
  }
</style>

<h4
  style={$userCred && $darkTheme ? 'color: #F2F2F2' : 'color: var(--secondary-color)'}>
  Layout
</h4>
<img src={changeLayoutSvg} alt="Layout indications" />
<div
  class="hint"
  style={$userCred && $darkTheme ? 'color: #F2F2F2' : 'color: var(--secondary-color)'}>
  <strong>Hint:</strong>
  You can't select a same card multiple times.
</div>
<form on:submit|preventDefault={changeLayout}>
  {#each $layout as card, i (Math.random())}
    <label for={i + 1}>
      {i + 1}:
      <select id={i + 1}>
        {#each $layout as cardBis, i (Math.random())}
          <option value={cardBis} selected={card === cardBis}>{cardBis}</option>
        {/each}
      </select>
    </label>
  {/each}
  {#if message.success}
    <div class="message success">{message.success}</div>
  {:else if message.error}
    <div class="message error">{message.error}</div>
  {/if}
  <Button styles={buttonStyles}>Apply</Button>
</form>

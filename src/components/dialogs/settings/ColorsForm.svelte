<script>
  import { db } from "../../../scripts/init_firebase.js";
  import {
    userCred,
    prioritiesColors,
    darkTheme
  } from "../../../scripts/stores.js";
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
  const isInput = el => el.tagName === "INPUT";
  const getValue = el => el.value;
  const hasDuplicates = arr => new Set(arr).size !== arr.length;
  const areArraysEqual = (arr1, arr2) =>
    JSON.stringify(arr1) === JSON.stringify(arr2);

  // Impure
  const changeColors = e => {
    message = {
      error: "",
      success: ""
    };
    const form = e.target;
    const newColors = Array.from(form.elements)
      .filter(isInput)
      .map(getValue);

    if (hasDuplicates(newColors)) {
      message.error = "You can't use the same color for multiple priorities !";
    } else {
      if (!areArraysEqual($prioritiesColors, newColors)) {
        // Update in db
        db.collection("users")
          .doc($userCred.uid)
          .update({
            prioritiesColors: newColors
          })
          .then(() => {
            message.success = "Colors successfully updated !";
          })
          .catch(err => {
            message.error = `${err}`;
          });
      }
    }
  };
</script>

<style lang="scss">
  h4 {
    font-family: Montserrat-Bold, Montserrat-Regular, sans-serif;
  }

  form {
    margin: 1rem auto;
  }

  label {
    font-weight: bold;

    & > input {
      cursor: pointer;
      margin-bottom: 0.3rem;
    }
  }

  .wrapper {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
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
  Colors
</h4>
<form on:submit|preventDefault={changeColors}>
  {#each $prioritiesColors as color, i (i)}
    <div class="color-picker">
      <label for="priority{i + 1}-color">
        Priority {i + 1}:
        <input
          type="color"
          id="priority{i + 1}-color"
          name="priority{i + 1}-color"
          value={color} />
      </label>
    </div>
  {/each}
  <div class="wrapper">
    {#if message.success}
      <div class="message success">{message.success}</div>
    {:else if message.error}
      <div class="message error">{message.error}</div>
    {/if}
    <Button styles={buttonStyles}>Apply</Button>
  </div>
</form>

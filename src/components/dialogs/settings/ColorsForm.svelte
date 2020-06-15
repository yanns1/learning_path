<script>
  import { db } from "../../../scripts/init_firebase.js";
  import { userCred, prioritiesColors } from "../../../scripts/stores.js";

  let message = {
    error: "",
    success: ""
  };

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
            message.success = "Priorities colors successfully updated !";
          })
          .catch(err => {
            message.error = `${err}`;
          });
      }
    }
  };
</script>

<style lang="scss">
  .error {
    color: red;
  }
  .success {
    color: green;
  }
</style>

<h4>Choose the priorities colors</h4>
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
  <button>Apply</button>
  {#if message.success}
    <div class="success">{message.success}</div>
  {:else if message.error}
    <div class="error">{message.error}</div>
  {/if}
</form>

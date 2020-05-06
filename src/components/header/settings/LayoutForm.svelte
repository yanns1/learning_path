<script>
  import changeLayoutHint from "../../../img/change_layout.svg";
  import { layout } from "../../../scripts/stores.js";

  let message = {
    error: "",
    success: ""
  };
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
      message.error = "You cannot select the same card multiple times !";
    } else {
      layout.set(newLayout);
      message.success = "Layout successfully updated !";
    }
  };
</script>

<style lang="scss">
  img {
    width: 7rem;
  }
  .error {
    color: red;
  }
  .success {
    color: green;
  }
</style>

<h4>Change the layout</h4>
<img src={changeLayoutHint} alt="Layout indications" />
<div class="hint">Hint: You cannot select a same card multiple times.</div>
<form on:submit|preventDefault={changeLayout}>
  {#each $layout as card, i (i)}
    <label for="place{i + 1}">
      {i + 1}:
      <select id="place{i + 1}">
        {#each $layout as cardBis}
          <option value={cardBis} selected={card === cardBis}>{cardBis}</option>
        {/each}
      </select>
    </label>
  {/each}
  <button>Apply</button>
  {#if message.success}
    <div class="success">{message.success}</div>
  {:else if message.error}
    <div class="error">{message.error}</div>
  {/if}
</form>

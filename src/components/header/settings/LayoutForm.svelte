<script>
  import changeLayoutSvg from "../../../img/change_layout.svg";
  import { db } from "../../../scripts/init_firebase.js";
  import { userCred, layout } from "../../../scripts/stores.js";

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
    const form = e.target;
    const newLayout = Array.from(form.elements)
      .filter(isSelect)
      .map(getValue);

    if (hasDuplicates(newLayout)) {
      message.error = "You cannot select the same card multiple times !";
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
<img src={changeLayoutSvg} alt="Layout indications" />
<div class="hint">Hint: You cannot select a same card multiple times.</div>
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
  <button>Apply</button>
  {#if message.success}
    <div class="success">{message.success}</div>
  {:else if message.error}
    <div class="error">{message.error}</div>
  {/if}
</form>

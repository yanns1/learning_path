<script>
  import Dialog from "../../shared/Dialog.svelte";
  import LayoutForm from "./LayoutForm.svelte";
  import ColorsForm from "./ColorsForm.svelte";
  import { userCred, darkTheme } from "../../../scripts/stores.js";
</script>

<style lang="scss">
  h3 {
    color: var(--primary-color);
    text-transform: uppercase;
    font-size: 1.2rem;
    font-family: Montserrat-Bold, Montserrat-Regular, sans-serif;
    margin-bottom: 1.5rem;
  }
</style>

<Dialog
  dialogBg={$userCred && $darkTheme ? '#292C36' : '#ffffff'}
  on:closedDialog>
  <h3>Settings</h3>
  <LayoutForm />
  <ColorsForm />
</Dialog>

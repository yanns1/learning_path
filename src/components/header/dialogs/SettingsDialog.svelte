<script>
  import Dialog from "../../shared/Dialog.svelte";
  import LayoutForm from "../settings/LayoutForm.svelte";
  import PrioritiesColorsForm from "../settings/PrioritiesColorsForm.svelte";
</script>

<style lang="scss">

</style>

<Dialog on:click>
  <h3>Settings</h3>
  <LayoutForm />
  <PrioritiesColorsForm />
</Dialog>

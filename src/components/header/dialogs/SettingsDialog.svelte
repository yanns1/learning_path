<script>
  import Dialog from "../../shared/Dialog.svelte";
  import LayoutForm from "../settings/LayoutForm.svelte";
  import ColorsForm from "../settings/ColorsForm.svelte";
</script>

<style lang="scss">

</style>

<Dialog on:closedDialog>
  <h3>Settings</h3>
  <LayoutForm />
  <ColorsForm />
</Dialog>

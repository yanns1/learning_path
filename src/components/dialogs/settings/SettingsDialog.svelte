<script>
  import Dialog from "../../shared/Dialog.svelte";
  import LayoutForm from "./LayoutForm.svelte";
  import ColorsForm from "./ColorsForm.svelte";
</script>

<style lang="scss">

</style>

<Dialog on:closedDialog>
  <h3>Settings</h3>
  <LayoutForm />
  <ColorsForm />
</Dialog>

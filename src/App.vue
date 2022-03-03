<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" class="mb-4">
    <PortsTable />
  </div>
</template>

<script>
import PortsTable from "./components/PortsTable.vue";

export default {
  name: "App",
  components: {
    PortsTable,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
</style>

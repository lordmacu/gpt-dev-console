<template>
  <div id="app" class="d-flex flex-column vh-100">
    <Entry msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import Entry from './components/Entry.vue'

export default {
  name: 'App',
  components: {
    Entry
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 20px;

  
  
}
</style>

 
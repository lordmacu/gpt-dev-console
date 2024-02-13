<template>
  <div class="container-fluid d-flex flex-column full-height">
    <b-row class="flex-grow-1">
      <b-col cols="2">
        <Logo />
        <Menu />
      </b-col>
      <b-col class="flex-grow-1 d-flex flex-column chat-container">
        <router-view/>
      </b-col>
    </b-row>
  </div>
</template>

<script>
 
import Menu from './Menu.vue'
import Logo from './Logo.vue'

export default {
  name: 'HomeComponent',
  components: {
    Menu,
    Logo
  },

};
</script>

<style>
.full-height {
  height: 100vh;
  /* Esto asegura que el contenedor principal tome toda la altura de la ventana */
}

.chat-container,
.chat-content {
  overflow: hidden;
}

.chat-content {
  overflow: hidden;
  padding: 0px !important;
}

.chat-history{
  padding-left: 20px;
    padding-right: 20px;
}
</style>

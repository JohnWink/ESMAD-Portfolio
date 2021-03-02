<template>
  <v-app>
    <link href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" rel="stylesheet">
    <v-content transition="slide-x-transition">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: "App",

  components: {
  
  },

  data: () => ({
    //
  }),

  beforeCreate(){
    this.$store.commit("initializeStore")
  }
};
</script>


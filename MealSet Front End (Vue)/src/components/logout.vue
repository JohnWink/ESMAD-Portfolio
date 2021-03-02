<template>
<div class="logout">
    <v-btn
        large
        rounded color="#5C6BC0" 
        dark
        @click="submit"
    >Logout</v-btn>
</div>
</template>

<script>
export default {
    name: "logout",

    methods:{
    submit(){
      this.$store.commit("LOGOUT"),
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style>

</style>
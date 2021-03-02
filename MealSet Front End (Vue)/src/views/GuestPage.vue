<template>
  <div class="guestPage">
    <v-row align="center" justify="center">
      <v-img max-height="100%" max-width="100%"
        src="../assets/landingpage.png" 
      >
        <v-row align="start" justify="center">
          <!-- ++++++++++++++++++++++++++++++++++Registration dialog box+++++++++++++++++++++++++++++++-->

          <v-col md="1" offset-sm="9">
            <registration/>
          </v-col>
          <!--Login Button to pop up modal   !-->
          <v-col md="2">
            <login/>
          </v-col>
          
        </v-row>
        <v-row>
          <v-col>
            <p
              style="margin-top: 15%"
              id="header-text1"
              class="display-4 font-weight-bold white--text text-center"
            >Bem vindo ao MealSet!</p>
            <p
              id="header-text2" style="margin-top: 15%"
              class="headline font-weight-bold black--text text-center"
            >Começa já a utilizar a nossa aplicação</p>
          </v-col>
        </v-row>
      </v-img>
    </v-row>
    <guestPageContent/>
    <v-spacer></v-spacer>
    <footerVue/>
  </div>
</template>

<style>
#header-text1 {
  text-shadow: 1px 1px 14px gray ;
}
#header-text2 {
  text-shadow: 0px 0px 20px gray ;
}


</style>

<script>
import footerVue from "@/components/footerVue.vue";
import registration from "@/components/registration.vue";
import login from "@/components/login.vue";
import guestPageContent from "@/components/guestPageContent.vue";

export default {
  name: "guestPage",
  components: {
    footerVue,
    registration,
    login,
    guestPageContent
  },
  data: () => ({})
};
</script>
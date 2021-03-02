<template>
  <div class="navBar">
    <!--++++++++++++++++++++++++++++++++++++Retracted NavBar+++++++++++++++++++++++++++++-->

    <v-navigation-drawer
      fixed
      height="100%"
      v-model="drawer"
      :mini-variant="mini"
      permanent
      color="#5C6BC0"
    >
      <template v-slot:prepend>
        <v-list>
          <v-list-item class="logoColor">
              <v-img
                max-height="49"
                max-width="49"
                position="center"
                src="../assets/icon_V2_logo2_white.png"
              ></v-img>
          </v-list-item>
        </v-list>
      </template>

      <v-list>
        <div v-if="this.restauView == false">
          <router-link to="/landingPage">
            <v-tooltip  right>
              <template v-slot:activator="{ on }">
                <v-list-item link v-on="on">
                  <v-list-item-icon>
                  
                      <v-icon>fas fa-store</v-icon>
                    
                  </v-list-item-icon>

                  <v-list-item-title>Restaurantes</v-list-item-title>
                </v-list-item>
              </template>
              <span>Restaurantes</span>
            </v-tooltip>
          </router-link>
        </div>

        <div v-if="this.restauView == false">
          <router-link to="/DishesPage">
            <v-tooltip  right>
              <template v-slot:activator="{ on }">
                <v-list-item link v-on="on">
                  <v-list-item-icon>                    
                    <v-icon>fas fa-utensils</v-icon>
                    
                  </v-list-item-icon>

                  <v-list-item-title>Pratos</v-list-item-title>
                </v-list-item>
              </template>
              <span>Pratos</span>
            </v-tooltip>
          </router-link>
        </div>

        <div v-if="this.adminView == true">
          <router-link to="/restaurantManager">
            <v-tooltip  right>
              <template v-slot:activator="{ on }">
                <v-list-item link v-on="on">
                  <v-list-item-icon>
                    
                      <v-icon>fas fa-user-shield</v-icon>
                    
                  </v-list-item-icon>
                  <v-list-item-title>Manager de restaurantes</v-list-item-title>
                </v-list-item>
              </template>
              <span>Manager de restaurantes</span>
            </v-tooltip>
          </router-link>
        </div>

        <!--------UserRestanrant page-->
        <div v-if="this.restauView == true">
          <router-link to="/userRestaurantPage" >
            <v-tooltip   right>
              <template v-slot:activator="{ on }">
                <v-list-item link v-on="on">
                  <v-list-item-icon>  
                      <v-icon>fas fa-th-list</v-icon> 
                    
                  </v-list-item-icon>
                  <v-list-item-title>Manager de Reservas e Pratos</v-list-item-title>
                </v-list-item>
              </template>
              <span>Manager de Reservas e Pratos</span>
            </v-tooltip>
          </router-link>
        </div>

        <!---the restaurants public page--->
        <div v-if="this.restauView == true">
          <router-link :to="{name:'restaurant', params:{id: idNumber  }}">
            <v-tooltip   right>
              <template v-slot:activator="{ on }">
                <v-list-item link v-on="on">
                  <v-list-item-icon>
                      <v-icon>fas fa-utensils</v-icon> 
                    
                  </v-list-item-icon>
                  <v-list-item-title>Pagina do Restaurante</v-list-item-title>
                </v-list-item>
              </template>
              <span>Pagina do Restaurante</span>
            </v-tooltip>
          </router-link>
        </div>

        <!----Notification/message page button---->

        <div v-if="this.restauView == false">
          <router-link to="/notificationPage" >
            <v-tooltip   right>
              <template v-slot:activator="{ on }">
                <v-list-item link v-on="on">
                  <v-list-item-icon>
                      <v-icon :color="messages" large>mdi-email</v-icon>
                      
                  </v-list-item-icon>
                  <v-list-item-title>Manager de Reservas e Pratos</v-list-item-title>
                </v-list-item>
              </template>
              <span>Manager de Reservas e Pratos</span>
            </v-tooltip>
          </router-link>
        </div>


        


      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "navBar",

  data: () => ({
    drawer: true,
    items: [
      { title: "Home", icon: "mdi-home-city" },
      { title: "My Account", icon: "mdi-account" },
      { title: "Users", icon: "mdi-account-group-outline" }
    ],
    mini: true,
    adminView: false ,
    restauView: false,
    idNumber: 0,
    messages: "",
    newMessages: false
    




  }),

  created(){
    this.adminView = this.$store.getters.getLoggedAdmin
    this.restauView = this.$store.getters.getLoggedUserRestaurantType
    
  },

  beforeMount(){
    this.idNumber = this.$store.getters.getLoggedUserRestaurant

    //check if teres any non read notifications 
    this.newMessages = this.$store.getters.getNotificationRead
    if(this.newMessages === true){
      this.messages ="white"
    }


  }





};
</script>

<style>
.logoColor {
  background-color: #f7c23e;
}
.navBar {
  top: 0px;
}
</style>
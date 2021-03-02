
<template>
  <div class="DishesPage">
    <v-row align="center" justify="center">
      <v-img
        src="../assets/landingPageImg.jpg"
        class="grey lighten-3"
        max-height="300px"
        gradient="to top right, rgba(100,115,201,.19), rgba(25,32,72,.5)"
      >
        <!-- ++++++++++++++++++++++++++++++++++registration, logn, search bar componets+++++++++++++++++++++++++++++++-->
        <v-row align="start" justify="center">
          <v-col md="1">
            <navBar/>
          </v-col>

          <v-col md="1" offset-sm="8">
              <perfil/>
          </v-col>

          <v-col md="1">
            <logout/>
          </v-col>
        </v-row>
        <!--++++++++++++++++Information tittle, adress, and reservation button++++++++++++++++++++++++++++++++ -->
        <v-row class="pl-12 ml-12">
          <!--add a mustache data to identify the size-->
          <p
            id="header-text1"
            class="font-weight-bold white--text text-center"
            :style="fontsize"
          >Pratos</p>
        </v-row>
      </v-img>
    </v-row>
    <v-row class="pl-12 ml-12 mt-2">
      <v-col cols="10" sm="8">
        <v-textarea
        v-model="search"
          class="mx-2 mt-10"
          prepend-icon="fas fa-search"
          label="Pesquisa"
          rows="1"
          auto-grow
          clearable
          single-line
          color="#5C6BC0"
        ></v-textarea>
      </v-col>
      <v-col cols="10" sm="3">
        <v-overflow-btn class="mt-10 ml-4" color="#5C6BC0" block :items="filters" v-model="filterValue" label="Filtros"></v-overflow-btn>
      </v-col>
    </v-row>

    <!--RECOMENDAÇÃO DE PRATOS-->
    <div>
      <v-row class="mx-2" justify="center" align="center">
        <v-col class="mb-2" cols="12" sm="6" md="4" v-for="dish in getSearchedDishes" :key="dish.id">
          <DishesCards v-bind:dish="dish"/>
        </v-col>
      </v-row>
    </div>

    

    <footerVue/>
  </div>
</template>

<style>
#header-text1 {
  text-shadow: 1px 1px 14px black;
  margin-left: 4%;
  margin-top: 5%;
}
</style>

<script>
import NavBar from "@/components/navBar.vue";
import footerVue from "@/components/footerVue.vue";
import DishesCards from "@/components/DishesCards.vue";
import Logout from "@/components/logout.vue";
import perfil from "@/components/perfil.vue";

export default {
  name: "DishesPage",
  props: ["dish"],

  components: {
    NavBar,
    footerVue,
    DishesCards,
    Logout,
    perfil
  },
  data: () => ({
    filters: ["Peixe", "Carne", "Vegetariano","Todos"],
    dishes: [],
    fontsize: " ",
    search:"",
    filterValue:''
  }),
  beforeMount() {
    this.dishes = this.$store.getters.getDishes;
  },
  created() {
    window.addEventListener("resize", this.mobileAjust);
    this.mobileAjust();
  },

  computed: {
   
    getSearchedDishes(){
      
      if(this.filterValue!= ""){
        if(this.filterValue =="Todos"){
          return this.dishes.filter(dish =>{
            return dish.name.toLowerCase().includes(this.search.toLowerCase())
             })
        }else{
        return this.dishes.filter(dish =>{
          if(dish.tag == this.filterValue){
            return dish.name.toLowerCase().includes(this.search.toLowerCase())
          }
        })
        }
      }else{
         return this.dishes.filter(dish => {
          return dish.name.toLowerCase().includes(this.search.toLowerCase())
        })
      }
     
    }
  },
  methods: {
    mobileAjust() {
      let cssLine = "font-size:400%;";
      if (window.innerWidth < 600) {
        cssLine += "font-size:280%;";

        if (window.innerWidth < 400) {
          cssLine = "font-size:230%;";
        }
      }

      this.fontsize = cssLine;
    }
  }
};
</script>

<template>
  <div class="landingPage">
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
            <navBar />
          </v-col>

          <v-col md="1" offset-sm="8">
            <perfil />
          </v-col>

          <v-col md="1">
            <logout />
          </v-col>
        </v-row>
        <!--++++++++++++++++Information tittle, adress, and reservation button++++++++++++++++++++++++++++++++ -->
        <v-row class="pl-12 ml-12">
          <!--add a mustache data to identify the size-->
          <p
            id="header-text1"
            class="font-weight-bold white--text text-center"
            :style="fontsize"
          >Restaurantes</p>
        </v-row>
      </v-img>
    </v-row>
    <v-row class="pl-12 ml-12 mt-2">
      <v-col cols="10" sm="8">
        <!--Barra de pesquisa de restaurantes-->
        <v-textarea
          class="mx-2 mt-10"
          v-model="search"
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
        <v-overflow-btn
          class="mt-10 ml-4"
          color="#5C6BC0"
          block
          :items="filters"
          label="Filtros"
          v-model="filterValue"
        ></v-overflow-btn>
      </v-col>
    </v-row>

    <!--RECOMENDAÇÃO DE RESTAURANTES-->
    <br />
    <br />

    <div>
      <v-row class="mx-2" justify="center" align="center">
        <v-col
          class="mb-2"
          cols="12"
          sm="6"
          md="4"
          v-for="restaurant in sortedRestaurants"
          :key="restaurant.id"
        >
          <RestaurantCards v-bind:restaurant="restaurant" />
        </v-col>
      </v-row>
    </div>
    <footerVue />
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
import RestaurantCards from "@/components/RestaurantCards.vue";
import Logout from "@/components/logout.vue";
import perfil from "@/components/perfil.vue";

export default {
  name: "landingPage",

  components: {
    NavBar,
    footerVue,
    RestaurantCards,
    Logout,
    perfil
  },
  data: () => ({
    //filters: ["Melhor Rating", "Mais Perto", "Peixe", "Carne", "Vegetariano"],
    filters: ["Melhor Rating", "De A a Z"],
    restaurants: [],
    fontsize: " ",
    searchValue: "",
    filterValue: "",
    search: "",
    distance: "",
    travelDuration: "",
    currentRestaurantId: ""
  }),

  created() {
    this.restaurants = this.$store.getters.getRestaurants;
    this.getCurrentLocation();

    window.addEventListener("resize", this.mobileAjust);
    this.mobileAjust();
  },

  computed: {
    sortedRestaurants() {
      if (this.filterValue == "Melhor Rating") {
        this.$store.getters.getRestaurantsByRating;
      } else if (this.filterValue == "De A a Z") {
        this.$store.getters.getRestaurantByAlphOrder;
      } else {
        this.$store.getters.getRestaurantsById;
      }
      if (this.search != "") {
        return this.restaurants.filter(restaurant => {
          return restaurant.name
            .toLowerCase()
            .includes(this.search.toLowerCase());
        });
      } else {
        return this.restaurants;
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
    },

    sortRestaurantByRatingMethod(a, b) {
      const ratingA = a.evaluation;
      const ratingB = b.evaluation;

      if (ratingA > ratingB) return -1;
      if (ratingB > ratingA) return 1;

      return 0;
    },

    getCurrentLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(position => {
          const myPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.$store.commit("ADD_CURRENT_LOCATION", {
            location: myPos
          });
        });
      } else {
        alert("error on navigator");
      }
    },

    /*
calcDistance(){

    
  this.restaurants = this.$store.getters.getRestaurants;
  let destinationArray = []
  this.distance = []
  this.travelDuration = []

  this.restaurants.forEach(restaurant => {
    destinationArray.push(restaurant.location)
  });

  let myPos = this.$store.getters.getLoggedUserLocation;
  
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
    {
      origins: [myPos],
      destinations: destinationArray,
      travelMode: 'DRIVING',
    }, callback);

    function callback(response, status) {
      if (status == 'OK') {
        var origins = response.originAddresses;
        //var destinations = response.destinationAddresses;
        for (var i = 0; i < origins.length; i++) {
          var results = response.rows[i].elements;
          for (var j = 0; j < results.length; j++) {

            

            var element = results[j];
            var distance = element.distance.value
            var travelDuration = element.duration.value
           this.currentRestaurantId = j
           this.distance = distance
           this.travelDuration = travelDuration
           //this.inputGeoData()
          

           
      }
    }
  }else{
     alert('Geocode was not successful for the following reason: ' + status);
  }


}

alert(service.DistanceMatrixResponse.rows[0].elements[1] .distance.value)

function afterCallBack(restaurantId,distanceValue,travelDurationValue){
  this.$store.commit("SET_RESTAURANT_DISTANCE", {
          id: restaurantId,
          distance : distanceValue,
          travelDuration: travelDurationValue,
        });
        
}



    
  
      -----------------------------Halted idea of single geolocation travel------------------------
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
 
      let myPos = this.$store.getters.getLoggedUserLocation;
    this.restaurants.forEach(function(restaurant){

    

    
          const request = {
            origin: myPos,
            destination: restaurant.location,
            travelMode:google.maps.TravelMode["DRIVING"]
          }

          directionsService.route(request,(result,status)=>{

            if(status =='OK'){

              directionsRenderer.setDirections(result);
              
              const directionsData = result.routes[0].legs[0];

              if(directionsData){
                this.distance =  directionsData.distance.Value
                //this.travelDuration = JSON.stringify(result.routes[0].legs[0].directionsData.duration.text)

                this.$store.commit("SET_RESTAURANT_DISTANCE",{
                  id: this.restaurant.id,
                  distance: this.distance,
                  travelDuration: this.travelDuration
                })
                }else{
                alert('error on directions data')
              }

              
            }else{
              alert('Geocode was not successful for the following reason: ' + status);
            }
            
          })

        })

        
    
  
    },
-------------------------------------Commit undefined---------------------------
    inputGeoData(){
      this.$store.commit("SET_RESTAURANT_DISTANCE", {
          id: this.currentRestaurantId,
          distance : this.distance,
          travelDuration: this.travelDuration,
        });

    },
  
      
  },

  */

    beforeMount() {
      //this.calcDistance()
    }
  }
};
</script>
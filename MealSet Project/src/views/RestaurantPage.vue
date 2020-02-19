<template>
  <div class="restaurantPage">
    <v-row align="center" justify="center">
      <v-img :src="restaurant.coverImg" class="grey lighten-3" max-height="380px" gradient="to top right, rgba(100,115,201,.19), rgba(25,32,72,.5)">
        
        <!-- ++++++++++++++++++++++++++++++++++++++registration, logn, search bar componets+++++++++++++++++++++++++++++++-->
        <v-col cols="12">
          <v-row align="start" justify="center">
            
            <v-col cols="5" sm="8">
              <navBar />
            </v-col>

            <v-col cols="3" sm="2">
            <!--add edit restaurant data button here-->
              <editPage v-if="this.userRest === true" v-bind:restaurant="restaurant"/>              
            </v-col>

            <v-col cols="4" sm="2">
              <logout/>
            </v-col>
          </v-row>
        </v-col>
        
        <!-- +++++++++++++++++++++++++++Information tittle, adress, and reservation button++++++++++++++++++++++++++++++++ -->
        <v-col cols="12">
          <v-row class="pl-12 ml-12" justify="center" >

            <v-col class="text-left mx-4">
              <!--add a mustache data to identify the size-->
              <p id="header-text" class="font-weight-bold white--text" :style="fontsize">{{restaurant.name}}</p>
              <p id="header-text" class="font-weight-bold white--text" style="font-size:135%">{{restaurant.location}}</p>


              <!--Make a conponent of this button-->
                <reservation v-if="this.userRest === false" />
            </v-col>
            

          </v-row>
        </v-col>
        
       </v-img>

    </v-row>

    <!-- ++++++++++++++++++++++++   RESTAURANT PAGE INFORMATION AND MAP   ++++++++++++++++++++++++++++-->
    <v-container>
      <div class="pl-9 ml-9 py-4" >
        <!--INformation collum-->
        <v-card id="cards" elevation="5" class="pa-2">
          <v-row class="pa-4" justify="space-between">

            <v-col cols="12" md="6"  class="text-left">
            
              <v-img contain=true max-height="150px" :src="restaurant.logo" ></v-img>
              <br><br>
              <p class="headline font-weight-bold ">Informação</p><br>

              <p class="caption  font-weight-bold ">DESCRIÇÃO: {{restaurant.description}}</p><br>
              <p class="caption  font-weight-bold " v-if="restaurant.outDoor == true">COM ESPLANADA</p><br>
              <p class="caption  font-weight-bold " v-if="restaurant.parking == true">COM PARQUE DE ESTACIONAMENTO</p><br>
              <p class="caption  font-weight-bold ">TEMPO MÉDIO DE ESPERA: {{restaurant.mediumWaitingTime}} minutos</p><br>
            

              

            </v-col>



            <!--Google Maps API box-->        
            <v-col cols="12" md="6" >
              <p class="headline font-weight-bold ">Localização do restaurante <v-btn right @click="distanceCalc()" large rounded color="#f7c23e" dark v-on="on">Calcular Distância </v-btn></p><br>
              <!--temp place holder for the actually thing-->
              <div id="googleMap"  style="width:100%;min-height:400px;border: solid indigo ;border-radius: 12px"></div>
              
            </v-col>
          </v-row>
          
        </v-card>

      </div>
    </v-container>


    <!-- ++++++++++++++++++++++++++++++ row card MENU +++++++++++++++++++++++++++++++++++++++++++++++-->
    <!-- make sure that from md to large it shows 3 cards; lower will only show a card-->
    <v-container >      
      <v-row class="pl-9 ml-9 py-2" justify="space-between" align="center" >
        <v-col cols="12" sm="5">
          <div v-if ="checkRecommentedDishes == true">
          <p class=" headline font-weight-bold " >Pratos Recomendados</p><br>
          </div>
        </v-col>
        <v-col cols="12" sm="3">
    <!-----------Menu Modal button------------------>
          <v-dialog v-model="dialog"  max-width="900px">
            <template v-slot:activator="{ on }">
              <v-btn large rounded color="#f7c23e" dark v-on="on">Mostar Menu </v-btn>
            </template>

            <!--CARd of the menus v-for cycle-->
            <v-container class="white darken-2">
              <v-row justify="center" class="headline font-weight-bold">Menu</v-row>
                <v-row align="center" justify="center">
                    
                    <v-col cols="12"  v-for="dish in menu" :key="dish">
                      
                      <restaurantMenu v-if="dish.restaurantId === restaurant.id " v-bind:dish="dish" />

                    </v-col>
                </v-row>        
        
            </v-container>
    
            </v-dialog>



          </v-col>    
        </v-row>
        <div v-if ="checkRecommentedDishes == true">
        <v-row  class="pl-9 ml-9 py-6" justify="center" >
          <v-col cols="10" > 
            <!--RECOMENDAÇÃO DE PRATOS-->
            <v-carousel  hide-delimiters :height="this.compHeight">
              <div v-for="dish in menu" :key="dish">
                <v-carousel-item v-if="dish.restaurantId === restaurant.id && dish.recommended === true">
                  <RestaurantCards v-bind:dish="dish" />
                </v-carousel-item>
              </div>
            </v-carousel>     
          </v-col>    
        </v-row>
        </div>

    </v-container>

<!-- +++++++++++++++++++++++++++++++++EVALUATION COMMNENTS SECTION+++++++++++++++++++++++++++++++ -->
    <v-container >       
      
      <v-row class="pl-12 ml-12 py-3" justify="start" align="center" > 

        <v-container>
          <!-- comment tittle and rating   ----rating needs to be calculated acording to the comments evaluation calculation  -->     
          <v-row  justify="space-between" align="center" >
              <v-col cols="7" class="title" >
                  <p>Avaliações do restaurante</p>
              </v-col>
              <v-col cols="2" sm="1" class=" title font-weight-bold" >
                  <v-icon medium color="yellow darken-1">fas fa-star</v-icon>
                  {{restaurant.evaluation}}/5 <!-- Will need to turn this in to a {{Totalrate}}-->
              </v-col>  

          </v-row>

          <v-row  v-for="comment in comments" :key="comment.id"  >      
          
            <commentReview v-if="comment.restaurantId === restaurant.id" v-bind:comment="comment"/>  
          </v-row> 
        </v-container> 
           
      </v-row>

      <v-row class="pl-12 ml-12 py-3" justify="start" align="center" >
        <commentAdd v-if="this.userRest === false" />
      </v-row>
      


    </v-container>
      


    <footerVue />
  </div>
</template>


<style>
#header-text{
  text-shadow: 2px 2px 3px black ;
}
#cards {
  border-radius: 20px;
}
</style>

<script>
//Import componets of the page
import NavBar from "@/components/navBar.vue";
import footerVue from "@/components/footerVue.vue";
import RestaurantCards from "@/components/restaurantPlateCard.vue"
import commentReview from "@/components/commentReview.vue"
import commentAdd from "@/components/commentADD.vue"
import Logout from "@/components/logout.vue";
import restaurantMenu from"@/components/RestaurantMenu.vue"
import reservation from "@/components/Reservation.vue"
import editPage from "@/components/EditRestaurant.vue"

 



export default {
  name: "restaurantPage",
  components: {
    NavBar,
    footerVue,
    Logout,
    RestaurantCards,
    commentReview,
    commentAdd,
    restaurantMenu,
    reservation,
    editPage
  },
  data: () => ({
    checker:"border: solid indigo",
    fontsize: " ",
    restaurants: [],
    map:"",
    compHeight: "",
    userRest: false,
    return:{
          dialog: false
      },

      menu:[],
      comments: [],
      menuCount: 0
      
  }),

   computed:{
    restaurant(){
      return this.$store.getters.restaurantInfo(parseInt(this.$route.params.id));
    },
    checkRecommentedDishes(){
      let existRecommended = false
      var restaurant = this.$store.getters.restaurantInfo(parseInt(this.$route.params.id));
 
   
        this.menu.forEach(dish =>{
        if(dish.restaurantId === restaurant.id && dish.recommended === true){
          
             
            existRecommended = true
            
          
        }
       
      })

      return existRecommended
    }
  
    

  },
  methods:{

    // this is a place holder for google maps api
      iniMap(){
      this.map = new google.maps.Map(document.querySelector("#googleMap"),{
        center:{lat: -34.397, lng: 150.644},
        zoom:15,
        disableDefaultUI: true,
      });
      


      const geocoder = new google.maps.Geocoder();

      //this.geocodeAdress(geocoder,this.map)
     

      let restaurant = this.$store.getters.restaurantInfo(parseInt(this.$route.params.id));
      const address = restaurant.location;

      geocoder.geocode({'address': address},
      (results,status)=>{
        if(status ==='OK'){
          this.map.setCenter(results[0].geometry.location);
            const marker = new google.maps.Marker({
            map:this.map,
            position:results[0].geometry.location
          });
          marker.setMap(this.map);
        }else{
          //alert('Geocode was not successful for the following reason: ' + status);
          this.$fire({
            title: "Geocode was not successful for the following reason: " + status,          
            type: "error",
            confirmButtonText: "ok"
          })
        }
      })

    },

    distanceCalc(){
    let restaurant = this.$store.getters.restaurantInfo(parseInt(this.$route.params.id));
      

          const directionsService = new google.maps.DirectionsService();
          const directionsRenderer = new google.maps.DirectionsRenderer();
        
          let myPos = this.$store.getters.getLoggedUserLocation;
        
          directionsRenderer.setMap(this.map)
           this.map.setCenter(myPos);
           
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

                  this.distance = directionsData.distance.text,
                  this.travelDuration = directionsData.duration.text

                  

                  }else{
                  //alert('error on directions data')
                  this.$fire({
                    title: "error on directions data ",          
                    type: "error",
                    confirmButtonText: "ok"
                  })
                  
                }

                
              }else{
                //alert('Geocode was not successful for the following reason: ' + status);
                this.$fire({
                    title: "Geocode was not successful for the following reason: " + status,          
                    type: "error",
                    confirmButtonText: "ok"
                  })
              }
              
            })

    },
          
        


    
 
    //method to ajust the css font size for xs devices, handset
    mobileAjust(){
      let cssLine = "font-size:400%;"
      let heightSize = "310px"
      if(window.innerWidth < 600){
        
        cssLine += "font-size:280%;"
        heightSize = "470px"
        
      }
      this.fontsize = cssLine;
      this.compHeight = heightSize;
    },
    totalrate: function(){
            let totalscore = 0
            for (let i =0;i<this.comments.length;i++){
                totalscore += this.comments[i].evaluation
            }

            totalscore = totalscore / this.comments.length;
            totalscore = Math.round(totalscore);

            if(totalscore >5){
                totalscore = 5;
            }

            return totalscore

        }

    
  },

 
  created() {
    window.addEventListener('resize', this.mobileAjust);
    this.mobileAjust();
    this.restaurants  = this.$store.getters.getRestaurants;

    this.menu = this.$store.getters.getDishes;
    this.userRest = this.$store.state.loggedUser[0].restaurantUser;
    
    
    
  
  },
  destroyed() {
    window.removeEventListener('resize', this.mobileAjust)
  },

  mounted(){
  this.iniMap();
  },

  beforeMount() {
    this.comments = this.$store.getters.getComments;
  }
   
};

</script>




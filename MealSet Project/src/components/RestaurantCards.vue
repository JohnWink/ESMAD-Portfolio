<template>
  <div class="pl-12 ml-12 mr-2">
    <v-hover v-slot:default="{ hover }" open-delay="200">
        <router-link :to="{name:'restaurant', params:{id: restaurant.id}}">
        <v-card          
          class="mx-auto cards"
          max-height="400"
          max-width="500"
          :elevation="hover ? 16 : 2"
        >
          <v-img max-width =  "500px" max-height = "250px" :src="restaurant.coverImg"></v-img>
          <v-row class="mb-7 mx-2">
            <v-col class="text-left">
              <v-title class="ml-5 font-weight-bold nameTitle" >{{ restaurant.name }}</v-title>

              <p> <i class="fas fa-edit mt-3"></i> {{restaurant.description}} </p>
     
              <!--
              <p class="ps">
                <i class="fas fa-map-marker-alt" ></i>
                {{distance}} de si 
                <br>
                <i class="fas fa-car"></i>
                {{travelDuration}}
              </p>
              -->
            </v-col>
            <v-col class="text-right">
              <p style="margin-right: 25px; margin-top: 10%" class="font-weight-bold">
                {{ restaurant.evaluation }}
                <v-icon medium color="yellow darken-1">fas fa-star</v-icon>
              </p>
            </v-col>
          </v-row>
        </v-card>
      </router-link>
    </v-hover>
  </div>
</template>

<style>

 a{
    text-decoration: none;
  }

.cards {
  border-radius: 20px;
}

/*#cardsImg {
  max-width: 500px;
  max-height: 250px;
}
*/

.nameTitle {
  font-size: 20px;
  margin-left: 3%;
  margin-top: 2%;
}

.title {
  font-size: 30px;
  margin-left: 3%;
}

.titles2 {
  font-size: 30px;
  margin-left: 3%;
  margin-top: 8%;
}

.ps {
  margin-left: 21px;
  font-size: 13px;
  margin-top: 1%;
}
</style>

<script>
export default {
  name: "RestaurantCards",

  props: ["restaurant"],
  
  data: () => ({
    checker: "border: solid red",
    distance:'',
    travelDuration:'',
    map:"",
    myPos:'',
    distanceValue:''
 
  }),

  methods:{
    /*
     calcDistance(){
      
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      let restaurant = this.$store.getters.restaurantInfo(this.restaurant.id);
      let myPos = this.$store.getters.getLoggedUserLocation;
    
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
              alert('error on directions data')
            }

            
          }else{
            alert('Geocode was not successful for the following reason: ' + status);
          }
           
        })

        
    
  
    }
    */
    
  },

  mounted(){
    //this.calcDistance()
   
  }
  

};
</script>
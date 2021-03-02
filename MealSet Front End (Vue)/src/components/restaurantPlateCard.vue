<template> 
  <v-card border-radius= "20px" class="mx-auto indigo" elevation="8"  max-width="600px">

      <v-row class="mx-2" >
        <v-col cols="12" sm="7">
          <v-img  max-width="300px" :src="dish.img" ></v-img>
        </v-col>                                 

        <v-col cols="12" sm="5">
          <p class="title font-weight-bold" >{{ dish.name }}</p>
          <p >{{ dish.description }} </p>
          <p style="margin-right: 25px;" class="font-weight-bold" >
            {{ dish.evaluation }}
            <v-icon medium color="yellow darken-1">fas fa-star</v-icon>
          </p>
          <v-chip color="#f7c23e" class=""> {{dish.tag}} </v-chip>
        </v-col> 
        
      </v-row>
      
    
  </v-card>  
</template>

<script>
export default {
  name: "RestaurantCards",
  props:["dish"],
  data: () => ({
    
    
    
    
  }),
  methods:{    
    //method to ajust the css font size for xs devices, handset
    mobileAjust(){
      let heightSize = "310px"
      if(window.innerWidth < 770){
        
        heightSize = "470px"
        
      }
      this.compHeight = heightSize;
    }
  },
  created() {
    window.addEventListener('resize', this.mobileAjust)
    this.mobileAjust();
  },
  destroyed() {
    window.removeEventListener('resize', this.mobileAjust)
  }
   
};

</script>
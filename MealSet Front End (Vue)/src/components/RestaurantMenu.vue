<template>
  
  <div class="mx-3">

    <v-row align="center" justify="space-between"  >

      <v-col cols="12" class="title font-weight-bold">
        {{dish.name}}
      </v-col>

      <v-col cols="4" sm="3" >
        {{ dish.evaluation }}
        <v-icon medium color="yellow darken-1">fas fa-star</v-icon>
      </v-col>

      <v-col cols="4" sm="3">
        <v-chip color="#f7c23e" dark> {{dish.tag}} </v-chip>
      </v-col>

    </v-row>
    
    <v-row class="ml-1"  justify-sm="start" justify="center">
      <v-img max-width="350px" max-height="200px" :src="dish.img"></v-img>
    </v-row>

    <v-row>
      <v-col cols="12">
        {{dish.description}}
      </v-col>
    </v-row>
     

    <br>

    <v-divider class="indigo lighten-1"></v-divider>

  </div>
      
</template>

    <script>
export default {
  name: "restaurantMenu",
  props:["dish"],

  data: () => ({
      
  }),
  }

</script>
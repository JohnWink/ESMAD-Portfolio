<template>
  <div class="pl-12 ml-12 mr-2">
    <v-hover v-slot:default="{ hover }" open-delay="200">
      <v-card
        class="mx-auto cards"
        max-height="400"
        max-width="500"
        :elevation="hover ? 16 : 2"
        @click="showModal = true"
      >
        <v-img class="cardsImg" :src="dish.img"></v-img>
        <v-row class="mb-6 mx-2">
          <v-col class="text-left">
            <v-title class="ml-5 font-weight-bold nameTitle">{{ dish.name }}</v-title>
            <p class="ps">
              <i class="fas fa-tag"></i>
              {{dish.tag}}
              <br>
              <i class="fas fa-edit"></i>
              {{ dish.description }}
            </p>
          </v-col>
          <v-col class="text-right">
            <!--
            <p style="margin-right: 25px; margin-top: 15%" class="font-weight-bold">
              {{ dish.evaluation }}
              <v-icon medium color="yellow darken-1">fas fa-star</v-icon>
            </p>
            -->
          </v-col>
        </v-row>
      </v-card>
    </v-hover>

    <v-dialog v-model="showModal" persistent width="800" height="500">
      <v-card>
        
        <!--modal content-->
        <v-container>
          <v-row cols="12">
            <v-col cols="6">
              <v-img class="No" height="500" width="800" :src="dish.img"></v-img>
            </v-col>
        
            <v-col cols="5">
              <v-spacer></v-spacer>  
              <v-title class="font-weight-bold nameTitle">{{ dish.name }}</v-title>
              
              <p> <i class="fas fa-tag mt-7"></i>Tags: {{dish.tag}} </p>
              <p> <i class="fas fa-edit mt-7"></i> Descrição: {{dish.description}} </p>
              <!--
              <p>Avaliação: {{dish.evaluation}} <v-icon medium color="yellow darken-1">fas fa-star</v-icon></p>
                  -->
              
              <v-card-actions class="text-right mr-3">
                <router-link :to="{name:'restaurant', params:{id: dish.restaurantId}}">
                <v-btn class="visitBtn" color="#f7c23e" dark @click="showModal = false">Visitar Restaurante</v-btn>
                </router-link>
              </v-card-actions>
              
              
            </v-col>
                <v-col cols="1">
                 <!--Fechar-->
              <v-btn  color="black" text @click="showModal = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          
        </v-container>
          
        
      </v-card>
    </v-dialog>
  </div>
</template>

<style>

 a{
    text-decoration: none;
  }

.cards {
  border-radius: 20px;
}

.cardsImg {
  max-width: 500px;
  max-height: 250px;
}

.nameTitle {
  font-size: 20px;
  margin-left: 3%;
  margin-top: 2%;
}

.ps {
  margin-left: 21px;
  font-size: 13px;
  margin-top: 1%;
}

.visitBtn {
  margin-top: 100%;
  margin-left: 50%;
}
</style>

<script>
export default {
  name: "DishesCards",

  props: ["dish"],

  data: () => ({
    checker: "border: solid red",
    dishes: [],
    showModal: false
  })
};
</script>
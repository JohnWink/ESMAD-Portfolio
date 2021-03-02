<template>
<div class="RestaurantManager">
   <v-data-table
      v-model="selected"
      :headers="headers"
      :items="restaurants"
      :single-select="singleSelect"
      item-key="name"
      show-select
      class="elevation-1"
    >
    </v-data-table>
     <v-row align="start" justify="center">
 
          <v-col sm="3" offset-sm="5">
                <addRestaurant/>
          </v-col>
       
          <v-col sm="3">
            <v-btn large rounded color="#FF0000" dark @click="deleteItem()" >Remover Restaurante Selecionado</v-btn>
          </v-col>
     </v-row>
      <p v-if="this.selected.length!== 0">{{this.selected[0].id}}</p> 
   
</div>
</template>

<script>

 import AddRestaurant from "@/components/AddRestaurant.vue";

export default {
components:{
  AddRestaurant
},
data () {
    return {
      singleSelect: false,
      selected: [],
      headers: [
        {
          text: 'Restaurantes',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: 'Descrição', value: 'description' },
        { text: 'Tempo Médio de espera', value: 'mediumWaitingTime' },
        { text: 'Localização', value: 'location' },
        { text: 'Rating', value: 'evaluation' },
      ],
      restaurants: [],
    }
  },
  
  created(){
   this.restaurants  = this.$store.getters.getRestaurants
  },
   methods:{

        // delete restaurant method
        deleteItem(){
            confirm('Tem a certeza que deseja remover este restaurante?') &&
            this.$store.commit("REMOVE_RESTAURANT",{
            id: this.selected[0].id
          })
          //update List 
          this.restaurants = this.$store.getters.getRestaurants
        }
   }
}
</script>

<style>

</style>
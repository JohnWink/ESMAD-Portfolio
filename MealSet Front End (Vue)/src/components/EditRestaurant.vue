<template>
   <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
       <v-btn large rounded color="#f7c23e "  dark v-on="on">Editar</v-btn>
    </template>
    <v-card>
      <!--Fechar-->
      <v-toolbar color="#f7c23e " dark>
        <v-row>
          <v-col class="text-left mt-2 ml-6">
            <v-toolbar-title >Editar Pagian de Restaurante</v-toolbar-title>
          </v-col>
          <v-col class="text-right mt-2">
            <v-btn color="#ffffff" text right @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-toolbar>
      <!-- looks like the sellected data gets trough
      <pre>{{this.selected}}</pre>      -->

      <v-form class="pa-10" ref="form" lazy-validation>

          

          <v-text-field          
          v-model="restautantName"
          :counter="25"
          :rules="RestaurantNameRules"
          label="Nome do Restaurante"          
          required
          clearable
          color="#5C6BC0"
          ></v-text-field>

          <v-text-field          
          v-model="restaurantCover"          
          label="Link do Cover"
          required
          clearable
          color="#5C6BC0"
          ></v-text-field>

          <v-text-field          
          v-model="restaurantDescrip"          
          label="Descrição do Restaurate"
          :counter="40"
          required
          clearable
          color="#5C6BC0"
          ></v-text-field>

          <v-checkbox
          v-model="outDoor"
          required        
          label="Tem Esplanada?"        
          ></v-checkbox>

          <v-checkbox
          v-model="parking" 
          required       
          label="Parque de Estacionamento?"        
          ></v-checkbox>

          <v-text-field          
          v-model="restaurantWaitTime"          
          label="Tempo media de espera"
          :rules="waitTimeRule"
          clearable
          required          
          color="#5C6BC0"
          ></v-text-field>

          <v-text-field          
          v-model="restaurantLocation"          
          label="Morada do Restaurante"
          required
          :rules="locationRules"
          clearable
          color="#5C6BC0"
          ></v-text-field>

          <v-text-field          
          v-model="restaurantLogo"          
          label="Link do Logo"
          required
          clearable
          color="#5C6BC0"
          ></v-text-field>       

        
         

      <v-btn color="orange lighten" class="white--text" large rounded @click="submit">Editar Restaurante</v-btn>
     
     </v-form>
    </v-card>
  </v-dialog>
  
</template>

<script>
export default {
    name: "editPage",
    props:["restaurant"],

data: () => ({
    
    
    dialog: false,

    //---------new restaurant data-------------
    restautantName: "",
    restaurantCover: "",
    restaurantDescrip: "",
    outDoor: false,
    parking: false,
    restaurantWaitTime: 0,
    restaurantLocation: "",
    restaurantLogo: "",
    

    //----------- submition rules----------------

    RestaurantNameRules: [
      v => !!v || "Por favor preencha o nome do Restaurante",
      v => (v && v.length <= 25) || "Tem de ter menos de 25 caracteres"
    ],

    DescriptionRules: [
      v => !!v || "Por favor preencha a descrição",
      v => (v && v.length <= 40) || "Tem de ter menos de 40 caracteres"
    ],
    waitTimeRule:[ 
      time => !!time || "Por favor preencha o tempo media de espera"
    ],

    locationRules:[
      location => !!location || "Por favor preencha a localização do Restaurante"
    ],
    
  }),
  

methods: {
    submit () {

  
      if (this.$refs.form.validate()) {

        this.dialog=false

        // when left it empthy if you cleared with the cler option it will return null
        // if you clear it whit backspace keyboard button then it will return ""

        if(this.restaurantCover === "" ){
          this.restaurantCover = this.restaurant.coverImg
        }
        
        if(this.restaurantCover === null ){
          this.restaurantCover = this.restaurant.coverImg
        }

        if(this.restaurantLogo === "" ){
          this.restaurantLogo = this.restaurant.logo}
        
        if(this.restaurantLogo === null ){
          this.restaurantLogo = this.restaurant.logo}



        this.$store.commit("EDIT_RESTAURANT",{
          id:this.restaurant.id,             
          name:this.restautantName,
          coverImg:this.restaurantCover,
          description:this.restaurantDescrip,
          outDoor: this.outDoor,
          parking: this.parking,
          mediumWaitingTime: this.restaurantWaitTime,
          location: this.restaurantLocation,
          logo: this.restaurantLogo
        })

        

        this.$fire({
          title: "Restaurante Editado!",          
          type: "success",
          confirmButtonText: "ok"
        }).then((result) => {
          if (result.value) {
          location.reload();}
        });
        
      }
      
    }
  },

  created(){
      // add the already existing info so its easy to fill
    this.restautantName = this.restaurant.name
    this.restaurantCover = this.restaurant.coverImg
    this.restaurantDescrip = this.restaurant.description
    
    this.restaurantWaitTime = this.restaurant.mediumWaitingTime
    this.restaurantLocation = this.restaurant.location
    this.restaurantLogo = this.restaurant.logo
      
  }

  
}
</script>
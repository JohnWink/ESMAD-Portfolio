<!--adding has a base tamplet -->
<template>
   <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
       <v-btn large rounded color="green lighten-1"  dark v-on="on">Adicionar prato</v-btn>
    </template>
    <v-card>
      <!--Fechar-->
      <v-toolbar color="green lighten-1" dark>
        <v-row>
          <v-col class="text-left mt-2 ml-6">
            <v-toolbar-title >Adicionar prato</v-toolbar-title>
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
            v-model="name"            
            :rules="nameRules"
            label="Nome do prato"
            color="green darken-1"                 
            placeholder="Nome do Prato..."
            required
        ></v-text-field>

        <v-text-field
            v-model="imgLink"            
            :rules="linkRules"
            label="Imagem URL"
            color="green darken-1"                 
            placeholder="Link do Prato..."
            required
        ></v-text-field>

        <v-textarea  outlined 
            v-model="description"            
            :rules="descripRules"            
            color="green darken-1"
            label="Descrição do Prato"                 
            placeholder="Descrição do Prato..."                    
        ></v-textarea> 

        <v-select
          v-model="tag"
          :items="tagSlc"
          :rules="[v => !!v || 'Selecione o tipo de Prato!']"
          label="Tipo de Prato"
          required
        ></v-select>

        <v-checkbox
          v-model="recommended" 
          required       
          label="Prato para as Recomendaçôes"        
        ></v-checkbox>

         

      <v-btn color="green lighten" class="white--text" large rounded @click="submit">Adicionar Restaurante</v-btn>
     
     </v-form>
    </v-card>
  </v-dialog>
  
</template>

<script>
export default {
 name: "addDish",
props:{
  selected:{
    type: Object,
    default: function () {
        return { message: 'default on' }
      }
  }

},

data: () => ({
    
    
    dialog: false,

    //---------new dish data-------------
    name: "",
    imgLink: "",
    description: "",
    tag:"",
    tagSlc:['Carne', 'Peixe', 'Vegetariano', 'Sobremesa'],
    recommended: false,
    

    //----------- dish submition rules----------------

    descripRules:[
        v => !!v || 'Por favor preencha a Descrição do Prato.',
        v => (v && v.length >= 15) || 'Tem de ter mais de 15 caracteres',
    ],

    nameRules:[
        v => !!v || 'Por favor preencha o nome.',
        v => (v && v.length >= 5) || 'Tem de ter mais de 5 caracteres',
    ],

    linkRules:[
        v => !!v || 'Por favor preencha o link.',
        v => (v && v.length >= 15) || 'Tem de ter mais de 15 caracteres',
    ],
    
  }),
  

methods: {
    submit () {

  
      if (this.$refs.form.validate()) {

        this.dialog=false

        //if condtion if no img was added
        if(this.imgLink === ""){
          this.imgLink ="https://media.istockphoto.com/vectors/knife-fork-plate-drawing-vector-id1047553544"
        }


        this.$store.commit("ADD_DISH",{
            id: this.$store.getters.getLastDishId, 
            name: this.name,
            img: this.imgLink,            
            description: this.description,
            restaurantId: this.$store.getters.getLoggedUserRestaurant,
            evaluation: 0,
            tag: this.tag,
            recommended: this.recommended
        })        

        this.$fire({
            title: "Prato Adicionado!",          
            type: "success",
            confirmButtonText: "ok"
        }).then((result) => {
            if (result.value) {
            location.reload();}
        });
      }
      
    }
  }

  
}
</script>
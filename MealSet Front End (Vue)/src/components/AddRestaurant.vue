<template>
   <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
       <v-btn large rounded color="#f7c23e" dark v-on="on">Adicionar Restaurante</v-btn>
    </template>
    <v-card>
      <v-form class="pa-10" ref="form" v-model="valid" lazy-validation>
        <v-text-field v-model="name" :counter="20" :rules="nameRules" label="Nome do Restaurante" required></v-text-field>

        <v-text-field v-model="description" :counter="500" :rules="descriptionRules" label="Descrição" required></v-text-field>

        <v-select v-model="outDoorSelection" :items="outDoorCheck" :rules="outDoorCheckRules" label="Tem esplanada?" ></v-select>

        <v-select v-model="parkingSelection" :items="parkingCheck" :rules="parkingCheckRules" label="Tem parque de estacionamento?"></v-select>
   
      
  
      <v-btn color="blue darken-1" text @click="dialog = false">Fechar Janela</v-btn>
 
      <v-btn color="primary" text @click="reset">Limpar Informação </v-btn>

      <v-btn color="primary" text @click="submit">Adicionar Restaurante</v-btn>
     
     </v-form>
    </v-card>
  </v-dialog>
  
</template>

<script>
export default {
 name: "addRestaurant",

data: () => ({
    choosenImg: null,
    Imgdata: null,
    dialog: false,
    name: '',
    description:'',
    outDoor:false,
    parking:false,
    location:'',
    outDoorCheck:['Sim','Não'],
    parkingCheck:['Sim','Não'],

    nameRules: [
      v => !!v || 'Por favor preencha o Username',
      v => (v && v.length <= 20) || 'Tem de ter menos de 20 caracteres',
    ],

    descriptionRules:[
      v =>!!v || 'Por favor preencha a Descrição',
      v => (v.length >=50 || 'A descrição tem de ter no mínimo 50 caracteres'),
      password => (password.length <=500 || 'A descrição não pode ter mais que 500 caracteres'),
    ],

    outDoorCheckRules:[
      v =>!!v || 'Por favor selecione uma das opções',
    ],

    parkingCheckRules:[
      v =>!!v || 'Por favor selecione uma das opções',
    ],
  
  }),
  

methods: {
    submit () {

/* TO upload images
 
      if (!this.chosenFile) {this.data = "No File Chosen"}
      var reader = new FileReader();
      
      // Use the javascript reader object to load the contents
      // of the file in the v-model prop
      reader.readAsDataURL(this.chosenFile);
     
      reader.onload = () => {
        
        this.data = reader.result;
      }
*/
  
      if (this.$refs.form.validate()) {

        this.dialog=false

        if(this.outDoorSelection === 'Sim'){
          this.outDoor = true
        }else{
          this.outDoor = false
        }

        if(this.parkingSelection === 'Sim'){
          this.parking = true
        }else{
          this.parking = false
        }

        this.$store.commit("ADD_RESTAURANT",{
          id: this.$store.getters.getLastRestaurantId,
          name: this.name,
          description: this.description,
          outDoor: this.outDoor,
          parking: this.parking,
          location: this.location,
          outDoorCheck: this.outDoorCheck,
          parkingCheck: this.parkingCheck
        })



    
        
      }
    },
    reset() {
      this.$refs.form.reset();
    },


    	onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {
				this.imageName = files[0].name
				if(this.imageName.lastIndexOf('.') <= 0) {
					return
				}
				const fr = new FileReader ()
				fr.readAsDataURL(files[0])
				fr.addEventListener('load', () => {
					this.imageUrl = fr.result
          this.imageFile = files[0] // this is an image file that can be sent to server...
        
        })
        
          
          localStorage.setItem("coverImg" , JSON.stringify(this.imageFile))
			} else {
				this.imageName = ''
				this.imageFile = ''
				this.imageUrl = ''
			}
		}
  },

  computed: {
    form(){
      return{
        name: this.name,
        description: this.description,
        outDoor: this.outDoor,
        parking: this.parking,
        location: this.location

      }
    }
   
  }
}
</script>

<style>

</style>
<!--Using the addrestaurtant has a part templete -->


<template>
   <v-dialog v-model="dialog" persistent max-width="600px">
    <template v-slot:activator="{ on }">
       <v-btn large rounded color="#f7c23e" dark v-on="on">Mudar estado da Reserva</v-btn>
    </template>
    <v-card>
      <!--Fechar-->
      <v-toolbar color="#f7c23e">
        <v-row>
          <v-col class="text-left mt-2 ml-6">
            <v-toolbar-title >Estado da Reserva </v-toolbar-title>
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
        <v-select
          v-model="statusChange"
          :items="statusSlc"
          :rules="[v => !!v || 'Selecione o estado da reserva!']"
          label="Estado da Reserva"
          required
        ></v-select>

        <v-textarea  outlined
          v-model="notificationText"
          name="input-7-4"
          color="indigo darken-1"                 
          placeholder="Escreva alguma notação..."       
        ></v-textarea> 

         

      <v-btn color="indigo lighten" class="white--text" large rounded @click="submit">Confirmar</v-btn>
     
     </v-form>
    </v-card>
  </v-dialog>
  
</template>

<script>
export default {
 name: "ChangeStatusRes",
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

    statusSlc:['Aceite', 'Recusado'],

    statusChange:"",
    
    notificationText:"",
  
    
  }),
  

methods: {
    submit () {


  
      if (this.$refs.form.validate()) {

        this.dialog=false
        let noteText = this.notificationText        
        let setDate = new Date()
        let postDate = setDate.getDate() +"/"+ 1 + setDate.getMonth() +"/"+ setDate.getFullYear() +"  "+ setDate.getHours()+ ":" + setDate.getMinutes()

        //conditions for the status change , if true then it will go to the storage and change that data
        //also making sure that if we are changing a status true to true again, not to send to the historic again 
        let statusValue =""
        if(this.selected.status != "Reserva Confirmada!"){
           
          if(this.statusChange ==='Aceite' ){
            if(noteText !== ""){
              statusValue = "Reserva Confirmada!"
              

              this.$store.commit("ACCEPT_RESERVATION",{
                id: this.selected.id,            
                status: statusValue
              })

              //sending the notification

              this.$store.commit("ADD_HISTORY",{
                id: this.$store.getters.getLastHistoricId,
                userId: this.selected.userId,
                restaurantId: this.selected.restaurantId,
                status: statusValue,
                notification: noteText,
                date: postDate,
                restaurantName: this.$store.getters.getRestaurantName
              })

              this.$fire({
                  title: "Reserva Aceitada!",          
                  type: "sucess",
                  confirmButtonText: "ok"
                }).then((result) => {
                    if (result.value) {
                    location.reload();}
                });



            }else{
              this.$fire({
                  title: "Adicione uma justificação na área de notação!",          
                  type: "error",
                  confirmButtonText: "ok"
                }).then((result) => {
                    if (result.value) {
                    location.reload();}
                });

            }


          
          
            
          
          // if false it will get eliminated from the storage
         
            if(this.statusChange === 'Recusado'){
              if(noteText !== ""){

                statusValue = "Reserva Recusada"

              this.$store.commit("REFUSE_RESERVATION",{
                id: this.selected.id 
              })
              //sending the notification

              this.$store.commit("ADD_HISTORY",{
                id: this.$store.getters.getLastHistoricId,
                userId: this.selected.userId,
                restaurantId: this.selected.restaurantId,
                status: statusValue,
                notification: noteText,
                date: postDate,
                restaurantName: this.$store.getters.getRestaurantName
              })

              this.$fire({
                  title: "Reserva Recusada!",          
                  type: "sucess",
                  confirmButtonText: "ok"
                }).then((result) => {
                    if (result.value) {
                    location.reload();}
                });




              }
              else{

                this.$fire({
                  title: "Adicione uma justificação na área de notação!",          
                  type: "error",
                  confirmButtonText: "ok"
                }).then((result) => {
                    if (result.value) {
                    location.reload();}
                });
              }

              

              

            }


        }}
        if (this.selected.status == "Reserva Confirmada!"){


          if(this.statusChange === 'Recusado'){
              if(noteText !== ""){

                statusValue = "Reserva Recusada"

              this.$store.commit("REFUSE_RESERVATION",{
                id: this.selected.id 
              })
              //sending the notification

              this.$store.commit("ADD_HISTORY",{
                id: this.$store.getters.getLastHistoricId,
                userId: this.selected.userId,
                restaurantId: this.selected.restaurantId,
                status: statusValue,
                notification: noteText,
                date: postDate,
                restaurantName: this.$store.getters.getRestaurantName
              })


              this.$fire({
                  title: "Reserva Recusada!",          
                  type: "sucess",
                  confirmButtonText: "ok"
                }).then((result) => {
                    if (result.value) {
                    location.reload();}
                });

              }else{

                this.$fire({
                  title: "Adicione uma justificação na área de notação!",          
                  type: "error",
                  confirmButtonText: "ok"
                }).then((result) => {
                    if (result.value) {
                    location.reload();}
                });
              }

              

              

            }
            else{
              this.$fire({
                title: "A reserva já foi aceite!",          
                type: "warning",
                confirmButtonText: "ok"
              }).then((result) => {
                  if (result.value) {
                  location.reload();}
              });
            }



          
          
        } 

                
        

        
        
      }
    }
  }

  
}

</script>
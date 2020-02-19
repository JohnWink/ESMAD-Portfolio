<template>
    <div class="notificationPage">
        
        <v-row class="mr-2 mb-6 mt-6" align="center" justify="center">
        
            <!-- ++++++++++++++++++++++++++++++++++navbar logout profile+++++++++++++++++++++++++++++++-->
            <v-row class="ml-12 pl-12" align="center" justify="space-between">
                <v-col cols="1">
                    <navBar/>
                </v-col>  

                   


                <v-col cols="7"  >
                    <perfil/>
                </v-col>
                <v-col cols="4" >
                    <logout/>
                </v-col>

            </v-row>
            <!--++++++++++++++++table and set up so it doesnt clip the table by the navbar++++++++++++++++++++++++++++++++ -->

            <!-------------------------Notification table-------------------------------------------------------------------------------->
            <v-row class="pl-12 ml-12" >
                <v-col cols="12" >
                    <v-data-table
                    v-model="selected"
                    :headers="headersMessage"                    
                    :items="notification"                    
                    :single-select="singleSelect"
                    item-key="id"
                    show-select
                    class="elevation-1"
                    >
                    <!--Condition to change status to a string and give color chips -->
                    <template v-slot:item.restaurantId="{ item }">
                        {{getRestaurantName(item.restaurantId)}}
                    </template>



                    <template v-slot:item.status="{ item }">
                        <v-chip :color="getColor(item.status)" dark> {{ item.status }}</v-chip>
                    </template>
                    
                    <template v-slot:item.read="{ item }">
                        <div class="font-weight-bold">
                            {{getRead(item.read)}}
                        </div>
                    </template>

                    
                    </v-data-table>

                </v-col>
                
                
                <v-row class="pl-6 ml-6 mr-2 mt-3"  align="center" justify="center" justify-sm="end">
                   

                   <v-col cols="12" sm="3">
                        <v-btn v-if="this.selected.length!== 0" 
                        large rounded color="amber lighten-1"
                        class="white--text" @click="markRead()">
                            Marcar como Lido
                        </v-btn>
                        <v-btn v-else large rounded  disabled>Marcar como Lido</v-btn>
                   </v-col>
                   

                </v-row>

                

            </v-row >

            
            



        </v-row>

    <footerVue/>


         
    
    </div>
</template>

<script>

    
    import NavBar from "@/components/navBar.vue";
    import footerVue from "@/components/footerVue.vue";
    import Logout from "@/components/logout.vue";
    import perfil from "@/components/perfil.vue";
  

export default {

    name:"notificationPage",

    components:{
        
        NavBar,
        footerVue,    
        Logout,
        perfil
    },
    data () {
        
        return {

            
            singleSelect: true,
            selected: [],
            notification: [],
            
            
            statusStr: "",
            headersMessage: [
                
                { text: 'Restaurante', value: 'restaurantName' },
                { text: 'Data', value: 'date' },
                { text: 'Estado da Reserva', value: 'status' },
                { text: 'Mensagem', value: 'notification' },
                { text: 'Lido', value:'read' },                
                
            ],
            

            


        }
        
        
      
    },

    
    
    created(){
        
        this.notification  = this.$store.getters.getUserHistoric
        

        //this.logoPage = this.$store.getters.getCoverLogo     somehow the getter isnt working?      */    
    },

    
    
    methods:{




        //change the tag color and value of the status reservation 
        
        getColor(status){

            if (status == "A ser Comfirmado...") return 'orange lighten-1'
            else if(status =="Reserva Comfirmada!") return 'green lighten-1'       
            else return 'red lighten-1' 
        },

        getRead(readSts){
            if (readSts === false) {return 'Não Lido' }
            else return 'Lido'        
            
        },
        //mark the message has readed

        markRead(){
            this.$store.commit("CHANGE_READ_HISTORIC",{
                id: this.selected[0].id,
                read: true
            })

        this.$fire({
            title: "Marcado como Lido",          
            type: "success",
            confirmButtonText: "ok"
        })

            //update the notification (needs to be filtered by this users id)

            //this.notification  = this.$store.getters.getHistoric

        }

        
        /*

        // delete dish method
        deleteItem(){
            confirm('Tem acertza que deseja remover este prato?') &&
            this.$store.commit("REMOVE_DISH",{
            id: this.selected[0].id
          })
          //update List 
          this.dishes = this.$store.getters.getRestaurantDishes
        },
        // return recommended text
        getRecommended(recommendedV){
            if(recommendedV === true){ return 'Sim';}
            else{ return 'Não';}

        },

        colorRecommended(recommendedV){
            if (recommendedV == false) return 'orange lighten-1'        
            else return 'green lighten-1'
        }*/

        
    }


}
</script>
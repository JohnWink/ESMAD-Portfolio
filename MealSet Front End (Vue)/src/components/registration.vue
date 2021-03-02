 <template>
  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on }">
      <v-btn large rounded color="#f7c23e" elevation="7" dark v-on="on">Registar</v-btn>
    </template>
    <!--MODAL DE REGISTO-->
    <v-card>
      <!--Fechar-->
      <v-toolbar color="#f7c23e">
        <v-row>
          <v-col class="text-left mt-2 ml-6">
            <v-toolbar-title id="text">Registo</v-toolbar-title>
          </v-col>
          <v-col class="text-right mt-2">
            <v-btn color="#ffffff" text right @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-toolbar>

      <v-form class="pa-10" ref="form" v-model="valid" lazy-validation>
        <!--Username-->
        <v-text-field
          prepend-icon="fas fa-user-circle"
          v-model="username"
          :counter="20"
          :rules="nameRules"
          label="Username"
          required
          clearable
          color="#5C6BC0"
        ></v-text-field>

        <!--Email-->
        <v-text-field
          prepend-icon="fas fa-at"
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          required
          clearable
          color="#5C6BC0"
        ></v-text-field>

        <!--Password-->
        <v-text-field
          prepend-icon="fas fa-lock"
          v-model="password"
          :counter="20"
          :rules="passwordRules"
          label="Password"
          required
          clearable
          type="password"
          color="#5C6BC0"
        ></v-text-field>

        <!--Imagem de perfil-->
          <v-text-field
          prepend-icon="fas fa-link"
          v-model="userAvatar"
          label="Link de Avatar(opcional)"
          required
          clearable   
          color="#5C6BC0"
        ></v-text-field>

        <v-checkbox
        v-model="checkbox"        
        label="Registar como restaurante utilizador?"        
        ></v-checkbox>
        
        <!--This section will apper when the user checks the box. the restaurant registration will apper -->

        <div v-if="this.checkbox == true">

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
          required
          clearable
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

        </div>



      </v-form>
      <!--Botões-->
      <v-card-actions>
        <v-col class="text-right mr-4 mb-4">
          <v-btn color="#f7c23e" dark @click="submit">Registar</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>
#text {
  color: white;
  text-shadow: 0px 0px 5px gray;
}
</style>

    <script>
export default {
  name: "registration",

  data: () => ({
    dialog: false,
    username: "",
    password: "",
    email: "",
    userAvatar:"",
    id: 0,
    restaurantUser: "",
    checkbox: false, //checker for the user restaurant registration

    //user restauntant data

    restautantName: "",
    restaurantCover: "",
    restaurantDescrip: "",
    outDoor: false,
    parking: false,
    restaurantWaitTime: 0,
    restaurantLocation: "",
    restaurantLogo: "",







    nameRules: [
      v => !!v || "Por favor preencha o Username",
      v => (v && v.length <= 20) || "Tem de ter menos de 20 caracteres"
    ],

    passwordRules: [
      password => !!password || "Por favor preencha a Password",
      password =>
        password.length >= 6 || "A password tem de ter no mínimo 6 caracteres",
      password =>
        password.length <= 20 ||
        "A password não pode ter mais que 20 caracteres"
    ],

    waitTimeRule:[ 
      time => !!time || "Por favor preencha o tempo media de espera"
    ],

    locationRules:[
      location => !!location || "Por favor preencha a localização do Restaurante"
    ],


    emailRules: [v => !!v || "Por favor introduza o seu email"],

    //rules on the restaurant user part

    RestaurantNameRules: [
      v => !!v || "Por favor preencha o nome do Restaurante",
      v => (v && v.length <= 25) || "Tem de ter menos de 25 caracteres"
    ],

    DescriptionRules: [
      v => !!v || "Por favor preencha a descrição",
      v => (v && v.length <= 40) || "Tem de ter menos de 40 caracteres"
    ],



  }),

  methods: {

    userCheck(){
      if(this.$store.getters.feedbackChecker === "Username já utilizado"){
          this.$fire({
            type: "error",
            title: 'Oops...',
            text: 'Username já utilizado!',
          })
          this.$refs.form.reset()
          }else if(this.$store.getters.feedbackChecker === "Utilizador Registado"){
              this.$fire({
              type: "success",
              title: 'Parabéns',
              text: 'Utilizador Registado!',
            })
          }else if(this.$store.getters.feedbackChecker === "Email Já registado"){
              this.$fire({
              type: "error",
              title: 'Oops!',
              text: 'Email já registado',
            })
           this.$refs.form.reset()
            }
    },

    restaurantUserCheck(){
       if(this.$store.getters.feedbackChecker === "Username já utilizado"){
          this.$fire({
            type: "error",
            title: 'Oops...',
            text: 'Username já utilizado!',
          })
         this.$refs.form.reset()
          }else if(this.$store.getters.feedbackChecker === "Email Já registado"){
              this.$fire({
              type: "error",
              title: 'Oops!',
              text: 'Email já registado',
            })
           this.$refs.form.reset()
            }else if(this.$store.getters.feedbackChecker === "Nome restaurante Já existe"){

            this.$fire({
                type: "error",
                title: 'Oops...',
                text: 'Restaurante já existe...',
              })
              this.$refs.form.reset()

              }else if(this.$store.getters.feedbackChecker === "Localização já existe"){
                this.$fire({
                    type: "error",
                    title: 'Oops...',
                    text: 'Localização já existe...',
                  })
              this.$refs.form.reset()
            }else if(this.store.getters.feedbackChecker === "Utilizador e restaurante registado"){
              this.$fire({
                  type: "Success",
                  title: 'Registado!',
                  text: 'Bem vindo ao MealSet',
                })
                this.$refs.form.reset()
            }
    },

    submit() {
      if (this.$refs.form.validate()) {
        this.dialog = false;
        

        //some if conditions for missing pictures to give a default look
        // when left it empthy if you cleared with the cler option it will return null
        // if you clear it whit backspace keyboard button then it will return ""

        if(this.userAvatar === null ){
          this.userAvatar = "https://i.imgur.com/6txmFi3.png"
        }

        if(this.userAvatar === "" ){
          this.userAvatar = "https://i.imgur.com/6txmFi3.png"
        }



        if(this.restaurantCover === null  ){
          this.restaurantCover = "https://d1vp8nomjxwyf1.cloudfront.net/wp-content/uploads/sites/61/2016/05/05151505/Manotel-Geneve-Restaurants.jpg"
        }

        if(this.restaurantCover === ""  ){
          this.restaurantCover = "https://d1vp8nomjxwyf1.cloudfront.net/wp-content/uploads/sites/61/2016/05/05151505/Manotel-Geneve-Restaurants.jpg"
        }



        if(this.restaurantLogo ===null ){
          this.restaurantLogo = "https://media.istockphoto.com/vectors/restaurant-menu-order-tablet-pc-table-drawing-vector-id469918600"
        }

        if(this.restaurantLogo === "" ){
          this.restaurantLogo = "https://media.istockphoto.com/vectors/restaurant-menu-order-tablet-pc-table-drawing-vector-id469918600"
        }



        // if the checker was off
        if(this.checkbox === false ){
          
          this.$store.commit("ADD_USER", {
          id: this.$store.getters.getLastUserId,
          avatar : this.userAvatar,
          username: this.username,
          password: this.password,
          email: this.email,
          restaurantUser: false,
          restaurantId: 0

        });

        this.userCheck();

         
        }

        else{
        
          
          //then add the new restuarant
          this.$store.commit("ADD_USER_RESTAURANT",{
          userId: this.$store.getters.getLastUserId,
          avatar : this.userAvatar,
          username: this.username,
          password: this.password,
          email: this.email,
          restaurantUser: true,
          userRestaurantId: this.$store.getters.getLastRestaurantId,  
          restaurantId: this.$store.getters.getLastRestaurantId,          
          name:this.restautantName,
          coverImg:this.restaurantCover,
          description:this.restaurantDescrip,
          outDoor: this.outDoor,
          parking: this.parking,
          mediumWaitingTime: this.restaurantWaitTime,
          location: this.restaurantLocation,
          logo: this.restaurantLogo
        })

        this.restaurantUserCheck();
          
        }

          
          
        }

        
        
        

        this.$router.replace("/");

        }
      },
        
      
    
    reset() {
      this.$refs.form.reset();
    },
  

  computed: {
    form() {
      return {
        username: this.username,
        password: this.password,
        email: this.email,
        dialog: this.dialog
      };
    }
  }
};
</script>
<template>
<div class="login">


  <v-dialog v-model="dialog" persistent max-width="400">
    <template v-slot:activator="{ on }">
      <v-btn large rounded color="#5C6BC0" elevation="7" dark v-on="on">Iniciar Sessão</v-btn>
    </template>
    <!--MODAL DE LOGIN-->
    <v-card>
      <!--Fechar-->
      <v-toolbar color="#5C6BC0">
        <v-row>
          <v-col class="text-left mt-2 ml-6">
            <v-toolbar-title id="text">Login</v-toolbar-title>
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
          clearable
          color="#5C6BC0"
          :rules="nameRules"
          label="Username"
          required
        ></v-text-field>
        <!--Password-->
        <v-text-field
          prepend-icon="fas fa-lock"
          v-model="password"
          clearable
          color="#5C6BC0"
          :rules="passwordRules"
          label="Password"
          required
          type="password"
        ></v-text-field>
      </v-form>

      <!--Botões-->
      <v-card-actions>
        <v-col class="text-right mr-3">
          <v-btn color="#5C6BC0" dark @click="submit">Iniciar Sessão</v-btn>
        </v-col>
      </v-card-actions>
    </v-card>
  </v-dialog>


</div>
</template>


<style>
#text {
  color: white;
  text-shadow: 0px 0px 5px gray;
}


</style>


<script>
export default {
  name: "login",

  data: () => ({
    errorMessages: "",
    username: "",
    password: "",
    dialog: false,


    nameRules: [v => !!v || "Por favor preencha o Username"],

    passwordRules: [password => !!password || "Por favor preencha a Password"]
  }),

  methods: {
      submit() {
      if (this.$refs.form.validate()) {
        this.dialog = false
        //this.dialog = false;

        this.$store.commit("LOGIN", {
          username: this.username,
          password: this.password
        });

        if (this.$store.getters.checkLogged === true) {
         
          // A bug happens in all the image renders in all the pages if this happens, maybe, ask the teacher.
          
       if (this.$store.getters.getLoggedUserRestaurantType === true){
            this.$router.push({ path: "/userRestaurantPage" });            
          }
          else{
            this.$router.push({ path: "/landingPage" });
          }
          
        }else{
          // Sweet alert error
           this.$fire({
            type: "error",
            title: 'Oops...',
            text: 'Credenciais inválidas!',
          })
          this.$refs.form.reset()
        }
      }
    },

    pushForward(){

    }
  },
  computed: {
    form() {
      return {
        username: this.username,
        password: this.password
      };
    }
  }
};
</script>


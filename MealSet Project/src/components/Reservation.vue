<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <template v-slot:activator="{ on }">
      <v-btn large rounded color="#f7c23e" dark v-on="on">Fazer Reserva</v-btn>
    </template>
    <!--MODAL DE RESERVA-->
    <v-card>
      <!--Fechar-->
      <v-toolbar color="#f7c23e">
        <v-row>
          <v-col class="text-left mt-2 ml-6">
            <v-toolbar-title id="text">Fazer reserva</v-toolbar-title>
          </v-col>
          <v-col class="text-right mt-2">
            <v-btn color="#ffffff" text right @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-toolbar>

      <v-form class="pa-10" ref="form" v-model="valid" lazy-validation>
        <!--Nome-->
        <v-text-field
          prepend-icon="fas fa-user-circle"
          v-model="name"
          :rules="nameRules"
          label="Nome"
          required
          clearable
          color="#5C6BC0"
        ></v-text-field>

        <!--Nr de pessoas-->
        <v-text-field
          prepend-icon="fas fa-users"
          v-model="peopleNumber"
          :rules="peopleNumberRules"
          label="Número de convidados"
          required
          clearable
          color="#5C6BC0"
        ></v-text-field>

        <!--Qual refeição-->
        <v-select
          prepend-icon="fas fa-utensils"
          v-model="mealTimeSelection"
          :items="mealTime"
          :rules="mealTimeRules"
          label="Qual vai ser sua refeição?"
          required
          color="#5C6BC0"
        ></v-select>

        <!--+++++++++++++++++++++++++++++++++++++++++++Secção da data+++++++++++++++++++++++++++++++++++++++++++++++++-->
        <v-layout row wrap>
          <v-menu
            v-model="fromDateMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                prepend-icon="far fa-calendar-alt"
                label="Data da reserva"
                readonly
                :value="fromDateDisp"
                v-on="on"
                :rules="mealDateRules"
                required
                color="#5C6BC0"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="en-in"
              :min="minDate"
              :max="maxDate"
              v-model="fromDateVal"
              no-title
              @input="fromDateMenu = false"
            ></v-date-picker>
          </v-menu>
        </v-layout>

        <!--  Someday....
        <v-file-input
          label="File input"
          filled
          prepend-icon="mdi-camera"
          accept="image/*"
          v-model="choosenImg"
        ></v-file-input>
        -->
        <v-card-actions>
          <v-col class="text-left">
            <v-btn color="#f7c23e" dark @click="submit">Adicionar reserva</v-btn>
          </v-col>  
          <v-col class="text-right">
            <v-btn color="#f7c23e" dark @click="reset">Limpar Informação</v-btn>
          </v-col>
        </v-card-actions>
      </v-form>
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
  name: "reservation",

  data: () => ({
    dialog: false,
    fromDateMenu: false,
    fromDateVal: null,
    name: "",
    peopleNumber: "",
    mealTime: ["Almoço", "Jantar"],
    mealTimeValue: "",
    status: "A ser Comfirmado...",

    nameRules: [v => !!v || "Por favor preencha o nome"],

    peopleNumberRules: [v => !!v || "Por favor indique o número de convidados"],

    mealTimeRules: [
      v => !!v || "Por favor indique o tipo de refeição que deseja"
    ],

    mealDateRules: [
      v => !!v || "Por favor indique a data em que deseja a reserva"
    ]
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.dialog = false;

        this.$store.commit("ADD_RESERVATION", {
          id: this.$store.getters.getLastReservationId,
          userId: this.$store.getters.getLoggedUserId,
          restaurantId: this.$store.getters.restaurantInfo(
            parseInt(this.$route.params.id)
          ).id,
          name: this.name,
          peopleNumber: this.peopleNumber,
          mealTime: this.mealTimeSelection,
          mealDate: this.fromDateVal,
          status: this.status
        });

        this.$fire({
          title: "Reserva enviada!",          
          type: "success",
          confirmButtonText: "ok"
        })



       
      }
    },
    reset() {
      this.$refs.form.reset();
    }
  },

  computed: {
    //this.date1 = new Date().toISOString().substr(0, 10)
    fromDateDisp() {
      return this.fromDateVal;
      // format date, apply validations, etc. Example below.
      // return this.fromDateVal ? this.formatDate(this.fromDateVal) : "";
    },
    fromDateTime() {
      return this.mealTimeSelection;
    }
  }
};
</script>

<style>
</style>
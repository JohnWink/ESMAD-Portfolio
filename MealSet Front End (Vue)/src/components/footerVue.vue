<template >
  <v-footer class="indigo black py-2">
    <v-container >
        <v-row justify="center" align="center" justify-sm="space-around" align-content="center"  no-gutters >
          <v-col cols="12" sm="3" class="py-2" >
            <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
              <v-icon size="24px">{{ icon }}</v-icon>
            </v-btn>
          </v-col>

          <v-col class="white--text pt-0 " cols="12" sm="3" >
            Contactos
            <br>mealset@gmail.com
            <br>
            +351912345678
          </v-col>
        </v-row>

        <v-row class="white--text py-2" justify="center" align="center">
          {{ new Date().getFullYear() }} —
          <strong>MealSET © 2019 Todos os direitos reservados.</strong>
        </v-row>

    </v-container>
    
  </v-footer>
</template>








<script>
export default {
  name: "footerVue",
  data: () => ({
    icons: ["fab fa-facebook", "fab fa-twitter", "fab fa-instagram"],

    checker: "border: solid red" // this data is used in the :style="checker" to check the cols and rows
  })
};

// putting the tamplet code here because its easyer
/*


<!--Vue footer v1 the original from the mookups-->

    <!-- looks like the thing that we can play with are the width="186" height="178" on the svg, extracted from the adobe XD-->
    <!--adding a v-if with new var in if the device display is x size changes the values-->
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="auto" viewBox="0 0 186 178">
          <defs>
            <pattern id="pattern" preserveAspectRatio="none" width="100%" height="100%" viewBox="0 0 385 265">
              <image width="385" height="265" xlink:href="data:image/png;base64,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"/>
            </pattern> 
            <filter id="dinner1" x="0" y="0" width="186" height="133" filterUnits="userSpaceOnUse">
              <feOffset dx="5" dy="5" input="SourceAlpha"/>
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feFlood flood-opacity="0.161"/>
              <feComposite operator="in" in2="blur"/>
              <feComposite in="SourceGraphic"/>
            </filter>
          </defs>
          <g transform="matrix(1, 0, 0, 1, 0, 0)" filter="url(#dinner1)">
            <rect id="dinner1-2" data-name="dinner1" width="168" height="115" transform="translate(4 4)" fill="url(#pattern)"/>
          </g>
          <text id="MealSET" transform="translate(87 168)" fill="#fff" font-size="40" font-family="SegoeUI, Segoe UI"><tspan x="-74.658" y="0">MealSET</tspan></text>
        </svg>

 */
</script>
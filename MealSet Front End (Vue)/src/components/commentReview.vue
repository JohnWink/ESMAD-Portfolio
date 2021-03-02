<template> 

        <div>
            <v-card id="comment" elevation="4" class="my-2">
                <v-row  justify="space-between" align="center" id="comment" >

                    <v-col cols="7"  class="mx-4">
                        <v-avatar size="60">
                            <v-img  :src="comment.img"
                                alt="user"/>
                        </v-avatar>                
                        <span class="pl-2"><b>{{comment.name}}  </b>{{comment.date}}</span>
                    </v-col>

                    <!--method to calculate and print the rate stars and empthy stars-->
                    <v-col  cols="3" sm="3">
                        <div v-html="rateprint(comment.rating)"></div>
                    </v-col>

                    <v-col cols="12">
                        <v-row class=" mx-4">{{comment.description}}</v-row>
                    </v-col >

                </v-row>
            </v-card>
        </div>
</template>


<style>
    #comment{
        border-radius: 10px;
    }
</style>




<script>
export default {
  name: "commentReview",
  data: () => ({      
      checker:"border: solid indigo"     


    }),

    props:["comment"],


    methods:{
        rateprint: function(rate){
            
            let rateCode = ""
            for(let i=0;i<rate;i++){  rateCode += `<i style="color:gold" class="fas fa-star"></i> ` }     
                        
            let nostar = 5-rate

            for(let i=0;i<nostar;i++)  {rateCode += `<i style="color:BurlyWood" class="fas fa-star"></i> `}             

            return rateCode;
            
        },

        

    },
};
</script>
<template>
<div>
    <!-- <v-row v-if="CounterResponse.ErrorMessage">
        <v-col cols="12">
           <v-card class="primary" dark>
                <v-list-item>
                <v-list-item-content>
                <div class="overline mb-4" >Error Message</div>
                <v-list-item-title class="headline mb-1">{{CounterResponse.ErrorMessage}}</v-list-item-title>
                </v-list-item-content>
                </v-list-item>
           </v-card>
        </v-col>
    </v-row> -->
    <v-row>
        <v-col cols="3">
        <v-card>
        <v-list-item>
        <v-list-item-content>
          <div class="overline mb-4" >Total Balance</div>
          <div class="overline mb-2" ><h3>5000000 {{CounterResponse.Total_Balance}}</h3></div>   
        </v-list-item-content>
        </v-list-item>

        </v-card>
        </v-col>
        <v-col cols="3">
             <v-card>
            <v-list-item>
            <v-list-item-content>
               <div class="overline mb-4" >Total Broadcasted</div>
               <div class="overline mb-2" ><h3>5000000 {{CounterResponse.Total_Broadcasted}}</h3></div>   
            </v-list-item-content>
           
            </v-list-item>
             </v-card>
        </v-col>
        <v-col cols="3">
            <v-card>
            <v-list-item>
            <v-list-item-content>
            <div class="overline mb-4" >Total Successful</div>
            <div class="overline mb-2" ><h3>5000000 {{CounterResponse.Total_Successful}}</h3></div>
            </v-list-item-content>


            </v-list-item>
             </v-card>
        </v-col>
        <v-col cols="3">
             <v-card>
            <v-list-item>
            <v-list-item-content>
               <div class="overline mb-4" >Total Failed</div>
               <div class="overline mb-2" ><h3>5000000 {{CounterResponse.Total_Failed}}</h3></div>   

            </v-list-item-content>

            </v-list-item>
             </v-card>
        </v-col>
    </v-row>
</div> 
</template>



<script>

export default {


data: () => ({
CounterResponse: {
Total_Balance: '',
Total_Broadcasted: '',
Total_Successful: '',
Total_Failed: '',
User_Masks: "",
ErrorMessage: null
}
}),
async mounted () {  
      
   await this.$axios.get('totalbalance')
   .then(res => {

     Object.assign(this.CounterResponse,res.data.balance)
     console.log(res.data);

   })
   .catch(err => console.log(this.CounterResponse.ErrorMessage = err))  
},
methods : {

},
 
}

</script>

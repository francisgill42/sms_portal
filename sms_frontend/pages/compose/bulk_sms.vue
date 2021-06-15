<template>
<div>
   <v-snackbar  v-model="snackbar" :top="'top'">{{msg}}</v-snackbar>
  <v-data-table
    :headers="headers"
    :search="search"
    :items="data"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Bulk SMS</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
          <v-text-field
        v-model="search"
        label="Search"
        hide-details
      ></v-text-field>
       <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn small dark class="secondary lighten-2 mb-2" v-on="on">Add Bulk SMS</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
               <v-form ref="form">
                    <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <!-- <v-file-input
                    v-model="editedItem.file"
                    accept=".csv"
                    show-size
                    label="CSV"
                    ></v-file-input> -->

                    </v-col>
                  
                 <v-col cols="12" sm="12" md="12">

                   <v-autocomplete
                   v-model="editedItem.campaign"
                   :items="campaigns"
                   item-text="campaign_name"
                   item-value="id"
                   label="Campaigns"
                   >
                   </v-autocomplete> 

                   </v-col>
                
                 <v-col cols="12" sm="12" md="12">
                    <v-textarea @keyup="get_counter" counter :rules="rules4msg" v-model="editedItem.msg" label="Message"></v-textarea>
                  </v-col>
                   <v-col cols="12" sm="12" md="12">
                   Total Messages will be consumed : {{counter}}
                   </v-col>

                </v-row>
               </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn small class="primary" text @click="close">Cancel</v-btn>
              <v-btn small class="secondary lighten-2" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    
    <template v-slot:no-data>
      <v-btn small color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
  </div>

</template>

<script>
  export default {
    data: () => ({
      snackbar : false,
      msg : '',
      dialog: false,
      search:'',
      headers: [
        {
          text: 'id',
          sortable: true,
          value: 'id',
        },
       
        { text: 'Actions', value: 'actions', sortable: false },

      ],
      data: [],
      cap : 10,
      counter : 1,
      capUpdater : 1,
      editedIndex: -1,
      editedItem: {
       file: [],
       number:'',
       campaign:'',
       msg : '',
      },
      defaultItem: {
       file: [],
       number:'',
       campaign:'',
       msg : '',
      },
      campaigns : [],
      rules4number : [
          v => /^92/.test(v) || 'Must start with 92 instead of 0',
          v => /^\d+$/.test(v) || 'Must be a number',
          v => v.length < 13 || 'Must be less than 13 character'
      ],
      rules4msg : [ 
          v => !!v || 'E-mail is required',
          v => v.length < 160 || 'Must be less than 160 character'
      ],
      CampaignRules : [],
     
    }),



    computed: {

      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
     
    },

    watch: {
      dialog (val) {
        val || this.close()
      },      
    },

    created () {
      this.initialize()
      this.getCampaign()
    },

    methods: {

      getCampaign(){
        this.$axios.get('campaign').then(res => this.campaigns = res.data);
      },

      initialize () {},

      get_counter () {
        
        let len = this.editedItem.msg.length;
        var nextCap = this.cap * this.counter;
        var prevCap = this.cap * (this.counter - 1);

        if(len == 0) this.counter = 1
        
        if(len > nextCap) this.counter++

        if(len <= prevCap) this.counter-- 

      },



      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {

          // const bs = new FormData();

          // bs.append('attachment',this.editedItem.file);
          // bs.append('campaign',this.editedItem.campaign);
          // bs.append('msg',this.editedItem.msg);


          var payload  = {
            campaign_id : this.editedItem.campaign,
            message : this.editedItem.msg
          }

          
            if(this.$refs.form.validate()){
              this.$axios.post('bulk_sms',payload)
              .then((res) => {

                this.snackbar = true;
                this.msg = 'Message Submitted Successfully';
              
                console.log(res.data);
                this.close()
              
            
            });
            }
     
      },
    },
  }
</script>
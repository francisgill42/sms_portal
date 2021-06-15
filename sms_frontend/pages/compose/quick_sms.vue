<template>
  <v-data-table
    :headers="headers"
    :search="search"
    :items="data"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Quick SMS</v-toolbar-title>
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
            <v-btn small dark class="secondary lighten-2 mb-2" v-on="on">Add Quick SMS</v-btn>
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
                    <v-text-field counter :rules="rules4number" v-model="editedItem.number" label="Number"></v-text-field>
                  </v-col>
                
                 <v-col cols="12" sm="12" md="12">
                    <v-textarea counter :rules="rules4msg" v-model="editedItem.msg" label="Message"></v-textarea>
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
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      search:'',
      headers: [
     
        {
          text: 'Sender',
          sortable: true,
          value: 'user.name',
        },
         {
          text: 'Recipient',
          sortable: true,
          value: 'recipient',
        },
      
        {
          text : 'Status',
          sortable : true,
          value : 'response.QuickSMSResult'
        },

      ],
      data: [],
      editedIndex: -1,
      editedItem: {
       number:'',
       msg : '',
      },
      defaultItem: {
       number:'',
       msg : '',
      },
      rules4number : [
          v => /^92/.test(v) || 'Must start with 92 instead of 0',
          v => /^\d+$/.test(v) || 'Must be a number',
          v => v.length < 13 || 'Must be less than 13 character'
      ],
      rules4msg : [ 
          v => !!v || 'E-mail is required',
          v => v.length < 160 || 'Must be less than 160 character'
      ]
     
    }),



    computed: {

    testing(v){
      return v
    },
     
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
    },

    methods: {
      initialize () {

         this.$axios.get('role').then(res => this.data = res.data);         
         this.$axios.get('quick_sms_logs').then(res => {
           this.data = res.data.data.map(v => ({
             id : v.id,
             message : v.message,
             recipient : v.recipient,
             response : JSON.parse(v.response),
             user : v.user
             
           }));
         } );
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {

          var payload = {
              number : this.editedItem.number,
              message : this.editedItem.msg
          }
          
            if(this.$refs.form.validate()){
              this.$axios.post('quick_sms',payload)
              .then((res) => {
                this.close()
              
            
            });
            }
     
      },
    },
  }
</script>
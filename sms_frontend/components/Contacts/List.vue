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
        <v-toolbar-title>Contact</v-toolbar-title>
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
        
        <v-btn small color="primary" @click="initialize">Reset</v-btn>
        <v-dialog v-model="dialog" max-width="700px">
        
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
             
            </v-card-title>

            <v-card-text>
              <v-form ref="form">
        
                <v-row>

                   <v-col cols="6" sm="12" md="6">
                    <v-text-field v-model="editedItem.name" label="Name"></v-text-field>
                  </v-col>

                   <v-col cols="6" sm="12" md="6">
                      <v-autocomplete
                      :rules="GroupRules" 
                      v-model="editedItem.group_id" 
                      :items="groups" 
                      item-value="id" 
                      item-text="group_name"
                      label="Group"></v-autocomplete>
                  </v-col> 
                   
                   <v-col cols="6" sm="12" md="6">
                    <v-text-field :rules="rule4number" v-model="editedItem.number" label="Number"></v-text-field>
                  </v-col> 
                  
                   <v-col cols="6" sm="12" md="6">
                    <v-text-field v-model="editedItem.age" label="Age"></v-text-field>
                  </v-col>  

                  
                   <v-col cols="12" sm="12" md="12">
                      <v-radio-group row v-model="editedItem.gender" label="Gender">
                      <v-radio
                      color="secondary"
                      :label="`Male`"
                      value="male"
                    ></v-radio>
                     <v-radio
                     color="secondary"
                      :label="`Female`"
                      value="Female"
                    ></v-radio>
                    </v-radio-group>
                  </v-col>  
                  
                  
                   
                  <v-col cols="12" sm="12" md="12">
                       <v-text-field v-model="editedItem.city" label="City"></v-text-field>
                  </v-col> 
                   <v-col cols="12" sm="12" md="12">
                    <v-textarea rows="3" v-model="editedItem.area" label="Area"></v-textarea>
                  </v-col>
                  
                                
                </v-row>
                
              </v-form>

            
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
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
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
      dialog: false,
      snackbar : false,
      msg : '',
      search:'',
      headers: [
       
        {
            text : 'group',
            sortable : true,
            value : 'group.group_name'
        },  
        {
          text: 'number',
          sortable: true,
          value: 'number',
        },
         {
          text: 'name',
          sortable: true,
          value: 'name',
        },
         
         {
          text: 'age',
          sortable: true,
          value: 'age',
        },
         {
          text: 'area',
          sortable: true,
          value: 'area',
        },
         {
          text: 'city',
          sortable: true,
          value: 'city.city_name',
        },
         {
          text: 'gender',
          sortable: true,
          value: 'gender',
        },
        { text: 'Actions', value: 'actions', sortable: false },

      ],
      data: [],
      editedIndex: -1,
      editedItem: {
        number : '',
        name : '',
        age : '',
        area : '',
        city : '',
        group_id : '',
        gender : '',
      },
      defaultItem: {
        number : '',
        name : '',
        age : '',
        area : '',
        city : '',
        group_id : '',
        gender : '',
        
      },
      cities : [],
     
       GroupRules : [
        v => !!v || 'this field is required',
      ],
       rule4number : [
        v => !!v || 'this field is required',
        v => /^92/.test(v) || 'Number shoud start with 92 instead of 0'
      ],
      groups : [],

    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Contact' : 'Edit Contact'
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
       
      this.$axios.get('group_by_user').then(res => this.groups = res.data);
      
      this.$axios.get('contact_by_user').then(res => console.log(this.data = res.data));

     

      },

      upload () {

      },

      editItem (item) {
        this.editedIndex = this.data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true

        console.log(item);
      },

      deleteItem (item) {
        const index = this.data.indexOf(item)
         confirm('Are you sure you want to delete this item?') && 
         this.$axios.delete('contact/'+item.id)
            .then((res) => {
     
              const index = this.data.indexOf(item)
              this.data.splice(index, 1)
            
            });
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {

        if(this.$refs.form.validate()){


        var payload = {
              number : this.editedItem.number,
              name : this.editedItem.name,
              age : this.editedItem.age,
              area : this.editedItem.area,
              city : this.editedItem.city,
              group_id : this.editedItem.group_id,
              gender : this.editedItem.gender,
            };
        if (this.editedIndex > -1) {
       //   Object.assign(this.data[this.editedIndex], this.editedItem)

            this.$axios.put('contact/' + this.editedItem.id, payload)
            .then(res => {

              const index = this.data.findIndex(item => item.id == this.editedItem.id)
              this.data.splice(index, 1, res.data.data);            
              this.close()
      
            })
            .catch(err => console.log(err));


        } else {
              this.$axios.post('contact',payload)
               .then((res) => {

                 if(res.data.success){
                  this.snackbar = true;
                  this.msg = 'your record has been inserted';
                  this.data.push(res.data.data);

                 }
                 else{
                  this.snackbar = true;
                  this.msg = 'error occured';

                 }
                this.close()
             
            })
            .catch(err => {
                
                this.snackbar = true;
                this.msg = err.message;

            });
          
            
        }
       }

      },
    },
  }
</script>
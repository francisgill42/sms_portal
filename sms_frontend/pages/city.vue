<template>
  <v-data-table
    :headers="headers"
    :search="search"
    :items="data"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>City</v-toolbar-title>
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
            <v-btn small dark class="secondary lighten-2 mb-2" v-on="on">Add City</v-btn>
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
                    <v-text-field :rules="rules" v-model="editedItem.city_name" label="City"></v-text-field>
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
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      rules : [
        v => !!v || 'This field is required',
        v => v.length < 50 || 'character limit should not be greater than 50' 
      ],
      search:'',
      headers: [
        {
          text: 'City',
          sortable: true,
          value: 'city_name',
        },
        { text: 'Actions', value: 'actions', sortable: false },

      ],
      data: [],
      editedIndex: -1,
      editedItem: {
       city_name:'',
      },
      defaultItem: {
       city_name:'',
      },
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
    },

    methods: {
      initialize () {

      this.$axios.get('city').then(res => this.data = res.data);

      },

      editItem (item) {
        this.editedIndex = this.data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.data.indexOf(item)
         confirm('Are you sure you want to delete this item?') && 
         this.$axios.delete('city/'+item.id)
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

           if (this.editedIndex > -1) {
       //   Object.assign(this.data[this.editedIndex], this.editedItem)

            this.$axios.put('city/' + this.editedItem.id, {
            city_name: this.editedItem.city_name
            })
            .then(res => {

            const index = this.data.findIndex(item => item.id == this.editedItem.id)
            this.data.splice(index, 1,{
            id:this.editedItem.id,
            city_name:this.editedItem.city_name
            });
   
              this.close()
     
            })
            .catch(error => console.log(err));


        } else {

          
              this.$axios.post('city',{city_name:this.editedItem.city_name})
              .then((res) => {
            
              this.data.push(res.data.data)
              this.close()
              
            
            });
            
          }
        }
     
      },
    },
  }
</script>
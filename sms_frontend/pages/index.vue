<template>
   <div>  
   <ZongCard />
   
   <v-data-table
    :headers="headers"
    :items="data"
    :loading="loading"
    loading-text="Loading... Please wait"
    :search="search"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Clients</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-text-field   
        label="Search"
        hide-details v-model="search"></v-text-field>
      
      </v-toolbar>
    </template>
    <template v-slot:no-data>
      <v-btn small color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</div>
</template>

<script>
import ZongCard from '~/components/ZongCard.vue'

  export default {
    components : {ZongCard},
    data: () => ({
      loading : true,
      dialog: false,
      isActive: true,
      search:'',
      headers: [
        {
          text: 'id',
          sortable: true,
          value: 'id',
        },
      
        {
          text: 'Name',
          sortable: true,
          value: 'name',
        },
        {
          text: 'Email',
          sortable: false,
          value: 'email',
        },
        {
          text: 'Mobile No',
          sortable: false,
          value: 'mobile_no',
        },
      
        {
          text: 'Active',
          sortable: true,
          value: 'isActive',
        },
      

      ],
      data: [],
      statusses : [],
      districts : [],
      departments : [],
      roles : [],
      editedIndex: -1,
      editedItem: {
      role_id: "",
      department_id : "",
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      mobile_no: "",
      cnic: "",
      district_id: "",
      },
      defaultItem: {
      role_id: "",
      department_id : "",
      name: "",
      email: "",
      password: "",
      confirm_password: "",
      mobile_no: "",
      cnic: "",
      district_id: "",
      confirm_password: ""
      },
      change_password: "",
      errors:[],
      Rules : [
          v => !!v || 'This field is required',
        ],

    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New User' : 'Edit User'
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

      this.$axios.get('user').then(res => {
        this.data = res.data.data.filter(v => v.master == 0);
        this.loading = false;
      });

      this.$axios.get('role').then(res => this.roles = res.data);

      },

      editItem (item) {
        this.editedIndex = this.data.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.errors = []
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.data.indexOf(item)
         confirm('Are you sure you want to delete this item?') && 
         this.$axios.delete('user/'+item.id)
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

      change_password_func(){
        if(this.$refs.change_password_ref.validate()){

          this.$axios.post('change_password/'+this.editedItem.id,{change_password:this.change_password})
              .then((res) => {
                if(res.data.success){
                  this.close()
                }

              });   
              }
      },

      save () {

         var payload = {
              role_id : this.editedItem.role_id,
              department_id : this.editedItem.department_id,
              name : this.editedItem.name,
              email : this.editedItem.email,
              mobile_no : this.editedItem.mobile_no,
              cnic : this.editedItem.cnic,
              district_id : this.editedItem.district_id,
              isActive : this.isActive ? 1 : 0,
          };


        
        if (this.editedIndex > -1) {
       //   Object.assign(this.data[this.editedIndex], this.editedItem)

        
          console.log(payload);

            this.$axios.put('user/' + this.editedItem.id, payload)
            .then(res => {
            
              const index = this.data.findIndex(item => item.id == this.editedItem.id)
             
                  if(res.data.success){
                      this.data.splice(index, 1,res.data.data);
                      this.close()
                      this.errors = []
                      }
                      else{
                        this.errors = res.data.errors
                        }
     
            })
            .catch(err => console.log(this.errors = err.response.data.errors));


        } else {
            payload.password = this.editedItem.password;
            payload.confirm_password = this.editedItem.confirm_password;
            
              this.$axios.post('user',payload)
              .then((res) => {
                   
                    if(res.data.success){
                      this.data.push(res.data.data)
                      this.close()
                      this.errors = []
                      }
                      else{
                        this.errors = res.data.errors
                        }
            })
            .catch(err => console.log(this.errors = err.response.data.errors));
        }
     
      },
    },
  }
</script>
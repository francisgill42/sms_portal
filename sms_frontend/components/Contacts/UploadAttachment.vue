<template>
<div>
    <v-snackbar small v-model="snackbar" :top="'top'" color="white">
        <v-list  color="white ma-1 pa-1" class="red--text">
           <b> {{msg}}</b>
        </v-list>
    </v-snackbar>

        <v-autocomplete
        v-model="group_id" 
        :items="groups" 
        item-value="id" 
        item-text="group_name"
        label="Group">
        </v-autocomplete>


        <v-btn small dark class="secondary lighten-1 mb-2" @click="clicktoupload">
            {{get_file_name}} <v-icon>mdi-upload</v-icon>
        </v-btn>

    <input 
        type="file" 
        @change="check_file" 
        style="display:none;" 
        accept=".csv"
        ref="attachmentInput"
    >
                  
    <v-btn small dark class="secondary lighten-1 mb-2" @click="save">
        Save
    </v-btn>
</div>
</template>


<script>
  export default {
    data: () => ({
      attachment : {},
      snackbar : false,
      msg : '',
      group_id : '',
      groups : [],
      
    }),

    computed: {
        get_file_name (){
            return this.attachment.name ? this.attachment.name : 'Upload Contacts'
        }
    },
    created () {
        this.get_group()    
    },
    methods: {
      
      get_group () {
          this.$axios.get('group_by_user').then(res => this.groups = res.data);
      },

      clicktoupload (e){
          this.$refs.attachmentInput.click();
      },

      check_file (e) {

        this.attachment = e.target.files[0] || ''

    },

      save () {

            
          if(this.attachment.name == undefined){
              this.msg = 'This field is required';
          }
           else if(this.attachment.size > 2000000){
             this.msg = 'Attahment size should be less than 2MB';
         }
          else{
              this.msg = 'else'
              let file = new FormData();
              file.append('group_id',this.group_id);
              file.append('csv',this.attachment);
               
               this.$axios.post('upload_contacts',file)
                .then(res => {
                    this.msg = 'File has been uploaded successfully';
                    res.data;
                })
                .catch(err => this.msg = err.data);
          }
          this.snackbar = true;
          

      },
    },
  }
</script>
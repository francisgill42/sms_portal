<template>
<div>
    <v-snackbar v-model="snackbar" :timeout="timeout" color="secondary">
      {{ text }}
    </v-snackbar>

     <v-form ref="form">
          <v-text-field counter :rules="rules4number" v-model="editedItem.number" label="Number"></v-text-field>
          <v-textarea counter :rules="rules4message" v-model="editedItem.message" label="Message"></v-textarea>
          <v-btn  class="secondary"  @click="save">Save</v-btn>                
     </v-form>
</div>

</template>

<script>
  export default {
    data () {
      return {
        snackbar: false,
        text: 'Message has been sent',
        timeout: 2000,
        showMsg : false,
        editedItem: {
           number:'',
           message : '',
      },
     
      rules4number : [
          v => /^92/.test(v) || 'Must start with 92 instead of 0',
          v => /^\d+$/.test(v) || 'Must be a number',
          v => v.length < 13 || 'Must be less than 13 character'
      ],
      rules4message : [ 
          v => !!v || 'E-mail is required',
          v => v.length < 160 || 'Must be less than 160 character'
      ]
      }
    },
  methods : {
      save () {
        if(this.$refs.form.validate()){
          this.$axios.post('quick_sms',this.editedItem)
            .then((res) => res.data.success ?  this.snackbar = true : console.log(res.data));
          }
        },
   }
}
</script>
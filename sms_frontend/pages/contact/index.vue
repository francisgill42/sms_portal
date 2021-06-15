<template>
  <div dense>
    <v-tabs v-model="tab" color="grey darken-4">
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">Upload Contacts</v-tab>

      <v-tab href="#tab-2">Add single Contact</v-tab>

      <v-tab href="#tab-3">Contact List</v-tab>

    
    </v-tabs>

    <v-tabs-items v-model="tab" >
   <v-container>
          <v-tab-item v-for="i in tabCount" :key="i" :value="`tab-${i}`">
          <UploadAttachment v-if="i == 1"/>
          <Add v-if="i == 2"/>
          <List v-if="i == 3"/>
          </v-tab-item>
   </v-container>
</v-tabs-items>
  </div>
</template>
<script>
import Add from '~/components/Contacts/Add';
import UploadAttachment from '~/components/Contacts/UploadAttachment';
import List from '~/components/Contacts/List';

  export default {
      components : {UploadAttachment,Add,List},
    data () {
      return {
        tab: null,
        tabCount : 3,
      }
    },
  }
</script>
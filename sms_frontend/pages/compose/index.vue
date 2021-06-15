<template>
  <div dense>
    <v-tabs v-model="tab" color="grey darken-4">
      <v-tabs-slider></v-tabs-slider>

      <v-tab href="#tab-1">Quick SMS</v-tab>

      <v-tab href="#tab-2">Bulk SMS</v-tab>

    
    </v-tabs>

    <v-tabs-items v-model="tab" >
   <v-container>
          <v-tab-item v-for="i in tabCount" :key="i" :value="`tab-${i}`">
          <QuickSMS v-if="i == 1"/>
          <BulkSMS v-if="i == 2"/>
      </v-tab-item>
   </v-container>
</v-tabs-items>
  </div>
</template>
<script>
import QuickSMS from '~/components/QuickSMS';
import BulkSMS from '~/components/BulkSMS';
  export default {
      components : {QuickSMS,BulkSMS},
    data () {
      return {
        tab: null,
        tabCount : 2,
      }
    },
  }
</script>
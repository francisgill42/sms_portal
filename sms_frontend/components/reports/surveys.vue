<template>
  <v-data-table
  :items-per-page="10"
    :headers="headers"
    :items="data"
    :search="search"
    class="elevation-1"
  >
  
    <template v-slot:top>
      
      <v-toolbar class="primary accent--text title" flat>
      Reports By Survey  
      <v-spacer></v-spacer>
   <VueJsonToCsv
     v-if="data.length > 0"
    :json-data="data"
    :labels="labels"    
    >
    <v-btn class="secondary mx-2 accent--text no_print">
    <v-icon>mdi-file-export</v-icon><b>&nbsp;Export CSV  </b>
    </v-btn>
    </VueJsonToCsv>
</v-toolbar>
<v-divider></v-divider>

<v-row class="px-4 mt-2">
      <v-col cols="12">
         <span>Select Range</span>&nbsp;&nbsp;
      </v-col>

      <v-col>
     
      <v-menu
      
        v-model="menu_from"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            dense
            label="From"
            v-model="date_from"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker color="primary accent--text" v-model="date_from" @input="menu_from = false"></v-date-picker>
      </v-menu>
    </v-col>
   <v-col>
      <v-menu
      
        v-model="menu_to"
        :close-on-content-click="false"
        :nudge-right="40"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            label="To"
            dense
            v-model="date_to"
            readonly
            v-on="on"
          ></v-text-field>
        </template>
        
        <v-date-picker color="primary accent--text" v-model="date_to" @input="menu_to = false"></v-date-picker>
      </v-menu>
    </v-col>
</v-row>
<v-row class="px-4" style="">
  
<v-col>

<v-btn @click="filter_records"  class="primary accent--text">
<v-icon>mdi-filter</v-icon> 
Filter
</v-btn>
<v-btn @click="reset"  class="accent primary--text mx-2">
<v-icon>mdi-backup-restore</v-icon>&nbsp;Reset
</v-btn>
</v-col>
</v-row>

  <v-row class="px-4" style="">
  <v-col>
  <v-alert dense class="primary accent--text">
        Total Records: <strong v-if="data.length > 0">{{data.length}}</strong> 
  </v-alert>
  </v-col>
  </v-row>
    </template>
    
    <template v-slot:no-data>
      <v-btn small color="primary" @click="initialize">Reset</v-btn>
    </template>


  </v-data-table>
</template>

<script>
import VueJsonToCsv from '../../node_modules/vue-json-to-csv'
  export default {
      components : {
      VueJsonToCsv
      },
    data: () => ({
      dialog: false,
      search:'',
      labels : {},
      headers: [
        {
          text: 'id',
          sortable: true,
          value: 'id',
        },
         {
          text: 'name',
          sortable: true,
          value: 'name',
        },
         {
          text: 'Phone Number',
          sortable: true,
          value: 'pn',
        },
         {
          text: 'Owned Rent',
          sortable: true,
          value: 'or',
        },
         {
          text: 'address',
          sortable: true,
          value: 'address',
        },
        {
          text: 'Date',
          sortable: true,
          value: 'created_at',
        }
      ],
      data: [],
      
date_from: '',
menu_from: false,
date_to: '',
menu_to: false,
editedIndex: -1,
    
}),

    created () {
      this.initialize()
    },

    methods: {
      initialize () {

        this.$axios.get('survey').then(res => this.data = res.data.data);

      },
       reset () {
  this.date_from = '';
  this.date_to = '';
  this.id = '';
  this.filter_records()
},
      filter_records () {
        let payload = {
      params:{
        // 'created_by':this.$auth.user.id,
        // 'district' : this.district_id,
        'from' : this.date_from,
        'to' : this.date_to,
        // 'timestamp' : this.timestamp
      }
};
this.$axios.get('surveys_filter',payload).then(res =>  this.data = res.data.data );
      }
    },
  }
</script>
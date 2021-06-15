<template>
<div>
<v-row class="mt-10">
<v-col :cols="col" v-for="card in cards" :key="card.id">
<v-card :to="'reports/'+card.link" class="no_print">

<v-list-item>
<v-list-item-content>
<div class="overline mb-4">Report</div>
<v-list-item-title color="pink darken-2" class=" title mb-1">{{card.name}}</v-list-item-title>
<v-list-item-subtitle>
</v-list-item-subtitle>
</v-list-item-content>
<v-list-item-avatar
tile class="secondary" size="60">
<span>
  <v-icon class="white--text">{{card.icon}}</v-icon>
</span>
</v-list-item-avatar>
</v-list-item>
</v-card>


</v-col> 


</v-row>   

</div>
</template>
<script>
export default {
  data:() => ({
      col:4,
      cards : [
      { id:1, name:'Report By 360',icon:'mdi-briefcase',link:'all_jobs'}, 
      { id:1, name:'Atl Jobs',icon:'mdi-briefcase',link:'atl_jobs'},
      { id:2, name:'Btl Jobs',icon:'mdi-briefcase',link:'btl_jobs'},
      { id:3, name:'Job By Status',icon:'mdi-note',link:'status_jobs'},
      { id:4, name:'Jobs By Users',icon:'mdi-account',link:'user_jobs'},
      { id:5, name:'Jobs By Departments',icon:'mdi-box-shadow',link:'department_jobs'},
      { id:5, name:'Jobs By Districts',icon:'mdi-box-shadow',link:'district_jobs'},
      { id:6, name:'Surveys',icon:'mdi-box-shadow',link:'surveys'},
    ]
  })
}
</script>
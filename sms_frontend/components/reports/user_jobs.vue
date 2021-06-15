<template>
<v-app>
<v-data-table
:headers="headers"
:items="items"
class="elevation-1"
:options.sync="options"
:items-per-page="10"

>
<template v-slot:top>
<v-toolbar class="primary accent--text title" flat>
Reports By User Jobs  
<v-spacer></v-spacer>
   <VueJsonToCsv
     v-if="items.length > 0"
    :json-data="items"
    :labels="labels"    
    >
    <v-btn class="secondary mx-2 accent--text no_print">
    <v-icon>mdi-file-export</v-icon><b>&nbsp;Export CSV  </b>
    </v-btn>
    </VueJsonToCsv>
</v-toolbar>

<v-row class="px-5"> 

<v-col v-if="master">
<v-select
v-model="assigned_to" 
:items="assigned_to_users"
item-value="id"
item-text="name" 
label="Assigned User"
></v-select>
</v-col>

<v-col v-if="master">
<v-select
v-model="created_id" 
:items="created_by_users"
item-value="id"
item-text="name" 
label="Created By User"
></v-select>

</v-col>

</v-row>

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
        Total Records: <strong v-if="items.length > 0">{{items.length}}</strong> 
  </v-alert>
  </v-col>
  </v-row>

</template>


  <template  v-slot:item.status_name="{ item }">
  <v-chip small class="white--text" :class="myBtnClass(item.status.id)">
  {{item.keyword_name}}
  </v-chip>
  </template>

</v-data-table>
</v-app>
</template>
<script>
import VueJsonToCsv from '../../node_modules/vue-json-to-csv'
export default {
components : {
  VueJsonToCsv
},
data: () => ({

master : '',

status_id : '',
statusses : [],  

district_id : '',
districts : [],

department_id : '',
departments : [],

created_id: '',
created_by_users : [],

assigned_to : '',
assigned_to_users : [],

job_type : '',
job_types : [{id:1,job_type:'Atl'},{id:2,job_type:'Btl'}],

date_from: '',
menu_from: false,
date_to: '',
menu_to: false,
id:'',    
status_id:'',
options:{
sortBy:['id','created_at'],
sortDesc:[true]
},
headers: [
        { text: '#', sortable: true, value: 'id' },
        { text: 'Title', sortable: true, value: 'task_title' },
        { text: 'Nature Of Task', sortable : false, value : 'nature_of_task' },
        { text: 'Brief', sortable : false, value : 'brief' },
        { text: 'Started From', sortable : false, value : '_from' },
        { text: 'End To', sortable : false, value : '_to' },
        { text: 'Deliverables', sortable : false, value : 'deliverables' },
        { text: 'Status', sortable: true, value: 'status_name' },
        { text: 'Created By', sortable: true, value: 'created_name' },
        { text: 'Assign to', sortable: true, value: 'assigned_name' },
        { text: 'District', sortable: true, value: 'district_name' },
        { text: 'Department', sortable: true, value: 'department_name' },
        { text: 'Created At', sortable: true, value: 'created_at'},
      ],
items:[],
list:[],
labels : { 
      id:{ title: '#' },  
      task_title : { title : 'Title' }, 
      nature_of_task : { title : 'Nature Of Task' },
      brief : { title : 'Brief' },
      _from : { title : 'Started From' },
      _to : { title : 'End to' },
      deliverables : { title : 'Deliverables' },
      status_name : { title : 'Status' },
      created_name : { title : 'Created By' },
      assigned_name : { title : 'Assigned To' },
      department_name : { title : 'Department' },
      district_name : { title : 'District' },
      attachment : { title : 'Attachment' },
      created_at:{ title: 'Created At' },
      } 
}),
computed: {},
filters: {
    capitalize: function (value) {
    if (!value) return ''
    value = value.toString()
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
},
created () {
this.master = this.$auth.user.master;
 this.get_data()
 this.myBtnClass()
},
methods: {
myBtnClass(val) {
        if(val == 1){
          return 'blue'
        }
        else if (val == 2){
          return 'success'
        }
        else if (val == 3){
          return 'orange'
        }
        else if (val == 9){
          return 'purple'
        }
         else if (val == 10){
          return 'secondary'
        }
        else{
          return 'red'
        }
},
  reset () {
    
  this.id = '';
  this.job_type = '';
  this.district_id = '';
  this.department_id = '';
  this.created_id = '';
  this.assigned_to = '';
  this.status_id = '';
  this.date_from = '';
  this.date_to = '';
  this.timestamp = '';
  this.filter_records()
},
  async get_data () {
    
      const status = await this.$axios.get('status');    
      this.statusses = status.data;

      const districts = await this.$axios.get('district');    
      this.districts = districts.data;

      const departments = await this.$axios.get('department');    
      this.departments = departments.data;

      const assigned_users = await this.$axios.get(`assigned_to_users`);
      this.assigned_to_users = assigned_users.data.data ;

      const created_by_users = await this.$axios.get(`created_by_users`);
      this.created_by_users = created_by_users.data.data;

      this.filter_records();
  },
filter_records(){




let payload = {
      params:{
        'user_id':this.$auth.user.id,
        'job_type' : this.job_type,
        'district' : this.district_id,
        'department' : this.department_id,
        'created_by' : this.created_id,
        'assigned_to' : this.assigned_to,
        'status' : this.status_id,
        'from' : this.date_from,
        'to' : this.date_to,
        'timestamp' : this.timestamp
      }
};
this.$axios.get('Jobs_filter',payload).then(res =>  this.items = res.data.data );
},

},
}
</script>
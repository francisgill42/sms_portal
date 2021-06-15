<template>
<v-app id="login">
<v-row>
    <v-col class="secondary pt-15">
        <Test  style="margin-top:75px;" />
    </v-col>
    <v-col class="pt-15">
        <Test1 style="margin-top:75px;" />
    </v-col>
</v-row>
</v-app>
</template>

<script>

import Test from '~/components/Test';
import Test1 from '~/components/Test1';

export default {
auth : false,    
layout:'login',
components : {Test,Test1},
data:() => ({
loading:false,    
snackbar:false,    
email:'',
password:'',          
msg:''
}),
methods:{

login () {
this.loading = true

let credentials = {
email: this.email,
password: this.password
};
try {
this.$auth.loginWith('local',{ data:credentials })
.catch((e) => {
this.snackbar = true
this.msg = e.response.data.error 
setTimeout(() => {
this.loading = false
// location.reload();
},3000);
})
}
catch{
this.snackbar = true
this.msg = 'test'
}

}

}

}
</script>
<style scoped lang="css">
#login {
height: 100%;
width: 100%;
position: absolute;
top: 0;
left: 0;
content: "";
z-index: 0;
}
</style>

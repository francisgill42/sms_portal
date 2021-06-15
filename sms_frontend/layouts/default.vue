<template>
<v-app>

<v-navigation-drawer dark
v-model="drawer" :clipped="clipped" fixed app>
<!-- <div class="text-center">
<img src="/logo.png" alt="ssep login" style="width:150px; height:auto">

</div> -->

<v-list>

<v-list-item v-for="(item, i) in menus" :key="i" :to="item.to" router exact>
<v-list-item-action>
<v-icon style="border-radius:50%; padding:7px;" class="white--text">{{ item.icon }}</v-icon>
</v-list-item-action>
<v-list-item-content>
<v-list-item-title  v-text="item.title"/>
</v-list-item-content>
</v-list-item>
</v-list>
</v-navigation-drawer>

<v-app-bar app dark>
<v-app-bar-nav-icon @click.stop="drawer = !drawer" class="white--text"/>
<span class="white--text" v-if="this.$auth.user" > Welcome, <b>{{this.$auth.user.first_name}}</b></span>
<v-spacer />
<v-icon class="white--text" @click="logout">{{ logout_btn.icon }}</v-icon>

</v-app-bar>

<v-main class="">

<v-container >
<nuxt />
</v-container>

</v-main>

<v-footer :fixed="fixed" app class="primary white--text">
<!-- <span>&copy; {{year}}</span> -->
Welcome, &nbsp;<span>{{this.$auth.user.name}}</span>
<v-spacer />
<v-icon class="white--text" @click="logout">{{ logout_btn.icon }}</v-icon>

</v-footer>
</v-app>
</template>

<script>
export default {

data () {
return {
year: new Date().getFullYear(),
clipped: false,
fixed:false,
drawer: true,
menus : [],      

miniVariant: false,
right: true,
rightDrawer: false,
title: 'Virtual School',
logout_btn:{
icon:'mdi-logout',
label:'Logout'
}
}
},
mounted () {
  this.get_menus();
},
methods:{
async logout() {
  await this.$auth.logout();
},
get_menus () {

  var menu = [
            { icon: 'mdi-apps', title: 'Home',to: '/' },
           
            { icon: 'mdi-chart-bubble', title: 'Compose Message',to: '/compose' },
            { icon: 'mdi-chart-bubble', title: 'Contact',to: '/contact' },
            { icon: 'mdi-chart-bubble', title: 'Contact Groups',to: '/contact_groups' },
            { icon: 'mdi-chart-bubble', title: 'Campaign',to: '/campaign' },
            
            
  ];

    if(this.$auth.user.master){
       
         menu.push({ icon: 'mdi-chart-bubble', title: 'Masking',to: '/mask' });
         menu.push({ icon: 'mdi-chart-bubble', title: 'Client',to: '/user' });
         menu.push({ icon: 'mdi-chart-bubble', title: 'City',to: '/city' });
    }

    this.menus = menu;

}
}
}
</script>

<style>
.grad {
  background: linear-gradient(to right bottom, orange, #ff7300);
}
</style>

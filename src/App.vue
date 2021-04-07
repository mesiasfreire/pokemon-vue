<template>
  <div class="app">
    <Menu/>
    <router-view/>
    <Loading v-show="load"/>
  </div>
</template>

<script>
import { EventBus } from '@/plugins/eventBus';


import Menu from '@/components/Menu'
import Loading from './components/Loading.vue'
export default {
  components:{
    Menu,
    Loading
  },
  data(){
    return {
      show: false,
    }
  },  
  computed:{
    load(){
     EventBus.$on('loading', (data)=>{
       this.show = data;
    })
    return this.show;
    }
  }
}
</script>

<style>
*, 
*:after,
*:before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
}
body {
    font-size: 100%;
    list-style-type: none;
}
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

<template>
  <div class="hello">
  <div v-for="pokemon in pokemons" :key="pokemon.id">
    {{pokemon}}
  </div>
  </div>
</template>

<script>
import { http } from '@/httpConfig.js';
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      pokemons: [],
    }
  },
  created() {
    http.get('/cards')
    .then(( { data } )=>{
      this.pokemons = data;
      console.log(this.pokemons);
    })
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

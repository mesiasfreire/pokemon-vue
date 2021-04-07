<template>
<section v-if="load">
  <div class="input-group">
    <label for="buscar">Buscar:
    <input type="text" v-model="pokemonName" name="buscar" placeholder="Digite nome do pokemon:">
    <button @click.prevent="buscarNome" >
       <font-awesome-icon icon="search" />
    </button>
     </label>
  </div>
  
  <div class="home" > 
    <div v-for="pokemon in pokemons.data" :key="pokemon.id" class="content">
      <router-link
        :to="`/detalhes/${pokemon.id}`">
        <img :src="pokemon.images.small" :alt="pokemon.name">
      </router-link>
    </div>
  </div>
</section>
  
</template>

<script>
import { http } from '@/httpConfig.js';
import { EventBus } from '@/plugins/eventBus';


export default {
  name: 'Home',
  components: {
  },
  data(){
    return {
      pokemons:[],
      loaded:false,
      totalCount:null,
      pageSize:100,
      page:1,
      pokemonName:''
    }
  },
  created() {
    this.carregar()
  },
  computed: {
    load(){
      return this.loaded; 
    }
  },
  methods: {
    carregar() {
      EventBus.$emit('loading',true);
      http.get(`/cards?q=supertype:pokemon&orderBy=name`)
        .then(( { data } )=>{
        this.pokemons = data;
        this.loaded = true
        EventBus.$emit('loading',false);
      })
    },
    buscarNome() {
      this.loaded = false
      EventBus.$emit('loading',true);
      http.get(`/cards?q=name:${this.pokemonName}&orderBy=name`)
        .then(( { data } )=>{
        this.pokemons = data;
        this.loaded = true
        EventBus.$emit('loading',false);
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  max-width: 960px;
  margin: 0 auto;

  .content {
    padding:10px;
  }
}

.input-group {
  display: flex;
  margin: 0 auto;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  label{
    align-items: center;
    display: flex;
    justify-content: space-around;
    margin: 0 auto;
    width: 700px;
    input { 
    flex: auto;
    padding: 5px;
    border-radius: 4px;
    border: 1px solid #c7c7c7;
    margin: 0 2px;
    }
    button {
      background-color: Transparent;
      background-repeat:no-repeat;
      border: none;
      cursor:pointer;
      overflow: hidden;     
      
    }
  
  }
  
}

</style>

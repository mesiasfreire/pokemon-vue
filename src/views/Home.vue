<template>
<section v-if="load">
  <div class="input-group">
    <label for="buscar">Buscar:
    <input 
      type="text" 
      v-model="pokemonName" 
      @keyup.enter="buscarNome" 
      @change="reset" 
      name="buscar" 
      placeholder="Digite nome do pokemon:"
    />

    <button @click.prevent="buscarNome" >
       <font-awesome-icon icon="search" />
    </button>
     </label>
  </div>
  <div class="home" > 
    <div v-for="(pokemon, index) in pokemonsList.data" :key="index" class="content">
      <router-link
        :to="`/detalhes/${pokemon.id}`">
        <img :src="pokemon.images.small" :alt="pokemon.name">
      </router-link>
    </div>
  </div>
  <div v-if="btnLoaded">
    <button  @click="carregarMais" class="glow-on-hover">CARREGAR MAIS</button>
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
      pageSize:20,
      page:1,
      pokemonName:'',
      loading:true
    }
  },
  created() {
    this.carregar()
  },
  computed: {
    load(){
      return this.loaded; 
    },
    pokemonsList(){
      return this.pokemons;
    },
    btnLoaded(){
      return this.loading
    }
  },
  methods: {
    carregar() {
      if(this.pokemons.length === 0){
        EventBus.$emit('loading',true);
        http.get(`/cards?q=supertype:pokemon&pageSize=${this.pageSize}&page=${this.page}&orderBy=name`)
         .then(( { data } )=>{
         this.pokemons = data;
         this.totalCount = data.totalCount;
         this.loaded = true
         this.loading = true
         EventBus.$emit('loading',false);
        })
      }
      
    },
    buscarNome() {
      this.loaded = false;
      EventBus.$emit('loading',true);
      http.get(`/cards?q=name:${this.pokemonName}*&orderBy=name`)
        .then(( { data } )=>{
        this.pokemons = data;
        this.loaded = true
        this.loading =false
        EventBus.$emit('loading',false);
      })
    },
    carregarMais(){
      this.loading = false;
       EventBus.$emit('loading',true);
       this.page = this.page+1;
       http.get(`/cards?q=supertype:pokemon&pageSize=${this.pageSize}&page=${this.page}&orderBy=name`)
        .then(({data} )=> {
        this.pokemons.data.push(...data.data);
        this.loading = true
        EventBus.$emit('loading',false);
      })
    },
    reset(){
      if(this.pokemonName.length === 0) {
        this.pokemons =[];
        this.page=1;
        this.carregar();
      }
    }
  }
}
</script>
<style lang="scss" scoped>
section {
  button {
    margin: 20px;
  }
}
.home {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  max-width: 960px;
  margin: 0 auto;

  .content {
    padding:10px;
    img {
      width: 200px;
    }
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
@media(max-width: 425px) {
  .home {
    .content {
    padding:5px;
    img {
      width: 300px;
    }
  }
  }
   
}

</style>

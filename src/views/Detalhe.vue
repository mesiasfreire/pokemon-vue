<template>
  <div class="content">
    <div class="card">
      <img :src="detalhe.images.large" alt="">
    </div>
    <div class="cardDescription">
      <h1>Nome: {{detalhe.name}}</h1>
      <p>ID: {{detalhe.id}}</p>
      <hr>
      <section>
        <h3>Tipo(s)</h3>
         <ul v-for="(tipo, index) in detalhe.types" :key="index" >
          <li >{{tipo}}</li>
        </ul>
      </section>
      <hr>
      <section>
        <h3>Lista de Ataques(s)</h3>
         <div v-for="(ataque, index) in detalhe.attacks" :key="index" >
          <span ><strong>Nome do ataque :</strong>{{ataque.name}}</span>
          <h4>Custo</h4>
          <ul v-for="(custo, index) in ataque.cost" :key="index">
            <li>{{custo}}</li>
          </ul>
          <h4>Dano: </h4>
          <span>{{ataque.damage}} </span>
          <p><strong>Detalhe ataque</strong></p>
          <p>{{ataque.text}}</p>
        </div>
      </section>
      <hr>
      <section>
        <h3>Fraqueza(s)</h3>
        <ul v-for="(fraqueza, index) in detalhe.weaknesses" :key="index">
          <li>Tipo: {{fraqueza.type}}</li>
          <li>Valor: {{fraqueza.value}}</li>

        </ul>
      </section>
     

    </div>
  </div>
</template>
<script>
import { http } from '@/httpConfig.js';
import { EventBus } from '@/plugins/eventBus';
export default {
  name:'Detalhes',
  data(){
    return{
      detalhe:[]
    }
  },

  created() {
    this.getDetalhes()
  },
  methods: {
    getDetalhes() {
      console.log(this.$route.params);
      EventBus.$emit('loading',true);
      http.get(`/cards/${this.$route.params.id}`)
        .then(( { data } )=>{
        this.detalhe = data.data;
        this.loaded = true
        EventBus.$emit('loading',false);
      })
    }
  }

}
</script>
<style scoped lang="scss">

.content {
  display: flex;
  padding: 20px;
  justify-content: space-around;
  flex-wrap: wrap;
  max-width: 1024px;
  margin: 0 auto;

  .card {
    img{
     width: 390px;
    }
  }
  .cardDescription {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    border: 2px solid #f5f5f5;
    padding: 20px;
    border-radius: 8px;
  }
  section {
    padding: 20px;
  }
  ul{
    li {
      list-style: none;
    }
  }
}
</style>

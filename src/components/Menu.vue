<template>
   <nav class="nav">
       <img src="@/assets/pokeapi.png" class="logoApi"/>
    </nav>
</template>

<script>
export default {
 name:'Menu'
}
</script>

<style lang="scss" scoped>
.nav {
   padding: 30px;
   background-color:#101369;
   width: 100%;
   display: flex; 
   justify-content: space-around;
   a {
    font-weight: bold;
    color: #fdfdfd;
    margin-right: 10px;
    .router-link-exact-active {
        color: #42b983;
    }
   }
   .search {
       justify-self: right;
       color:#fdfdfd;
       label {
           margin-right: 5px;
       }
       input {
        padding: 5px;
        border-radius: 5px;
        outline: none;
       }
       button {
        background-color: Transparent;
        background-repeat:no-repeat;
        border: none;
        cursor:pointer;
        overflow: hidden;
        outline:none;
      }
   }
}
.logoApi {
    width: 10.5em;
}

</style>
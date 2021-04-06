import axios from 'axios'

const apiKey = 'f6eafc00-d2cc-485c-89e3-75fb9124f47a';

export const http = axios.create({
    baseURL:'https://api.pokemontcg.io/v2/',
    headers:{
        'X-Api-Key': apiKey
    }
})


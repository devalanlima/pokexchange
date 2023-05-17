<template>
    <div>
        <button @click="execute()">Refresh</button>
        <div v-if="isLoading">
            LOADING...
        </div>
        <div v-else-if="isFinished">
            <img v-for="pokemon in dataArr"
            :key="pokemon.id"
            :src="pokemon.images.small" 
            :alt="pokemon.name">
        </div>        
    </div>
</template>

<script setup>
import { watch, ref, reactive } from 'vue'
import axios from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'

const instance = axios.create({
    baseURL: 'https://api.pokemontcg.io/v2',
    Headers: {
        'X-Api-Key': 'e5551245-1708-4b50-aa17-610cda943f9f'
    }
})

const pokemon = reactive({
    order: 'name', 
    /* 
        name: Sort by name in ascending order
        -name: Sort by name in descending order
        set.name: Sort by set name in ascending order
        -set.name: Sort by set name in descending order
        number: Sort by card number in ascending order
        -number: Sort by card number in descending order
        rarity: Sort by rarity in ascending order
        -rarity: Sort by rarity in descending order
    */
    name: '',
    subtype: '',
    supertype:'',
    rarity: '',
    type1: '|', //search cards of one OR other
    type2: '|', //if type1 and type2 are diferent types, the search return one AND other
    minHP: 0,
    maxHP: 350,  
})
const { data, isLoading, isFinished, execute } = useAxios(`/cards?orderBy=${pokemon.order}`, {
    params: {
        pageSize: 25,
        q: `
        name:"${pokemon.name}*"
        subtypes:"${pokemon.subtype}*"
        supertype:"${pokemon.supertype}*"
        rarity:"${pokemon.rarity}*"
        types:"${pokemon.type1}"
        types:"${pokemon.type2}"
        hp:[${pokemon.minHP} TO ${pokemon.maxHP}]
        `
    }
}, instance)

const dataArr = ref(Array)
watch(isFinished, ()=>{
    if (isFinished){
        dataArr.value = data.value.data
    }
})

</script>

<style scoped>
    img{
        width: 25rem;
        height: 35rem;
    }
</style>
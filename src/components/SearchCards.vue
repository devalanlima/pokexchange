<template>
    <div>
        <button @click="pokemon.order = 'name'">A - Z</button>
        <button @click="pokemon.order = '-name'">Z - A</button>
        <div v-if="isLoading">
            <div class="loading" v-for="each in 25" :key="each">
                <div class="skeleton"></div>
            </div>
        </div>
        <div v-else-if="isFinished" v-once>
            <img v-for="pokemon in dataArr" :key="pokemon.id" :src="pokemon.images.small" :alt="pokemon.name">
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'
import { usePokemonFilters } from '../stores/pokemonFilters'

const pokemon = usePokemonFilters()

const instance = axios.create({
    baseURL: 'https://api.pokemontcg.io/v2',
    Headers: {
        'X-Api-Key': 'e5551245-1708-4b50-aa17-610cda943f9f'
    }
})

const { data, isLoading, isFinished, execute } = useAxios({
    params: {
        pageSize: 25,
        q: `
        name:"${pokemon.name}*"
        subtypes:"${pokemon.subtype}"
        supertype:"${pokemon.supertype}"
        rarity:"${pokemon.rarity}"
        ${pokemon.selectedType}
        ${pokemon.filterHP}
        `
    }
}, instance)

const dataArr = ref(Array)
onMounted(() => {
    execute(`/cards?orderBy=${pokemon.order}`)
    .then(()=>{dataArr.value = data.value.data})
    .catch((error)=>{console.log(error);})
})
</script>

<style scoped>
img {
    width: 25rem;
    height: 35rem;
}

.loading {
    width: 25rem;
    height: 35rem;
    border-radius: 15px;
    position: relative;
    background-color: dimgray;
    overflow: hidden;
}

.skeleton {
    box-shadow: 0 0 50px 50px rgba(160, 160, 160, 0.5);
    animation: skeleton .6s linear infinite;
    opacity: 0;
    rotate: -25deg;
}

@keyframes skeleton {
    0% {
        transform: translate(-50px);
        opacity: 0;
    }

    20% {
        opacity: 0;
    }

    50% {
        transform: translate(20px);
        opacity: 0.3;
    }

    100% {
        transform: translate(300px);
        opacity: 1;
    }
}
</style>
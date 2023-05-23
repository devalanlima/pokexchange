<template>
    <div v-if="isLoading">
        <div class="loading" v-for="each in 25" :key="each">
            <div class="skeleton"></div>
        </div>
    </div>
    <div v-else-if="isFinished" v-once class="img-wrapper">
        <img v-for="pokemon in dataArr" :key="pokemon.id" :src="pokemon.images.small" :alt="pokemon.name">
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'

import { useOffsetPagination } from '../stores/StoreOffsetPagination'

const pagination = useOffsetPagination()

const instance = axios.create({
    baseURL: 'https://api.pokemontcg.io/v2',
    Headers: {
        'X-Api-Key': 'e5551245-1708-4b50-aa17-610cda943f9f'
    }
})

const props = defineProps({
    order: { type: String, default: 'name' },
    pageSize: { type: Number, default: 1, required: true },
    currentPage: { type: Number, default: 1, required: true },
    name: { type: String, default: '', required: true },
    subtype: { type: String, default: '', required: true },
    supertype: { type: String, default: '', required: true },
    rarity: { type: String, default: '', required: true },
    type: { type: String, default: '', required: true },
    hp: { type: String, default: '', required: true },
})

const { data, isLoading, isFinished, execute } = useAxios({
    params: {
        pageSize: `${props.pageSize}`,
        page: `${props.currentPage}`,
        q: `
        name:"${props.name}*"
        subtypes:"${props.subtype}"
        supertype:"${props.supertype}"
        rarity:"${props.rarity}"
        ${props.type}
        ${props.hp}
        `
    }
}, instance)

const dataArr = ref(Array)
onMounted(() => {
    execute(`/cards?orderBy=${props.order}`)
        .then(() => {
            dataArr.value = data.value.data
            pagination.totalPages = Math.ceil(data.value.totalCount / props.pageSize)
        })
        .catch((error) => { console.log(error); })
})
</script>

<style scoped>

img {
    width: 26.67rem;
    height: 37rem; 
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
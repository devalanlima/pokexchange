<template>
    <div v-if="isLoading">
        <div class="loading" v-for="each in props.pageSize" :key="each">
            <div class="skeleton"></div>
        </div>
    </div>
    <div v-else-if="isFinished" v-once>
        <img v-for="pokemon in dataArr" :key="pokemon.id" :src="pokemon.images[`${props.imageSize}`]" :alt="pokemon.name">
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
    imageSize: { type: String, default: 'small'}
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
    object-fit: cover;
    width: 26.67rem;
    height: 37rem;
}

.loading {
    width: 26.67rem;
    height: 37rem;
    border-radius: 15px;
    position: relative;
    background: rgb(45, 46, 58);
    overflow: hidden;
}

.skeleton{
    width: 100%;
    height: 160%;
    background: linear-gradient(to right, transparent 30%, rgba(219, 219, 219, 0.158) 50%, transparent 70%);
    rotate: 45deg;
    background-position: center;
    animation: loading infinite .8s ease-in-out;
}

@keyframes loading {
    0% {
        transform: translateX(-300px);
    }

    100% {
        transform: translateX(300px);
    }
}
</style>
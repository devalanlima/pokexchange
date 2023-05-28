<template>
    <div class="wrapper-loading" v-if="isLoading">
        <div class="wrapper-cards" v-for="each in pagination.pageSize" :key="each">
            <PriceConvert class="price" :price-e-u-r="0" />
            <div class="loading">
                <span class="skeleton"></span>
            </div>
        </div>
    </div>
    <div class="wrapper-all-cards" v-else-if="isFinished">
        <div class="wrapper-cards" v-for="pokemon in dataArr" :key="pokemon.id">
            <PriceConvert v-if="props.havePrice" class="price" :price-e-u-r="pokemon.cardmarket.prices.trendPrice" />
            <ParallaxEffect :rarity-card="pokemon.rarity">
                <img v-if="isFinished" :src="pokemon.images[`${props.imageSize}`]" :alt="pokemon.name">
            </ParallaxEffect>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'
import ParallaxEffect from './ParallaxEffect.vue'
import PriceConvert from './PriceConvert.vue'

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
    imageSize: { type: String, default: 'small' },
    havePrice: { type: Boolean, default: true }
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
    width: 100%;
    height: 100%;
    border-radius: 1rem;
}

.wrapper-loading {
    width: 100%;
    height: 100%;
}

.loading {
    box-sizing: border-box;
    width: 20rem;
    height: 27.9rem;
    margin: 3rem;
    border-radius: 10px;
    position: relative;
    background: rgba(105, 105, 105, 0.993);
    overflow: hidden;
    transition: box-shadow 0.4s ease, opacity .33s ease-out, transform .45s cubic-bezier(.2, .49, .32, .99);
    box-shadow: 0 0 3px -1px transparent,
        0 0 2px 1px transparent,
        0 0 5px 0px transparent,
        0px 10px 20px -5px black,
        0 2px 15px -5px black,
        0 0 20px 0px transparent;
    z-index: 1;
}

.skeleton {
    position: absolute;
    width: 100%;
    height: 160%;
    background: linear-gradient(to right, transparent 30%, rgba(219, 219, 219, 0.192) 50%, transparent 70%);
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

.wrapper-cards {
    position: relative;
}

.price {
    box-sizing: border-box;
    position: absolute;
    left: 50%;
    top: -8%;
    transform: translateX(-50%);
    border: 1px solid rgba(255, 255, 255, 0.582);
    padding: 2rem;
    border-radius: 1rem;
    width: 95%;
    height: 105%;
    pointer-events: none;
    background-color: rgba(145, 222, 255, 0.158);
    backdrop-filter: (1rem);

}
</style>
<template>
    <p class="price" v-if="isLoading"><i class="fa-brands fa-ethereum"></i>0.000000 ETH</p>
    <p :class="['price', {'no-offers': isNaN(props.priceEUR)}]" v-else-if="isFinished"><i class="fa-brands fa-ethereum"></i>{{ finalPrice }}</p>
</template>

<script setup>
import axios from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'
import { ref } from 'vue'

const props = defineProps({
    priceEUR: { type: Number, required: true }
})
const finalPrice = ref(null)

const instanceEUR = axios.create({
    baseURL: 'https://economia.awesomeapi.com.br/last'
})
const { data, execute, isLoading, isFinished } = useAxios(instanceEUR)

execute('/ETH-EUR')
    .then(() => {
        const convertEURtoETH = data.value.ETHEUR.ask * 100
        if (isNaN(props.priceEUR)) {
            finalPrice.value = 'NO OFFERS'
        } else {
            finalPrice.value = `${(props.priceEUR / convertEURtoETH).toFixed(6)} ETH`
        }
    }).catch((error) => {
        console.log(error);
    })
</script>

<style scoped>
.price {
    font-size: 2rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
    color: var(--color-white);
}

.no-offers{
    color: var(--color-second);
}
</style>
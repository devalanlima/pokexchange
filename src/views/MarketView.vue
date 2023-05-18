<template>
    <div class="market-wrapper">
        <div class="search-filter">
        </div>

        <div class="market-itens">
            <SearchCards
            :key="renderKey"
            />
        </div>
    </div>
</template>

<script setup>
import SearchCards from "@/components/SearchCards.vue"
import { usePokemonFilters } from '../stores/pokemonFilters';
const pokemonFilter = usePokemonFilters()
import { watch, ref } from 'vue'
const renderKey = ref(true)

watch(pokemonFilter,()=>{
    renderKey.value = !renderKey.value
})

</script>

<style>
.market-wrapper {
    display: grid;
    grid-template-columns: 1fr 4.8fr;
    gap: 2rem;
}

.search-filter {
    max-width: 30rem;
    min-width: 25rem;
    max-height: 80vh;
    border: 2px dotted red;
    position: sticky;
    top: 10rem;
}

.market-itens * {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    max-width: 150rem;
}
</style>
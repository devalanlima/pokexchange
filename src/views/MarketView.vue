<template>
    <div class="market-wrapper">
        <div class="search-filter">
            <FilterName />
            <FilterSupertype />
            <FilterRarity />
            <FilterSubtype />
            <FilterTypes 
            v-if="pokemonFilter.supertype == 'Pokémon'"
            />
        </div>

        <div class="market-itens">
            <SearchCards :key="renderKey" />
        </div>
    </div>
</template>

<script setup>
import SearchCards from "@/components/SearchCards.vue"
import FilterName from "@/components/FilterName.vue"
import FilterSupertype from "@/components/FilterSupertype.vue"
import FilterRarity from "@/components/FilterRarity.vue"
import FilterSubtype from "@/components/FilterSubtype.vue"
import FilterTypes from "@/components/FilterTypes.vue"

import { watch, ref } from 'vue'
import { usePokemonFilters } from '../stores/pokemonFilters';

const pokemonFilter = usePokemonFilters()

const renderKey = ref(true)

setTimeout(() => {
    watch(pokemonFilter, () => {
        renderKey.value = !renderKey.value
    })
}, 800);

watch(()=> pokemonFilter.supertype, ()=>{
    pokemonFilter.rarity = '*'
    pokemonFilter.subtype = '*'
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
    position: sticky;
    top: 10rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.market-itens * {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    max-width: 150rem;
}
</style>
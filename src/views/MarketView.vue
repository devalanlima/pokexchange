<template>
    <div class="market-wrapper">
        <div class="search-filter">
            <FilterName />
            <FilterSupertype />
            <FilterRarity />
            <FilterSubtype />
            <FilterTypes v-if="pokemonFilter.supertype == 'Pokémon'" />
            <FilterHP v-if="pokemonFilter.supertype !== 'Energy'" :key="renderKey" />
        </div>

        <div class="market-itens">
            <button @click="pokemonFilter.order = 'name'">A - Z</button>
            <button @click="pokemonFilter.order = '-name'">Z - A</button>
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
import FilterHP from "@/components/FilterHP.vue"

import { watch, ref } from 'vue'
import { usePokemonFilters } from '../stores/pokemonFilters';

const pokemonFilter = usePokemonFilters()

const renderKey = ref(true)

let timeoutId

watch(pokemonFilter, () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
        renderKey.value = !renderKey.value;
    }, 500);
})

watch(() => pokemonFilter.supertype, () => {
    pokemonFilter.rarity = '*'
    pokemonFilter.subtype = '*'
    pokemonFilter.filterHP = ''
    if (pokemonFilter.supertype == 'Pokémon') {
        pokemonFilter.minHP = pokemonFilter.rangeMinHP = 30
        pokemonFilter.maxHP = pokemonFilter.rangeMaxHP = 340
    }
    if (pokemonFilter.supertype == 'Trainer') {
        pokemonFilter.minHP = pokemonFilter.rangeMinHP = 0
        pokemonFilter.maxHP = pokemonFilter.rangeMaxHP = 70
    }
})
</script>

<style scoped>
.market-wrapper {
    display: grid;
    grid-template-columns: 1fr 4.8fr;
    gap: 2rem;
    width: 100%;
    position: relative;
}

.search-filter {
    max-width: 30rem;
    min-width: 25rem;
    max-height: 80vh;
    position: sticky;
    top: 10rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
}
</style>

<style>
.market-itens {
    border: 2px dotted red;
    width: 100%;
}

.market-itens * {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: .58rem 0;
    margin: .58rem;
}
</style>
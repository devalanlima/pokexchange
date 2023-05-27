<template>
    <div class="market-wrapper">
        <div class="search-filter">
            <FilterName />
            <FilterSupertype />
            <FilterRarity />
            <FilterSubtype />
            <FilterTypes v-if="pokemonFilter.supertype == 'Pokémon'" :key="renderKey" />
            <FilterHP v-if="pokemonFilter.supertype !== 'Energy'" :key="renderKey" />
            <ResetAllFilters/>
        </div>

        <div class="market-itens">
            <div class="functions-wrapper">
                <div class="btn-wrapper">
                    <button @click="pagination.pageSize = 25">25</button>
                    <button @click="pagination.pageSize = 50">50</button>
                    <button @click="pagination.pageSize = 100">100</button>
                    <button @click="pokemonFilter.order = 'name'">A - Z</button>
                    <button @click="pokemonFilter.order = '-name'">Z - A</button>
                </div>
                <OffsetPagination />
            </div>
            <SearchCards :key="renderKey" :order="pokemonFilter.order" :pageSize="pagination.pageSize"
                :currentPage="pagination.currentPage" :name="pokemonFilter.name" :subtype="pokemonFilter.subtype"
                :supertype="pokemonFilter.supertype" :rarity="pokemonFilter.rarity" :type="pokemonFilter.selectedType"
                :hp="pokemonFilter.filterHP" />
            <div class="functions-wrapper">
                <OffsetPagination />
            </div>
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
import OffsetPagination from "@/components/OffsetPagination.vue"
import ResetAllFilters from "@/components/ResetAllFilters.vue"

import { watch, ref } from 'vue'
import { usePokemonFilters } from '../stores/StorePokemonFilters';
import { useOffsetPagination } from "../stores/StoreOffsetPagination"

const pokemonFilter = usePokemonFilters()
const pagination = useOffsetPagination()

const renderKey = ref(true)

let timeoutId

watch([
    pokemonFilter,
    () => { pagination.currentPage },
    () => { pagination.pageSize }
], () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
        renderKey.value = !renderKey.value;
    }, 500);
})

watch(() => pokemonFilter.supertype, () => {
    pokemonFilter.resetFilters()
    if (pokemonFilter.supertype == 'Pokémon') {
        pokemonFilter.minHP = pokemonFilter.rangeMinHP = 30
        pokemonFilter.maxHP = pokemonFilter.rangeMaxHP = 340
    }
    if (pokemonFilter.supertype == 'Trainer') {
        pokemonFilter.minHP = pokemonFilter.rangeMinHP = 0
        pokemonFilter.maxHP = pokemonFilter.rangeMaxHP = 70
    }
})

watch([pokemonFilter, () => { pagination.pageSize }], () => {
    pagination.currentPage = 1
})

</script>

<style scoped>
.market-wrapper {
    display: grid;
    grid-template-columns: 1fr 4.8fr;
    width: 100%;
    margin-top: 5rem;
}

.search-filter {
    width: 25rem;
    max-height: 80vh;
    position: sticky;
    top: 10rem;
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 3rem;
}

.functions-wrapper {
    display: flex;
    position: relative;
    align-items: center;
    margin: 2rem 0 4rem;
}

.btn-wrapper {
    position: absolute;
    right: 0;
}

.market-itens {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
}

.market-itens *:not(.functions-wrapper *) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    place-items: center;
    row-gap: 4rem;
}
</style>
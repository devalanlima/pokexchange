<template>
    <div class="market-wrapper">
        <div class="search-filter">
            <button class="show-filter" @click="showFilter">
                <i class="fa-solid fa-filter" title="Previous">
                </i>
            </button>
            <div class="all-filters" v-if="!isFilterShow">
                <FilterName class="filter-name" />
                <FilterSupertype />
                <FilterRarity />
                <FilterSubtype />
                <FilterTypes v-if="pokemonFilter.supertype == 'Pokémon'" :key="renderKey" />
                <FilterHP v-if="pokemonFilter.supertype !== 'Energy'" :key="renderKey" />
                <ResetAllFilters />
            </div>
        </div>

        <div class="market-itens">
            <div class="functions-wrapper">
                <div class="btn-wrapper">
                    <button @click="pagination.pageSize = 25" :class="[{ 'selected': pagination.pageSize == 25 }]">
                        25
                    </button>

                    <button @click="pagination.pageSize = 50" :class="[{ 'selected': pagination.pageSize == 50 }]">
                        50
                    </button>

                    <button @click="pagination.pageSize = 100" :class="[{ 'selected': pagination.pageSize == 100 }]">
                        100
                    </button>
                    |
                    <button @click="pokemonFilter.order = 'name'" :class="[{ 'selected': pokemonFilter.order == 'name' }]">
                        A - Z
                    </button>

                    <button @click="pokemonFilter.order = '-name'"
                        :class="[{ 'selected': pokemonFilter.order == '-name' }]">
                        Z - A
                    </button>
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

const isFilterShow = ref(false)
const showFilter = () => {
    isFilterShow.value = !isFilterShow.value
}

</script>

<style scoped>
.market-wrapper {
    display: grid;
    grid-template-columns: 1fr 4.8fr;
    width: 100%;
    margin-top: 5rem;
    gap: 2rem;
}

.search-filter {
    max-height: 80vh;
    position: sticky;
    top: 10rem;
    min-width: 30rem;
    max-width: 40rem;
}

.all-filters {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    margin-top: 3rem;
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
    font-size: 2rem;
    padding: 1rem;
}

.market-itens {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100vh;
}

.market-itens *:not(.functions-wrapper *) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    place-items: center;
    row-gap: 4rem;
}

.btn-wrapper button {
    background: none;
    border: none;
    color: var(--color-white);
    font-family: var(--font-Noto-Sans);
    cursor: pointer;
    font-size: 1.5rem;
}

.btn-wrapper button:hover {
    color: var(--color-second);
}

.selected {
    color: var(--color-third);
    text-decoration: underline;
    font-weight: 600;
}

.show-filter {
    display: none;
    position: absolute;
    z-index: 5;
    width: 5rem;
    height: 5rem;
    font-size: 3rem;
    color: var(--color-first);
    background: none;
    border: none;
    cursor: pointer;
    background-color: white;
    border-radius: 1rem;
    opacity: .7;
    left: 1rem;
    top: 1rem;
    user-select: none;
}

.show-filter[click]{
    opacity: 1;
}
</style>

<style scoped>
@media (max-width: 640px) {

    /* Extra Small */
    .show-filter {
        display: block;
    }

    .btn-wrapper {
        display: none;
    }

    .search-filter {
        display: flex;
        position: fixed;
        z-index: 2;
        left: 4rem;
        right: 4rem;
        margin-top: 1rem;
    }

    .all-filters {
        background-color: rgba(12, 12, 49, 0.945);
        padding-bottom: 2rem;
        border-radius: 1rem;
        padding: 2rem;
        margin-top: 0rem;
    }

    .filter-name {
        margin-top: 7rem;
    }

    .market-wrapper {
        display: flex;

    }
}

@media (min-width: 640.1px) and (max-width: 768px) {

    /* Small */
    .show-filter {
        display: block;
    }

    .btn-wrapper {
        display: none;
    }

    .search-filter {
        display: flex;
        position: fixed;
        z-index: 2;
        left: 4rem;
        right: 4rem;
        margin-top: 1rem;
    }

    .all-filters {
        background-color: rgba(12, 12, 49, 0.945);
        padding-bottom: 2rem;
        border-radius: 1rem;
        padding: 2rem;
        margin-top: 0rem;
    }

    .filter-name {
        margin-top: 7rem;
    }

    .market-wrapper {
        display: flex;

    }
}

@media (min-width: 768.1px) and (max-width: 1024px) {

    /* Medium */
    .btn-wrapper {
        display: none;
    }
}

@media (min-width: 1024.1px) and (max-width: 1280px) {
    /* Large */

}

@media (min-width: 1280.1px) and (max-width: 1536px) {
    /* Extra Large */

}

@media (min-width: 1536.1px) {
    /* 2x Extra Large */

}
</style>
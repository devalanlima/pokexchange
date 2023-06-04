<template>
    <div class="market-wrapper" ref="el">
        <div class="search-filter" ref="searchFilter">
            <button class="show-filter" @click="showFilter">
                <i v-if="!openClose" class="fa-solid fa-chevron-right" title="open menu filter"></i>
                <i v-else class="fa-solid fa-chevron-left" title="close menu filter"></i>
                <span class="title-btn">toggle menu view</span>
            </button>
            <div class="all-filters">
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
import { useResizeObserver } from '@vueuse/core'

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

const searchFilter = ref(null)
const openClose = ref(false)
const showFilter = () => {
    if (!openClose.value) {
        searchFilter.value.style.transform = 'translateY(-50%) translateX(0)'
        openClose.value = !openClose.value
    } else {
        searchFilter.value.style.transform = 'translateY(-50%) translateX(-94%)'
        openClose.value = !openClose.value
    }
}

const el = ref(null)
const elWidth = ref('')
useResizeObserver(el, (entries) => {
    const entry = entries[0]
    const { width } = entry.contentRect
    elWidth.value = width
})

watch(elWidth, () => {
    if (elWidth.value > 700) {
        searchFilter.value.style.transform = 'translateY(0) translateX(0)'
        openClose.value = false
    } else {
        searchFilter.value.style.transform = 'translateY(-50%) translateX(-94%)'
    }
})
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
    transition: transform .5s ease-in-out;
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

.btn-wrapper .selected {
    color: var(--color-third);
    text-decoration: underline;
    font-weight: 600;
}

.show-filter {
    position: fixed;
    right: 0;
    top: 50%;
    width: 2rem;
    height: 63rem;
    transform: translateY(-50%);
    background-color: var(--color-third);
    border: none;
    border-radius: 0 1rem 1rem 0;
    font-size: 2rem;
    z-index: 3;
    cursor: pointer;
    display: none;
    user-select: none;
}
.fa-chevron-right{
    margin-left: -.3rem;
}
.fa-chevron-left{
    margin-left: -.2rem;
}

.title-btn{
    position: absolute;
    opacity: 0;
    pointer-events: none;
}
</style>

<style scoped>
@media (max-width: 640px) {
    .show-filter {
        display: block;
    }

    .btn-wrapper {
        display: none;
    }

    .search-filter {
        display: flex;
        position: fixed;
        z-index: 1;
        top: 50%;
        left: 0;
        transform: translateY(-50%) translateX(-94%);
        width: 50%;
        max-width: none;
        padding-right: 2rem;
        margin: 0;
    }

    .all-filters {
        box-sizing: border-box;
        background-color: rgba(12, 12, 49, 0.945);
        padding: 2rem;
        margin-top: 0rem;
        overflow-y: scroll;
        overflow-x: hidden;
        min-height: 63rem;
        justify-content: center;
    }

    .market-wrapper {
        display: flex;

    }
}

@media (min-width: 640.1px) and (max-width: 768px) {
    .show-filter {
        display: block;
    }

    .btn-wrapper {
        display: none;
    }

    .search-filter {
        display: flex;
        position: fixed;
        z-index: 1;
        top: 50%;
        left: 0;
        transform: translateY(-50%) translateX(-94%);
        width: 50%;
        max-width: none;
        padding-right: 2rem;
        margin: 0;
    }

    .all-filters {
        box-sizing: border-box;
        background-color: rgba(12, 12, 49, 0.945);
        padding: 2rem;
        margin-top: 0rem;
        overflow-y: scroll;
        overflow-x: hidden;
        min-height: 63rem;
        justify-content: center;
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
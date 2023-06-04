<template>
    
    <div class="select-wrapper">
        <select v-model="pokemon.supertype" title="select supertype">
            <option :value="supertype" v-for="supertype in supertypes" :key="supertype">
                {{ supertype }}
            </option>
        </select>
    </div>
</template>

<script setup>
import { usePokemonFilters } from '../stores/StorePokemonFilters'
const pokemon = usePokemonFilters()

const supertypes = [
    "Pokémon",
    "Trainer",
    "Energy"
]
</script>

<style scoped>
.select-wrapper{
    position: relative;
    font-size: 2rem;
}
.select-wrapper::after {
    content: '\25B8';
    display: block;
    height: 50%;
    position: absolute;
    right: 10px;
    top: 25%;
    rotate: 90deg;
    pointer-events: none;
}

select {
    width: 100%;
    height: 4rem;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    box-sizing: border-box;
    color: var(--color-white);
    padding: 0 10px;
    cursor: pointer;
    background: var(--color-first--variant);
    user-select: none;
    border: 1px solid var(--color-white);
    position: relative;
    font-family: var(--font-Roboto);
    font-size: 2rem;
}

select:focus {
    outline: none;
    border: none;
    border: 2px solid var(--color-third);
}
</style>
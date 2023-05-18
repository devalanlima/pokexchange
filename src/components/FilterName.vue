<template>
    <label class="filter-name" for="filter-name">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input class="input" type="text" placeholder="e.g. Pikachu" v-model.trim.lazy="pokemon.name" />
    </label>
</template>

<script setup>
import { usePokemonFilters } from '../stores/pokemonFilters';
const pokemon = usePokemonFilters()
</script>

<style scoped>
.filter-name {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 4rem;
    width: 100%;
    position: relative;
    border: .1rem solid var(--color-white);
    mix-blend-mode: screen;
    font-size: 2rem;
}

.fa-solid {
    margin-right: 1rem;
    cursor: pointer;
    position: absolute;
    left: 1rem;
}

.input {
    flex-grow: 1;
    box-sizing: border-box;
    outline: none;
    border: none;
    width: 0;
    min-width: 10rem;
    height: 100%;
    background-color: var(--color-first--variant);
    padding: 0 1.5rem;
    padding-left: 4rem;
    color: var(--color-white);
    font-family: var(--font-Noto-Sans);
}

.input:focus {
    outline: .2rem solid var(--color-third);
}
</style>
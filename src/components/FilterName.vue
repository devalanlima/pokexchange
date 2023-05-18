<template>
    <div class="filter-name">
        <label for="filter-name" class="icon-wrapper">
            <i class="fa-solid fa-magnifying-glass"></i>
        </label>
        <input 
        class="input" 
        type="text" 
        placeholder="e.g. Pikachu" 
        v-model.trim.lazy="pokemon.name"
        id="filter-name"
        />
    </div>
    
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
    justify-content: center;
    height: 4rem;
    width: 100%;
    position: relative;
    border: .1rem solid var(--color-white);
    font-size: 2rem;
}

.fa-solid {
    cursor: pointer;
    position: absolute;
    margin-left: 4rem;
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

.icon-wrapper{
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
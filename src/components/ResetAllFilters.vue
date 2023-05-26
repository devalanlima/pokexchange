<template>
    <div class="wrapper">
        <button @click="active">
            <span ref="$icon" class="reset-icon fa-solid fa-arrows-rotate" title="Reset all filters"></span>
            Reset all filters
        </button>
    </div>
</template>

<script setup>
import { usePokemonFilters } from '../stores/StorePokemonFilters';
const pokemonFilter = usePokemonFilters()
import { ref } from 'vue'
const $icon = ref(null)

const active = ()=>{
    pokemonFilter.resetFilters()
    $icon.value.style.transition= 'rotate 1s ease-in-out'
    $icon.value.style.rotate = '360deg'
    setTimeout(() => {
        $icon.value.style.transition= 'rotate 0s'
        $icon.value.style.rotate = '0deg'
    }, 1000);
}

</script>

<style scoped>
.wrapper {
    width: 100%;
    display: grid;
    align-items: center;
}

button {
    border: none;
    background: none;
    background-color: none;
    color: var(--color-second);
    font-size: 2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    transition: font-size .1s ease-in,  color .1s ease-in;
    user-select: none;
}

span {
    color: var(--color-second);
    font-size: 2rem;
    transition: rotate 1s ease-in-out, color .1s ease, font-size .1s ease-in;
}
button:hover span{
    font-size: 2.1rem;
    color: var(--color-third);
}
button:hover{
    font-size: 2.1rem;
    color: var(--color-third);
}
</style>
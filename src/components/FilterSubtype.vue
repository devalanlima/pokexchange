<template>
    <div class="select-wrapper">
        <select v-model="pokemon.subtype" v-if="pokemon.supertype == 'Pokémon'">
            <option value="*">All Subtypes</option>
            <option :value="subtype" v-for="subtype in subtypes.pokemon" :key="subtype">
                {{ subtype }}
            </option>
        </select>

        <select v-model="pokemon.subtype" v-else-if="pokemon.supertype == 'Trainer'">
            <option value="*">All Subtypes</option>
            <option :value="subtype" v-for="subtype in subtypes.trainer" :key="subtype">
                {{ subtype }}
            </option>
        </select>

        <select v-model="pokemon.subtype" v-else-if="pokemon.supertype == 'Energy'">
            <option value="*">All Subtypes</option>
            <option :value="subtype" v-for="subtype in subtypes.energy" :key="subtype">
                {{ subtype }}
            </option>
        </select>

    </div>
</template>

<script setup>
import { usePokemonFilters } from '../stores/pokemonFilters'
const pokemon = usePokemonFilters()

const subtypes = {
    trainer: [
        "Goldenrod Game Corner",
        "Item",
        "Pokémon Tool",
        "Pokémon Tool F",
        "Rapid Strike",
        "Rocket's Secret Machine",
        "Single Strike",
        "Stadium",
        "Supporter",
        "Technical Machine",
    ],
    pokemon: [
        "BREAK",
        "Baby",
        "Basic",
        "EX",
        "GX",
        "LEGEND",
        "Level-Up",
        "MEGA",
        "Restored",
        "Stage 1",
        "Stage 2",
        "TAG TEAM",
        "V",
        "VMAX"
    ],
    energy: [
        "Basic",
        "Rapid Strike",
        "Single Strike",
        "Special"
    ]
}
</script>

<style scoped>
.select-wrapper {
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
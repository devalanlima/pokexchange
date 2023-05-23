<template>
    <div class="select-wrapper">
        <select 
        v-model="pokemon.rarity"
        v-if="pokemon.supertype == 'Pokémon'"
        >
            <option value="*">All Rarities</option>
            <option 
            :value="rarity" 
            v-for="rarity in rarities.pokemon" 
            :key="rarity">
                {{ rarity }}
            </option>
        </select>

        <select 
        v-model="pokemon.rarity"
        v-else-if="pokemon.supertype == 'Trainer'"
        >
            <option value="*">All Rarities</option>
            <option 
            :value="rarity" 
            v-for="rarity in rarities.trainer" 
            :key="rarity">
                {{ rarity }}
            </option>
        </select>

        <select 
        v-model="pokemon.rarity"
        v-else-if="pokemon.supertype == 'Energy'"
        >
            <option value="*">All Rarities</option>
            <option 
            :value="rarity" 
            v-for="rarity in rarities.energy" 
            :key="rarity">
                {{ rarity }}
            </option>
        </select>

    </div>
</template>

<script setup>
import { usePokemonFilters } from '../stores/StorePokemonFilters'
const pokemon = usePokemonFilters()

const rarities = {
    pokemon: [
        "Common",
        "Uncommon",
        "Rare",
        "Rare Holo",
        "Rare Holo EX",
        "Rare Ultra",
        "Rare Holo GX",
        "Rare Holo LV.X",
        "Rare Prime",
        "Rare Holo V",
        "Rare BREAK",
        "Rare Holo VMAX",
        "Rare Rainbow",
        "Rare Shiny",
        "Rare Shining",
        "Amazing Rare",
        "Rare Secret",
        "Rare Shiny GX",
        "Rare Holo Star",
        "LEGEND",
        "Promo"
    ],
    trainer: [
        "Common",
        "Uncommon",
        "Rare",
        "Rare Holo",
        "Rare Ultra",
        "Rare Rainbow",
        "Rare Secret",
        "Rare ACE",
        "Promo"
    ],
    energy: [
        "Common",
        "Uncommon",
        "Rare",
        "Rare Holo",
        "Rare Ultra",
        "Rare Secret"
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
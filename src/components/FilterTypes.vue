<template>
    <div class="type-wrapper">
        <div class="input-wrapper" v-for="pokemonType in types" :key="pokemonType" @change="pokemon.setFilterType">
            <input type="checkbox" :id="pokemonType" v-model="pokemon.type" :value="pokemonType" />
            <label :for="pokemonType" :class="pokemonType">
                <img :src="`/${pokemonType}.png`" :alt="pokemonType">
                {{ pokemonType }}
            </label>
        </div>
    </div>
</template>

<script setup>
import { usePokemonFilters } from '../stores/pokemonFilters';
const pokemon = usePokemonFilters()
const types = [
    "Colorless",
    "Darkness",
    "Dragon",
    "Fairy",
    "Fighting",
    "Fire",
    "Grass",
    "Lightning",
    "Metal",
    "Psychic",
    "Water"
]
</script>

<style scoped>
.type-wrapper {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    gap: .5rem;
}

.input-wrapper {
    display: flex;
    flex-grow: 1;
}

img {
    width: 1.7rem;
    filter: saturate(2);
}

label {
    flex-grow: 1;
    padding: .5rem;
    border-radius: 1rem;
    cursor: pointer;
    font-family: var(--font-Noto-Sans);
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .4rem;
    background-color: rgba(255, 255, 255, 0.1);
}

input {
    display: none;
}

input:hover~label {
    background-color: rgba(0, 0, 0, 0.5);
}
</style>

<style>
.Colorless {
    background-color: rgba(237, 239, 241, 0.2);
    color: #EBEFF3;
}
input:checked~.Colorless {
    outline: .2rem solid #EBEFF3;
    background-color: rgba(255, 255, 255, 0.2);
}

.Darkness {   
    background-color: rgb(69, 103, 133, 0.2);
    color: #456785;
}
input:checked~.Darkness {
    outline: .2rem solid #456785;
    background-color: rgb(69, 103, 133, 0.2);
}

.Dragon {   
    background-color: rgb(202, 148, 0, 0.2);
    color: #ca9400;
}
input:checked~.Dragon {
    outline: .2rem solid #CA9400;
    background-color: rgb(202, 148, 0, 0.2);
}

.Fairy {   
    background-color: rgb(255, 60, 200, 0.2);
    color: #ff3cc8;
}
input:checked~.Fairy {
    outline: .2rem solid #FF3CC8;
    background-color: rgb(255, 60, 200, 0.2);
}

.Fighting {   
    background-color: rgb(255, 29, 0, 0.2);
    color: #ff1d00;
}
input:checked~.Fighting {
    outline: .2rem solid #FF1D00;
    background-color: rgb(255, 29, 0, 0.2);
}

.Fighting {   
    background-color: rgb(255, 29, 0, 0.2);
    color: #ff1d00;
}
input:checked~.Fighting {
    outline: .2rem solid #FF1D00;
    background-color: rgb(255, 29, 0, 0.2);
}

.Fire {   
    background-color: rgb(255, 32, 6, 0.2);
    color: #ff2006;
}
input:checked~.Fire {
    outline: .2rem solid #FF2006;
    background-color: rgb(255, 32, 6, 0.2);
}

.Grass {   
    background-color: rgb(0, 163, 23, 0.2);
    color: #00a317;
}
input:checked~.Grass {
    outline: .2rem solid #00A317;
    background-color: rgb(0, 163, 23, 0.2);
}

.Lightning {   
    background-color: rgb(255, 207, 0, 0.2);
    color: #ffcf00;
}
input:checked~.Lightning {
    outline: .2rem solid #FFCF00;
    background-color: rgb(255, 207, 0, 0.2);
}

.Metal {   
    background-color: rgb(133, 147, 163, 0.2);
    color: rgb(133, 147, 163);
}
input:checked~.Metal {
    outline: .2rem solid #8593A3;
    background-color: rgb(133, 147, 163, 0.2);
}

.Psychic{   
    background-color: rgb(212, 46, 214, 0.2);
    color: rgb(212, 46, 214);
}
input:checked~.Psychic{
    outline: .2rem solid #D42ED6;
    background-color: rgb(212, 46, 214, 0.2);
}

.Water{   
    background-color: rgb(0, 203, 255, 0.2);
    color: rgb(0, 203, 255);
}
input:checked~.Water{
    outline: .2rem solid #00CBFF;
    background-color: rgb(0, 203, 255, 0.2);
}
</style>
<template>
    <div :class="['slider-wrapper', {'slider-wrapper-checked': pokemon.isFilterHPOn}]" @change="pokemon.setFilterHP">
        <div class="toggle-HP">
            <input type="checkbox" id="toggle" :checked="pokemon.isFilterHPOn" v-model="pokemon.isFilterHPOn">
            <label v-if="pokemon.isFilterHPOn" for="toggle">HP ON</label>
            <label v-else for="toggle">HP OFF</label>
        </div>
        <div class="p-wrapper" v-if="pokemon.isFilterHPOn">
            <p class="min-hp">{{ pokemon.minHP }} HP</p>
            <p class="max-hp">{{ pokemon.maxHP }} HP</p>
        </div>
        <div class="slide-container" v-if="pokemon.isFilterHPOn">
            <input 
            type="range" 
            :min="pokemon.rangeMinHP" 
            :max="pokemon.rangeMaxHP" 
            v-model="pokemon.minHP" 
            step="10"
            class="slider" 
            id="myRange" 
            />

            <input type="range" :min="pokemon.rangeMinHP" :max="pokemon.rangeMaxHP" v-model="pokemon.maxHP" step="10"
                class="slider slider2" id="myRange"/>
        </div>
    </div>
</template>

<script setup>
import { usePokemonFilters } from '../stores/StorePokemonFilters';
import { watch } from 'vue'
const pokemon = usePokemonFilters()

watch([() => pokemon.maxHP, () => pokemon.minHP], (NewValue) => {
    if (NewValue[1] >= pokemon.maxHP) {
        if (NewValue[1] == pokemon.rangeMaxHP || NewValue[1] == pokemon.rangeMinHP) {
            pokemon.maxHP = Number(NewValue[1])
        } else {
            pokemon.maxHP = Number(NewValue[1])
        }
    }
    if (NewValue[0] <= (pokemon.minHP)) {
        if (NewValue[1] == pokemon.rangeMaxHP || NewValue[1] == pokemon.rangeMinHP) {
            pokemon.minHP = Number(NewValue[0])
        } else {
            pokemon.minHP = Number(NewValue[0])
        }
    }
})

</script>

<style scoped>
.slider-wrapper {
    --border-color: var(--color-second);
    --border-radius: 1.5rem;
    --border-weight: .2rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border-bottom: var(--border-weight) solid var(--border-color);
    border-radius: var(--border-radius);
    gap: 1rem;
    padding: .8rem;
    position: relative;
    margin-top: 1rem;

}
.slider-wrapper-checked{
    --border-color: var(--color-third);
    padding: 2rem;
}
.slider-wrapper::before {
    content: '';
    width: 100%;
    height: 100%;
    top: calc(var(--border-weight)*-1);
    left: calc(var(--border-weight)*-1);
    position: absolute;
    border: var(--border-weight) solid var(--border-color);
    border-radius: var(--border-radius);
    mask-image: linear-gradient(to right, var(--border-color) 2.5rem, transparent 2.5rem, transparent 13rem, var(--border-color) 13rem);
    -webkit-mask-image: linear-gradient(to right, var(--border-color) 2.5rem, transparent 2.5rem, transparent 13rem, var(--border-color) 13rem);
    pointer-events: none;
}

.toggle-HP {
    display: flex;
    align-items: center;
    color: var(--color-second);
    cursor: pointer;
    pointer-events: all;
    user-select: none;
    left: 2.7rem;
    top: -1rem;
    position: absolute;
    width: 100%;
    font-size: 2rem;
    gap: 1rem;
}

.toggle-HP input {
    -webkit-appearance: none;
    appearance: none;
    width: 2rem;
    height: 2rem;
    border: .2rem solid var(--color-second);
    cursor: pointer;
}

.toggle-HP label {
    cursor: pointer;
    font-weight: 700;
    width: 100%;
}

.toggle-HP input:checked {
    border-color: var(--color-third);
}

.toggle-HP input:checked+label {
    color: var(--color-third);
}

.toggle-HP input:checked::after {
    content: '\2713';
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-third);
    font-weight: bolder;
    margin-top: -.3rem;
    margin-left: .1rem;
    padding: .1rem;
    font-size: 1.8rem;
}

.p-wrapper {
    display: flex;
    justify-content: space-between;
}

.min-hp,
.max-hp {
    display: inline;
    font-size: 2rem;
    font-family: var(--font-Noto-Sans);
}

.min-hp {
    color: var(--color-second);
}

.max-hp {
    color: var(--color-third);
}

.slide-container {
    width: 100%;
    height: 1rem;
    position: relative;
    background: #d3d3d377;
    border-radius: 1rem;
    display: flex;
    align-items: center;
}

.slider {
    -webkit-appearance: none;
    -moz-appearance: none;
    margin: 0;
    appearance: none;
    width: 93%;
    height: 100%;
    background: transparent;
    outline: none;
    opacity: 0.7;
    -webkit-transition: .2s;
    -moz-transition: .2s;
    transition: opacity .2s;
    border-radius: 1rem;
    pointer-events: none;
    position: absolute;
}

.slider2 {
    right: 0;
}

.slider:hover {
    opacity: 1;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    border-radius: 50%;
    pointer-events: all;
}

.slider::-moz-range-thumb {
    -moz-appearance: none;
    appearance: none;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    border-radius: 50%;
    pointer-events: all;
    border: none;
}

.slider::-webkit-slider-thumb {
    background: var(--color-second);
}

.slider2::-webkit-slider-thumb {
    background: var(--color-third);
}

.slider::-moz-range-thumb {
    background: var(--color-second);
}

.slider2::-moz-range-thumb {
    background: var(--color-third);
}
</style>
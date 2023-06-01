<template>
    <div class="modal" v-if="!isFinished">
        <div class="wrapper-card">
            <ParallaxEffect class="card" :rarity-card="pokemon.rarity">
                <img :src="pokemon.src" :alt="pokemon.name">
            </ParallaxEffect>
            <div class="wrapper-price">
                <button class="buy-button">
                    <span>
                        <i class="fa-solid fa-cart-shopping"></i>
                    </span>
                    <PriceConvert class="price" :price-e-u-r="pokemon.price" />
                </button>

            </div>
        </div>
        <div class="wrapper-infos">
            <div class="wrapper-name">
                <h3>{{ pokemon.name }} </h3>
                <img class="poke-type" v-for="pokeType in pokemon.types" :key="pokeType" :src="`/${pokeType}.png`"
                    :alt="`Pokemon type ${pokeType}`">
            </div>
            <div class="container-infos" v-if="pokemon.abilities.length">
                <h4>Abilities</h4>
                <div class="infos" v-for="abilitie in pokemon.abilities" :key="abilitie.name">
                    <h5>{{ abilitie.name }}</h5>
                    <p>{{ abilitie.text }}</p>
                </div>
            </div>
            <div class="container-infos" v-if="pokemon.attacks.length">
                <h4>Attacks</h4>
                <div class="infos" v-for="attack in pokemon.attacks" :key="attack.name">
                    <div class="wrapper-name">
                        <h5>{{ attack.damage }} {{ attack.name }} </h5>
                        <img class="cost-attack" v-for="attack in attack.cost" :key="attack" :src="`/${attack}.png`"
                            :alt="`Pokemon type ${attack}`">
                    </div>
                    <p>{{ attack.text }}</p>
                </div>
            </div>
            <div class="rules" v-if="pokemon.rules.length">
                <p v-for="rule in pokemon.rules" :key="rule">
                    {{ rule }}
                </p>
            </div>
            <div class="traits">
                <div class="container-trait" v-if="pokemon.weaknesses.length">
                    <h5>WEAKNESSES</h5>
                    <div class="trait" v-for="weakness in pokemon.weaknesses" :key="weakness">
                        <img class="cost-attack" :src="`/${weakness.type}.png`" alt="">
                        <p>{{ weakness.value }}</p>
                    </div>
                </div>
                <div class="container-trait" v-if="pokemon.resistances.length">
                    <h5>RESISTANCES</h5>
                    <div class="trait" v-for="resistance in pokemon.resistances" :key="resistance">
                        <img class="cost-attack" :src="`/${resistance.type}.png`" alt="">
                        <p>{{ resistance.value }}</p>
                    </div>
                </div>
                <div class="container-trait" v-if="pokemon.retreatCost.length">
                    <h5>RETREAT COST</h5>
                    <div class="trait">
                        <img v-for="retreat in pokemon.retreatCost" :key="retreat" class="cost-attack"
                            :src="`/${retreat}.png`" alt="">
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import ParallaxEffect from './ParallaxEffect.vue';
import PriceConvert from './PriceConvert.vue'

import axios from 'axios'
import { useAxios } from '@vueuse/integrations/useAxios'
import { onMounted, reactive, ref } from 'vue';

const instance = axios.create({
    baseURL: 'https://api.pokemontcg.io/v2',
    Headers: {
        'X-Api-Key': 'e5551245-1708-4b50-aa17-610cda943f9f'
    }
})
const { data, execute } = useAxios(instance)

const props = defineProps({
    pokemonId: { type: String, default: 'ex13-2' }
})

const pokemon = reactive({
    name: '',
    src: '',
    types: '',
    abilities: '',
    attacks: '',
    rules: '',
    weaknesses: '',
    retreatCost: '',
    resistances: '',
    price: 0,
    rarity: '',
})


const isFinished = ref(true)
onMounted(() => {
    execute(`/cards/${props.pokemonId}`)
        .then(() => {
            const myData = data.value.data
            pokemon.src = myData.images.large
            pokemon.name = myData.name
            pokemon.types = myData.types
            pokemon.rarity = myData.rarity
            if (Object.prototype.hasOwnProperty.call(myData, 'cardmarket')) {
                pokemon.price = myData.cardmarket.prices.trendPrice
            } else {
                pokemon.price = "NO OFFERS"
            }
            if (Object.prototype.hasOwnProperty.call(myData, 'attacks')) {
                pokemon.attacks = myData.attacks
            }
            if (Object.prototype.hasOwnProperty.call(myData, 'abilities')) {
                pokemon.abilities = myData.abilities
            }
            if (Object.prototype.hasOwnProperty.call(myData, 'rules')) {
                pokemon.rules = myData.rules
            }
            if (Object.prototype.hasOwnProperty.call(myData, 'resistances')) {
                pokemon.resistances = myData.resistances
            }
            if (Object.prototype.hasOwnProperty.call(myData, 'weaknesses')) {
                pokemon.weaknesses = myData.weaknesses
            }
            if (Object.prototype.hasOwnProperty.call(myData, 'retreatCost')) {
                pokemon.retreatCost = myData.retreatCost
            }
            isFinished.value = !isFinished.value
        })
        .catch((error) => { console.log(error); })
})


</script>

<style scoped>
.modal {
    box-sizing: border-box;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background-color: rgba(24, 20, 65, 0.589);
    border: .2rem solid rgba(255, 255, 255, 0.425);
    border-radius: 3rem;
    backdrop-filter: blur(1rem);
    z-index: 3;
    box-shadow: 0 0 10rem rgb(15, 15, 54);
    display: flex;
    max-width: 75rem;
}

.wrapper-card {
    display: flex;
    flex-direction: column;
    padding-bottom: 2rem;
}

.buy-button {
    box-sizing: border-box;
    background: none;
    border: none;
    font-size: 2rem;
    color: var(--color-white);
    border: .1rem solid var(--color-white);
    border-radius: 1.5rem;
    padding: 1rem 2rem;
    background-color: rgba(131, 131, 131, 0.315);
    cursor: pointer;
    transition: scale .1s ease-in;
    display: flex;
    gap: 2rem;
    width: 100%;
    margin: 0 2.5rem;
    justify-content: space-around;
}

.buy-button:hover {
    scale: 1.05;
}

span {
    margin-top: .2rem;
}

.price {
    display: flex;
    align-items: center;
}

.wrapper-price {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
}

.card {
    width: 35rem;
    height: 46rem;
}

.card img {
    object-fit: cover;
    width: 100%;
    height: 100%;
}

.wrapper-name {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
}


h3 {
    font-family: var(--font-Noto-Sans);
    font-size: 3.5rem;
}


.poke-type {
    width: 3rem;
    height: 3rem;
    object-fit: scale-down;
}

.wrapper-infos {
    display: flex;
    flex-direction: column;
    padding: 2rem 2rem 2rem 0;
    gap: 2rem;
    text-shadow: 0 0 1rem rgba(25, 24, 61, 0.726);
    min-width: 20rem;
}

.container-infos {
    --border-radius: 1.5rem;
    margin-top: 2rem;
    position: relative;
    border-radius: var(--border-radius);
    padding: 2rem 1.5rem 1.5rem;
    border-bottom: .2rem solid var(--color-white);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    min-width: 19rem;
}

.container-infos::before {
    box-sizing: border-box;
    content: '';
    width: 100%;
    height: 100%;
    top: .2rem;
    left: 0;
    position: absolute;
    border: .2rem solid var(--color-white);
    border-radius: var(--border-radius);
    mask-image: linear-gradient(to right, var(--color-white) 2.5rem, transparent 2.5rem, transparent 14.5rem, var(--color-white) 14.5rem);
    -webkit-mask-image: linear-gradient(to right, var(--color-white) 2.5rem, transparent 2.5rem, transparent 14.5rem, var(--color-white) 14.5rem);
    pointer-events: none;
}

h4 {
    font-family: var(--font-Noto-Sans);
    position: absolute;
    left: 3rem;
    top: 0;
    transform: translateY(-50%);
    font-size: 3rem;
}

h5 {
    font-family: var(--font-Noto-Sans);
    font-size: 2rem;
}

.rules {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    font-size: 2rem;
    max-width: 50rem;
}

.infos {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.cost-attack {
    width: 2rem;
    height: 2rem;
    object-fit: scale-down;
}

p {
    font-family: var(--font-Noto-Sans);
    font-size: 1.6rem;
}

.traits {
    display: flex;
    justify-content: space-around;
    gap: .5rem;
    min-width: 30.5rem;
}

.container-trait {
    display: inline-flex;
    flex-direction: column;
    gap: .5rem;

}

.container-trait h5 {
    font-size: 1.3rem;
}

.trait {
    display: flex;
    gap: .5rem;
    align-items: center;
    justify-content: center;
}
</style>
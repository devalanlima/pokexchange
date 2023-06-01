<template>
    <article>
        <div class="presentation">
            <h2>
                Buy, Sell and Trade hundreds NFT
                <span class="pokemonString">
                    Pokémon
                </span>
                <span class="cardsString">
                    Cards
                </span>
            </h2>
            <p class="info">
                A non-fungible token (NFT) is a unique digital identifier that cannot be copied, substituted, or
                subdivided, that is recorded in a blockchain, and that is used to certify ownership and authenticity.
            </p>
            <div class="datas">
                <div class="data">
                    <p>950M</p>
                    <p>Total Volum</p>
                </div>
                <div class="data">
                    <p>800+</p>
                    <p>Asset Number</p>
                </div>
                <div class="data">
                    <p>120K</p>
                    <p>Daily Trades</p>
                </div>
            </div>
        </div>
        <div class="three-cards">
            <div class="card1">
                <ParallaxEffect :rarityCard="'Rare Holo VMAX'">
                    <img src="https://images.pokemontcg.io/swsh3/20_hires.png" alt="Charizard card">
                </ParallaxEffect>
            </div>
            <div class="card2">
                <img src="https://images.pokemontcg.io/g1/18_hires.png" alt="Blastoise card">
            </div>
            <div class="card3">
                <img src="https://images.pokemontcg.io/xy1/2_hires.png" alt="Ivysaur card">
            </div>
        </div>
    </article>
</template>

<script setup>
import ParallaxEffect from './ParallaxEffect.vue';
</script>

<style scoped>
article {
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    position: relative;
    flex-wrap: wrap;
    gap: 4rem;
    margin: 6rem 0;

}

.presentation {
    max-width: 60rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

h2 {
    font-family: var(--font-Noto-Sans);
    font-weight: 700;
    font-size: 6rem;
    line-height: 7rem;
}

.pokemonString {
    color: var(--color-second);
}

.cardsString {
    color: var(--color-third)
}

.info {

    font-family: var(--font-Roboto);
    font-weight: 300;
    text-align: justify;
    font-size: 2.5rem;
    color: var(--color-white);
    line-height: 3.5rem;
}

.datas {

    display: flex;
    justify-content: space-between;
    justify-items: start;
}

.data {
    font-family: var(--font-Roboto);
    color: var(--color-white);
    display: block;
    text-align: center;
}

.data :first-child {
    font-size: 5rem;
    font-weight: 700;
}

.data :last-child {
    font-size: 2.5rem;
    font-weight: 200;
}

.three-cards {
    width: 55rem;
    height: 52rem;
    position: relative;
}

.card1,
.card2,
.card3 {
    position: absolute;
}

.card1 {
    top: 2rem;
    left: 0rem;
    rotate: -10deg;
    z-index: 2;
}

.card2 {
    left: 10rem;
    top: 0;
    rotate: 0deg;
    z-index: 1;
    pointer-events: none;
}

.card3 {
    top: 2rem;
    left: 20rem;
    rotate: 10deg;
    pointer-events: none;
}

.card1 img,
.card2 img,
.card3 img {
    width: 32.1rem;
    height: 45rem;
}
</style>

<style scoped>
@media (max-width: 599px) {

    /* Extra Small */
    h2 {
        font-size: 4rem;
        line-height: 5rem;
    }

    .data :first-child {
        font-size: 3rem;
    }

    .data :last-child {
        font-size: 1.6rem;
    }
    .card2, .card3{
        display: none;
    }
    .card1{
        rotate: 0deg;
        position: relative;
    }
}

@media (min-width: 600px) and (max-width: 768px) {
    /* Small */

}

@media (min-width: 768.1px) and (max-width: 1024px) {
    /* Medium */

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

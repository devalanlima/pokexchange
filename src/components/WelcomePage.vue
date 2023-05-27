<template>
    <article>
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
        <div class="three-cards">
            <div class="card1">
                <SearchCards
                    :order="'number'"
                    :pageSize="1"
                    :currentPage="1"
                    :name="'char'"
                    :subtype="'*'"
                    :supertype="'*'"
                    :rarity="'Rare Holo VMAX'"
                    :type="''"
                    :hp="''"
                    :imageSize="'large'"
                    :havePrice="false"
                />
            </div>
            <div class="card2">
                <SearchCards
                    :order="'number'"
                    :pageSize="1"
                    :currentPage="1"
                    :name="'blastoise'"
                    :subtype="'MEGA'"
                    :supertype="'*'"
                    :rarity="'*'"
                    :type="''"
                    :hp="''"
                    :imageSize="'large'"
                    :havePrice="false"
                />
            </div>
            <div class="card3">
                <SearchCards
                    :order="'number'"
                    :pageSize="1"
                    :currentPage="1"
                    :name="'ven'"
                    :subtype="'MEGA'"
                    :supertype="'*'"
                    :rarity="'*'"
                    :type="''"
                    :hp="''"
                    :imageSize="'large'"
                    :havePrice="false"
                />
            </div>
        </div>
    </article>
</template>

<script setup>
import SearchCards from './SearchCards.vue';
</script>

<style scoped>
article {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 10rem auto 15rem;
    flex-wrap: wrap;
    position: relative; 
    gap: 4rem;
    padding: 0 10rem;
}

h2 {
    font-family: var(--font-Noto-Sans);
    font-weight: 700;
    font-size: 6rem;
    width: 60rem;
    line-height: 7rem;
}

.pokemonString {
    color: var(--color-second);
}

.cardsString {
    color: var(--color-third)
}

.info {
    width: 60rem;
    font-family: var(--font-Roboto);
    font-weight: 300;
    text-align: justify;
    font-size: 2.5rem;
    color: var(--color-white);
    line-height: 3.5rem;
}

.datas {
    width: 60rem;
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
.three-cards{
    width: 60rem;
    height: 55rem;
    position: absolute;
    right: 10rem;
}
.card1, .card2, .card3{
    position: absolute;
}
.card1{
    top: 3rem;
    left: 0rem;
    rotate: -10deg;
    z-index: 2;
}
.card2{
    left: 10rem;
    top: 0;
    rotate: 0deg;
    z-index: 1;
    pointer-events: none;
}

.card3{
    top: 1rem;
    left: 20rem;
    rotate: 10deg;
    pointer-events: none;
}
</style>
<style>
.card1 img, .card2 img, .card3 img {
    width: 32.1rem;
    height: 45rem;
}

.card1 .loading, .card2 .loading, .card3 .loading  {
    width: 27.1rem;
    height: 40rem;
}
</style>
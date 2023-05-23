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
            <SearchCards
                :order="'number'"
                :pageSize="1"
                :currentPage="2"
                :name="'char'"
                :subtype="'MEGA'"
                :supertype="'*'"
                :rarity="'*'"
                :type="''"
                :hp="''" 
                :imageSize="'large'"
            />
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
            />
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
            />
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
    line-height: 8rem;
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
    box-sizing: border-box;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
    width: 69rem;
    height: 50rem;
    
}

</style>

<style>
.three-cards .loading{
    height: 43rem;
    width: 30rem;
}
.three-cards img{
    height: 43rem;
    width: 30rem;
}
.three-cards :nth-last-child(3){
    position: absolute;
    left: 0;
    top: 2rem;
    z-index: 2;
    rotate: -13deg;
}
.three-cards :nth-child(2){
    position: absolute;
    left: 12rem;
    top: 0;
    z-index: 1;
}
.three-cards :nth-child(3){
    position: absolute;
    left: 24rem;
    rotate: 13deg;
    top: 2rem;
}
</style>
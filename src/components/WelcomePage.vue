<template>
    <article>
        <h2>Buy, Sell and Trade hundreds NFT <span class="pokemonString">Pokémon</span> <span
                class="cardsString">Cards</span></h2>
        <p class="info">A non-fungible token (NFT) is a unique digital identifier that cannot be copied, substituted, or
            subdivided, that is recorded in a blockchain, and that is used to certify ownership and authenticity.</p>
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
    </article>
</template>

<script setup>

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
    padding: 0 2rem;
}

h2 {
    font-family: var(--font-Noto-Sans);
    font-weight: 700;
    font-size: 6rem;
    width: 70rem;
    line-height: 8rem;
}

.pokemonString {
    color: var(--color-second);
}

.cardsString {
    color: var(--color-third)
}

.info {
    width: 70rem;
    font-family: var(--font-Roboto);
    font-weight: 300;
    text-align: justify;
    font-size: 2.5rem;
    color: var(--color-white);
}

.datas {
    width: 70rem;
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
}</style>
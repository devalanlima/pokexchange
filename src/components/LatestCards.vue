<template>
    <div class="latest-cards">
        <h3>Latest Cards</h3>
        <div class="cards-wrapper">
            <SearchCards :order="'number'" :pageSize="10" :currentPage="randomInt(1070, 2)" :name="''"
                :subtype="'*'" :supertype="'*'" :rarity="'*'" :type="''" :hp="''" />
        </div>
    </div>
</template>

<script setup>
import SearchCards from "../components/SearchCards.vue";

const randomInt = (max, min) => {
    const randomPage = Math.floor(Math.random() * (max + 1 - min) + min)
    return randomPage
}
</script>

<style scoped>
.cards-wrapper * {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));
    gap: 4rem;
    place-items: center;

}

h3 {
    font-family: var(--font-Noto-Sans);
    font-size: 30px;
    font-weight: 700;
    margin-bottom: 40px;
    margin-left: 20px;
}
</style>
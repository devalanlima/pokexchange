<template>
    <div class="cards-wrapper">
        <SearchCards 
            :pageSize="10" 
            :currentPage="1" 
            :name="''"
            :subtype="'*'" 
            :supertype="'Pokémon'" 
            :rarity="'*'"
            :type="''" 
            :hp="''" />
    </div>
</template>

<script setup>
import SearchCards from "../components/SearchCards.vue";
</script>

<style scoped>
    .cards-wrapper *{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        gap: 3rem;
        
    }
</style>
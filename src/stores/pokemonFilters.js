import { defineStore } from "pinia";

export const usePokemonFilters = defineStore({
    id: 'filters',
    state: () =>({
        order: 'name', 
        /* 
            name: Sort by name in ascending order
            -name: Sort by name in descending order
            set.name: Sort by set name in ascending order
            -set.name: Sort by set name in descending order
            number: Sort by card number in ascending order
            -number: Sort by card number in descending order
            rarity: Sort by rarity in ascending order
            -rarity: Sort by rarity in descending order
        */
        name: '',
        subtype: '',
        supertype:'',
        rarity: '',
        type1: '|', //search cards of one OR other
        type2: '|', //if type1 and type2 are diferent types, the search return one AND other
        minHP: 0,
        maxHP: 350,   
    })
})
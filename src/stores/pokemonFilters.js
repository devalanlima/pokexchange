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
        subtype: '*',
        supertype:'Pokémon',
        rarity: '*',
        type: [],
        minHP: 0,
        maxHP: 350, 
        filterHP: ``,  // hp:[${this.pokemon.minHP} TO ${this.pokemon.maxHP}]
        selectedType: ''
    }),
    getters:{
        setSelectedType: (state)=>{    
            let temp = ''
            state.type.forEach(element => {
                temp = `types:"${element}" ` + temp
            });
            state.selectedType = temp
        },
        selectedSupertype: (state)=>{
            if(state.supertype !== 'Pokémon'){
                state.type = []
                state.selectedType = ''
            }
        }
    }
})
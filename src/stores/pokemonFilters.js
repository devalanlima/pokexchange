import { defineStore } from "pinia";

export const usePokemonFilters = defineStore({
    id: 'filters',
    state: () =>({
        order: 'name', 
        name: '',
        subtype: '*',
        supertype:'Pokémon',
        rarity: '*',
        type: [],
        isFilterHPOn: false,
        rangeMinHP: 30,
        rangeMaxHP: 340,
        minHP: 30,
        maxHP: 340, 
        filterHP: '',
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
        },
        setSelectedHP: (state) =>{
            if(state.isFilterHPOn){
            state.filterHP = `hp:[${state.minHP} TO ${state.maxHP}]`   
            } else {
                state.filterHP = ''
            }
        },
    }
})
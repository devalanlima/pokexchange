import { defineStore } from "pinia";

export const usePokemonFilters = defineStore({
    id: 'filters',
    state: () => ({
        order: 'name',
        name: '',
        subtype: '*',
        supertype: 'Pokémon',
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
    getters: {
        getSelectedType: (state) => {
            let temp = '';
            state.type.forEach(element => {
                temp += `types:"${element}" `;
            });
                return temp;
        },
        getFilterHP: (state) => {
            if (state.isFilterHPOn) {
                return `hp:[${state.minHP} TO ${state.maxHP}]`;
            } else {
                return '';
            }
        },
    },
    actions: {
        setFilterHP() {
            this.filterHP = this.getFilterHP
        },
        setSelectedType() {
            this.selectedType = this.getSelectedType
        },
        resetFilters() {
            this.order= 'name',
            this.name= '',
            this.subtype= '*',
            this.rarity= '*',
            this.type= [],
            this.isFilterHPOn= false,
            this.rangeMinHP= 30,
            this.rangeMaxHP= 340,
            this.minHP= 30,
            this.maxHP= 340,
            this.filterHP= '',
            this.selectedType= ''
        }
    }
});

import { defineStore } from "pinia";

export const useOffsetPagination = defineStore({
    id: 'pagination',
    state: () =>({
        totalPages: 535,
        pageSize: 25,
        currentPage: 1,
    }),
    actions:{
        incrementCurrentPage() {
            this.currentPage++
        },
        decrementCurrentPage() {
            this.currentPage--
        }
    }
})
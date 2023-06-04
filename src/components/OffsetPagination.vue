<template>
    <div class="pagination-wrapper">
        <button @click="pagination.decrementCurrentPage" :disabled="pagination.currentPage === 1">
            <i :class="['fa-solid fa-play fa-flip-horizontal', { 'disabled': pagination.currentPage == 1 || pagination.currentPage == 0 }]"
                title=" Previous">
            </i>
        </button>
        <p>PAGE
            <input ref="input" type="number" min="1" title="current page" placeholder="1" :max="pagination.totalPages" v-model.number="validNumber" @keydown="preventSpecialChar"
                @blur="updateInputValue" />
            OF {{ pagination.totalPages }}
        </p>
        <button @click="pagination.incrementCurrentPage" :disabled="pagination.currentPage === pagination.totalPages">
            <i :class="['fa-solid fa-play', { 'disabled': pagination.currentPage == pagination.totalPages || pagination.currentPage == 0  }]"
                title="Next"></i>
        </button>
    </div>
</template>

<script setup>
import { useOffsetPagination } from '../stores/StoreOffsetPagination';
import { computed } from 'vue';

const pagination = useOffsetPagination()

const validNumber = computed({
    get() {
        return pagination.currentPage || ''
    },
    set(value) {
        if (value !== '') {
            pagination.currentPage = parseInt(value)
        }
    }
})

const preventSpecialChar = (event) => {
    if (event.key === "-" || event.key === "+" || event.key === ".") {
        event.preventDefault();
    }
}

const updateInputValue = () => {
    const input = document.querySelector('.pagination-wrapper input')
    input.value = pagination.currentPage
}

</script>


<style scoped>
.pagination-wrapper {
    display: flex;
    align-items: center;
    user-select: none;
    gap: 1.2rem;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
}
input[type="number"] {
    -moz-appearance: textfield;
    appearance: textfield;
}
input[type="number"]:hover,
input[type="number"]:focus {
    -moz-appearance: number-input;
    appearance: number-input;
}

input {
    display: inline;
    background: transparent;
    padding: .5rem;
    color: var(--corlor-white);
    font-family: var(--font-Roboto);
    font-size: 2rem;
    border: none;
    border: .1rem solid var(--color-third);
    border-radius: 1rem;
    width: 4rem;
    text-align: center;
}

input:focus {
    outline: none;
    border-color: var(--color-second);
}

p {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-Roboto);
    font-size: 2rem;
    color: var(--color-third);
    gap: 1.2rem;
}

button {
    background: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    outline: none;
    border: none;
    user-select: none;
}

button:disabled,
button[disabled] {
    border: none;
    background: none;
    color: transparent;
    outline: none;
}

.fa-play {
    color: var(--color-third);
    font-size: 2rem;
    opacity: .7;
    -webkit-transition: .2s;
    -moz-transition: .2s;
    transition: opacity .2s;
}

.fa-play:hover {
    opacity: 1;
}

.disabled {
    color: var(--color-second);
    opacity: 1;
    cursor: not-allowed;
}
</style>
<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import MainFooter from './components/MainFooter.vue';
</script>

<template>
    <header>
        <NavBar />
    </header>
    <RouterView />

    <div class="background">
        <div class="circle1">
            <div class="circle2">
                <div class="circle1">
                    <div class="circle2">
                    </div>
                </div>
            </div>
        </div>
        <div class="circle3">
            <div class="circle1"></div>
        </div>
    </div>

    <footer>
        <MainFooter/>
    </footer>
</template>

<style scoped>
.background {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    position: fixed;
    overflow: hidden;
    z-index: -1;
}

.circle1 {
    width: 25rem;
    height: 25rem;
    background-color: var(--color-second);
    border-radius: 50%;
    animation: wiggle 45s infinite linear;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    -moz-filter: blur(15rem);
    filter: blur(15rem);
}

.circle2 {
    width: 35rem;
    height: 35rem;
    background-color: var(--color-third);
    border-radius: 50%;
    animation: wiggle 45s infinite linear;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    -moz-filter: blur(15rem);
    filter: blur(15rem);
}

.circle3 {
    width: 35rem;
    height: 35rem;
    background-color: var(--color-third);
    border-radius: 50%;
    animation: wiggle 60s infinite linear;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    -moz-filter: blur(15rem);
    filter: blur(15rem);
}

@keyframes wiggle {
    0% {
        transform: rotate(0deg) translate(200%) rotate(360deg);
    }

    50% {
        transform: rotate(-360deg) translate(200%) rotate(100deg);
    }

    100% {
        transform: rotate(0deg) translate(200%) rotate(0deg);
    }
}
</style>

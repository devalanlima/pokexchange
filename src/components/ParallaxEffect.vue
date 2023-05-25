<template>
    <div class="container-wrapper" @mousemove="mouseEffect" @mouseleave="resetPosition" ref="$wrapper">
        <div class="container" ref="$container">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const centerX = ref(null)
const centerY = ref(null)
const cordsY = ref(null)
const cordsX = ref(null)
const $container = ref(null)
const $wrapper = ref(null)


const mouseEffect = (event) => {
    const element = $wrapper.value.getBoundingClientRect()
    centerX.value = element.x + (element.width / 2)
    centerY.value = element.y + (element.height / 2)
    cordsY.value = ((centerX.value - event.clientX) * -1) / element.width
    cordsX.value = (centerY.value - event.clientY) / element.height
    $container.value.style.transform = `rotateX(${cordsX.value * 40}deg) rotateY(${cordsY.value * 30}deg)`
}

let timeoutId
const resetPosition = () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
        $container.value.style.transform = `rotateX(0deg) rotateY(0deg)`
    }, 500);
}
</script>

<style scoped>
.container-wrapper {
    width: 100%;
    height: 100%;
    perspective: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 2.5rem;
    user-select: none;
}

.container {
    width: 100%;
    height: 100%;
    transition: .45s cubic-bezier(.2, .49, .32, .99);
    transform-style: preserve-3d;
    border-radius: 1rem;
    box-shadow: 
    .3rem .3rem .5rem rgba(11, 7, 34, 0.527),
    .9rem .9rem 2rem rgba(11, 7, 34, 0.527);
}

</style>
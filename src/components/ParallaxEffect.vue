<template>
    <div class="container-wrapper" @mousemove="mouseEffect" @mouseleave="resetPosition" ref="$wrapper">
        <div class="container" ref="$container">
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

const elementWidth = ref(null)
const elementHeight = ref(null)
const elementOffsetTop = ref(null)
const elementOffsetLeft = ref(null)
const centerX = ref(null)
const centerY = ref(null)
const cordsY = ref(null)
const cordsX = ref(null)
const $container = ref(null)
const $wrapper = ref(null)

onMounted(() => {
    
})

const mouseEffect = (event) => {
    elementHeight.value = $wrapper.value.offsetHeight
    elementWidth.value = $wrapper.value.offsetWidth
    elementOffsetTop.value = $wrapper.value.offsetTop
    elementOffsetLeft.value = $wrapper.value.offsetLeft
    centerX.value = elementOffsetLeft.value + (elementWidth.value / 2)
    centerY.value = elementOffsetTop.value + (elementHeight.value / 2)
    cordsY.value = ((centerX.value - event.pageX) * -1) / elementWidth.value
    cordsX.value = (centerY.value - event.pageY) / elementHeight.value
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
    position: relative;
    padding: 3rem;
}

.container {
    width: 100%;
    height: 100%;
    transition: .45s cubic-bezier(.2, .49, .32, .99);
    transform-style: preserve-3d;
    position: relative;
}
</style>
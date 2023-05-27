<template>
    <div class="container-wrapper" @mousemove="mouseEffect" @mouseleave="resetPosition" ref="$wrapper">
        <div class="container" ref="$container">

            <img v-if="haveEffect" class="effect" src="/reflexes/holo.jpg" ref="$effect"
                alt="Holographic effect">
            <img class="grain" src="/reflexes/grain.webp" alt="Grain Effect">
            <slot></slot>
            <div class="shine" ref="$shine" :style="cardRarity">
            </div>
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
const $shine = ref(null)
const $wrapper = ref(null)
const shineX = ref(null)
const shineY = ref(null)
const $effect = ref(null)

const haveEffect = ref(false)

if (props.rarityCard.includes('Holo') ||
    props.rarityCard.includes('Secret') ||
    props.rarityCard.includes('Promo')) {
    haveEffect.value = true
}

const mouseEffect = (event) => {
    const elementWrapper = $wrapper.value.getBoundingClientRect()
    const elementShine = $shine.value.getBoundingClientRect()
    centerX.value = elementWrapper.x + (elementWrapper.width / 2)
    centerY.value = elementWrapper.y + (elementWrapper.height / 2)
    cordsY.value = ((centerX.value - event.clientX) * -1) / elementWrapper.width
    cordsX.value = (centerY.value - event.clientY) / elementWrapper.height
    $container.value.style.transform = `rotateX(${cordsX.value * 40}deg) rotateY(${cordsY.value * 30}deg)`


    shineX.value = (elementWrapper.x + (elementShine.width / 2) - event.clientX) * -1
    shineY.value = (elementWrapper.y + (elementShine.height / 2) - event.clientY) * -1
    $shine.value.style.transform = `translateX(${-shineX.value}px) translateY(${-shineY.value}px)  scale(1.3)`
    if (haveEffect.value) {
        $effect.value.style.transform = `translateX(calc(-50% - ${cordsX.value * 250}px)) translateY(calc(-50% - ${cordsY.value * 50}px)) `
    }
}

let timeoutId
const resetPosition = () => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
        $container.value.style.transform = `rotateX(0deg) rotateY(0deg)`
        $shine.value.style.transform = `translateX(0px) translateY(0px)`
    }, 500);
}

const props = defineProps({
    rarityCard: { type: String, default: 'Common' }
})

const cardRarity = ref({
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '15em',
    height: '20em',
    borderRadius: '50%',
    background: 'white',
    filter: 'blur(4rem)',
    mixBlendMode: 'overlay',
    opacity: '.5',
    zIndex: '2',
    transition: 'opacity .5s ease-out',
})

const effectOne = [
    'Common',
    'Uncommon',
    'Rare',
    'Rare Holo EX',
    'Rare Ultra',
    'Rare Holo GX',
    'Rare Holo LV.X',
    'Rare Prime',
    'Rare Holo V',
    'Rare Shiny',
    'Rare Shining',
    'Amazing Rare',
    'Rare Holo Star',
    'LEGEND',
    'Rare Holo',
    'Promo',
]

const effectTwo = [
    'Rare Holo VMAX',
    'Rare ACE',
    'Rare Secret',
]

const effectThree = [
    'Rare BREAK',
]

const effectFour = [
    'Rare Rainbow'
]

switch (true) {
    case effectOne.includes(props.rarityCard):
        cardRarity.value.background = 'white'
        break;

    case effectTwo.includes(props.rarityCard):
        cardRarity.value.background = 'linear-gradient(to left, #00d0ff, #f700ffce)'
        cardRarity.value.width = '100%'
        cardRarity.value.height = '100%'
        cardRarity.value.opacity = '.6'
        cardRarity.value.top = '-5rem'
        cardRarity.value.left = '0'
        break

    case effectThree.includes(props.rarityCard):
        cardRarity.value.background = '#ffa600'
        cardRarity.value.opacity = '.6'
        cardRarity.value.mixBlendMode = 'overlay'
        break

    case effectFour.includes(props.rarityCard):
        cardRarity.value.width = '100%'
        cardRarity.value.height = '100%'
        cardRarity.value.top = '-5rem'
        cardRarity.value.left = '0'
        cardRarity.value.background = 'linear-gradient(to left, #00d0ff, #f700ffce, orange, green)'
        cardRarity.value.opacity = '1'
        cardRarity.value.mixBlendMode = 'overlay'
        break

    default:
        break;
}

</script>

<style scoped>
.container-wrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    perspective: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    padding: 2.5rem;
    user-select: none;
    cursor: pointer;
}

.container {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    overflow: hidden;
    border-radius: 1rem;
    text-align: center;
    transition: box-shadow 0.4s ease, opacity .33s ease-out, transform .45s cubic-bezier(.2, .49, .32, .99);
    box-shadow: 0 0 3px -1px transparent,
        0 0 2px 1px transparent,
        0 0 5px 0px transparent,
        0px 10px 20px -5px black,
        0 2px 15px -5px black,
        0 0 20px 0px transparent;
}

.grain {
    width: 110%;
    height: 120%;
    object-fit: cover;
    pointer-events: none;
    position: absolute;
    opacity: 1;
    left: 0;
    mix-blend-mode: screen;
}

.effect {
    position: absolute;
    width: 300%;
    height: 300%;
    object-fit: cover;
    transform: translateX(-50%) translateY(-50%);
    mix-blend-mode: overlay;
    opacity: .5;
}
</style>
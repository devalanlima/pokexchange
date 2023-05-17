<template>
    <nav>
        <RouterLink class="logo" to="/">
            <img src="/pokeXchangeLogo.png" alt="PokeXChange Logo">
            <h1><span class="nav-poke">Poke</span>X<br><span class="nav-change">change</span></h1>
        </RouterLink>
        <div class="links-nav">
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/market">Market</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </div>
        <button>
            <div class="btn-style1">Connect Wallet</div>
            <span class="btn-style2"></span>
        </button>
    </nav>
</template>

<style scoped>
nav {
    width: 90vw;
    max-width: 170rem;
    font-size: 2rem;
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    align-items: center;
    color: var(--color-white);
    margin: 2rem auto;
    overflow: hidden;
}

.logo {
    display: flex;
    align-items: center;
    font-family: var(--font-Noto-Sans);
    font-weight: 800;
    margin-left: -1.2rem;
}

.logo img {
    height: 12rem;
}

.nav-poke {
    color: var(--color-second);
}

.nav-change {
    color: var(--color-third);
    margin-left: -1rem;
}

.links-nav {
    display: flex;
    flex-grow: 1;
    justify-content: space-between;
    max-width: 50rem;
    margin: 0 auto;
    gap: 2rem;
}
.links-nav *{
    position: relative;
}
.links-nav *::after{
    content: '';
    display: block;
    position: absolute;
    bottom: -.3rem;
    left: 50%;
    width: 0%;
    height: .2rem;
    background-color: var(--color-second);
    transition: width .2s ease-in;
    transform: translateX(-50%);
}
.links-nav *:hover::after{
    width: 100%;
    transform: translateX(-50%);
}
a {
    color: var(--color-white);
    text-decoration: none;
    font-family: var(--font-Roboto);
    font-weight: 300;
}
</style>

<style scoped>
button {
    outline: none;
    border: none;
    --radius: 1.5rem;
    position: relative;
    width: 19.1rem;
    height: 5.1rem;
    min-width: 19rem;
    min-height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius);
    overflow: hidden;
    cursor: pointer;
    transition: scale .1s linear;
    mix-blend-mode: lighten;
    margin-right: .5rem;
}

button:hover {
    scale: 1.05;
}

.btn-style1 {
    box-sizing: border-box;
    background-color: var(--color-first);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 98%;
    height: 96%;
    border-radius: var(--radius);
    position: absolute;
    z-index: 1;
    pointer-events: none;
    color: var(--color-white);
    font-size: 2rem;
    font-family: var(--font-Roboto);
    font-weight: 300;

}

.btn-style2 {
    box-sizing: border-box;
    display: block;
    background-image: linear-gradient(to right, var(--color-second), var(--color-third));
    width: 20rem;
    height: 20rem;
    margin: 0;
    padding: 0;
    position: absolute;
    transition: rotate 2s ease;
}

.btn-style2:hover {
    rotate: 720deg;
}
</style>

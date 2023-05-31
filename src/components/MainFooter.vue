<template>
    <div>
        <p>© Copyright - Todos os direitos reservados - Nintedo • Política de Privacidade • Desenvolvido por Alan
            Lima</p>
        <nav>
            <ul>
                <li>
                    <a href="https://github.com/devalanlima" target="_blank">
                        <i class="fa-brands fa-github" title="link for github"></i>
                    </a>
                </li>
                <li>
                    <a href="https://linkedin.com/in/devalanlima" target="_blank">
                        <i class="fa-brands fa-linkedin" title="link for linkedin"></i>
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<style scoped>
div {
    height: 10rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border-top: 1px solid var(--color-white);
    margin-top: 1rem;
}

ul {
    font-size: 2rem;
    display: flex;
    gap: 1rem;
}

a {
    text-decoration: none;
    color: var(--color-white);
}
</style>
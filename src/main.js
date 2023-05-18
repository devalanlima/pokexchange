import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './styles/generic/reset.css'
import './styles/settings/colors.css'
import './styles/settings/fonts.css'
import './styles/elements/base.css'

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(pinia)

app.mount('#app')

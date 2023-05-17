import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/generic/reset.css'
import './styles/settings/colors.css'
import './styles/settings/fonts.css'
import './styles/elements/base.css'

const app = createApp(App)

app.use(router)

app.mount('#app')

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/router'
import App from './App.vue'
import './assets/main.css'
import './plugins/axios'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
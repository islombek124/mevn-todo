import '@/index.css'

import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const head = createHead()

const app = createApp(App)

app.use(createPinia())
app.use(head)
app.use(router)

app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import { requestSymbol, useRequestConfig } from './composables/fetch'

const app = createApp(App)
app.provide(requestSymbol, useRequestConfig())

app.mount('#app')

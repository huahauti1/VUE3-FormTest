// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import VueDraggable from 'vuedraggable'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('Draggable',VueDraggable)
app.use(createPinia())
app.use(ElementPlus)
app.use(router)

app.mount('#app')

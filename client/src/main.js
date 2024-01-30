import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()

import App from './App.vue'
import router from './router'

// 引入初始化的样式文件
import '@/styles/common.scss'

// 引入懒加载指令插件并且注册
import { lazyPlugin } from '@/directives'
 
// 引入全局组件插件
import { componentPlugin } from '@/components/index.js'

const app = createApp(App)

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.use(componentPlugin)

app.mount('#app') 

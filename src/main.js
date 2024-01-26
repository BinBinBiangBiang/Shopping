import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// 引入初始化的样式文件
import '@/styles/common.scss'

// 引入vueUse里面的封装好的api-useIntersectionObserver，用于判断元素是否进入到了视口区域
import { useIntersectionObserver } from '@vueuse/core'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// 定义全局指令
app.directive('img-lazy',{
  mounted(el,binding){
    // el : 指令绑定的那个元素 img
    // binding : binding.value 指令等于号后面绑定的表达式的值 图片url
    console.log(el,binding.value);
    // isIntersecting : 返回一个布尔值，表示元素是否在屏幕可见
    // useIntersectionObserver 是vueUse里面的封装好的api
    useIntersectionObserver(
      el,
      ([{ isIntersecting }]) => {
        // console.log(isIntersecting);
        if(isIntersecting){
          el.src = binding.value
        }
      },
    )
  }
})
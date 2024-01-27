// 定义懒加载插件
// 引入vueUse里面的封装好的api-useIntersectionObserver，用于判断元素是否进入到了视口区域
import { useIntersectionObserver } from '@vueuse/core'


export const lazyPlugin = {
  install(app){
    // 懒加载指令逻辑
    // 定义全局指令
    app.directive('img-lazy',{
      mounted(el,binding){
        // el : 指令绑定的那个元素 img
        // binding : binding.value 指令等于号后面绑定的表达式的值 图片url
        // isIntersecting : 返回一个布尔值，表示元素是否在屏幕可见
        // useIntersectionObserver 是vueUse里面的封装好的api
        const { stop } = useIntersectionObserver(
          el,
          ([{ isIntersecting }]) => {
            if(isIntersecting){
              el.src = binding.value
              // 第一次图片加载完之后就停止监听，防止一直在监听，造成性能降低。
              stop();
            }
          },
        )
      }
    })
  }
}
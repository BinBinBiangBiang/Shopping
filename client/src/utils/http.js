// axios 基础的封装
import axios from 'axios';
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus';
import router from '@/router'


// 创建实例
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000,
  headers:{
    'Content-Type': 'application/json'
  }
})


// 拦截器

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // // 1. 从pinia中获取token数据，这里我直接用的id代替token了
  // const userStore = useUserStore()
  // // 2. 按照后端的要求拼接token数据
  // const token = userStore.userInfo.id
  // if(token){
  //   config.headers.Authorization = `Bearer ${token}`
  // }
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => res.data, e => {
  // 统一错误提示
  // ElMessage({
  //   type:'warning',
  //   message: e.response.data.message,
  // })
  
  // // 401 token 失效处理
  // // 1. 清除本地用户数据
  // if(e.response.status === 401){
  //   const userStore = useUserStore()
  //   userStore.clearUserInfo()
  //   // 2. 跳转到登录页
  //   router.push('/login')
  // }
 
  return Promise.reject(e)
})


export default  httpInstance;
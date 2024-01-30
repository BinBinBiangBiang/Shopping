// axios 基础的封装
import axios from 'axios';
import { ElMessage } from 'element-plus';
import 'element-plus/theme-chalk/el-message.css'


// 创建实例
const httpInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
  headers:{
    'Content-Type': 'application/json'
  }
})


// 拦截器

// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  return config
}, e => Promise.reject(e))

// axios响应式拦截器
httpInstance.interceptors.response.use(res => {
  // 统一错误提示
  if (res.status !== 200) {  // 程序报错
    ElMessage({type:'error',message:res.data.msg});
  } else {
    if (res.data.code !== '8000') {  // 逻辑性错误
      console.log(res);
      console.log(res.data.msg);
      ElMessage({type:'warning',message:res.data.msg});
      return Promise.reject(res)
      // return res
    }else{
      // showSuccessToast(res.data.msg);
      return res.data
    }
  }
})


export default  httpInstance;
// createRouter:创建router 实例对象
// createWebHistory:创建history 模式的理由

import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Detail from '@/views/Detail/index.vue'
import CartList from '@/views/CartList/index.vue'
import CheckOut from '@/views/CheckOut/index.vue'
import Register from '@/views/Register/index.vue'
import { ElMessage } from 'element-plus'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home,
          meta: {
            title: '首页'
          }
        },
        {
          path: 'category/:id',
          component: Category,
          meta: {
            title: '二级分类内容'
          }
        },
        {
          path: 'category/sub/:id',
          component: SubCategory,
          meta: {
            title: '三级分类内容'
          }
        },
        {
          path: '/detail/:id',
          component: Detail,
          meta: {
            title: '商品详情'
          }
        },
        {
          path: '/cartlist',
          component: CartList,
          meta: {
            title: '购物车'
          }
        },
        {
          path: '/checkout',
          component: CheckOut,
          meta: {
            title: '订单结算'
          }
        }
      ]
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/register',
      component: Register,
      meta: {
        title: '注册'
      }
    }
  ],

  // 路由滚动行为定制
  scrollBehavior() {
    return {
      top: 0,
    }
  }
})

// 开启路由守卫
const whitePath = ['/login', '/register', '/'];

router.beforeEach(async(to, from, next) => {
  document.title = to.meta.title;

  // // 等待路由初始化完成
  // await router.isReady();

  if (!whitePath.includes(to.path)) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    console.log(userInfo);
    if (!sessionStorage.getItem('userInfo')) {
      ElMessage({type: 'error', message:"登录信息失效，请重新登录"})
      setTimeout(() => {
        router.push('/login');
      },500)
      return;
    }else if(!userInfo.id ) {
      router.push('/login');
      return;
    }
     else {
      next();
      return;
    }
  }

  next(); // 放行
});

export default router

// 封装购物车模块

import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./user";


export const useCartStore =  defineStore('cart',()=>{
  const userStore = useUserStore()
  const isLogin = computed(() => userStore.userInfo.id)
  // 1. 定义state - cartList
  const cartList = ref([])
  // 2. 定义action - addCart
  const addCart = (goods) =>{
    if(isLogin.value){
      // 添加购物车操作
      // 已添加过 count++
      // 没有添加过 - 直接push
      // 思路：通过匹配传递过来的商品对象中的skuId能不能再cartList 中找到，找到了就是添加过
      const item = cartList.value.find((item)=> goods.skuId === item.skuId)
      if(item){
        item.count++
      }else{
        cartList.value.push(goods)
      }
    }else{
      ElMessage({type: "warning", message: "您还没登录哦"})
    }
  }

  // 删除购物车
  const delCart = (skuId) => {
    const idx = cartList.value.findIndex((item) => skuId === item.skuId)
    cartList.value.splice(idx,1)
  }

  // 清除购物车
  const clearCart = () => {
    cartList.value = []
  }

  // 单选功能
  const singleCheck = (skuId,selected) =>{
    // 通过skuId找到要修改的那一项 然后把它的selected修改为传过来的selected
    const item = cartList.value.find((item) => item.skuId === skuId)
    item.selected = selected
  }

  // 全选功能
  const allCheck = (selected) =>{
    cartList.value.forEach( item => item.selected = selected)
  }


  // 计算属性
  // 1. 总的数量
  const allCount = computed(() => cartList.value.reduce((acc, item) => acc + item.count,0))
  // 2. 总的价格
  const allPrice = computed(() => cartList.value.reduce((acc, item) => acc + item.count * item.price,0))
  // 3. 已选择数量
  const selectedCount = computed(() => cartList.value.filter(item => item.selected).reduce((acc, item) => acc + item.count,0))
  // 4. 已选择总价
  const selectedPrice = computed(() => cartList.value.filter(item => item.selected).reduce((acc, item) => acc + item.count * item.price,0))


  // 是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))



  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice,
    singleCheck,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice,
    isLogin,
    clearCart
  }
},{
  persist:true
})
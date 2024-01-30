// 封装购物车模块

import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useCartStore =  defineStore('cart',()=>{
  // 1. 定义state - cartList
  const cartList = ref([])
  // 2. 定义action - addCart
  const addCart = (goods) =>{
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
  }

  // 删除购物车
  const delCart = (skuId) => {
    const idx = cartList.value.findIndex((item) => skuId === item.skuId)
    cartList.value.splice(idx,1)
  }

  // 计算属性
  // 1. 总的数量
  const allCount = computed(() => cartList.value.reduce((acc, item) => acc + item.count,0))
  // 2. 总的价格
  const allPrice = computed(() => cartList.value.reduce((acc, item) => acc + item.count * item.price,0))

  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPrice
  }
},{
  persist:true
})
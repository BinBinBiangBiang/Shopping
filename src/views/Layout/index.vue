<template>
  <div>
    <LayoutFixed/>
    <LayoutNav />
    <LayoutHeader />
    <!-- 二级路由出口 -->
    <!-- 给路由入口添加key，防止路由切换时页面不更新，破坏复用机制，强制销毁重建 -->
    <!-- <RouterView :key="$route.fullPath"/> -->
    <RouterView />
    <LayoutFooter />
  </div>
</template>

<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
import LayoutFixed from './components/LayoutFixed.vue'

// 触发获取导航列表的action
import { useCategoryStore } from '@/stores/category'
import { onMounted } from 'vue'

const  categoryStore = useCategoryStore()

onMounted(() =>{
  categoryStore.getCategory()
})
</script>

<style lang="scss" scoped>

</style>
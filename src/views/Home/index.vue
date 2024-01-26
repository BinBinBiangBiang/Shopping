<template>
  <div>
    <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
    <HomeNew />
    <HomeHot />
    <HomeProduct />
    <HomePanel title="新鲜好物" sub-title="新鲜好物 好多商品">
        <div>
        我是新鲜好物的插槽
        </div>
    </HomePanel>
    <HomePanel title="新鲜好物">

</HomePanel>
  </div>
</template>

<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeNew from './components/HomeNew.vue'
import HomeHot from './components/HomeHot.vue'
import HomeProduct from './components/HomeProduct.vue'
import HomePanel from './components/HomePanel.vue'


</script>

<style lang="scss" scoped>

</style>
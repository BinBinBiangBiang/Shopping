// 封装分类数据业务相关的业务代码
import { getCategoryAPI } from '@/apis/category'
import { ref, onMounted } from 'vue'
import { useRoute,onBeforeRouteUpdate } from 'vue-router'



export function useCategory() {
  // 获取分类数据
  const categoryData = ref({})
  const route = useRoute()

  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
    // console.log(categoryData.value);
    console.log(res);
  }

  onMounted(() => {
    getCategory()
  })

  // 目标：路由参数变化的时候，可以把分类数据接口重新发送
  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id)
  })


  return{
    categoryData
  }
}
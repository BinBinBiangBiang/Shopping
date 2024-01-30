import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAddressStore = defineStore('counter', () => {
  const addressList = ref([
    {
      id: 1,
      name: '张三',
      phone: '13888888888',
      address: '北京市朝阳区东三环北路甲18号院1号楼1001'
    },
    {
      id: 2,
      name: '李四',
      phone: '13329437737',
      address: '江西省宜春市袁州区湖田中学'
    },
    {
      id: 3,
      name: '王五',
      phone: '13839123939',
      address: '江西省南昌市东华理工大学广兰校区'
    }
  ])
  
  const addAddress = (address) =>{
    addressList.value.push(address)
  }

  return {
     addressList,
     addAddress
  }
})

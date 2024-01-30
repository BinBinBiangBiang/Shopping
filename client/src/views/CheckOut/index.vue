<script setup>
import { ref, computed } from 'vue'
import { useCartStore } from '@/stores/cartStore'
import { useAddressStore } from '@/stores/address'
import { ElMessage } from 'element-plus';

const cartStore = useCartStore()
const addressStore = useAddressStore()


// 当前选中的地址对象
const curAddress = ref(addressStore.addressList[0])

const showDialog = ref(false)
const activeAddress = ref(null)

// 是否展示切换地址栏
const toggleFlag = () => {
  showDialog.value = true
}

// 切换地址的回调
const switchAddress = (item) => {
  curAddress.value = item
  activeAddress.value = item
}

// 新地址数据模型
const newAddress = ref({
  name: '',
  phone: '',
  address: ''
})

// 控制添加地址对话框是否显示
const showAddDialog = ref(false)

// 提交新地址的方法
const submitNewAddress = () => {
  if (newAddress.value.name && newAddress.value.phone && newAddress.value.address) {
    addressStore.addAddress(newAddress.value)
    // 清空新地址表单
    newAddress.value = { name: '', phone: '', address: '' }
    showAddDialog.value = false
  } else {
    // 提示用户完整填写信息
    ElMessage({type:'warning',message:'请确保所有字段都已填写'})
  }
}

// 配送时间选项
const deliveryOptions = [
  '不限送货时间：周一至周日',
  '工作日送货：周一至周五',
  '双休日、假日送货：周六至周日',
]

// 初始化选中的配送方式索引
const currentIndex = ref(0)

// 支付方式选项
const paymentOptions = ['在线支付', '货到付款']
// 初始化选中的支付方式索引
const currentPaymentIndex = ref(0)

const otherMoney = ref(0)

const changePayIndex = (index) =>{
  currentPaymentIndex.value = index
  otherMoney.value =  currentPaymentIndex.value === 1 ? 5 : 0
}

</script>

<template>
  <div class="xtx-pay-checkout-page">
    <div class="container">
      <div class="wrapper">
        <!-- 收货地址 -->
        <h3 class="box-title">收货地址</h3>
        <div class="box-body">
          <div class="address" v-if="curAddress">
            <!-- 显示当前选中的地址 -->
            <div class="text">
              <ul>
                <li><span>收货人：</span>{{ curAddress.name }}</li>
                <li><span>联系方式：</span>{{ curAddress.phone }}</li>
                <li><span>收货地址：</span>{{ curAddress.address }}</li>
              </ul>
            </div>
            <div class="action">
              <el-button size="large" @click="toggleFlag">切换地址</el-button>
              <el-button size="large" @click="showAddDialog = true">添加地址</el-button>
            </div>
          </div>
        </div>
        <!-- 商品信息 -->
        <h3 class="box-title">商品信息</h3>
        <div class="box-body">
          <table class="goods">
            <thead>
              <tr>
                <th width="520">商品信息</th>
                <th width="170">单价</th>
                <th width="170">数量</th>
                <th width="170">小计</th>
                <th width="170">实付</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="i in cartStore.cartList" :key="i.id">
                <td>
                  <a href="javascript:;" class="info">
                    <img :src="i.picture" alt="">
                    <div class="right">
                      <p>{{ i.name }}</p>
                      <p>{{ i.attrsText }}</p>
                    </div>
                  </a>
                </td>
                <td>&yen;{{ i.price }}</td>
                <td>{{ i.count }}</td>
                <td>&yen;{{ (i.price * i.count).toFixed(2) }}</td>
                <td>&yen;{{ (i.price * i.count).toFixed(2) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 配送时间 -->
        <h3 class="box-title">配送时间</h3>
        <div class="box-body">
          <a v-for="(option, index) in deliveryOptions" :key="index" :class="{ active: currentIndex === index }"
            @click="currentIndex = index" class="my-btn">{{ option }}</a>
        </div>

        <!-- 支付方式 -->
        <h3 class="box-title">支付方式</h3>
        <div class="box-body">
          <a v-for="(option, index) in paymentOptions" :key="index" :class="{ active: currentPaymentIndex === index }"
            @click="changePayIndex(index)" class="my-btn">{{ option }}</a>
          <span style="color:#999" v-if="currentPaymentIndex === 1">货到付款需付5元手续费</span>
        </div>
        <!-- 金额明细 -->
        <h3 class="box-title">金额明细</h3>
        <div class="box-body">
          <div class="total">
            <dl>
              <dt>商品件数：</dt>
              <dd>{{ cartStore.selectedCount }}件</dd>
            </dl>
            <dl>
              <dt>商品总价：</dt>
              <dd>¥{{ cartStore.selectedPrice.toFixed(2) }}</dd>
            </dl>
            <dl>
              <dt>运<i></i>费：</dt>
              <dd>¥ {{ 5 * cartStore.selectedCount }} </dd>
            </dl>
            <dl>
              <dt>应付总额：</dt>
              <dd class="price">{{ (cartStore.selectedPrice + 5 * cartStore.selectedCount + otherMoney).toFixed(2) }}</dd>
            </dl>
          </div>
        </div>
        <!-- 提交订单 -->
        <div class="submit">
          <el-button type="primary" size="large">提交订单</el-button>
        </div>
      </div>
    </div>
  </div>
  <!-- 切换地址 -->
  <el-dialog v-model="showDialog" title="切换收货地址" width="30%" center>
    <div class="addressWrapper">
      <div class="text item " :class="{ active: activeAddress === item }" @click="switchAddress(item)"
        v-for="(item, index) in addressStore.addressList" :key="item.id">
        <ul>
          <li><span>收<i />货<i />人：</span>{{ item.name }} </li>
          <li><span>联系方式：</span>{{ item.phone }}</li>
          <li><span>收货地址：</span>{{ item.address }}</li>
        </ul>
      </div>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="showDialog = false">取消</el-button>
        <el-button type="primary" @click="showDialog = false">确定</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 添加地址 -->
  <el-dialog v-model="showAddDialog" title="添加新地址">
    <el-form ref="addForm">
      <el-form-item label="姓名">
        <el-input v-model="newAddress.name"></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="newAddress.phone"></el-input>
      </el-form-item>
      <el-form-item label="收货地址">
        <el-input v-model="newAddress.address"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="showAddDialog = false">取消</el-button>
      <el-button type="primary" @click="submitNewAddress">确定</el-button>
    </span>
  </el-dialog>
</template>

<style scoped lang="scss">
.xtx-pay-checkout-page {
  margin-top: 20px;

  .wrapper {
    background: #fff;
    padding: 0 20px;

    .box-title {
      font-size: 16px;
      font-weight: normal;
      padding-left: 10px;
      line-height: 70px;
      border-bottom: 1px solid #f5f5f5;
    }

    .box-body {
      padding: 20px 0;
    }
  }
}

.address {
  border: 1px solid #f5f5f5;
  display: flex;
  align-items: center;

  .text {
    flex: 1;
    min-height: 90px;
    display: flex;
    align-items: center;

    .none {
      line-height: 90px;
      color: #999;
      text-align: center;
      width: 100%;
    }

    >ul {
      flex: 1;
      padding: 20px;

      li {
        line-height: 30px;

        span {
          color: #999;
          margin-right: 5px;

          >i {
            width: 0.5em;
            display: inline-block;
          }
        }
      }
    }

    >a {
      color: $xtxColor;
      width: 160px;
      text-align: center;
      height: 90px;
      line-height: 90px;
      border-right: 1px solid #f5f5f5;
    }
  }

  .action {
    width: 420px;
    text-align: center;

    .btn {
      width: 140px;
      height: 46px;
      line-height: 44px;
      font-size: 14px;

      &:first-child {
        margin-right: 10px;
      }
    }
  }
}

.goods {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;

  .info {
    display: flex;
    text-align: left;

    img {
      width: 70px;
      height: 70px;
      margin-right: 20px;
    }

    .right {
      line-height: 24px;

      p {
        &:last-child {
          color: #999;
        }
      }
    }
  }

  tr {
    th {
      background: #f5f5f5;
      font-weight: normal;
    }

    td,
    th {
      text-align: center;
      padding: 20px;
      border-bottom: 1px solid #f5f5f5;

      &:first-child {
        border-left: 1px solid #f5f5f5;
      }

      &:last-child {
        border-right: 1px solid #f5f5f5;
      }
    }
  }
}

.my-btn {
  width: 228px;
  height: 50px;
  border: 1px solid #e4e4e4;
  text-align: center;
  line-height: 48px;
  margin-right: 25px;
  color: #666666;
  display: inline-block;

  &.active,
  &:hover {
    border-color: $xtxColor;
  }
}

.total {
  dl {
    display: flex;
    justify-content: flex-end;
    line-height: 50px;

    dt {
      i {
        display: inline-block;
        width: 2em;
      }
    }

    dd {
      width: 240px;
      text-align: right;
      padding-right: 70px;

      &.price {
        font-size: 20px;
        color: $priceColor;
      }
    }
  }
}

.submit {
  text-align: right;
  padding: 60px;
  border-top: 1px solid #f5f5f5;
}

.addressWrapper {
  max-height: 500px;
  overflow-y: auto;
}

.text {
  flex: 1;
  min-height: 90px;
  display: flex;
  align-items: center;

  &.item {
    border: 1px solid #f5f5f5;
    margin-bottom: 10px;
    cursor: pointer;

    &.active,
    &:hover {
      border-color: $xtxColor;
      background: lighten($xtxColor, 50%);
    }

    >ul {
      padding: 10px;
      font-size: 14px;
      line-height: 30px;
    }
  }
}
</style>
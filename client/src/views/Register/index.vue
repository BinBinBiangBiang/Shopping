<script setup>
// 表单校验(账号吗 + 密码)

import { ref,nextTick,onMounted } from 'vue'

import { ElMessage, formProps } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import ImageVerify from '@/components/ImageVerify/index.vue'
import { registerAPI } from '@/apis/user'


const router = useRouter()

const userStore = useUserStore()

// 1. 准备表单对象
const form = ref({
  account: '',
  password: '',
  nickname:'',
  imgCode: '',
  agree: false,
})

// 2. 准备规则对象
const rules = ref({
  account: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
  ],
  imgCode:[
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { min: 4, max: 4, message: '长度在 4 个字符', trigger: 'blur' }
  ],
  nickname: [
    { required: true, message: '昵称不能为空', trigger: 'blur' },
    { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
  ],
  agree: [
    {
      validator: (rule, value, callback) => {
        // 自定义 校验逻辑
        // 勾选就通过，不勾选就不通过
        if (value) {
          callback()
        } else {
          callback(new Error('请勾选协议'))
        }
      }
    }
  ]
})


// 3. 获取表单实例
const formRef = ref(null)

// 统一校验逻辑
const doRegister = () => {
  const { account, password ,nickname } = form.value
  formRef.value.validate(async (valid) => {
    if (valid) {
      const res = await registerAPI({ account, password ,nickname })
      ElMessage({ type: 'success', message: '注册成功' })
      router.replace({ path: '/login' })
    }
  })
}

// 验证码

// 便于拿到 verifyRef 组件内的实例属性
const verifyRef = ref(null);

// 在 setup 中使用 ref 创建 imgCodeRef
const imgCodeRef = ref('');

// 在 onMounted 阶段获取验证码的值
onMounted(() => {
  imgCodeRef.value = verifyRef.value.imgCode;
});

// 在 onSubmit 函数中，获取验证码的值
const onSubmit = async () => {
  await nextTick();

  // 获取验证码的值
  const imgCodeValue = imgCodeRef.value;

  // 确保 imgCodeValue 不为 null 或 undefined
  if (imgCodeValue !== null && imgCodeValue !== undefined) {
    // 进行验证码的比较逻辑
    console.log("图片"+imgCodeValue.toLowerCase(),"表单"+form.value.imgCode.toLowerCase());
    if (imgCodeValue.toLowerCase() !== form.value.imgCode.toLowerCase()) {
      // 验证码不匹配的处理逻辑
      ElMessage({ type: 'warning', message: '验证码错误' });
      return;
    }else{
      doRegister();
      console.log('register');
    }

    // 验证码匹配成功的处理逻辑
    // 发送请求，进行注册等操作
  } else {
    console.error('imgCodeRef is null or undefined');
  }
};
</script>


<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">小兔鲜</RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户注册</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form ref="formRef" :model="form" :rules="rules" label-position="right" label-width="60px" status-icon>
              <el-form-item prop="account" label="账号">
                <el-input v-model="form.account" />
              </el-form-item>
              <el-form-item prop="password" label="密码">
                <el-input v-model="form.password" />
              </el-form-item>
              <el-form-item prop="nickname" label="昵称">
                <el-input v-model="form.nickname" />
              </el-form-item>
              <el-form-item prop="imgCode" label="验证码" clearable class="imgCode" label-width="69px">
                <div class="el-form-item__content">
                  <el-input v-model="form.imgCode" style="width: 140px" />
                  <ImageVerify class="imgverify" ref="verifyRef" />
                </div>
              </el-form-item>
              <el-form-item label-width="22px" prop="agree">
                <el-checkbox size="large" v-model="form.agree">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-form-item label-width="22px" prop="agree">
                <RouterLink to="/login">已有账号？点击登录</RouterLink>
              </el-form-item>
              <el-button size="large" class="subBtn" @click="onSubmit">点击注册</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">售后服务</a>
          <a href="javascript:;">配送与验收</a>
          <a href="javascript:;">商务合作</a>
          <a href="javascript:;">搜索推荐</a>
          <a href="javascript:;">友情链接</a>
        </p>
        <p>CopyRight &copy; 小兔鲜儿</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang='scss'>
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 20px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    .imgCode .el-form-item__label {
      flex: 0 0 auto; // 防止 label 标签强制换行
      white-space: nowrap; // 禁止文本换行
    }

    .imgCode {
      display: flex;
      align-items: center;

      .el-form-item__content {
        display: flex;
        width: fit-content;
        margin-right: 10px; // 添加适当的间距
        align-items: center;

        .imgverify {
          margin-left: 10px;
        }

        >.el-input {
          width: 140px;
        }
      }
    }

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}</style>
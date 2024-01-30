const Router = require('@koa/router');
const router = new Router();
const { userLogin,userRegister } = require('../controllers/mysqlControl.js');

// 定义登录接口 login
// 前端请求了该接口，则调用回调函数
router.post('/login',async(ctx) =>{
  // 获取到前端传递的账号和密码，去数据库中校验账号密码的正确性
  const { account , password } = ctx.request.body;

  try{
    const result = await userLogin(account, password)
    // console.log(result);
    if(result.length){ // 账号密码存在
      let data =  {
        id:result[0].id,
        nickname:result[0].nickname,
        username:result[0].username,
      }
      ctx.body = {
        code:'8000',
        data:data,
        msg:'登录成功'
      }
    }else{
      // 出现错误：账号密码不存在
      ctx.body = {
        code:'8004',
        data:'error',
        msg:'账号或密码错误'
      }

    }
  }catch(error){
    ctx.body = {
      code:'8005',
      data:error,
      msg:'服务器异常'
    }
  }
  
  // console.log(username, password);
  // ctx.body = 'login success'
})

// 定义注册接口
router.post('/register',async(ctx) => {
  // 获取到前端传递的参数
  const { account, password, nickname } = ctx.request.body;
  if(!account ||!password ||!nickname){
    ctx.body = {
      code:'8001',
      data:'error',
      msg:'注册失败,请填写完整！'
    }
    return
  } 
  try {
    const result = await userRegister(account, password, nickname);

    if (result && result.affectedRows > 0) {
      // let data = {
      //   id: result.insertId,  // 自增Id
      //   nickname: nickname,
      //   username: username
      // }
      ctx.body = {
        code:'8000',
        data:'success',
        msg:'注册成功'
      }
    } else {
      ctx.body = {
        code:'8004',
        data:'error',
        msg:'注册失败,当前用户名已存在！'
      }
    }
  } catch (error) {
    ctx.body = {
      code:'8005',
      data:error,
      msg:'服务器异常'
    }
  }
})


module.exports = router;
const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser'); // 让koa能解析post参数
const cors = require('koa2-cors');  // 解决跨域

// 引入从user.js 抛出的东西
const user = require('./routes/user.js');

app.use(bodyParser())
app.use(cors())  // 告诉浏览器允许跨域


app.use(user.routes(),user.allowedMethods())

app.listen('3000',() =>{
  console.log('项目已启动');
});
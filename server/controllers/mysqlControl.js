// 和数据库连接的相关操作

const mysql = require('mysql2');
const config = require('../config') 

// 创建线程池
const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    port: config.database.PORT,
});

// 连接mysql
const allService = {
  query : function(sql,values){
    // pool 连接
    return new Promise((resolve,reject)=>{
      pool.getConnection((err,connection) => {
        if(err){
          reject(err);
        }else{
          // 执行sql语句
          connection.query(sql,values,function(err,rows){
            if(err){
              // 释放错误
              reject(err);
            }else{
              resolve(rows);
            }
            connection.release(); // 释放连接
          })
        }
      })
    })
  }
}

// 检测数据库连接是否正常
const testConnection = async () => {
  try {
    const result = await allService.query('SELECT 1 as test');
    console.log('Database connection test result:', result);
  } catch (error) {
    console.error('Database connection test failed:', error);
  }
};

testConnection();

// 登录
const userLogin = (account,password) =>{
  let _sql = `select * from users where account = "${account}" and password = "${password}";`
  return allService.query(_sql)
}

// 注册
const userRegister = async (account, password, nickname) => {
  let sql1 = `select * from users where account = "${account}";`
  try {
    let result = await allService.query(sql1);
    if (result && result.length > 0) {
      return false;
    } else {
      let sql2 = `insert into users (account, password, nickname) values ("${account}","${password}","${nickname}");`
      // console.log('SQL Statement:', sql2);
      const insertResult = await allService.query(sql2);
      // console.log('Insert Result:', insertResult);
      // 直接返回插入操作的结果
      return insertResult;
    }
  } catch (error) {
    throw error; // 抛出异常以便在调用方进行处理
  }
}


module.exports = {
  userLogin,
  userRegister,
}


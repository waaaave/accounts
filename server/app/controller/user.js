'use strict'

const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
    const { ctx } = this
    const { username, password } = ctx.request.body
    console.log(username, password);

    if (!username || !password) {
      ctx.body = {
        code: 500,
        msg: '账号或密码不能为空',
        data: null
      }
      return
    }
    // 在数据库中检验当前username账号是否存在
    const resultInfo = await ctx.service.user.getUserByName(username)
    if (resultInfo && resultInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账号已被注册，请重新输入',
        data: null
      }
      return
    }

    // 往数据库植入数据
    const result = await ctx.service.user.register({
      username,
      password,
      avatar: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fc-ssl.duitang.com%2Fuploads%2Fitem%2F202003%2F16%2F20200316173923_yRyzi.thumb.400_0.jpeg&refer=http%3A%2F%2Fc-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1638104353&t=c35008ae88eeeb11517afacb445d3404',
      ctime: Date.now()
    })
    if (result) {
      // console.log(result);
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: null,
      }
    } else {
      // console.log(result);
      ctx.body = {
        code: 500,
        msg: '注册失败',
        data: null,
      }
    }

  }

  async login(){
    const { ctx, app } = this
    const { username, password } = ctx.request.body;
    console.log(username, password);
    const userInfo = await ctx.service.user.getUserByName(username)
    if (!userInfo && !userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账号不存在',
        data: null
      }
      return
    }
    console.log(userInfo);
    if(userInfo && userInfo.password !== password){
      ctx.body = {
        code:500,
        msg:'密码错误',
        data: null
      }
      return
    }
    // 账号密码都对，给前端生成一个token标记
    const token = app.jwt.sign({ // jwt.sign接收两个参数，第一个是对象，对象内为需要加密的内容，第二个参数是加密字符串
      id:userInfo.id,
      username:userInfo.username,
      exp:~~(Date.now()/1000) + (24*60*60)
    },app.config.jwt.secret)

    ctx.body = {
      code:200,
      msg:'登录成功',
      data:{
        token
      }
    }
  }

  
}

module.exports = UserController
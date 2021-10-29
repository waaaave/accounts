'use strict'

const Controller = require('egg').Controller;

class UserController extends Controller {
  async register() {
    const { ctx } = this
    const { username, password } = ctx.request.body

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
      console.log(result);
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: null
      }
    } else {
      ctx.body = {
        code: 500,
        msg: '注册失败',
        data: null
      }
    }

  }
}

module.exports = UserController
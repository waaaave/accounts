'use strict';

const Controller = require('egg').Controller;

class TypeController extends Controller {
  async list() {
    console.log(11111111);
    const { ctx, app } = this
    let user_id;
    const token = ctx.request.header.authorization
    const decode = await app.jwt.verify(token, app.config.jwt.secret)
    if (!decode) return
    user_id = decode.id
    const list = await ctx.service.type.list(user_id)
    // console.log(list, '-----');
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data: {
        list
      }
    }
  }
}
module.exports = TypeController;

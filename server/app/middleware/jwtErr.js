'use strict'

// token 检验
module.exports = (options) => {
  return async function jwtErr(ctx, next) {
    const token = ctx.request.header.authorization
    let decode;
    if (token !== null && token) {
      try {
        decode = ctx.app.jwt.verify(token, options.secret) // 验证
        await next()
      } catch (error) {
        console.log(error);
        ctx.body = {
          code: 401,
          msg: 'token已过期，请重新登录',
          data: null
        }
        return
      }
    } else {
      ctx.status = 200
      ctx.body = {
        code: 401,
        msg: 'token不存在'
      }
      return
    }
  }
}
'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt)
  router.post('/api/user/register', controller.user.register)
  router.post('/api/user/login', controller.user.login)
  router.get('/api/bill/list',_jwt,controller.bill.list) //获取帐单列表
};

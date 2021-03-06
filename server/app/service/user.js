'use strict'

const Service = require('egg').Service

class UserService extends Service {
  // 通过username查找用户
  async getUserByName(username) {
    const { app } = this
    try {
      const result = await app.mysql.get('user', { username })
      return result
    } catch (error) {
      console.log(error);
      return null
    }
  }

  // 注册
  async register(params) {
    const { app } = this
    try {
      const result = await app.mysql.insert('user', params)
      return result
    } catch (error) {
      console.log(error);
      return null
    } 
  }
}

module.exports = UserService
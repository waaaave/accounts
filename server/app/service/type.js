'use strict';

const Service = require('egg').Service

class TypeService extends Service {
  async list(id) {
    const { ctx, app } = this
    const QUERY_STR = 'id, name, type, user_id';
    const sql = `select ${QUERY_STR} from type where user_id = 0 or user_id = ${id}`;
    try {
      const result = await app.mysql.query(sql)
      // console.log(result, '--------------');
      return result;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = TypeService
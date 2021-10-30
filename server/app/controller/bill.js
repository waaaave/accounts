'use strict';

const Controller = require('egg').Controller;

class BillController extends Controller {
  async list() {
    const { ctx } = this;
    ctx.body = {
      "code": 200,
      "msg": "请求成功",
      "data": {
        "totalExpense": 300,
        "totalIncome": 0,
        "totalPage": 1,
        "list": [{
          "date": "2021-10-30",
          "bills": [{
            "id": 2691,
            "pay_type": 1,
            "amount": "200.00",
            "date": "1635581598000",
            "type_id": 2,
            "type_name": "服饰",
            "remark": ""
          }, {
            "id": 2692,
            "pay_type": 1,
            "amount": "100.00",
            "date": "1635584652000",
            "type_id": 5,
            "type_name": "购物",
            "remark": ""
          }]
        }]
      }
    };
  }

}

module.exports = BillController;
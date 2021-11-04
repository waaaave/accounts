'use strict';

const moment = require('moment')

const Controller = require('egg').Controller;

class BillController extends Controller {
  async list() {
    const { ctx, app } = this;
    // console.log(ctx.query);
    const { date, page, page_size = 5, type_id = 'all' } = ctx.query
    try {
      let user_id;
      const token = ctx.request.header.authorization
      const decode = await app.jwt.verify(token, app.config.secret)
      if (!decode) return
      user_id = decode.id
      const list = await ctx.service.bill.list(user_id)

      // 过滤月份
      const _list = list.filter(item => {
        if (type_id != 'all') {
          // return item.type_id == type_id
          return moment(Number(item.date)).format('YYYY-MM') == date && type_id == item.type_id
        }
        // return true
        return moment(Number(item.date)).format('YYYY-MM') == date
      })

      // 格式化
      let listMap = _list.reduce((curr, item) => {
        const date = moment(Number(item.date)).format('YYYY-MM-DD')
        // 如果能在累加的数组中找到当前项日期的，那么在数组中的加入当前项到 bills 数组。
        if (curr && curr.length && curr.findIndex(item => item.date == date) > -1) {
          const index = curr.findIndex(item => item.date == date)
          curr[index].bills.push(item)
        }
        // 如果在累加的数组中找不到当前项日期的，那么再新建一项。
        if (curr && curr.length && curr.findIndex(item => item.date == date) == -1) {
          curr.push({
            date,
            bills: [item]
          })
        }

        if (!curr.length) {
          curr.push({
            date,
            bills: [item]
          })
        }
        return curr
      }, []).sort((a, b) => moment(b.date) - moment(a.date))

      // 分页
      const filterListMap = listMap.slice((page - 1) * page_size, page * page_size)
      let __list = list.filter(item => moment(Number(item.date)).format('YYYY-MM') == date)
      let totalExpense = __list.reduce((curr, item) => {
        if (item.pay_type == 1) {
          curr += Number(item.amount)
          return curr
        }
        return curr
      }, 0)
      let totalIncome = __list.reduce((curr, item) => {
        if (item.pay_type == 2) {
          curr += Number(item.amount)
          return curr
        }
        return curr
      }, 0)

      console.log(_list);
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          totalExpense,
          totalIncome,
          totalPage: Math.ceil(listMap.length / page_size),
          list: filterListMap || []
        }
      }

    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null
      }
    }
  }
}

module.exports = BillController;

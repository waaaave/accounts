import React, { forwardRef, useEffect, useState } from 'react';
import { Popup, Icon, Button } from 'zarm';
import PropAddLists from "prop-types";
import cx from 'classnames'
import s from './style.module.less'
import { get } from '@/utils'

const PopupAddList = forwardRef(({ onselect }, ref) => {

  const [show, setShow] = useState(false);
  const [active, setActive] = useState('all');
  const [expense, setExpense] = useState([{ id: 1, name: '服饰' }, { id: 2, name: '餐饮' }]); // 支出类型标签
  const [income, setIncome] = useState([{ id: 3, name: '工资' }, { id: 4, name: '奖金' }]); // 收入类型标签

  useEffect(async () => {
    const { data: { list } } = await get('/api/type/list')
    console.log(list);
    setExpense(list.filter(i => i.type == 2))
    setIncome(list.filter(i => i.type == 1))
  }, [])

  const choseDate = (item) => {
    setActive(item.id)
    setShow(false)
    onSelect(item)
  }

  if (ref) {
    ref.current = {
      show: () => {
        setShow(true)
      },
      close: () => {
        setShow(false)
      }
    }
  }

  return (
    <Popup
      visible={show}
      direction="bottom"
      onMaskClick={() => setShow(false)}
      destroy={true}
      mountContainer={() => document.body}
    >
      <div className={s.popupAddList}>
        <div className={s.header}>
          添加账单
        <Icon type="wrong" className={s.cross} onClick={() => setShow(false)} />
        </div>
        <div>
          <Button htmlType="button" size="xs" className='expense' shape="round" theme="primary">支出</Button>
          <Button htmlType="button" size="xs" className='income' shape="round" theme="primary">收入</Button>
          <Button htmlType="button" size="xs" className='date' shape="round" theme="primary" onClick={()=>choseDate(item)}>rizi</Button>
        </div>

      </div>
    </Popup>
  )
})
PopupAddList.propAddLists = {
  onSelect: PropAddLists.func
}
export default PopupAddList;
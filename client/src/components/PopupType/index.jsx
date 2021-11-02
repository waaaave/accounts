import React, { forwardRef, useState, useEffect } from "react";
import { Popup, Icon } from 'zarm';
import PropTypes from "prop-types";
import cx from 'classnames'
import s from './style.module.less'
import {get} from '@/utils'

const PopupType = forwardRef(({onSelect }, ref) => {
  const [show, setShow] = useState(false);
  const [active, setActive] = useState('all');
  const [expense, setExpense] = useState([{id:1,name:'服饰'},{id:2,name:'餐饮'}]); // 支出类型标签
  const [income, setIncome] = useState([{id:3,name:'工资'},{id:4,name:'奖金'}]); // 收入类型标签
  

  useEffect(async () =>{
    const {data:{list}} = await get('/api/type/list')
    console.log(list);
    setExpense(list.filter(i=>i.type ==2))
    setIncome(list.filter(i=>i.type ==1))
  }, [])

  const choseType = (item) =>{
    setActive(item.id)
    setShow(false)
    onSelect(item)
  }
  
  if (ref) {
    ref.current = {
      show:() => {
        setShow(true)
      },
      close:() => {
        setShow(false)
      }
    }
  }

  return <Popup
    visible={show}
    onMaskClick={() => setShow(false)}
  >
    <div className={s.popupType}>
      <div className={s.header}>
        请选择类型
        <Icon type="wrong" className={s.cross} onClick={() => setShow(false)} />
      </div>
      <div className={s.content}>
        <div onClick={() => choseType( {id:'all'})} className={cx({[s.all]: true, [s.active]: active == 'all'})}>全部类型</div>

        <div className={s.title}>支出</div>
        <div className={s.expenseWrap}>
          {
            expense.map((item,index) => <p onClick={()=>choseType(item)} key = {index} className={cx({[s.active]:active == item.id})}>{item.name}</p>)
          }
        </div>

        <div className={s.title}>收入</div>
        <div className={s.incomeWrap}>
          {
            income.map((item,index) => <p onClick={()=>choseType(item)} key = {index} className={cx({[s.active]:active == item.id})}>{item.name}</p>)
          }
        </div>


      </div>
    </div>
  </Popup>
})
PopupType.propTypes = {
  onSelect: PropTypes.func
}
export default PopupType
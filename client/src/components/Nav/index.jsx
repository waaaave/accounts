import React, { useState } from 'react';
import { TabBar } from 'zarm';
import s from './style.module.less'
import CustomIcon from '../CustomIcon';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
// import PropsType from 'zarm/types/stack-picker/PropsType';

const NavBar = ({showNav}) => {
  const [activeKey, setActivekey] = useState('/')
  const history = useHistory()

  const changeTab = (path) => {
    setActivekey(path)
    history.push(path)
  }

  return (
    <div>
      <TabBar className={s.tab} visible={showNav} activeKey={activeKey} onChange={changeTab} >
        <TabBar.Item
          itemKey="/"
          title="账单"
          icon={<CustomIcon type="zhangdan" />} />
        <TabBar.Item
          itemKey="/data"
          title="统计"
          icon={<CustomIcon type="tongji" />}
        />
        <TabBar.Item
          itemKey="/user"
          title="我的"
          icon={<CustomIcon type="wode" />}
        />
      </TabBar>
    </div>
  )
}

NavBar.propTypes ={
  showNav:PropTypes.bool
}

export default NavBar
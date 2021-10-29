import React, { useState, useEffect } from 'react';
import routes from './router';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation
} from 'react-router-dom'
import { ConfigProvider, Input } from 'zarm';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';
import NavBar from './components/Nav';

function App() {
  const [showNav, setShowNav] = useState(false);
  const needNav = ['/', '/data', '/user']
  const {pathname} = useLocation() //当前路径
  useEffect(() => {
    setShowNav(needNav.includes(pathname))
  }, [pathname]);

  return (

    <ConfigProvider primaryColor={'#007fff'} locale={zhCN}>
      <>
        <Switch>
          {
            routes.map(route => <Route exact key={route.path} path={route.path} component={route.component} />)
          }
        </Switch>
        <NavBar showNav={showNav} />
      </>
    </ConfigProvider>

  )
}

export default App

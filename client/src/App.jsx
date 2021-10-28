import React from 'react';
import routes from './router';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ConfigProvider } from 'zarm';
import zhCN from 'zarm/lib/config-provider/locale/zh_CN';

function App() {

  return (
    <Router>
      <ConfigProvider primaryColor={'#007fff'} locale={zhCN}>
        <Switch>
          {
            routes.map(route => <Route exact key={route.path} path={route.path} component={route.component} />)
          }
        </Switch>
      </ConfigProvider>

    </Router>
  )
}

export default App

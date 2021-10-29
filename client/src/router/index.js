import Data from "../views/Data";
import Home from "../views/Home";
import User from "../views/User";
import About from "../views/About"

const routes = [
  {
    path:'/',
    component:Home
  },
  {
    path:'/data',
    component:Data
  },
  {
    path:'/user',
    component:User
  },{
    path:'/about',
    component:About
  }
]

export default routes
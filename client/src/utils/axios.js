import axios from 'axios'
import {Toast} from 'zarm'

// vite 中获取环境变量
const MODE = import.meta.env.MODE //'development' 
//公共域名
axios.defaults.baseURL = MODE === 'development'?'/api':''
//当前请求是否需要凭证
axios.defaults.withCredentials = true
//请求头,当前请求方式是http请求
axios.defaults.headers['X-Request-With'] = 'XMLHttpRequest'
// 用户的凭证 , 登陆成功之后，存一个token
axios.defaults.headers['Authoriztion'] = `${localStorage.getItem('token')||null}`

axios.defaults.headers.post['Content-Type'] = 'application/json'
//响应拦截
axios.interceptors.response.use(res=>{
  if(typeof res.data !== 'object'){ //服务器炸了
    Toast.show('服务器异常 ！爬 ！')
    return Promise.reject(res)
  }
  if(res.data.code !== 200){ //返回的数据异常
    if(res.data.msg) Toast.show(res.data.msg) // 数据错了
    if(res.data.code === 401){ // 登录过期
      window.location.href = '/login'
    }
    return Promise.reject(res.data) //其他错误
  }

  return res.data  //正常返回
})

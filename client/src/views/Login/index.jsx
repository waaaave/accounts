import React ,{useCallback} from 'react'
import { Cell, Input, Button, Checkbox, Toast } from 'zarm'
import CustomIcon from '@/components/CustomIcon'
import s from './style.module.less'
import Captcha from 'react-captcha-code';
import { useState } from 'react';

const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verify, setVerify] = useState('');
  const [captcha, setCaptcha] = useState('');

  const handleChange = useCallback((captcha) => {
    console.log('captcha:', captcha);
    setCaptcha(captcha)
  }, []);
  //登录注册
  const onSubmit = async()=>{
    if(!username){
      Toast.show('输入账号')
      return
    }
    if(!password){
      Toast.show('输入密码')
      return
    }
    if(!verify){
      Toast.show('输入验证码')
      return
    }
    if(verify != captcha){
      Toast.show('验证码错误')
      return
    }
    //发请求
  }
  return (
    <div className={s.auth}>
      <div className={s.head} />
      <div className={s.tab}>
        <span>注册</span>
      </div>
      <div className={s.form}>
        <Cell icon={<CustomIcon type="zhanghao" />}>
          <Input
            clearable
            type="text"
            placeholder="请输入账号"
            onChange={(value)=>setUsername(value)}
          />
        </Cell>
        <Cell icon={<CustomIcon type="mima" />}>
          <Input
            clearable
            type="password"
            placeholder="请输入密码"
            onChange={(value)=>setPassword(value)}

          />
        </Cell>
        <Cell icon={<CustomIcon type="mima" />}>
          <Input
            clearable
            type="text"
            placeholder="请输入验证码"
            onChange={(value)=>setVerify(value)}

          />
          <Captcha charNum={4} onChange={handleChange} />
        </Cell>
      </div>
      <div className={s.operation}>
        <div className={s.agree}>
          <Checkbox />
          <label className="text-light">阅读并同意<a>《掘掘手札条款》</a></label>
        </div>
        <Button block theme="primary" onClick={onSubmit}>注册</Button>
      </div>
    </div>
  )
}

export default Login
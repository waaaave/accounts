import React from 'react';
import { Button } from 'zarm';
import s from './style.module.less'

const Index = () =>{
  return(
    <div className={s.index}>
      <span>Index</span>
      <Button theme="primary">primary</Button>
    </div>
  )

}

export  default Index
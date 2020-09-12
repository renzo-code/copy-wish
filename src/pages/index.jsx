import React from 'react'
import { BrowserRouter, Switch, Route} from 'react-router-dom'


import Web from './Web/Web'
import Login from './Login/Login'

const Pages = () => {
  return(
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login}/>
        <Route path="/" component={Web}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Pages
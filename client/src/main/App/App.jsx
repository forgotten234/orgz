//CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

//React
import React from 'react'
import { Switch, Route } from "react-router-dom"

//Components
import {Navigation} from '../../components/Board/Navbar/Navigation'
import {Login} from '../../components/Board/Login/Login'
import {Screen} from '../../components/Board/Screen/Screen'
import {Settings} from '../../components/Board/Settings/Settings'
import PrivateRoute from '../../routes/PrivateRoute'
import { Registration } from '../../components/Board/Login/Registration'

export default function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <PrivateRoute exact path="/" component={Screen} />
        <PrivateRoute exact path="/settings" component={Settings} />
        <Route path="/sign-in" component={Login} />
        <Route path="/register" component={Registration} />
      </Switch>
    </div>
  )
}


import React, { useRef, useState } from 'react';

import { Home } from './components/Home';

import Chatroom from './components/Chatroom';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import { Join } from './components/Join';
import { Login } from './components/Login';
import { Create } from './components/Create';


function App() {

  return (
    <BrowserRouter>
    <Switch>
      <Route exact path="/">
        <Login></Login>
      </Route>
      <Route exact path="/home">
        <Home/>
      </Route>  
      <Route exact path="/about/:groupId/:groupName/:password">
        <Chatroom></Chatroom>
      </Route>  
      <Route exact path="/join">
        <Join></Join>
      </Route> 
      <Route exact path="/create">
        <Create></Create>
      </Route> 
    </Switch>
    </BrowserRouter>
    )
}


export default App;
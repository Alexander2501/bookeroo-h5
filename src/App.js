
import './App.css';
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import Login from './views/login';
import Home from './views/home';
import Register from './views/register'

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path='/login' component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/" component={Home}></Route>          
        </Switch>       
      </BrowserRouter>
    );
  }
}
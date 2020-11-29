import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const loggedIn = true;

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          {loggedIn ? <Redirect to="/login/" /> : <Redirect to="/login"/>}
        </Route>
        <Route path="/login" exact component={LoginForm}/>
        <Route path="/cadastro" exact component={RegisterForm}/>
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

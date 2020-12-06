import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './app.css';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import CalendarPage from './pages/Calendar';
import DayPage from './pages/Day';


function App(){
    const user = (document.cookie.indexOf("jwt=") > -1) ? ({loggedIn: true}) : ({loggedIn: false});
    const today = new Date()
    const currentMonth = today.getMonth()+1;
    const currentYear = today.getFullYear();
    const currentDate = today.getDate();


    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" >
                    {(user.loggedIn) ? <Redirect to="/calendario" /> : <Redirect to="/login"/>}
                </Route>
                <Route path="/login">
                    {(user.loggedIn) ? <Redirect to="/calendario" /> : <LoginPage/>}
                </Route>
                <Route path="/cadastro">
                    {(user.loggedIn) ? <Redirect to="/calendario" /> : <RegisterPage/>}
                </Route>
                <Route exact path="/calendario/:m/:y" >
                    {(user.loggedIn) ? <CalendarPage /> : <Redirect to="/login"/>}
                </Route>
                <Route exact path="/calendario">
                    {(user.loggedIn) ? <Redirect to={`/calendario/${currentMonth}/${currentYear}`} /> : <Redirect to="/login"/>}
                </Route>
                <Route exact path="/dia/:d/:m/:y" >
                    {(user.loggedIn) ? <DayPage /> : <Redirect to="/login"/>}
                </Route>
                <Route exact path="/dia/" >
                    {(user.loggedIn) ?  <Redirect to={`/dia/${currentDate}/${currentMonth}/${currentYear}`} /> : <Redirect to="/login"/>}
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App;
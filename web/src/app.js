import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import './app.css';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';
import CalendarPage from './pages/Calendar';

function App(){
    const [user,setUser] = useState({loggedIn: false});

    //Check if there is a logged in user
    const fetchUser = () => {
        if (document.cookie.indexOf("jwt=") > -1){//Cookie is set
            setUser({loggedIn: true})
        } 
    }
        
    //Check for active user session
    useEffect(() => {
        fetchUser();
    });

    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact>
                    {(user.loggedIn) ? <Redirect to="/calendario/" /> : <Redirect to="/login"/>}
                </Route>
                <Route path="/login" exact>
                    {(user.loggedIn) ? <Redirect to="/calendario/" /> : <LoginPage/>}
                </Route>
                <Route path="/cadastro" exact>
                    {(user.loggedIn) ? <Redirect to="/calendario/" /> : <RegisterPage/>}
                </Route>
                <Route path="/calendario" exact component={RegisterPage}>
                    {(user.loggedIn) ? <CalendarPage /> : <Redirect to="/login"/>}
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App;
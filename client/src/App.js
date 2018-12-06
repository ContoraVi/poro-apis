import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import {Provider} from 'react-redux';
import store from './store';

import {setCurrentUser, logoutUser} from './actions/authActions';
import {setCurrentApiUser, logoutApiUser} from './actions/apiAuthActions';
import setAuthToken from './utils/setAuthToken';

import PrivateRoute from './components/common/PrivateRoute';

import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Navbar from './components/layout/Navbar';
import ApiLogin from './components/auth/ApiLogin';
import Dashboard from './components/dashboard/Dashboard';
import Coas from './components/data/Coas';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.jwtToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutUser());
        // TODO: Clear current Profile
        // Redirect to login
        window.location.href = '/login';
    }
}

// Get Api User and api token from local storage
if (localStorage.apiToken) {
    // Decode token and get user info and exp
    const decoded = jwt_decode(localStorage.apiToken);
    // Set user and isAuthenticated
    store.dispatch(setCurrentApiUser(decoded));

    // Check for expired token
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
        // Logout user
        store.dispatch(logoutApiUser());
        // TODO: Clear current Profile
        // Redirect to login
        window.location.href = '/apiLogin';
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <Route exact path="/" component={Landing}/>
                        <Route path="/login" component={Login}/>
                        <Switch>
                            <PrivateRoute path="/apiLogin" component={ApiLogin}/>
                            <PrivateRoute path="/dashboard" component={Dashboard}/>
                            <PrivateRoute path="/coas" component={Coas}/>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;

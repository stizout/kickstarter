import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { setUserInRedux, logoutUser } from './ducks/actions/authorizationActions';
import jwt_decode from 'jwt-decode';
import setAuthHeader from './setAuthHeader';
import store from './ducks/store';
import Loadable from 'react-loadable';


import './App.css';

const Loading = () => <h1>Loading...</h1>

const Registration = Loadable({
  loader: () => import('./views/Registration'),
  loading: Loading
});
const Login = Loadable({
  loader: () => import('./views/Login'),
  loading: Loading
});
const Landing = Loadable({
  loader: () => import('./views/Landing'),
  loading: Loading
});
const Dashboard = Loadable({
  loader: () => import('./views/Dashboard'),
  loading: Loading
});

const Home = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={Landing}/>
        <Route path="/register" component={Registration}/>
        <Route path="/login" component={Login}/>
        <Route path="/dashboard" component={Dashboard}/>
      </Switch>
    </Router>
  </Provider>
)

if(localStorage.jwtToken) {
  setAuthHeader(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken)

  store.dispatch(setUserInRedux(decoded))
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser());
  
    // redirect
    window.location.href="/login";
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Home />
      </div>
    );
  }
}

export default App;

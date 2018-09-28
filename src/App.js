import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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

const Home = () => (
  <Router>
    <Switch>
      <Route path="/register" component={Registration}/>
      <Route path="/login" component={Login}/>
    </Switch>
  </Router>
)

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

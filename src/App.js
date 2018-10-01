import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './Header';
import Footer from './Footer';
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

const Home = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/register" component={Registration}/>
        <Route path="/login" component={Login}/>
      </Switch>
    </Router>
  </Provider>
)

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Home />
        <Footer />
      </div>
    );
  }
}

export default App;

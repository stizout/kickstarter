import React, { Component } from 'react'
import Header from '../Header';
import Footer from '../Footer';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header />
        <h1>Some Stuff</h1>
        <Footer />
      </div>
    )
  }
}

import React, { Component } from 'react'
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      campaigns: [],
      totalUsers: null,
      category: 'Tech'
    }
  }

  componentDidMount() {
    axios.get('/api/campaigns').then(res => {
      this.setState({campaigns: res.data})
    })
    axios.get('/api/users/totalUsers').then(res => {
      this.setState({totalUsers: res.data})
    })
  }

  categoryUpdate(key) {
    this.setState({category: key})
  }
  render() {
    console.log(this.state)
    const { campaigns, totalUsers, category } = this.state
    return (
      <div>
        <Header />
        <div className="dashboard-header-stats">
          <div className="total-backers">
            <h2>Total Live Campaigns</h2>
            <p>{campaigns.length > 0 ? campaigns.length : null}</p>
          </div>
          <div className="live-projects">
            <h2>Total Backers</h2>
            <p>{totalUsers ? totalUsers : null}</p>
          </div>
        </div>
          <div className="dashboard-category-header">
            <div>
              <span className={category === 'Tech' ? 'active' : 'not-active'} onClick={() => this.categoryUpdate('Tech')}>Tech</span>
              <span className={category === 'Art' ? 'active' : 'not-active'} onClick={() => this.categoryUpdate('Art')}>Art</span>
              <span className={category === 'Film' ? 'active' : 'not-active'} onClick={() => this.categoryUpdate('Film')}>Film</span>
              <span className={category === 'Games' ? 'active' : 'not-active'} onClick={() => this.categoryUpdate('Games')}>Games</span>
            </div>
          </div>
        <Footer />
      </div>
    )
  }
}

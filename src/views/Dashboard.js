import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';

export default class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      campaigns: [],
      campaignSort: [],
      featured: [],
      totalUsers: null,
      category: 'Tech'
    }
  }

  componentDidMount() {
    axios.get('/api/campaigns').then(res => {
      const sorted = res.data.filter((e) => e.category === 'Tech')
      const featured = res.data[Math.floor(Math.random() * res.data.length)]
      console.log('sorted', sorted)
      this.setState({
        campaigns: res.data, 
        campaignSort: sorted,
        featured: featured
      })
    });
    axios.get('/api/users/totalUsers').then(res => {
      this.setState({totalUsers: res.data})
    });
    
  }

  categoryUpdate(key) {
    const updateFilter = this.state.campaigns.filter((e) => e.category === key)
    this.setState({category: key, campaignSort: updateFilter})
  }
  render() {
    console.log(this.state)
    console.log(window)
    const { campaigns, totalUsers, category, featured, campaignSort } = this.state
    return (
      <div>
        <Header />
        <div className="dashboard-header-stats">
          <div className="total-backers">
            <h2>Live Campaigns</h2>
            <p>{campaigns.length > 0 ? campaigns.length : null}</p>
          </div>
          <div className="live-projects">
            <h2>Backers</h2>
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
          <div className="dashboard-featured-container">
            <div className="top-featured">
              <span>
                <h4>Featured KickStarter Project</h4>
              {campaigns.length > 0 ?
                window.innerWidth > 1000 ?
                <iframe title="video" width="600" height="400" src={featured.video} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
                : <iframe title="video" width="337" height="200" src={featured.video} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
              : null}
              </span>
            </div>
            {campaignSort.length > 0 ?
            <div className="other-featured-list">
              {campaignSort.map((item) => {
                return (
                  <Link to={`/campaigns/${item._id}`}><div key={item._id} className="item-container">
                      <img alt="campaign" src="https://itefix.net/sites/default/files/not_available.png"/>
                      <div className="item-description">
                        <p className="dashboard-title">{item.title}</p>
                        <p className="dashboard-desc">Funding Goal: ${item.fullyFunded}</p>
                      </div>
                  </div></Link>
                )
              })}
            </div>
            : <p>Loading...</p>}
          </div>
        <Footer />
      </div>
    )
  }
}





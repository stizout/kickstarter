import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';
import Checkout from '../Checkout';

class SingleCampaign extends Component {
  constructor() {
    super();
    this.state = {
      campaign: null,
      user: null,
      today: new Date().getTime(),
      endDate: null,
      contribute: false,
      amountToContribute: null,
    }
  }
  componentDidMount() {
    let id = this.props.match.params.id
    axios.get(`/api/campaigns/${id}`).then(res => {
      console.log(res.data)
      this.setState({
        campaign: res.data[0],
        user: res.data[1],
        endDate: new Date(res.data[0].endDate).getTime()
      })
    })
  }

  addContribute = () => {
    if(this.props.auth.isLoggedIn) {
      this.setState({
        contribute: !this.state.contribute
      })
    } else {
      alert('You Must Be Logged In To Contribute')
    }
  }
  updateContributeAmount = (e) => {
    this.setState({
      amountToContribute: e.target.value
    })
  }

  updateState = (data) => {
    this.setState({campaign: data})
  }
  render() {
    console.log(this.state.campaign)
    const { campaign, user, today, endDate,
      contribute, amountToContribute } = this.state
    const day = 24*60*60*1000
    let totalDonations
    let totalBackers
    let lineGraph
    if(campaign) {
      if(campaign.donation.length > 0) {
        totalDonations = campaign.donation.map((item) => item.amount).reduce((a,b) => a + b)
        totalBackers = campaign.donation.length
        lineGraph = {
          backgroundColor: 'purple',
          height: '25px',
          width: (totalDonations/this.state.campaign.fullyFunded * 100) + '%',
        }
      }
    }
    console.log(lineGraph)
    return (
      this.state.campaign ?
      <div className="single-container">
        <Header />
        <div className="single-header-container">
          <div className="single-createdBy">
            <h1>Created By:</h1>
            <h3>{user.name}</h3>
          </div>
          <div className="single-campaign-header">
            <h1>{campaign.title}</h1>
          </div>
        </div>
        <div className="single-body-container">
          <iframe className="single-video"
            width="800" height="600" src={campaign.video} frameBorder="0" 
            allow="autoplay; encrypted-media" allowFullScreen>
          </iframe>
          <div className="single-goal-info">
            <p style={lineGraph}>1</p>
            <p>Total Pledges: ${totalDonations}</p>
            <p>Goal: ${campaign.fullyFunded}</p>
            <p>Backers: {totalBackers}</p>
            <p>Days left: {Math.round(Math.abs(today - endDate) / (day))}</p>
            <button onClick={this.addContribute}>Contribute</button>
            {contribute ?
            <div className="single-contribute">
              <select onChange={this.updateContributeAmount}>
              <option>Select Amount</option>
                <option value={10}>$10</option>
                <option value={50}>$50</option>
                <option value={100}>$100</option>
              </select>
                <Checkout 
                  name="The Real Kickstarter"
                  amount={amountToContribute}
                  description="Title of Campaign Here"
                  id={this.props.match.params.id}
                  updateState={this.updateState}
                />
            </div>
              : null}
          </div>
        </div>
        <Footer />
      </div>
      : <h1>Loading...</h1>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})


export default connect(mapStateToProps)(SingleCampaign);

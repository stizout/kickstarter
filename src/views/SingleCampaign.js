import React, { Component } from 'react'
import axios from 'axios';
import Header from '../Header';
import Footer from '../Footer';

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
    this.setState({
      contribute: !this.state.contribute
    })
  }
  updateContributeAmount = (e) => {
    this.setState({
      amountToContribute: e.target.value
    })
  }
  render() {
    console.log(this.state)
    const { campaign, user, today, endDate, contribute } = this.state
    const day = 24*60*60*1000
    return (
      this.state.campaign ?
      <div>
        <Header />
        <h1>Single Campaign</h1>
        <h1>{campaign.title}</h1>
        <div>
          <iframe width="1000" height="800" src={campaign.video} frameBorder="0" 
            allow="autoplay; encrypted-media" allowFullScreen>
          </iframe>
          <div>
            <p>Current Dontation Value</p>
            <p>{campaign.fullyFunded}</p>
            <p>Current Number of Backers</p>
            <p>Days left: {Math.round(Math.abs(today - endDate) / (day))}</p>
            <button onClick={this.addContribute}>Contribute</button>
            {contribute ?
            <div>
              <select onChange={this.updateContributeAmount}>
              <option>Select Amount</option>
                <option value={10}>$10</option>
                <option value={50}>$50</option>
                <option value={100}>$100</option>
              </select>
              <button>Fund!</button>
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


export default SingleCampaign;

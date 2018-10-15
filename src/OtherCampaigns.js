import React, { Component } from 'react'
import axios from 'axios';

class OtherCampaigns extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campaigns: [],
    }
  }
  componentDidMount() {
    axios.get('/api/campaigns').then(res => {
      this.setState({
        campaigns: res.data
      });
    })
  }
  render() {
    console.log(this.props)
    return (
      <div className="other-campaigns-container">
        {this.state.campaigns.length > 0 ?
          this.state.campaigns.map((camp) => {
            return (
              <div key={camp._id} onClick={() => this.props.updateCampaign(camp)}>
                <h1>{camp.title}</h1>
                <img alt="campaign" src="https://itefix.net/sites/default/files/not_available.png"/>
              </div>
            )
          })
          : null}
      </div>
    )
  }
}


export default OtherCampaigns
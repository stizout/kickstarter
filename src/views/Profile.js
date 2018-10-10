import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { getUserType } from '../ducks/actions/authorizationActions';
import Modal from './Modal';
import Header from '../Header';
import Footer from '../Footer';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      picture: '',
      donations: [],
      image: null
    }
  }

  componentDidMount() {
    if(!this.props.auth.isLoggedIn) {
      this.props.history.push('/login');
    }
    axios.get('/api/users/info').then(res => {
      this.setState({donations: res.data})
    });
  }
  showModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  handleInputs= (e) => {
    this.setState({
      picture: e.target.value
    });
  }

  submitPicture = () => {
    axios.post('/api/users/picture', {...this.state}).then(() => {
      this.props.getUserType(this.props.auth.user.id)
      this.showModal();
    });
  }


  render() {
    console.log(this.state)
    const { showModal, donations } = this.state
    return (
      <div>
        <Header />
          <div className="profile-container">
            <h1>User Profile: {this.props.auth.user.name}</h1>
            <div className="profile-top-container">
              <div className="profile-details">
                {this.props.auth.userDetails.image ?
                <img src={this.props.auth.userDetails.image} alt="profile" />
                : <img src="http://proconsultancies.org/wimages/icon-user-default.png" alt="default" onClick={this.showModal}/>}
                <h4>{this.props.auth.userDetails.name}</h4>
                <h4>{this.props.auth.userDetails.email}</h4>
                <h4>Total Donations: {donations.length}</h4>
                </div>
              <Modal show={showModal} showModal={this.showModal}>
                <h2>Hello</h2>
                <input onChange={this.handleInputs}/>
                <button onClick={this.submitPicture}>Add Picture!</button>
              </Modal>
              <div className="profile-main">
                <p>Lorem Ipsum is simply dummy text of the printing and 
                  typesetting industry. Lorem Ipsum has been the industry's 
                  standard dummy text ever since the 1500s, when an unknown 
                  printer took a galley of type and scrambled it to make a 
                  type specimen book. It has survived not only five centuries, 
                  but also the leap into electronic typesetting, remaining 
                  essentially unchanged. It was popularised in the 1960s with 
                  the release of Letraset sheets containing Lorem Ipsum 
                  passages, and more recently with desktop publishing software 
                  like Aldus PageMaker including versions of Lorem Ipsum.</p>
                  <h1>My Donations:</h1>
                  {donations && donations.map((donation, i) => {
                    return (
                      <div key={i}>
                        <h1>{donation.campaign}</h1>
                        <h2>{donation.amount}</h2>
                      </div>
                    )
                  })}
              </div>
            </div>
          </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});


export default connect(mapStateToProps, { getUserType })(Profile)
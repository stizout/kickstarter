import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import { getUserType } from '../ducks/actions/authorizationActions';
import image from '../No-image.jpg';
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
            <div className="profile-top-container">
              <div className="profile-details">
                {this.props.auth.userDetails.image ?
                <img src={this.props.auth.userDetails.image} alt="profile" />
                : <img src={image} alt="default" onClick={this.showModal}/>}
                <h4>{this.props.auth.userDetails.name}</h4>
                <h4>{this.props.auth.userDetails.email}</h4>
                <h4>Total Donations: {donations.length}</h4>
                </div>
              <Modal show={showModal} showModal={this.showModal}>
                <h2>Update Your Profile Picture</h2>
                <input onChange={this.handleInputs} placeholder="Picture URL"/>
                <button onClick={this.submitPicture}>Update Picture!</button>
              </Modal>
              <div className="profile-main">
                  <h1>My Donations</h1>
                  {donations && donations.map((donation, i) => {
                    return (
                      <div key={i} className="donation-info">
                        <h2>Campaign: {donation.title}</h2>
                        <h2>Donation: ${donation.amount}</h2>
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
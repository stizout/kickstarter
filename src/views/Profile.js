import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import Modal from './Modal';
import Header from '../Header';
import Footer from '../Footer';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      picture: '',
      image: null
    }
  }

  componentDidMount() {
    if(!this.props.auth.isLoggedIn) {
      this.props.history.push('/login');
    }
  }
  showModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  handleInputs= (e) => {
    this.setState({
      picture: e.target.value
    })
  }

  submitPicture = () => {
    axios.post('/api/users/picture', {...this.state}).then(
      console.log('hello')
    )
  }


  render() {
    console.log(this.state)
    console.log(this.props.auth.type.image)
    const { showModal } = this.state
    return (
      <div>
        <Header />
          <div className="profile-container">
            <h1>User Profile: {this.props.auth.user.type}</h1>
            <div className="profile-top-container">
              <div className="profile-details">
                <img src="https://engineering.jhu.edu/hltcoe/wp-content/uploads/sites/92/2016/11/male-no-image-1.jpg" alt="No Image Available" onClick={this.showModal}/>                </div>
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
})


export default connect(mapStateToProps, {})(Profile)
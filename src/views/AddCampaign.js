import React, { Component } from 'react'
import { addCampaign } from '../ducks/actions/campaignActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import Header from '../Header';
import Footer from '../Footer';

class AddCampaign extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      fullyFunded: '',
      endDate: '',
      video: '',
      category: '',
      description: '',
      errors: {}
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if(nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  handleInputs = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  submit = (e) => {
    e.preventDefault();
    const { title, fullyFunded, endDate,
    video, category, description } = this.state
    let newCampaign = {
      title,
      fullyFunded,
      endDate,
      video,
      category,
      description
    }
    this.props.addCampaign(newCampaign, this.props.history);
  }
  render() {
    const { errors } = this.state
    console.log(this.state)
    return (
      <div>
        <Header />
        <div className="add-campaign-container">
          <h1>This is the add campaign page</h1>
          <form className="form-container" onSubmit={this.submit}>
            <input 
              onChange={this.handleInputs} 
              name="title" 
              placeholder="Title"
              className={classnames("input", {'is-invalid': errors.title})}
            />
            {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            <input 
              onChange={this.handleInputs}  
              name="fullyFunded" 
              placeholder="Goal For Your Project"
              className={classnames("input", {'is-invalid': errors.fullyFunded})}
              />
              {errors.fullyFunded && <div className="invalid-feedback">{errors.fullyFunded}</div>}
            <input 
            onChange={this.handleInputs}  
            name="endDate" 
            placeholder="End Date"
            className={classnames("input", {'is-invalid': errors.endDate})}
            />
            {errors.endDate && <div className="invalid-feedback">{errors.endDate}</div>}
            <input 
            onChange={this.handleInputs}  
            name="video" 
            placeholder="Upload A Promo Video"
            className={classnames("input", {'is-invalid': errors.video})}
            />
            {errors.video && <div className="invalid-feedback">{errors.video}</div>}
            <select 
              className={classnames("input", {'is-invalid': errors.category})} 
              onChange={this.handleInputs} 
              name="category">
              <option>-- Select --</option>
              <option value="tech">Tech</option>
              <option value="art">Art</option>
              <option value="film">Film</option>
              <option value="games">Games</option>
            </select>
            {errors.category && <div className="invalid-feedback">{errors.category}</div>}
            <input 
            onChange={this.handleInputs}  
            name="description" 
            placeholder="This is your main description. Go Nuts!"
            className={classnames("input", {'is-invalid': errors.description})}
            />
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
            <input type="submit" className="submit-button"/>
          </form>
        </div>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  errors: state.errors
})

export default  connect(mapStateToProps, { addCampaign })(withRouter(AddCampaign))

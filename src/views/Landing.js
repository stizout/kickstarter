import React from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="landing-container">
      <h1>WELCOME TO KICKSTARTER</h1>
      <p>...(At least my version)</p>
      <Link to="/dashboard"><button>See Projects</button></Link>
      <ul className="landing-ul">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  )
}


export default Landing;
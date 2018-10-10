import React from 'react'

export default (props) => {
  if(props.show) {
    return (
      <div className="modal-container">
      <button onClick={props.showModal}>close</button>
        <h1>This is my Modal</h1>
        <h1>This is my Modal</h1>
        <h1>This is my Modal</h1>
      </div>
    )
  } else {
    return null
  }
}


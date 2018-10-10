import React from 'react'

export default (props) => {
  if(props.show) {
    return (
      <div className="modal-container">
        {props.children}
        <button onClick={props.showModal}>close</button>
      </div>
    )
  } else {
    return null
  }
}


import React, { Component } from 'react';
import './styles.css';

class UserDetails extends Component {
  render() {
    const { img, phone, id, hideDetails} = this.props;
    return (
      <div className='container'>
        <button className='button' onClick={() => hideDetails(id)}>x</button>
        <img src={img} alt='photo of person'/>
        <p>Phone:{phone}</p>
      </div>
    )
  }
}

export default UserDetails;
import React, { Component } from 'react';

class UserDetails extends Component {
  render() {
    const { img, phone } = this.props;
    return (
      <div className='container'>
        <button >x</button>
        <img src={img}/>
        <p>{phone}</p>
        <p>some info</p>
      </div>
    )
  }
}

export default UserDetails;
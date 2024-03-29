import React, { Component } from 'react';
import { getUsers } from './../../api';
import UserDetails from '../UserDetais/';
import { NATIONLITIES } from '../../config/nationalities'; 


class UsersLoader2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isFetching: true,
      isError: false,
      page: 1,
      nat: 'UA',
      disabled: true,
      selectedUsers: []
    }
    console.log('constructor');
    console.log(this.state.users)
  }

  load = () => {
    const { page, nat } = this.state;
    getUsers({ results: 10, page: page, nat: nat })
      .then(data => {
        this.setState({
          users: data.results
        })
      })
      .catch(error => {
        this.setState({
          isError: true
        })
      })
      .finally(() => {
        this.setState({
          isFetching: false
        })
      })

  }

  componentDidMount() {
    console.log('componentDidMount');
    this.load();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');
    const isDataPrev =((prevState.page === this.state.page) && (prevState.nat === this.state.nat));
    if ( isDataPrev ) {
      return;
    }
    this.load();
  }

  handlerSelectChange = ({ target }) => {
    this.setState({
      nat: target.value
    })
  }

  prevPage = () => {
    const { page, disabled } = this.state;
    if (page !== 1) {
      this.setState({
        page: this.state.page - 1,
        selectedUsers: []
      })
    } else {
      this.setState({
        disabled: !disabled
      })
    }
  }

  nextPage = () => {
    this.setState({
      page: this.state.page + 1,
      disabled: false,
      selectedUsers: []
    })
  }

  handlerClik = (user) => {
    const newSelectedUsers = [...this.state.selectedUsers];
    newSelectedUsers.push(user);
    this.setState({
    selectedUsers: newSelectedUsers
   })
  }

  hideDetails = (id) => {
    debugger;
    const { selectedUsers } = this.state;
    console.log(selectedUsers);
    const newSelectedUsers = selectedUsers.filter((user) => user.login.uuid !== id);
    console.log(newSelectedUsers);
    this.setState({
      selectedUsers: newSelectedUsers
     })
  }

  showUser = (user) => {
    const userToRender = user;
    const { selectedUsers } = this.state;
    console.log(selectedUsers);
    const showdetails = this.state.selectedUsers.includes(userToRender) ? true : false;
    return <li key={user.login.uuid}>
      {`${user.name.first} ${user.name.last}`} 
      <button onClick={ () => this.handlerClik(userToRender) }>Details</button>
      {showdetails && 
      <UserDetails img={userToRender.picture.large}
                   phone={userToRender.cell}
                   id={userToRender.login.uuid}
                   hideDetails={this.hideDetails}
      />}
    </li>
    }
  
  render() {
    console.log('render');
    const { disabled } = this.state;
    if (this.state.isFetching) {
      return <p>Loading...</p>
    }
    if (this.state.isError) {
      return <p>Error...</p>
    }

    const options = NATIONLITIES.map( nat => <option value={nat}>{nat}</option>)

    return (
      <section>
        <h2>Users List</h2>
        <div>
          <select value={ this.state.nat } onChange={this.handlerSelectChange}>
            {options}
          </select>
          <button disabled={ disabled } onClick={this.prevPage}>{"<"}</button>
          <button onClick={this.nextPage}>{">"}</button>
          <span>page: {this.state.page}</span>
        </div>
        <ol>
          {this.state.users.map(this.showUser)}
        </ol>
      </section>
    );
  }
}

export default UsersLoader2;

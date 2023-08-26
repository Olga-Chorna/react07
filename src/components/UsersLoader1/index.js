import React, { Component } from 'react';

class UsersLoader1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      isFetching: true,
      isError: false,
      page: 1
    }
    console.log('constructor');
  }

  componentDidMount() {
    console.log('componentDidMount');
    const { page } = this.state;
    // fetch('https://randomuser.me/api')
    // fetch('https://randomuser.me/api/?results=5')
    // fetch('https://randomuser.me/api/?results=10&seed=abc&nat=ua&page=2')
    // fetch('https://randomuser.me/api/?results=10&gender=male&nat=ua&page=1')
    fetch(`https://randomuser.me/api/?seed=abc&results=10&nat=ua&page=${page}`)
      .then(response => response.json())
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
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate');

    // console.log('prevState: ' + prevState.page + 'currentState: ' + this.state.page);
    if (prevState.page === this.state.page) {
      return;
    }
    const { page } = this.state;
    fetch(`https://randomuser.me/api/?seed=abc&results=10&nat=ua&page=${page}`)
      .then(response => response.json())
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
  prevPage = () => {
    this.setState({
      page: this.state.page - 1
    })
  }
  nextPage = () => {
    this.setState({
      page: this.state.page + 1
    })
  }
  showUser = (user) => <li key={user.login.uuid}>{`${user.name.first} ${user.name.last}`}</li>
  render() {
    console.log('render');
    if (this.state.isFetching) {
      return <p>Loading...</p>
    }
    if (this.state.isError) {
      return <p>Error...</p>
    }
    return (
      <section>
        <h2>Users List</h2>
        <button onClick={this.prevPage}>{"<"}</button>
        <button onClick={this.nextPage}>{">"}</button>
        <span>page: {this.state.page}</span>
        <ul>
          {this.state.users.map(this.showUser)}
        </ul>
      </section>
    );
  }
}

export default UsersLoader1;

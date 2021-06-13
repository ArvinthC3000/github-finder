import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

import NavBar from './components/layout/NavBar';
import Alert from './components/layout/Alert';
import Users from './components/users/Users';
import Search from './components/users/Search';

class App extends Component {
  state = {
    users: [],
    loading: false,
    alert: null,
  };

  // async componentDidMount(){
  //   this.setState({ loading:true })

  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

  //   this.setState({ users: res.data ,loading:false })
  // }

  /* Search github users and set state */
  searchUsers = async (text) => {
    if (!text) return this.setState({ users: [] });

    this.setState({ loading: true, alert: null });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false });
  };

  /* Clear users form state */
  clearUser = () => this.setState({ users: [] });

  /* set Alerts */
  showAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
  };

  render() {
    return (
      <div className='App'>
        <NavBar title='Github Finder' />
        <div className='container'>
          <Alert alert={this.state.alert} />
          <Search
            searchUsers={this.searchUsers}
            clearUser={this.clearUser}
            showClear={!!this.state.users.length}
            showAlert={this.showAlert}
          />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;

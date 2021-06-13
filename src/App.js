import './App.css';

import axios from 'axios';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Alert from './components/layout/Alert';
import NavBar from './components/layout/NavBar';
import Search from './components/users/Search';
import Users from './components/users/Users';
import User from './components/users/User';
import About from 'components/pages/About';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };

  // async componentDidMount(){
  //   this.setState({ loading:true })

  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)

  //   this.setState({ users: res.data ,loading:false })
  // }

  /* Search github users and set state */
  searchUsers = async text => {
    if (!text) return this.setState({ users: [] });

    this.setState({ loading: true, alert: null });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ users: res.data.items, loading: false });
  };

  /* Get users */
  getUser = async username => {
    this.setState({ loading: true, alert: null });
    const res = await axios.get(
      `https://api.github.com/users/${username}?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ user: res.data, loading: false });
  };

  /* Get users repo */
  getUserRepos = async username => {
    this.setState({ loading: true, alert: null });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ repos: res.data, loading: false });
  };

  /* Clear users form state */
  clearUser = () => this.setState({ users: [] });

  /* set Alerts */
  showAlert = (msg, type) => {
    this.setState({ alert: { msg, type } });
  };

  render() {
    const { alert, loading, user, users, repos } = this.state;
    return (
      <Router>
        <div className='App'>
          <NavBar title='Github Finder' />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUser={this.clearUser}
                      showClear={!!users.length}
                      showAlert={this.showAlert}
                    />
                    <Users loading={loading} users={users} />
                  </>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User
                    {...props}
                    user={user}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    loading={loading}
                    repos={repos}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;

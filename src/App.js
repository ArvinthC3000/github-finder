import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

import NavBar from './components/layout/NavBar';
import Users from './components/users/Users';
import Search from './components/users/Search';

class App extends Component{

  state = {
    users: [],
    loading: false
  }

  // async componentDidMount(){
  //   this.setState({ loading:true })
    
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    
  //   this.setState({ users: res.data ,loading:false })
  // }


  /* Search github users */
  searchUsers = async text => {
    
    if(!text) return this.setState({ users: [] })  

    this.setState({ loading:true })
    
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    
    console.log(res.data);
    this.setState({ users: res.data.items ,loading:false })  
  }
  
  clearUser = () => this.setState({ users: [] })

  render(){
    return (
      <div className="App">
        <NavBar title="Github Finder" />
        <div className="container">
          <Search 
            searchUsers={this.searchUsers} 
            clearUser={this.clearUser} 
            showClear={!!this.state.users.length}
          />
          <Users loading={this.state.loading} users={this.state.users} />
        </div>
      </div>
    );
  }
}

export default App;

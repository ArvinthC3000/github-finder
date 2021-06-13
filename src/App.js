import './App.css';

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Alert from './components/layout/Alert';
import NavBar from './components/layout/NavBar';
import Search from './components/users/Search';
import Users from './components/users/Users';
import User from './components/users/User';
import About from 'components/pages/About';

import GithubState from './context/github/GithubState';

const App = () => {
  const [alert, setAlert] = useState(null);

  /* Search github users and set state */

  /* Get users */

  /* Get users repo */

  /* Clear users form state */

  /* set Alerts */
  const showAlert = (msg, type) => setAlert({ msg, type });

  return (
    <GithubState>
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
                    <Search showAlert={showAlert} />
                    <Users />
                  </>
                )}
              />
              <Route exact path='/about' component={About} />
              <Route
                exact
                path='/user/:login'
                render={props => <User {...props} />}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;

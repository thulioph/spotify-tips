import React from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from '../home';
import Login from '../login';
import Auth from '../auth';
import Logout from '../logout';

import Octocat from '../../components/octocat';

// ====

class App extends React.Component {
  state = {
    hasToken: false
  };

  componentDidMount() {
    const access_token = localStorage.getItem('st_access_token');

    if (access_token) {
      console.warn('tem o token', access_token);
      this.setState({ hasToken: true });
    } else {
      this.setState({ hasToken: false })
    }
  }

  render() {
    const { hasToken } = this.state;

    return(
      <Router>
        <div>
          {!hasToken ? <Redirect to="/login"></Redirect> : null}
          
          <Octocat 
            repoUrl="https://github.com/thulioph/spotify-tips/" 
            title="Fork me on Github" 
          />

          <ul>
            <li><Link to="/login">Login</Link></li>
            {hasToken ? <li><Link to="/home">Home</Link></li> : null}
            {hasToken ? <li><Link to="/logout">Logout</Link></li> : null}
          </ul>

          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/auth' component={Auth} />
          <Route path='/logout' component={Logout} />
        </div>
      </Router>
    )
  }
};

// ====

export default App;

import React from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from '../home';
import Login from '../login';
import Auth from '../auth';
import Logout from '../logout';

import Octocat from '../../components/octocat';

import Storage from '../../utils/Storage';

// ====

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasToken: false
    };

    this.storage = new Storage('spotify_tips');
  }

  componentWillMount() {
    const access_token = this.storage.get();

    if (access_token) {
      this.setState({ hasToken: true });
    } else {
      this.setState({ hasToken: false })
    }
  }

  render() {
    const { hasToken } = this.state;
    
    let logout_link;
    let home_link;
    let login_link;
    
    if (hasToken) {
      logout_link = <li className="navbar-item"><Link to='/logout'>Logout</Link></li>
      home_link = <li className="navbar-item"><Link to='/home'>Home</Link></li>
    } else {
      login_link = <li className="navbar-item"><Link to='/login'>Login</Link></li>
    }

    return(
      <Router>
        <div>
          {!hasToken && <Redirect to='/login' /> } 
          
          <Octocat 
            repoUrl="https://github.com/thulioph/spotify-tips/" 
            title="Fork me on Github" 
          />

          <nav className="navbar">
            <ul className="navbar-menu">
              {login_link}
              {home_link}
              {logout_link}
            </ul>
          </nav>

          <Route path='/home' component={Home}/>
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

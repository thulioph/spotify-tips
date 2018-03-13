import React from 'react';
import { Redirect } from 'react-router';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from 'containers/home';
import Login from 'containers/login';
import Auth from 'containers/auth';
import Logout from 'containers/logout';

import TrackInfo from 'containers/track-info';

import Octocat from 'components/octocat';

import Storage from 'utils/Storage';

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
    
    if (hasToken) {
      logout_link = <li className="navbar-item"><Link to='/logout'>Logout</Link></li>
    }

    return(
      <Router>
        <main>
          {!hasToken && <Redirect to='/login' /> } 
          
          <Octocat 
            repoUrl="https://github.com/thulioph/spotify-tips/" 
            title="Fork me on Github" 
          />

          {/* {
            hasToken ? 
              <nav className="navbar">
                <ul className="navbar-menu">
                  {logout_link}
                </ul>
              </nav>
            : null
          } */}

          <Route path='/home' component={Home}/>
          <Route path='/track/:trackID/info' component={TrackInfo}/>

          <Route path='/login' component={Login} />
          <Route path='/auth' component={Auth} />
          <Route path='/logout' component={Logout} />
        </main>
      </Router>
    )
  }
};

// ====

export default App;

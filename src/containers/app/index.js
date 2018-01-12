import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from '../home';
import Login from '../login';

import Octocat from '../../components/octocat';

// ====

class App extends React.Component {
  render() {
    return(
      <Router>
        <div>
          <Octocat repoUrl="https://github.com/thulioph/spotify-tips/" title="Fork me on Github" />
          
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/">Home</Link></li>
          </ul> 

          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;

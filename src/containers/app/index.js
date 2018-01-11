import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Home from '../home';
import Login from '../login';

// ====

class App extends React.Component {
  render() {
    return(
      <Router>
        <div>
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

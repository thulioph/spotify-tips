import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import HomePage from 'pages/Home';
import LoginPage from 'pages/Login';

const browserHistory = createBrowserHistory();

const App = () => {
  return(
    <Router history={browserHistory}>
      <Switch>
        <Route path='/' component={HomePage} exact />
        <Route path='/login' component={LoginPage} />
      </Switch>
    </Router>
  );
};

export default App;

import React from 'react';
import { Router, Switch } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';

import Login from 'containers/login';
import Home from 'containers/home';
import Auth from 'containers/auth';
import Logout from 'containers/logout';
import TrackInfo from 'containers/track-info';
import Site from 'containers/site';

import { PublicRoute, PrivateRoute } from 'routes';

import Octocat from 'components/octocat';

const browserHistory = createBrowserHistory();

class App extends React.Component {
  render() {
    return(
      <main>
        <Octocat
          title="Fork me on Github"
          repoUrl="https://github.com/thulioph/spotify-tips/"
        />

        <Router history={browserHistory}>
          <Switch>
            <PublicRoute path='/' component={Site} exact />
            <PublicRoute path='/login' component={Login} />
            <PublicRoute path='/logout' component={Logout} />

            <PublicRoute path='/auth' component={Auth} />

            <PrivateRoute path='/home' component={Home} logged={true} />
            <PrivateRoute path='/track/:trackID/info' component={TrackInfo} logged={true} />
          </Switch>
        </Router>
      </main>
    )
  }
};

export default App;

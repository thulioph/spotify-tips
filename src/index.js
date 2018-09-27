import React from 'react';
import ReactDOM from 'react-dom';

import AppComponent from 'containers/app';
import registerServiceWorker from 'registerServiceWorker';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const App = () => (
    <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <AppComponent />
    </MuiThemeProvider>
);

ReactDOM.render(
    <App />, 
    document.getElementById('root')
);

registerServiceWorker();

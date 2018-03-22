import React from 'react';
import ReactDOM from 'react-dom';

// ====

import 'styles/index.css';
import AppComponent from 'containers/app';
import registerServiceWorker from 'registerServiceWorker';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


// ====

// @issueTitle Updates the theme style
// @issueBody This theme isn't so good.

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

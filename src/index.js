import React from 'react';
import ReactDOM from 'react-dom';

// ====

import 'styles/index.css';
import AppComponent from 'containers/app';
import registerServiceWorker from 'registerServiceWorker';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// ====

const App = () => (
    <MuiThemeProvider>
        <AppComponent />
    </MuiThemeProvider>
);

ReactDOM.render(
    <App />, 
    document.getElementById('root')
);

registerServiceWorker();

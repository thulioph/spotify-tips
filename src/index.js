import React from 'react';
import ReactDOM from 'react-dom';

// ====

import 'styles/index.css';
import App from 'containers/app';
import registerServiceWorker from 'registerServiceWorker';

// ====

// @issueTitle It should open a new issue to test
// @issueBody It's the issue body!

ReactDOM.render(
    <App />, 
    document.getElementById('root')
);

registerServiceWorker();

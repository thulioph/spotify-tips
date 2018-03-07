import React from 'react';
import { Redirect } from 'react-router';

import Storage from 'utils/Storage';

// ====

class Logout extends React.Component {
    componentDidMount() {
        const storage = new Storage('spotify_tips');
        storage.clear();
    }

    render() {
        return ( <Redirect to='/login' /> );
    }
};

// ====

export default Logout;
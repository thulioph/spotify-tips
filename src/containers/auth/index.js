import React from 'react';
import { Redirect } from 'react-router';

import Storage from '../../utils/Storage';
import { getHashParams } from '../../utils';

// ====

class Auth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOk: false
        };

        this.storage = new Storage('spotify_tips');
    }

    componentWillMount() {
        const access_token = getHashParams(window.location.hash, 'access_token');

        if (access_token) {
            const expires_in = getHashParams(window.location.hash, 'expires_in');

            this.storage.save({access_token, expires_in});
            this.setState({ isOk: true });
        }
    }

    render() {
        const { isOk } = this.state;
        
        return( 
            isOk && <Redirect to='/login' /> 
        )
    }
};

// ====

export default Auth;
import React from 'react';
import { Redirect } from 'react-router';

import Storage from '../../utils/Storage';

// ====

class Auth extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOk: false
        };

        this.storage = new Storage('spotify_tips');
    }

    // ver a melhor maneira de obter esse valor
    _getHashParams(key) {
        const matches = window.location.hash.match(new RegExp(key + '=([^&]*)'));
        return matches ? matches[1] : null;
    }

    componentWillMount() {
        const access_token = this._getHashParams('access_token');

        if (access_token) {
            const params = {
                access_token,
                expires_in: this._getHashParams('expires_in')
            };

            this.storage.save(params);

            this.setState({ isOk: true });
        } else {
            console.error('Algo deu errado.');
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
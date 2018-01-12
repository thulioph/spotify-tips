import React from 'react';
import { Redirect } from 'react-router';

// ====

class Auth extends React.Component {
    state = {
        isOk: false
    };

    // ver a melhor maneira de obter esse valor
    _getHashParams(key) {
        const matches = window.location.hash.match(new RegExp(key + '=([^&]*)'));
        return matches ? matches[1] : null;
    }

    componentWillMount() {
        console.warn('didmount boy');
        // debugger;

        const access_token = this._getHashParams('access_token');

        if (access_token) {
            const params = {
                access_token,
                expires_in: this._getHashParams('expires_in')
            };

            localStorage.setItem('st_access_token', params.access_token);
            localStorage.setItem('st_auth_params', JSON.stringify(params));
            // seconds to ms
            localStorage.setItem('st_access_token_expiration_time', new Date().getTime() + (parseInt(params.expires_in, 10) * 1000));

            this.setState({ isOk: true });
        } else {
            console.error('Algo deu errado.');
        }
    }

    render() {
        const { isOk } = this.state;
        
        return(
            isOk ? <Redirect to="/login"></Redirect> : null
        )
    }
};

// ====

export default Auth;
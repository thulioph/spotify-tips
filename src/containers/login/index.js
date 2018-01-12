import React from 'react';
import { Redirect } from 'react-router';

// ====

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.config = {
            client_id: '6df3fdd0cfd144968c9ba086f7bbbf31',
            scope: 'user-read-email user-top-read',
            redirect_uri: 'http://localhost:3000/auth'
        };

        this.requestLogin = this.requestLogin.bind(this);
        this._generateRandomString = this._generateRandomString.bind(this);

        this.state = {
            isLogged: false
        };
    }

    componentDidMount() {
        let access_token = localStorage.getItem('st_access_token');

        if (access_token) {
            console.warn('tem o token', access_token);
            this.setState({ isLogged: true });
        } else {
            console.warn('o access_token não existe..');
            this.setState({ isLogged: false });
        }
    }

    _generateRandomString(length) {
        let text = '';
        const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    requestLogin() {
        const state = this._generateRandomString(16);

        const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(this.config.client_id)}&scope=${encodeURIComponent(this.config.scope)}&redirect_uri=${encodeURIComponent(this.config.redirect_uri)}&state=${encodeURIComponent(state)}`;

        window.location = url;
    }

    render() {
        const { isLogged } = this.state;

        if (isLogged) {
            return(
                <Redirect to="/"></Redirect>
            );
        }

        return (
            <div>
                <h1 className="title">Login</h1>
                <button onClick={this.requestLogin}>Login</button>
            </div>
        )
    }
};

// ====

export default Login;
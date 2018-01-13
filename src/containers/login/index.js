import React from 'react';
import { Redirect } from 'react-router';

import Storage from '../../utils/Storage';
import { randomString } from '../../utils';

// ====

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.config = {
            client_id: '6df3fdd0cfd144968c9ba086f7bbbf31',
            scope: 'user-read-email user-top-read',
            redirect_uri: 'http://localhost:3000/auth'
        };

        this.state = {
            isLogged: false
        };

        this.storage = new Storage('spotify_tips');
    }

    componentDidMount() {
        let access_token = this.storage.get(); 

        if (access_token) {
            this.setState({ isLogged: true });
        } else {
            this.setState({ isLogged: false });
        }
    }

    requestLogin() {
        const client_id = encodeURIComponent(this.config.client_id);
        const scope = encodeURIComponent(this.config.scope);
        const redirect_uri = encodeURIComponent(this.config.redirect_uri);
        const state = encodeURIComponent(randomString(8));

        const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}`;

        window.location = url;
    }

    render() {
        const { isLogged } = this.state;

        if (isLogged) {
            return (<Redirect to='/home' />);
        }

        return (
            <section className="section">
                <div className="container">
                    <h1 className="title">Login</h1>
                    <button onClick={this.requestLogin.bind(this)} className="button is-dark">
                        Login
                    </button>
                </div>
            </section>
        )
    }
};

// ====

export default Login;
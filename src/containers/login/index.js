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
            redirect_uri: 'http://thulioph.com/spotify-tips/auth'
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
                <div className="columns">
                    <div className="column is-half is-offset-one-quarter">
                        <aside className="card-wrapper">
                            <h1 className="title">Spotify Tips</h1>
                            <h2 className="subtitle">
                                Obtenha <strong>métricas e dicas</strong> sobre o que você anda ouvindo.
                            </h2>

                            <button className="button is-dark is-medium"
                                onClick={this.requestLogin.bind(this)}>
                                Login with Spotify
                            </button>
                        </aside>
                    </div>
                </div>
             </section> 
        )
    }
};

// ====

export default Login;
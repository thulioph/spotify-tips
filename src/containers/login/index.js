import React from 'react';
import { Redirect } from 'react-router';

import Storage from '../../utils/Storage';
import { randomString } from '../../utils';

const Genius = require('node-genius');

// ====

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.config = {
            client_id: '6df3fdd0cfd144968c9ba086f7bbbf31',
            scope: 'user-read-email user-top-read',
            redirect_uri: 'https://spotify-tips.herokuapp.com/auth'
        };

        this.state = {
            isLogged: false
        };

        this.storage = new Storage('spotify_tips');

        this.geniusApi = new Genius('hGRRe7QIOm2TdVdjtF0LylhXlgS5vnIaSsn84hOoG32MZavGmnqi1IMY2NF7Ys0Y');
    }

    componentDidMount() {
        let access_token = this.storage.get(); 

        if (access_token) {
            this.setState({ isLogged: true });
        } else {
            this.setState({ isLogged: false });
        }
    }

    requestLogin(evt) {
        evt.currentTarget.classList.add('is-loading');
        
        const client_id = encodeURIComponent(this.config.client_id);
        const scope = encodeURIComponent(this.config.scope);
        const redirect_uri = encodeURIComponent(this.config.redirect_uri);
        const state = encodeURIComponent(randomString(8));

        const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${client_id}&scope=${scope}&redirect_uri=${redirect_uri}&state=${state}`;

        window.location = url;
    }

    genius() {
        debugger;
        this.geniusApi.search('Kendrick Lamar', (error, results) => {
            console.warn(error, results);
        });
    }

    render() {
        const { isLogged } = this.state;

        if (isLogged) {
            return (<Redirect to='/home' />);
        }

        return (
            <section className="section section-login">
                <div className="columns">
                    <div className="column is-half is-offset-one-quarter">
                        <aside className="card-wrapper">
                            <h1 className="title">Spotify Tips</h1>
                            <h2 className="subtitle">
                                Conheça <strong>novas músicas e artistas</strong> com base nas que você mais gosta.
                            </h2>

                            <button className="button is-dark is-medium"
                                onClick={(evt) => this.requestLogin(evt)}>
                                Entrar com Spotify
                            </button>

                            <button className="button is-dark is-big" onClick={this.genius.bind(this)}>genius</button>
                        </aside>

                    </div>
                </div>
             </section> 
        )
    }
};

// ====

export default Login;
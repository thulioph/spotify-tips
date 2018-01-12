import React from 'react';
import { Redirect } from 'react-router';

// ====

class Logout extends React.Component {
    componentDidMount() {
        localStorage.removeItem('st_access_token');
        localStorage.removeItem('st_auth_params');
        localStorage.removeItem('st_access_token_expiration_time');
    }

    render() {
        return (
            <Redirect to="/login"></Redirect>
        )
    }
};

// ====

export default Logout;
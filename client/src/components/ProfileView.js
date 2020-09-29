import React from 'react';
import MyApi from '../services/MyApi';
import ErrorView from './ErrorView';


class ProfileView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: null,
            statusCode: 0
        };
    }

    async componentDidMount() {
        let userId = this.props.match.params.userId;
        let response = await MyApi.request('GET', `/users/${userId}/profile`);
        console.log('ProfileView response', response);
        let newState = { ...this.state, statusCode: response.status };
        newState.user = (response.status === 200) ? response.data : null;
        this.setState(newState);
    }

    render() {
        if (this.state.statusCode !== 200) {
            return <ErrorView code={this.state.statusCode} message="Unauthorized" />
        }

        if (!this.state.user) {
            return <h2>Loading...</h2>;
        }

        let u = this.state.user;
        return (
            <div className="ProfileView">
                <h2>Profile View</h2>
                ID: {u.id}<br />
                Username: {u.username}<br />
                Email: {u.email}
            </div>
        );
    }

}

export default ProfileView;
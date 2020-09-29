import React from 'react';
import MyApi from '../services/MyApi';
import ErrorView from './ErrorView';


class SecretView extends React.Component {

    constructor(props) {
        super(props);
        this.state = { secret: '' };
    }

    async componentDidMount() {
        if (this.props.token) {
            let response = await MyApi.request('GET', '/secret');
            this.setState({ secret: response.data.message });
        }
    }

    render() {
        if (!this.props.token) {
            return <ErrorView code="401" message="Unauthorized" />
        }

        return (
            <div className="SecretView">
                <h2>Secret View</h2>
                <p>{this.state.secret}</p>
            </div>
        );
    }

}

export default SecretView;
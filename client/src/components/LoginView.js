import React from 'react';


class LoginView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange(event) {
        let { name, value } = event.target;
        this.setState({ [name]: value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    render() {
        return (
            <div className="LoginView row">
                <div className="col-4 offset-4">
                    <h2>Login</h2>
                    
                    {/* Login error message */}
                    {
                        this.props.error && (
                            <div className="alert alert-danger">{this.props.error}</div>
                        )
                    }

                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <div className="form-group">
                            <label>Username
                                <input
                                    type="text"
                                    name="username"
                                    required
                                    className="form-control"
                                    value={this.state.username}
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </label>
                        </div>
    
                        <div className="form-group">
                            <label>Password
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    className="form-control"
                                    value={this.state.password}
                                    onChange={(e) => this.handleChange(e)}
                                />
                            </label>
                        </div>
    
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        );
    }

}

export default LoginView;
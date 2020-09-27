import React, { useState } from 'react';


const INIT_FORM_DATA = {
    username: '',
    password: '',
    email: ''
}

function RegisterView(props) {
    let [formData, setFormData] = useState(INIT_FORM_DATA);

    function handleChange(event) {
        let { name, value } = event.target;
        setFormData({ [name]: value });
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="RegisterView row">
            <div className="col-4 offset-4">
                <h2>Register</h2>
                
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-group">
                        <label>Username
                            <input
                                type="text"
                                name="username"
                                required
                                className="form-control"
                                value={formData.username}
                                onChange={(e) => handleChange(e)}
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
                                value={formData.password}
                                onChange={(e) => handleChange(e)}
                            />
                        </label>
                    </div>

                    <div className="form-group">
                        <label>Email
                            <input
                                type="email"
                                name="email"
                                required
                                className="form-control"
                                value={formData.email}
                                onChange={(e) => handleChange(e)}
                            />
                        </label>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default RegisterView;
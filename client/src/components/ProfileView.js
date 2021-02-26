import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../helpers/Api';


function ProfileView(props) {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    let { userId } = useParams();

    useEffect(() => {
        async function fetchProfile() {
            let response = await Api.request('GET', `/users/${userId}/profile`);
            if (response.ok) {
                setUser(response.data);
                setError('');
            } else {
                setUser(null);
                setError(`Error ${response.status}: ${response.statusText}`);
            }
        }
        fetchProfile();
    }, [userId]);

    if (error) {
        return <h2 style={{ color: 'red' }}>{error}</h2>
    }

    if (!user) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="ProfileView">
            <h1>Profile View</h1>
            ID: {user.id}<br />
            Username: {user.username}<br />
            Email: {user.email}
        </div>
    );
}


export default ProfileView;
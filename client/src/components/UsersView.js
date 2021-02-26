import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import Api from '../helpers/Api';


function UsersView(props) {
    const [users, setUsers] = useState([]);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        async function fetchUsers() {
            let response = await Api.request('GET', '/users');
            if (response.ok) {
                setUsers(response.data);
                setErrorMsg('');
            } else {
                setUsers([]);
                setErrorMsg(`Error ${response.status}: ${response.statusText}`);
            }
        }
        fetchUsers();
    }, []);

    if (errorMsg) {
        return <h2 style={{ color: 'red' }}>{errorMsg}</h2>
    }

    if (!users) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="UsersView">
            <h1>Users</h1>
            <ul>
            {
                users.map(u => <li key={u.id}>{u.username} / {u.email}</li>)
            }
            </ul>
        </div>
    );
}


export default UsersView;
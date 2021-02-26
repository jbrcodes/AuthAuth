import React, { useEffect, useState } from 'react';
import Api from '../helpers/Api';


function SecretView(props) {
    const [memberMsg, setMemberMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        async function fetchMemberMsg() {
            let response = await Api.request('GET', '/secret');
            if (response.ok) {
                setMemberMsg(response.data.message);
                setErrorMsg('');
            } else {
                setMemberMsg('');
                setErrorMsg(`Error ${response.status}: ${response.statusText}`);
            }
        }
        fetchMemberMsg();
    });

    if (errorMsg) {
        return <h2 style={{ color: 'red' }}>{errorMsg}</h2>
    }

    if (!memberMsg) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="SecretView">
            <h1>Members Only</h1>
            <p>{memberMsg}</p>
        </div>
    );
}

export default SecretView;
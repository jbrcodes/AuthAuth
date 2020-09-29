const BASE_URL = 'http://localhost:5000';


class MyApi {

    static async request(method, endpoint, body = null) {
        // Define basic options
        let options = { 
            method: method,
            headers: { 'Content-Type': 'application/json' }
         };

        // Add body (if applicable)
        if (body) {
            options.body = JSON.stringify(body);
        }

        // Add JWT token (if exists)
        if ('token' in localStorage) {
            options.headers['x-access-token'] = localStorage['token'];
        }

        // Do the fetch() and create a "unified" response
        let response;
        try {
            response = await fetch(BASE_URL+endpoint, options);
            if (response.ok) {
                response.data = await response.json();
            } else {
                response.error = `${response.status}: ${response.statusText}`;
            }
        } catch (err) {
            response = {
                ok: false,
                status: 0,
                error: err.message
            }
        }

        return response;
    }

}

export default MyApi;
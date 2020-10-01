// auth-auth helper functions


class Auth {

    static loginUser(token, userId) {
        localStorage.token = token;
        localStorage.userId = userId;
    }
    
    static logoutUser() {
        localStorage.clear();
    }
    
    static getUserId() {
        return ('userId' in localStorage) ? localStorage.userId : '';
    }

}


export default Auth;
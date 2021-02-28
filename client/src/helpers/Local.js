/**
 * All localStorage implementation is here
 **/


class Local {

    static saveUserInfo(token, userId) {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
    }
    
    static removeUserInfo() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }
    
    static getToken() {
        return (localStorage.getItem('token') || '');
    }
    
    static getUserId() {
        return (localStorage.getItem('userId') || '');
    }

}


export default Local;
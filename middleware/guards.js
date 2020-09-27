const jwt = require("jsonwebtoken");
const createError = require('http-errors');
const { SECRET_KEY } = require("../config");


/**
 * Guards are middleware that "protect" routes from unauthorized access.
 **/


/**
 * Make sure the user is logged in
 **/

function ensureUserLoggedIn(req, res, next) {
    let token = req.headers['x-access-token'];
    if (!token) {
        next( createError(401, 'Unauthorized') );
    } else {
        next();
    }
}


/**
 * Make sure user is logged in and is accessing his/her own page.
 * i.e. userId in token === userId in URL param
 **/

function ensureSameUser(req, res, next) {
    let token = req.headers['x-access-token'];

    try {
        // Throws error on invalid/missing token
        let payload = jwt.verify(token, SECRET_KEY);
        if (payload.userId !== Number(req.params.userId)) {
            next( createError(401, 'Unauthorized') );
        } else {
            next();
        }
    } catch (err) {
        next( createError(401, 'Unauthorized') );
    }
}


module.exports = {
    ensureUserLoggedIn,
    ensureSameUser
};
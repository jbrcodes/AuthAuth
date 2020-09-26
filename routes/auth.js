const express = require('express');
const jwt = require("jsonwebtoken");
const router = express.Router();

const User = require('../model/user');
const createError = require('http-errors');
const { SECRET_KEY } = require('../config');



/** 
 * POST /login - login: {username, password} => {token}
 **/

router.post('/login', async (req, res, next) => {
    try {
        let { username, password } = req.body;
        let ok = await User.authenticate(username, password);
        if (ok) {
            let token = jwt.sign({ username }, SECRET_KEY);
            res.send({
                message: 'Login succeeded',
                token: token
            });
        } else {
            next( createError(400, 'Login failed') );
        }
    } catch (err) {
        return next(err);
    }
});



/** POST /register - register user: registers, logs in, and returns token.
 * {username, password} => {token}.
 */

router.post('/register', async (req, res, next) => {
    try {
        let { username, password } = req.body;
        let rc = await User.register(username, password);
        if (rc === 'ok') {
            // let token = jwt.sign({ username }, SECRET_KEY);
            res.send({ message: 'Registration succeeded' });
        } else {
            next( createError(400, 'Registration failed') );
        }
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
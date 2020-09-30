var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { ensureSameUser } = require('../middleware/guards');
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require('../config');
const db = require("../model/helper");


/**
 * Register a user
 **/

router.post('/register', async (req, res, next) => {
    let { username, password, email } = req.body;
    let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    try {
        let sql = `
            INSERT INTO users (username, password, email)
            VALUES ('${username}', '${hashedPassword}', '${email}')
        `;
        await db(sql);
        res.send({ message: 'Registration succeeded' });
    } catch (err) {
        next(err);
    }
});


/**
 * Log in a user
 **/

router.post('/login', async (req, res, next) => {
    let { username, password } = req.body;

    try {
        let results = await db(`SELECT * FROM users WHERE username = '${username}'`);
        if (results.data.length === 0) {
            // Username not found
            res.status(400).send({ error: 'Login failed' });
        } else {
            let row = results.data[0];  // the user's row/record from the DB
            let passwordsEqual = await bcrypt.compare(password, row.password);
            if (passwordsEqual) {
                let payload = { userId: row.id };
                // Create & return token (and user ID, useful for the client)
                let token = jwt.sign(payload, SECRET_KEY);
                res.send({
                    message: 'Login succeeded',
                    token: token,
                    userId: row.id
                });
            } else {
                // Passwords don't match
                res.status(400).send({ error: 'Login failed' });
            }
        }
    } catch (err) {
        next(err);
    }
});


/**
 * Get all users
 **/

router.get('/', async function(req, res, next) {
    let sql = 'SELECT username FROM users ORDER BY username';
    try {
        let results = await db(sql);
        res.send(results.data);
    } catch (err) {
        next(err);
    }
});


/**
 * Get the user's profile page.
 * A user can only see his/her own profile page.
 **/

router.get('/:userId/profile', ensureSameUser, async function(req, res, next) {
    let { userId } = req.params;
    let sql = 'SELECT * FROM users WHERE id = ' + userId;
    try {
        let results = await db(sql);
        let user = results.data[0];
        delete user.password;  // don't return the password
        res.send(user);
    } catch (err) {
        next(err);
    }
});


module.exports = router;
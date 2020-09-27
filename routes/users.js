var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const createError = require('http-errors');
const { ensureSameUser } = require('../middleware/guards');
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require('../config');
const db = require("../model/helper");


/**********************************************************
 * Authorization
 **********************************************************/

router.post('/register', async (req, res, next) => {
    let { username, password, email } = req.body;
    let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    try {
        // Insert user and return the new ID
        let sql = `
            INSERT INTO users (username, password, email)
            VALUES ('${username}', '${hashedPassword}', '${email}');
            SELECT LAST_INSERT_ID();
        `;
        let results = await db(sql);
        let userId = results.data[0].insertId;
        // Return ID
        res.send({
            message: 'Registration succeeded',
            userId: userId
        });
    } catch (err) {
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
    let { username, password } = req.body;

    try {
        let results = await db(`SELECT * FROM users WHERE username = '${username}'`);
        if (results.data.length === 0) {
            next( createError(400, 'Login failed') );
        } else {
            let row = results.data[0];
            if ( await bcrypt.compare(password, row.password) ) {
                let token = jwt.sign({ userId: row.id }, SECRET_KEY);
                // Return the token and some other useful stuff
                res.send({
                    message: 'Login succeeded',
                    token: token,
                    userId: row.id,
                    username: row.username
                });
            } else {
                next( createError(400, 'Login failed') );
            }
        }
    } catch (err) {
        next(err);
    }
});


/**********************************************************
 * Other
 **********************************************************/

/**
 * Get all users
 **/

router.get('/', async function(req, res, next) {
    let sql = 'SELECT * FROM users ORDER BY username';
    try {
        let results = await db(sql);
        // Remove passwords!!
        results.data.forEach((r) => { delete r.password; });
        res.send({ users: results.data });
    } catch (err) {
        next(err);
    }
});


/**
 * Get the user's profile page
 **/

router.get('/:userId/profile', ensureSameUser, function(req, res, next) {
    let { userId } = req.params;
    res.send({ message: 'Here is the profile for user '+userId });
});

module.exports = router;
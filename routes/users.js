var express = require('express');
var router = express.Router();
const { ensureSameUser } = require('../middleware/guards');
const db = require("../model/helper");



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
        delete user.password;  // don't return the (hashed) password
        res.send(user);
    } catch (err) {
        next(err);
    }
});


module.exports = router;
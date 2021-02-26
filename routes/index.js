const express = require('express');
const router = express.Router();
const { ensureUserLoggedIn } = require('../middleware/guards');


/**
 * GET /
 **/

router.get('/', function(req, res, next) {
    res.send({ message: 'Welcome to the AuthAuth homepage!' });
});


/**
 * GET /members-only
 **/

router.get('/secret', ensureUserLoggedIn, function(req, res, next) {
    res.send({ message: 'Here is your secret' });
});


module.exports = router;
const express = require('express');
const router = express.Router();
const { ensureUserLoggedIn } = require('../middleware/guards');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.send({ message: 'Welcome to the Homepage!' });
});


router.get('/secret', ensureUserLoggedIn, function(req, res, next) {
    res.send({ message: 'Here is your secret' });
});


module.exports = router;
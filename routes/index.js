const express = require('express');
const router = express.Router();
const { ensureLoggedIn } = require('../middleware/auth');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send({ message: 'Welcome' });
});

router.get('/secret', ensureLoggedIn, function(req, res, next) {
  res.send({ message: 'Here is your secret' });
});

module.exports = router;
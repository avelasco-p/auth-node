const express = require('express');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.get('/', checkAuth, (req, res, next) => {
    res.send('you did it =)');
});


module.exports = router;

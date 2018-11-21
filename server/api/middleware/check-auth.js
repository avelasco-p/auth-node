const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    console.log('token: ' + token);

    jwt.verify(token, 'privateKey', (err, authData) => {
        if (err) {
            return res.status(401).json({
                message: 'auth failed',
            }); 
        }

        req.userData = authData;
    });

    next();
}

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    // res.status(200).json({
    //     message: 'handling get requests for /login',
    // })

});

router.post('/', (req, res, next) => {
    const userEmail = req.body.email;

    console.log(`user email: ${userEmail}`);
    res.status(200).json({
        user: userEmail,
        message: 'handling post requests for /login',
    })
});


module.exports = router;

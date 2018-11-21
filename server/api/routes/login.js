const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../models/User');

router.get('/', (req, res, next) => {
    res.redirect('../')
});

router.post('/', (req, res, next) => {
    const tmpUser = new User({
        email: req.body.email,
    });


    console.log(`user email: ${tmpUser.email}`);

    User.findOne({ email: tmpUser.email })
        .exec()
        .then( user => {
            console.log('from database: ' + user);

            if (!user) {
                tmpUser.save()
                    .exec()
                    .then(result => {
                        console.log(result);
                    })
                    .catch(err => {
                        console.log('error creating user');
                        res.status(500).send('there was an error creating your user');
                    })
            }

            const token = jwt.sign({
                userId: user._id,
                email: user.email,
            }, 'secretKey', {
                expiresIn: '1h',
            });

            res.status(200).json({
                user: user,
                token: token,
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('there was an error creating your user');
        });
});


module.exports = router;

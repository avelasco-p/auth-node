const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const User = require('../models/User');

router.get('/', (req, res, next) => {
    res.redirect('../')
});

router.post('/', (req, res, next) => {
    const user = new User({
        email: req.body.email,
    });


    console.log(`user email: ${user.email}`);

    User.findOne({ email: user.email })
        .exec()
        .then(doc => {
            console.log('from database: ' + doc);

            if (!doc) {
                user.save()
                    .then(result => {
                        console.log(result);
                    })
                    .catch(err => {
                        console.log('error creating user');
                        res.status(500).send('there was an error creating your user');
                    })
            }

            res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(500).send('there was an error creating your user');
        });
});


module.exports = router;

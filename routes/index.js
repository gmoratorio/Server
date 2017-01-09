'use strict'

const express = require('express');
const router = express.Router();
const knex = require('../db/connection');
const OAuth = require("../db/OAuth");
const auth = require("../passport");
const dotenv = require('dotenv').config();



router.get('/', (req, res) => {
    return knex('user')
        .select()
        .then(data => {
            res.json(data);
        });
});

router.get('/myInfo', (req, res, next) => {
    const user = req.user;
    res.json(user);

});

router.get('/logout', (req, res, next) => {
    res.clearCookie('user');
    req.session = null;
    res.json({
        loggedIn: false
    });

});


router.get('/auth/google', auth.passport.authenticate('google', {
    scope: [
        'profile', 'email'
    ],
    accessType: 'offline',
    approvalPrompt: 'force'
}));

router.get('/auth/google/callback',
    auth.passport.authenticate('google', {
        successRedirect: '/redirectToClient',
        failureRedirect: '/'
    })
);
//auth.ensureAuthenticated
router.get('/redirectToClient', (req, res, next) => {
    // console.log("Session is: ", req.session);
    // console.log("redirecting...");
    OAuth.getUserByGoogleProfileId(req.user.google_id)
        .then((userdata) => {
            //need to send this to the front end
            // req.session.user_id = userdata.id;
            const jsonUser = JSON.stringify(userdata);
            // console.log(jsonUser);
            res.cookie("user", jsonUser, {
                signed: true,
                httpOnly: true,
                secure: process.env.NODE_ENV == "production"
            });
            // console.log("User ID: " + req.user.id);
            res.redirect(`${process.env.MEMBER_REDIRECT}`);
            // res.json({user: userdata})
        })
})

module.exports = router;

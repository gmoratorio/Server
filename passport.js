const OAuth = require("./db/OAuth");
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const knex = require('./db/connection');
const dotenv = require('dotenv').config();

passport.serializeUser((userObject, done) => {
    // console.log("serializing user");
    // const obj = {
    //     token: userObject.token,
    //     id: userObject.google_id
    // }
    done(null, userObject);
});

passport.deserializeUser((obj, done) => {
    // console.log("DEserializing user");
    // OAuth.getUserByGoogleProfileId(obj.id)
    //     .then((user => {
    //         done(null, obj);
    //     }))
    done(null, obj);

});

passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        pressReqToCallback: true
    },
    function(request, accessToken, refreshToken, profile, done) {
      // console.log(profile);
      // console.log("Profile: " + profile.id);
        OAuth.getUserByGoogleProfileId(profile.id)
            .then((user) => {
                if (user) {
                    console.log("Here we didn't add a user, since it already exists");
                    return done(null, user);
                } else {
                    console.log("New user added")
                    const nameArray = profile.displayName.split(" ");
                    const firstName = nameArray[0];
                    const lastName = nameArray[nameArray.length - 1];
                    OAuth.getAllUsers().insert({
                            google_id: profile.id,
                            token: accessToken,
                            first_name: firstName,
                            last_name: lastName,
                            email: profile.emails[0].value,
                            photo: profile.photos[0].value
                        }, "*")
                        .then((users) => {
                            return done(null, users[0]); //passing all the user data back instead of something specific
                            // return done(null, {token, users[0]});

                        })
                }
            })
    }
));

module.exports = {
    passport: passport,

    ensureAuthenticated: function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            console.log("user is authenticated");
            next();
        } else {
            console.log("ensuring authentication didn't work");
            res.redirect('/');

        }
    }

}

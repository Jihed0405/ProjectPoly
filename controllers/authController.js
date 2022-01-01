var exports = module.exports = {};

let config = require('../config/database'),
    jwt = require('jsonwebtoken');

// Call User model
let User = require("../models/user");

exports.signup = function(req, res) {
    if (!req.body.username || !req.body.password || !req.body.email) {
        res.json({success: false, msg: 'Please pass username , email and password.'});
    } else {
        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
        });
        // save the user
        newUser.save(function(err) {
            if (err) {
                console.log(err);
                return res.json({success: false, msg: 'Username or email already exists.'});
            }
            res.json({success: true, msg: 'Successful created new user.'});
        });
    }
};

exports.signin = function(req, res) {

    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({success: false, msg: 'Authentication failed. Email not found.'});
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    let token = jwt.sign(user.toJSON(), config.secret);
                    // return the information including token as JSON
                    res.json({success: true, token: 'JWT ' + token});
                } else {
                    res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
                }
            });
        }
    });
};
exports.signout= function(req, res) {
    req.logout();
    res.json({success: true, msg: 'Sign out successfully.'});
  };
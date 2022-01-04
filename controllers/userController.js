var exports = module.exports = {};

let config = require('../config/database'),
    jwt = require('jsonwebtoken');

// Call User model
let User = require("../models/user");

exports.editUser = function(req, res) {
    if ( !req.body.email ) {
        res.json({success: false, msg: 'Please pass email.'});
    } else {
        var userId = req.body.userId;

    
        let updateUser = {
            id:userId,
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            tel: req.body.tel,
            address:req.body.address,
            job:req.body.job,
            bio:req.body.bio
        };
       
        User.findByIdAndUpdate({_id:userId},updateUser,function(err) {
            if (err) {
                return res.json({success: false, msg: 'Update user is failed.'});
            }
            res.json({success: true, msg: 'user Successfully updated .'});
        });
    }
};
exports.getUserById = function(req, res) {
    if ( !req.body.userId ) {
        res.json({success: false, msg: 'Please pass id.'});
    } else {
        var userId = req.body.userId;

        User.findById(userId,function(err,user) {
            if (err) {
                return res.json({success: false, msg: 'user not found.'});
            }
            res.json(user);
        });
    }
};
exports.getallusers = function(req, res) {
    

        User.find({},function(err,user) {
           
            res.json(user);
        });
    };

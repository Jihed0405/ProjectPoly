var exports = module.exports = {};

// Call User model
let Cart = require("../models/cart");

exports.newCart = function(req, res) {
    let token = getToken(req.headers);
    if (token) {
        console.log(req.body);
        let newCart = new Cart({
            user: req.body.user,
            book: req.body.book,
            total:req.body.total,
            
        });

        newCart.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Save Cart failed.'});
            }
            res.json({success: true, msg: 'Successful created new Cart.'});
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};

exports.cartsList = function(req, res) {
    let token = getToken(req.headers);
    if (token) {
        Cart.find(function (err, cart) {
            if (err) return next(err);
            res.json(carts);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};
exports.getcartbyuserid = function(req, res) {
    let token = getToken(req.headers);
    if (token) {
        if ( !req.body.userId ) {
            res.json({success: false, msg: 'Please pass user id.'});
        } else {
            var user = req.body.userId;
    
            Cart.find({user:user},function(err,cart) {
                if (err) {
                    return res.json({success: false, msg: 'cart not found.'});
                }
                res.json(cart);
            });
        }
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};


getToken = function (headers) {
    if (headers && headers.authorization) {
        let parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

exports.Deletecarts = function(req, res) {
    let token = getToken(req.headers);
    if (token) {
        Cart.deleteMany (function (err, carts) {
            if (err) return next(err);
            res.json({success: true, msg: 'Successful deleted all carts.'});
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
    
    
};
exports.DeleteCartbyid = function(req, res) {
    let token = getToken(req.headers);
    if (token) {
        Cart.deleteOne ({ isbn: 'B09N3GPL9C' },function (err, carts) {
            if (err) return next(err);
            res.json({success: true, msg: 'Successful deleted the cart.'});
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
    
    
};
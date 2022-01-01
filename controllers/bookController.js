var exports = module.exports = {};

// Call User model
let Book = require("../models/book");

exports.newBook = function(req, res) {
    let token = getToken(req.headers);
    if (token) {
        console.log(req.body);
        let newBook = new Book({
            isbn: req.body.isbn,
            title: req.body.title,
            type:req.body.type,
            author: req.body.author,
            publisher: req.body.publisher,
            description:req.body.description,
            image:req.body.image,
            price:req.body.price
        });

        newBook.save(function(err) {
            if (err) {
                return res.json({success: false, msg: 'Save book failed.'});
            }
            res.json({success: true, msg: 'Successful created new book.'});
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};

exports.booksList = function(req, res) {
    let token = getToken(req.headers);
    if (token) {
        Book.find(function (err, books) {
            if (err) return next(err);
            res.json(books);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};
exports.getbookbyid = function(req, res) {
    let token = getToken(req.headers);
    if (token) {
        if ( !req.body.bookId ) {
            res.json({success: false, msg: 'Please pass book id.'});
        } else {
            var bookId = req.body.bookId;
    
            Book.findById(bookId,function(err,book) {
                if (err) {
                    return res.json({success: false, msg: 'book not found.'});
                }
                res.json(book);
            });
        }
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
};
exports.getcategories = function(req, res) {
    let token = getToken(req.headers);
    if (token) { Book.find(function(err,book) {
                if (err) {
                    return res.json({success: false, msg: 'no book categories found.'});
                }

                let allcategories  = book.map((book) => book.type );
                let uniqcategories = allcategories.filter(function(elem, pos) {
                    return allcategories.indexOf(elem) == pos;
                });
                return res.json(uniqcategories);
            });
    
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

exports.Deletebooks = function(req, res) {
    let token = getToken(req.headers);
    if (token) {
        Book.deleteMany (function (err, books) {
            if (err) return next(err);
            res.json({success: true, msg: 'Successful deleted all books.'});
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
    
    
};
exports.Deletebookbyid = function(req, res) {
    let token = getToken(req.headers);
    if (token) {
        Book.deleteOne ({ isbn: 'B09N3GPL9C' },function (err, books) {
            if (err) return next(err);
            res.json({success: true, msg: 'Successful deleted the book.'});
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
    
    
};
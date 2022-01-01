let express = require('express'),
    router = express.Router();

let cartController = require('../controllers/cartController.js');

/**
 * (POST Method)
 * Create a new book
 */
router.post('/cart', cartController.newCart);


/**
 * (GET Method)
 * Display books list
 */
router.get('/cart', cartController.cartsList);
router.post('/cart/id', cartController.getcartbyuserid);
router.delete('/cart', cartController.Deletecarts);
router.delete('/cartid',cartController.DeleteCartbyid);
module.exports = router;
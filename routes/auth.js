let express = require('express'),
    router = express.Router();

let authenticationController = require('../controllers/authController.js');
let userController=require('../controllers/userController.js');
/**
 * (POST Method)
 */
// SignUp
router.post('/signup', authenticationController.signup);
router.post('/edituser',userController.editUser);
router.post('/getid',userController.getUserById);
router.post('/getall',userController.getallusers);
//SignIn
router.post('/signin', authenticationController.signin);
router.get('/signout',authenticationController.signout);

module.exports = router;
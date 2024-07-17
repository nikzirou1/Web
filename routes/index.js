var express = require('express');
var router = express.Router();

const AuthController = require('../controllers/authController');
const langController = require('../controllers/langController');
router.get('/changeLang/:lang', langController.changeLang);
router.post('/login', AuthController.login) ;
router.get('/login', AuthController.showLoginPage) ;

router.get('/logout', AuthController.logout) ;

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log("Cookies: ", req.cookies, req.signedCookies);
    res.render('index', { title: 'Express',navLoc:"main" });
});

module.exports = router;
  
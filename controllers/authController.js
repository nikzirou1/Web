const OwnerRepository = require('../repository/sequelize/OwnerRepository');
var authUtils = require('../utils/authUtils')

exports.showLoginPage = (req, res, next) => {
    res.render("login", {
        loggedUser: req.session.loggedUser,
        navLoc: "login"
    });
}

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    OwnerRepository.findByEmail(email)
        .then(owners => {
            let own = owners[0];
            if(!own) {
                res.render('login', {
                    navLoc: 'login',
                    loginError: "Invalid email address or password"
                })
            } else if(authUtils.comparePasswords(password, own.password) === true) {
                req.session.loggedUser = own;
                res.redirect('/');
            } else {
                res.render('login', {
                    navLoc: 'login',
                    loginError: "Invalid email address or password"
                })
            }
        })
        .catch(err => {
            console.log(err);
        });

}

exports.logout = (req, res, next) => {
    req.session.loggedUser = undefined;
    res.redirect('/login');
}
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync (8);

exports.hashPassword = (passPlain) => {
const passHashed = bcrypt.hashSync(passPlain, salt);

return passHashed;
}

exports.comparePasswords = (passPlain, passHash) => {
const res = bcrypt.compareSync(passPlain, passHash); 

return res;
}

exports.permitAuthenticatedUser = (req, res, next) => {
    const loggedUser = req.session.loggedUser;
    if (loggedUser) {
        next ();
    } else {
        // res.sendStatus(403);
        return res.send("403 Unauthorized");
    }
}
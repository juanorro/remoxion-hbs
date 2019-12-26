const createError = require('http-errors');
const mongoose = require('mongoose');

const Company = require('../models/companies.model');

module.exports.login = (req, res, next) => {
    res.render('auth/login');
};

module.exports.doLogin = (req, res, next) => {
    function renderWithErrors(errors) {
        res.render('auth/login', {
            companies: req.body, errors: errors
        });
    }

    const { compemail, password } = req.body;

    Company.findOne({ compemail: email })
        .then(
            company => {
                if(!company) {
                    renderWithErrors({ email: 'El email o la contraseña no es correcta' });
                } else {
                    return Company.checkPassword(password)
                        .then(
                            match => {
                                if(!match) {
                                    renderWithErrors({ password: 'El email o la contraseña no es correcta' });
                                } else {
                                    req.session.company = company
                                    res.redirect('/company');
                                }
                            }
                        )
                }
            }
        )
};

module.exports.doLogout = (req, res, next) => {
    req.session.destroy((err) => {
        res.redirect("/login");
    })
}
const createError = require('http-errors');
const mongoose = require('mongoose');
const mailer = require('../config/mailer.config');

const Company = require('../models/companies.model');

module.exports.signUp = (req, res, next) => {
    res.render('auth/signup', { company: new Company() });
};

module.exports.doSignUp = (req, res, next) => {
    const company = new Company({
        compname: req.body.compname,
        comername: req.body.comername,
        contactname: req.body.contactname, 
        compemail: req.body.compemail, 
        password: req.body.password,
        vat: req.body.vat,
        address: req.body.address, 
        iconimg: req.file ? req.file.url: undefined, 
        description: req.body.description,
        website: req.body.website
    })

    company.save()
        .then((company) => {
            mailer.sendValidateEmail(user)
            res.redirect('/login')
        })
        .catch(error => {
            if(error instanceof mongoose.Error.ValidatorError) {
                res.render('../views/auth/signup.hbs', { company, error: error.errors})
            } else if (error.code === 11000) {
                res.render('auth/signup', {
                    user: {
                        ...user, 
                        password: null
                    }, 
                    genericError: 'User exists'
                })
            } else {
                next(error);
            };
        });
};

module.exports.validate = (req, res, next) => {
    Company.findOne({ validateToken: req.params.token })
        .then(company => {
            if(company) {
                company.validate = true //meter esto en el modelo
                company.save()
                    .then(() => {
                    res.redirect('/login')
                    })
                    .catch(next)
            } else {
                res.redirect('/')
            }
        })
        .catch(next)
}

module.exports.login = (_, res) => {
    res.render('auth/login')
}

module.exports.doLogin = (req, res, next) => {
    const { email, password } = req.body

    if(!email || !password) {
        return res.render('auth/login', { company: req.body })
    }

    User.findOne({ compemail: email, validate: true })
        .then(company => {
            if(!compnay) {
                res.render('auth/login', {
                    company: req.body, 
                    error: { password: 'Usuario o contraseña inválido' }
                })
            } else {
                return company.checkPassword(password)
                    .then(match => {
                        if(!match) {
                            res.render('auth/login', {
                                company: req.body,
                                error: { password: 'Usuario o contraseña inválido'}
                            })
                        } else {
                            req.session.company = company; 
                            req.session.genericSuccess = '¡Bienvenido!'
                            res.redirect('/company'); 
                        }
                    })
            }
        })
        .catch(error => {
            if(error instanceof mongoose.Error.ValidationError) {
                res.render('auth/login', {
                    company: req.body, 
                    error: error.error
                })
            } else {
                next(error);
            }
        });
}

module.exports.logout = (req, res) => {
    req.session.destroy();
    res.rendirect('/login')
}
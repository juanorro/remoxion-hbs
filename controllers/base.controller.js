const createError = require('http-errors');
const mongoose = require('mongoose');
const Jobs = require('../models/jobs.model');


module.exports.base = (req, res, next) => {
    Jobs.find()
    .then(
        jobs => {
            res.render('index', {
                 jobs, 
                 title: 'Welcome to Remoxion' 
                })
        }
    ).catch(
        error => next(error)
    );
};


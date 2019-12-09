const createError = require('http-errors');
const mongoose = require('mongoose');
const Jobs = require('../models/jobs.model');

module.exports.listJobs = (req, res, next) => {
    Jobs.find()
    .then(
        jobs => {
            res.send(jobs)
            // res.render('/', { jobs })
        }
    ).catch(
        error => next(error)
    );
};

module.exports.newJob = (req, res, next) => {
    res.render('formjob', {
        job: new Jobs()
    });
}

module.exports.doNewJob = (req, res, next) => {
    console.info('body request => ', req.body)
    const job = new Jobs(req.body)

    job.save()
        .then(() => res.redirect('/'))
        .catch(error => next(error));
};

module.exports.detailsJob = (req, res, next) => {
    const id = req.params.id; 

    if(!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        Jobs.findById(id)
            .then(
                job => {
                    res.render('job', { job })
                }
            ).catch(
                error => next(error)
            );
    }
};

module.exports.edit = (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        Jobs.findById(id)
            .then(
                job => {
                    res.render('formjob', { job })
                }
            ).catch(
                error => next(error)
            );
    }
}

module.exports.doEdit = (req, res, next) => {
    const id = req.params.id;

    if (!moongose.Type.ObjectId.isValid(id)) {
        next(createError(404));
    } else {
        Jobs.findByIdAndUpdate(id, req.body, {new: true })
            .then(job => {
                console.log(job)
                res.redirect('/job/:id')
            }) .catch(
                error => next(error)
            );
    }
}
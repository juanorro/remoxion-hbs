const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');
const jobsController = require('../controllers/jobs.controller')

router.get('/', controller.base);

//Jobs controller
router.get('/', jobsController.listJobs)
router.get('/postjob', jobsController.newJob);
router.post('/postjob', jobsController.doNewJob);
router.get('/job/:id', jobsController.detailsJob);
router.get('/job/:id/edit', jobsController.edit);
router.post('/job/:id/edit', jobsController.doEdit);

module.exports = router;
const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');
const jobsController = require('../controllers/jobs.controller')
const authController = require('../controllers/auth.controller');
const companyController = require('../controllers/company.controller');
const secure = require('../middlewares/secure.mid')

router.get('/', controller.base);

//signup
router.get('/signup', companyController.signUp);
router.post('/signup', companyController.doSignUp);
router.get('/users/:token/validate', companyController.validate)

//auth
router.get('/login', authController.login);
router.post('/login', authController.doLogin);
router.get('/logout', secure.isAuthenticated, authController.doLogout);

//Jobs controller
router.get('/', jobsController.listJobs)
router.get('/postjob', jobsController.newJob);
router.post('/postjob', jobsController.doNewJob);
router.get('/job/:id', jobsController.detailsJob);
router.get('/job/:id/edit', jobsController.edit);
router.post('/job/:id/edit', jobsController.doEdit);
router.post('/job/:id/delete', jobsController.delete);

module.exports = router;
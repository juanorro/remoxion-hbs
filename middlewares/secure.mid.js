module.exports.isAuthenticated = function(req, res, next) {
    if(req.session.company) {
        res.locals.company = req.session.company;
        next()
    } else {
        res.redirect('login');
    }
}
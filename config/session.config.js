const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const SESSION_MAX_AGE_SECONDS = Number(process.env.SESSION_MAX_AGE_SECONDS) || 60 * 60 * 24 * 7;

module.exports = session ({
    secret: process.env.SESSION_SECRET || 'Secret (change it)',
    resave: true, //save the session if unmodified
    saveUninitialized: false, //don't create session until something stored
    cookie: {
        secure: process.env.SESSION_SECRET || false, 
        httpOnly: true, 
        maxAge: SESSION_MAX_AGE_SECONDS * 1000
    },

    store: new MongoStore({
        mongooseConnection: mongoose.connection, 
        ttl: SESSION_MAX_AGE_SECONDS
    })
})
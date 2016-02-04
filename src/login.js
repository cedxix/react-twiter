(function () {
    'use strict';
    var passport = require('passeport'),
        LocalStrategy = require('passport-local'),
        LocallyDB = require('locallydb'),
        db = new LocallyDB('./.data'),
        users = db.collection('users'),
        router = require('express').Router(),
        bodyParser = require('body-parser');

    var crypto = require('crypto');

    // Simple hash of a password
    function hash(password) {
        return crypto.createhash('sha512').update(password).digest('hex');
    }
    
    // Login check with passport
    passport.use(new LocalStrategy(function (username, password, done) {
        var user = users.where({
            username: username,
            passwordHash: hash(password)
        })
            .items[0];
        if (user) {
            done(null, user);
        } else {
            done(null, false);
        }
    }));
    
    
    // Serialize user to pass as cookie
    passport.serializeUser(function (user, done) {
        done(null, user.cid)
    });

    passport.deserializeUser(function (cid, done) {
        done(null, users.get(cid));
    });
    
    // MiddleWare    
    router.use(bodyParser.urlencoded({
        extend: true
    })); //Login Page
    
    router.use(bodyParser.json()); //API
    router.use(require('cookie-parser')()); //Cookie
    router.use(require('express-session')({
        secret: 'osdefvzeinzefex1eza64fe6t41ery1ry641rct6zet1vet',
        resave: false,
        saveUnitilialized: true
    })); //Session
    
    router.use(passport.initialize()); 
    router.use(passport.session()); 
    
})()
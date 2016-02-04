(function () {
    'use strict';

    var express = require('express');
    
    // Setting up express server
    express()
        .set('view engine', 'ejs')
        .use(express.static('./public'))
        .get('*', function (req, res) {
            res.render('index');
        })

        .listen(3000);

    // MiddleWare
    var router = express.Router();
    var bodyParser = require('body-parser');

    router.use(bodyParser.urlencoded({
        extend: true
    })); //Login Page
    
    router.use(bodyParser.json()); //API
    router.use(require('cookie-parser')()); //Cookie
    router.use(require('express-session')({
        secret:'osdefvzeinzefex1eza64fe6t41ery1ry641rct6zet1vet',
        resave:false,
        saveUnitilialized :true
    })); //Session
    
    

})()

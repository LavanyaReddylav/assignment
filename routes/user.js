'use strict';

var express = require('express');
var router = express.Router();
var passport = require('passport');

var User = require('../models/user.js');

router.route('/personal')
.get(function(req, res, next){
    var id = req.query._id;
    
    User.findOne({_id: id})
    .exec(function(err, user){
        if(err)
            next(err);
        res.status(200).json(user);
    });
});

router.route('/new')
.post(function(req, res, next) {
    User.create(req.body, function(err, user){
        if(err)
            return next(err);
        return res.status(200).json(user);
    });
});

router.route('/login')
.post(function(req, res, next) {
    var body = req.body;
    console.log(body);
    User.findOne({ username: body.username, password: body.password }, function(err, user) {      
        if(err)
            return next(err);
console.log(user);
            
		if(user)
			return res.status(200).json({ "message": 'Success' });              
		else
			return res.status(501).json({ message: 'Incorrect Email-ID or Password !' });
    
    });
});

module.exports = router;

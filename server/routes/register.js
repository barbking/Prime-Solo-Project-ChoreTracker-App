var express = require('express');
var router = express.Router();
var passport = require('passport');
var users = require('../models/user.model');
var path = require('path');

// Handles request for HTML file
router.get('/', function(req, res, next) {
    res.sendFile(path.resolve(__dirname, '../public/views/register.html'));
});

// Handles POST request with child user data
router.post('/', function(req, res, next) {
    users.create(req.body, function(err, post) {
         if(err) {
           sendStatus(500);
         } 
    });
});

module.exports = router;

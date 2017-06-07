var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var user = require('../models/user.model.js');

// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in');
    res.send(req.user);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});

//delete user from db
router.delete( '/:id', function(req,res){
    console.log("in delete user request", req.params.id);
    user.remove({_id:req.params.id}, function(err){
      if (err) {
        console.log('Error removing user from database', err);
        res.sendStatus(500);
      } else {
        console.log('DB success');
        res.sendStatus(200);
      }
  });
}); //end get


module.exports = router;

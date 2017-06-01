//requires
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var bodyParser = require( 'body-parser' );
var task = require('../models/task.model.js');


//get tasks from database
router.get( '/', function( req, res ){
    console.log( 'tasks router get call' );
    tasks.find().then(function (data){
    console.log('in tasks route get data:',data);
    res.send( data);
  });
}); //end get

//save tasks to database
router.post('/', function (req,res){
  console.log('in post to tasks:', req.body);
    // send back user object from database
    var newTask;
    newTask = new task(req.body);
    console.log('new task:', newTask);
    //save new task in database
    newTask.save( function ( err, response ){
      if (err) {
        console.log('DB error:',err);
        res.sendStatus( 500 );
      } else {
        console.log('DB success:',response);
        res.sendStatus( 201 );
      }
    });
  });





module.exports = router;

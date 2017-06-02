//requires
var express = require('express');
var router = express.Router();
var passport = require('passport');
var path = require('path');
var bodyParser = require( 'body-parser' );
var task = require('../models/task.model.js');


// get tasks for specific user in database
router.get( '/:username', function( req, res ){
    console.log( 'in tasks username router get call' );
    task.find({username:req.params.username}).then(function (data){
    console.log('in tasks username route get data:',data);
    res.send( data);
  });
}); //end get

//get tasks from database
router.get( '/', function( req, res ){
    console.log( 'tasks router get call' );
    task.find().then(function (data){
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

//delete task using the task db id
  router.delete( '/:id', function( req, res ){
      console.log("in delete task request", req.params.id);
      task.remove({_id:req.params.id}).then(function(){
        res.sendStatus(200);
    });
  }); //end get


module.exports = router;

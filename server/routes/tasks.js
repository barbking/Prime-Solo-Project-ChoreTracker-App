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
  router.delete( '/:id', function(req,res){
      console.log("in delete task request", req.params.id);
      // task.remove({_id:req.params.id}).then(function(){
      //   res.sendStatus(200);
      task.remove({_id:req.params.id}, function(err){
        if (err) {
          console.log('Error removing task from database', err);
          res.sendStatus(500);
        } else {
          console.log('DB success');
          res.sendStatus(200);
        }
    });
  }); //end get


  //update checkbox value in db
  router.post('/update', function (req,res){
    console.log('in update post tasks:', req.body);
    var count = req.body.checkboxcount;
    var sun = req.body.suncheckbox;
    var mon = req.body.moncheckbox;
    var tues = req.body.tuescheckbox;
    var wed = req.body.wedcheckbox;
    var thur = req.body.thurcheckbox;
    var fri = req.body.fricheckbox;
    var sat = req.body.satcheckbox;
    // var updateTask = req.body;
      // task.update(updateTask).then(function ( err, response ){
    task.update({_id:req.body._id},{ checkboxcount : count,
      satcheckbox : sat,
      fricheckbox : fri,
      thurcheckbox : thur,
      wedcheckbox : wed,
      tuescheckbox : tues,
      moncheckbox : mon,
      suncheckbox : sun
    }, function(err){
      if (err) {
        console.log('Error removing task from database', err);
        res.sendStatus(500);
      } else {
        console.log('DB success');
        res.sendStatus(200);
      }
    });
    // }).then(function ( err, response ){
    // // task.update({_id:req.body._id},updateTask).then(function ( err, response ){
    //   if (err) {
    //     console.log('DB error:',err);
    //     res.sendStatus( 500 );
    //   } else {
    //     console.log('DB success:',response);
    //     res.sendStatus( 201 );
    //   }
    // });
  });


module.exports = router;

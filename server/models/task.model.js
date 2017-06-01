var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

// mongoose Schema
var taskSchema = {
  username: {type: String, required: true},
  description: {type: String, required: true},
  frequency: {type: Number, required: true}
};


module.exports = mongoose.model('tasks', taskSchema);

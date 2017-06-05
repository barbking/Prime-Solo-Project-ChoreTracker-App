var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

// mongoose Schema
var bankSchema = {
  username: {type: String, required: true},
  transaction: {type: String, required: true},
  amount: {type: Number, required: true},
  // balance: {type: Number, required: true},
  date: {type: Date, required: true}
};


module.exports = mongoose.model('banks', taskSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CartSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  book: {
    type : Array , 
    required: true,
    default : []
  },
  total: {
    type: Number,
    required: true
  },
 
});

module.exports = mongoose.model('Cart', CartSchema);

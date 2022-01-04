var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
  isbn: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  publisher: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },image: {
    type: String,
    required: true
  },
  price: {
    type: String,
    default:""
  },
});

module.exports = mongoose.model('Book', BookSchema);

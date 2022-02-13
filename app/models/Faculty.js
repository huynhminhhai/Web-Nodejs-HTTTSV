const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Faculty = new Schema({
    faculty: { type: String},
  });


module.exports = mongoose.model('Faculty', Faculty)
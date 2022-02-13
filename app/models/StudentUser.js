const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Student = new Schema({
    email : { type: String},
    id : { type: String},
    fullname: {type: String},
    class: {type: String},
    faculty: {type: String},
    img: {type: String},
  }, {
      timestamps: true
  });


module.exports = mongoose.model('Student', Student)
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Information = new Schema({
    fullname: { type: String},
    class: {type: String},
    faculty: {type: String},
    img: {type: String}
  }, {
      timestamps: true
  });


module.exports = mongoose.model('Information', Information)
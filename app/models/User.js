const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String},
    password: { type: String},
    fullname: { type: String},
    position: { type: Array},
    img: { type: String},
  }, {
      timestamps: true
  });


module.exports = mongoose.model('User', User)
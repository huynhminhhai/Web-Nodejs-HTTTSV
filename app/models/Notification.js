const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Notification = new Schema({
    title: { type: String},
    text: {type: String},
    faculty: {type: String},
    idUser: {type: String}
  }, {
      timestamps: true
  });


module.exports = mongoose.model('Notification', Notification)
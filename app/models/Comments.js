const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Comment = new Schema({
    text: { type: String},
    idC: { type: String},
    idPost: { type: String},
    cmtMan: {type: Array},
  }, {
      timestamps: true
  });


module.exports = mongoose.model('Comment', Comment)
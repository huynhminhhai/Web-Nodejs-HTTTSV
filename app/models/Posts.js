const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Post = new Schema({
    text: { type: String},
    img: { type: Array},
    urlVideo: { type: String},
    idP: { type: String},
    postMan:{type: Array}
  }, {
      timestamps: true
  });


module.exports = mongoose.model('Post', Post)
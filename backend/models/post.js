const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  vote: { type: Number, default: 0 }
});

module.exports = mongoose.model('Post', postSchema);

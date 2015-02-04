var mongoose = require('mongoose');

var Emoji = new mongoose.Schema({
  emojiUrl: String,
  emojiName: {type: String, unique: true}
});

module.exports = mongoose.model('Emojis', Emoji);
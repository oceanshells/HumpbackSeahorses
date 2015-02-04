var Emoji = require('../../db/models/Emoji.js');
var config = require('../config');

module.exports = {
  getAll: function(req, res, next){
    Emoji.find({}, function(err, emojis){
      err ? next(err) : res.json(emojis);
    });
  },
  createEmoji: function(req, res){
    var emojiData = {emojiUrl: req.body.emojiUrl, emojiName: req.body.emojiName};
    Emoji.create(emojiData, function(err){
      if(err){
        res.status(500).json({errMessage: 'Internal Server Error when creating Emoji resource.'});
      } else {
        res.status(200).send();
      }
    });
  },
  checkCreator: function(req, res, next){
    var apiAdminSecret = req.headers['x-api-admin-token'];
    if(apiAdminSecret === config.apiAdminSecret){
      next();
    } else {
      res.status(403).json({errMessage: 'You are not authorized to create Emojis.'});
    }
  }
};

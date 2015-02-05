var Emoji = require('../../db/models/Emoji.js');
var fs = require('fs');
var path = require('path');
var config = require('../config');
var emojisDir = path.resolve('./public/client/images/emojis');

module.exports = {
  getAll: function(req, res, next){
    Emoji.find({}, function(err, emojis){
      err ? next(err) : res.json(emojis);
    });
  },
  getAllFilenames: function(req, res ,next){
    fs.readdir(emojisDir, function(err, fileNames){
      if (!err) {
        res.status(200).json(fileNames);
      } else {
        res.status(500).json({errMessage: 'Internal Server Error when getting Emoji filenames.'});
      }
    });
  },
  createEmoji: function(req, res){
    var emojiData = {emojiUrl: req.body.emojiUrl, emojiName: req.body.emojiName};
    Emoji.create(emojiData, function(err){
      if (!err) {
        res.status(200).send();
      } else {
        res.status(500).json({errMessage: 'Internal Server Error when creating Emoji resource.'});
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

var request = require('request');
var fs = require('fs');
var path = require('path');
var imgDir = '../../../../public/client/img/emojis/emoji_';
var config = require('../../config');
// REPLACE WITH config.productionUrl to seed production DB
var domainToSeed = config.devUrl;
var getEmojiOptions = {
  method: 'GET',
  uri: domainToSeed + 'api/emojis/',
  headers: {'X-API-Admin-Token': config.apiAdminSecret},
  json: true
};

var worker = {
  getEmojis: function(cb){
    request.get(getEmojiOptions, function(err, res, body){
      if(res.statusCode !== 200){
        console.log("Error hitting internal API for emojis. Try again later.");
        return;
      }
      cb(body);
    });
  },
  traverseEmojis: function(emojis, cb){
    emojis.forEach(cb);
  },
  getEmojiImg: function(emoji, cb){
    var emojiFile = path.resolve(__dirname + imgDir + emoji.emojiName + '.png');
    request.get({url: emoji.emojiUrl, encoding: 'binary'}, function(err, res, body){
      cb(emojiFile, body);
    });
  },
  saveEmojiImg: function(emojiFile, body){
    fs.writeFile(emojiFile, body, 'binary', function (error){
      error ? console.log(error) : console.log(emojiFile + " was saved!");
    });
  },
  workBaby: function(){
    worker.getEmojis(function(emojis){
      worker.traverseEmojis(emojis, function(emoji){
        worker.getEmojiImg(emoji, worker.saveEmojiImg);
      });
    });
  }
};

worker.workBaby();
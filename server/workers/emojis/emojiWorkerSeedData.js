var request = require('request');
var config = require('../../config');
// REPLACE WITH config.productionUrl to seed production DB
var domainToSeed = config.devUrl;
var reqOptions = {
  method: 'GET',
  uri: 'https://api.github.com/emojis',
  headers: {'User-Agent': 'Mozilla/5.0'}
};
var emojiOptions = {
  method: 'POST',
  uri: domainToSeed + 'api/emojis/',
  headers: {'X-API-Admin-Token': config.apiAdminSecret},
  json: true
};

var worker = {
  getEmojisFromGithub: function(cb){
    request.get(reqOptions, function(err, res, body){
      if(res.statusCode !== 200){
        console.log("Error hitting Github API for emojis. Try again later.");
        return;
      }
      cb(JSON.parse(body));
    });
  },
  seedDbWithEmojiData: function(emojis){
    for(var name in emojis){
      if(!name.length > 0) break;
      if(emojis.hasOwnProperty(name)){
        worker.saveEmoji({emojiUrl: emojis[name], emojiName: name});
      }
    }
  },
  saveEmoji: function(emojiData){
    emojiOptions['body'] = emojiData;
    request.post(emojiOptions);
  }
};

worker.getEmojisFromGithub(worker.seedDbWithEmojiData);

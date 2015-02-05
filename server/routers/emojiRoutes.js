var emojisController = require('../controllers/emojiController');

module.exports = function(app){
  app.route('/')
    .get(emojisController.getAll)
    .post(emojisController.checkCreator, emojisController.createEmoji);
  app.route('/filenames')
    .get(emojisController.getAllFilenames);
};
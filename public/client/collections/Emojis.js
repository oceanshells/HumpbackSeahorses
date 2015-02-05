var Emojis = Backbone.Collection.extend({

  url: '/api/emojis/filenames',

  model: Emoji,

  // We are not using #fetch because the emojis are stored on the server
  // differently than the client Emoji model-schema expects. So, we assemble
  // the emojis manually instead of automatically (with #fetch).
  getFilenames: function(){
    $.ajax({
      url: this.url,
      method: 'GET',
      success: this.createEmojis.bind(this)
    });
  },

  createEmojis: function(filenames){
    _.each(filenames, this.createEmoji.bind(this));
    this.trigger('emojis:created', this);
  },

  createEmoji: function(filename){
    this.add(new Emoji(this.parseEmojiData(filename)));
  },

  parseEmojiData: function(filename){
    var emojiDir = 'client/images/emojis/';
    var emojiFileSrc = emojiDir + filename;
    var emojiParts = filename.split('.');
    var partsLen = emojiParts.length;
    // TODO: refactor this to a RegExp
    var emojiName = emojiParts.slice(0, partsLen - 1)[0].split('').slice(6).join('');
    return {emojiFileUrl: emojiFileSrc, emojiName: emojiName};
  }

});

var EmojiListView = Backbone.View.extend({

  initialize: function(){
    this.collection.on('emojis:created', this.render, this);
    // only fetch collection right before opening keyboard
    if(this.isClosed()) this.collection.getFilenames();
    this.render();
  },

  render: function(){
    // models have been fetched from server
    if(this.collection.models.length){
      this.currentScreenEmojis = this.currentScreenEmojis || [];
      if(!this.currentScreenEmojis.length){
        this.currentScreenEmojis = this.collection.first(35);
      }
      if (this.isClosed()) {
        // close keyboard
      } else {
        // open keyboard
        // remove current emojis
        this.$el.children().remove();
        // add emojis to page
        _.each(this.currentScreenEmojis, function(emoji){
          this.$el.append(new EmojiView({model: emoji}).$el);
        }, this);
      }
    }
    return this;
  },

  toggleKeyboard: function(){
    this.flipKeyboardClasses();
  },

  isClosed: function(){
    return this.$el[0].classList.contains('closed');
  },

  flipKeyboardClasses: function(){
    this.$el.toggleClass('closed');
    this.$el.toggleClass('open');
    $('#nextPageEmojis').toggleClass('closed');
    $('#nextPageEmojis').toggleClass('displayBlock');
  },

  turnPage: function(){
    console.log("next");
    // TODO: finish pagination logic
  },

  insertEmoji: function(emojiName){
    console.log(emojiName);
    // TODO: finish emoji insert logic
  }

});

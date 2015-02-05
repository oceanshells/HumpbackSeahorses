var EmojiListView = Backbone.View.extend({

  initialize: function(){
    this.collection.on('emojis:created', this.render, this);
    this.collection.getFilenames();
    this.render();
  },

  render: function(){
    _.each(this.collection.models, function(emoji){
      this.$el.append(new EmojiView({model: emoji}).$el);
    }, this);
    return this;
  }

});

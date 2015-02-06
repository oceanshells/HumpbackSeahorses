var EmojiView = Backbone.View.extend({

  className: 'emojiView',

  template : _.template(
    '<img class="emojiImg" src="<%- emojiFileUrl %>" />'
  ),

  initialize: function(){
    this.render();
  },

  render: function(){
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }
});

//initialize
var socket = io();

var AppView = Backbone.View.extend({

  events: {
    'click .emojiKeyboardWrapper': 'displayEmojiKeyboard'
  },

  initialize: function(){
    this.messages = new Messages();
    this.submitView = new SubmitView({el: $('.submitView'), collection: this.messages});
    this.messagesView = new MessagesView({el: $('#messagesView'), collection: this.messages});
    this.userDetailsView = new UserDetailsView({el: $('#userDetailsView')});
    this.render();
  },

  render: function(){},

  displayEmojiKeyboard: function(e){
    this.emojiListView = new EmojiListView({el: $('.emojiKeyboard'), collection: new Emojis()});
    // change display of keyboard
    // style keyboard to popup
  }

});


$(function(){
  new AppView({el: $('body')});
});

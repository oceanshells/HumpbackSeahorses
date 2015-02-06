//initialize
var socket = io();

var AppView = Backbone.View.extend({

  events: {
    'click #emojiKeyboardWrapper': 'displayEmojiKeyboard',
    'click #nextPageEmojis': 'nextPage',
    'click .emojiView .emojiImg': 'insertEmoji'
  },

  initialize: function(){
    window.sessionStorage.session = chance.guid();
    this.messages = new Messages();
    this.submitView = new SubmitView({el: $('.submitView'), collection: this.messages});
    this.messagesView = new MessagesView({el: $('#messagesView'), collection: this.messages});
    this.userDetailsView = new UserDetailsView({el: $('#userDetailsView')});
    this.render();
  },

  render: function(){},

  displayEmojiKeyboard: function(e){
    e && e.preventDefault();
    this.emojiListView = new EmojiListView({el: $('#emojiKeyboard'), collection: new Emojis()});
    this.emojiListView.toggleKeyboard();
  },

  nextPage: function(e){
    e && e.preventDefault();
    this.emojiListView.turnPage();
  },

  insertEmoji: function(e){
    this.emojiListView.insertEmoji($(e.target).attr('src'));
  }


});


$(function(){
  new AppView({el: $('body')});
});

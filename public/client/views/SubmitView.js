//handles message function
var SubmitView = Backbone.View.extend({

  events: {
    'submit' : 'handleSubmit',
    'change #lang' : 'changeLanguage',
    'click #roomButton' : 'changeRoom'
  },

  initialize: function(){
    this.currRoom = $("#room").val();
  },

  handleSubmit: function(e){
    e.preventDefault();
    if (this.currRoom === $("#room").val()) {
      this.messageSubmitter();
    } else {
      this.changeRoom(e);
      this.messageSubmitter();
    }
  },

  messageSubmitter: function(){
    var message = {
      text: $('#chatInput').val(),
      lang: $('#lang').val(),
      username: $('#username').val(),
      room: $('#room').val()
    };
    socket.emit('chat message', message);
    $('#chatInput').val('');
  },

  changeLanguage: function(e){
    e.preventDefault();
    console.log('changing language');
    socket.emit('change language', $('#lang').val());
  },

  changeRoom : function(e){
    e.preventDefault();
    this.currRoom = $("#room").val();
    var lang = $('#lang').val();
    socket.emit('join room', {room: this.currRoom, lang: lang});
  }
});

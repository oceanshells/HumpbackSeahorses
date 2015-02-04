//initialize
var socket = io();

$(function(){
  var messages = new Messages();
  new SubmitView({el: $('.submitView'), collection: messages});
  new MessagesView({el: $('#messagesView'), collection: messages});
  new UserDetailsView({el: $('#userDetailsView')});
});
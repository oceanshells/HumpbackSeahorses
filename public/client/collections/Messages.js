var Messages = Backbone.Collection.extend({

  model: Message,

  //instantiate new model
  //add model to collection
  addmsg: function(msg){
    this.add(new Message({
      username: msg.username,
      text: msg.text,
      lang: msg.lang,
      room: msg.room,
      avatar: msg.avatar,
      translations: msg.translations
    }));
  }

});
var MessagesView = Backbone.View.extend({

  initialize : function(){
    var collection = this.collection;
    this.collection.on('add', this.render, this);

    //socket.io listener for emits
    socket.on('chat message', function(msg){
      //adds message to collection
      var userLang = $('#lang').val();
      msg.text = msg.translations[userLang];
      collection.addmsg(msg);
    });

    //storage variable for displayed messages
    this.onscreenMessages = {};
    this.existingUsernames = {};
  },

  render : function () {
    this.collection.forEach(this.renderMessage, this);
  },

  renderMessage : function(message) {
    //message.cid is unique client-only id
    if (!this.onscreenMessages[message.cid]) {
      var messageView = new MessageView ({model : message});
      this.renderUsername(message);
      this.$el.append (messageView.render());
      this.onscreenMessages[message.cid] = true;
      $('#messagesView').scrollTop(2000);
    }
  },

  renderUsername: function(message) {
    if (!this.currentRoom || this.currentRoom === message.attributes.room) {
      if (!this.existingUsernames[message.attributes.username]) {
        this.existingUsernames[message.attributes.username] = true;
        this.currentRoom = message.attributes.room
        var userView = new UserView({model: message});
        $("#currentUsersView").append(userView.render());
      }
    } else {
      $("#userBox").text("Current users in:  " + message.attributes.room);
      this.currentRoom = message.attributes.room;
      this.existingUsernames[message.attributes.username] = true;
      var children = $("#currentUsersView").children();
      for (var i = 0; i < children.length; i++){
        children[i].remove();
      };
      var userView = new UserView({model: message});
      $("#currentUsersView").append(userView.render());
    }
  }

});

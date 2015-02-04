var MessagesView = Backbone.View.extend({

  initialize : function(){
    window.clicksound = createsoundbite('client/sounds/im.wav');
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
    var messageAttributes = message.attributes;
    if (!this.currentRoom || this.currentRoom === messageAttributes.room) {
      if (!this.existingUsernames[messageAttributes.username]) {
        this.existingUsernames[messageAttributes.username] = true;
        this.currentRoom = messageAttributes.room
        var userView = new UserView({model: message});
        $("#currentUsersView").append(userView.render());
      }
    } else {
      $("#userBox").text("Current users in:  " + messageAttributes.room);
      this.currentRoom = messageAttributes.room;
      this.existingUsernames[messageAttributes.username] = true;
      var children = $("#currentUsersView").children();
      for (var i = 0; i < children.length; i++){
        children[i].remove();
      };
      var userView = new UserView({model: message});
      $("#currentUsersView").append(userView.render());
    }
  }

});

var html5_audiotypes={ //define list of audio file extensions and their associated audio types. Add to it if your specified audio file isn't on this list:
  "mp3": "audio/mpeg",
  "mp4": "audio/mp4",
  "ogg": "audio/ogg",
  "wav": "audio/wav"
};

function createsoundbite(sound){
  var html5audio=document.createElement('audio');
  if (html5audio.canPlayType){ //check support for HTML5 audio
    for (var i=0; i<arguments.length; i++) {
      var sourceel=document.createElement('source');
      sourceel.setAttribute('src', arguments[i]);

      if (arguments[i].match(/\.(\w+)$/i)) {
        sourceel.setAttribute('type', html5_audiotypes[RegExp.$1]);
      }

      html5audio.appendChild(sourceel);
    }

    html5audio.load();
    html5audio.playclip = function(){
      html5audio.pause();
      html5audio.currentTime=0;
      html5audio.play();
    };

    return html5audio;
  }
  else{
    return {
      playclip:function(){
        throw new Error("Your browser doesn't support HTML5 audio unfortunately"); 
      }
    };
  }
}

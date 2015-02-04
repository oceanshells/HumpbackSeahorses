//returns rendered template
var MessageView = Backbone.View.extend({
  template : _.template(
    '<div class="message-display">'+
      '<span>'+
        '<img src="client/images/avatars/<%- avatar %>.png">'+ 
        '<strong><%- username %></strong>@<%- room %> - <%- text %>'+
      '</span>'+
    '</div>'
    ),

  initialize: function() {
  },

  render:function(){
    this.$el.html(this.template(this.model.attributes));
    this.playImSound();
    return this.$el;
  },

  playImSound: function() {
    window.clicksound.playclip();
  }
});




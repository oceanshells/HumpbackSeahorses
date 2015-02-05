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

  render:function(){
    this.$el.html(this.template(this.model.attributes));
    var imSnd = new Audio('client/sounds/im.wav');
    imSnd.play();
    return this.$el;
  },
});




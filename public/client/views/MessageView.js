//returns rendered template
var MessageView = Backbone.View.extend({
  template : _.template(
    '<div class="message-display">'+
      '<span>'+
        '<img src="client/css/images/avatars/<%=avatar%>.png">'+ 
        '<strong><%- username %></strong>@<%- room %> - <%- text %>'+
      '</span>'+
    '</div>'
    ),

  render:function(){
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }
});


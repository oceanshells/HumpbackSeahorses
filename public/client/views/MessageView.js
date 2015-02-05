//returns rendered template
var MessageView = Backbone.View.extend({
  className: 'message-display',

  template : _.template(
    '<span>'+
      '<span class="badge lang-badge pull-right"><span class="pull-left fa fa-globe fa-2"></span></span>'+
      '<img src="client/images/avatars/<%- avatar %>.png">'+ 
      '<strong><%- username %></strong>@<%- room %> - <span style="display: none;" class="alt-text"><%- translations[lang] %></span><span class="text"><%- text %></span>'+
    '</span>'
    ),

  events: {
    'click span.badge': 'toggleLanguage'
  },

  render:function(){
    this.$el.html(this.template(this.model.attributes));
    var imSnd = new Audio('client/sounds/im.wav');
    imSnd.play();
    return this.$el;
  },

  toggleLanguage: function(e) {
    this.$el.find('span.text').toggle();
    this.$el.find('span.alt-text').toggle();
  }
});




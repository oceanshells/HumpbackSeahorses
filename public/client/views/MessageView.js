//returns rendered template
var MessageView = Backbone.View.extend({
  className: 'message-display',

  template : _.template(
    '<span>'+
      '<img src="client/images/avatars/<%- avatar %>.png">'+
      '<strong><%- username %></strong>@<%- room %> - <span class="text"><%- text %></span> <div style="display: none;" class="alt-text"><i>Original text:</i><br> <%- translations[lang] %></div> '+
    '</span>'
    ),

  events: {
    'click span.badge': 'toggleLanguage',
    'mouseenter span.text': 'mouseToggleLanguage',
    'mouseout span.text': 'untoggleLanguage'
  },

  render:function(){
    this.$el.html(this.template(this.model.attributes));
    if (this.model.attributes.session !== window.sessionStorage.session) {
      this.$el.prepend('<span class="badge lang-badge pull-right"><span class="pull-left fa fa-globe fa-2"></span></span>');
    }
    var imSnd = new Audio('client/sounds/im.wav');
    imSnd.play();
    return this.$el;
  },

  toggleLanguage: function(e) {
    this.$el.find('div.alt-text').toggle()
      .css("width", +this.$el.find("span.text").css("width").slice(0, -2) + 40);
  },

  mouseToggleLanguage: function(e) {
    if (this.model.attributes.session !== window.sessionStorage.session) {
      var _this = this;
      this.toggle = window.setTimeout(function(){
         _this.$el.find('div.alt-text').toggle()
          .css("width", +_this.$el.find("span.text").css("width").slice(0, -2) + 40);
      }, 600);
    }
  },

  untoggleLanguage: function(e) {
    e && e.preventDefault;
    window.clearTimeout(this.toggle);
    this.$el.find('div.alt-text').css("display", "none");
  }
});




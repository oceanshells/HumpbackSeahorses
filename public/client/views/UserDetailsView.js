var UserDetailsView = Backbone.View.extend({
  template: _.template('Username'+
                       '<input type="text" class="text" id="username" placeholder="username" autocomplete="off"/>'+
                       'Avatar'
                       ),

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template());
    var avatarSelectView = new AvatarSelectView();
    this.$el.append(avatarSelectView.render());
  }

});

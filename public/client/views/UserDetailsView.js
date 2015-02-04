var UserDetailsView = Backbone.View.extend({
  template: _.template('<input type="text" class="text" id="username" placeholder="username" autocomplete="off"/>'),

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template());
    var avatarSelectView = new AvatarSelectView();
    this.$el.append(avatarSelectView.render());
  }

});

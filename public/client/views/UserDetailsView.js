var UserDetailsView = Backbone.View.extend({
  template: _.template('<label for="username">Username</label>'+
                       '<input type="text" class="text" name="username" id="username" placeholder="username" autocomplete="off"/>'+
                       '<br/>'+
                       '<label for="avatar">Avatar</label>'
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

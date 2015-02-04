var avatars = ['A01', 'A02', 'A03', 'A04', 'A05'];

var AvatarSelectView = Backbone.View.extend({
  id: 'avatars',

  template: _.template('<input type="radio" name="" value="" checked>hello<br/>'),

  render: function() {
    debugger
    _.each(avatars, function(av) {
      this.$el.append(this.template(av));
    }, this);
    return this.$el;
  }

});
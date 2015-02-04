var avatars = ['A01', 'A02', 'A03', 'A04', 'A05'];

var AvatarSelectView = Backbone.View.extend({
  id: 'avatars',

  template: _.template('<label class="thumb">'+
                        '<input type="radio" name="avatar" value="">'+
                        '<img src="client/css/images/avatars/A01.png" />'+
                       '</label>'
                       ),

  render: function() {
    _.each(avatars, function(av) {
      this.$el.append(this.template(av));
    }, this);
    return this.$el;
  }

});
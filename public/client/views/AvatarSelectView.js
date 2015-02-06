var avatars = [
  {val: 'A01'}, {val: 'A02'}, {val: 'A03'}, {val: 'A04'}, {val: 'A05'}, {val: 'B01'},
  {val: 'FA01'}, {val: 'FA02'}, {val: 'FA03'}, {val: 'FA04'}, {val: 'FA05'}, {val: 'FC01'},
  {val: 'Bulbasaur'}, {val: 'Charmander'}, {val: 'Pikachu'}, {val: 'Squirtle'}
];

var AvatarSelectView = Backbone.View.extend({
  id: 'avatars',

  template: _.template('<label class="thumb">'+
                        '<input type="radio" name="avatar" value="<%=val%>">'+
                        '<img src="client/images/avatars/<%=val%>.png" />'+
                       '</label>'
                       ),

  render: function() {
    _.each(avatars, function(av) {
      this.$el.append(this.template(av));
    }, this);
    return this.$el;
  }

});

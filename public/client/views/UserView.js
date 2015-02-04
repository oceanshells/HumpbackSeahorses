var UserView = Backbone.View.extend({
  template : _.template(
    '<div class="username-display"> \
      <span> \
        <strong><%- username %></strong>\
      </span> \
    </div>'
  ),

  render:function(){
    this.$el.html(this.template(this.model.attributes));
    return this.$el;
  }
});

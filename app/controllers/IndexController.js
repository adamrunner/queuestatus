App.IndexController = Ember.ObjectController.extend({
  available: function(){
    return this.get('store').filter('agents_activity', function(agent) {
      return agent.get('status_code') == 'available';
    });
  }.property(),
  wrapUp: function(){
    return this.get('store').filter('agents_activity', function(agent) {
      return agent.get('status_code') == 'wrap_up';
    });
  }.property(),
  inCall: function(){
    return this.get('store').filter('agents_activity', function(agent) {
      return agent.get('status_code') == 'in_call';
    });
  }.property(),
  notAvailable: function(){
    return this.get('store').filter('agents_activity', function(agent) {
      return agent.get('status_code') == 'not_available';
    });
  }.property()
});

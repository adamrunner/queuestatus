App.IndexController = Ember.ObjectController.extend({
  needs: 'application',
  valuesArray: Ember.computed.alias('controllers.application.valuesArray'),
  available: function(){
    return this.get('store').filter('agents_activity', function(agent) {
      return agent.get('status_code') == 'available';
    });
  }.property(),
  wrapUp: function(){
    return this.get('store').filter('agents_activity', function(agent) {
      return agent.get('status_code') == 'wrap_up';
    });
  }.property('length'),
  onCall: function(){
    return this.get('store').filter('agents_activity', function(agent) {
      return agent.get('status_code') == 'on_call';
    });
  }.property(),
  notAvailable: function(){
    return this.get('store').filter('agents_activity', function(agent) {
      return agent.get('status_code') == 'not_available';
    });
  }.property()
});

App.IndexController = Ember.ObjectController.extend({
  chartValues: function(){

    var blah = [
      {key:'available', value    : this.get('available')},
      {key:'wrapUp', value       : this.get('wrapUp')},
      {key:'onCall', value       : this.get('onCall')},
      {key:'notAvailable', value : this.get('notAvailable')}
    ]
    this.set('zzz', blah)
    return blah;
  }.property('available', 'wrapUp', 'onCall', 'notAvailable'),
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

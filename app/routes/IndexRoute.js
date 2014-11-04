App.IndexRoute = Ember.Route.extend({
  model: function(){

    var queue = { calls_waiting:0, average_wait_time:0, longest_wait_time:0, id: 1};
    var agents = Ember.$.getJSON('/api/v2/channels/voice/stats/agents_activity.json').then(function(json_object){
            agents = _.each(json_object.agents_activity, function(object, index){
              object.id = index + 1;
            });
          });

    return Ember.RSVP.hash({
      current_queue_activity: this.store.push('current_queue_activity', queue),
      agents_activity: this.store.pushMany('agents_activity', agents)
    });
  },
  setupController: function(controller, model) {
    var route = this;
    controller.set('model', model);
    if (Ember.isNone(this.get('pollster'))){
      this.set('pollster', App.Pollster.create({
        onPoll: function() {
          Ember.$.getJSON('/api/v2/channels/voice/stats/current_queue_activity.json').then(function(json_object){
            var a = json_object.current_queue_activity
            a.id = 1;
            route.store.push('current_queue_activity', a);
          });
          var agents = '';
          Ember.$.getJSON('/api/v2/channels/voice/stats/agents_activity.json').then(function(json_object){
            agents = _.map(json_object.agents_activity, function(object, index){
              if(_.contains(App.AgentIds, object.agent_id)){
                object.id = index + 1;
                return object
              }
            });
            route.store.pushMany('agents_activity', _.compact(agents));
          });
        }
      }));
    }
    this.get('pollster').start();
    this.get('pollster').onPoll();
  },
  deactivate: function() {
    this.get('pollster').stop();
  }
 });

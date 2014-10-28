App.IndexRoute = Ember.Route.extend({
  model: function(){
    var agents = []
    var queue = { calls_waiting:0, average_wait_time:0, longest_wait_time:0, id: 1};

    return Ember.RSVP.hash({
      current_queue_activity: this.store.push('current_queue_activity', queue),
      agents_activity: this.store.pushMany('agents_activity', agents)
    });
    // return Ember.$.getJSON('/currentQueueActivities').then(function(json_object){});
    // var route = this;
    // Ember.$.getJSON('/api/v2/channels/voice/stats/current_queue_activity.json').then(function(json_object){
    //   route.store.push('current_queue_activity',json_object.current_queue_activity);
    // });
    // route.store.pushMany('agents_activity', [{"agent_id":795042943,"name":"Alexis Kind","status":"Not Available","status_code":"not_available","via":"client","available_time":5464,"calls_accepted":32,"calls_denied":1,"calls_missed":0,"average_talk_time":295,"forwarding_number":null},{"agent_id":840769596,"name":"Chante Alvin","status":"Not Available","status_code":"not_available","via":"client","available_time":6709,"calls_accepted":65,"calls_denied":2,"calls_missed":0,"average_talk_time":249,"forwarding_number":null},{"agent_id":698657608,"name":"David Nunez","status":"Not Available","status_code":"not_available","via":"client","available_time":0,"calls_accepted":0,"calls_denied":0,"calls_missed":0,"average_talk_time":0,"forwarding_number":null},{"agent_id":840768686,"name":"Elizabeth Cortez","status":"Wrap-up","status_code":"wrap_up","via":"client","available_time":3522,"calls_accepted":40,"calls_denied":0,"calls_missed":0,"average_talk_time":245,"forwarding_number":null},{"agent_id":826314433,"name":"Emily Carner","status":"Not Available","status_code":"not_available","via":"client","available_time":12451,"calls_accepted":12,"calls_denied":1,"calls_missed":0,"average_talk_time":264,"forwarding_number":null},{"agent_id":840763536,"name":"Eric Molina","status":"Not Available","status_code":"not_available","via":"client","available_time":1030,"calls_accepted":13,"calls_denied":1,"calls_missed":0,"average_talk_time":147,"forwarding_number":null},{"agent_id":840767756,"name":"Felicia Lechuga","status":"Not Available","status_code":"not_available","via":"client","available_time":0,"calls_accepted":0,"calls_denied":0,"calls_missed":0,"average_talk_time":0,"forwarding_number":null},{"agent_id":848178193,"name":"Gerry Gerlach","status":"Not Available","status_code":"not_available","via":"client","available_time":0,"calls_accepted":0,"calls_denied":0,"calls_missed":0,"average_talk_time":0,"forwarding_number":"+15039286809x410"},{"agent_id":705200326,"name":"Jason Awbrey","status":"Not Available","status_code":"not_available","via":"client","available_time":0,"calls_accepted":0,"calls_denied":0,"calls_missed":0,"average_talk_time":0,"forwarding_number":"+15039399407"},{"agent_id":826922466,"name":"Jessica Dobbs","status":"Not Available","status_code":"not_available","via":"client","available_time":12,"calls_accepted":8,"calls_denied":0,"calls_missed":0,"average_talk_time":411,"forwarding_number":null},{"agent_id":840766776,"name":"Kim Sproul","status":"On Call","status_code":"on_call","via":"client","available_time":1691,"calls_accepted":27,"calls_denied":0,"calls_missed":0,"average_talk_time":399,"forwarding_number":null},{"agent_id":840770396,"name":"Kristie Snyder","status":"Wrap-up","status_code":"wrap_up","via":"client","available_time":2925,"calls_accepted":59,"calls_denied":1,"calls_missed":3,"average_talk_time":199,"forwarding_number":null}])
    // route.store.push('current_queue_activity', {"calls_waiting":2,"average_wait_time":138,"longest_wait_time":172})
    // return Ember.RSVP.hash({
    //   current_queue_activity: this.store.findAll('current_queue_activity'),
    //   agents_activity: this.store.findAll('agents_activity')
    // });
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
            agents = _.each(json_object.agents_activity, function(object, index){
              object.id = index + 1;
            });
            route.store.pushMany('agents_activity', agents);
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

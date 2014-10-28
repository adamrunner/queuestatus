// App.CurrentQueueActivity = Ember.Object.create();
App.CurrentQueueActivity = DS.Model.extend({
  calls_waiting: DS.attr('string'),
  average_wait_time: DS.attr('string'),
  longest_wait_time: DS.attr('string')
})
App.AgentsActivity = DS.Model.extend({
  agent_id          : DS.attr('string'),
  name              : DS.attr('string'),
  status            : DS.attr('string'),
  status_code       : DS.attr('string'),
  via               : DS.attr('string'),
  available_time    : DS.attr('number'),
  calls_accepted    : DS.attr('number'),
  calls_denied      : DS.attr('number'),
  calls_missed      : DS.attr('number'),
  average_talk_time : DS.attr('number'),
  forwarding_number : DS.attr('string')
});

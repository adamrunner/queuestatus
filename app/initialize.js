App = Ember.Application.create({
  LOG_TRANSITIONS: true, // basic logging of successful transitions
  LOG_TRANSITIONS_INTERNAL: true, // detailed logging of all routing steps
  LOG_STACKTRACE_ON_DEPRECATION : true,
  LOG_BINDINGS                  : true,
  LOG_VIEW_LOOKUPS              : true,
  LOG_ACTIVE_GENERATION         : true
});

require('store');
require('router');

var folderOrder = [ 'routes', 'models', 'views', 'controllers', 'helpers', 'templates', 'components' ];

folderOrder.forEach(function(folder) {
  window.require.list().filter(function(module) {
    return new RegExp("^" + folder + "/").test(module);
  }).forEach(function(module) {
    console.log("Loading Module: " + module);
    require(module);
  });
})

App.Pollster = Ember.Object.extend({
  interval: function() {
    // return 2500000; // Time between polls (in ms)
    return 45000;
  }.property().readOnly(),

  // Schedules the function `f` to be executed every `interval` time.
  schedule: function(f) {
    return Ember.run.later(this, function() {
      f.apply(this);
      this.set('timer', this.schedule(f));
    }, this.get('interval'));
  },

  // Stops the pollster
  stop: function() {
    Ember.run.cancel(this.get('timer'));
  },

  // Starts the pollster, i.e. executes the `onPoll` function every interval.
  start: function() {
    this.set('timer', this.schedule(this.get('onPoll')));
  },

  onPoll: function(){
    // Issue JSON request and add data to the store
  }
});

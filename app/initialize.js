App = Ember.Application.create({
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_STACKTRACE_ON_DEPRECATION : true,
  LOG_BINDINGS                  : true,
  LOG_VIEW_LOOKUPS              : true,
  LOG_ACTIVE_GENERATION         : true
});
App.RefreshInterval = 250000
// SimpleAuth.Configuration.authenticationRoute ="/index"
// App.CustomAuthorizer = SimpleAuth.Authorizers.Base.extend({
//   authorizerFactory: 'authorizer:custom'
// });
Ember.Application.initializer({
  name: 'authentication',
  after: 'simple-auth',
  initialize: function(container, application) {
    var session          = container.lookup('simple-auth-session:main');
    // container.register('authenticator:custom', App.GoogleAuthenticator);
    // container.register('authorizer:custom', App.CustomAuthorizer);
    session.on('sessionAuthenticationSucceeded', function(){
    })
  }
});
require('store');
require('router');
require('chart');
var folderOrder = [ 'routes', 'models', 'views', 'controllers', 'helpers', 'templates', 'components' ];

folderOrder.forEach(function(folder) {
  window.require.list().filter(function(module) {
    return new RegExp("^" + folder + "/").test(module);
  }).forEach(function(module) {
    require(module);
  });
})
Ember.$.getJSON('/api/v2/users.json?role=agent').then(function(json_object){
  App.Users = json_object.users;
  App.AgentIds = _.map(json_object.users, function(u){ return u.id});
});
App.Pollster = Ember.Object.extend({
  interval: function() {
    if(undefined === App.RefreshInterval){
      return 4000;
    }else{
      return parseInt(App.RefreshInterval, 10);
    }
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

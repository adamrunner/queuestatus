App.ApplicationController = Ember.Controller.extend({
  needs: ['index', 'login'],
  agentDataChanged: function(){
    this.set('valuesArray', [
      Ember.Object.create({key:'available', value: this.get('controllers.index.available.length')}),
      Ember.Object.create({key:'wrapUp', value: this.get('controllers.index.wrapUp.length')}),
      Ember.Object.create({key:'onCall', value: this.get('controllers.index.onCall.length')}),
      Ember.Object.create({key:'notAvailable', value: this.get('controllers.index.notAvailable.length')})
    ])
  }.observes('controllers.index.available.@each', 'controllers.index.wrapUp.@each', 'controllers.index.onCall.@each', 'controllers.index.notAvailable.@each'),
  actions: {
    logout: function(){
      this.set('controllers.login.token', undefined);
      delete localStorage.token
      this.transitionToRoute('index');
    }
  }
});

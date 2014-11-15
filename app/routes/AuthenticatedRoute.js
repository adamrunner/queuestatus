App.AuthenticatedRoute = Ember.Route.extend({
  beforeModel: function(transition){
    if(!this.isTokenGood()){
      this.redirectToLogin(transition);
    }
  },
  isTokenGood: function(){
    var token = this.controllerFor('login').get('token');
    if(token){
      return true;
    }else{
      return false;
    }

  },
  redirectToLogin: function(transition){
    var loginController = this.controllerFor('login')
    loginController.set('attemptedTransition', transition)
    this.transitionTo('login')
  },
  actions: {
    // error: function(reason, transition){
    //   if (reason.status === 401){
    //     this.redirectToLogin(transition);
    //   }else{
    //     alert('Major Error.');
    //   }
    // }
  }
});

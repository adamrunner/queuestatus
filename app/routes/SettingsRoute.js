App.SettingsRoute = App.AuthenticatedRoute.extend({
  model: function(){
    return {
      setting1: 'value',
      setting2: 'value'
    }
  }
})

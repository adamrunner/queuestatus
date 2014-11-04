App.BarChartComponent = Ember.Component.extend({
  didInsertElement: function(){
  },
  dataDidChange: function(){
    var chart = this.get('chart');
    var data = this.get('data');
    if(undefined === chart){
      chart = Chart.create({data:this.get('data')})
      chart.draw()
      this.set('chart', chart);
    }
    chart.update(data);
    console.log("updating chart")
  }.observes('data.@each.value')
});

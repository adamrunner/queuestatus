/** Class: App.ChartView
 * Provides an Ember View containing a simple bar chart.
 * Use contentBinding to bind it to an ArrayControllers content.
 */
 // App.chartValuesController = Ember.ArrayController.extend({
 //    needs: ['index'],
 //    // availableBinding    : 'controllers.index.available',
 //    // wrapUpBinding       : 'controllers.index.wrapUp',
 //    // onCallBinding       : 'controllers.index.onCall',
 //    // notAvailableBinding : 'controllers.index.notAvailable',
 //    content : [],
 //    init: function init(){
 //        var newContent = _.map(this.get('chartValues'), function(v, k){
 //            a = {};
 //            keys.push(k);
 //            a.key = k;
 //            a.value = v.get('length');
 //            return a;
 //        });
 //        this.set('content', newContent)

 //    }
 // })
App.ChartView = Ember.View.extend({
    // templateName: 'index',
    chartValuesBinding: 'controller.chartValues',
    chart: {},
    updateChart: function updateChart (){
        var data = this.get('controller.chartValues');
        var y      = this.get('y');
        var height = this.get('height');
        var chart  = this.get('chart');
        chart.selectAll(".bar")
          .data(data)
          .transition()
          .duration(500)
          .attr("class", "bar")
          .attr("y", function(d) { return y(d.value.get('length'));})
          .attr("height", function(d) { return height - y(d.value.get('length')); });
    }.observes('content.@each.value'),

    didInsertElement: function didInsertElement(){
        var keys = [];
        var elementId = this.get('elementId');
        var data = this.get('chartValues');

        //deals with actually drawing the the chart
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 860 - margin.left - margin.right,
        height = 450  - margin.top - margin.bottom;

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .5);

        var y = d3.scale.linear()
            .domain([0, 10])
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left");

        x.domain(['available', 'wrapUp', 'onCall', 'notAvailable']);

        var chart = d3.select('#' + elementId).append("svg:svg")
            .attr('id','chart')
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("svg:g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // Draws the X axis
        chart.append("svg:g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);
        // Draws the bars
        chart.selectAll(".bar")
          .data(data)
          .enter().append("svg:rect")
          .attr("class", "bar")
          .attr("x", function(d) { return x(d.key); })
          .attr("width", function(d){ return 100})
          .attr("y", function(d) {
            var breakhere;
            return y(d.value.get('length'));
        })
          .attr("height", function(d) { return height - y(d.value.get('length')); });
        this.set('y', y);
        this.set('height', height);
        this.set('chart',chart);
    }
});


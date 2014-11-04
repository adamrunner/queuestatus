Chart = {};
Chart.create = function(options){
  var xAxis, width, height, data, svg, x, y = '';
  var __construct = function(options){
    if(undefined === options['data']){
      throw "Must pass data to constructor!";
    }else{
      data = options['data'];
    }
  }(options)
  this.draw = function(){
    var margin = {left: 200, right:40, top:20, bottom:20}
    width = (1170 - margin.left - margin.right);
    height    = (500 - margin.top - margin.bottom);
    svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")


    y                    = d3.scale.ordinal().rangeRoundBands([0, height], .2);
    x                    = d3.scale.linear().range([0, width]);
    var dataValues       = data.map(function(d){return d.value});
    var dataValuesMax    = d3.max(dataValues);
    var dataLabels       = data.map(function(d) { return d.key; });
    var dataLabelsPretty = {}
    dataLabels.map(function(d){ dataLabelsPretty[d] = titleize(d) });
    y.domain(dataLabels);
    x.domain([0, dataValuesMax]);

    var yAxis = d3.svg.axis().scale(y).tickFormat(function(d){ return dataLabelsPretty[d]; }).orient('left');

    var bar = svg.selectAll("g")
      .data(data).enter()
    .append("g")
    .attr("class", function(d){ return d.key})
    .classed("bar", true)
    bar.append('rect')
      .attr("class", function(d){ return d.key})
      .attr("y", function(d){ return y(d.key); })
      .attr("height", y.rangeBand())
      .attr("x",0)
      .attr("width", function(d) { return x(d.value); })
    bar.append("text")
      .classed("bar-label hidden", true)
      .attr("y", function(d){
        return y(d.key)
      })
      .attr("x", function(d){
        return x(d.value) - 3
      })
      .attr("dy", "1.65em")
      .text(function(d){ return d.value})
      svg.append("g").attr('class', 'y axis').call(yAxis);
  }
  this.update = function(newData){
    data = newData;
    var dataValues = data.map(function(d){return d.value});
    var dataValuesMax = d3.max(dataValues);
    x.domain([0, dataValuesMax]);

    svg.selectAll("rect").data(data)
      .transition()
      .duration(400)
      .attr("width", function(d) { return x(d.value); })
    svg.selectAll('.bar-label').data(data)
      .classed("hidden", function(d){ return d.value === 0 })
      .transition()
      .duration(500)
      .attr("y", function(d){ return y(d.key)})
      .attr("x", function(d){ return x(d.value) - 25; })
      .text(function(d){ return d.value});

  }
return this;
}

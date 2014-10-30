Ember.Handlebars.helper("toMinutes", function(value){
  return moment.duration(value, 'seconds').format('mm:ss', {trim:false});
});
Ember.Handlebars.helper("key_value", function(obj) {
    var buffer = "",
        key;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            buffer += 'key: ' + key+ ', value: '+obj[key];
        }
    }

    return buffer;
});

showGraphs = function(data) {
  a = d3.entries(data);
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
      // .ticks(5, "%");

  var svg = d3.select(".graph").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // var drivesCounts = d3.entries();

  // x.domain(['Available', 'Wrap Up', 'In Call', 'Not Available']);
  x.domain(d3.keys(data));

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  // svg.append("g")
  //   .attr("class", "y axis")
  //   .call(yAxis)
  //   .append("text")
  //   .attr("transform", "rotate(-90)")
  //   .attr("y", 10)
  //   .attr("dy", ".71em")
  //   .style("text-anchor", "end");

  svg.selectAll(".bar")
    .data(a)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.key); })
    .attr("width", function(d){ return 100})
    .attr("y", function(d) { return y(d.value);})
    .attr("height", function(d) { return height - y(d.value); });
};

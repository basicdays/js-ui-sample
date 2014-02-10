'use strict';
var d3 = require('d3'),
    domify = require('domify'),
    reactive = require('reactive'),
    template = require('./template.html');

exports.bind = function(rootEl, trendData, cb) {
	var el = domify(template);
	rootEl.appendChild(el);
	var view = reactive(el, trendData);
	drawGraph(el.querySelector('.line-graph'), trendData.visitors());
	cb(null, view);
};

function drawGraph(rootEl, data) {
	console.log(rootEl.offsetWidth);
	console.log(rootEl.offsetHeight);

	var margin = {top: 0, right: 0, bottom: 30, left: 50},
		width = rootEl.offsetWidth,
		height = rootEl.offsetHeight;

	var x = d3.scale.linear()
		.range([0, width - margin.left - margin.right])
		.domain(d3.extent(data, function(d, i) { return i; }));

	var y = d3.scale.linear()
		.range([height - margin.top - margin.bottom, 0])
		.domain(d3.extent(data, function(d) { return d; }));

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	var line = d3.svg.line()
		.x(function(d, i) { return x(i); })
		.y(function(d) { return y(d); });

	var svg = d3.select(rootEl).append("svg")
		.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Visitors");

	svg.append("path")
		.datum(data)
		.attr("class", "line")
		.attr("d", line);
}

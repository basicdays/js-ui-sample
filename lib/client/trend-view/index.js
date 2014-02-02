'use strict';
var domify = require('domify'),
    reactive = require('reactive'),
    TrendDataSet = require('trend-data-set'),
    visitorGraphView = require('visitor-graph-view'),
    template = require('./template.html');

exports.bind = function() {
	var el = domify(template);
	document.querySelector('body').appendChild(el);

	TrendDataSet.get(function(err, model) {
		if (err) { throw err; }
		reactive(el, model);
		setInterval(model.poll, 10000);
	});
};

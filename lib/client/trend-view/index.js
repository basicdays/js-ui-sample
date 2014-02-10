'use strict';
var domify = require('domify'),
    reactive = require('reactive'),
    TrendDataSet = require('trend-data-set'),
    visitorGraphView = require('visitor-graph-view'),
    template = require('./template.html');

exports.bind = function(rootEl, cb) {
	var el = domify(template);
	rootEl.appendChild(el);

	TrendDataSet.get(function(err, model) {
		if (err) { cb(err); }
		var trendDataView = reactive(el, model);

		var graphViewEl = el.querySelector('.graph');
		visitorGraphView.bind(graphViewEl, model, function(err) {
			if (err) { cb(err); }

			setInterval(model.poll, 10000);
			cb(null, trendDataView);
		});
	});
};

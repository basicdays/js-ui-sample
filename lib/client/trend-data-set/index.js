'use strict';
var model = require('model'),
    modelSchema = require('model-schema');

var schema = {
	visitors: {},
	conversion7Day: {},
	conversion30Day: {},
	pagePerVisit: {},
	responseTime: {}
};

var TrendDataSet = model('TrendDataSet')
		.use(modelSchema(schema))
		.route('trenddataset');

TrendDataSet.get = function(fn) {
	var Self = this;
	var url = '/trenddataset.json';
	this.request
		.get(url)
		.set(this._headers)
		.end(function(response) {
			if (response.error) {
				var error = new Error('got ' + response.status + ' response');
				fn(error, null, response);
			}
			var model = new Self(JSON.parse(response.text).exercise);
			fn(null, model, response);
		});
};

TrendDataSet.prototype.totalVisitors = function() {
	return this.visitors().reduce(function(a, b) {
		return a + b;
	});
};

TrendDataSet.prototype.poll = function() {
	console.log('poll trends');
};

module.exports = TrendDataSet;

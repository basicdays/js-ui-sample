'use strict';
var model = require('model'),
    modelSchema = require('model-schema');

var schema = {
	id: {},
	visitors: {},
	conversion7Day: {},
	conversion30Day: {},
	pagePerVisit: {},
	responseTime: {}
};

module.exports = model('TrendDataset')
	.use(modelSchema(schema));

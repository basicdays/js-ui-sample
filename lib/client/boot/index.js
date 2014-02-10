'use strict';
var trendView = require('trend-view');

exports.run = function() {
	var rootEl = document.querySelector('body');
	trendView.bind(rootEl, handleError);
};

function handleError(err) {
	if (err) { console.error(err); }
}

/* global window, mocha */
'use strict';

exports.run = function () {
	require('mocha');
	mocha.setup('bdd');
	window.should = require('chai').should();

	require('boot-tests');
	mocha.run();
};

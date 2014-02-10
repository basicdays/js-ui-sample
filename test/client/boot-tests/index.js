/* global describe, it, should */
'use strict';
var boot = require('boot');

describe('boot', function() {
	describe('#run()', function() {
		it('should run', function() {
			should.exist(boot.run);
		});
	});
});

'use strict';

/* global urlRequiresAuth: false */
describe('url requires auth', function () {

	var settings;
	beforeEach(function () {
		settings = {
			content_urls: [
				'http://place.com',
				'http://love.me'
			]
		};
	});

	it('should return true when a bad url is used', function () {
		expect(urlRequiresAuth('http://place.com/yohoo', settings)).toBe(true);
	});

	it('should return false when a good url is used', function () {
		expect(urlRequiresAuth('http://noprobhere.com/api', settings)).toBe(false);
	});

});

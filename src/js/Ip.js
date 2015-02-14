/**
 * ExtendJs Ip class v0.1.1 (https://github.com/mkenney/ExtendJs)
 *
 * Copyright 2014 Michael Kenney
 *
 * Licensed under MIT (https://github.com/mkenney/ExtendJs/blob/master/LICENSE)
 */

+function(global, undefined) {
	'use strict';

	/**
	 * Current IP address
	 * @var {string}
	 * @private
	 */
	var _ipv4;

	/**
	 */
	global.Ip = function(ipv4) {
		return this.init(ipv4);
	};

	/**
	 * Initialize this object
	 *
	 * @param  {String} ipv4 An IPv4 IP address string
	 * @return {Moment}      Initialized object
	 */
	global.Ip.prototype.init = function(ipv4) {
		if ('String' !== ipv4.__type__) {ipv4 = ipv4+'';}
		if ('String' !== ipv4.__type__) {throw new Error('"Ip" must be initialized with a valid IP v4 string');}
		if (!(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipv4))) {
			throw new Error('"'+ipv4+'" is not a valid IP v4 address');
		}

		_ipv4 = ipv4;
	};

	/**
	 * Convert an IP address to an unsigned int
	 *
	 * @return {Number}    Unsigned int
	 */
	global.Ip.prototype.toLong = function() {
		var quads = _ipv4.split('.');
		return quads[0] * Math.pow(256, 3) + quads[1] * Math.pow(256, 2) + quads[2] * Math.pow(256, 1) + quads[3] * Math.pow(256, 0);
	};

	/**
	 * Convert an IP address to a signed int
	 *
	 * @return {Number}    Signed int
	 */
	global.Ip.prototype.toSignedLong = function() {
		var self = this;
		var ip_long = self.toLong();
		if (ip_long >= 2147483648) { // 2^31
			ip_long -= 4294967296; // 2^32
		}
		return ip_long;
	};

}(this);

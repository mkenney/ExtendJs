/**
 * ExtendJs Number extensions v1.0.0 (https://github.com/mkenney/ExtendJs)
 *
 * Copyright 2014 Michael Kenney
 *
 * Licensed under MIT (https://github.com/mkenney/ExtendJs/blob/master/LICENSE)
 */

+function(undefined) {
	'use strict';

	/**
	 * Convert a signed or unsigned int to an IP address
	 *
	 * Matches the PHP long2ip() function
	 *
	 * @param  {Number} ip_long Long IP address value
	 * @return {String}         IPv4 address
	 */
	Number.prototype.toIp = function() {
		var quads = [0,0,0,0];
		var divisor = 16777216.0;
		var ip_long = this+0.0;
		if (ip_long < 0) {
			ip_long += 4294967296; // 2^32
		}

		for (var a = 0; a < 4; a++) {
			var quad = Number(ip_long / divisor).format(0);
			ip_long = ip_long - (divisor * quad);
			quads[a] = quad;
			divisor = (divisor / 256.0);
		}
		return quads.join('.');
	};

	/**
	 * Simple PHP style number formatting
	 *
	 * Does not round
	 *
	 * @see    http://php.net/number_format
	 * @param  {Number} precision Number of digits to display after the decimal, default 0
	 * @param  {String} decimal   Character to use as the decimal, default '.'
	 * @param  {String} separator Character to use as the thousands separator, default ','
	 * @return {String}           The formatted string
	 */
	Number.prototype.format = function(precision, decimal, separator) {
		if (!precision) {precision = 0;}
		if (!decimal)   {decimal   = '.';}
		if (!separator) {separator = ',';}

		var string_this = String(this);
		var x = string_this.split('.');
		var formatted_number = x[0];
		var remainder = x.length > 1 ? x[1] : '0';
		var regex = /(\d+)(\d{3})/;

		while (regex.test(formatted_number)) {
			formatted_number = formatted_number.replace(regex, '$1'+separator+'$2');
		}

		if (precision > 0) {
			formatted_number += decimal;
			for (var a = 0; a < precision; a++) {
				if (remainder[a]) {
					formatted_number += remainder[a];
				} else {
					formatted_number += '0';
				}
			}
		}

		return formatted_number;
	};
}();

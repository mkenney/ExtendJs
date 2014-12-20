/**
 * ExtendJs Array extensions v1.0.0 (https://github.com/mkenney/ExtendJs)
 *
 * Copyright 2014 Michael Kenney
 *
 * Licensed under MIT (https://github.com/mkenney/ExtendJs/blob/master/LICENSE)
 */

(function(undefined) {
	'use strict';

	if (!Array.prototype.indexOf) {
		/**
		 * Add the indexOf array method to IE 8 and 9
		 *
		 * Return the first index at which a given element can be found in the
		 * array or -1 if it is not present
		 *
		 * @param  {Array}  search_element The Array instance
		 * @param  {Number} from_index     The starting index
		 * @return {Number}                First matching index or -1
		 */
		Array.prototype.indexOf = function(search_element, from_index) {
			for (var a = (from_index || 0), b = this.length; a < b; a++) {
				if (this[a] === search_element) {
					return a;
				}
			}
			return -1;
		};
	}
})();

/**
 * ExtendJs Date extensions v0.1.3 (https://github.com/mkenney/ExtendJs)
 *
 * Copyright 2014 Michael Kenney
 *
 * Licensed under MIT (https://github.com/mkenney/ExtendJs/blob/master/LICENSE)
 */

(function(undefined) {
	'use strict';

	if (undefined === Date.prototype.getDayOfYear) {
		/**
		 * Extend Date with a day of year method
		 *
		 * @return {Number} The day of the year (1-366)
		 */
		Date.prototype.getDayOfYear = function() {
			var year = this.getFullYear();
			var month = this.getMonth();
			var day = this.getDate();
			var start_date = new Date(year, 0, 1, 12, 0, 0); // noon on Jan. 1
			var end_date = new Date(year, month, day, 12, 0, 0); // noon on input date
			var days = Math.round((end_date - start_date) / 8.64e7) + 1;
			return days;
		};
	}

	if (undefined === Date.prototype.getDaysInMonth) {
		/**
		 * Extend Date with a number of days in the current month method
		 *
		 * @return {Number} The day of the month (1-31)
		 */
		Date.prototype.getDaysInMonth = function() {
			return new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
		};
	}

	if (undefined === Date.prototype.getWeekOfYear) {
		/**
		 * Extend Date with a week of year method
		 *
		 * The end-of-year week number is calculated as belonging to the year that the
		 * Thursday of that week falls into so if December 31st is a Thursday, every
		 * day of that week including Friday and Saturday will be considered week 53
		 * of that year, but if it's a Wednesday then every day of that week will be
		 * considered week 1 of the following year.
		 *
		 * @see    http://www.iso.org/iso/home/standards/iso8601.htm (paywall)
		 * @see    http://en.wikipedia.org/wiki/ISO_8601#Week_dates
		 * @return {Number} The week of the year (1-53)
		 */
		Date.prototype.getWeekOfYear = function() {
			var week_check = new Date(+this);
			week_check.setDate(week_check.getDate() + 4 - (week_check.getDay() || 7));
			week_check.setHours(0, 0, 0);
			return Math.ceil((((week_check - new Date(week_check.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);
		};
	}

	if (undefined === Date.prototype.isDst) {
		/**
		 * Extend Date with an isDst (is daylight savings time) method
		 *
		 * @return {Boolean} True if the current date falls within daylight savings time
		 */
		Date.prototype.isDst = function() {
			var winter = new Date(this.getFullYear(), 11, 22); // winter solstice
			var summer = new Date(this.getFullYear(), 5, 22);  // summer solstice
			var dst = Math.max(winter.getTimezoneOffset(), summer.getTimezoneOffset());
			return this.getTimezoneOffset() < dst;
		};
	}

	if (undefined === Date.prototype.isLeapYear) {
		/**
		 * Extend Date with an isLeapYear method
		 *
		 * @return {Boolean} True if the current year is a leap year
		 */
		Date.prototype.isLeapYear = function() {
			return (new Date(this.getFullYear(), 1, 29).getMonth() === 1);
		};
	}
})();

/**
 * ExtendJs Ip class v0.1.1 (https://github.com/mkenney/ExtendJs)
 *
 * Copyright 2014 Michael Kenney
 *
 * Licensed under MIT (https://github.com/mkenney/ExtendJs/blob/master/LICENSE)
 */

(function(undefined) {
	'use strict';

	/**
	 * Current IP address
	 * @var {string}
	 * @private
	 */
	var _ipv4;

	/**
	 */
	var Ip = function(ipv4) {
		return this.init(ipv4);
	};

	/**
	 * Initialize this object
	 *
	 * @param  {String} ipv4 An IPv4 IP address string
	 * @return {Moment}      Initialized object
	 */
	Ip.prototype.init = function(ipv4) {
		if (ipv4 instanceof String) {ipv4 = ipv4.toString();}

		if ('string' !== typeof ipv4) {
			throw new Error('"Ip" must be initialized with a valid IP v4 string');
		}
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
	Ip.prototype.toLong = function() {
		var quads = _ipv4.split('.');
		return quads[0] * Math.pow(256, 3) + quads[1] * Math.pow(256, 2) + quads[2] * Math.pow(256, 1) + quads[3] * Math.pow(256, 0);
	};

	/**
	 * Convert an IP address to a signed int
	 *
	 * @return {Number}    Signed int
	 */
	Ip.prototype.toSignedLong = function() {
		var self = this;
		var ip_long = self.toLong();
		if (ip_long >= 2147483648) { // 2^31
			ip_long -= 4294967296; // 2^32
		}
		return ip_long;
	};
})();

/**
 * ExtendJs Number extensions v1.0.0 (https://github.com/mkenney/ExtendJs)
 *
 * Copyright 2014 Michael Kenney
 *
 * Licensed under MIT (https://github.com/mkenney/ExtendJs/blob/master/LICENSE)
 */

(function(undefined) {
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
	 * Alias of long2ip()
	 *
	 * @param  {Number} ip_long Signed long IP address value
	 * @return {String}         IPv4 address
	 */
	Number.prototype.toIp = function() {
		return this.long2ip();
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
		var remainder = x.length > 1 ? x[1] : "0";
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
})();

/**
 * ExtendJs String extensions v1.0.0 (https://github.com/mkenney/ExtendJs)
 *
 * Copyright 2014 Michael Kenney
 *
 * Licensed under MIT (https://github.com/mkenney/ExtendJs/blob/master/LICENSE)
 */

(function(undefined) {
	'use strict';

	if (undefined === String.prototype.br2nl) {
		/**
		 * The reverse of nl2br
		 *
		 * @return {String} The updated string
		 */
		String.prototype.br2nl = function() {
			return this
				.replace(/<br \/>/ig, "\n")
				.replace(/<br\/>/ig, "\n")
				.replace(/<br>/ig, "\n");
		};
	}

	if (undefined === String.prototype.htmlSpecialChars) {
		/**
		 * Ala http://php.net/htmlspecialchars
		 *
		 * @return {String} The updated string
		 */
		String.prototype.htmlSpecialChars = function() {
			var div = document.createElement('div');
			var text = document.createTextNode(this);
			div.appendChild(text);
			return div.innerHTML;
		};
	}

	if (undefined === String.prototype.lTrim) {
		/**
		 * Left-trim whitespace
		 *
		 * @return {String} The trimmed string
		 */
		String.prototype.ltrim = function() {
			return this.replace(/^\s+/, '');
		};
	}

	if (undefined === String.prototype.nl2br) {
		/**
		 * Ala http://php.net/nl2br
		 *
		 * @return {String} The updated string
		 */
		String.prototype.nl2br = function() {
			return this
				.replace(/\r\n/g, '<br />')
				.replace(/\n/g, '<br />');
		};
	}

	if (undefined === String.prototype.regexEscape) {
		/**
		 * Escape a string for use in a regular expression
		 *
		 * @return {String} The updated string
		 */
		String.prototype.regexEscape = function() {
			return this.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
		};
	}

	if (undefined === String.prototype.rTrim) {
		/**
		 * Right-trim whitespace
		 *
		 * @return {String} The trimmed string
		 */
		String.prototype.rtrim = function() {
			return this.replace(/\s+$/, '');
		};
	}

	if (undefined === String.prototype.trim) {
		/**
		 * Trim whitespace
		 *
		 * @return {String} The trimmed string
		 */
		String.prototype.trim = function() {
			return this.replace(/^\s+/, '').replace(/\s+$/, '');
		};
	}
})();

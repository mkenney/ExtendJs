/*!
 * ExtendJs v0.0.3 (https://github.com/mkenney/ExtendJs)
 * Copyright 2014-2015 Michael Kenney
 * Licensed under MIT (https://github.com/mkenney/ExtendJs/blob/master/LICENSE)
 */
/**
 * ExtendJs Object extensions v0.1.3 (https://github.com/mkenney/ExtendJs)
 *
 * Copyright 2014 Michael Kenney
 *
 * Licensed under MIT (https://github.com/mkenney/ExtendJs/blob/master/LICENSE)
 */

+function(undefined) {
	'use strict';

	if (undefined === Object.__ExtendJs__) {
		/**
		 * Create a flag noting that ExtendJs is installed
		 *
		 * This property is read-only
		 */
		Object.defineProperty(Object.prototype, '__ExtendJs__', {
			set: function() {
				throw '__ExtendJs__ is a read-only property';
			}
			, get: function() {
				return true;
			}
		});
	}

	if (undefined === Object.__type__) {
		/**
		 * Extend all objects with a __type__ property
		 *
		 * This property is read-only
		 *
		 * javscript type checking is too inconsistent...
		 *
		 * 	   var test = 1;
		 *     test instanceof Number             === false
		 *     Number(test) instanceof Number     === false
		 *     new Number(test) instanceof Number === true
		 *     NaN instanceof Number              === false
		 *     null instanceof Object             === false
		 *     typeof test                        === "number"
		 *     typeof Number                      === "function"
		 *     typeof Number(test)                === "number"
		 *     typeof new Number(test)            === "object"
		 *     typeof NaN                         === "number"
		 *
		 * This property will return a string name of the native type or 'Object'
		 * for custom object instances
		 *
		 * @var {String} The native type name as a string ala typeof()
		 *               but accurate for native values and instances:
		 *                    var test = 1;
		 *                    test.__type__          === "Number"
		 *                    Number(1).__type__     === "Number"
		 *                    new Number(1).__type__ === "Number"
		 *                    Number.__type__        === "Function"
		 *                    NaN.__type__           === "NaN"
		 */
		Object.defineProperty(Object.prototype, '__type__', {
			set: function() {
				throw '__type__ is a read-only property';
			}
			, get: function() {
				var ret_val = '';
				if (null === this) {
					ret_val = 'Null';
				} else {
					ret_val = {}.toString.call(this).replace(/[\[\]]/g, '').split(' ')[1];
				}
				if ('Number' === ret_val && isNaN(this)) {
					ret_val = 'NaN';
				}
				return ret_val;
			}
		});
	}

	if (undefined === Object.extend) {
		/**
		 * Temporary, used by extend()
		 * @private
		 * @static
		 * @param  {mixed}   obj
		 * @return {Boolean}
		 */
		var isPlainObject = function(obj) {
			var key;

			// Must be an Object.
			// Because of IE, we also have to check the presence of the constructor property.
			// Make sure that DOM nodes and window objects don't pass through, as well
			if (!obj || 'Object' !== obj.type || obj.nodeType || (obj != null && obj == obj.window)) {
				return false;
			}

			try {
				// Not own constructor property must be Object
				if (obj.constructor && !obj.hasOwnProperty('constructor') && !obj.constructor.prototype.hasOwnProperty('isPrototypeOf')) {
					return false;
				}
			} catch(e) {
				// IE8,9 Will throw exceptions on certain host objects
				return false;
			}

			// Own properties are enumerated firstly, so to speed up,
			// if last one is own, then all properties are own.
			for (key in obj) {}

			return key === undefined || obj.hasOwnProperty(key);
		};

		/**
		 * Extend objects
		 */
		Object.extend = function() {
			var src;
			var copyIsArray;
			var copy;
			var name;
			var options;
			var clone;
			var target = arguments[0] || {};
			var i = 1;
			var length = arguments.length;
			var deep = false;

			// Handle a deep copy situation
			if ('Boolean' === target.__type__) {
				deep = target;
				target = arguments[1] || {};
				// skip the boolean and the target
				i = 2;
			}

			// Handle case when target is a string or something (possible in deep copy)
			if ('Object' !== target.__type__ && 'Function' !== target.__type__) {
				target = {};
			}

			// Just create a new object if only one argument is passed
			if (length === i) {
				target = {};
				--i;
			}

			for (; i < length; i++) {
				// Only deal with non-null/undefined values
				if ((options = arguments[i]) != null) {
					// Extend the base object
					for (name in options) {
						src = target[name];
						copy = options[name];

						// Prevent never-ending loop
						if (target === copy) {
							continue;
						}

						// Recurse if we're merging plain objects or arrays
						if (deep && copy && (isPlainObject(copy) || (copyIsArray = ('Array' === copy.type)))) {
							if (copyIsArray) {
								copyIsArray = false;
								clone = src && ('Array' === src.type) ? src : [];

							} else {
								clone = src && isPlainObject(src) ? src : {};
							}

							// Never move original objects, clone them
							target[name] = this.extend(deep, clone, copy);

							// Don't bring in undefined values
						} else if (copy !== undefined) {
							target[name] = copy;
						}
					}
				}
			}

			// Return the modified object
			return target;
		};
	}

}();

/**
 * ExtendJs Array extensions v1.0.0 (https://github.com/mkenney/ExtendJs)
 *
 * Copyright 2014 Michael Kenney
 *
 * Licensed under MIT (https://github.com/mkenney/ExtendJs/blob/master/LICENSE)
 */

+function(undefined) {
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
}();

/**
 * ExtendJs Date extensions v0.1.3 (https://github.com/mkenney/ExtendJs)
 *
 * Copyright 2014 Michael Kenney
 *
 * Licensed under MIT (https://github.com/mkenney/ExtendJs/blob/master/LICENSE)
 */

+function(undefined) {
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

	if (undefined === Date.prototype.format && undefined === Date.prototype.localize) {
		/**
		 * Extend Date with format and localize methods
		 * Accepts a PHP date() compatible date format string
		 */
		+function(undefined) {

			var _default_format_string = 'Y-m-d H:i:s';

			/**
			 * Store localized month and day names
			 * @type {Object}
			 * @private
			 * @static
			 */
			var _strings = {
				full: {
					  January:   'January'
					, February:  'February'
					, March:     'March'
					, April:     'April'
					, May:       'May'
					, June:      'June'
					, July:      'July'
					, August:    'August'
					, September: 'September'
					, October:   'October'
					, November:  'November'
					, December:  'December'

					, Sunday:    'Sunday'
					, Monday:    'Monday'
					, Tuesday:   'Tuesday'
					, Wednesday: 'Wednesday'
					, Thursday:  'Thursday'
					, Friday:    'Friday'
					, Saturday:  'Saturday'
				}
				, abbr: {
					  January:   'Jan'
					, February:  'Feb'
					, March:     'Mar'
					, April:     'Apr'
					, May:       'May'
					, June:      'Jun'
					, July:      'Jul'
					, August:    'Aug'
					, September: 'Sep'
					, October:   'Oct'
					, November:  'Nov'
					, December:  'Dec'

					, Sunday:    'Sun'
					, Monday:    'Mon'
					, Tuesday:   'Tue'
					, Wednesday: 'Wed'
					, Thursday:  'Thu'
					, Friday:    'Fri'
					, Saturday:  'Sat'
				}
			};

			/**
			 * Store formatting functions
			 * @type {Object}
			 * @private
			 * @static
			 */
			var _formats = {
				  d: function() {return (this.getDate() < 10 ? '0' : '')+this.getDate();}
				, D: function() {
					return [
						  _strings.abbr.Sunday
						, _strings.abbr.Monday
						, _strings.abbr.Tuesday
						, _strings.abbr.Wednesday
						, _strings.abbr.Thursday
						, _strings.abbr.Friday
						, _strings.abbr.Saturday
					][this.getDay()];
				}
				, j: function() {return ''+this.getDate();}
				, l: function() {
					return [
						  _strings.full.Sunday
						, _strings.full.Monday
						, _strings.full.Tuesday
						, _strings.full.Wednesday
						, _strings.full.Thursday
						, _strings.full.Friday
						, _strings.full.Saturday
					][this.getDay()];
				}
				, N: function() {return ''+(0 === this.getDay() ? 7 : this.getDay());}
				, S: function() {
					var english_ordinal_suffix = '';
					switch ((this.getDate()).substr(-1, 1)) {
						case '1': english_ordinal_suffix = 'st'; break;
						case '2': english_ordinal_suffix = 'nd'; break;
						case '3': english_ordinal_suffix = 'rd'; break;
						default:  english_ordinal_suffix = 'th'; break;
					}
					if (this.getDate() < 20 && this.getDate() > 10) {
						english_ordinal_suffix = 'th';
					}
					return english_ordinal_suffix;
				}
				, w: function() {return ''+this.getDay();}
				, z: function() {return ''+this.getDayNumber();}
				, W: function() {return ''+this.getWeekNumber();}
				, F: function() {
					return [
						  _strings.full.January
						, _strings.full.February
						, _strings.full.March
						, _strings.full.April
						, _strings.full.May
						, _strings.full.June
						, _strings.full.July
						, _strings.full.August
						, _strings.full.September
						, _strings.full.October
						, _strings.full.November
						, _strings.full.December
					][this.getMonth()];
				}
				, m: function() {return (this.getMonth() < 9 ? '0' : '')+(this.getMonth() + 1);}
				, M: function() {
					return [
						  _strings.abbr.January
						, _strings.abbr.February
						, _strings.abbr.March
						, _strings.abbr.April
						, _strings.abbr.May
						, _strings.abbr.June
						, _strings.abbr.July
						, _strings.abbr.August
						, _strings.abbr.September
						, _strings.abbr.October
						, _strings.abbr.November
						, _strings.abbr.December
					][this.getMonth()];
				}
				, n: function() {return ''+(this.getMonth() + 1);}
				, t: function() {return ''+this.getDaysInMonth();}
				, L: function() {return (this.isLeapYear() ? 1 : 0);}
				, o: function() {
					var d = new Date(+this);
					d.setDate(d.getDate() - ((this.getDay() + 6) % 7) + 3);
					return ''+d.getFullYear();
				}
				, Y: function() {return ''+this.getFullYear();}
				, y: function() {return (''+this.getFullYear()).substr(-2);}
				, a: function() {return (this.getHours() > 12 || (this.getHours() === 12 && this.getMinutes() > 0) ? 'pm' : 'am');}
				, A: function() {return (this.getHours() > 12 || (this.getHours() === 12 && this.getMinutes() > 0) ? 'PM' : 'AM');}
				, B: function() {return ''+Math.floor((((this.getUTCHours() + 1) % 24) + this.getUTCMinutes() / 60 + this.getUTCSeconds() / 3600) * 1000 / 24);}
				, g: function() {return ''+(this.getHours() % 12 || 12);}
				, G: function() {return ''+this.getHours();}
				, h: function() {return ((this.getHours() % 12 || 12) < 10 ? '0' : '')+(this.getHours() % 12 || 12);}
				, H: function() {return (this.getHours() < 10 ? '0' : '')+this.getHours();}
				, i: function() {return (this.getMinutes() < 10 ? '0' : '')+this.getMinutes();}
				, s: function() {return (this.getSeconds() < 10 ? '0' : '')+this.getSeconds();}
				, u: function() {return (this.getMilliseconds() < 10 ? '00' : (this.getMilliseconds() < 100 ? '0' : ''))+this.getMilliseconds()+'000';}
				, e: function() {return /\((.*)\)/.exec(new Date().toString())[1];}
				, I: function() {return (this.isDst() ? 1 : 0);}
				, O: function() {return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + '00';}
				, P: function() {return (-this.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(this.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(this.getTimezoneOffset() / 60)) + ':00';}
				, T: function() {return -this.getTimezoneOffset() * 60;}
				, Z: function() {return -this.getTimezoneOffset() * 60;}
				, c: function() {return this.format('Y-m-d\\TH:i:sP');}
				, r: function() {return this.toString();}
				, U: function() {return Math.floor(this.getTime() / 1000);}
			};

			/**
			 * Extend date with a format method
			 *
			 * Accepts a PHP date() compatible date format string
			 *
			 * @see    http://php.net/manual/en/function.date.php
			 * @param  {String} format_string The PHP date() compatible format string
			 * @return {String}               The formatted string
			 */
			Date.prototype.format = function(format_string) {
				var self = this;

				if (undefined === format_string) {format_string = _default_format_string;}

				return format_string.replace(/(\\?)(.)/g, function(_, escaped_char, replace_char) {
					return (escaped_char === '' && undefined !== _formats[replace_char]
						? _formats[replace_char].call(self)
						: replace_char
					);
				});
			};

			/**
			 * Allow localization of date format strings
			 *
			 * @param  {String}  version Either 'full' or 'abbr' to control
			 *                           whether you're updating the abbriation
			 *                           or not
			 * @param  {word}    word    The English version of the month or day
			 *                           name you are updating
			 * @param  {value}   value   The localized string
			 * @return {Date}            this
			 */
			Date.prototype.localize = function(version, word, value) {
				if (undefined === _strings[version]) {throw '"version" must be one of "long" or "short"';}
				if (undefined === _strings[version][word]) {throw "'"+word+"' is not a valid month or day name";}
				_strings[version][word] = value;
				return this;
			};
		}();
	}
}();

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

/**
 * ExtendJs String extensions v1.0.0 (https://github.com/mkenney/ExtendJs)
 *
 * Copyright 2014 Michael Kenney
 *
 * Licensed under MIT (https://github.com/mkenney/ExtendJs/blob/master/LICENSE)
 */

+function(undefined) {
	'use strict';

	if (undefined === String.prototype.br2nl) {
		/**
		 * The reverse of nl2br
		 *
		 * @return {String} The updated string
		 */
		String.prototype.br2nl = function() {
			return this
				.replace(/<br \/>/ig, '\n')
				.replace(/<br\/>/ig, '\n')
				.replace(/<br>/ig, '\n');
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
}();

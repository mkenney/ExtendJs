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

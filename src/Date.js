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

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

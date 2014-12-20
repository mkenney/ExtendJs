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

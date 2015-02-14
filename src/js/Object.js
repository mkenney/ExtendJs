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

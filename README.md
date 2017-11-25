# [ExtendJs](https://github.com/mkenney/ExtendJs)

Javascript functionality I think is missing and I'm tired of re-creating over and
over.

I'm totally polluting the prototypes of built in classes. I don't feel bad about
it. Nothing in this library will interfere with other libraries or break `for .. in`
loops or change any existing method behaviors or conflict with any future versions
of javascript or anything else. If I miss something that does, let me know and
I'll fix it immediately.

## Table of contents

- [Quick start](#quick-start)
- [Bugs and feature requests](#bugs-and-feature-requests)
- [Documentation](#documentation)
- [Examples](#examples)
- [Contributing](#contributing)
- [Versioning](#versioning)
- [Creator](#creator)
- [Copyright and license](#copyright-and-license)

## Quick start

- Clone the repo: `git clone https://github.com/mkenney/ExtendJs.git`.

### What's included

Within the repository you'll find the following directories and files, something
like this:

```
ExtendJs/
    ├── src/
    │    └──js/
    │        ├── Array.js
    │        ├── Date.js
    │        ├── Number.js
    │        ├── Object.js
    │        └── String.js
    └── assets/
         └──js/
             ├── ExtendJs.js
             ├── ExtendJs.map
             └── ExtendJs.min.js
```

The compiled file (`ExtendJs.js`) and [source map](https://developers.google.com/chrome-developer-tools/docs/css-preprocessors)
(`ExtendJs.map`) are located in the assets/ directory and are available for use
with certain browsers' developer tools.

## Bugs and feature requests

If you find a bug or have a feature request [please open a new issue](#contributing).


## Documentation

ExtendJs both extends native Javascript objects like Array and Date, and creates
new global objects you can use however you like.  Here are the objects, properties
and methods managed by this code.

Javascript Native Objects
```javascript
/**
 * A read-only boolean flag has been added to all objects and variables noting
 * that ExtendJs is installed.  Always true if the library has been loaded.
 */
Object.prototype.__ExtendJs__

/**
 * A read-only text value has been added to all objects and variables describing
 * the object type because type checking in Javascript is so difficult:
 *
 *     var test = 1;
 *     test.__type__          === "Number"
 *     Number(1).__type__     === "Number"
 *     new Number(1).__type__ === "Number"
 *     Number.__type__        === "Function"
 *     NaN.__type__           === "NaN"
 */
Object.prototype.__type__

/**
 * Extend objects ala jQuery.extend() and return the resulting object
 */
Object.extend( [deep], target, object1[, objectN])

/**
 * Add the indexOf array method to IE 8 and 9
 */
Array.prototype.indexOf()

/**
 * Extend Date with a day of year method
 */
Date.prototype.getDayOfYear()

/**
 * Extend Date with a number of days in the current month method
 */
Date.prototype.getDaysInMonth()

/**
 * Extend Date with a week of year method
 */
Date.prototype.getWeekOfYear()

/**
 * Extend Date with an isDst (is daylight savings time) method
 */
Date.prototype.isDst()

/**
 * Extend Date with an isLeapYear method
 */
Date.prototype.isLeapYear()

/**
 * Extend date with a format method
 *
 * Accepts a PHP date() compatible date format string
 */
Date.prototype.format(format_string)

/**
 * Allow localization of date format strings
 */
Date.prototype.localize(version, word, value)

/**
 * Convert a signed or unsigned int to an IP address
 */
Number.prototype.toIp()

/**
 * Simple PHP style number formatting
 */
Number.prototype.format(precision, decimal, separator)

/**
 * The reverse of nl2br
 */
String.prototype.br2nl()

/**
 * Ala http://php.net/htmlspecialchars
 */
String.prototype.htmlSpecialChars()

/**
 * Left-trim whitespace
 */
String.prototype.ltrim()

/**
 * Ala http://php.net/nl2br
 */
String.prototype.nl2br()

/**
 * Escape a string for use in a regular expression
 */
String.prototype.regexEscape()

/**
 * Right-trim whitespace
 */
String.prototype.rtrim()

/**
 * Trim whitespace
 */
String.prototype.trim()
```

Global IP class
```javascript
/**
 * Initialize this object
 */
new Ip(ipv4_string)

/**
 * Convert an IP address to an unsigned int
 */
Ip.prototype.toLong()

/**
 * Convert an IP address to a signed int
 */
Ip.prototype.toSignedLong()
```

## Examples

### Object.\__ExtendJs__

All data types are given an `__ExtendJs__` property with a value of `true` denoting
that ExtendJs is installed:

```javascript
console.log(false.__ExtendJs__);
// true
```

### Object.\__type__

```javascript
var obj = {};
console.log(obj.__type__);
// "Object"

var obj = Object;
console.log(obj.__type__);
// "Function" - This is true of all functions

var obj = Object();
console.log(obj.__type__);
// "Object"

var obj = new Object();
console.log(obj.__type__);
// "Object"

//----------------------------------------------------------------------------//

var obj = [];
console.log(obj.__type__);
// "Array" - This is correct for all Array instances

//----------------------------------------------------------------------------//

var obj = 0;
console.log(obj.__type__);
// "Number" - This is correct for both primitive and Object instances

//----------------------------------------------------------------------------//

var obj = true;
console.log(obj.__type__);
// "Boolean" - This is correct for both primitive and Object instances

//----------------------------------------------------------------------------//

var obj = null;
console.log(obj.__type__);
// TypeError: Cannot read property '__type__' of null

//----------------------------------------------------------------------------//

var obj = NaN;
console.log(obj.__type__);
// "NaN"

var obj = new Number('a');
console.log(obj.__type__);
// "NaN"

var obj = 2 / 'a';
console.log(obj.__type__);
// "NaN"
```

### Object.extend()

```javascript
var object1 = {
  apple: 0,
  banana: { weight: 52, price: 100 },
  cherry: 97
};
var object2 = {
  banana: { price: 200 },
  durian: 100
};

// Merge object2 into object1
Object.extend( object1, object2 );

console.log(JSON.stringify( object1 ))

// Output:
// {"apple":0,"banana":{"price":200},"cherry":97,"durian":100}

//----------------------------------------------------------------------------//

var object1 = {
  apple: 0,
  banana: { weight: 52, price: 100 },
  cherry: 97
};
var object2 = {
  banana: { price: 200 },
  durian: 100
};

// Merge object2 into object1, recursively
Object.extend( true, object1, object2 );
console.log(JSON.stringify( object1 ))

// Output:
// {"apple":0,"banana":{"price":200},"cherry":97,"durian":100}

//----------------------------------------------------------------------------//


var defaults = { validate: false, limit: 5, name: "foo" };
var options = { validate: true, name: "bar" };

// Merge defaults and options, without modifying defaults
var settings = Object.extend( {}, defaults, options );

console.log(JSON.stringify( defaults ))
console.log(JSON.stringify( options ))
console.log(JSON.stringify( settings ))

// Output:
// {"validate":false,"limit":5,"name":"foo"}
// {"validate":true,"name":"bar"}
// {"validate":true,"limit":5,"name":"bar"}
```

### Number.format()

```javascript
var num = 22 / 7 * 10000;

console.log(num.format());
// "31,428"

console.log(num.format(3));
// "31,428.571"

console.log(num.format(3, '+'));
// "31,428+571"

console.log(num.format(3, '+', '#'));
// "31#428+571"
```

### Date

```javascript
var date = new Date('2016-02-29 15:45:30');

//----------------------------------------------------------------------------//

console.log(date);
// "Thu Jan 01 2015 15:45:30 GMT-0700 (MST)"

console.log(date.format('l M d, Y g:ia'));
// "Monday Jan 01, 2015 3:45pm"

date.localize('full', 'Monday', 'Lunes')
console.log(date.format('l M d, Y g:ia'));
// "Lunes Feb 29, 2016 3:45pm"

//----------------------------------------------------------------------------//

console.log(date.getDayOfYear());
// 60

console.log(date.getDaysInMonth());
// 29

console.log(date.getWeekOfYear());
// 9

console.log(date.isDst());
// false

console.log(date.isLeapYear());
// true
```

### Ip

```javascript
var ip = new Ip('200.200.200.200');

console.log(ip.toLong());
// 3368601800

console.log(ip.toSignedLong());
// -926365496
```

## Contributing

### Using the issue tracker

The [issue tracker](https://github.com/mkenney/ExtendJs/issues) is the preferred
channel for bug reports, features requests and submitting pull requests, but
please respect the following restrictions:

* Please **do not** use the issue tracker for personal support requests.

* Please **do not** derail or troll issues. Keep the discussion on topic and
  respect the opinions of others.

#### Bug reports

A bug is a _demonstrable problem_ that is caused by the code in the repository.
Good bug reports are extremely helpful!

Guidelines for bug reports:

0. **Validate and lint your code** &mdash; [lint your JS code](http://jshint.com/)
   to ensure your problem isn't caused by an error in your own code.

1. **[Use the GitHub issue search](https://github.com/mkenney/ExtendJs/issues)** &mdash; check if the issue has already been
   reported.

2. **Check if the issue has been fixed** &mdash; try to reproduce it using the
   latest `master` branch in the repository

3. **Isolate the problem** &mdash; ideally create a [reduced test
   case](http://css-tricks.com/6263-reduced-test-cases/) and a [live example](http://jsfiddle.net/).


Example:

> Short and descriptive example bug report title
>
> A summary of the issue and the browser/OS environment in which it occurs. If
> suitable, include the steps required to reproduce the bug.
>
> 1. This is the first step
> 2. This is the second step
> 3. Further steps, etc.
>
> `<url>` - a link to the reduced test case or live example
>
> Any other information you want to share that is relevant to the issue being
> reported. This might include the lines of code that you have identified as
> causing the bug, and potential solutions (and your opinions on their
> merits).

## Versioning

For transparency and in striving to maintain backward compatibility, ExtendJs is
maintained under [the Semantic Versioning guidelines](http://semver.org/).  I'll
adhere to those rules whenever possible.

## Creator

**Michael Kenney**

- <https://github.com/mkenney>
- <https://www.linkedin.com/in/michaelkenney>


## Copyright and license

Code and documentation copyright 2014-2015 Michael Kenney. Released under
[the MIT license](https://github.com/mkenney/ExtendJs/blob/master/LICENSE).

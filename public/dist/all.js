/*!
 * jQuery JavaScript Library v3.1.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2016-09-22T22:30Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};



	function DOMEval( code, doc ) {
		doc = doc || document;

		var script = doc.createElement( "script" );

		script.text = code;
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.1.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {

		// As of jQuery 3.0, isNumeric is limited to
		// strings and numbers (primitives or objects)
		// that can be coerced to finite numbers (gh-2662)
		var type = jQuery.type( obj );
		return ( type === "number" || type === "string" ) &&

			// parseFloat NaNs numeric-cast false positives ("")
			// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
			// subtraction forces infinities to NaN
			!isNaN( obj - parseFloat( obj ) );
	},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}

		// Support: Android <=2.3 only (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE <=9 - 11, Edge 12 - 13
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Simple selector that can be filtered directly, removing non-Elements
	if ( risSimple.test( qualifier ) ) {
		return jQuery.filter( qualifier, elements, not );
	}

	// Complex selector, compare the two sets, removing non-Elements
	qualifier = jQuery.filter( qualifier, elements );
	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) > -1 ) !== not && elem.nodeType === 1;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && jQuery.isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && jQuery.isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Support: Android 4.0 only
			// Strict mode functions invoked without .call/.apply get global-object context
			resolve.call( undefined, value );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.call( undefined, value );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = jQuery.isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( jQuery.isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								jQuery.isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				jQuery.isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ jQuery.camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ jQuery.camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ jQuery.camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( jQuery.camelCase );
			} else {
				key = jQuery.camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && jQuery.nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: jQuery.isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

function manipulationTarget( elem, content ) {
	if ( jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return elem.getElementsByTagName( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		div.style.cssText =
			"box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";
		div.innerHTML = "";
		documentElement.appendChild( container );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = divStyle.marginLeft === "2px";
		boxSizingReliableVal = divStyle.width === "4px";

		// Support: Android 4.0 - 4.3 only
		// Some styles come back with percentage values, even though they shouldn't
		div.style.marginRight = "50%";
		pixelMarginRightVal = divStyle.marginRight === "4px";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	var pixelPositionVal, boxSizingReliableVal, pixelMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	container.appendChild( div );

	jQuery.extend( support, {
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelMarginRight: function() {
			computeStyleTests();
			return pixelMarginRightVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE <=9 only
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i,
		val = 0;

	// If we already have the right measurement, avoid augmentation
	if ( extra === ( isBorderBox ? "border" : "content" ) ) {
		i = 4;

	// Otherwise initialize for horizontal or vertical properties
	} else {
		i = name === "width" ? 1 : 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var val,
		valueIsBorderBox = true,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE <=11 only
	// Running getBoundingClientRect on a disconnected node
	// in IE throws an error.
	if ( elem.getClientRects().length ) {
		val = elem.getBoundingClientRect()[ name ];
	}

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				style[ name ] = value;
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = extra && getStyles( elem ),
				subtract = extra && augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				);

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ name ] = value;
				value = jQuery.css( elem, name );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function raf() {
	if ( timerId ) {
		window.requestAnimationFrame( raf );
		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 13
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	// Go to the end state if fx are off or if document is hidden
	if ( jQuery.fx.off || document.hidden ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.requestAnimationFrame ?
			window.requestAnimationFrame( raf ) :
			window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	if ( window.cancelAnimationFrame ) {
		window.cancelAnimationFrame( timerId );
	} else {
		window.clearInterval( timerId );
	}

	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://html.spec.whatwg.org/multipage/infrastructure.html#strip-and-collapse-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnothtmlwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnothtmlwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/;

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




support.focusin = "onfocusin" in window;


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = jQuery.isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( jQuery.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 13
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( jQuery.isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win, rect, doc,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		rect = elem.getBoundingClientRect();

		// Make sure element is not hidden (display: none)
		if ( rect.width || rect.height ) {
			doc = elem.ownerDocument;
			win = getWindow( doc );
			docElem = doc.documentElement;

			return {
				top: rect.top + win.pageYOffset - docElem.clientTop,
				left: rect.left + win.pageXOffset - docElem.clientLeft
			};
		}

		// Return zeros for disconnected and hidden elements (gh-2310)
		return rect;
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset = {
				top: parentOffset.top + jQuery.css( offsetParent[ 0 ], "borderTopWidth", true ),
				left: parentOffset.left + jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true )
			};
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

jQuery.parseJSON = JSON.parse;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}





return jQuery;
} );

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var arguments$1 = arguments;\n\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments$1[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzPzgzOTIiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOyIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ },
/* 1 */
/***/ function(module, exports) {

eval("module.exports = function(module) {\r\n\tif(!module.webpackPolyfill) {\r\n\t\tmodule.deprecate = function() {};\r\n\t\tmodule.paths = [];\r\n\t\t// module.parent = undefined by default\r\n\t\tif(!module.children) module.children = [];\r\n\t\tObject.defineProperty(module, \"loaded\", {\r\n\t\t\tenumerable: true,\r\n\t\t\tconfigurable: false,\r\n\t\t\tget: function() { return module.l; }\r\n\t\t});\r\n\t\tObject.defineProperty(module, \"id\", {\r\n\t\t\tenumerable: true,\r\n\t\t\tconfigurable: false,\r\n\t\t\tget: function() { return module.i; }\r\n\t\t});\r\n\t\tmodule.webpackPolyfill = 1;\r\n\t}\r\n\treturn module;\r\n}\r\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMS5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9ub2RlX21vZHVsZXMvd2VicGFjay9idWlsZGluL21vZHVsZS5qcz9lZjUxIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0bW9kdWxlLnBhdGhzID0gW107XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdGlmKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbW9kdWxlLmw7IH1cclxuXHRcdH0pO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBtb2R1bGUuaTsgfVxyXG5cdFx0fSk7XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gbm9kZV9tb2R1bGVzL3dlYnBhY2svYnVpbGRpbi9tb2R1bGUuanMiXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTsiLCJzb3VyY2VSb290IjoiIn0=");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(process, module) {var __WEBPACK_AMD_DEFINE_RESULT__;/*!\n * QUnit 1.20.0\n * http://qunitjs.com/\n *\n * Copyright jQuery Foundation and other contributors\n * Released under the MIT license\n * http://jquery.org/license\n *\n * Date: 2015-10-27T17:53Z\n */\n\n(function( global ) {\n\nvar QUnit = {};\n\nvar Date = global.Date;\nvar now = Date.now || function() {\n\treturn new Date().getTime();\n};\n\nvar setTimeout = global.setTimeout;\nvar clearTimeout = global.clearTimeout;\n\n// Store a local window from the global to allow direct references.\nvar window = global.window;\n\nvar defined = {\n\tdocument: window && window.document !== undefined,\n\tsetTimeout: setTimeout !== undefined,\n\tsessionStorage: (function() {\n\t\tvar x = \"qunit-test-string\";\n\t\ttry {\n\t\t\tsessionStorage.setItem( x, x );\n\t\t\tsessionStorage.removeItem( x );\n\t\t\treturn true;\n\t\t} catch ( e ) {\n\t\t\treturn false;\n\t\t}\n\t}() )\n};\n\nvar fileName = ( sourceFromStacktrace( 0 ) || \"\" ).replace( /(:\\d+)+\\)?/, \"\" ).replace( /.+\\//, \"\" );\nvar globalStartCalled = false;\nvar runStarted = false;\n\nvar toString = Object.prototype.toString,\n\thasOwn = Object.prototype.hasOwnProperty;\n\n// returns a new Array with the elements that are in a but not in b\nfunction diff( a, b ) {\n\tvar i, j,\n\t\tresult = a.slice();\n\n\tfor ( i = 0; i < result.length; i++ ) {\n\t\tfor ( j = 0; j < b.length; j++ ) {\n\t\t\tif ( result[ i ] === b[ j ] ) {\n\t\t\t\tresult.splice( i, 1 );\n\t\t\t\ti--;\n\t\t\t\tbreak;\n\t\t\t}\n\t\t}\n\t}\n\treturn result;\n}\n\n// from jquery.js\nfunction inArray( elem, array ) {\n\tif ( array.indexOf ) {\n\t\treturn array.indexOf( elem );\n\t}\n\n\tfor ( var i = 0, length = array.length; i < length; i++ ) {\n\t\tif ( array[ i ] === elem ) {\n\t\t\treturn i;\n\t\t}\n\t}\n\n\treturn -1;\n}\n\n/**\n * Makes a clone of an object using only Array or Object as base,\n * and copies over the own enumerable properties.\n *\n * @param {Object} obj\n * @return {Object} New object with only the own properties (recursively).\n */\nfunction objectValues ( obj ) {\n\tvar key, val,\n\t\tvals = QUnit.is( \"array\", obj ) ? [] : {};\n\tfor ( key in obj ) {\n\t\tif ( hasOwn.call( obj, key ) ) {\n\t\t\tval = obj[ key ];\n\t\t\tvals[ key ] = val === Object( val ) ? objectValues( val ) : val;\n\t\t}\n\t}\n\treturn vals;\n}\n\nfunction extend( a, b, undefOnly ) {\n\tfor ( var prop in b ) {\n\t\tif ( hasOwn.call( b, prop ) ) {\n\n\t\t\t// Avoid \"Member not found\" error in IE8 caused by messing with window.constructor\n\t\t\t// This block runs on every environment, so `global` is being used instead of `window`\n\t\t\t// to avoid errors on node.\n\t\t\tif ( prop !== \"constructor\" || a !== global ) {\n\t\t\t\tif ( b[ prop ] === undefined ) {\n\t\t\t\t\tdelete a[ prop ];\n\t\t\t\t} else if ( !( undefOnly && typeof a[ prop ] !== \"undefined\" ) ) {\n\t\t\t\t\ta[ prop ] = b[ prop ];\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\treturn a;\n}\n\nfunction objectType( obj ) {\n\tif ( typeof obj === \"undefined\" ) {\n\t\treturn \"undefined\";\n\t}\n\n\t// Consider: typeof null === object\n\tif ( obj === null ) {\n\t\treturn \"null\";\n\t}\n\n\tvar match = toString.call( obj ).match( /^\\[object\\s(.*)\\]$/ ),\n\t\ttype = match && match[ 1 ];\n\n\tswitch ( type ) {\n\t\tcase \"Number\":\n\t\t\tif ( isNaN( obj ) ) {\n\t\t\t\treturn \"nan\";\n\t\t\t}\n\t\t\treturn \"number\";\n\t\tcase \"String\":\n\t\tcase \"Boolean\":\n\t\tcase \"Array\":\n\t\tcase \"Set\":\n\t\tcase \"Map\":\n\t\tcase \"Date\":\n\t\tcase \"RegExp\":\n\t\tcase \"Function\":\n\t\tcase \"Symbol\":\n\t\t\treturn type.toLowerCase();\n\t}\n\tif ( typeof obj === \"object\" ) {\n\t\treturn \"object\";\n\t}\n}\n\n// Safe object type checking\nfunction is( type, obj ) {\n\treturn QUnit.objectType( obj ) === type;\n}\n\nvar getUrlParams = function() {\n\tvar i, current;\n\tvar urlParams = {};\n\tvar location = window.location;\n\tvar params = location.search.slice( 1 ).split( \"&\" );\n\tvar length = params.length;\n\n\tif ( params[ 0 ] ) {\n\t\tfor ( i = 0; i < length; i++ ) {\n\t\t\tcurrent = params[ i ].split( \"=\" );\n\t\t\tcurrent[ 0 ] = decodeURIComponent( current[ 0 ] );\n\n\t\t\t// allow just a key to turn on a flag, e.g., test.html?noglobals\n\t\t\tcurrent[ 1 ] = current[ 1 ] ? decodeURIComponent( current[ 1 ] ) : true;\n\t\t\tif ( urlParams[ current[ 0 ] ] ) {\n\t\t\t\turlParams[ current[ 0 ] ] = [].concat( urlParams[ current[ 0 ] ], current[ 1 ] );\n\t\t\t} else {\n\t\t\t\turlParams[ current[ 0 ] ] = current[ 1 ];\n\t\t\t}\n\t\t}\n\t}\n\n\treturn urlParams;\n};\n\n// Doesn't support IE6 to IE9, it will return undefined on these browsers\n// See also https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects/Error/Stack\nfunction extractStacktrace( e, offset ) {\n\toffset = offset === undefined ? 4 : offset;\n\n\tvar stack, include, i;\n\n\tif ( e.stack ) {\n\t\tstack = e.stack.split( \"\\n\" );\n\t\tif ( /^error$/i.test( stack[ 0 ] ) ) {\n\t\t\tstack.shift();\n\t\t}\n\t\tif ( fileName ) {\n\t\t\tinclude = [];\n\t\t\tfor ( i = offset; i < stack.length; i++ ) {\n\t\t\t\tif ( stack[ i ].indexOf( fileName ) !== -1 ) {\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t\tinclude.push( stack[ i ] );\n\t\t\t}\n\t\t\tif ( include.length ) {\n\t\t\t\treturn include.join( \"\\n\" );\n\t\t\t}\n\t\t}\n\t\treturn stack[ offset ];\n\n\t// Support: Safari <=6 only\n\t} else if ( e.sourceURL ) {\n\n\t\t// exclude useless self-reference for generated Error objects\n\t\tif ( /qunit.js$/.test( e.sourceURL ) ) {\n\t\t\treturn;\n\t\t}\n\n\t\t// for actual exceptions, this is useful\n\t\treturn e.sourceURL + \":\" + e.line;\n\t}\n}\n\nfunction sourceFromStacktrace( offset ) {\n\tvar error = new Error();\n\n\t// Support: Safari <=7 only, IE <=10 - 11 only\n\t// Not all browsers generate the `stack` property for `new Error()`, see also #636\n\tif ( !error.stack ) {\n\t\ttry {\n\t\t\tthrow error;\n\t\t} catch ( err ) {\n\t\t\terror = err;\n\t\t}\n\t}\n\n\treturn extractStacktrace( error, offset );\n}\n\n/**\n * Config object: Maintain internal state\n * Later exposed as QUnit.config\n * `config` initialized at top of scope\n */\nvar config = {\n\t// The queue of tests to run\n\tqueue: [],\n\n\t// block until document ready\n\tblocking: true,\n\n\t// by default, run previously failed tests first\n\t// very useful in combination with \"Hide passed tests\" checked\n\treorder: true,\n\n\t// by default, modify document.title when suite is done\n\taltertitle: true,\n\n\t// HTML Reporter: collapse every test except the first failing test\n\t// If false, all failing tests will be expanded\n\tcollapse: true,\n\n\t// by default, scroll to top of the page when suite is done\n\tscrolltop: true,\n\n\t// depth up-to which object will be dumped\n\tmaxDepth: 5,\n\n\t// when enabled, all tests must call expect()\n\trequireExpects: false,\n\n\t// add checkboxes that are persisted in the query-string\n\t// when enabled, the id is set to `true` as a `QUnit.config` property\n\turlConfig: [\n\t\t{\n\t\t\tid: \"hidepassed\",\n\t\t\tlabel: \"Hide passed tests\",\n\t\t\ttooltip: \"Only show tests and assertions that fail. Stored as query-strings.\"\n\t\t},\n\t\t{\n\t\t\tid: \"noglobals\",\n\t\t\tlabel: \"Check for Globals\",\n\t\t\ttooltip: \"Enabling this will test if any test introduces new properties on the \" +\n\t\t\t\t\"global object (`window` in Browsers). Stored as query-strings.\"\n\t\t},\n\t\t{\n\t\t\tid: \"notrycatch\",\n\t\t\tlabel: \"No try-catch\",\n\t\t\ttooltip: \"Enabling this will run tests outside of a try-catch block. Makes debugging \" +\n\t\t\t\t\"exceptions in IE reasonable. Stored as query-strings.\"\n\t\t}\n\t],\n\n\t// Set of all modules.\n\tmodules: [],\n\n\t// Stack of nested modules\n\tmoduleStack: [],\n\n\t// The first unnamed module\n\tcurrentModule: {\n\t\tname: \"\",\n\t\ttests: []\n\t},\n\n\tcallbacks: {}\n};\n\nvar urlParams = defined.document ? getUrlParams() : {};\n\n// Push a loose unnamed module to the modules collection\nconfig.modules.push( config.currentModule );\n\nif ( urlParams.filter === true ) {\n\tdelete urlParams.filter;\n}\n\n// String search anywhere in moduleName+testName\nconfig.filter = urlParams.filter;\n\nconfig.testId = [];\nif ( urlParams.testId ) {\n\t// Ensure that urlParams.testId is an array\n\turlParams.testId = decodeURIComponent( urlParams.testId ).split( \",\" );\n\tfor (var i = 0; i < urlParams.testId.length; i++ ) {\n\t\tconfig.testId.push( urlParams.testId[ i ] );\n\t}\n}\n\nvar loggingCallbacks = {};\n\n// Register logging callbacks\nfunction registerLoggingCallbacks( obj ) {\n\tvar i, l, key,\n\t\tcallbackNames = [ \"begin\", \"done\", \"log\", \"testStart\", \"testDone\",\n\t\t\t\"moduleStart\", \"moduleDone\" ];\n\n\tfunction registerLoggingCallback( key ) {\n\t\tvar loggingCallback = function( callback ) {\n\t\t\tif ( objectType( callback ) !== \"function\" ) {\n\t\t\t\tthrow new Error(\n\t\t\t\t\t\"QUnit logging methods require a callback function as their first parameters.\"\n\t\t\t\t);\n\t\t\t}\n\n\t\t\tconfig.callbacks[ key ].push( callback );\n\t\t};\n\n\t\t// DEPRECATED: This will be removed on QUnit 2.0.0+\n\t\t// Stores the registered functions allowing restoring\n\t\t// at verifyLoggingCallbacks() if modified\n\t\tloggingCallbacks[ key ] = loggingCallback;\n\n\t\treturn loggingCallback;\n\t}\n\n\tfor ( i = 0, l = callbackNames.length; i < l; i++ ) {\n\t\tkey = callbackNames[ i ];\n\n\t\t// Initialize key collection of logging callback\n\t\tif ( objectType( config.callbacks[ key ] ) === \"undefined\" ) {\n\t\t\tconfig.callbacks[ key ] = [];\n\t\t}\n\n\t\tobj[ key ] = registerLoggingCallback( key );\n\t}\n}\n\nfunction runLoggingCallbacks( key, args ) {\n\tvar i, l, callbacks;\n\n\tcallbacks = config.callbacks[ key ];\n\tfor ( i = 0, l = callbacks.length; i < l; i++ ) {\n\t\tcallbacks[ i ]( args );\n\t}\n}\n\n// DEPRECATED: This will be removed on 2.0.0+\n// This function verifies if the loggingCallbacks were modified by the user\n// If so, it will restore it, assign the given callback and print a console warning\nfunction verifyLoggingCallbacks() {\n\tvar loggingCallback, userCallback;\n\n\tfor ( loggingCallback in loggingCallbacks ) {\n\t\tif ( QUnit[ loggingCallback ] !== loggingCallbacks[ loggingCallback ] ) {\n\n\t\t\tuserCallback = QUnit[ loggingCallback ];\n\n\t\t\t// Restore the callback function\n\t\t\tQUnit[ loggingCallback ] = loggingCallbacks[ loggingCallback ];\n\n\t\t\t// Assign the deprecated given callback\n\t\t\tQUnit[ loggingCallback ]( userCallback );\n\n\t\t\tif ( global.console && global.console.warn ) {\n\t\t\t\tglobal.console.warn(\n\t\t\t\t\t\"QUnit.\" + loggingCallback + \" was replaced with a new value.\\n\" +\n\t\t\t\t\t\"Please, check out the documentation on how to apply logging callbacks.\\n\" +\n\t\t\t\t\t\"Reference: http://api.qunitjs.com/category/callbacks/\"\n\t\t\t\t);\n\t\t\t}\n\t\t}\n\t}\n}\n\n( function() {\n\tif ( !defined.document ) {\n\t\treturn;\n\t}\n\n\t// `onErrorFnPrev` initialized at top of scope\n\t// Preserve other handlers\n\tvar onErrorFnPrev = window.onerror;\n\n\t// Cover uncaught exceptions\n\t// Returning true will suppress the default browser handler,\n\t// returning false will let it run.\n\twindow.onerror = function( error, filePath, linerNr ) {\n\t\tvar ret = false;\n\t\tif ( onErrorFnPrev ) {\n\t\t\tret = onErrorFnPrev( error, filePath, linerNr );\n\t\t}\n\n\t\t// Treat return value as window.onerror itself does,\n\t\t// Only do our handling if not suppressed.\n\t\tif ( ret !== true ) {\n\t\t\tif ( QUnit.config.current ) {\n\t\t\t\tif ( QUnit.config.current.ignoreGlobalErrors ) {\n\t\t\t\t\treturn true;\n\t\t\t\t}\n\t\t\t\tQUnit.pushFailure( error, filePath + \":\" + linerNr );\n\t\t\t} else {\n\t\t\t\tQUnit.test( \"global failure\", extend(function() {\n\t\t\t\t\tQUnit.pushFailure( error, filePath + \":\" + linerNr );\n\t\t\t\t}, { validTest: true } ) );\n\t\t\t}\n\t\t\treturn false;\n\t\t}\n\n\t\treturn ret;\n\t};\n} )();\n\nQUnit.urlParams = urlParams;\n\n// Figure out if we're running the tests from a server or not\nQUnit.isLocal = !( defined.document && window.location.protocol !== \"file:\" );\n\n// Expose the current QUnit version\nQUnit.version = \"1.20.0\";\n\nextend( QUnit, {\n\n\t// call on start of module test to prepend name to all tests\n\tmodule: function( name, testEnvironment, executeNow ) {\n\t\tvar module, moduleFns;\n\t\tvar currentModule = config.currentModule;\n\n\t\tif ( arguments.length === 2 ) {\n\t\t\tif ( testEnvironment instanceof Function ) {\n\t\t\t\texecuteNow = testEnvironment;\n\t\t\t\ttestEnvironment = undefined;\n\t\t\t}\n\t\t}\n\n\t\t// DEPRECATED: handles setup/teardown functions,\n\t\t// beforeEach and afterEach should be used instead\n\t\tif ( testEnvironment && testEnvironment.setup ) {\n\t\t\ttestEnvironment.beforeEach = testEnvironment.setup;\n\t\t\tdelete testEnvironment.setup;\n\t\t}\n\t\tif ( testEnvironment && testEnvironment.teardown ) {\n\t\t\ttestEnvironment.afterEach = testEnvironment.teardown;\n\t\t\tdelete testEnvironment.teardown;\n\t\t}\n\n\t\tmodule = createModule();\n\n\t\tmoduleFns = {\n\t\t\tbeforeEach: setHook( module, \"beforeEach\" ),\n\t\t\tafterEach: setHook( module, \"afterEach\" )\n\t\t};\n\n\t\tif ( executeNow instanceof Function ) {\n\t\t\tconfig.moduleStack.push( module );\n\t\t\tsetCurrentModule( module );\n\t\t\texecuteNow.call( module.testEnvironment, moduleFns );\n\t\t\tconfig.moduleStack.pop();\n\t\t\tmodule = module.parentModule || currentModule;\n\t\t}\n\n\t\tsetCurrentModule( module );\n\n\t\tfunction createModule() {\n\t\t\tvar parentModule = config.moduleStack.length ?\n\t\t\t\tconfig.moduleStack.slice( -1 )[ 0 ] : null;\n\t\t\tvar moduleName = parentModule !== null ?\n\t\t\t\t[ parentModule.name, name ].join( \" > \" ) : name;\n\t\t\tvar module = {\n\t\t\t\tname: moduleName,\n\t\t\t\tparentModule: parentModule,\n\t\t\t\ttests: []\n\t\t\t};\n\n\t\t\tvar env = {};\n\t\t\tif ( parentModule ) {\n\t\t\t\textend( env, parentModule.testEnvironment );\n\t\t\t\tdelete env.beforeEach;\n\t\t\t\tdelete env.afterEach;\n\t\t\t}\n\t\t\textend( env, testEnvironment );\n\t\t\tmodule.testEnvironment = env;\n\n\t\t\tconfig.modules.push( module );\n\t\t\treturn module;\n\t\t}\n\n\t\tfunction setCurrentModule( module ) {\n\t\t\tconfig.currentModule = module;\n\t\t}\n\n\t},\n\n\t// DEPRECATED: QUnit.asyncTest() will be removed in QUnit 2.0.\n\tasyncTest: asyncTest,\n\n\ttest: test,\n\n\tskip: skip,\n\n\tonly: only,\n\n\t// DEPRECATED: The functionality of QUnit.start() will be altered in QUnit 2.0.\n\t// In QUnit 2.0, invoking it will ONLY affect the `QUnit.config.autostart` blocking behavior.\n\tstart: function( count ) {\n\t\tvar globalStartAlreadyCalled = globalStartCalled;\n\n\t\tif ( !config.current ) {\n\t\t\tglobalStartCalled = true;\n\n\t\t\tif ( runStarted ) {\n\t\t\t\tthrow new Error( \"Called start() outside of a test context while already started\" );\n\t\t\t} else if ( globalStartAlreadyCalled || count > 1 ) {\n\t\t\t\tthrow new Error( \"Called start() outside of a test context too many times\" );\n\t\t\t} else if ( config.autostart ) {\n\t\t\t\tthrow new Error( \"Called start() outside of a test context when \" +\n\t\t\t\t\t\"QUnit.config.autostart was true\" );\n\t\t\t} else if ( !config.pageLoaded ) {\n\n\t\t\t\t// The page isn't completely loaded yet, so bail out and let `QUnit.load` handle it\n\t\t\t\tconfig.autostart = true;\n\t\t\t\treturn;\n\t\t\t}\n\t\t} else {\n\n\t\t\t// If a test is running, adjust its semaphore\n\t\t\tconfig.current.semaphore -= count || 1;\n\n\t\t\t// If semaphore is non-numeric, throw error\n\t\t\tif ( isNaN( config.current.semaphore ) ) {\n\t\t\t\tconfig.current.semaphore = 0;\n\n\t\t\t\tQUnit.pushFailure(\n\t\t\t\t\t\"Called start() with a non-numeric decrement.\",\n\t\t\t\t\tsourceFromStacktrace( 2 )\n\t\t\t\t);\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t// Don't start until equal number of stop-calls\n\t\t\tif ( config.current.semaphore > 0 ) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\t// throw an Error if start is called more often than stop\n\t\t\tif ( config.current.semaphore < 0 ) {\n\t\t\t\tconfig.current.semaphore = 0;\n\n\t\t\t\tQUnit.pushFailure(\n\t\t\t\t\t\"Called start() while already started (test's semaphore was 0 already)\",\n\t\t\t\t\tsourceFromStacktrace( 2 )\n\t\t\t\t);\n\t\t\t\treturn;\n\t\t\t}\n\t\t}\n\n\t\tresumeProcessing();\n\t},\n\n\t// DEPRECATED: QUnit.stop() will be removed in QUnit 2.0.\n\tstop: function( count ) {\n\n\t\t// If there isn't a test running, don't allow QUnit.stop() to be called\n\t\tif ( !config.current ) {\n\t\t\tthrow new Error( \"Called stop() outside of a test context\" );\n\t\t}\n\n\t\t// If a test is running, adjust its semaphore\n\t\tconfig.current.semaphore += count || 1;\n\n\t\tpauseProcessing();\n\t},\n\n\tconfig: config,\n\n\tis: is,\n\n\tobjectType: objectType,\n\n\textend: extend,\n\n\tload: function() {\n\t\tconfig.pageLoaded = true;\n\n\t\t// Initialize the configuration options\n\t\textend( config, {\n\t\t\tstats: { all: 0, bad: 0 },\n\t\t\tmoduleStats: { all: 0, bad: 0 },\n\t\t\tstarted: 0,\n\t\t\tupdateRate: 1000,\n\t\t\tautostart: true,\n\t\t\tfilter: \"\"\n\t\t}, true );\n\n\t\tconfig.blocking = false;\n\n\t\tif ( config.autostart ) {\n\t\t\tresumeProcessing();\n\t\t}\n\t},\n\n\tstack: function( offset ) {\n\t\toffset = ( offset || 0 ) + 2;\n\t\treturn sourceFromStacktrace( offset );\n\t}\n});\n\nregisterLoggingCallbacks( QUnit );\n\nfunction begin() {\n\tvar i, l,\n\t\tmodulesLog = [];\n\n\t// If the test run hasn't officially begun yet\n\tif ( !config.started ) {\n\n\t\t// Record the time of the test run's beginning\n\t\tconfig.started = now();\n\n\t\tverifyLoggingCallbacks();\n\n\t\t// Delete the loose unnamed module if unused.\n\t\tif ( config.modules[ 0 ].name === \"\" && config.modules[ 0 ].tests.length === 0 ) {\n\t\t\tconfig.modules.shift();\n\t\t}\n\n\t\t// Avoid unnecessary information by not logging modules' test environments\n\t\tfor ( i = 0, l = config.modules.length; i < l; i++ ) {\n\t\t\tmodulesLog.push({\n\t\t\t\tname: config.modules[ i ].name,\n\t\t\t\ttests: config.modules[ i ].tests\n\t\t\t});\n\t\t}\n\n\t\t// The test run is officially beginning now\n\t\trunLoggingCallbacks( \"begin\", {\n\t\t\ttotalTests: Test.count,\n\t\t\tmodules: modulesLog\n\t\t});\n\t}\n\n\tconfig.blocking = false;\n\tprocess( true );\n}\n\nfunction process( last ) {\n\tfunction next() {\n\t\tprocess( last );\n\t}\n\tvar start = now();\n\tconfig.depth = ( config.depth || 0 ) + 1;\n\n\twhile ( config.queue.length && !config.blocking ) {\n\t\tif ( !defined.setTimeout || config.updateRate <= 0 ||\n\t\t\t\t( ( now() - start ) < config.updateRate ) ) {\n\t\t\tif ( config.current ) {\n\n\t\t\t\t// Reset async tracking for each phase of the Test lifecycle\n\t\t\t\tconfig.current.usedAsync = false;\n\t\t\t}\n\t\t\tconfig.queue.shift()();\n\t\t} else {\n\t\t\tsetTimeout( next, 13 );\n\t\t\tbreak;\n\t\t}\n\t}\n\tconfig.depth--;\n\tif ( last && !config.blocking && !config.queue.length && config.depth === 0 ) {\n\t\tdone();\n\t}\n}\n\nfunction pauseProcessing() {\n\tconfig.blocking = true;\n\n\tif ( config.testTimeout && defined.setTimeout ) {\n\t\tclearTimeout( config.timeout );\n\t\tconfig.timeout = setTimeout(function() {\n\t\t\tif ( config.current ) {\n\t\t\t\tconfig.current.semaphore = 0;\n\t\t\t\tQUnit.pushFailure( \"Test timed out\", sourceFromStacktrace( 2 ) );\n\t\t\t} else {\n\t\t\t\tthrow new Error( \"Test timed out\" );\n\t\t\t}\n\t\t\tresumeProcessing();\n\t\t}, config.testTimeout );\n\t}\n}\n\nfunction resumeProcessing() {\n\trunStarted = true;\n\n\t// A slight delay to allow this iteration of the event loop to finish (more assertions, etc.)\n\tif ( defined.setTimeout ) {\n\t\tsetTimeout(function() {\n\t\t\tif ( config.current && config.current.semaphore > 0 ) {\n\t\t\t\treturn;\n\t\t\t}\n\t\t\tif ( config.timeout ) {\n\t\t\t\tclearTimeout( config.timeout );\n\t\t\t}\n\n\t\t\tbegin();\n\t\t}, 13 );\n\t} else {\n\t\tbegin();\n\t}\n}\n\nfunction done() {\n\tvar runtime, passed;\n\n\tconfig.autorun = true;\n\n\t// Log the last module results\n\tif ( config.previousModule ) {\n\t\trunLoggingCallbacks( \"moduleDone\", {\n\t\t\tname: config.previousModule.name,\n\t\t\ttests: config.previousModule.tests,\n\t\t\tfailed: config.moduleStats.bad,\n\t\t\tpassed: config.moduleStats.all - config.moduleStats.bad,\n\t\t\ttotal: config.moduleStats.all,\n\t\t\truntime: now() - config.moduleStats.started\n\t\t});\n\t}\n\tdelete config.previousModule;\n\n\truntime = now() - config.started;\n\tpassed = config.stats.all - config.stats.bad;\n\n\trunLoggingCallbacks( \"done\", {\n\t\tfailed: config.stats.bad,\n\t\tpassed: passed,\n\t\ttotal: config.stats.all,\n\t\truntime: runtime\n\t});\n}\n\nfunction setHook( module, hookName ) {\n\tif ( module.testEnvironment === undefined ) {\n\t\tmodule.testEnvironment = {};\n\t}\n\n\treturn function( callback ) {\n\t\tmodule.testEnvironment[ hookName ] = callback;\n\t};\n}\n\nvar focused = false;\n\nfunction Test( settings ) {\n\tvar this$1 = this;\n\n\tvar i, l;\n\n\t++Test.count;\n\n\textend( this, settings );\n\tthis.assertions = [];\n\tthis.semaphore = 0;\n\tthis.usedAsync = false;\n\tthis.module = config.currentModule;\n\tthis.stack = sourceFromStacktrace( 3 );\n\n\t// Register unique strings\n\tfor ( i = 0, l = this.module.tests; i < l.length; i++ ) {\n\t\tif ( this$1.module.tests[ i ].name === this$1.testName ) {\n\t\t\tthis$1.testName += \" \";\n\t\t}\n\t}\n\n\tthis.testId = generateHash( this.module.name, this.testName );\n\n\tthis.module.tests.push({\n\t\tname: this.testName,\n\t\ttestId: this.testId\n\t});\n\n\tif ( settings.skip ) {\n\n\t\t// Skipped tests will fully ignore any sent callback\n\t\tthis.callback = function() {};\n\t\tthis.async = false;\n\t\tthis.expected = 0;\n\t} else {\n\t\tthis.assert = new Assert( this );\n\t}\n}\n\nTest.count = 0;\n\nTest.prototype = {\n\tbefore: function() {\n\t\tif (\n\n\t\t\t// Emit moduleStart when we're switching from one module to another\n\t\t\tthis.module !== config.previousModule ||\n\n\t\t\t\t// They could be equal (both undefined) but if the previousModule property doesn't\n\t\t\t\t// yet exist it means this is the first test in a suite that isn't wrapped in a\n\t\t\t\t// module, in which case we'll just emit a moduleStart event for 'undefined'.\n\t\t\t\t// Without this, reporters can get testStart before moduleStart  which is a problem.\n\t\t\t\t!hasOwn.call( config, \"previousModule\" )\n\t\t) {\n\t\t\tif ( hasOwn.call( config, \"previousModule\" ) ) {\n\t\t\t\trunLoggingCallbacks( \"moduleDone\", {\n\t\t\t\t\tname: config.previousModule.name,\n\t\t\t\t\ttests: config.previousModule.tests,\n\t\t\t\t\tfailed: config.moduleStats.bad,\n\t\t\t\t\tpassed: config.moduleStats.all - config.moduleStats.bad,\n\t\t\t\t\ttotal: config.moduleStats.all,\n\t\t\t\t\truntime: now() - config.moduleStats.started\n\t\t\t\t});\n\t\t\t}\n\t\t\tconfig.previousModule = this.module;\n\t\t\tconfig.moduleStats = { all: 0, bad: 0, started: now() };\n\t\t\trunLoggingCallbacks( \"moduleStart\", {\n\t\t\t\tname: this.module.name,\n\t\t\t\ttests: this.module.tests\n\t\t\t});\n\t\t}\n\n\t\tconfig.current = this;\n\n\t\tif ( this.module.testEnvironment ) {\n\t\t\tdelete this.module.testEnvironment.beforeEach;\n\t\t\tdelete this.module.testEnvironment.afterEach;\n\t\t}\n\t\tthis.testEnvironment = extend( {}, this.module.testEnvironment );\n\n\t\tthis.started = now();\n\t\trunLoggingCallbacks( \"testStart\", {\n\t\t\tname: this.testName,\n\t\t\tmodule: this.module.name,\n\t\t\ttestId: this.testId\n\t\t});\n\n\t\tif ( !config.pollution ) {\n\t\t\tsaveGlobal();\n\t\t}\n\t},\n\n\trun: function() {\n\t\tvar promise;\n\n\t\tconfig.current = this;\n\n\t\tif ( this.async ) {\n\t\t\tQUnit.stop();\n\t\t}\n\n\t\tthis.callbackStarted = now();\n\n\t\tif ( config.notrycatch ) {\n\t\t\trunTest( this );\n\t\t\treturn;\n\t\t}\n\n\t\ttry {\n\t\t\trunTest( this );\n\t\t} catch ( e ) {\n\t\t\tthis.pushFailure( \"Died on test #\" + ( this.assertions.length + 1 ) + \" \" +\n\t\t\t\tthis.stack + \": \" + ( e.message || e ), extractStacktrace( e, 0 ) );\n\n\t\t\t// else next test will carry the responsibility\n\t\t\tsaveGlobal();\n\n\t\t\t// Restart the tests if they're blocking\n\t\t\tif ( config.blocking ) {\n\t\t\t\tQUnit.start();\n\t\t\t}\n\t\t}\n\n\t\tfunction runTest( test ) {\n\t\t\tpromise = test.callback.call( test.testEnvironment, test.assert );\n\t\t\ttest.resolvePromise( promise );\n\t\t}\n\t},\n\n\tafter: function() {\n\t\tcheckPollution();\n\t},\n\n\tqueueHook: function( hook, hookName ) {\n\t\tvar promise,\n\t\t\ttest = this;\n\t\treturn function runHook() {\n\t\t\tconfig.current = test;\n\t\t\tif ( config.notrycatch ) {\n\t\t\t\tcallHook();\n\t\t\t\treturn;\n\t\t\t}\n\t\t\ttry {\n\t\t\t\tcallHook();\n\t\t\t} catch ( error ) {\n\t\t\t\ttest.pushFailure( hookName + \" failed on \" + test.testName + \": \" +\n\t\t\t\t( error.message || error ), extractStacktrace( error, 0 ) );\n\t\t\t}\n\n\t\t\tfunction callHook() {\n\t\t\t\tpromise = hook.call( test.testEnvironment, test.assert );\n\t\t\t\ttest.resolvePromise( promise, hookName );\n\t\t\t}\n\t\t};\n\t},\n\n\t// Currently only used for module level hooks, can be used to add global level ones\n\thooks: function( handler ) {\n\t\tvar hooks = [];\n\n\t\tfunction processHooks( test, module ) {\n\t\t\tif ( module.parentModule ) {\n\t\t\t\tprocessHooks( test, module.parentModule );\n\t\t\t}\n\t\t\tif ( module.testEnvironment &&\n\t\t\t\tQUnit.objectType( module.testEnvironment[ handler ] ) === \"function\" ) {\n\t\t\t\thooks.push( test.queueHook( module.testEnvironment[ handler ], handler ) );\n\t\t\t}\n\t\t}\n\n\t\t// Hooks are ignored on skipped tests\n\t\tif ( !this.skip ) {\n\t\t\tprocessHooks( this, this.module );\n\t\t}\n\t\treturn hooks;\n\t},\n\n\tfinish: function() {\n\t\tvar this$1 = this;\n\n\t\tconfig.current = this;\n\t\tif ( config.requireExpects && this.expected === null ) {\n\t\t\tthis.pushFailure( \"Expected number of assertions to be defined, but expect() was \" +\n\t\t\t\t\"not called.\", this.stack );\n\t\t} else if ( this.expected !== null && this.expected !== this.assertions.length ) {\n\t\t\tthis.pushFailure( \"Expected \" + this.expected + \" assertions, but \" +\n\t\t\t\tthis.assertions.length + \" were run\", this.stack );\n\t\t} else if ( this.expected === null && !this.assertions.length ) {\n\t\t\tthis.pushFailure( \"Expected at least one assertion, but none were run - call \" +\n\t\t\t\t\"expect(0) to accept zero assertions.\", this.stack );\n\t\t}\n\n\t\tvar i,\n\t\t\tbad = 0;\n\n\t\tthis.runtime = now() - this.started;\n\t\tconfig.stats.all += this.assertions.length;\n\t\tconfig.moduleStats.all += this.assertions.length;\n\n\t\tfor ( i = 0; i < this.assertions.length; i++ ) {\n\t\t\tif ( !this$1.assertions[ i ].result ) {\n\t\t\t\tbad++;\n\t\t\t\tconfig.stats.bad++;\n\t\t\t\tconfig.moduleStats.bad++;\n\t\t\t}\n\t\t}\n\n\t\trunLoggingCallbacks( \"testDone\", {\n\t\t\tname: this.testName,\n\t\t\tmodule: this.module.name,\n\t\t\tskipped: !!this.skip,\n\t\t\tfailed: bad,\n\t\t\tpassed: this.assertions.length - bad,\n\t\t\ttotal: this.assertions.length,\n\t\t\truntime: this.runtime,\n\n\t\t\t// HTML Reporter use\n\t\t\tassertions: this.assertions,\n\t\t\ttestId: this.testId,\n\n\t\t\t// Source of Test\n\t\t\tsource: this.stack,\n\n\t\t\t// DEPRECATED: this property will be removed in 2.0.0, use runtime instead\n\t\t\tduration: this.runtime\n\t\t});\n\n\t\t// QUnit.reset() is deprecated and will be replaced for a new\n\t\t// fixture reset function on QUnit 2.0/2.1.\n\t\t// It's still called here for backwards compatibility handling\n\t\tQUnit.reset();\n\n\t\tconfig.current = undefined;\n\t},\n\n\tqueue: function() {\n\t\tvar priority,\n\t\t\ttest = this;\n\n\t\tif ( !this.valid() ) {\n\t\t\treturn;\n\t\t}\n\n\t\tfunction run() {\n\n\t\t\t// each of these can by async\n\t\t\tsynchronize([\n\t\t\t\tfunction() {\n\t\t\t\t\ttest.before();\n\t\t\t\t},\n\n\t\t\t\ttest.hooks( \"beforeEach\" ),\n\t\t\t\tfunction() {\n\t\t\t\t\ttest.run();\n\t\t\t\t},\n\n\t\t\t\ttest.hooks( \"afterEach\" ).reverse(),\n\n\t\t\t\tfunction() {\n\t\t\t\t\ttest.after();\n\t\t\t\t},\n\t\t\t\tfunction() {\n\t\t\t\t\ttest.finish();\n\t\t\t\t}\n\t\t\t]);\n\t\t}\n\n\t\t// Prioritize previously failed tests, detected from sessionStorage\n\t\tpriority = QUnit.config.reorder && defined.sessionStorage &&\n\t\t\t\t+sessionStorage.getItem( \"qunit-test-\" + this.module.name + \"-\" + this.testName );\n\n\t\treturn synchronize( run, priority );\n\t},\n\n\tpush: function( result, actual, expected, message, negative ) {\n\t\tvar source,\n\t\t\tdetails = {\n\t\t\t\tmodule: this.module.name,\n\t\t\t\tname: this.testName,\n\t\t\t\tresult: result,\n\t\t\t\tmessage: message,\n\t\t\t\tactual: actual,\n\t\t\t\texpected: expected,\n\t\t\t\ttestId: this.testId,\n\t\t\t\tnegative: negative || false,\n\t\t\t\truntime: now() - this.started\n\t\t\t};\n\n\t\tif ( !result ) {\n\t\t\tsource = sourceFromStacktrace();\n\n\t\t\tif ( source ) {\n\t\t\t\tdetails.source = source;\n\t\t\t}\n\t\t}\n\n\t\trunLoggingCallbacks( \"log\", details );\n\n\t\tthis.assertions.push({\n\t\t\tresult: !!result,\n\t\t\tmessage: message\n\t\t});\n\t},\n\n\tpushFailure: function( message, source, actual ) {\n\t\tif ( !( this instanceof Test ) ) {\n\t\t\tthrow new Error( \"pushFailure() assertion outside test context, was \" +\n\t\t\t\tsourceFromStacktrace( 2 ) );\n\t\t}\n\n\t\tvar details = {\n\t\t\t\tmodule: this.module.name,\n\t\t\t\tname: this.testName,\n\t\t\t\tresult: false,\n\t\t\t\tmessage: message || \"error\",\n\t\t\t\tactual: actual || null,\n\t\t\t\ttestId: this.testId,\n\t\t\t\truntime: now() - this.started\n\t\t\t};\n\n\t\tif ( source ) {\n\t\t\tdetails.source = source;\n\t\t}\n\n\t\trunLoggingCallbacks( \"log\", details );\n\n\t\tthis.assertions.push({\n\t\t\tresult: false,\n\t\t\tmessage: message\n\t\t});\n\t},\n\n\tresolvePromise: function( promise, phase ) {\n\t\tvar then, message,\n\t\t\ttest = this;\n\t\tif ( promise != null ) {\n\t\t\tthen = promise.then;\n\t\t\tif ( QUnit.objectType( then ) === \"function\" ) {\n\t\t\t\tQUnit.stop();\n\t\t\t\tthen.call(\n\t\t\t\t\tpromise,\n\t\t\t\t\tfunction() { QUnit.start(); },\n\t\t\t\t\tfunction( error ) {\n\t\t\t\t\t\tmessage = \"Promise rejected \" +\n\t\t\t\t\t\t\t( !phase ? \"during\" : phase.replace( /Each$/, \"\" ) ) +\n\t\t\t\t\t\t\t\" \" + test.testName + \": \" + ( error.message || error );\n\t\t\t\t\t\ttest.pushFailure( message, extractStacktrace( error, 0 ) );\n\n\t\t\t\t\t\t// else next test will carry the responsibility\n\t\t\t\t\t\tsaveGlobal();\n\n\t\t\t\t\t\t// Unblock\n\t\t\t\t\t\tQUnit.start();\n\t\t\t\t\t}\n\t\t\t\t);\n\t\t\t}\n\t\t}\n\t},\n\n\tvalid: function() {\n\t\tvar include,\n\t\t\tfilter = config.filter && config.filter.toLowerCase(),\n\t\t\tmodule = QUnit.urlParams.module && QUnit.urlParams.module.toLowerCase(),\n\t\t\tfullName = ( this.module.name + \": \" + this.testName ).toLowerCase();\n\n\t\tfunction testInModuleChain( testModule ) {\n\t\t\tvar testModuleName = testModule.name ? testModule.name.toLowerCase() : null;\n\t\t\tif ( testModuleName === module ) {\n\t\t\t\treturn true;\n\t\t\t} else if ( testModule.parentModule ) {\n\t\t\t\treturn testInModuleChain( testModule.parentModule );\n\t\t\t} else {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t}\n\n\t\t// Internally-generated tests are always valid\n\t\tif ( this.callback && this.callback.validTest ) {\n\t\t\treturn true;\n\t\t}\n\n\t\tif ( config.testId.length > 0 && inArray( this.testId, config.testId ) < 0 ) {\n\t\t\treturn false;\n\t\t}\n\n\t\tif ( module && !testInModuleChain( this.module ) ) {\n\t\t\treturn false;\n\t\t}\n\n\t\tif ( !filter ) {\n\t\t\treturn true;\n\t\t}\n\n\t\tinclude = filter.charAt( 0 ) !== \"!\";\n\t\tif ( !include ) {\n\t\t\tfilter = filter.slice( 1 );\n\t\t}\n\n\t\t// If the filter matches, we need to honour include\n\t\tif ( fullName.indexOf( filter ) !== -1 ) {\n\t\t\treturn include;\n\t\t}\n\n\t\t// Otherwise, do the opposite\n\t\treturn !include;\n\t}\n};\n\n// Resets the test setup. Useful for tests that modify the DOM.\n/*\nDEPRECATED: Use multiple tests instead of resetting inside a test.\nUse testStart or testDone for custom cleanup.\nThis method will throw an error in 2.0, and will be removed in 2.1\n*/\nQUnit.reset = function() {\n\n\t// Return on non-browser environments\n\t// This is necessary to not break on node tests\n\tif ( !defined.document ) {\n\t\treturn;\n\t}\n\n\tvar fixture = defined.document && document.getElementById &&\n\t\t\tdocument.getElementById( \"qunit-fixture\" );\n\n\tif ( fixture ) {\n\t\tfixture.innerHTML = config.fixture;\n\t}\n};\n\nQUnit.pushFailure = function() {\n\tif ( !QUnit.config.current ) {\n\t\tthrow new Error( \"pushFailure() assertion outside test context, in \" +\n\t\t\tsourceFromStacktrace( 2 ) );\n\t}\n\n\t// Gets current test obj\n\tvar currentTest = QUnit.config.current;\n\n\treturn currentTest.pushFailure.apply( currentTest, arguments );\n};\n\n// Based on Java's String.hashCode, a simple but not\n// rigorously collision resistant hashing function\nfunction generateHash( module, testName ) {\n\tvar hex,\n\t\ti = 0,\n\t\thash = 0,\n\t\tstr = module + \"\\x1C\" + testName,\n\t\tlen = str.length;\n\n\tfor ( ; i < len; i++ ) {\n\t\thash  = ( ( hash << 5 ) - hash ) + str.charCodeAt( i );\n\t\thash |= 0;\n\t}\n\n\t// Convert the possibly negative integer hash code into an 8 character hex string, which isn't\n\t// strictly necessary but increases user understanding that the id is a SHA-like hash\n\thex = ( 0x100000000 + hash ).toString( 16 );\n\tif ( hex.length < 8 ) {\n\t\thex = \"0000000\" + hex;\n\t}\n\n\treturn hex.slice( -8 );\n}\n\nfunction synchronize( callback, priority ) {\n\tvar last = !priority;\n\n\tif ( QUnit.objectType( callback ) === \"array\" ) {\n\t\twhile ( callback.length ) {\n\t\t\tsynchronize( callback.shift() );\n\t\t}\n\t\treturn;\n\t}\n\n\tif ( priority ) {\n\t\tpriorityFill( callback );\n\t} else {\n\t\tconfig.queue.push( callback );\n\t}\n\n\tif ( config.autorun && !config.blocking ) {\n\t\tprocess( last );\n\t}\n}\n\n// Place previously failed tests on a queue priority line, respecting the order they get assigned.\nfunction priorityFill( callback ) {\n\tvar queue, prioritizedQueue;\n\n\tqueue = config.queue.slice( priorityFill.pos );\n\tprioritizedQueue = config.queue.slice( 0, -config.queue.length + priorityFill.pos );\n\n\tqueue.unshift( callback );\n\tqueue.unshift.apply( queue, prioritizedQueue );\n\n\tconfig.queue = queue;\n\n\tpriorityFill.pos += 1;\n}\npriorityFill.pos = 0;\n\nfunction saveGlobal() {\n\tconfig.pollution = [];\n\n\tif ( config.noglobals ) {\n\t\tfor ( var key in global ) {\n\t\t\tif ( hasOwn.call( global, key ) ) {\n\n\t\t\t\t// in Opera sometimes DOM element ids show up here, ignore them\n\t\t\t\tif ( /^qunit-test-output/.test( key ) ) {\n\t\t\t\t\tcontinue;\n\t\t\t\t}\n\t\t\t\tconfig.pollution.push( key );\n\t\t\t}\n\t\t}\n\t}\n}\n\nfunction checkPollution() {\n\tvar newGlobals,\n\t\tdeletedGlobals,\n\t\told = config.pollution;\n\n\tsaveGlobal();\n\n\tnewGlobals = diff( config.pollution, old );\n\tif ( newGlobals.length > 0 ) {\n\t\tQUnit.pushFailure( \"Introduced global variable(s): \" + newGlobals.join( \", \" ) );\n\t}\n\n\tdeletedGlobals = diff( old, config.pollution );\n\tif ( deletedGlobals.length > 0 ) {\n\t\tQUnit.pushFailure( \"Deleted global variable(s): \" + deletedGlobals.join( \", \" ) );\n\t}\n}\n\n// Will be exposed as QUnit.asyncTest\nfunction asyncTest( testName, expected, callback ) {\n\tif ( arguments.length === 2 ) {\n\t\tcallback = expected;\n\t\texpected = null;\n\t}\n\n\tQUnit.test( testName, expected, callback, true );\n}\n\n// Will be exposed as QUnit.test\nfunction test( testName, expected, callback, async ) {\n\tif ( focused )  { return; }\n\n\tvar newTest;\n\n\tif ( arguments.length === 2 ) {\n\t\tcallback = expected;\n\t\texpected = null;\n\t}\n\n\tnewTest = new Test({\n\t\ttestName: testName,\n\t\texpected: expected,\n\t\tasync: async,\n\t\tcallback: callback\n\t});\n\n\tnewTest.queue();\n}\n\n// Will be exposed as QUnit.skip\nfunction skip( testName ) {\n\tif ( focused )  { return; }\n\n\tvar test = new Test({\n\t\ttestName: testName,\n\t\tskip: true\n\t});\n\n\ttest.queue();\n}\n\n// Will be exposed as QUnit.only\nfunction only( testName, expected, callback, async ) {\n\tvar newTest;\n\n\tif ( focused )  { return; }\n\n\tQUnit.config.queue.length = 0;\n\tfocused = true;\n\n\tif ( arguments.length === 2 ) {\n\t\tcallback = expected;\n\t\texpected = null;\n\t}\n\n\tnewTest = new Test({\n\t\ttestName: testName,\n\t\texpected: expected,\n\t\tasync: async,\n\t\tcallback: callback\n\t});\n\n\tnewTest.queue();\n}\n\nfunction Assert( testContext ) {\n\tthis.test = testContext;\n}\n\n// Assert helpers\nQUnit.assert = Assert.prototype = {\n\n\t// Specify the number of expected assertions to guarantee that failed test\n\t// (no assertions are run at all) don't slip through.\n\texpect: function( asserts ) {\n\t\tif ( arguments.length === 1 ) {\n\t\t\tthis.test.expected = asserts;\n\t\t} else {\n\t\t\treturn this.test.expected;\n\t\t}\n\t},\n\n\t// Increment this Test's semaphore counter, then return a function that\n\t// decrements that counter a maximum of once.\n\tasync: function( count ) {\n\t\tvar test = this.test,\n\t\t\tpopped = false,\n\t\t\tacceptCallCount = count;\n\n\t\tif ( typeof acceptCallCount === \"undefined\" ) {\n\t\t\tacceptCallCount = 1;\n\t\t}\n\n\t\ttest.semaphore += 1;\n\t\ttest.usedAsync = true;\n\t\tpauseProcessing();\n\n\t\treturn function done() {\n\n\t\t\tif ( popped ) {\n\t\t\t\ttest.pushFailure( \"Too many calls to the `assert.async` callback\",\n\t\t\t\t\tsourceFromStacktrace( 2 ) );\n\t\t\t\treturn;\n\t\t\t}\n\t\t\tacceptCallCount -= 1;\n\t\t\tif ( acceptCallCount > 0 ) {\n\t\t\t\treturn;\n\t\t\t}\n\n\t\t\ttest.semaphore -= 1;\n\t\t\tpopped = true;\n\t\t\tresumeProcessing();\n\t\t};\n\t},\n\n\t// Exports test.push() to the user API\n\tpush: function( /* result, actual, expected, message, negative */ ) {\n\t\tvar assert = this,\n\t\t\tcurrentTest = ( assert instanceof Assert && assert.test ) || QUnit.config.current;\n\n\t\t// Backwards compatibility fix.\n\t\t// Allows the direct use of global exported assertions and QUnit.assert.*\n\t\t// Although, it's use is not recommended as it can leak assertions\n\t\t// to other tests from async tests, because we only get a reference to the current test,\n\t\t// not exactly the test where assertion were intended to be called.\n\t\tif ( !currentTest ) {\n\t\t\tthrow new Error( \"assertion outside test context, in \" + sourceFromStacktrace( 2 ) );\n\t\t}\n\n\t\tif ( currentTest.usedAsync === true && currentTest.semaphore === 0 ) {\n\t\t\tcurrentTest.pushFailure( \"Assertion after the final `assert.async` was resolved\",\n\t\t\t\tsourceFromStacktrace( 2 ) );\n\n\t\t\t// Allow this assertion to continue running anyway...\n\t\t}\n\n\t\tif ( !( assert instanceof Assert ) ) {\n\t\t\tassert = currentTest.assert;\n\t\t}\n\t\treturn assert.test.push.apply( assert.test, arguments );\n\t},\n\n\tok: function( result, message ) {\n\t\tmessage = message || ( result ? \"okay\" : \"failed, expected argument to be truthy, was: \" +\n\t\t\tQUnit.dump.parse( result ) );\n\t\tthis.push( !!result, result, true, message );\n\t},\n\n\tnotOk: function( result, message ) {\n\t\tmessage = message || ( !result ? \"okay\" : \"failed, expected argument to be falsy, was: \" +\n\t\t\tQUnit.dump.parse( result ) );\n\t\tthis.push( !result, result, false, message, true );\n\t},\n\n\tequal: function( actual, expected, message ) {\n\t\t/*jshint eqeqeq:false */\n\t\tthis.push( expected == actual, actual, expected, message );\n\t},\n\n\tnotEqual: function( actual, expected, message ) {\n\t\t/*jshint eqeqeq:false */\n\t\tthis.push( expected != actual, actual, expected, message, true );\n\t},\n\n\tpropEqual: function( actual, expected, message ) {\n\t\tactual = objectValues( actual );\n\t\texpected = objectValues( expected );\n\t\tthis.push( QUnit.equiv( actual, expected ), actual, expected, message );\n\t},\n\n\tnotPropEqual: function( actual, expected, message ) {\n\t\tactual = objectValues( actual );\n\t\texpected = objectValues( expected );\n\t\tthis.push( !QUnit.equiv( actual, expected ), actual, expected, message, true );\n\t},\n\n\tdeepEqual: function( actual, expected, message ) {\n\t\tthis.push( QUnit.equiv( actual, expected ), actual, expected, message );\n\t},\n\n\tnotDeepEqual: function( actual, expected, message ) {\n\t\tthis.push( !QUnit.equiv( actual, expected ), actual, expected, message, true );\n\t},\n\n\tstrictEqual: function( actual, expected, message ) {\n\t\tthis.push( expected === actual, actual, expected, message );\n\t},\n\n\tnotStrictEqual: function( actual, expected, message ) {\n\t\tthis.push( expected !== actual, actual, expected, message, true );\n\t},\n\n\t\"throws\": function( block, expected, message ) {\n\t\tvar actual, expectedType,\n\t\t\texpectedOutput = expected,\n\t\t\tok = false,\n\t\t\tcurrentTest = ( this instanceof Assert && this.test ) || QUnit.config.current;\n\n\t\t// 'expected' is optional unless doing string comparison\n\t\tif ( message == null && typeof expected === \"string\" ) {\n\t\t\tmessage = expected;\n\t\t\texpected = null;\n\t\t}\n\n\t\tcurrentTest.ignoreGlobalErrors = true;\n\t\ttry {\n\t\t\tblock.call( currentTest.testEnvironment );\n\t\t} catch (e) {\n\t\t\tactual = e;\n\t\t}\n\t\tcurrentTest.ignoreGlobalErrors = false;\n\n\t\tif ( actual ) {\n\t\t\texpectedType = QUnit.objectType( expected );\n\n\t\t\t// we don't want to validate thrown error\n\t\t\tif ( !expected ) {\n\t\t\t\tok = true;\n\t\t\t\texpectedOutput = null;\n\n\t\t\t// expected is a regexp\n\t\t\t} else if ( expectedType === \"regexp\" ) {\n\t\t\t\tok = expected.test( errorString( actual ) );\n\n\t\t\t// expected is a string\n\t\t\t} else if ( expectedType === \"string\" ) {\n\t\t\t\tok = expected === errorString( actual );\n\n\t\t\t// expected is a constructor, maybe an Error constructor\n\t\t\t} else if ( expectedType === \"function\" && actual instanceof expected ) {\n\t\t\t\tok = true;\n\n\t\t\t// expected is an Error object\n\t\t\t} else if ( expectedType === \"object\" ) {\n\t\t\t\tok = actual instanceof expected.constructor &&\n\t\t\t\t\tactual.name === expected.name &&\n\t\t\t\t\tactual.message === expected.message;\n\n\t\t\t// expected is a validation function which returns true if validation passed\n\t\t\t} else if ( expectedType === \"function\" && expected.call( {}, actual ) === true ) {\n\t\t\t\texpectedOutput = null;\n\t\t\t\tok = true;\n\t\t\t}\n\t\t}\n\n\t\tcurrentTest.assert.push( ok, actual, expectedOutput, message );\n\t}\n};\n\n// Provide an alternative to assert.throws(), for environments that consider throws a reserved word\n// Known to us are: Closure Compiler, Narwhal\n(function() {\n\t/*jshint sub:true */\n\tAssert.prototype.raises = Assert.prototype[ \"throws\" ];\n}());\n\nfunction errorString( error ) {\n\tvar name, message,\n\t\tresultErrorString = error.toString();\n\tif ( resultErrorString.substring( 0, 7 ) === \"[object\" ) {\n\t\tname = error.name ? error.name.toString() : \"Error\";\n\t\tmessage = error.message ? error.message.toString() : \"\";\n\t\tif ( name && message ) {\n\t\t\treturn name + \": \" + message;\n\t\t} else if ( name ) {\n\t\t\treturn name;\n\t\t} else if ( message ) {\n\t\t\treturn message;\n\t\t} else {\n\t\t\treturn \"Error\";\n\t\t}\n\t} else {\n\t\treturn resultErrorString;\n\t}\n}\n\n// Test for equality any JavaScript type.\n// Author: Philippe Rathé <prathe@gmail.com>\nQUnit.equiv = (function() {\n\n\t// Stack to decide between skip/abort functions\n\tvar callers = [];\n\n\t// Stack to avoiding loops from circular referencing\n\tvar parents = [];\n\tvar parentsB = [];\n\n\tfunction useStrictEquality( b, a ) {\n\n\t\t/*jshint eqeqeq:false */\n\t\tif ( b instanceof a.constructor || a instanceof b.constructor ) {\n\n\t\t\t// To catch short annotation VS 'new' annotation of a declaration. e.g.:\n\t\t\t// `var i = 1;`\n\t\t\t// `var j = new Number(1);`\n\t\t\treturn a == b;\n\t\t} else {\n\t\t\treturn a === b;\n\t\t}\n\t}\n\n\tfunction compareConstructors( a, b ) {\n\t\tvar getProto = Object.getPrototypeOf || function( obj ) {\n\n\t\t\t/*jshint proto: true */\n\t\t\treturn obj.__proto__;\n\t\t};\n\t\tvar protoA = getProto( a );\n\t\tvar protoB = getProto( b );\n\n\t\t// Comparing constructors is more strict than using `instanceof`\n\t\tif ( a.constructor === b.constructor ) {\n\t\t\treturn true;\n\t\t}\n\n\t\t// Ref #851\n\t\t// If the obj prototype descends from a null constructor, treat it\n\t\t// as a null prototype.\n\t\tif ( protoA && protoA.constructor === null ) {\n\t\t\tprotoA = null;\n\t\t}\n\t\tif ( protoB && protoB.constructor === null ) {\n\t\t\tprotoB = null;\n\t\t}\n\n\t\t// Allow objects with no prototype to be equivalent to\n\t\t// objects with Object as their constructor.\n\t\tif ( ( protoA === null && protoB === Object.prototype ) ||\n\t\t\t\t( protoB === null && protoA === Object.prototype ) ) {\n\t\t\treturn true;\n\t\t}\n\n\t\treturn false;\n\t}\n\n\tvar callbacks = {\n\t\t\"string\": useStrictEquality,\n\t\t\"boolean\": useStrictEquality,\n\t\t\"number\": useStrictEquality,\n\t\t\"null\": useStrictEquality,\n\t\t\"undefined\": useStrictEquality,\n\t\t\"symbol\": useStrictEquality,\n\n\t\t\"nan\": function( b ) {\n\t\t\treturn isNaN( b );\n\t\t},\n\n\t\t\"date\": function( b, a ) {\n\t\t\treturn QUnit.objectType( b ) === \"date\" && a.valueOf() === b.valueOf();\n\t\t},\n\n\t\t\"regexp\": function( b, a ) {\n\t\t\treturn QUnit.objectType( b ) === \"regexp\" &&\n\n\t\t\t\t// The regex itself\n\t\t\t\ta.source === b.source &&\n\n\t\t\t\t// And its modifiers\n\t\t\t\ta.global === b.global &&\n\n\t\t\t\t// (gmi) ...\n\t\t\t\ta.ignoreCase === b.ignoreCase &&\n\t\t\t\ta.multiline === b.multiline &&\n\t\t\t\ta.sticky === b.sticky;\n\t\t},\n\n\t\t// - skip when the property is a method of an instance (OOP)\n\t\t// - abort otherwise,\n\t\t// initial === would have catch identical references anyway\n\t\t\"function\": function() {\n\t\t\tvar caller = callers[ callers.length - 1 ];\n\t\t\treturn caller !== Object && typeof caller !== \"undefined\";\n\t\t},\n\n\t\t\"array\": function( b, a ) {\n\t\t\tvar i, j, len, loop, aCircular, bCircular;\n\n\t\t\t// b could be an object literal here\n\t\t\tif ( QUnit.objectType( b ) !== \"array\" ) {\n\t\t\t\treturn false;\n\t\t\t}\n\n\t\t\tlen = a.length;\n\t\t\tif ( len !== b.length ) {\n\t\t\t\t// safe and faster\n\t\t\t\treturn false;\n\t\t\t}\n\n\t\t\t// Track reference to avoid circular references\n\t\t\tparents.push( a );\n\t\t\tparentsB.push( b );\n\t\t\tfor ( i = 0; i < len; i++ ) {\n\t\t\t\tloop = false;\n\t\t\t\tfor ( j = 0; j < parents.length; j++ ) {\n\t\t\t\t\taCircular = parents[ j ] === a[ i ];\n\t\t\t\t\tbCircular = parentsB[ j ] === b[ i ];\n\t\t\t\t\tif ( aCircular || bCircular ) {\n\t\t\t\t\t\tif ( a[ i ] === b[ i ] || aCircular && bCircular ) {\n\t\t\t\t\t\t\tloop = true;\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tparents.pop();\n\t\t\t\t\t\t\tparentsB.pop();\n\t\t\t\t\t\t\treturn false;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tif ( !loop && !innerEquiv( a[ i ], b[ i ] ) ) {\n\t\t\t\t\tparents.pop();\n\t\t\t\t\tparentsB.pop();\n\t\t\t\t\treturn false;\n\t\t\t\t}\n\t\t\t}\n\t\t\tparents.pop();\n\t\t\tparentsB.pop();\n\t\t\treturn true;\n\t\t},\n\n\t\t\"set\": function( b, a ) {\n\t\t\tvar aArray, bArray;\n\n\t\t\t// `b` could be any object here\n\t\t\tif ( QUnit.objectType( b ) !== \"set\" ) {\n\t\t\t\treturn false;\n\t\t\t}\n\n\t\t\taArray = [];\n\t\t\ta.forEach( function( v ) {\n\t\t\t\taArray.push( v );\n\t\t\t});\n\t\t\tbArray = [];\n\t\t\tb.forEach( function( v ) {\n\t\t\t\tbArray.push( v );\n\t\t\t});\n\n\t\t\treturn innerEquiv( bArray, aArray );\n\t\t},\n\n\t\t\"map\": function( b, a ) {\n\t\t\tvar aArray, bArray;\n\n\t\t\t// `b` could be any object here\n\t\t\tif ( QUnit.objectType( b ) !== \"map\" ) {\n\t\t\t\treturn false;\n\t\t\t}\n\n\t\t\taArray = [];\n\t\t\ta.forEach( function( v, k ) {\n\t\t\t\taArray.push( [ k, v ] );\n\t\t\t});\n\t\t\tbArray = [];\n\t\t\tb.forEach( function( v, k ) {\n\t\t\t\tbArray.push( [ k, v ] );\n\t\t\t});\n\n\t\t\treturn innerEquiv( bArray, aArray );\n\t\t},\n\n\t\t\"object\": function( b, a ) {\n\t\t\tvar i, j, loop, aCircular, bCircular;\n\n\t\t\t// Default to true\n\t\t\tvar eq = true;\n\t\t\tvar aProperties = [];\n\t\t\tvar bProperties = [];\n\n\t\t\tif ( compareConstructors( a, b ) === false ) {\n\t\t\t\treturn false;\n\t\t\t}\n\n\t\t\t// Stack constructor before traversing properties\n\t\t\tcallers.push( a.constructor );\n\n\t\t\t// Track reference to avoid circular references\n\t\t\tparents.push( a );\n\t\t\tparentsB.push( b );\n\n\t\t\t// Be strict: don't ensure hasOwnProperty and go deep\n\t\t\tfor ( i in a ) {\n\t\t\t\tloop = false;\n\t\t\t\tfor ( j = 0; j < parents.length; j++ ) {\n\t\t\t\t\taCircular = parents[ j ] === a[ i ];\n\t\t\t\t\tbCircular = parentsB[ j ] === b[ i ];\n\t\t\t\t\tif ( aCircular || bCircular ) {\n\t\t\t\t\t\tif ( a[ i ] === b[ i ] || aCircular && bCircular ) {\n\t\t\t\t\t\t\tloop = true;\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\teq = false;\n\t\t\t\t\t\t\tbreak;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\taProperties.push( i );\n\t\t\t\tif ( !loop && !innerEquiv( a[ i ], b[ i ] ) ) {\n\t\t\t\t\teq = false;\n\t\t\t\t\tbreak;\n\t\t\t\t}\n\t\t\t}\n\n\t\t\tparents.pop();\n\t\t\tparentsB.pop();\n\n\t\t\t// Unstack, we are done\n\t\t\tcallers.pop();\n\n\t\t\tfor ( i in b ) {\n\n\t\t\t\t// Collect b's properties\n\t\t\t\tbProperties.push( i );\n\t\t\t}\n\n\t\t\t// Ensures identical properties name\n\t\t\treturn eq && innerEquiv( aProperties.sort(), bProperties.sort() );\n\t\t}\n\t};\n\n\tfunction typeEquiv( a, b ) {\n\t\tvar prop = QUnit.objectType( a );\n\t\treturn callbacks[ prop ]( b, a );\n\t}\n\n\t// The real equiv function\n\tfunction innerEquiv() {\n\t\tvar args = [].slice.apply( arguments );\n\t\tif ( args.length < 2 ) {\n\n\t\t\t// End transition\n\t\t\treturn true;\n\t\t}\n\n\t\treturn ( (function( a, b ) {\n\t\t\tif ( a === b ) {\n\n\t\t\t\t// Catch the most you can\n\t\t\t\treturn true;\n\t\t\t} else if ( a === null || b === null || typeof a === \"undefined\" ||\n\t\t\t\t\ttypeof b === \"undefined\" ||\n\t\t\t\t\tQUnit.objectType( a ) !== QUnit.objectType( b ) ) {\n\n\t\t\t\t// Don't lose time with error prone cases\n\t\t\t\treturn false;\n\t\t\t} else {\n\t\t\t\treturn typeEquiv( a, b );\n\t\t\t}\n\n\t\t// Apply transition with (1..n) arguments\n\t\t}( args[ 0 ], args[ 1 ] ) ) &&\n\t\t\tinnerEquiv.apply( this, args.splice( 1, args.length - 1 ) ) );\n\t}\n\n\treturn innerEquiv;\n}());\n\n// Based on jsDump by Ariel Flesler\n// http://flesler.blogspot.com/2008/05/jsdump-pretty-dump-of-any-javascript.html\nQUnit.dump = (function() {\n\tfunction quote( str ) {\n\t\treturn \"\\\"\" + str.toString().replace( /\\\\/g, \"\\\\\\\\\" ).replace( /\"/g, \"\\\\\\\"\" ) + \"\\\"\";\n\t}\n\tfunction literal( o ) {\n\t\treturn o + \"\";\n\t}\n\tfunction join( pre, arr, post ) {\n\t\tvar s = dump.separator(),\n\t\t\tbase = dump.indent(),\n\t\t\tinner = dump.indent( 1 );\n\t\tif ( arr.join ) {\n\t\t\tarr = arr.join( \",\" + s + inner );\n\t\t}\n\t\tif ( !arr ) {\n\t\t\treturn pre + post;\n\t\t}\n\t\treturn [ pre, inner + arr, base + post ].join( s );\n\t}\n\tfunction array( arr, stack ) {\n\t\tvar this$1 = this;\n\n\t\tvar i = arr.length,\n\t\t\tret = new Array( i );\n\n\t\tif ( dump.maxDepth && dump.depth > dump.maxDepth ) {\n\t\t\treturn \"[object Array]\";\n\t\t}\n\n\t\tthis.up();\n\t\twhile ( i-- ) {\n\t\t\tret[ i ] = this$1.parse( arr[ i ], undefined, stack );\n\t\t}\n\t\tthis.down();\n\t\treturn join( \"[\", ret, \"]\" );\n\t}\n\n\tvar reName = /^function (\\w+)/,\n\t\tdump = {\n\n\t\t\t// objType is used mostly internally, you can fix a (custom) type in advance\n\t\t\tparse: function( obj, objType, stack ) {\n\t\t\t\tstack = stack || [];\n\t\t\t\tvar res, parser, parserType,\n\t\t\t\t\tinStack = inArray( obj, stack );\n\n\t\t\t\tif ( inStack !== -1 ) {\n\t\t\t\t\treturn \"recursion(\" + ( inStack - stack.length ) + \")\";\n\t\t\t\t}\n\n\t\t\t\tobjType = objType || this.typeOf( obj  );\n\t\t\t\tparser = this.parsers[ objType ];\n\t\t\t\tparserType = typeof parser;\n\n\t\t\t\tif ( parserType === \"function\" ) {\n\t\t\t\t\tstack.push( obj );\n\t\t\t\t\tres = parser.call( this, obj, stack );\n\t\t\t\t\tstack.pop();\n\t\t\t\t\treturn res;\n\t\t\t\t}\n\t\t\t\treturn ( parserType === \"string\" ) ? parser : this.parsers.error;\n\t\t\t},\n\t\t\ttypeOf: function( obj ) {\n\t\t\t\tvar type;\n\t\t\t\tif ( obj === null ) {\n\t\t\t\t\ttype = \"null\";\n\t\t\t\t} else if ( typeof obj === \"undefined\" ) {\n\t\t\t\t\ttype = \"undefined\";\n\t\t\t\t} else if ( QUnit.is( \"regexp\", obj ) ) {\n\t\t\t\t\ttype = \"regexp\";\n\t\t\t\t} else if ( QUnit.is( \"date\", obj ) ) {\n\t\t\t\t\ttype = \"date\";\n\t\t\t\t} else if ( QUnit.is( \"function\", obj ) ) {\n\t\t\t\t\ttype = \"function\";\n\t\t\t\t} else if ( obj.setInterval !== undefined &&\n\t\t\t\t\t\tobj.document !== undefined &&\n\t\t\t\t\t\tobj.nodeType === undefined ) {\n\t\t\t\t\ttype = \"window\";\n\t\t\t\t} else if ( obj.nodeType === 9 ) {\n\t\t\t\t\ttype = \"document\";\n\t\t\t\t} else if ( obj.nodeType ) {\n\t\t\t\t\ttype = \"node\";\n\t\t\t\t} else if (\n\n\t\t\t\t\t// native arrays\n\t\t\t\t\ttoString.call( obj ) === \"[object Array]\" ||\n\n\t\t\t\t\t// NodeList objects\n\t\t\t\t\t( typeof obj.length === \"number\" && obj.item !== undefined &&\n\t\t\t\t\t( obj.length ? obj.item( 0 ) === obj[ 0 ] : ( obj.item( 0 ) === null &&\n\t\t\t\t\tobj[ 0 ] === undefined ) ) )\n\t\t\t\t) {\n\t\t\t\t\ttype = \"array\";\n\t\t\t\t} else if ( obj.constructor === Error.prototype.constructor ) {\n\t\t\t\t\ttype = \"error\";\n\t\t\t\t} else {\n\t\t\t\t\ttype = typeof obj;\n\t\t\t\t}\n\t\t\t\treturn type;\n\t\t\t},\n\t\t\tseparator: function() {\n\t\t\t\treturn this.multiline ? this.HTML ? \"<br />\" : \"\\n\" : this.HTML ? \"&#160;\" : \" \";\n\t\t\t},\n\t\t\t// extra can be a number, shortcut for increasing-calling-decreasing\n\t\t\tindent: function( extra ) {\n\t\t\t\tif ( !this.multiline ) {\n\t\t\t\t\treturn \"\";\n\t\t\t\t}\n\t\t\t\tvar chr = this.indentChar;\n\t\t\t\tif ( this.HTML ) {\n\t\t\t\t\tchr = chr.replace( /\\t/g, \"   \" ).replace( / /g, \"&#160;\" );\n\t\t\t\t}\n\t\t\t\treturn new Array( this.depth + ( extra || 0 ) ).join( chr );\n\t\t\t},\n\t\t\tup: function( a ) {\n\t\t\t\tthis.depth += a || 1;\n\t\t\t},\n\t\t\tdown: function( a ) {\n\t\t\t\tthis.depth -= a || 1;\n\t\t\t},\n\t\t\tsetParser: function( name, parser ) {\n\t\t\t\tthis.parsers[ name ] = parser;\n\t\t\t},\n\t\t\t// The next 3 are exposed so you can use them\n\t\t\tquote: quote,\n\t\t\tliteral: literal,\n\t\t\tjoin: join,\n\t\t\t//\n\t\t\tdepth: 1,\n\t\t\tmaxDepth: QUnit.config.maxDepth,\n\n\t\t\t// This is the list of parsers, to modify them, use dump.setParser\n\t\t\tparsers: {\n\t\t\t\twindow: \"[Window]\",\n\t\t\t\tdocument: \"[Document]\",\n\t\t\t\terror: function( error ) {\n\t\t\t\t\treturn \"Error(\\\"\" + error.message + \"\\\")\";\n\t\t\t\t},\n\t\t\t\tunknown: \"[Unknown]\",\n\t\t\t\t\"null\": \"null\",\n\t\t\t\t\"undefined\": \"undefined\",\n\t\t\t\t\"function\": function( fn ) {\n\t\t\t\t\tvar ret = \"function\",\n\n\t\t\t\t\t\t// functions never have name in IE\n\t\t\t\t\t\tname = \"name\" in fn ? fn.name : ( reName.exec( fn ) || [] )[ 1 ];\n\n\t\t\t\t\tif ( name ) {\n\t\t\t\t\t\tret += \" \" + name;\n\t\t\t\t\t}\n\t\t\t\t\tret += \"( \";\n\n\t\t\t\t\tret = [ ret, dump.parse( fn, \"functionArgs\" ), \"){\" ].join( \"\" );\n\t\t\t\t\treturn join( ret, dump.parse( fn, \"functionCode\" ), \"}\" );\n\t\t\t\t},\n\t\t\t\tarray: array,\n\t\t\t\tnodelist: array,\n\t\t\t\t\"arguments\": array,\n\t\t\t\tobject: function( map, stack ) {\n\t\t\t\t\tvar keys, key, val, i, nonEnumerableProperties,\n\t\t\t\t\t\tret = [];\n\n\t\t\t\t\tif ( dump.maxDepth && dump.depth > dump.maxDepth ) {\n\t\t\t\t\t\treturn \"[object Object]\";\n\t\t\t\t\t}\n\n\t\t\t\t\tdump.up();\n\t\t\t\t\tkeys = [];\n\t\t\t\t\tfor ( key in map ) {\n\t\t\t\t\t\tkeys.push( key );\n\t\t\t\t\t}\n\n\t\t\t\t\t// Some properties are not always enumerable on Error objects.\n\t\t\t\t\tnonEnumerableProperties = [ \"message\", \"name\" ];\n\t\t\t\t\tfor ( i in nonEnumerableProperties ) {\n\t\t\t\t\t\tkey = nonEnumerableProperties[ i ];\n\t\t\t\t\t\tif ( key in map && inArray( key, keys ) < 0 ) {\n\t\t\t\t\t\t\tkeys.push( key );\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tkeys.sort();\n\t\t\t\t\tfor ( i = 0; i < keys.length; i++ ) {\n\t\t\t\t\t\tkey = keys[ i ];\n\t\t\t\t\t\tval = map[ key ];\n\t\t\t\t\t\tret.push( dump.parse( key, \"key\" ) + \": \" +\n\t\t\t\t\t\t\tdump.parse( val, undefined, stack ) );\n\t\t\t\t\t}\n\t\t\t\t\tdump.down();\n\t\t\t\t\treturn join( \"{\", ret, \"}\" );\n\t\t\t\t},\n\t\t\t\tnode: function( node ) {\n\t\t\t\t\tvar len, i, val,\n\t\t\t\t\t\topen = dump.HTML ? \"&lt;\" : \"<\",\n\t\t\t\t\t\tclose = dump.HTML ? \"&gt;\" : \">\",\n\t\t\t\t\t\ttag = node.nodeName.toLowerCase(),\n\t\t\t\t\t\tret = open + tag,\n\t\t\t\t\t\tattrs = node.attributes;\n\n\t\t\t\t\tif ( attrs ) {\n\t\t\t\t\t\tfor ( i = 0, len = attrs.length; i < len; i++ ) {\n\t\t\t\t\t\t\tval = attrs[ i ].nodeValue;\n\n\t\t\t\t\t\t\t// IE6 includes all attributes in .attributes, even ones not explicitly\n\t\t\t\t\t\t\t// set. Those have values like undefined, null, 0, false, \"\" or\n\t\t\t\t\t\t\t// \"inherit\".\n\t\t\t\t\t\t\tif ( val && val !== \"inherit\" ) {\n\t\t\t\t\t\t\t\tret += \" \" + attrs[ i ].nodeName + \"=\" +\n\t\t\t\t\t\t\t\t\tdump.parse( val, \"attribute\" );\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\tret += close;\n\n\t\t\t\t\t// Show content of TextNode or CDATASection\n\t\t\t\t\tif ( node.nodeType === 3 || node.nodeType === 4 ) {\n\t\t\t\t\t\tret += node.nodeValue;\n\t\t\t\t\t}\n\n\t\t\t\t\treturn ret + open + \"/\" + tag + close;\n\t\t\t\t},\n\n\t\t\t\t// function calls it internally, it's the arguments part of the function\n\t\t\t\tfunctionArgs: function( fn ) {\n\t\t\t\t\tvar args,\n\t\t\t\t\t\tl = fn.length;\n\n\t\t\t\t\tif ( !l ) {\n\t\t\t\t\t\treturn \"\";\n\t\t\t\t\t}\n\n\t\t\t\t\targs = new Array( l );\n\t\t\t\t\twhile ( l-- ) {\n\n\t\t\t\t\t\t// 97 is 'a'\n\t\t\t\t\t\targs[ l ] = String.fromCharCode( 97 + l );\n\t\t\t\t\t}\n\t\t\t\t\treturn \" \" + args.join( \", \" ) + \" \";\n\t\t\t\t},\n\t\t\t\t// object calls it internally, the key part of an item in a map\n\t\t\t\tkey: quote,\n\t\t\t\t// function calls it internally, it's the content of the function\n\t\t\t\tfunctionCode: \"[code]\",\n\t\t\t\t// node calls it internally, it's an html attribute value\n\t\t\t\tattribute: quote,\n\t\t\t\tstring: quote,\n\t\t\t\tdate: quote,\n\t\t\t\tregexp: literal,\n\t\t\t\tnumber: literal,\n\t\t\t\t\"boolean\": literal\n\t\t\t},\n\t\t\t// if true, entities are escaped ( <, >, \\t, space and \\n )\n\t\t\tHTML: false,\n\t\t\t// indentation unit\n\t\t\tindentChar: \"  \",\n\t\t\t// if true, items in a collection, are separated by a \\n, else just a space.\n\t\t\tmultiline: true\n\t\t};\n\n\treturn dump;\n}());\n\n// back compat\nQUnit.jsDump = QUnit.dump;\n\n// For browser, export only select globals\nif ( defined.document ) {\n\n\t// Deprecated\n\t// Extend assert methods to QUnit and Global scope through Backwards compatibility\n\t(function() {\n\t\tvar i,\n\t\t\tassertions = Assert.prototype;\n\n\t\tfunction applyCurrent( current ) {\n\t\t\treturn function() {\n\t\t\t\tvar assert = new Assert( QUnit.config.current );\n\t\t\t\tcurrent.apply( assert, arguments );\n\t\t\t};\n\t\t}\n\n\t\tfor ( i in assertions ) {\n\t\t\tQUnit[ i ] = applyCurrent( assertions[ i ] );\n\t\t}\n\t})();\n\n\t(function() {\n\t\tvar i, l,\n\t\t\tkeys = [\n\t\t\t\t\"test\",\n\t\t\t\t\"module\",\n\t\t\t\t\"expect\",\n\t\t\t\t\"asyncTest\",\n\t\t\t\t\"start\",\n\t\t\t\t\"stop\",\n\t\t\t\t\"ok\",\n\t\t\t\t\"notOk\",\n\t\t\t\t\"equal\",\n\t\t\t\t\"notEqual\",\n\t\t\t\t\"propEqual\",\n\t\t\t\t\"notPropEqual\",\n\t\t\t\t\"deepEqual\",\n\t\t\t\t\"notDeepEqual\",\n\t\t\t\t\"strictEqual\",\n\t\t\t\t\"notStrictEqual\",\n\t\t\t\t\"throws\",\n\t\t\t\t\"raises\"\n\t\t\t];\n\n\t\tfor ( i = 0, l = keys.length; i < l; i++ ) {\n\t\t\twindow[ keys[ i ] ] = QUnit[ keys[ i ] ];\n\t\t}\n\t})();\n\n\twindow.QUnit = QUnit;\n}\n\n// For nodejs\nif ( typeof module !== \"undefined\" && module && module.exports ) {\n\tmodule.exports = QUnit;\n\n\t// For consistency with CommonJS environments' exports\n\tmodule.exports.QUnit = QUnit;\n}\n\n// For CommonJS with exports, but without module.exports, like Rhino\nif ( typeof exports !== \"undefined\" && exports ) {\n\texports.QUnit = QUnit;\n}\n\nif ( true ) {\n\t!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {\n\t\treturn QUnit;\n\t}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n\tQUnit.config.autostart = false;\n}\n\n/*\n * This file is a modified version of google-diff-match-patch's JavaScript implementation\n * (https://code.google.com/p/google-diff-match-patch/source/browse/trunk/javascript/diff_match_patch_uncompressed.js),\n * modifications are licensed as more fully set forth in LICENSE.txt.\n *\n * The original source of google-diff-match-patch is attributable and licensed as follows:\n *\n * Copyright 2006 Google Inc.\n * http://code.google.com/p/google-diff-match-patch/\n *\n * Licensed under the Apache License, Version 2.0 (the \"License\");\n * you may not use this file except in compliance with the License.\n * You may obtain a copy of the License at\n *\n * http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing, software\n * distributed under the License is distributed on an \"AS IS\" BASIS,\n * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n * See the License for the specific language governing permissions and\n * limitations under the License.\n *\n * More Info:\n *  https://code.google.com/p/google-diff-match-patch/\n *\n * Usage: QUnit.diff(expected, actual)\n *\n */\nQUnit.diff = ( function() {\n\tfunction DiffMatchPatch() {\n\t}\n\n\t//  DIFF FUNCTIONS\n\n\t/**\n\t * The data structure representing a diff is an array of tuples:\n\t * [[DIFF_DELETE, 'Hello'], [DIFF_INSERT, 'Goodbye'], [DIFF_EQUAL, ' world.']]\n\t * which means: delete 'Hello', add 'Goodbye' and keep ' world.'\n\t */\n\tvar DIFF_DELETE = -1,\n\t\tDIFF_INSERT = 1,\n\t\tDIFF_EQUAL = 0;\n\n\t/**\n\t * Find the differences between two texts.  Simplifies the problem by stripping\n\t * any common prefix or suffix off the texts before diffing.\n\t * @param {string} text1 Old string to be diffed.\n\t * @param {string} text2 New string to be diffed.\n\t * @param {boolean=} optChecklines Optional speedup flag. If present and false,\n\t *     then don't run a line-level diff first to identify the changed areas.\n\t *     Defaults to true, which does a faster, slightly less optimal diff.\n\t * @return {!Array.<!DiffMatchPatch.Diff>} Array of diff tuples.\n\t */\n\tDiffMatchPatch.prototype.DiffMain = function( text1, text2, optChecklines ) {\n\t\tvar deadline, checklines, commonlength,\n\t\t\tcommonprefix, commonsuffix, diffs;\n\n\t\t// The diff must be complete in up to 1 second.\n\t\tdeadline = ( new Date() ).getTime() + 1000;\n\n\t\t// Check for null inputs.\n\t\tif ( text1 === null || text2 === null ) {\n\t\t\tthrow new Error( \"Null input. (DiffMain)\" );\n\t\t}\n\n\t\t// Check for equality (speedup).\n\t\tif ( text1 === text2 ) {\n\t\t\tif ( text1 ) {\n\t\t\t\treturn [\n\t\t\t\t\t[ DIFF_EQUAL, text1 ]\n\t\t\t\t];\n\t\t\t}\n\t\t\treturn [];\n\t\t}\n\n\t\tif ( typeof optChecklines === \"undefined\" ) {\n\t\t\toptChecklines = true;\n\t\t}\n\n\t\tchecklines = optChecklines;\n\n\t\t// Trim off common prefix (speedup).\n\t\tcommonlength = this.diffCommonPrefix( text1, text2 );\n\t\tcommonprefix = text1.substring( 0, commonlength );\n\t\ttext1 = text1.substring( commonlength );\n\t\ttext2 = text2.substring( commonlength );\n\n\t\t// Trim off common suffix (speedup).\n\t\tcommonlength = this.diffCommonSuffix( text1, text2 );\n\t\tcommonsuffix = text1.substring( text1.length - commonlength );\n\t\ttext1 = text1.substring( 0, text1.length - commonlength );\n\t\ttext2 = text2.substring( 0, text2.length - commonlength );\n\n\t\t// Compute the diff on the middle block.\n\t\tdiffs = this.diffCompute( text1, text2, checklines, deadline );\n\n\t\t// Restore the prefix and suffix.\n\t\tif ( commonprefix ) {\n\t\t\tdiffs.unshift( [ DIFF_EQUAL, commonprefix ] );\n\t\t}\n\t\tif ( commonsuffix ) {\n\t\t\tdiffs.push( [ DIFF_EQUAL, commonsuffix ] );\n\t\t}\n\t\tthis.diffCleanupMerge( diffs );\n\t\treturn diffs;\n\t};\n\n\t/**\n\t * Reduce the number of edits by eliminating operationally trivial equalities.\n\t * @param {!Array.<!DiffMatchPatch.Diff>} diffs Array of diff tuples.\n\t */\n\tDiffMatchPatch.prototype.diffCleanupEfficiency = function( diffs ) {\n\t\tvar changes, equalities, equalitiesLength, lastequality,\n\t\t\tpointer, preIns, preDel, postIns, postDel;\n\t\tchanges = false;\n\t\tequalities = []; // Stack of indices where equalities are found.\n\t\tequalitiesLength = 0; // Keeping our own length var is faster in JS.\n\t\t/** @type {?string} */\n\t\tlastequality = null;\n\t\t// Always equal to diffs[equalities[equalitiesLength - 1]][1]\n\t\tpointer = 0; // Index of current position.\n\t\t// Is there an insertion operation before the last equality.\n\t\tpreIns = false;\n\t\t// Is there a deletion operation before the last equality.\n\t\tpreDel = false;\n\t\t// Is there an insertion operation after the last equality.\n\t\tpostIns = false;\n\t\t// Is there a deletion operation after the last equality.\n\t\tpostDel = false;\n\t\twhile ( pointer < diffs.length ) {\n\n\t\t\t// Equality found.\n\t\t\tif ( diffs[ pointer ][ 0 ] === DIFF_EQUAL ) {\n\t\t\t\tif ( diffs[ pointer ][ 1 ].length < 4 && ( postIns || postDel ) ) {\n\n\t\t\t\t\t// Candidate found.\n\t\t\t\t\tequalities[ equalitiesLength++ ] = pointer;\n\t\t\t\t\tpreIns = postIns;\n\t\t\t\t\tpreDel = postDel;\n\t\t\t\t\tlastequality = diffs[ pointer ][ 1 ];\n\t\t\t\t} else {\n\n\t\t\t\t\t// Not a candidate, and can never become one.\n\t\t\t\t\tequalitiesLength = 0;\n\t\t\t\t\tlastequality = null;\n\t\t\t\t}\n\t\t\t\tpostIns = postDel = false;\n\n\t\t\t// An insertion or deletion.\n\t\t\t} else {\n\n\t\t\t\tif ( diffs[ pointer ][ 0 ] === DIFF_DELETE ) {\n\t\t\t\t\tpostDel = true;\n\t\t\t\t} else {\n\t\t\t\t\tpostIns = true;\n\t\t\t\t}\n\n\t\t\t\t/*\n\t\t\t\t * Five types to be split:\n\t\t\t\t * <ins>A</ins><del>B</del>XY<ins>C</ins><del>D</del>\n\t\t\t\t * <ins>A</ins>X<ins>C</ins><del>D</del>\n\t\t\t\t * <ins>A</ins><del>B</del>X<ins>C</ins>\n\t\t\t\t * <ins>A</del>X<ins>C</ins><del>D</del>\n\t\t\t\t * <ins>A</ins><del>B</del>X<del>C</del>\n\t\t\t\t */\n\t\t\t\tif ( lastequality && ( ( preIns && preDel && postIns && postDel ) ||\n\t\t\t\t\t\t( ( lastequality.length < 2 ) &&\n\t\t\t\t\t\t( preIns + preDel + postIns + postDel ) === 3 ) ) ) {\n\n\t\t\t\t\t// Duplicate record.\n\t\t\t\t\tdiffs.splice(\n\t\t\t\t\t\tequalities[ equalitiesLength - 1 ],\n\t\t\t\t\t\t0,\n\t\t\t\t\t\t[ DIFF_DELETE, lastequality ]\n\t\t\t\t\t);\n\n\t\t\t\t\t// Change second copy to insert.\n\t\t\t\t\tdiffs[ equalities[ equalitiesLength - 1 ] + 1 ][ 0 ] = DIFF_INSERT;\n\t\t\t\t\tequalitiesLength--; // Throw away the equality we just deleted;\n\t\t\t\t\tlastequality = null;\n\t\t\t\t\tif ( preIns && preDel ) {\n\t\t\t\t\t\t// No changes made which could affect previous entry, keep going.\n\t\t\t\t\t\tpostIns = postDel = true;\n\t\t\t\t\t\tequalitiesLength = 0;\n\t\t\t\t\t} else {\n\t\t\t\t\t\tequalitiesLength--; // Throw away the previous equality.\n\t\t\t\t\t\tpointer = equalitiesLength > 0 ? equalities[ equalitiesLength - 1 ] : -1;\n\t\t\t\t\t\tpostIns = postDel = false;\n\t\t\t\t\t}\n\t\t\t\t\tchanges = true;\n\t\t\t\t}\n\t\t\t}\n\t\t\tpointer++;\n\t\t}\n\n\t\tif ( changes ) {\n\t\t\tthis.diffCleanupMerge( diffs );\n\t\t}\n\t};\n\n\t/**\n\t * Convert a diff array into a pretty HTML report.\n\t * @param {!Array.<!DiffMatchPatch.Diff>} diffs Array of diff tuples.\n\t * @param {integer} string to be beautified.\n\t * @return {string} HTML representation.\n\t */\n\tDiffMatchPatch.prototype.diffPrettyHtml = function( diffs ) {\n\t\tvar op, data, x,\n\t\t\thtml = [];\n\t\tfor ( x = 0; x < diffs.length; x++ ) {\n\t\t\top = diffs[ x ][ 0 ]; // Operation (insert, delete, equal)\n\t\t\tdata = diffs[ x ][ 1 ]; // Text of change.\n\t\t\tswitch ( op ) {\n\t\t\tcase DIFF_INSERT:\n\t\t\t\thtml[ x ] = \"<ins>\" + data + \"</ins>\";\n\t\t\t\tbreak;\n\t\t\tcase DIFF_DELETE:\n\t\t\t\thtml[ x ] = \"<del>\" + data + \"</del>\";\n\t\t\t\tbreak;\n\t\t\tcase DIFF_EQUAL:\n\t\t\t\thtml[ x ] = \"<span>\" + data + \"</span>\";\n\t\t\t\tbreak;\n\t\t\t}\n\t\t}\n\t\treturn html.join( \"\" );\n\t};\n\n\t/**\n\t * Determine the common prefix of two strings.\n\t * @param {string} text1 First string.\n\t * @param {string} text2 Second string.\n\t * @return {number} The number of characters common to the start of each\n\t *     string.\n\t */\n\tDiffMatchPatch.prototype.diffCommonPrefix = function( text1, text2 ) {\n\t\tvar pointermid, pointermax, pointermin, pointerstart;\n\t\t// Quick check for common null cases.\n\t\tif ( !text1 || !text2 || text1.charAt( 0 ) !== text2.charAt( 0 ) ) {\n\t\t\treturn 0;\n\t\t}\n\t\t// Binary search.\n\t\t// Performance analysis: http://neil.fraser.name/news/2007/10/09/\n\t\tpointermin = 0;\n\t\tpointermax = Math.min( text1.length, text2.length );\n\t\tpointermid = pointermax;\n\t\tpointerstart = 0;\n\t\twhile ( pointermin < pointermid ) {\n\t\t\tif ( text1.substring( pointerstart, pointermid ) ===\n\t\t\t\t\ttext2.substring( pointerstart, pointermid ) ) {\n\t\t\t\tpointermin = pointermid;\n\t\t\t\tpointerstart = pointermin;\n\t\t\t} else {\n\t\t\t\tpointermax = pointermid;\n\t\t\t}\n\t\t\tpointermid = Math.floor( ( pointermax - pointermin ) / 2 + pointermin );\n\t\t}\n\t\treturn pointermid;\n\t};\n\n\t/**\n\t * Determine the common suffix of two strings.\n\t * @param {string} text1 First string.\n\t * @param {string} text2 Second string.\n\t * @return {number} The number of characters common to the end of each string.\n\t */\n\tDiffMatchPatch.prototype.diffCommonSuffix = function( text1, text2 ) {\n\t\tvar pointermid, pointermax, pointermin, pointerend;\n\t\t// Quick check for common null cases.\n\t\tif ( !text1 ||\n\t\t\t\t!text2 ||\n\t\t\t\ttext1.charAt( text1.length - 1 ) !== text2.charAt( text2.length - 1 ) ) {\n\t\t\treturn 0;\n\t\t}\n\t\t// Binary search.\n\t\t// Performance analysis: http://neil.fraser.name/news/2007/10/09/\n\t\tpointermin = 0;\n\t\tpointermax = Math.min( text1.length, text2.length );\n\t\tpointermid = pointermax;\n\t\tpointerend = 0;\n\t\twhile ( pointermin < pointermid ) {\n\t\t\tif ( text1.substring( text1.length - pointermid, text1.length - pointerend ) ===\n\t\t\t\t\ttext2.substring( text2.length - pointermid, text2.length - pointerend ) ) {\n\t\t\t\tpointermin = pointermid;\n\t\t\t\tpointerend = pointermin;\n\t\t\t} else {\n\t\t\t\tpointermax = pointermid;\n\t\t\t}\n\t\t\tpointermid = Math.floor( ( pointermax - pointermin ) / 2 + pointermin );\n\t\t}\n\t\treturn pointermid;\n\t};\n\n\t/**\n\t * Find the differences between two texts.  Assumes that the texts do not\n\t * have any common prefix or suffix.\n\t * @param {string} text1 Old string to be diffed.\n\t * @param {string} text2 New string to be diffed.\n\t * @param {boolean} checklines Speedup flag.  If false, then don't run a\n\t *     line-level diff first to identify the changed areas.\n\t *     If true, then run a faster, slightly less optimal diff.\n\t * @param {number} deadline Time when the diff should be complete by.\n\t * @return {!Array.<!DiffMatchPatch.Diff>} Array of diff tuples.\n\t * @private\n\t */\n\tDiffMatchPatch.prototype.diffCompute = function( text1, text2, checklines, deadline ) {\n\t\tvar diffs, longtext, shorttext, i, hm,\n\t\t\ttext1A, text2A, text1B, text2B,\n\t\t\tmidCommon, diffsA, diffsB;\n\n\t\tif ( !text1 ) {\n\t\t\t// Just add some text (speedup).\n\t\t\treturn [\n\t\t\t\t[ DIFF_INSERT, text2 ]\n\t\t\t];\n\t\t}\n\n\t\tif ( !text2 ) {\n\t\t\t// Just delete some text (speedup).\n\t\t\treturn [\n\t\t\t\t[ DIFF_DELETE, text1 ]\n\t\t\t];\n\t\t}\n\n\t\tlongtext = text1.length > text2.length ? text1 : text2;\n\t\tshorttext = text1.length > text2.length ? text2 : text1;\n\t\ti = longtext.indexOf( shorttext );\n\t\tif ( i !== -1 ) {\n\t\t\t// Shorter text is inside the longer text (speedup).\n\t\t\tdiffs = [\n\t\t\t\t[ DIFF_INSERT, longtext.substring( 0, i ) ],\n\t\t\t\t[ DIFF_EQUAL, shorttext ],\n\t\t\t\t[ DIFF_INSERT, longtext.substring( i + shorttext.length ) ]\n\t\t\t];\n\t\t\t// Swap insertions for deletions if diff is reversed.\n\t\t\tif ( text1.length > text2.length ) {\n\t\t\t\tdiffs[ 0 ][ 0 ] = diffs[ 2 ][ 0 ] = DIFF_DELETE;\n\t\t\t}\n\t\t\treturn diffs;\n\t\t}\n\n\t\tif ( shorttext.length === 1 ) {\n\t\t\t// Single character string.\n\t\t\t// After the previous speedup, the character can't be an equality.\n\t\t\treturn [\n\t\t\t\t[ DIFF_DELETE, text1 ],\n\t\t\t\t[ DIFF_INSERT, text2 ]\n\t\t\t];\n\t\t}\n\n\t\t// Check to see if the problem can be split in two.\n\t\thm = this.diffHalfMatch( text1, text2 );\n\t\tif ( hm ) {\n\t\t\t// A half-match was found, sort out the return data.\n\t\t\ttext1A = hm[ 0 ];\n\t\t\ttext1B = hm[ 1 ];\n\t\t\ttext2A = hm[ 2 ];\n\t\t\ttext2B = hm[ 3 ];\n\t\t\tmidCommon = hm[ 4 ];\n\t\t\t// Send both pairs off for separate processing.\n\t\t\tdiffsA = this.DiffMain( text1A, text2A, checklines, deadline );\n\t\t\tdiffsB = this.DiffMain( text1B, text2B, checklines, deadline );\n\t\t\t// Merge the results.\n\t\t\treturn diffsA.concat( [\n\t\t\t\t[ DIFF_EQUAL, midCommon ]\n\t\t\t], diffsB );\n\t\t}\n\n\t\tif ( checklines && text1.length > 100 && text2.length > 100 ) {\n\t\t\treturn this.diffLineMode( text1, text2, deadline );\n\t\t}\n\n\t\treturn this.diffBisect( text1, text2, deadline );\n\t};\n\n\t/**\n\t * Do the two texts share a substring which is at least half the length of the\n\t * longer text?\n\t * This speedup can produce non-minimal diffs.\n\t * @param {string} text1 First string.\n\t * @param {string} text2 Second string.\n\t * @return {Array.<string>} Five element Array, containing the prefix of\n\t *     text1, the suffix of text1, the prefix of text2, the suffix of\n\t *     text2 and the common middle.  Or null if there was no match.\n\t * @private\n\t */\n\tDiffMatchPatch.prototype.diffHalfMatch = function( text1, text2 ) {\n\t\tvar longtext, shorttext, dmp,\n\t\t\ttext1A, text2B, text2A, text1B, midCommon,\n\t\t\thm1, hm2, hm;\n\n\t\tlongtext = text1.length > text2.length ? text1 : text2;\n\t\tshorttext = text1.length > text2.length ? text2 : text1;\n\t\tif ( longtext.length < 4 || shorttext.length * 2 < longtext.length ) {\n\t\t\treturn null; // Pointless.\n\t\t}\n\t\tdmp = this; // 'this' becomes 'window' in a closure.\n\n\t\t/**\n\t\t * Does a substring of shorttext exist within longtext such that the substring\n\t\t * is at least half the length of longtext?\n\t\t * Closure, but does not reference any external variables.\n\t\t * @param {string} longtext Longer string.\n\t\t * @param {string} shorttext Shorter string.\n\t\t * @param {number} i Start index of quarter length substring within longtext.\n\t\t * @return {Array.<string>} Five element Array, containing the prefix of\n\t\t *     longtext, the suffix of longtext, the prefix of shorttext, the suffix\n\t\t *     of shorttext and the common middle.  Or null if there was no match.\n\t\t * @private\n\t\t */\n\t\tfunction diffHalfMatchI( longtext, shorttext, i ) {\n\t\t\tvar seed, j, bestCommon, prefixLength, suffixLength,\n\t\t\t\tbestLongtextA, bestLongtextB, bestShorttextA, bestShorttextB;\n\t\t\t// Start with a 1/4 length substring at position i as a seed.\n\t\t\tseed = longtext.substring( i, i + Math.floor( longtext.length / 4 ) );\n\t\t\tj = -1;\n\t\t\tbestCommon = \"\";\n\t\t\twhile ( ( j = shorttext.indexOf( seed, j + 1 ) ) !== -1 ) {\n\t\t\t\tprefixLength = dmp.diffCommonPrefix( longtext.substring( i ),\n\t\t\t\t\tshorttext.substring( j ) );\n\t\t\t\tsuffixLength = dmp.diffCommonSuffix( longtext.substring( 0, i ),\n\t\t\t\t\tshorttext.substring( 0, j ) );\n\t\t\t\tif ( bestCommon.length < suffixLength + prefixLength ) {\n\t\t\t\t\tbestCommon = shorttext.substring( j - suffixLength, j ) +\n\t\t\t\t\t\tshorttext.substring( j, j + prefixLength );\n\t\t\t\t\tbestLongtextA = longtext.substring( 0, i - suffixLength );\n\t\t\t\t\tbestLongtextB = longtext.substring( i + prefixLength );\n\t\t\t\t\tbestShorttextA = shorttext.substring( 0, j - suffixLength );\n\t\t\t\t\tbestShorttextB = shorttext.substring( j + prefixLength );\n\t\t\t\t}\n\t\t\t}\n\t\t\tif ( bestCommon.length * 2 >= longtext.length ) {\n\t\t\t\treturn [ bestLongtextA, bestLongtextB,\n\t\t\t\t\tbestShorttextA, bestShorttextB, bestCommon\n\t\t\t\t];\n\t\t\t} else {\n\t\t\t\treturn null;\n\t\t\t}\n\t\t}\n\n\t\t// First check if the second quarter is the seed for a half-match.\n\t\thm1 = diffHalfMatchI( longtext, shorttext,\n\t\t\tMath.ceil( longtext.length / 4 ) );\n\t\t// Check again based on the third quarter.\n\t\thm2 = diffHalfMatchI( longtext, shorttext,\n\t\t\tMath.ceil( longtext.length / 2 ) );\n\t\tif ( !hm1 && !hm2 ) {\n\t\t\treturn null;\n\t\t} else if ( !hm2 ) {\n\t\t\thm = hm1;\n\t\t} else if ( !hm1 ) {\n\t\t\thm = hm2;\n\t\t} else {\n\t\t\t// Both matched.  Select the longest.\n\t\t\thm = hm1[ 4 ].length > hm2[ 4 ].length ? hm1 : hm2;\n\t\t}\n\n\t\t// A half-match was found, sort out the return data.\n\t\ttext1A, text1B, text2A, text2B;\n\t\tif ( text1.length > text2.length ) {\n\t\t\ttext1A = hm[ 0 ];\n\t\t\ttext1B = hm[ 1 ];\n\t\t\ttext2A = hm[ 2 ];\n\t\t\ttext2B = hm[ 3 ];\n\t\t} else {\n\t\t\ttext2A = hm[ 0 ];\n\t\t\ttext2B = hm[ 1 ];\n\t\t\ttext1A = hm[ 2 ];\n\t\t\ttext1B = hm[ 3 ];\n\t\t}\n\t\tmidCommon = hm[ 4 ];\n\t\treturn [ text1A, text1B, text2A, text2B, midCommon ];\n\t};\n\n\t/**\n\t * Do a quick line-level diff on both strings, then rediff the parts for\n\t * greater accuracy.\n\t * This speedup can produce non-minimal diffs.\n\t * @param {string} text1 Old string to be diffed.\n\t * @param {string} text2 New string to be diffed.\n\t * @param {number} deadline Time when the diff should be complete by.\n\t * @return {!Array.<!DiffMatchPatch.Diff>} Array of diff tuples.\n\t * @private\n\t */\n\tDiffMatchPatch.prototype.diffLineMode = function( text1, text2, deadline ) {\n\t\tvar this$1 = this;\n\n\t\tvar a, diffs, linearray, pointer, countInsert,\n\t\t\tcountDelete, textInsert, textDelete, j;\n\t\t// Scan the text on a line-by-line basis first.\n\t\ta = this.diffLinesToChars( text1, text2 );\n\t\ttext1 = a.chars1;\n\t\ttext2 = a.chars2;\n\t\tlinearray = a.lineArray;\n\n\t\tdiffs = this.DiffMain( text1, text2, false, deadline );\n\n\t\t// Convert the diff back to original text.\n\t\tthis.diffCharsToLines( diffs, linearray );\n\t\t// Eliminate freak matches (e.g. blank lines)\n\t\tthis.diffCleanupSemantic( diffs );\n\n\t\t// Rediff any replacement blocks, this time character-by-character.\n\t\t// Add a dummy entry at the end.\n\t\tdiffs.push( [ DIFF_EQUAL, \"\" ] );\n\t\tpointer = 0;\n\t\tcountDelete = 0;\n\t\tcountInsert = 0;\n\t\ttextDelete = \"\";\n\t\ttextInsert = \"\";\n\t\twhile ( pointer < diffs.length ) {\n\t\t\tswitch ( diffs[ pointer ][ 0 ] ) {\n\t\t\tcase DIFF_INSERT:\n\t\t\t\tcountInsert++;\n\t\t\t\ttextInsert += diffs[ pointer ][ 1 ];\n\t\t\t\tbreak;\n\t\t\tcase DIFF_DELETE:\n\t\t\t\tcountDelete++;\n\t\t\t\ttextDelete += diffs[ pointer ][ 1 ];\n\t\t\t\tbreak;\n\t\t\tcase DIFF_EQUAL:\n\t\t\t\t// Upon reaching an equality, check for prior redundancies.\n\t\t\t\tif ( countDelete >= 1 && countInsert >= 1 ) {\n\t\t\t\t\t// Delete the offending records and add the merged ones.\n\t\t\t\t\tdiffs.splice( pointer - countDelete - countInsert,\n\t\t\t\t\t\tcountDelete + countInsert );\n\t\t\t\t\tpointer = pointer - countDelete - countInsert;\n\t\t\t\t\ta = this$1.DiffMain( textDelete, textInsert, false, deadline );\n\t\t\t\t\tfor ( j = a.length - 1; j >= 0; j-- ) {\n\t\t\t\t\t\tdiffs.splice( pointer, 0, a[ j ] );\n\t\t\t\t\t}\n\t\t\t\t\tpointer = pointer + a.length;\n\t\t\t\t}\n\t\t\t\tcountInsert = 0;\n\t\t\t\tcountDelete = 0;\n\t\t\t\ttextDelete = \"\";\n\t\t\t\ttextInsert = \"\";\n\t\t\t\tbreak;\n\t\t\t}\n\t\t\tpointer++;\n\t\t}\n\t\tdiffs.pop(); // Remove the dummy entry at the end.\n\n\t\treturn diffs;\n\t};\n\n\t/**\n\t * Find the 'middle snake' of a diff, split the problem in two\n\t * and return the recursively constructed diff.\n\t * See Myers 1986 paper: An O(ND) Difference Algorithm and Its Variations.\n\t * @param {string} text1 Old string to be diffed.\n\t * @param {string} text2 New string to be diffed.\n\t * @param {number} deadline Time at which to bail if not yet complete.\n\t * @return {!Array.<!DiffMatchPatch.Diff>} Array of diff tuples.\n\t * @private\n\t */\n\tDiffMatchPatch.prototype.diffBisect = function( text1, text2, deadline ) {\n\t\tvar this$1 = this;\n\n\t\tvar text1Length, text2Length, maxD, vOffset, vLength,\n\t\t\tv1, v2, x, delta, front, k1start, k1end, k2start,\n\t\t\tk2end, k2Offset, k1Offset, x1, x2, y1, y2, d, k1, k2;\n\t\t// Cache the text lengths to prevent multiple calls.\n\t\ttext1Length = text1.length;\n\t\ttext2Length = text2.length;\n\t\tmaxD = Math.ceil( ( text1Length + text2Length ) / 2 );\n\t\tvOffset = maxD;\n\t\tvLength = 2 * maxD;\n\t\tv1 = new Array( vLength );\n\t\tv2 = new Array( vLength );\n\t\t// Setting all elements to -1 is faster in Chrome & Firefox than mixing\n\t\t// integers and undefined.\n\t\tfor ( x = 0; x < vLength; x++ ) {\n\t\t\tv1[ x ] = -1;\n\t\t\tv2[ x ] = -1;\n\t\t}\n\t\tv1[ vOffset + 1 ] = 0;\n\t\tv2[ vOffset + 1 ] = 0;\n\t\tdelta = text1Length - text2Length;\n\t\t// If the total number of characters is odd, then the front path will collide\n\t\t// with the reverse path.\n\t\tfront = ( delta % 2 !== 0 );\n\t\t// Offsets for start and end of k loop.\n\t\t// Prevents mapping of space beyond the grid.\n\t\tk1start = 0;\n\t\tk1end = 0;\n\t\tk2start = 0;\n\t\tk2end = 0;\n\t\tfor ( d = 0; d < maxD; d++ ) {\n\t\t\t// Bail out if deadline is reached.\n\t\t\tif ( ( new Date() ).getTime() > deadline ) {\n\t\t\t\tbreak;\n\t\t\t}\n\n\t\t\t// Walk the front path one step.\n\t\t\tfor ( k1 = -d + k1start; k1 <= d - k1end; k1 += 2 ) {\n\t\t\t\tk1Offset = vOffset + k1;\n\t\t\t\tif ( k1 === -d || ( k1 !== d && v1[ k1Offset - 1 ] < v1[ k1Offset + 1 ] ) ) {\n\t\t\t\t\tx1 = v1[ k1Offset + 1 ];\n\t\t\t\t} else {\n\t\t\t\t\tx1 = v1[ k1Offset - 1 ] + 1;\n\t\t\t\t}\n\t\t\t\ty1 = x1 - k1;\n\t\t\t\twhile ( x1 < text1Length && y1 < text2Length &&\n\t\t\t\t\ttext1.charAt( x1 ) === text2.charAt( y1 ) ) {\n\t\t\t\t\tx1++;\n\t\t\t\t\ty1++;\n\t\t\t\t}\n\t\t\t\tv1[ k1Offset ] = x1;\n\t\t\t\tif ( x1 > text1Length ) {\n\t\t\t\t\t// Ran off the right of the graph.\n\t\t\t\t\tk1end += 2;\n\t\t\t\t} else if ( y1 > text2Length ) {\n\t\t\t\t\t// Ran off the bottom of the graph.\n\t\t\t\t\tk1start += 2;\n\t\t\t\t} else if ( front ) {\n\t\t\t\t\tk2Offset = vOffset + delta - k1;\n\t\t\t\t\tif ( k2Offset >= 0 && k2Offset < vLength && v2[ k2Offset ] !== -1 ) {\n\t\t\t\t\t\t// Mirror x2 onto top-left coordinate system.\n\t\t\t\t\t\tx2 = text1Length - v2[ k2Offset ];\n\t\t\t\t\t\tif ( x1 >= x2 ) {\n\t\t\t\t\t\t\t// Overlap detected.\n\t\t\t\t\t\t\treturn this$1.diffBisectSplit( text1, text2, x1, y1, deadline );\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\n\t\t\t// Walk the reverse path one step.\n\t\t\tfor ( k2 = -d + k2start; k2 <= d - k2end; k2 += 2 ) {\n\t\t\t\tk2Offset = vOffset + k2;\n\t\t\t\tif ( k2 === -d || ( k2 !== d && v2[ k2Offset - 1 ] < v2[ k2Offset + 1 ] ) ) {\n\t\t\t\t\tx2 = v2[ k2Offset + 1 ];\n\t\t\t\t} else {\n\t\t\t\t\tx2 = v2[ k2Offset - 1 ] + 1;\n\t\t\t\t}\n\t\t\t\ty2 = x2 - k2;\n\t\t\t\twhile ( x2 < text1Length && y2 < text2Length &&\n\t\t\t\t\ttext1.charAt( text1Length - x2 - 1 ) ===\n\t\t\t\t\ttext2.charAt( text2Length - y2 - 1 ) ) {\n\t\t\t\t\tx2++;\n\t\t\t\t\ty2++;\n\t\t\t\t}\n\t\t\t\tv2[ k2Offset ] = x2;\n\t\t\t\tif ( x2 > text1Length ) {\n\t\t\t\t\t// Ran off the left of the graph.\n\t\t\t\t\tk2end += 2;\n\t\t\t\t} else if ( y2 > text2Length ) {\n\t\t\t\t\t// Ran off the top of the graph.\n\t\t\t\t\tk2start += 2;\n\t\t\t\t} else if ( !front ) {\n\t\t\t\t\tk1Offset = vOffset + delta - k2;\n\t\t\t\t\tif ( k1Offset >= 0 && k1Offset < vLength && v1[ k1Offset ] !== -1 ) {\n\t\t\t\t\t\tx1 = v1[ k1Offset ];\n\t\t\t\t\t\ty1 = vOffset + x1 - k1Offset;\n\t\t\t\t\t\t// Mirror x2 onto top-left coordinate system.\n\t\t\t\t\t\tx2 = text1Length - x2;\n\t\t\t\t\t\tif ( x1 >= x2 ) {\n\t\t\t\t\t\t\t// Overlap detected.\n\t\t\t\t\t\t\treturn this$1.diffBisectSplit( text1, text2, x1, y1, deadline );\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t\t// Diff took too long and hit the deadline or\n\t\t// number of diffs equals number of characters, no commonality at all.\n\t\treturn [\n\t\t\t[ DIFF_DELETE, text1 ],\n\t\t\t[ DIFF_INSERT, text2 ]\n\t\t];\n\t};\n\n\t/**\n\t * Given the location of the 'middle snake', split the diff in two parts\n\t * and recurse.\n\t * @param {string} text1 Old string to be diffed.\n\t * @param {string} text2 New string to be diffed.\n\t * @param {number} x Index of split point in text1.\n\t * @param {number} y Index of split point in text2.\n\t * @param {number} deadline Time at which to bail if not yet complete.\n\t * @return {!Array.<!DiffMatchPatch.Diff>} Array of diff tuples.\n\t * @private\n\t */\n\tDiffMatchPatch.prototype.diffBisectSplit = function( text1, text2, x, y, deadline ) {\n\t\tvar text1a, text1b, text2a, text2b, diffs, diffsb;\n\t\ttext1a = text1.substring( 0, x );\n\t\ttext2a = text2.substring( 0, y );\n\t\ttext1b = text1.substring( x );\n\t\ttext2b = text2.substring( y );\n\n\t\t// Compute both diffs serially.\n\t\tdiffs = this.DiffMain( text1a, text2a, false, deadline );\n\t\tdiffsb = this.DiffMain( text1b, text2b, false, deadline );\n\n\t\treturn diffs.concat( diffsb );\n\t};\n\n\t/**\n\t * Reduce the number of edits by eliminating semantically trivial equalities.\n\t * @param {!Array.<!DiffMatchPatch.Diff>} diffs Array of diff tuples.\n\t */\n\tDiffMatchPatch.prototype.diffCleanupSemantic = function( diffs ) {\n\t\tvar this$1 = this;\n\n\t\tvar changes, equalities, equalitiesLength, lastequality,\n\t\t\tpointer, lengthInsertions2, lengthDeletions2, lengthInsertions1,\n\t\t\tlengthDeletions1, deletion, insertion, overlapLength1, overlapLength2;\n\t\tchanges = false;\n\t\tequalities = []; // Stack of indices where equalities are found.\n\t\tequalitiesLength = 0; // Keeping our own length var is faster in JS.\n\t\t/** @type {?string} */\n\t\tlastequality = null;\n\t\t// Always equal to diffs[equalities[equalitiesLength - 1]][1]\n\t\tpointer = 0; // Index of current position.\n\t\t// Number of characters that changed prior to the equality.\n\t\tlengthInsertions1 = 0;\n\t\tlengthDeletions1 = 0;\n\t\t// Number of characters that changed after the equality.\n\t\tlengthInsertions2 = 0;\n\t\tlengthDeletions2 = 0;\n\t\twhile ( pointer < diffs.length ) {\n\t\t\tif ( diffs[ pointer ][ 0 ] === DIFF_EQUAL ) { // Equality found.\n\t\t\t\tequalities[ equalitiesLength++ ] = pointer;\n\t\t\t\tlengthInsertions1 = lengthInsertions2;\n\t\t\t\tlengthDeletions1 = lengthDeletions2;\n\t\t\t\tlengthInsertions2 = 0;\n\t\t\t\tlengthDeletions2 = 0;\n\t\t\t\tlastequality = diffs[ pointer ][ 1 ];\n\t\t\t} else { // An insertion or deletion.\n\t\t\t\tif ( diffs[ pointer ][ 0 ] === DIFF_INSERT ) {\n\t\t\t\t\tlengthInsertions2 += diffs[ pointer ][ 1 ].length;\n\t\t\t\t} else {\n\t\t\t\t\tlengthDeletions2 += diffs[ pointer ][ 1 ].length;\n\t\t\t\t}\n\t\t\t\t// Eliminate an equality that is smaller or equal to the edits on both\n\t\t\t\t// sides of it.\n\t\t\t\tif ( lastequality && ( lastequality.length <=\n\t\t\t\t\t\tMath.max( lengthInsertions1, lengthDeletions1 ) ) &&\n\t\t\t\t\t\t( lastequality.length <= Math.max( lengthInsertions2,\n\t\t\t\t\t\t\tlengthDeletions2 ) ) ) {\n\n\t\t\t\t\t// Duplicate record.\n\t\t\t\t\tdiffs.splice(\n\t\t\t\t\t\tequalities[ equalitiesLength - 1 ],\n\t\t\t\t\t\t0,\n\t\t\t\t\t\t[ DIFF_DELETE, lastequality ]\n\t\t\t\t\t);\n\n\t\t\t\t\t// Change second copy to insert.\n\t\t\t\t\tdiffs[ equalities[ equalitiesLength - 1 ] + 1 ][ 0 ] = DIFF_INSERT;\n\n\t\t\t\t\t// Throw away the equality we just deleted.\n\t\t\t\t\tequalitiesLength--;\n\n\t\t\t\t\t// Throw away the previous equality (it needs to be reevaluated).\n\t\t\t\t\tequalitiesLength--;\n\t\t\t\t\tpointer = equalitiesLength > 0 ? equalities[ equalitiesLength - 1 ] : -1;\n\n\t\t\t\t\t// Reset the counters.\n\t\t\t\t\tlengthInsertions1 = 0;\n\t\t\t\t\tlengthDeletions1 = 0;\n\t\t\t\t\tlengthInsertions2 = 0;\n\t\t\t\t\tlengthDeletions2 = 0;\n\t\t\t\t\tlastequality = null;\n\t\t\t\t\tchanges = true;\n\t\t\t\t}\n\t\t\t}\n\t\t\tpointer++;\n\t\t}\n\n\t\t// Normalize the diff.\n\t\tif ( changes ) {\n\t\t\tthis.diffCleanupMerge( diffs );\n\t\t}\n\n\t\t// Find any overlaps between deletions and insertions.\n\t\t// e.g: <del>abcxxx</del><ins>xxxdef</ins>\n\t\t//   -> <del>abc</del>xxx<ins>def</ins>\n\t\t// e.g: <del>xxxabc</del><ins>defxxx</ins>\n\t\t//   -> <ins>def</ins>xxx<del>abc</del>\n\t\t// Only extract an overlap if it is as big as the edit ahead or behind it.\n\t\tpointer = 1;\n\t\twhile ( pointer < diffs.length ) {\n\t\t\tif ( diffs[ pointer - 1 ][ 0 ] === DIFF_DELETE &&\n\t\t\t\t\tdiffs[ pointer ][ 0 ] === DIFF_INSERT ) {\n\t\t\t\tdeletion = diffs[ pointer - 1 ][ 1 ];\n\t\t\t\tinsertion = diffs[ pointer ][ 1 ];\n\t\t\t\toverlapLength1 = this$1.diffCommonOverlap( deletion, insertion );\n\t\t\t\toverlapLength2 = this$1.diffCommonOverlap( insertion, deletion );\n\t\t\t\tif ( overlapLength1 >= overlapLength2 ) {\n\t\t\t\t\tif ( overlapLength1 >= deletion.length / 2 ||\n\t\t\t\t\t\t\toverlapLength1 >= insertion.length / 2 ) {\n\t\t\t\t\t\t// Overlap found.  Insert an equality and trim the surrounding edits.\n\t\t\t\t\t\tdiffs.splice(\n\t\t\t\t\t\t\tpointer,\n\t\t\t\t\t\t\t0,\n\t\t\t\t\t\t\t[ DIFF_EQUAL, insertion.substring( 0, overlapLength1 ) ]\n\t\t\t\t\t\t);\n\t\t\t\t\t\tdiffs[ pointer - 1 ][ 1 ] =\n\t\t\t\t\t\t\tdeletion.substring( 0, deletion.length - overlapLength1 );\n\t\t\t\t\t\tdiffs[ pointer + 1 ][ 1 ] = insertion.substring( overlapLength1 );\n\t\t\t\t\t\tpointer++;\n\t\t\t\t\t}\n\t\t\t\t} else {\n\t\t\t\t\tif ( overlapLength2 >= deletion.length / 2 ||\n\t\t\t\t\t\t\toverlapLength2 >= insertion.length / 2 ) {\n\n\t\t\t\t\t\t// Reverse overlap found.\n\t\t\t\t\t\t// Insert an equality and swap and trim the surrounding edits.\n\t\t\t\t\t\tdiffs.splice(\n\t\t\t\t\t\t\tpointer,\n\t\t\t\t\t\t\t0,\n\t\t\t\t\t\t\t[ DIFF_EQUAL, deletion.substring( 0, overlapLength2 ) ]\n\t\t\t\t\t\t);\n\n\t\t\t\t\t\tdiffs[ pointer - 1 ][ 0 ] = DIFF_INSERT;\n\t\t\t\t\t\tdiffs[ pointer - 1 ][ 1 ] =\n\t\t\t\t\t\t\tinsertion.substring( 0, insertion.length - overlapLength2 );\n\t\t\t\t\t\tdiffs[ pointer + 1 ][ 0 ] = DIFF_DELETE;\n\t\t\t\t\t\tdiffs[ pointer + 1 ][ 1 ] =\n\t\t\t\t\t\t\tdeletion.substring( overlapLength2 );\n\t\t\t\t\t\tpointer++;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tpointer++;\n\t\t\t}\n\t\t\tpointer++;\n\t\t}\n\t};\n\n\t/**\n\t * Determine if the suffix of one string is the prefix of another.\n\t * @param {string} text1 First string.\n\t * @param {string} text2 Second string.\n\t * @return {number} The number of characters common to the end of the first\n\t *     string and the start of the second string.\n\t * @private\n\t */\n\tDiffMatchPatch.prototype.diffCommonOverlap = function( text1, text2 ) {\n\t\tvar text1Length, text2Length, textLength,\n\t\t\tbest, length, pattern, found;\n\t\t// Cache the text lengths to prevent multiple calls.\n\t\ttext1Length = text1.length;\n\t\ttext2Length = text2.length;\n\t\t// Eliminate the null case.\n\t\tif ( text1Length === 0 || text2Length === 0 ) {\n\t\t\treturn 0;\n\t\t}\n\t\t// Truncate the longer string.\n\t\tif ( text1Length > text2Length ) {\n\t\t\ttext1 = text1.substring( text1Length - text2Length );\n\t\t} else if ( text1Length < text2Length ) {\n\t\t\ttext2 = text2.substring( 0, text1Length );\n\t\t}\n\t\ttextLength = Math.min( text1Length, text2Length );\n\t\t// Quick check for the worst case.\n\t\tif ( text1 === text2 ) {\n\t\t\treturn textLength;\n\t\t}\n\n\t\t// Start by looking for a single character match\n\t\t// and increase length until no match is found.\n\t\t// Performance analysis: http://neil.fraser.name/news/2010/11/04/\n\t\tbest = 0;\n\t\tlength = 1;\n\t\twhile ( true ) {\n\t\t\tpattern = text1.substring( textLength - length );\n\t\t\tfound = text2.indexOf( pattern );\n\t\t\tif ( found === -1 ) {\n\t\t\t\treturn best;\n\t\t\t}\n\t\t\tlength += found;\n\t\t\tif ( found === 0 || text1.substring( textLength - length ) ===\n\t\t\t\t\ttext2.substring( 0, length ) ) {\n\t\t\t\tbest = length;\n\t\t\t\tlength++;\n\t\t\t}\n\t\t}\n\t};\n\n\t/**\n\t * Split two texts into an array of strings.  Reduce the texts to a string of\n\t * hashes where each Unicode character represents one line.\n\t * @param {string} text1 First string.\n\t * @param {string} text2 Second string.\n\t * @return {{chars1: string, chars2: string, lineArray: !Array.<string>}}\n\t *     An object containing the encoded text1, the encoded text2 and\n\t *     the array of unique strings.\n\t *     The zeroth element of the array of unique strings is intentionally blank.\n\t * @private\n\t */\n\tDiffMatchPatch.prototype.diffLinesToChars = function( text1, text2 ) {\n\t\tvar lineArray, lineHash, chars1, chars2;\n\t\tlineArray = []; // e.g. lineArray[4] === 'Hello\\n'\n\t\tlineHash = {}; // e.g. lineHash['Hello\\n'] === 4\n\n\t\t// '\\x00' is a valid character, but various debuggers don't like it.\n\t\t// So we'll insert a junk entry to avoid generating a null character.\n\t\tlineArray[ 0 ] = \"\";\n\n\t\t/**\n\t\t * Split a text into an array of strings.  Reduce the texts to a string of\n\t\t * hashes where each Unicode character represents one line.\n\t\t * Modifies linearray and linehash through being a closure.\n\t\t * @param {string} text String to encode.\n\t\t * @return {string} Encoded string.\n\t\t * @private\n\t\t */\n\t\tfunction diffLinesToCharsMunge( text ) {\n\t\t\tvar chars, lineStart, lineEnd, lineArrayLength, line;\n\t\t\tchars = \"\";\n\t\t\t// Walk the text, pulling out a substring for each line.\n\t\t\t// text.split('\\n') would would temporarily double our memory footprint.\n\t\t\t// Modifying text would create many large strings to garbage collect.\n\t\t\tlineStart = 0;\n\t\t\tlineEnd = -1;\n\t\t\t// Keeping our own length variable is faster than looking it up.\n\t\t\tlineArrayLength = lineArray.length;\n\t\t\twhile ( lineEnd < text.length - 1 ) {\n\t\t\t\tlineEnd = text.indexOf( \"\\n\", lineStart );\n\t\t\t\tif ( lineEnd === -1 ) {\n\t\t\t\t\tlineEnd = text.length - 1;\n\t\t\t\t}\n\t\t\t\tline = text.substring( lineStart, lineEnd + 1 );\n\t\t\t\tlineStart = lineEnd + 1;\n\n\t\t\t\tif ( lineHash.hasOwnProperty ? lineHash.hasOwnProperty( line ) :\n\t\t\t\t\t\t\t( lineHash[ line ] !== undefined ) ) {\n\t\t\t\t\tchars += String.fromCharCode( lineHash[ line ] );\n\t\t\t\t} else {\n\t\t\t\t\tchars += String.fromCharCode( lineArrayLength );\n\t\t\t\t\tlineHash[ line ] = lineArrayLength;\n\t\t\t\t\tlineArray[ lineArrayLength++ ] = line;\n\t\t\t\t}\n\t\t\t}\n\t\t\treturn chars;\n\t\t}\n\n\t\tchars1 = diffLinesToCharsMunge( text1 );\n\t\tchars2 = diffLinesToCharsMunge( text2 );\n\t\treturn {\n\t\t\tchars1: chars1,\n\t\t\tchars2: chars2,\n\t\t\tlineArray: lineArray\n\t\t};\n\t};\n\n\t/**\n\t * Rehydrate the text in a diff from a string of line hashes to real lines of\n\t * text.\n\t * @param {!Array.<!DiffMatchPatch.Diff>} diffs Array of diff tuples.\n\t * @param {!Array.<string>} lineArray Array of unique strings.\n\t * @private\n\t */\n\tDiffMatchPatch.prototype.diffCharsToLines = function( diffs, lineArray ) {\n\t\tvar x, chars, text, y;\n\t\tfor ( x = 0; x < diffs.length; x++ ) {\n\t\t\tchars = diffs[ x ][ 1 ];\n\t\t\ttext = [];\n\t\t\tfor ( y = 0; y < chars.length; y++ ) {\n\t\t\t\ttext[ y ] = lineArray[ chars.charCodeAt( y ) ];\n\t\t\t}\n\t\t\tdiffs[ x ][ 1 ] = text.join( \"\" );\n\t\t}\n\t};\n\n\t/**\n\t * Reorder and merge like edit sections.  Merge equalities.\n\t * Any edit section can move as long as it doesn't cross an equality.\n\t * @param {!Array.<!DiffMatchPatch.Diff>} diffs Array of diff tuples.\n\t */\n\tDiffMatchPatch.prototype.diffCleanupMerge = function( diffs ) {\n\t\tvar this$1 = this;\n\n\t\tvar pointer, countDelete, countInsert, textInsert, textDelete,\n\t\t\tcommonlength, changes, diffPointer, position;\n\t\tdiffs.push( [ DIFF_EQUAL, \"\" ] ); // Add a dummy entry at the end.\n\t\tpointer = 0;\n\t\tcountDelete = 0;\n\t\tcountInsert = 0;\n\t\ttextDelete = \"\";\n\t\ttextInsert = \"\";\n\t\tcommonlength;\n\t\twhile ( pointer < diffs.length ) {\n\t\t\tswitch ( diffs[ pointer ][ 0 ] ) {\n\t\t\tcase DIFF_INSERT:\n\t\t\t\tcountInsert++;\n\t\t\t\ttextInsert += diffs[ pointer ][ 1 ];\n\t\t\t\tpointer++;\n\t\t\t\tbreak;\n\t\t\tcase DIFF_DELETE:\n\t\t\t\tcountDelete++;\n\t\t\t\ttextDelete += diffs[ pointer ][ 1 ];\n\t\t\t\tpointer++;\n\t\t\t\tbreak;\n\t\t\tcase DIFF_EQUAL:\n\t\t\t\t// Upon reaching an equality, check for prior redundancies.\n\t\t\t\tif ( countDelete + countInsert > 1 ) {\n\t\t\t\t\tif ( countDelete !== 0 && countInsert !== 0 ) {\n\t\t\t\t\t\t// Factor out any common prefixies.\n\t\t\t\t\t\tcommonlength = this$1.diffCommonPrefix( textInsert, textDelete );\n\t\t\t\t\t\tif ( commonlength !== 0 ) {\n\t\t\t\t\t\t\tif ( ( pointer - countDelete - countInsert ) > 0 &&\n\t\t\t\t\t\t\t\t\tdiffs[ pointer - countDelete - countInsert - 1 ][ 0 ] ===\n\t\t\t\t\t\t\t\t\tDIFF_EQUAL ) {\n\t\t\t\t\t\t\t\tdiffs[ pointer - countDelete - countInsert - 1 ][ 1 ] +=\n\t\t\t\t\t\t\t\t\ttextInsert.substring( 0, commonlength );\n\t\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\t\tdiffs.splice( 0, 0, [ DIFF_EQUAL,\n\t\t\t\t\t\t\t\t\ttextInsert.substring( 0, commonlength )\n\t\t\t\t\t\t\t\t] );\n\t\t\t\t\t\t\t\tpointer++;\n\t\t\t\t\t\t\t}\n\t\t\t\t\t\t\ttextInsert = textInsert.substring( commonlength );\n\t\t\t\t\t\t\ttextDelete = textDelete.substring( commonlength );\n\t\t\t\t\t\t}\n\t\t\t\t\t\t// Factor out any common suffixies.\n\t\t\t\t\t\tcommonlength = this$1.diffCommonSuffix( textInsert, textDelete );\n\t\t\t\t\t\tif ( commonlength !== 0 ) {\n\t\t\t\t\t\t\tdiffs[ pointer ][ 1 ] = textInsert.substring( textInsert.length -\n\t\t\t\t\t\t\t\t\tcommonlength ) + diffs[ pointer ][ 1 ];\n\t\t\t\t\t\t\ttextInsert = textInsert.substring( 0, textInsert.length -\n\t\t\t\t\t\t\t\tcommonlength );\n\t\t\t\t\t\t\ttextDelete = textDelete.substring( 0, textDelete.length -\n\t\t\t\t\t\t\t\tcommonlength );\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\t// Delete the offending records and add the merged ones.\n\t\t\t\t\tif ( countDelete === 0 ) {\n\t\t\t\t\t\tdiffs.splice( pointer - countInsert,\n\t\t\t\t\t\t\tcountDelete + countInsert, [ DIFF_INSERT, textInsert ] );\n\t\t\t\t\t} else if ( countInsert === 0 ) {\n\t\t\t\t\t\tdiffs.splice( pointer - countDelete,\n\t\t\t\t\t\t\tcountDelete + countInsert, [ DIFF_DELETE, textDelete ] );\n\t\t\t\t\t} else {\n\t\t\t\t\t\tdiffs.splice(\n\t\t\t\t\t\t\tpointer - countDelete - countInsert,\n\t\t\t\t\t\t\tcountDelete + countInsert,\n\t\t\t\t\t\t\t[ DIFF_DELETE, textDelete ], [ DIFF_INSERT, textInsert ]\n\t\t\t\t\t\t);\n\t\t\t\t\t}\n\t\t\t\t\tpointer = pointer - countDelete - countInsert +\n\t\t\t\t\t\t( countDelete ? 1 : 0 ) + ( countInsert ? 1 : 0 ) + 1;\n\t\t\t\t} else if ( pointer !== 0 && diffs[ pointer - 1 ][ 0 ] === DIFF_EQUAL ) {\n\n\t\t\t\t\t// Merge this equality with the previous one.\n\t\t\t\t\tdiffs[ pointer - 1 ][ 1 ] += diffs[ pointer ][ 1 ];\n\t\t\t\t\tdiffs.splice( pointer, 1 );\n\t\t\t\t} else {\n\t\t\t\t\tpointer++;\n\t\t\t\t}\n\t\t\t\tcountInsert = 0;\n\t\t\t\tcountDelete = 0;\n\t\t\t\ttextDelete = \"\";\n\t\t\t\ttextInsert = \"\";\n\t\t\t\tbreak;\n\t\t\t}\n\t\t}\n\t\tif ( diffs[ diffs.length - 1 ][ 1 ] === \"\" ) {\n\t\t\tdiffs.pop(); // Remove the dummy entry at the end.\n\t\t}\n\n\t\t// Second pass: look for single edits surrounded on both sides by equalities\n\t\t// which can be shifted sideways to eliminate an equality.\n\t\t// e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC\n\t\tchanges = false;\n\t\tpointer = 1;\n\n\t\t// Intentionally ignore the first and last element (don't need checking).\n\t\twhile ( pointer < diffs.length - 1 ) {\n\t\t\tif ( diffs[ pointer - 1 ][ 0 ] === DIFF_EQUAL &&\n\t\t\t\t\tdiffs[ pointer + 1 ][ 0 ] === DIFF_EQUAL ) {\n\n\t\t\t\tdiffPointer = diffs[ pointer ][ 1 ];\n\t\t\t\tposition = diffPointer.substring(\n\t\t\t\t\tdiffPointer.length - diffs[ pointer - 1 ][ 1 ].length\n\t\t\t\t);\n\n\t\t\t\t// This is a single edit surrounded by equalities.\n\t\t\t\tif ( position === diffs[ pointer - 1 ][ 1 ] ) {\n\n\t\t\t\t\t// Shift the edit over the previous equality.\n\t\t\t\t\tdiffs[ pointer ][ 1 ] = diffs[ pointer - 1 ][ 1 ] +\n\t\t\t\t\t\tdiffs[ pointer ][ 1 ].substring( 0, diffs[ pointer ][ 1 ].length -\n\t\t\t\t\t\t\tdiffs[ pointer - 1 ][ 1 ].length );\n\t\t\t\t\tdiffs[ pointer + 1 ][ 1 ] =\n\t\t\t\t\t\tdiffs[ pointer - 1 ][ 1 ] + diffs[ pointer + 1 ][ 1 ];\n\t\t\t\t\tdiffs.splice( pointer - 1, 1 );\n\t\t\t\t\tchanges = true;\n\t\t\t\t} else if ( diffPointer.substring( 0, diffs[ pointer + 1 ][ 1 ].length ) ===\n\t\t\t\t\t\tdiffs[ pointer + 1 ][ 1 ] ) {\n\n\t\t\t\t\t// Shift the edit over the next equality.\n\t\t\t\t\tdiffs[ pointer - 1 ][ 1 ] += diffs[ pointer + 1 ][ 1 ];\n\t\t\t\t\tdiffs[ pointer ][ 1 ] =\n\t\t\t\t\t\tdiffs[ pointer ][ 1 ].substring( diffs[ pointer + 1 ][ 1 ].length ) +\n\t\t\t\t\t\tdiffs[ pointer + 1 ][ 1 ];\n\t\t\t\t\tdiffs.splice( pointer + 1, 1 );\n\t\t\t\t\tchanges = true;\n\t\t\t\t}\n\t\t\t}\n\t\t\tpointer++;\n\t\t}\n\t\t// If shifts were made, the diff needs reordering and another shift sweep.\n\t\tif ( changes ) {\n\t\t\tthis.diffCleanupMerge( diffs );\n\t\t}\n\t};\n\n\treturn function( o, n ) {\n\t\tvar diff, output, text;\n\t\tdiff = new DiffMatchPatch();\n\t\toutput = diff.DiffMain( o, n );\n\t\tdiff.diffCleanupEfficiency( output );\n\t\ttext = diff.diffPrettyHtml( output );\n\n\t\treturn text;\n\t};\n}() );\n\n// Get a reference to the global object, like window in browsers\n}( (function() {\n\treturn this;\n})() ));\n\n(function() {\n\n// Don't load the HTML Reporter on non-Browser environments\nif ( typeof window === \"undefined\" || !window.document ) {\n\treturn;\n}\n\n// Deprecated QUnit.init - Ref #530\n// Re-initialize the configuration options\nQUnit.init = function() {\n\tvar tests, banner, result, qunit,\n\t\tconfig = QUnit.config;\n\n\tconfig.stats = { all: 0, bad: 0 };\n\tconfig.moduleStats = { all: 0, bad: 0 };\n\tconfig.started = 0;\n\tconfig.updateRate = 1000;\n\tconfig.blocking = false;\n\tconfig.autostart = true;\n\tconfig.autorun = false;\n\tconfig.filter = \"\";\n\tconfig.queue = [];\n\n\t// Return on non-browser environments\n\t// This is necessary to not break on node tests\n\tif ( typeof window === \"undefined\" ) {\n\t\treturn;\n\t}\n\n\tqunit = id( \"qunit\" );\n\tif ( qunit ) {\n\t\tqunit.innerHTML =\n\t\t\t\"<h1 id='qunit-header'>\" + escapeText( document.title ) + \"</h1>\" +\n\t\t\t\"<h2 id='qunit-banner'></h2>\" +\n\t\t\t\"<div id='qunit-testrunner-toolbar'></div>\" +\n\t\t\t\"<h2 id='qunit-userAgent'></h2>\" +\n\t\t\t\"<ol id='qunit-tests'></ol>\";\n\t}\n\n\ttests = id( \"qunit-tests\" );\n\tbanner = id( \"qunit-banner\" );\n\tresult = id( \"qunit-testresult\" );\n\n\tif ( tests ) {\n\t\ttests.innerHTML = \"\";\n\t}\n\n\tif ( banner ) {\n\t\tbanner.className = \"\";\n\t}\n\n\tif ( result ) {\n\t\tresult.parentNode.removeChild( result );\n\t}\n\n\tif ( tests ) {\n\t\tresult = document.createElement( \"p\" );\n\t\tresult.id = \"qunit-testresult\";\n\t\tresult.className = \"result\";\n\t\ttests.parentNode.insertBefore( result, tests );\n\t\tresult.innerHTML = \"Running...<br />&#160;\";\n\t}\n};\n\nvar config = QUnit.config,\n\tcollapseNext = false,\n\thasOwn = Object.prototype.hasOwnProperty,\n\tdefined = {\n\t\tdocument: window.document !== undefined,\n\t\tsessionStorage: (function() {\n\t\t\tvar x = \"qunit-test-string\";\n\t\t\ttry {\n\t\t\t\tsessionStorage.setItem( x, x );\n\t\t\t\tsessionStorage.removeItem( x );\n\t\t\t\treturn true;\n\t\t\t} catch ( e ) {\n\t\t\t\treturn false;\n\t\t\t}\n\t\t}())\n\t},\n\tmodulesList = [];\n\n/**\n* Escape text for attribute or text content.\n*/\nfunction escapeText( s ) {\n\tif ( !s ) {\n\t\treturn \"\";\n\t}\n\ts = s + \"\";\n\n\t// Both single quotes and double quotes (for attributes)\n\treturn s.replace( /['\"<>&]/g, function( s ) {\n\t\tswitch ( s ) {\n\t\tcase \"'\":\n\t\t\treturn \"&#039;\";\n\t\tcase \"\\\"\":\n\t\t\treturn \"&quot;\";\n\t\tcase \"<\":\n\t\t\treturn \"&lt;\";\n\t\tcase \">\":\n\t\t\treturn \"&gt;\";\n\t\tcase \"&\":\n\t\t\treturn \"&amp;\";\n\t\t}\n\t});\n}\n\n/**\n * @param {HTMLElement} elem\n * @param {string} type\n * @param {Function} fn\n */\nfunction addEvent( elem, type, fn ) {\n\tif ( elem.addEventListener ) {\n\n\t\t// Standards-based browsers\n\t\telem.addEventListener( type, fn, false );\n\t} else if ( elem.attachEvent ) {\n\n\t\t// support: IE <9\n\t\telem.attachEvent( \"on\" + type, function() {\n\t\t\tvar event = window.event;\n\t\t\tif ( !event.target ) {\n\t\t\t\tevent.target = event.srcElement || document;\n\t\t\t}\n\n\t\t\tfn.call( elem, event );\n\t\t});\n\t}\n}\n\n/**\n * @param {Array|NodeList} elems\n * @param {string} type\n * @param {Function} fn\n */\nfunction addEvents( elems, type, fn ) {\n\tvar i = elems.length;\n\twhile ( i-- ) {\n\t\taddEvent( elems[ i ], type, fn );\n\t}\n}\n\nfunction hasClass( elem, name ) {\n\treturn ( \" \" + elem.className + \" \" ).indexOf( \" \" + name + \" \" ) >= 0;\n}\n\nfunction addClass( elem, name ) {\n\tif ( !hasClass( elem, name ) ) {\n\t\telem.className += ( elem.className ? \" \" : \"\" ) + name;\n\t}\n}\n\nfunction toggleClass( elem, name ) {\n\tif ( hasClass( elem, name ) ) {\n\t\tremoveClass( elem, name );\n\t} else {\n\t\taddClass( elem, name );\n\t}\n}\n\nfunction removeClass( elem, name ) {\n\tvar set = \" \" + elem.className + \" \";\n\n\t// Class name may appear multiple times\n\twhile ( set.indexOf( \" \" + name + \" \" ) >= 0 ) {\n\t\tset = set.replace( \" \" + name + \" \", \" \" );\n\t}\n\n\t// trim for prettiness\n\telem.className = typeof set.trim === \"function\" ? set.trim() : set.replace( /^\\s+|\\s+$/g, \"\" );\n}\n\nfunction id( name ) {\n\treturn defined.document && document.getElementById && document.getElementById( name );\n}\n\nfunction getUrlConfigHtml() {\n\tvar i, j, val,\n\t\tescaped, escapedTooltip,\n\t\tselection = false,\n\t\tlen = config.urlConfig.length,\n\t\turlConfigHtml = \"\";\n\n\tfor ( i = 0; i < len; i++ ) {\n\t\tval = config.urlConfig[ i ];\n\t\tif ( typeof val === \"string\" ) {\n\t\t\tval = {\n\t\t\t\tid: val,\n\t\t\t\tlabel: val\n\t\t\t};\n\t\t}\n\n\t\tescaped = escapeText( val.id );\n\t\tescapedTooltip = escapeText( val.tooltip );\n\n\t\tif ( config[ val.id ] === undefined ) {\n\t\t\tconfig[ val.id ] = QUnit.urlParams[ val.id ];\n\t\t}\n\n\t\tif ( !val.value || typeof val.value === \"string\" ) {\n\t\t\turlConfigHtml += \"<input id='qunit-urlconfig-\" + escaped +\n\t\t\t\t\"' name='\" + escaped + \"' type='checkbox'\" +\n\t\t\t\t( val.value ? \" value='\" + escapeText( val.value ) + \"'\" : \"\" ) +\n\t\t\t\t( config[ val.id ] ? \" checked='checked'\" : \"\" ) +\n\t\t\t\t\" title='\" + escapedTooltip + \"' /><label for='qunit-urlconfig-\" + escaped +\n\t\t\t\t\"' title='\" + escapedTooltip + \"'>\" + val.label + \"</label>\";\n\t\t} else {\n\t\t\turlConfigHtml += \"<label for='qunit-urlconfig-\" + escaped +\n\t\t\t\t\"' title='\" + escapedTooltip + \"'>\" + val.label +\n\t\t\t\t\": </label><select id='qunit-urlconfig-\" + escaped +\n\t\t\t\t\"' name='\" + escaped + \"' title='\" + escapedTooltip + \"'><option></option>\";\n\n\t\t\tif ( QUnit.is( \"array\", val.value ) ) {\n\t\t\t\tfor ( j = 0; j < val.value.length; j++ ) {\n\t\t\t\t\tescaped = escapeText( val.value[ j ] );\n\t\t\t\t\turlConfigHtml += \"<option value='\" + escaped + \"'\" +\n\t\t\t\t\t\t( config[ val.id ] === val.value[ j ] ?\n\t\t\t\t\t\t\t( selection = true ) && \" selected='selected'\" : \"\" ) +\n\t\t\t\t\t\t\">\" + escaped + \"</option>\";\n\t\t\t\t}\n\t\t\t} else {\n\t\t\t\tfor ( j in val.value ) {\n\t\t\t\t\tif ( hasOwn.call( val.value, j ) ) {\n\t\t\t\t\t\turlConfigHtml += \"<option value='\" + escapeText( j ) + \"'\" +\n\t\t\t\t\t\t\t( config[ val.id ] === j ?\n\t\t\t\t\t\t\t\t( selection = true ) && \" selected='selected'\" : \"\" ) +\n\t\t\t\t\t\t\t\">\" + escapeText( val.value[ j ] ) + \"</option>\";\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t\tif ( config[ val.id ] && !selection ) {\n\t\t\t\tescaped = escapeText( config[ val.id ] );\n\t\t\t\turlConfigHtml += \"<option value='\" + escaped +\n\t\t\t\t\t\"' selected='selected' disabled='disabled'>\" + escaped + \"</option>\";\n\t\t\t}\n\t\t\turlConfigHtml += \"</select>\";\n\t\t}\n\t}\n\n\treturn urlConfigHtml;\n}\n\n// Handle \"click\" events on toolbar checkboxes and \"change\" for select menus.\n// Updates the URL with the new state of `config.urlConfig` values.\nfunction toolbarChanged() {\n\tvar updatedUrl, value,\n\t\tfield = this,\n\t\tparams = {};\n\n\t// Detect if field is a select menu or a checkbox\n\tif ( \"selectedIndex\" in field ) {\n\t\tvalue = field.options[ field.selectedIndex ].value || undefined;\n\t} else {\n\t\tvalue = field.checked ? ( field.defaultValue || true ) : undefined;\n\t}\n\n\tparams[ field.name ] = value;\n\tupdatedUrl = setUrl( params );\n\n\tif ( \"hidepassed\" === field.name && \"replaceState\" in window.history ) {\n\t\tconfig[ field.name ] = value || false;\n\t\tif ( value ) {\n\t\t\taddClass( id( \"qunit-tests\" ), \"hidepass\" );\n\t\t} else {\n\t\t\tremoveClass( id( \"qunit-tests\" ), \"hidepass\" );\n\t\t}\n\n\t\t// It is not necessary to refresh the whole page\n\t\twindow.history.replaceState( null, \"\", updatedUrl );\n\t} else {\n\t\twindow.location = updatedUrl;\n\t}\n}\n\nfunction setUrl( params ) {\n\tvar key,\n\t\tquerystring = \"?\";\n\n\tparams = QUnit.extend( QUnit.extend( {}, QUnit.urlParams ), params );\n\n\tfor ( key in params ) {\n\t\tif ( hasOwn.call( params, key ) ) {\n\t\t\tif ( params[ key ] === undefined ) {\n\t\t\t\tcontinue;\n\t\t\t}\n\t\t\tquerystring += encodeURIComponent( key );\n\t\t\tif ( params[ key ] !== true ) {\n\t\t\t\tquerystring += \"=\" + encodeURIComponent( params[ key ] );\n\t\t\t}\n\t\t\tquerystring += \"&\";\n\t\t}\n\t}\n\treturn location.protocol + \"//\" + location.host +\n\t\tlocation.pathname + querystring.slice( 0, -1 );\n}\n\nfunction applyUrlParams() {\n\tvar selectedModule,\n\t\tmodulesList = id( \"qunit-modulefilter\" ),\n\t\tfilter = id( \"qunit-filter-input\" ).value;\n\n\tselectedModule = modulesList ?\n\t\tdecodeURIComponent( modulesList.options[ modulesList.selectedIndex ].value ) :\n\t\tundefined;\n\n\twindow.location = setUrl({\n\t\tmodule: ( selectedModule === \"\" ) ? undefined : selectedModule,\n\t\tfilter: ( filter === \"\" ) ? undefined : filter,\n\n\t\t// Remove testId filter\n\t\ttestId: undefined\n\t});\n}\n\nfunction toolbarUrlConfigContainer() {\n\tvar urlConfigContainer = document.createElement( \"span\" );\n\n\turlConfigContainer.innerHTML = getUrlConfigHtml();\n\taddClass( urlConfigContainer, \"qunit-url-config\" );\n\n\t// For oldIE support:\n\t// * Add handlers to the individual elements instead of the container\n\t// * Use \"click\" instead of \"change\" for checkboxes\n\taddEvents( urlConfigContainer.getElementsByTagName( \"input\" ), \"click\", toolbarChanged );\n\taddEvents( urlConfigContainer.getElementsByTagName( \"select\" ), \"change\", toolbarChanged );\n\n\treturn urlConfigContainer;\n}\n\nfunction toolbarLooseFilter() {\n\tvar filter = document.createElement( \"form\" ),\n\t\tlabel = document.createElement( \"label\" ),\n\t\tinput = document.createElement( \"input\" ),\n\t\tbutton = document.createElement( \"button\" );\n\n\taddClass( filter, \"qunit-filter\" );\n\n\tlabel.innerHTML = \"Filter: \";\n\n\tinput.type = \"text\";\n\tinput.value = config.filter || \"\";\n\tinput.name = \"filter\";\n\tinput.id = \"qunit-filter-input\";\n\n\tbutton.innerHTML = \"Go\";\n\n\tlabel.appendChild( input );\n\n\tfilter.appendChild( label );\n\tfilter.appendChild( button );\n\taddEvent( filter, \"submit\", function( ev ) {\n\t\tapplyUrlParams();\n\n\t\tif ( ev && ev.preventDefault ) {\n\t\t\tev.preventDefault();\n\t\t}\n\n\t\treturn false;\n\t});\n\n\treturn filter;\n}\n\nfunction toolbarModuleFilterHtml() {\n\tvar i,\n\t\tmoduleFilterHtml = \"\";\n\n\tif ( !modulesList.length ) {\n\t\treturn false;\n\t}\n\n\tmodulesList.sort(function( a, b ) {\n\t\treturn a.localeCompare( b );\n\t});\n\n\tmoduleFilterHtml += \"<label for='qunit-modulefilter'>Module: </label>\" +\n\t\t\"<select id='qunit-modulefilter' name='modulefilter'><option value='' \" +\n\t\t( QUnit.urlParams.module === undefined ? \"selected='selected'\" : \"\" ) +\n\t\t\">< All Modules ></option>\";\n\n\tfor ( i = 0; i < modulesList.length; i++ ) {\n\t\tmoduleFilterHtml += \"<option value='\" +\n\t\t\tescapeText( encodeURIComponent( modulesList[ i ] ) ) + \"' \" +\n\t\t\t( QUnit.urlParams.module === modulesList[ i ] ? \"selected='selected'\" : \"\" ) +\n\t\t\t\">\" + escapeText( modulesList[ i ] ) + \"</option>\";\n\t}\n\tmoduleFilterHtml += \"</select>\";\n\n\treturn moduleFilterHtml;\n}\n\nfunction toolbarModuleFilter() {\n\tvar toolbar = id( \"qunit-testrunner-toolbar\" ),\n\t\tmoduleFilter = document.createElement( \"span\" ),\n\t\tmoduleFilterHtml = toolbarModuleFilterHtml();\n\n\tif ( !toolbar || !moduleFilterHtml ) {\n\t\treturn false;\n\t}\n\n\tmoduleFilter.setAttribute( \"id\", \"qunit-modulefilter-container\" );\n\tmoduleFilter.innerHTML = moduleFilterHtml;\n\n\taddEvent( moduleFilter.lastChild, \"change\", applyUrlParams );\n\n\ttoolbar.appendChild( moduleFilter );\n}\n\nfunction appendToolbar() {\n\tvar toolbar = id( \"qunit-testrunner-toolbar\" );\n\n\tif ( toolbar ) {\n\t\ttoolbar.appendChild( toolbarUrlConfigContainer() );\n\t\ttoolbar.appendChild( toolbarLooseFilter() );\n\t}\n}\n\nfunction appendHeader() {\n\tvar header = id( \"qunit-header\" );\n\n\tif ( header ) {\n\t\theader.innerHTML = \"<a href='\" +\n\t\t\tsetUrl({ filter: undefined, module: undefined, testId: undefined }) +\n\t\t\t\"'>\" + header.innerHTML + \"</a> \";\n\t}\n}\n\nfunction appendBanner() {\n\tvar banner = id( \"qunit-banner\" );\n\n\tif ( banner ) {\n\t\tbanner.className = \"\";\n\t}\n}\n\nfunction appendTestResults() {\n\tvar tests = id( \"qunit-tests\" ),\n\t\tresult = id( \"qunit-testresult\" );\n\n\tif ( result ) {\n\t\tresult.parentNode.removeChild( result );\n\t}\n\n\tif ( tests ) {\n\t\ttests.innerHTML = \"\";\n\t\tresult = document.createElement( \"p\" );\n\t\tresult.id = \"qunit-testresult\";\n\t\tresult.className = \"result\";\n\t\ttests.parentNode.insertBefore( result, tests );\n\t\tresult.innerHTML = \"Running...<br />&#160;\";\n\t}\n}\n\nfunction storeFixture() {\n\tvar fixture = id( \"qunit-fixture\" );\n\tif ( fixture ) {\n\t\tconfig.fixture = fixture.innerHTML;\n\t}\n}\n\nfunction appendFilteredTest() {\n\tvar testId = QUnit.config.testId;\n\tif ( !testId || testId.length <= 0 ) {\n\t\treturn \"\";\n\t}\n\treturn \"<div id='qunit-filteredTest'>Rerunning selected tests: \" + testId.join(\", \") +\n\t\t\" <a id='qunit-clearFilter' href='\" +\n\t\tsetUrl({ filter: undefined, module: undefined, testId: undefined }) +\n\t\t\"'>\" + \"Run all tests\" + \"</a></div>\";\n}\n\nfunction appendUserAgent() {\n\tvar userAgent = id( \"qunit-userAgent\" );\n\n\tif ( userAgent ) {\n\t\tuserAgent.innerHTML = \"\";\n\t\tuserAgent.appendChild(\n\t\t\tdocument.createTextNode(\n\t\t\t\t\"QUnit \" + QUnit.version + \"; \" + navigator.userAgent\n\t\t\t)\n\t\t);\n\t}\n}\n\nfunction appendTestsList( modules ) {\n\tvar i, l, x, z, test, moduleObj;\n\n\tfor ( i = 0, l = modules.length; i < l; i++ ) {\n\t\tmoduleObj = modules[ i ];\n\n\t\tif ( moduleObj.name ) {\n\t\t\tmodulesList.push( moduleObj.name );\n\t\t}\n\n\t\tfor ( x = 0, z = moduleObj.tests.length; x < z; x++ ) {\n\t\t\ttest = moduleObj.tests[ x ];\n\n\t\t\tappendTest( test.name, test.testId, moduleObj.name );\n\t\t}\n\t}\n}\n\nfunction appendTest( name, testId, moduleName ) {\n\tvar title, rerunTrigger, testBlock, assertList,\n\t\ttests = id( \"qunit-tests\" );\n\n\tif ( !tests ) {\n\t\treturn;\n\t}\n\n\ttitle = document.createElement( \"strong\" );\n\ttitle.innerHTML = getNameHtml( name, moduleName );\n\n\trerunTrigger = document.createElement( \"a\" );\n\trerunTrigger.innerHTML = \"Rerun\";\n\trerunTrigger.href = setUrl({ testId: testId });\n\n\ttestBlock = document.createElement( \"li\" );\n\ttestBlock.appendChild( title );\n\ttestBlock.appendChild( rerunTrigger );\n\ttestBlock.id = \"qunit-test-output-\" + testId;\n\n\tassertList = document.createElement( \"ol\" );\n\tassertList.className = \"qunit-assert-list\";\n\n\ttestBlock.appendChild( assertList );\n\n\ttests.appendChild( testBlock );\n}\n\n// HTML Reporter initialization and load\nQUnit.begin(function( details ) {\n\tvar qunit = id( \"qunit\" );\n\n\t// Fixture is the only one necessary to run without the #qunit element\n\tstoreFixture();\n\n\tif ( qunit ) {\n\t\tqunit.innerHTML =\n\t\t\t\"<h1 id='qunit-header'>\" + escapeText( document.title ) + \"</h1>\" +\n\t\t\t\"<h2 id='qunit-banner'></h2>\" +\n\t\t\t\"<div id='qunit-testrunner-toolbar'></div>\" +\n\t\t\tappendFilteredTest() +\n\t\t\t\"<h2 id='qunit-userAgent'></h2>\" +\n\t\t\t\"<ol id='qunit-tests'></ol>\";\n\t}\n\n\tappendHeader();\n\tappendBanner();\n\tappendTestResults();\n\tappendUserAgent();\n\tappendToolbar();\n\tappendTestsList( details.modules );\n\ttoolbarModuleFilter();\n\n\tif ( qunit && config.hidepassed ) {\n\t\taddClass( qunit.lastChild, \"hidepass\" );\n\t}\n});\n\nQUnit.done(function( details ) {\n\tvar i, key,\n\t\tbanner = id( \"qunit-banner\" ),\n\t\ttests = id( \"qunit-tests\" ),\n\t\thtml = [\n\t\t\t\"Tests completed in \",\n\t\t\tdetails.runtime,\n\t\t\t\" milliseconds.<br />\",\n\t\t\t\"<span class='passed'>\",\n\t\t\tdetails.passed,\n\t\t\t\"</span> assertions of <span class='total'>\",\n\t\t\tdetails.total,\n\t\t\t\"</span> passed, <span class='failed'>\",\n\t\t\tdetails.failed,\n\t\t\t\"</span> failed.\"\n\t\t].join( \"\" );\n\n\tif ( banner ) {\n\t\tbanner.className = details.failed ? \"qunit-fail\" : \"qunit-pass\";\n\t}\n\n\tif ( tests ) {\n\t\tid( \"qunit-testresult\" ).innerHTML = html;\n\t}\n\n\tif ( config.altertitle && defined.document && document.title ) {\n\n\t\t// show ✖ for good, ✔ for bad suite result in title\n\t\t// use escape sequences in case file gets loaded with non-utf-8-charset\n\t\tdocument.title = [\n\t\t\t( details.failed ? \"\\u2716\" : \"\\u2714\" ),\n\t\t\tdocument.title.replace( /^[\\u2714\\u2716] /i, \"\" )\n\t\t].join( \" \" );\n\t}\n\n\t// clear own sessionStorage items if all tests passed\n\tif ( config.reorder && defined.sessionStorage && details.failed === 0 ) {\n\t\tfor ( i = 0; i < sessionStorage.length; i++ ) {\n\t\t\tkey = sessionStorage.key( i++ );\n\t\t\tif ( key.indexOf( \"qunit-test-\" ) === 0 ) {\n\t\t\t\tsessionStorage.removeItem( key );\n\t\t\t}\n\t\t}\n\t}\n\n\t// scroll back to top to show results\n\tif ( config.scrolltop && window.scrollTo ) {\n\t\twindow.scrollTo( 0, 0 );\n\t}\n});\n\nfunction getNameHtml( name, module ) {\n\tvar nameHtml = \"\";\n\n\tif ( module ) {\n\t\tnameHtml = \"<span class='module-name'>\" + escapeText( module ) + \"</span>: \";\n\t}\n\n\tnameHtml += \"<span class='test-name'>\" + escapeText( name ) + \"</span>\";\n\n\treturn nameHtml;\n}\n\nQUnit.testStart(function( details ) {\n\tvar running, testBlock, bad;\n\n\ttestBlock = id( \"qunit-test-output-\" + details.testId );\n\tif ( testBlock ) {\n\t\ttestBlock.className = \"running\";\n\t} else {\n\n\t\t// Report later registered tests\n\t\tappendTest( details.name, details.testId, details.module );\n\t}\n\n\trunning = id( \"qunit-testresult\" );\n\tif ( running ) {\n\t\tbad = QUnit.config.reorder && defined.sessionStorage &&\n\t\t\t+sessionStorage.getItem( \"qunit-test-\" + details.module + \"-\" + details.name );\n\n\t\trunning.innerHTML = ( bad ?\n\t\t\t\"Rerunning previously failed test: <br />\" :\n\t\t\t\"Running: <br />\" ) +\n\t\t\tgetNameHtml( details.name, details.module );\n\t}\n\n});\n\nfunction stripHtml( string ) {\n\t// strip tags, html entity and whitespaces\n\treturn string.replace(/<\\/?[^>]+(>|$)/g, \"\").replace(/\\&quot;/g, \"\").replace(/\\s+/g, \"\");\n}\n\nQUnit.log(function( details ) {\n\tvar assertList, assertLi,\n\t\tmessage, expected, actual, diff,\n\t\tshowDiff = false,\n\t\ttestItem = id( \"qunit-test-output-\" + details.testId );\n\n\tif ( !testItem ) {\n\t\treturn;\n\t}\n\n\tmessage = escapeText( details.message ) || ( details.result ? \"okay\" : \"failed\" );\n\tmessage = \"<span class='test-message'>\" + message + \"</span>\";\n\tmessage += \"<span class='runtime'>@ \" + details.runtime + \" ms</span>\";\n\n\t// pushFailure doesn't provide details.expected\n\t// when it calls, it's implicit to also not show expected and diff stuff\n\t// Also, we need to check details.expected existence, as it can exist and be undefined\n\tif ( !details.result && hasOwn.call( details, \"expected\" ) ) {\n\t\tif ( details.negative ) {\n\t\t\texpected = escapeText( \"NOT \" + QUnit.dump.parse( details.expected ) );\n\t\t} else {\n\t\t\texpected = escapeText( QUnit.dump.parse( details.expected ) );\n\t\t}\n\n\t\tactual = escapeText( QUnit.dump.parse( details.actual ) );\n\t\tmessage += \"<table><tr class='test-expected'><th>Expected: </th><td><pre>\" +\n\t\t\texpected +\n\t\t\t\"</pre></td></tr>\";\n\n\t\tif ( actual !== expected ) {\n\n\t\t\tmessage += \"<tr class='test-actual'><th>Result: </th><td><pre>\" +\n\t\t\t\tactual + \"</pre></td></tr>\";\n\n\t\t\t// Don't show diff if actual or expected are booleans\n\t\t\tif ( !( /^(true|false)$/.test( actual ) ) &&\n\t\t\t\t\t!( /^(true|false)$/.test( expected ) ) ) {\n\t\t\t\tdiff = QUnit.diff( expected, actual );\n\t\t\t\tshowDiff = stripHtml( diff ).length !==\n\t\t\t\t\tstripHtml( expected ).length +\n\t\t\t\t\tstripHtml( actual ).length;\n\t\t\t}\n\n\t\t\t// Don't show diff if expected and actual are totally different\n\t\t\tif ( showDiff ) {\n\t\t\t\tmessage += \"<tr class='test-diff'><th>Diff: </th><td><pre>\" +\n\t\t\t\t\tdiff + \"</pre></td></tr>\";\n\t\t\t}\n\t\t} else if ( expected.indexOf( \"[object Array]\" ) !== -1 ||\n\t\t\t\texpected.indexOf( \"[object Object]\" ) !== -1 ) {\n\t\t\tmessage += \"<tr class='test-message'><th>Message: </th><td>\" +\n\t\t\t\t\"Diff suppressed as the depth of object is more than current max depth (\" +\n\t\t\t\tQUnit.config.maxDepth + \").<p>Hint: Use <code>QUnit.dump.maxDepth</code> to \" +\n\t\t\t\t\" run with a higher max depth or <a href='\" + setUrl({ maxDepth: -1 }) + \"'>\" +\n\t\t\t\t\"Rerun</a> without max depth.</p></td></tr>\";\n\t\t}\n\n\t\tif ( details.source ) {\n\t\t\tmessage += \"<tr class='test-source'><th>Source: </th><td><pre>\" +\n\t\t\t\tescapeText( details.source ) + \"</pre></td></tr>\";\n\t\t}\n\n\t\tmessage += \"</table>\";\n\n\t// this occours when pushFailure is set and we have an extracted stack trace\n\t} else if ( !details.result && details.source ) {\n\t\tmessage += \"<table>\" +\n\t\t\t\"<tr class='test-source'><th>Source: </th><td><pre>\" +\n\t\t\tescapeText( details.source ) + \"</pre></td></tr>\" +\n\t\t\t\"</table>\";\n\t}\n\n\tassertList = testItem.getElementsByTagName( \"ol\" )[ 0 ];\n\n\tassertLi = document.createElement( \"li\" );\n\tassertLi.className = details.result ? \"pass\" : \"fail\";\n\tassertLi.innerHTML = message;\n\tassertList.appendChild( assertLi );\n});\n\nQUnit.testDone(function( details ) {\n\tvar testTitle, time, testItem, assertList,\n\t\tgood, bad, testCounts, skipped, sourceName,\n\t\ttests = id( \"qunit-tests\" );\n\n\tif ( !tests ) {\n\t\treturn;\n\t}\n\n\ttestItem = id( \"qunit-test-output-\" + details.testId );\n\n\tassertList = testItem.getElementsByTagName( \"ol\" )[ 0 ];\n\n\tgood = details.passed;\n\tbad = details.failed;\n\n\t// store result when possible\n\tif ( config.reorder && defined.sessionStorage ) {\n\t\tif ( bad ) {\n\t\t\tsessionStorage.setItem( \"qunit-test-\" + details.module + \"-\" + details.name, bad );\n\t\t} else {\n\t\t\tsessionStorage.removeItem( \"qunit-test-\" + details.module + \"-\" + details.name );\n\t\t}\n\t}\n\n\tif ( bad === 0 ) {\n\n\t\t// Collapse the passing tests\n\t\taddClass( assertList, \"qunit-collapsed\" );\n\t} else if ( bad && config.collapse && !collapseNext ) {\n\n\t\t// Skip collapsing the first failing test\n\t\tcollapseNext = true;\n\t} else {\n\n\t\t// Collapse remaining tests\n\t\taddClass( assertList, \"qunit-collapsed\" );\n\t}\n\n\t// testItem.firstChild is the test name\n\ttestTitle = testItem.firstChild;\n\n\ttestCounts = bad ?\n\t\t\"<b class='failed'>\" + bad + \"</b>, \" + \"<b class='passed'>\" + good + \"</b>, \" :\n\t\t\"\";\n\n\ttestTitle.innerHTML += \" <b class='counts'>(\" + testCounts +\n\t\tdetails.assertions.length + \")</b>\";\n\n\tif ( details.skipped ) {\n\t\ttestItem.className = \"skipped\";\n\t\tskipped = document.createElement( \"em\" );\n\t\tskipped.className = \"qunit-skipped-label\";\n\t\tskipped.innerHTML = \"skipped\";\n\t\ttestItem.insertBefore( skipped, testTitle );\n\t} else {\n\t\taddEvent( testTitle, \"click\", function() {\n\t\t\ttoggleClass( assertList, \"qunit-collapsed\" );\n\t\t});\n\n\t\ttestItem.className = bad ? \"fail\" : \"pass\";\n\n\t\ttime = document.createElement( \"span\" );\n\t\ttime.className = \"runtime\";\n\t\ttime.innerHTML = details.runtime + \" ms\";\n\t\ttestItem.insertBefore( time, assertList );\n\t}\n\n\t// Show the source of the test when showing assertions\n\tif ( details.source ) {\n\t\tsourceName = document.createElement( \"p\" );\n\t\tsourceName.innerHTML = \"<strong>Source: </strong>\" + details.source;\n\t\taddClass( sourceName, \"qunit-source\" );\n\t\tif ( bad === 0 ) {\n\t\t\taddClass( sourceName, \"qunit-collapsed\" );\n\t\t}\n\t\taddEvent( testTitle, \"click\", function() {\n\t\t\ttoggleClass( sourceName, \"qunit-collapsed\" );\n\t\t});\n\t\ttestItem.appendChild( sourceName );\n\t}\n});\n\nif ( defined.document ) {\n\n\t// Avoid readyState issue with phantomjs\n\t// Ref: #818\n\tvar notPhantom = ( function( p ) {\n\t\treturn !( p && p.version && p.version.major > 0 );\n\t} )( window.phantom );\n\n\tif ( notPhantom && document.readyState === \"complete\" ) {\n\t\tQUnit.load();\n\t} else {\n\t\taddEvent( window, \"load\", QUnit.load );\n\t}\n} else {\n\tconfig.pageLoaded = true;\n\tconfig.autorun = true;\n}\n\n})();\n\n/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(1)(module)))//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMi5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9ub2RlX21vZHVsZXMvYm9vdHN0cmFwL2pzL3Rlc3RzL3ZlbmRvci9xdW5pdC5qcz9hNTZlIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogUVVuaXQgMS4yMC4wXG4gKiBodHRwOi8vcXVuaXRqcy5jb20vXG4gKlxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnNcbiAqIFJlbGVhc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZVxuICogaHR0cDovL2pxdWVyeS5vcmcvbGljZW5zZVxuICpcbiAqIERhdGU6IDIwMTUtMTAtMjdUMTc6NTNaXG4gKi9cblxuKGZ1bmN0aW9uKCBnbG9iYWwgKSB7XG5cbnZhciBRVW5pdCA9IHt9O1xuXG52YXIgRGF0ZSA9IGdsb2JhbC5EYXRlO1xudmFyIG5vdyA9IERhdGUubm93IHx8IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG59O1xuXG52YXIgc2V0VGltZW91dCA9IGdsb2JhbC5zZXRUaW1lb3V0O1xudmFyIGNsZWFyVGltZW91dCA9IGdsb2JhbC5jbGVhclRpbWVvdXQ7XG5cbi8vIFN0b3JlIGEgbG9jYWwgd2luZG93IGZyb20gdGhlIGdsb2JhbCB0byBhbGxvdyBkaXJlY3QgcmVmZXJlbmNlcy5cbnZhciB3aW5kb3cgPSBnbG9iYWwud2luZG93O1xuXG52YXIgZGVmaW5lZCA9IHtcblx0ZG9jdW1lbnQ6IHdpbmRvdyAmJiB3aW5kb3cuZG9jdW1lbnQgIT09IHVuZGVmaW5lZCxcblx0c2V0VGltZW91dDogc2V0VGltZW91dCAhPT0gdW5kZWZpbmVkLFxuXHRzZXNzaW9uU3RvcmFnZTogKGZ1bmN0aW9uKCkge1xuXHRcdHZhciB4ID0gXCJxdW5pdC10ZXN0LXN0cmluZ1wiO1xuXHRcdHRyeSB7XG5cdFx0XHRzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCB4LCB4ICk7XG5cdFx0XHRzZXNzaW9uU3RvcmFnZS5yZW1vdmVJdGVtKCB4ICk7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGNhdGNoICggZSApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cdH0oKSApXG59O1xuXG52YXIgZmlsZU5hbWUgPSAoIHNvdXJjZUZyb21TdGFja3RyYWNlKCAwICkgfHwgXCJcIiApLnJlcGxhY2UoIC8oOlxcZCspK1xcKT8vLCBcIlwiICkucmVwbGFjZSggLy4rXFwvLywgXCJcIiApO1xudmFyIGdsb2JhbFN0YXJ0Q2FsbGVkID0gZmFsc2U7XG52YXIgcnVuU3RhcnRlZCA9IGZhbHNlO1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLFxuXHRoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG4vLyByZXR1cm5zIGEgbmV3IEFycmF5IHdpdGggdGhlIGVsZW1lbnRzIHRoYXQgYXJlIGluIGEgYnV0IG5vdCBpbiBiXG5mdW5jdGlvbiBkaWZmKCBhLCBiICkge1xuXHR2YXIgaSwgaixcblx0XHRyZXN1bHQgPSBhLnNsaWNlKCk7XG5cblx0Zm9yICggaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKysgKSB7XG5cdFx0Zm9yICggaiA9IDA7IGogPCBiLmxlbmd0aDsgaisrICkge1xuXHRcdFx0aWYgKCByZXN1bHRbIGkgXSA9PT0gYlsgaiBdICkge1xuXHRcdFx0XHRyZXN1bHQuc3BsaWNlKCBpLCAxICk7XG5cdFx0XHRcdGktLTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59XG5cbi8vIGZyb20ganF1ZXJ5LmpzXG5mdW5jdGlvbiBpbkFycmF5KCBlbGVtLCBhcnJheSApIHtcblx0aWYgKCBhcnJheS5pbmRleE9mICkge1xuXHRcdHJldHVybiBhcnJheS5pbmRleE9mKCBlbGVtICk7XG5cdH1cblxuXHRmb3IgKCB2YXIgaSA9IDAsIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXHRcdGlmICggYXJyYXlbIGkgXSA9PT0gZWxlbSApIHtcblx0XHRcdHJldHVybiBpO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBNYWtlcyBhIGNsb25lIG9mIGFuIG9iamVjdCB1c2luZyBvbmx5IEFycmF5IG9yIE9iamVjdCBhcyBiYXNlLFxuICogYW5kIGNvcGllcyBvdmVyIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge09iamVjdH0gTmV3IG9iamVjdCB3aXRoIG9ubHkgdGhlIG93biBwcm9wZXJ0aWVzIChyZWN1cnNpdmVseSkuXG4gKi9cbmZ1bmN0aW9uIG9iamVjdFZhbHVlcyAoIG9iaiApIHtcblx0dmFyIGtleSwgdmFsLFxuXHRcdHZhbHMgPSBRVW5pdC5pcyggXCJhcnJheVwiLCBvYmogKSA/IFtdIDoge307XG5cdGZvciAoIGtleSBpbiBvYmogKSB7XG5cdFx0aWYgKCBoYXNPd24uY2FsbCggb2JqLCBrZXkgKSApIHtcblx0XHRcdHZhbCA9IG9ialsga2V5IF07XG5cdFx0XHR2YWxzWyBrZXkgXSA9IHZhbCA9PT0gT2JqZWN0KCB2YWwgKSA/IG9iamVjdFZhbHVlcyggdmFsICkgOiB2YWw7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB2YWxzO1xufVxuXG5mdW5jdGlvbiBleHRlbmQoIGEsIGIsIHVuZGVmT25seSApIHtcblx0Zm9yICggdmFyIHByb3AgaW4gYiApIHtcblx0XHRpZiAoIGhhc093bi5jYWxsKCBiLCBwcm9wICkgKSB7XG5cblx0XHRcdC8vIEF2b2lkIFwiTWVtYmVyIG5vdCBmb3VuZFwiIGVycm9yIGluIElFOCBjYXVzZWQgYnkgbWVzc2luZyB3aXRoIHdpbmRvdy5jb25zdHJ1Y3RvclxuXHRcdFx0Ly8gVGhpcyBibG9jayBydW5zIG9uIGV2ZXJ5IGVudmlyb25tZW50LCBzbyBgZ2xvYmFsYCBpcyBiZWluZyB1c2VkIGluc3RlYWQgb2YgYHdpbmRvd2Bcblx0XHRcdC8vIHRvIGF2b2lkIGVycm9ycyBvbiBub2RlLlxuXHRcdFx0aWYgKCBwcm9wICE9PSBcImNvbnN0cnVjdG9yXCIgfHwgYSAhPT0gZ2xvYmFsICkge1xuXHRcdFx0XHRpZiAoIGJbIHByb3AgXSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0XHRcdGRlbGV0ZSBhWyBwcm9wIF07XG5cdFx0XHRcdH0gZWxzZSBpZiAoICEoIHVuZGVmT25seSAmJiB0eXBlb2YgYVsgcHJvcCBdICE9PSBcInVuZGVmaW5lZFwiICkgKSB7XG5cdFx0XHRcdFx0YVsgcHJvcCBdID0gYlsgcHJvcCBdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGE7XG59XG5cbmZ1bmN0aW9uIG9iamVjdFR5cGUoIG9iaiApIHtcblx0aWYgKCB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdHJldHVybiBcInVuZGVmaW5lZFwiO1xuXHR9XG5cblx0Ly8gQ29uc2lkZXI6IHR5cGVvZiBudWxsID09PSBvYmplY3Rcblx0aWYgKCBvYmogPT09IG51bGwgKSB7XG5cdFx0cmV0dXJuIFwibnVsbFwiO1xuXHR9XG5cblx0dmFyIG1hdGNoID0gdG9TdHJpbmcuY2FsbCggb2JqICkubWF0Y2goIC9eXFxbb2JqZWN0XFxzKC4qKVxcXSQvICksXG5cdFx0dHlwZSA9IG1hdGNoICYmIG1hdGNoWyAxIF07XG5cblx0c3dpdGNoICggdHlwZSApIHtcblx0XHRjYXNlIFwiTnVtYmVyXCI6XG5cdFx0XHRpZiAoIGlzTmFOKCBvYmogKSApIHtcblx0XHRcdFx0cmV0dXJuIFwibmFuXCI7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gXCJudW1iZXJcIjtcblx0XHRjYXNlIFwiU3RyaW5nXCI6XG5cdFx0Y2FzZSBcIkJvb2xlYW5cIjpcblx0XHRjYXNlIFwiQXJyYXlcIjpcblx0XHRjYXNlIFwiU2V0XCI6XG5cdFx0Y2FzZSBcIk1hcFwiOlxuXHRcdGNhc2UgXCJEYXRlXCI6XG5cdFx0Y2FzZSBcIlJlZ0V4cFwiOlxuXHRcdGNhc2UgXCJGdW5jdGlvblwiOlxuXHRcdGNhc2UgXCJTeW1ib2xcIjpcblx0XHRcdHJldHVybiB0eXBlLnRvTG93ZXJDYXNlKCk7XG5cdH1cblx0aWYgKCB0eXBlb2Ygb2JqID09PSBcIm9iamVjdFwiICkge1xuXHRcdHJldHVybiBcIm9iamVjdFwiO1xuXHR9XG59XG5cbi8vIFNhZmUgb2JqZWN0IHR5cGUgY2hlY2tpbmdcbmZ1bmN0aW9uIGlzKCB0eXBlLCBvYmogKSB7XG5cdHJldHVybiBRVW5pdC5vYmplY3RUeXBlKCBvYmogKSA9PT0gdHlwZTtcbn1cblxudmFyIGdldFVybFBhcmFtcyA9IGZ1bmN0aW9uKCkge1xuXHR2YXIgaSwgY3VycmVudDtcblx0dmFyIHVybFBhcmFtcyA9IHt9O1xuXHR2YXIgbG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247XG5cdHZhciBwYXJhbXMgPSBsb2NhdGlvbi5zZWFyY2guc2xpY2UoIDEgKS5zcGxpdCggXCImXCIgKTtcblx0dmFyIGxlbmd0aCA9IHBhcmFtcy5sZW5ndGg7XG5cblx0aWYgKCBwYXJhbXNbIDAgXSApIHtcblx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrICkge1xuXHRcdFx0Y3VycmVudCA9IHBhcmFtc1sgaSBdLnNwbGl0KCBcIj1cIiApO1xuXHRcdFx0Y3VycmVudFsgMCBdID0gZGVjb2RlVVJJQ29tcG9uZW50KCBjdXJyZW50WyAwIF0gKTtcblxuXHRcdFx0Ly8gYWxsb3cganVzdCBhIGtleSB0byB0dXJuIG9uIGEgZmxhZywgZS5nLiwgdGVzdC5odG1sP25vZ2xvYmFsc1xuXHRcdFx0Y3VycmVudFsgMSBdID0gY3VycmVudFsgMSBdID8gZGVjb2RlVVJJQ29tcG9uZW50KCBjdXJyZW50WyAxIF0gKSA6IHRydWU7XG5cdFx0XHRpZiAoIHVybFBhcmFtc1sgY3VycmVudFsgMCBdIF0gKSB7XG5cdFx0XHRcdHVybFBhcmFtc1sgY3VycmVudFsgMCBdIF0gPSBbXS5jb25jYXQoIHVybFBhcmFtc1sgY3VycmVudFsgMCBdIF0sIGN1cnJlbnRbIDEgXSApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dXJsUGFyYW1zWyBjdXJyZW50WyAwIF0gXSA9IGN1cnJlbnRbIDEgXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdXJsUGFyYW1zO1xufTtcblxuLy8gRG9lc24ndCBzdXBwb3J0IElFNiB0byBJRTksIGl0IHdpbGwgcmV0dXJuIHVuZGVmaW5lZCBvbiB0aGVzZSBicm93c2Vyc1xuLy8gU2VlIGFsc28gaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvRXJyb3IvU3RhY2tcbmZ1bmN0aW9uIGV4dHJhY3RTdGFja3RyYWNlKCBlLCBvZmZzZXQgKSB7XG5cdG9mZnNldCA9IG9mZnNldCA9PT0gdW5kZWZpbmVkID8gNCA6IG9mZnNldDtcblxuXHR2YXIgc3RhY2ssIGluY2x1ZGUsIGk7XG5cblx0aWYgKCBlLnN0YWNrICkge1xuXHRcdHN0YWNrID0gZS5zdGFjay5zcGxpdCggXCJcXG5cIiApO1xuXHRcdGlmICggL15lcnJvciQvaS50ZXN0KCBzdGFja1sgMCBdICkgKSB7XG5cdFx0XHRzdGFjay5zaGlmdCgpO1xuXHRcdH1cblx0XHRpZiAoIGZpbGVOYW1lICkge1xuXHRcdFx0aW5jbHVkZSA9IFtdO1xuXHRcdFx0Zm9yICggaSA9IG9mZnNldDsgaSA8IHN0YWNrLmxlbmd0aDsgaSsrICkge1xuXHRcdFx0XHRpZiAoIHN0YWNrWyBpIF0uaW5kZXhPZiggZmlsZU5hbWUgKSAhPT0gLTEgKSB7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdFx0aW5jbHVkZS5wdXNoKCBzdGFja1sgaSBdICk7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIGluY2x1ZGUubGVuZ3RoICkge1xuXHRcdFx0XHRyZXR1cm4gaW5jbHVkZS5qb2luKCBcIlxcblwiICk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiBzdGFja1sgb2Zmc2V0IF07XG5cblx0Ly8gU3VwcG9ydDogU2FmYXJpIDw9NiBvbmx5XG5cdH0gZWxzZSBpZiAoIGUuc291cmNlVVJMICkge1xuXG5cdFx0Ly8gZXhjbHVkZSB1c2VsZXNzIHNlbGYtcmVmZXJlbmNlIGZvciBnZW5lcmF0ZWQgRXJyb3Igb2JqZWN0c1xuXHRcdGlmICggL3F1bml0LmpzJC8udGVzdCggZS5zb3VyY2VVUkwgKSApIHtcblx0XHRcdHJldHVybjtcblx0XHR9XG5cblx0XHQvLyBmb3IgYWN0dWFsIGV4Y2VwdGlvbnMsIHRoaXMgaXMgdXNlZnVsXG5cdFx0cmV0dXJuIGUuc291cmNlVVJMICsgXCI6XCIgKyBlLmxpbmU7XG5cdH1cbn1cblxuZnVuY3Rpb24gc291cmNlRnJvbVN0YWNrdHJhY2UoIG9mZnNldCApIHtcblx0dmFyIGVycm9yID0gbmV3IEVycm9yKCk7XG5cblx0Ly8gU3VwcG9ydDogU2FmYXJpIDw9NyBvbmx5LCBJRSA8PTEwIC0gMTEgb25seVxuXHQvLyBOb3QgYWxsIGJyb3dzZXJzIGdlbmVyYXRlIHRoZSBgc3RhY2tgIHByb3BlcnR5IGZvciBgbmV3IEVycm9yKClgLCBzZWUgYWxzbyAjNjM2XG5cdGlmICggIWVycm9yLnN0YWNrICkge1xuXHRcdHRyeSB7XG5cdFx0XHR0aHJvdyBlcnJvcjtcblx0XHR9IGNhdGNoICggZXJyICkge1xuXHRcdFx0ZXJyb3IgPSBlcnI7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGV4dHJhY3RTdGFja3RyYWNlKCBlcnJvciwgb2Zmc2V0ICk7XG59XG5cbi8qKlxuICogQ29uZmlnIG9iamVjdDogTWFpbnRhaW4gaW50ZXJuYWwgc3RhdGVcbiAqIExhdGVyIGV4cG9zZWQgYXMgUVVuaXQuY29uZmlnXG4gKiBgY29uZmlnYCBpbml0aWFsaXplZCBhdCB0b3Agb2Ygc2NvcGVcbiAqL1xudmFyIGNvbmZpZyA9IHtcblx0Ly8gVGhlIHF1ZXVlIG9mIHRlc3RzIHRvIHJ1blxuXHRxdWV1ZTogW10sXG5cblx0Ly8gYmxvY2sgdW50aWwgZG9jdW1lbnQgcmVhZHlcblx0YmxvY2tpbmc6IHRydWUsXG5cblx0Ly8gYnkgZGVmYXVsdCwgcnVuIHByZXZpb3VzbHkgZmFpbGVkIHRlc3RzIGZpcnN0XG5cdC8vIHZlcnkgdXNlZnVsIGluIGNvbWJpbmF0aW9uIHdpdGggXCJIaWRlIHBhc3NlZCB0ZXN0c1wiIGNoZWNrZWRcblx0cmVvcmRlcjogdHJ1ZSxcblxuXHQvLyBieSBkZWZhdWx0LCBtb2RpZnkgZG9jdW1lbnQudGl0bGUgd2hlbiBzdWl0ZSBpcyBkb25lXG5cdGFsdGVydGl0bGU6IHRydWUsXG5cblx0Ly8gSFRNTCBSZXBvcnRlcjogY29sbGFwc2UgZXZlcnkgdGVzdCBleGNlcHQgdGhlIGZpcnN0IGZhaWxpbmcgdGVzdFxuXHQvLyBJZiBmYWxzZSwgYWxsIGZhaWxpbmcgdGVzdHMgd2lsbCBiZSBleHBhbmRlZFxuXHRjb2xsYXBzZTogdHJ1ZSxcblxuXHQvLyBieSBkZWZhdWx0LCBzY3JvbGwgdG8gdG9wIG9mIHRoZSBwYWdlIHdoZW4gc3VpdGUgaXMgZG9uZVxuXHRzY3JvbGx0b3A6IHRydWUsXG5cblx0Ly8gZGVwdGggdXAtdG8gd2hpY2ggb2JqZWN0IHdpbGwgYmUgZHVtcGVkXG5cdG1heERlcHRoOiA1LFxuXG5cdC8vIHdoZW4gZW5hYmxlZCwgYWxsIHRlc3RzIG11c3QgY2FsbCBleHBlY3QoKVxuXHRyZXF1aXJlRXhwZWN0czogZmFsc2UsXG5cblx0Ly8gYWRkIGNoZWNrYm94ZXMgdGhhdCBhcmUgcGVyc2lzdGVkIGluIHRoZSBxdWVyeS1zdHJpbmdcblx0Ly8gd2hlbiBlbmFibGVkLCB0aGUgaWQgaXMgc2V0IHRvIGB0cnVlYCBhcyBhIGBRVW5pdC5jb25maWdgIHByb3BlcnR5XG5cdHVybENvbmZpZzogW1xuXHRcdHtcblx0XHRcdGlkOiBcImhpZGVwYXNzZWRcIixcblx0XHRcdGxhYmVsOiBcIkhpZGUgcGFzc2VkIHRlc3RzXCIsXG5cdFx0XHR0b29sdGlwOiBcIk9ubHkgc2hvdyB0ZXN0cyBhbmQgYXNzZXJ0aW9ucyB0aGF0IGZhaWwuIFN0b3JlZCBhcyBxdWVyeS1zdHJpbmdzLlwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRpZDogXCJub2dsb2JhbHNcIixcblx0XHRcdGxhYmVsOiBcIkNoZWNrIGZvciBHbG9iYWxzXCIsXG5cdFx0XHR0b29sdGlwOiBcIkVuYWJsaW5nIHRoaXMgd2lsbCB0ZXN0IGlmIGFueSB0ZXN0IGludHJvZHVjZXMgbmV3IHByb3BlcnRpZXMgb24gdGhlIFwiICtcblx0XHRcdFx0XCJnbG9iYWwgb2JqZWN0IChgd2luZG93YCBpbiBCcm93c2VycykuIFN0b3JlZCBhcyBxdWVyeS1zdHJpbmdzLlwiXG5cdFx0fSxcblx0XHR7XG5cdFx0XHRpZDogXCJub3RyeWNhdGNoXCIsXG5cdFx0XHRsYWJlbDogXCJObyB0cnktY2F0Y2hcIixcblx0XHRcdHRvb2x0aXA6IFwiRW5hYmxpbmcgdGhpcyB3aWxsIHJ1biB0ZXN0cyBvdXRzaWRlIG9mIGEgdHJ5LWNhdGNoIGJsb2NrLiBNYWtlcyBkZWJ1Z2dpbmcgXCIgK1xuXHRcdFx0XHRcImV4Y2VwdGlvbnMgaW4gSUUgcmVhc29uYWJsZS4gU3RvcmVkIGFzIHF1ZXJ5LXN0cmluZ3MuXCJcblx0XHR9XG5cdF0sXG5cblx0Ly8gU2V0IG9mIGFsbCBtb2R1bGVzLlxuXHRtb2R1bGVzOiBbXSxcblxuXHQvLyBTdGFjayBvZiBuZXN0ZWQgbW9kdWxlc1xuXHRtb2R1bGVTdGFjazogW10sXG5cblx0Ly8gVGhlIGZpcnN0IHVubmFtZWQgbW9kdWxlXG5cdGN1cnJlbnRNb2R1bGU6IHtcblx0XHRuYW1lOiBcIlwiLFxuXHRcdHRlc3RzOiBbXVxuXHR9LFxuXG5cdGNhbGxiYWNrczoge31cbn07XG5cbnZhciB1cmxQYXJhbXMgPSBkZWZpbmVkLmRvY3VtZW50ID8gZ2V0VXJsUGFyYW1zKCkgOiB7fTtcblxuLy8gUHVzaCBhIGxvb3NlIHVubmFtZWQgbW9kdWxlIHRvIHRoZSBtb2R1bGVzIGNvbGxlY3Rpb25cbmNvbmZpZy5tb2R1bGVzLnB1c2goIGNvbmZpZy5jdXJyZW50TW9kdWxlICk7XG5cbmlmICggdXJsUGFyYW1zLmZpbHRlciA9PT0gdHJ1ZSApIHtcblx0ZGVsZXRlIHVybFBhcmFtcy5maWx0ZXI7XG59XG5cbi8vIFN0cmluZyBzZWFyY2ggYW55d2hlcmUgaW4gbW9kdWxlTmFtZSt0ZXN0TmFtZVxuY29uZmlnLmZpbHRlciA9IHVybFBhcmFtcy5maWx0ZXI7XG5cbmNvbmZpZy50ZXN0SWQgPSBbXTtcbmlmICggdXJsUGFyYW1zLnRlc3RJZCApIHtcblx0Ly8gRW5zdXJlIHRoYXQgdXJsUGFyYW1zLnRlc3RJZCBpcyBhbiBhcnJheVxuXHR1cmxQYXJhbXMudGVzdElkID0gZGVjb2RlVVJJQ29tcG9uZW50KCB1cmxQYXJhbXMudGVzdElkICkuc3BsaXQoIFwiLFwiICk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgdXJsUGFyYW1zLnRlc3RJZC5sZW5ndGg7IGkrKyApIHtcblx0XHRjb25maWcudGVzdElkLnB1c2goIHVybFBhcmFtcy50ZXN0SWRbIGkgXSApO1xuXHR9XG59XG5cbnZhciBsb2dnaW5nQ2FsbGJhY2tzID0ge307XG5cbi8vIFJlZ2lzdGVyIGxvZ2dpbmcgY2FsbGJhY2tzXG5mdW5jdGlvbiByZWdpc3RlckxvZ2dpbmdDYWxsYmFja3MoIG9iaiApIHtcblx0dmFyIGksIGwsIGtleSxcblx0XHRjYWxsYmFja05hbWVzID0gWyBcImJlZ2luXCIsIFwiZG9uZVwiLCBcImxvZ1wiLCBcInRlc3RTdGFydFwiLCBcInRlc3REb25lXCIsXG5cdFx0XHRcIm1vZHVsZVN0YXJ0XCIsIFwibW9kdWxlRG9uZVwiIF07XG5cblx0ZnVuY3Rpb24gcmVnaXN0ZXJMb2dnaW5nQ2FsbGJhY2soIGtleSApIHtcblx0XHR2YXIgbG9nZ2luZ0NhbGxiYWNrID0gZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuXHRcdFx0aWYgKCBvYmplY3RUeXBlKCBjYWxsYmFjayApICE9PSBcImZ1bmN0aW9uXCIgKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcIlFVbml0IGxvZ2dpbmcgbWV0aG9kcyByZXF1aXJlIGEgY2FsbGJhY2sgZnVuY3Rpb24gYXMgdGhlaXIgZmlyc3QgcGFyYW1ldGVycy5cIlxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25maWcuY2FsbGJhY2tzWyBrZXkgXS5wdXNoKCBjYWxsYmFjayApO1xuXHRcdH07XG5cblx0XHQvLyBERVBSRUNBVEVEOiBUaGlzIHdpbGwgYmUgcmVtb3ZlZCBvbiBRVW5pdCAyLjAuMCtcblx0XHQvLyBTdG9yZXMgdGhlIHJlZ2lzdGVyZWQgZnVuY3Rpb25zIGFsbG93aW5nIHJlc3RvcmluZ1xuXHRcdC8vIGF0IHZlcmlmeUxvZ2dpbmdDYWxsYmFja3MoKSBpZiBtb2RpZmllZFxuXHRcdGxvZ2dpbmdDYWxsYmFja3NbIGtleSBdID0gbG9nZ2luZ0NhbGxiYWNrO1xuXG5cdFx0cmV0dXJuIGxvZ2dpbmdDYWxsYmFjaztcblx0fVxuXG5cdGZvciAoIGkgPSAwLCBsID0gY2FsbGJhY2tOYW1lcy5sZW5ndGg7IGkgPCBsOyBpKysgKSB7XG5cdFx0a2V5ID0gY2FsbGJhY2tOYW1lc1sgaSBdO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSBrZXkgY29sbGVjdGlvbiBvZiBsb2dnaW5nIGNhbGxiYWNrXG5cdFx0aWYgKCBvYmplY3RUeXBlKCBjb25maWcuY2FsbGJhY2tzWyBrZXkgXSApID09PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdFx0Y29uZmlnLmNhbGxiYWNrc1sga2V5IF0gPSBbXTtcblx0XHR9XG5cblx0XHRvYmpbIGtleSBdID0gcmVnaXN0ZXJMb2dnaW5nQ2FsbGJhY2soIGtleSApO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJ1bkxvZ2dpbmdDYWxsYmFja3MoIGtleSwgYXJncyApIHtcblx0dmFyIGksIGwsIGNhbGxiYWNrcztcblxuXHRjYWxsYmFja3MgPSBjb25maWcuY2FsbGJhY2tzWyBrZXkgXTtcblx0Zm9yICggaSA9IDAsIGwgPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuXHRcdGNhbGxiYWNrc1sgaSBdKCBhcmdzICk7XG5cdH1cbn1cblxuLy8gREVQUkVDQVRFRDogVGhpcyB3aWxsIGJlIHJlbW92ZWQgb24gMi4wLjArXG4vLyBUaGlzIGZ1bmN0aW9uIHZlcmlmaWVzIGlmIHRoZSBsb2dnaW5nQ2FsbGJhY2tzIHdlcmUgbW9kaWZpZWQgYnkgdGhlIHVzZXJcbi8vIElmIHNvLCBpdCB3aWxsIHJlc3RvcmUgaXQsIGFzc2lnbiB0aGUgZ2l2ZW4gY2FsbGJhY2sgYW5kIHByaW50IGEgY29uc29sZSB3YXJuaW5nXG5mdW5jdGlvbiB2ZXJpZnlMb2dnaW5nQ2FsbGJhY2tzKCkge1xuXHR2YXIgbG9nZ2luZ0NhbGxiYWNrLCB1c2VyQ2FsbGJhY2s7XG5cblx0Zm9yICggbG9nZ2luZ0NhbGxiYWNrIGluIGxvZ2dpbmdDYWxsYmFja3MgKSB7XG5cdFx0aWYgKCBRVW5pdFsgbG9nZ2luZ0NhbGxiYWNrIF0gIT09IGxvZ2dpbmdDYWxsYmFja3NbIGxvZ2dpbmdDYWxsYmFjayBdICkge1xuXG5cdFx0XHR1c2VyQ2FsbGJhY2sgPSBRVW5pdFsgbG9nZ2luZ0NhbGxiYWNrIF07XG5cblx0XHRcdC8vIFJlc3RvcmUgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uXG5cdFx0XHRRVW5pdFsgbG9nZ2luZ0NhbGxiYWNrIF0gPSBsb2dnaW5nQ2FsbGJhY2tzWyBsb2dnaW5nQ2FsbGJhY2sgXTtcblxuXHRcdFx0Ly8gQXNzaWduIHRoZSBkZXByZWNhdGVkIGdpdmVuIGNhbGxiYWNrXG5cdFx0XHRRVW5pdFsgbG9nZ2luZ0NhbGxiYWNrIF0oIHVzZXJDYWxsYmFjayApO1xuXG5cdFx0XHRpZiAoIGdsb2JhbC5jb25zb2xlICYmIGdsb2JhbC5jb25zb2xlLndhcm4gKSB7XG5cdFx0XHRcdGdsb2JhbC5jb25zb2xlLndhcm4oXG5cdFx0XHRcdFx0XCJRVW5pdC5cIiArIGxvZ2dpbmdDYWxsYmFjayArIFwiIHdhcyByZXBsYWNlZCB3aXRoIGEgbmV3IHZhbHVlLlxcblwiICtcblx0XHRcdFx0XHRcIlBsZWFzZSwgY2hlY2sgb3V0IHRoZSBkb2N1bWVudGF0aW9uIG9uIGhvdyB0byBhcHBseSBsb2dnaW5nIGNhbGxiYWNrcy5cXG5cIiArXG5cdFx0XHRcdFx0XCJSZWZlcmVuY2U6IGh0dHA6Ly9hcGkucXVuaXRqcy5jb20vY2F0ZWdvcnkvY2FsbGJhY2tzL1wiXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG59XG5cbiggZnVuY3Rpb24oKSB7XG5cdGlmICggIWRlZmluZWQuZG9jdW1lbnQgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0Ly8gYG9uRXJyb3JGblByZXZgIGluaXRpYWxpemVkIGF0IHRvcCBvZiBzY29wZVxuXHQvLyBQcmVzZXJ2ZSBvdGhlciBoYW5kbGVyc1xuXHR2YXIgb25FcnJvckZuUHJldiA9IHdpbmRvdy5vbmVycm9yO1xuXG5cdC8vIENvdmVyIHVuY2F1Z2h0IGV4Y2VwdGlvbnNcblx0Ly8gUmV0dXJuaW5nIHRydWUgd2lsbCBzdXBwcmVzcyB0aGUgZGVmYXVsdCBicm93c2VyIGhhbmRsZXIsXG5cdC8vIHJldHVybmluZyBmYWxzZSB3aWxsIGxldCBpdCBydW4uXG5cdHdpbmRvdy5vbmVycm9yID0gZnVuY3Rpb24oIGVycm9yLCBmaWxlUGF0aCwgbGluZXJOciApIHtcblx0XHR2YXIgcmV0ID0gZmFsc2U7XG5cdFx0aWYgKCBvbkVycm9yRm5QcmV2ICkge1xuXHRcdFx0cmV0ID0gb25FcnJvckZuUHJldiggZXJyb3IsIGZpbGVQYXRoLCBsaW5lck5yICk7XG5cdFx0fVxuXG5cdFx0Ly8gVHJlYXQgcmV0dXJuIHZhbHVlIGFzIHdpbmRvdy5vbmVycm9yIGl0c2VsZiBkb2VzLFxuXHRcdC8vIE9ubHkgZG8gb3VyIGhhbmRsaW5nIGlmIG5vdCBzdXBwcmVzc2VkLlxuXHRcdGlmICggcmV0ICE9PSB0cnVlICkge1xuXHRcdFx0aWYgKCBRVW5pdC5jb25maWcuY3VycmVudCApIHtcblx0XHRcdFx0aWYgKCBRVW5pdC5jb25maWcuY3VycmVudC5pZ25vcmVHbG9iYWxFcnJvcnMgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0UVVuaXQucHVzaEZhaWx1cmUoIGVycm9yLCBmaWxlUGF0aCArIFwiOlwiICsgbGluZXJOciApO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0UVVuaXQudGVzdCggXCJnbG9iYWwgZmFpbHVyZVwiLCBleHRlbmQoZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0UVVuaXQucHVzaEZhaWx1cmUoIGVycm9yLCBmaWxlUGF0aCArIFwiOlwiICsgbGluZXJOciApO1xuXHRcdFx0XHR9LCB7IHZhbGlkVGVzdDogdHJ1ZSB9ICkgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmV0O1xuXHR9O1xufSApKCk7XG5cblFVbml0LnVybFBhcmFtcyA9IHVybFBhcmFtcztcblxuLy8gRmlndXJlIG91dCBpZiB3ZSdyZSBydW5uaW5nIHRoZSB0ZXN0cyBmcm9tIGEgc2VydmVyIG9yIG5vdFxuUVVuaXQuaXNMb2NhbCA9ICEoIGRlZmluZWQuZG9jdW1lbnQgJiYgd2luZG93LmxvY2F0aW9uLnByb3RvY29sICE9PSBcImZpbGU6XCIgKTtcblxuLy8gRXhwb3NlIHRoZSBjdXJyZW50IFFVbml0IHZlcnNpb25cblFVbml0LnZlcnNpb24gPSBcIjEuMjAuMFwiO1xuXG5leHRlbmQoIFFVbml0LCB7XG5cblx0Ly8gY2FsbCBvbiBzdGFydCBvZiBtb2R1bGUgdGVzdCB0byBwcmVwZW5kIG5hbWUgdG8gYWxsIHRlc3RzXG5cdG1vZHVsZTogZnVuY3Rpb24oIG5hbWUsIHRlc3RFbnZpcm9ubWVudCwgZXhlY3V0ZU5vdyApIHtcblx0XHR2YXIgbW9kdWxlLCBtb2R1bGVGbnM7XG5cdFx0dmFyIGN1cnJlbnRNb2R1bGUgPSBjb25maWcuY3VycmVudE1vZHVsZTtcblxuXHRcdGlmICggYXJndW1lbnRzLmxlbmd0aCA9PT0gMiApIHtcblx0XHRcdGlmICggdGVzdEVudmlyb25tZW50IGluc3RhbmNlb2YgRnVuY3Rpb24gKSB7XG5cdFx0XHRcdGV4ZWN1dGVOb3cgPSB0ZXN0RW52aXJvbm1lbnQ7XG5cdFx0XHRcdHRlc3RFbnZpcm9ubWVudCA9IHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBERVBSRUNBVEVEOiBoYW5kbGVzIHNldHVwL3RlYXJkb3duIGZ1bmN0aW9ucyxcblx0XHQvLyBiZWZvcmVFYWNoIGFuZCBhZnRlckVhY2ggc2hvdWxkIGJlIHVzZWQgaW5zdGVhZFxuXHRcdGlmICggdGVzdEVudmlyb25tZW50ICYmIHRlc3RFbnZpcm9ubWVudC5zZXR1cCApIHtcblx0XHRcdHRlc3RFbnZpcm9ubWVudC5iZWZvcmVFYWNoID0gdGVzdEVudmlyb25tZW50LnNldHVwO1xuXHRcdFx0ZGVsZXRlIHRlc3RFbnZpcm9ubWVudC5zZXR1cDtcblx0XHR9XG5cdFx0aWYgKCB0ZXN0RW52aXJvbm1lbnQgJiYgdGVzdEVudmlyb25tZW50LnRlYXJkb3duICkge1xuXHRcdFx0dGVzdEVudmlyb25tZW50LmFmdGVyRWFjaCA9IHRlc3RFbnZpcm9ubWVudC50ZWFyZG93bjtcblx0XHRcdGRlbGV0ZSB0ZXN0RW52aXJvbm1lbnQudGVhcmRvd247XG5cdFx0fVxuXG5cdFx0bW9kdWxlID0gY3JlYXRlTW9kdWxlKCk7XG5cblx0XHRtb2R1bGVGbnMgPSB7XG5cdFx0XHRiZWZvcmVFYWNoOiBzZXRIb29rKCBtb2R1bGUsIFwiYmVmb3JlRWFjaFwiICksXG5cdFx0XHRhZnRlckVhY2g6IHNldEhvb2soIG1vZHVsZSwgXCJhZnRlckVhY2hcIiApXG5cdFx0fTtcblxuXHRcdGlmICggZXhlY3V0ZU5vdyBpbnN0YW5jZW9mIEZ1bmN0aW9uICkge1xuXHRcdFx0Y29uZmlnLm1vZHVsZVN0YWNrLnB1c2goIG1vZHVsZSApO1xuXHRcdFx0c2V0Q3VycmVudE1vZHVsZSggbW9kdWxlICk7XG5cdFx0XHRleGVjdXRlTm93LmNhbGwoIG1vZHVsZS50ZXN0RW52aXJvbm1lbnQsIG1vZHVsZUZucyApO1xuXHRcdFx0Y29uZmlnLm1vZHVsZVN0YWNrLnBvcCgpO1xuXHRcdFx0bW9kdWxlID0gbW9kdWxlLnBhcmVudE1vZHVsZSB8fCBjdXJyZW50TW9kdWxlO1xuXHRcdH1cblxuXHRcdHNldEN1cnJlbnRNb2R1bGUoIG1vZHVsZSApO1xuXG5cdFx0ZnVuY3Rpb24gY3JlYXRlTW9kdWxlKCkge1xuXHRcdFx0dmFyIHBhcmVudE1vZHVsZSA9IGNvbmZpZy5tb2R1bGVTdGFjay5sZW5ndGggP1xuXHRcdFx0XHRjb25maWcubW9kdWxlU3RhY2suc2xpY2UoIC0xIClbIDAgXSA6IG51bGw7XG5cdFx0XHR2YXIgbW9kdWxlTmFtZSA9IHBhcmVudE1vZHVsZSAhPT0gbnVsbCA/XG5cdFx0XHRcdFsgcGFyZW50TW9kdWxlLm5hbWUsIG5hbWUgXS5qb2luKCBcIiA+IFwiICkgOiBuYW1lO1xuXHRcdFx0dmFyIG1vZHVsZSA9IHtcblx0XHRcdFx0bmFtZTogbW9kdWxlTmFtZSxcblx0XHRcdFx0cGFyZW50TW9kdWxlOiBwYXJlbnRNb2R1bGUsXG5cdFx0XHRcdHRlc3RzOiBbXVxuXHRcdFx0fTtcblxuXHRcdFx0dmFyIGVudiA9IHt9O1xuXHRcdFx0aWYgKCBwYXJlbnRNb2R1bGUgKSB7XG5cdFx0XHRcdGV4dGVuZCggZW52LCBwYXJlbnRNb2R1bGUudGVzdEVudmlyb25tZW50ICk7XG5cdFx0XHRcdGRlbGV0ZSBlbnYuYmVmb3JlRWFjaDtcblx0XHRcdFx0ZGVsZXRlIGVudi5hZnRlckVhY2g7XG5cdFx0XHR9XG5cdFx0XHRleHRlbmQoIGVudiwgdGVzdEVudmlyb25tZW50ICk7XG5cdFx0XHRtb2R1bGUudGVzdEVudmlyb25tZW50ID0gZW52O1xuXG5cdFx0XHRjb25maWcubW9kdWxlcy5wdXNoKCBtb2R1bGUgKTtcblx0XHRcdHJldHVybiBtb2R1bGU7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gc2V0Q3VycmVudE1vZHVsZSggbW9kdWxlICkge1xuXHRcdFx0Y29uZmlnLmN1cnJlbnRNb2R1bGUgPSBtb2R1bGU7XG5cdFx0fVxuXG5cdH0sXG5cblx0Ly8gREVQUkVDQVRFRDogUVVuaXQuYXN5bmNUZXN0KCkgd2lsbCBiZSByZW1vdmVkIGluIFFVbml0IDIuMC5cblx0YXN5bmNUZXN0OiBhc3luY1Rlc3QsXG5cblx0dGVzdDogdGVzdCxcblxuXHRza2lwOiBza2lwLFxuXG5cdG9ubHk6IG9ubHksXG5cblx0Ly8gREVQUkVDQVRFRDogVGhlIGZ1bmN0aW9uYWxpdHkgb2YgUVVuaXQuc3RhcnQoKSB3aWxsIGJlIGFsdGVyZWQgaW4gUVVuaXQgMi4wLlxuXHQvLyBJbiBRVW5pdCAyLjAsIGludm9raW5nIGl0IHdpbGwgT05MWSBhZmZlY3QgdGhlIGBRVW5pdC5jb25maWcuYXV0b3N0YXJ0YCBibG9ja2luZyBiZWhhdmlvci5cblx0c3RhcnQ6IGZ1bmN0aW9uKCBjb3VudCApIHtcblx0XHR2YXIgZ2xvYmFsU3RhcnRBbHJlYWR5Q2FsbGVkID0gZ2xvYmFsU3RhcnRDYWxsZWQ7XG5cblx0XHRpZiAoICFjb25maWcuY3VycmVudCApIHtcblx0XHRcdGdsb2JhbFN0YXJ0Q2FsbGVkID0gdHJ1ZTtcblxuXHRcdFx0aWYgKCBydW5TdGFydGVkICkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiQ2FsbGVkIHN0YXJ0KCkgb3V0c2lkZSBvZiBhIHRlc3QgY29udGV4dCB3aGlsZSBhbHJlYWR5IHN0YXJ0ZWRcIiApO1xuXHRcdFx0fSBlbHNlIGlmICggZ2xvYmFsU3RhcnRBbHJlYWR5Q2FsbGVkIHx8IGNvdW50ID4gMSApIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBcIkNhbGxlZCBzdGFydCgpIG91dHNpZGUgb2YgYSB0ZXN0IGNvbnRleHQgdG9vIG1hbnkgdGltZXNcIiApO1xuXHRcdFx0fSBlbHNlIGlmICggY29uZmlnLmF1dG9zdGFydCApIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBcIkNhbGxlZCBzdGFydCgpIG91dHNpZGUgb2YgYSB0ZXN0IGNvbnRleHQgd2hlbiBcIiArXG5cdFx0XHRcdFx0XCJRVW5pdC5jb25maWcuYXV0b3N0YXJ0IHdhcyB0cnVlXCIgKTtcblx0XHRcdH0gZWxzZSBpZiAoICFjb25maWcucGFnZUxvYWRlZCApIHtcblxuXHRcdFx0XHQvLyBUaGUgcGFnZSBpc24ndCBjb21wbGV0ZWx5IGxvYWRlZCB5ZXQsIHNvIGJhaWwgb3V0IGFuZCBsZXQgYFFVbml0LmxvYWRgIGhhbmRsZSBpdFxuXHRcdFx0XHRjb25maWcuYXV0b3N0YXJ0ID0gdHJ1ZTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdC8vIElmIGEgdGVzdCBpcyBydW5uaW5nLCBhZGp1c3QgaXRzIHNlbWFwaG9yZVxuXHRcdFx0Y29uZmlnLmN1cnJlbnQuc2VtYXBob3JlIC09IGNvdW50IHx8IDE7XG5cblx0XHRcdC8vIElmIHNlbWFwaG9yZSBpcyBub24tbnVtZXJpYywgdGhyb3cgZXJyb3Jcblx0XHRcdGlmICggaXNOYU4oIGNvbmZpZy5jdXJyZW50LnNlbWFwaG9yZSApICkge1xuXHRcdFx0XHRjb25maWcuY3VycmVudC5zZW1hcGhvcmUgPSAwO1xuXG5cdFx0XHRcdFFVbml0LnB1c2hGYWlsdXJlKFxuXHRcdFx0XHRcdFwiQ2FsbGVkIHN0YXJ0KCkgd2l0aCBhIG5vbi1udW1lcmljIGRlY3JlbWVudC5cIixcblx0XHRcdFx0XHRzb3VyY2VGcm9tU3RhY2t0cmFjZSggMiApXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRG9uJ3Qgc3RhcnQgdW50aWwgZXF1YWwgbnVtYmVyIG9mIHN0b3AtY2FsbHNcblx0XHRcdGlmICggY29uZmlnLmN1cnJlbnQuc2VtYXBob3JlID4gMCApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyB0aHJvdyBhbiBFcnJvciBpZiBzdGFydCBpcyBjYWxsZWQgbW9yZSBvZnRlbiB0aGFuIHN0b3Bcblx0XHRcdGlmICggY29uZmlnLmN1cnJlbnQuc2VtYXBob3JlIDwgMCApIHtcblx0XHRcdFx0Y29uZmlnLmN1cnJlbnQuc2VtYXBob3JlID0gMDtcblxuXHRcdFx0XHRRVW5pdC5wdXNoRmFpbHVyZShcblx0XHRcdFx0XHRcIkNhbGxlZCBzdGFydCgpIHdoaWxlIGFscmVhZHkgc3RhcnRlZCAodGVzdCdzIHNlbWFwaG9yZSB3YXMgMCBhbHJlYWR5KVwiLFxuXHRcdFx0XHRcdHNvdXJjZUZyb21TdGFja3RyYWNlKCAyIClcblx0XHRcdFx0KTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJlc3VtZVByb2Nlc3NpbmcoKTtcblx0fSxcblxuXHQvLyBERVBSRUNBVEVEOiBRVW5pdC5zdG9wKCkgd2lsbCBiZSByZW1vdmVkIGluIFFVbml0IDIuMC5cblx0c3RvcDogZnVuY3Rpb24oIGNvdW50ICkge1xuXG5cdFx0Ly8gSWYgdGhlcmUgaXNuJ3QgYSB0ZXN0IHJ1bm5pbmcsIGRvbid0IGFsbG93IFFVbml0LnN0b3AoKSB0byBiZSBjYWxsZWRcblx0XHRpZiAoICFjb25maWcuY3VycmVudCApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvciggXCJDYWxsZWQgc3RvcCgpIG91dHNpZGUgb2YgYSB0ZXN0IGNvbnRleHRcIiApO1xuXHRcdH1cblxuXHRcdC8vIElmIGEgdGVzdCBpcyBydW5uaW5nLCBhZGp1c3QgaXRzIHNlbWFwaG9yZVxuXHRcdGNvbmZpZy5jdXJyZW50LnNlbWFwaG9yZSArPSBjb3VudCB8fCAxO1xuXG5cdFx0cGF1c2VQcm9jZXNzaW5nKCk7XG5cdH0sXG5cblx0Y29uZmlnOiBjb25maWcsXG5cblx0aXM6IGlzLFxuXG5cdG9iamVjdFR5cGU6IG9iamVjdFR5cGUsXG5cblx0ZXh0ZW5kOiBleHRlbmQsXG5cblx0bG9hZDogZnVuY3Rpb24oKSB7XG5cdFx0Y29uZmlnLnBhZ2VMb2FkZWQgPSB0cnVlO1xuXG5cdFx0Ly8gSW5pdGlhbGl6ZSB0aGUgY29uZmlndXJhdGlvbiBvcHRpb25zXG5cdFx0ZXh0ZW5kKCBjb25maWcsIHtcblx0XHRcdHN0YXRzOiB7IGFsbDogMCwgYmFkOiAwIH0sXG5cdFx0XHRtb2R1bGVTdGF0czogeyBhbGw6IDAsIGJhZDogMCB9LFxuXHRcdFx0c3RhcnRlZDogMCxcblx0XHRcdHVwZGF0ZVJhdGU6IDEwMDAsXG5cdFx0XHRhdXRvc3RhcnQ6IHRydWUsXG5cdFx0XHRmaWx0ZXI6IFwiXCJcblx0XHR9LCB0cnVlICk7XG5cblx0XHRjb25maWcuYmxvY2tpbmcgPSBmYWxzZTtcblxuXHRcdGlmICggY29uZmlnLmF1dG9zdGFydCApIHtcblx0XHRcdHJlc3VtZVByb2Nlc3NpbmcoKTtcblx0XHR9XG5cdH0sXG5cblx0c3RhY2s6IGZ1bmN0aW9uKCBvZmZzZXQgKSB7XG5cdFx0b2Zmc2V0ID0gKCBvZmZzZXQgfHwgMCApICsgMjtcblx0XHRyZXR1cm4gc291cmNlRnJvbVN0YWNrdHJhY2UoIG9mZnNldCApO1xuXHR9XG59KTtcblxucmVnaXN0ZXJMb2dnaW5nQ2FsbGJhY2tzKCBRVW5pdCApO1xuXG5mdW5jdGlvbiBiZWdpbigpIHtcblx0dmFyIGksIGwsXG5cdFx0bW9kdWxlc0xvZyA9IFtdO1xuXG5cdC8vIElmIHRoZSB0ZXN0IHJ1biBoYXNuJ3Qgb2ZmaWNpYWxseSBiZWd1biB5ZXRcblx0aWYgKCAhY29uZmlnLnN0YXJ0ZWQgKSB7XG5cblx0XHQvLyBSZWNvcmQgdGhlIHRpbWUgb2YgdGhlIHRlc3QgcnVuJ3MgYmVnaW5uaW5nXG5cdFx0Y29uZmlnLnN0YXJ0ZWQgPSBub3coKTtcblxuXHRcdHZlcmlmeUxvZ2dpbmdDYWxsYmFja3MoKTtcblxuXHRcdC8vIERlbGV0ZSB0aGUgbG9vc2UgdW5uYW1lZCBtb2R1bGUgaWYgdW51c2VkLlxuXHRcdGlmICggY29uZmlnLm1vZHVsZXNbIDAgXS5uYW1lID09PSBcIlwiICYmIGNvbmZpZy5tb2R1bGVzWyAwIF0udGVzdHMubGVuZ3RoID09PSAwICkge1xuXHRcdFx0Y29uZmlnLm1vZHVsZXMuc2hpZnQoKTtcblx0XHR9XG5cblx0XHQvLyBBdm9pZCB1bm5lY2Vzc2FyeSBpbmZvcm1hdGlvbiBieSBub3QgbG9nZ2luZyBtb2R1bGVzJyB0ZXN0IGVudmlyb25tZW50c1xuXHRcdGZvciAoIGkgPSAwLCBsID0gY29uZmlnLm1vZHVsZXMubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0bW9kdWxlc0xvZy5wdXNoKHtcblx0XHRcdFx0bmFtZTogY29uZmlnLm1vZHVsZXNbIGkgXS5uYW1lLFxuXHRcdFx0XHR0ZXN0czogY29uZmlnLm1vZHVsZXNbIGkgXS50ZXN0c1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gVGhlIHRlc3QgcnVuIGlzIG9mZmljaWFsbHkgYmVnaW5uaW5nIG5vd1xuXHRcdHJ1bkxvZ2dpbmdDYWxsYmFja3MoIFwiYmVnaW5cIiwge1xuXHRcdFx0dG90YWxUZXN0czogVGVzdC5jb3VudCxcblx0XHRcdG1vZHVsZXM6IG1vZHVsZXNMb2dcblx0XHR9KTtcblx0fVxuXG5cdGNvbmZpZy5ibG9ja2luZyA9IGZhbHNlO1xuXHRwcm9jZXNzKCB0cnVlICk7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3MoIGxhc3QgKSB7XG5cdGZ1bmN0aW9uIG5leHQoKSB7XG5cdFx0cHJvY2VzcyggbGFzdCApO1xuXHR9XG5cdHZhciBzdGFydCA9IG5vdygpO1xuXHRjb25maWcuZGVwdGggPSAoIGNvbmZpZy5kZXB0aCB8fCAwICkgKyAxO1xuXG5cdHdoaWxlICggY29uZmlnLnF1ZXVlLmxlbmd0aCAmJiAhY29uZmlnLmJsb2NraW5nICkge1xuXHRcdGlmICggIWRlZmluZWQuc2V0VGltZW91dCB8fCBjb25maWcudXBkYXRlUmF0ZSA8PSAwIHx8XG5cdFx0XHRcdCggKCBub3coKSAtIHN0YXJ0ICkgPCBjb25maWcudXBkYXRlUmF0ZSApICkge1xuXHRcdFx0aWYgKCBjb25maWcuY3VycmVudCApIHtcblxuXHRcdFx0XHQvLyBSZXNldCBhc3luYyB0cmFja2luZyBmb3IgZWFjaCBwaGFzZSBvZiB0aGUgVGVzdCBsaWZlY3ljbGVcblx0XHRcdFx0Y29uZmlnLmN1cnJlbnQudXNlZEFzeW5jID0gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRjb25maWcucXVldWUuc2hpZnQoKSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzZXRUaW1lb3V0KCBuZXh0LCAxMyApO1xuXHRcdFx0YnJlYWs7XG5cdFx0fVxuXHR9XG5cdGNvbmZpZy5kZXB0aC0tO1xuXHRpZiAoIGxhc3QgJiYgIWNvbmZpZy5ibG9ja2luZyAmJiAhY29uZmlnLnF1ZXVlLmxlbmd0aCAmJiBjb25maWcuZGVwdGggPT09IDAgKSB7XG5cdFx0ZG9uZSgpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHBhdXNlUHJvY2Vzc2luZygpIHtcblx0Y29uZmlnLmJsb2NraW5nID0gdHJ1ZTtcblxuXHRpZiAoIGNvbmZpZy50ZXN0VGltZW91dCAmJiBkZWZpbmVkLnNldFRpbWVvdXQgKSB7XG5cdFx0Y2xlYXJUaW1lb3V0KCBjb25maWcudGltZW91dCApO1xuXHRcdGNvbmZpZy50aW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcblx0XHRcdGlmICggY29uZmlnLmN1cnJlbnQgKSB7XG5cdFx0XHRcdGNvbmZpZy5jdXJyZW50LnNlbWFwaG9yZSA9IDA7XG5cdFx0XHRcdFFVbml0LnB1c2hGYWlsdXJlKCBcIlRlc3QgdGltZWQgb3V0XCIsIHNvdXJjZUZyb21TdGFja3RyYWNlKCAyICkgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvciggXCJUZXN0IHRpbWVkIG91dFwiICk7XG5cdFx0XHR9XG5cdFx0XHRyZXN1bWVQcm9jZXNzaW5nKCk7XG5cdFx0fSwgY29uZmlnLnRlc3RUaW1lb3V0ICk7XG5cdH1cbn1cblxuZnVuY3Rpb24gcmVzdW1lUHJvY2Vzc2luZygpIHtcblx0cnVuU3RhcnRlZCA9IHRydWU7XG5cblx0Ly8gQSBzbGlnaHQgZGVsYXkgdG8gYWxsb3cgdGhpcyBpdGVyYXRpb24gb2YgdGhlIGV2ZW50IGxvb3AgdG8gZmluaXNoIChtb3JlIGFzc2VydGlvbnMsIGV0Yy4pXG5cdGlmICggZGVmaW5lZC5zZXRUaW1lb3V0ICkge1xuXHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG5cdFx0XHRpZiAoIGNvbmZpZy5jdXJyZW50ICYmIGNvbmZpZy5jdXJyZW50LnNlbWFwaG9yZSA+IDAgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmICggY29uZmlnLnRpbWVvdXQgKSB7XG5cdFx0XHRcdGNsZWFyVGltZW91dCggY29uZmlnLnRpbWVvdXQgKTtcblx0XHRcdH1cblxuXHRcdFx0YmVnaW4oKTtcblx0XHR9LCAxMyApO1xuXHR9IGVsc2Uge1xuXHRcdGJlZ2luKCk7XG5cdH1cbn1cblxuZnVuY3Rpb24gZG9uZSgpIHtcblx0dmFyIHJ1bnRpbWUsIHBhc3NlZDtcblxuXHRjb25maWcuYXV0b3J1biA9IHRydWU7XG5cblx0Ly8gTG9nIHRoZSBsYXN0IG1vZHVsZSByZXN1bHRzXG5cdGlmICggY29uZmlnLnByZXZpb3VzTW9kdWxlICkge1xuXHRcdHJ1bkxvZ2dpbmdDYWxsYmFja3MoIFwibW9kdWxlRG9uZVwiLCB7XG5cdFx0XHRuYW1lOiBjb25maWcucHJldmlvdXNNb2R1bGUubmFtZSxcblx0XHRcdHRlc3RzOiBjb25maWcucHJldmlvdXNNb2R1bGUudGVzdHMsXG5cdFx0XHRmYWlsZWQ6IGNvbmZpZy5tb2R1bGVTdGF0cy5iYWQsXG5cdFx0XHRwYXNzZWQ6IGNvbmZpZy5tb2R1bGVTdGF0cy5hbGwgLSBjb25maWcubW9kdWxlU3RhdHMuYmFkLFxuXHRcdFx0dG90YWw6IGNvbmZpZy5tb2R1bGVTdGF0cy5hbGwsXG5cdFx0XHRydW50aW1lOiBub3coKSAtIGNvbmZpZy5tb2R1bGVTdGF0cy5zdGFydGVkXG5cdFx0fSk7XG5cdH1cblx0ZGVsZXRlIGNvbmZpZy5wcmV2aW91c01vZHVsZTtcblxuXHRydW50aW1lID0gbm93KCkgLSBjb25maWcuc3RhcnRlZDtcblx0cGFzc2VkID0gY29uZmlnLnN0YXRzLmFsbCAtIGNvbmZpZy5zdGF0cy5iYWQ7XG5cblx0cnVuTG9nZ2luZ0NhbGxiYWNrcyggXCJkb25lXCIsIHtcblx0XHRmYWlsZWQ6IGNvbmZpZy5zdGF0cy5iYWQsXG5cdFx0cGFzc2VkOiBwYXNzZWQsXG5cdFx0dG90YWw6IGNvbmZpZy5zdGF0cy5hbGwsXG5cdFx0cnVudGltZTogcnVudGltZVxuXHR9KTtcbn1cblxuZnVuY3Rpb24gc2V0SG9vayggbW9kdWxlLCBob29rTmFtZSApIHtcblx0aWYgKCBtb2R1bGUudGVzdEVudmlyb25tZW50ID09PSB1bmRlZmluZWQgKSB7XG5cdFx0bW9kdWxlLnRlc3RFbnZpcm9ubWVudCA9IHt9O1xuXHR9XG5cblx0cmV0dXJuIGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcblx0XHRtb2R1bGUudGVzdEVudmlyb25tZW50WyBob29rTmFtZSBdID0gY2FsbGJhY2s7XG5cdH07XG59XG5cbnZhciBmb2N1c2VkID0gZmFsc2U7XG5cbmZ1bmN0aW9uIFRlc3QoIHNldHRpbmdzICkge1xuXHR2YXIgaSwgbDtcblxuXHQrK1Rlc3QuY291bnQ7XG5cblx0ZXh0ZW5kKCB0aGlzLCBzZXR0aW5ncyApO1xuXHR0aGlzLmFzc2VydGlvbnMgPSBbXTtcblx0dGhpcy5zZW1hcGhvcmUgPSAwO1xuXHR0aGlzLnVzZWRBc3luYyA9IGZhbHNlO1xuXHR0aGlzLm1vZHVsZSA9IGNvbmZpZy5jdXJyZW50TW9kdWxlO1xuXHR0aGlzLnN0YWNrID0gc291cmNlRnJvbVN0YWNrdHJhY2UoIDMgKTtcblxuXHQvLyBSZWdpc3RlciB1bmlxdWUgc3RyaW5nc1xuXHRmb3IgKCBpID0gMCwgbCA9IHRoaXMubW9kdWxlLnRlc3RzOyBpIDwgbC5sZW5ndGg7IGkrKyApIHtcblx0XHRpZiAoIHRoaXMubW9kdWxlLnRlc3RzWyBpIF0ubmFtZSA9PT0gdGhpcy50ZXN0TmFtZSApIHtcblx0XHRcdHRoaXMudGVzdE5hbWUgKz0gXCIgXCI7XG5cdFx0fVxuXHR9XG5cblx0dGhpcy50ZXN0SWQgPSBnZW5lcmF0ZUhhc2goIHRoaXMubW9kdWxlLm5hbWUsIHRoaXMudGVzdE5hbWUgKTtcblxuXHR0aGlzLm1vZHVsZS50ZXN0cy5wdXNoKHtcblx0XHRuYW1lOiB0aGlzLnRlc3ROYW1lLFxuXHRcdHRlc3RJZDogdGhpcy50ZXN0SWRcblx0fSk7XG5cblx0aWYgKCBzZXR0aW5ncy5za2lwICkge1xuXG5cdFx0Ly8gU2tpcHBlZCB0ZXN0cyB3aWxsIGZ1bGx5IGlnbm9yZSBhbnkgc2VudCBjYWxsYmFja1xuXHRcdHRoaXMuY2FsbGJhY2sgPSBmdW5jdGlvbigpIHt9O1xuXHRcdHRoaXMuYXN5bmMgPSBmYWxzZTtcblx0XHR0aGlzLmV4cGVjdGVkID0gMDtcblx0fSBlbHNlIHtcblx0XHR0aGlzLmFzc2VydCA9IG5ldyBBc3NlcnQoIHRoaXMgKTtcblx0fVxufVxuXG5UZXN0LmNvdW50ID0gMDtcblxuVGVzdC5wcm90b3R5cGUgPSB7XG5cdGJlZm9yZTogZnVuY3Rpb24oKSB7XG5cdFx0aWYgKFxuXG5cdFx0XHQvLyBFbWl0IG1vZHVsZVN0YXJ0IHdoZW4gd2UncmUgc3dpdGNoaW5nIGZyb20gb25lIG1vZHVsZSB0byBhbm90aGVyXG5cdFx0XHR0aGlzLm1vZHVsZSAhPT0gY29uZmlnLnByZXZpb3VzTW9kdWxlIHx8XG5cblx0XHRcdFx0Ly8gVGhleSBjb3VsZCBiZSBlcXVhbCAoYm90aCB1bmRlZmluZWQpIGJ1dCBpZiB0aGUgcHJldmlvdXNNb2R1bGUgcHJvcGVydHkgZG9lc24ndFxuXHRcdFx0XHQvLyB5ZXQgZXhpc3QgaXQgbWVhbnMgdGhpcyBpcyB0aGUgZmlyc3QgdGVzdCBpbiBhIHN1aXRlIHRoYXQgaXNuJ3Qgd3JhcHBlZCBpbiBhXG5cdFx0XHRcdC8vIG1vZHVsZSwgaW4gd2hpY2ggY2FzZSB3ZSdsbCBqdXN0IGVtaXQgYSBtb2R1bGVTdGFydCBldmVudCBmb3IgJ3VuZGVmaW5lZCcuXG5cdFx0XHRcdC8vIFdpdGhvdXQgdGhpcywgcmVwb3J0ZXJzIGNhbiBnZXQgdGVzdFN0YXJ0IGJlZm9yZSBtb2R1bGVTdGFydCAgd2hpY2ggaXMgYSBwcm9ibGVtLlxuXHRcdFx0XHQhaGFzT3duLmNhbGwoIGNvbmZpZywgXCJwcmV2aW91c01vZHVsZVwiIClcblx0XHQpIHtcblx0XHRcdGlmICggaGFzT3duLmNhbGwoIGNvbmZpZywgXCJwcmV2aW91c01vZHVsZVwiICkgKSB7XG5cdFx0XHRcdHJ1bkxvZ2dpbmdDYWxsYmFja3MoIFwibW9kdWxlRG9uZVwiLCB7XG5cdFx0XHRcdFx0bmFtZTogY29uZmlnLnByZXZpb3VzTW9kdWxlLm5hbWUsXG5cdFx0XHRcdFx0dGVzdHM6IGNvbmZpZy5wcmV2aW91c01vZHVsZS50ZXN0cyxcblx0XHRcdFx0XHRmYWlsZWQ6IGNvbmZpZy5tb2R1bGVTdGF0cy5iYWQsXG5cdFx0XHRcdFx0cGFzc2VkOiBjb25maWcubW9kdWxlU3RhdHMuYWxsIC0gY29uZmlnLm1vZHVsZVN0YXRzLmJhZCxcblx0XHRcdFx0XHR0b3RhbDogY29uZmlnLm1vZHVsZVN0YXRzLmFsbCxcblx0XHRcdFx0XHRydW50aW1lOiBub3coKSAtIGNvbmZpZy5tb2R1bGVTdGF0cy5zdGFydGVkXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0Y29uZmlnLnByZXZpb3VzTW9kdWxlID0gdGhpcy5tb2R1bGU7XG5cdFx0XHRjb25maWcubW9kdWxlU3RhdHMgPSB7IGFsbDogMCwgYmFkOiAwLCBzdGFydGVkOiBub3coKSB9O1xuXHRcdFx0cnVuTG9nZ2luZ0NhbGxiYWNrcyggXCJtb2R1bGVTdGFydFwiLCB7XG5cdFx0XHRcdG5hbWU6IHRoaXMubW9kdWxlLm5hbWUsXG5cdFx0XHRcdHRlc3RzOiB0aGlzLm1vZHVsZS50ZXN0c1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Y29uZmlnLmN1cnJlbnQgPSB0aGlzO1xuXG5cdFx0aWYgKCB0aGlzLm1vZHVsZS50ZXN0RW52aXJvbm1lbnQgKSB7XG5cdFx0XHRkZWxldGUgdGhpcy5tb2R1bGUudGVzdEVudmlyb25tZW50LmJlZm9yZUVhY2g7XG5cdFx0XHRkZWxldGUgdGhpcy5tb2R1bGUudGVzdEVudmlyb25tZW50LmFmdGVyRWFjaDtcblx0XHR9XG5cdFx0dGhpcy50ZXN0RW52aXJvbm1lbnQgPSBleHRlbmQoIHt9LCB0aGlzLm1vZHVsZS50ZXN0RW52aXJvbm1lbnQgKTtcblxuXHRcdHRoaXMuc3RhcnRlZCA9IG5vdygpO1xuXHRcdHJ1bkxvZ2dpbmdDYWxsYmFja3MoIFwidGVzdFN0YXJ0XCIsIHtcblx0XHRcdG5hbWU6IHRoaXMudGVzdE5hbWUsXG5cdFx0XHRtb2R1bGU6IHRoaXMubW9kdWxlLm5hbWUsXG5cdFx0XHR0ZXN0SWQ6IHRoaXMudGVzdElkXG5cdFx0fSk7XG5cblx0XHRpZiAoICFjb25maWcucG9sbHV0aW9uICkge1xuXHRcdFx0c2F2ZUdsb2JhbCgpO1xuXHRcdH1cblx0fSxcblxuXHRydW46IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBwcm9taXNlO1xuXG5cdFx0Y29uZmlnLmN1cnJlbnQgPSB0aGlzO1xuXG5cdFx0aWYgKCB0aGlzLmFzeW5jICkge1xuXHRcdFx0UVVuaXQuc3RvcCgpO1xuXHRcdH1cblxuXHRcdHRoaXMuY2FsbGJhY2tTdGFydGVkID0gbm93KCk7XG5cblx0XHRpZiAoIGNvbmZpZy5ub3RyeWNhdGNoICkge1xuXHRcdFx0cnVuVGVzdCggdGhpcyApO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdHRyeSB7XG5cdFx0XHRydW5UZXN0KCB0aGlzICk7XG5cdFx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0XHR0aGlzLnB1c2hGYWlsdXJlKCBcIkRpZWQgb24gdGVzdCAjXCIgKyAoIHRoaXMuYXNzZXJ0aW9ucy5sZW5ndGggKyAxICkgKyBcIiBcIiArXG5cdFx0XHRcdHRoaXMuc3RhY2sgKyBcIjogXCIgKyAoIGUubWVzc2FnZSB8fCBlICksIGV4dHJhY3RTdGFja3RyYWNlKCBlLCAwICkgKTtcblxuXHRcdFx0Ly8gZWxzZSBuZXh0IHRlc3Qgd2lsbCBjYXJyeSB0aGUgcmVzcG9uc2liaWxpdHlcblx0XHRcdHNhdmVHbG9iYWwoKTtcblxuXHRcdFx0Ly8gUmVzdGFydCB0aGUgdGVzdHMgaWYgdGhleSdyZSBibG9ja2luZ1xuXHRcdFx0aWYgKCBjb25maWcuYmxvY2tpbmcgKSB7XG5cdFx0XHRcdFFVbml0LnN0YXJ0KCk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcnVuVGVzdCggdGVzdCApIHtcblx0XHRcdHByb21pc2UgPSB0ZXN0LmNhbGxiYWNrLmNhbGwoIHRlc3QudGVzdEVudmlyb25tZW50LCB0ZXN0LmFzc2VydCApO1xuXHRcdFx0dGVzdC5yZXNvbHZlUHJvbWlzZSggcHJvbWlzZSApO1xuXHRcdH1cblx0fSxcblxuXHRhZnRlcjogZnVuY3Rpb24oKSB7XG5cdFx0Y2hlY2tQb2xsdXRpb24oKTtcblx0fSxcblxuXHRxdWV1ZUhvb2s6IGZ1bmN0aW9uKCBob29rLCBob29rTmFtZSApIHtcblx0XHR2YXIgcHJvbWlzZSxcblx0XHRcdHRlc3QgPSB0aGlzO1xuXHRcdHJldHVybiBmdW5jdGlvbiBydW5Ib29rKCkge1xuXHRcdFx0Y29uZmlnLmN1cnJlbnQgPSB0ZXN0O1xuXHRcdFx0aWYgKCBjb25maWcubm90cnljYXRjaCApIHtcblx0XHRcdFx0Y2FsbEhvb2soKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXHRcdFx0dHJ5IHtcblx0XHRcdFx0Y2FsbEhvb2soKTtcblx0XHRcdH0gY2F0Y2ggKCBlcnJvciApIHtcblx0XHRcdFx0dGVzdC5wdXNoRmFpbHVyZSggaG9va05hbWUgKyBcIiBmYWlsZWQgb24gXCIgKyB0ZXN0LnRlc3ROYW1lICsgXCI6IFwiICtcblx0XHRcdFx0KCBlcnJvci5tZXNzYWdlIHx8IGVycm9yICksIGV4dHJhY3RTdGFja3RyYWNlKCBlcnJvciwgMCApICk7XG5cdFx0XHR9XG5cblx0XHRcdGZ1bmN0aW9uIGNhbGxIb29rKCkge1xuXHRcdFx0XHRwcm9taXNlID0gaG9vay5jYWxsKCB0ZXN0LnRlc3RFbnZpcm9ubWVudCwgdGVzdC5hc3NlcnQgKTtcblx0XHRcdFx0dGVzdC5yZXNvbHZlUHJvbWlzZSggcHJvbWlzZSwgaG9va05hbWUgKTtcblx0XHRcdH1cblx0XHR9O1xuXHR9LFxuXG5cdC8vIEN1cnJlbnRseSBvbmx5IHVzZWQgZm9yIG1vZHVsZSBsZXZlbCBob29rcywgY2FuIGJlIHVzZWQgdG8gYWRkIGdsb2JhbCBsZXZlbCBvbmVzXG5cdGhvb2tzOiBmdW5jdGlvbiggaGFuZGxlciApIHtcblx0XHR2YXIgaG9va3MgPSBbXTtcblxuXHRcdGZ1bmN0aW9uIHByb2Nlc3NIb29rcyggdGVzdCwgbW9kdWxlICkge1xuXHRcdFx0aWYgKCBtb2R1bGUucGFyZW50TW9kdWxlICkge1xuXHRcdFx0XHRwcm9jZXNzSG9va3MoIHRlc3QsIG1vZHVsZS5wYXJlbnRNb2R1bGUgKTtcblx0XHRcdH1cblx0XHRcdGlmICggbW9kdWxlLnRlc3RFbnZpcm9ubWVudCAmJlxuXHRcdFx0XHRRVW5pdC5vYmplY3RUeXBlKCBtb2R1bGUudGVzdEVudmlyb25tZW50WyBoYW5kbGVyIF0gKSA9PT0gXCJmdW5jdGlvblwiICkge1xuXHRcdFx0XHRob29rcy5wdXNoKCB0ZXN0LnF1ZXVlSG9vayggbW9kdWxlLnRlc3RFbnZpcm9ubWVudFsgaGFuZGxlciBdLCBoYW5kbGVyICkgKTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBIb29rcyBhcmUgaWdub3JlZCBvbiBza2lwcGVkIHRlc3RzXG5cdFx0aWYgKCAhdGhpcy5za2lwICkge1xuXHRcdFx0cHJvY2Vzc0hvb2tzKCB0aGlzLCB0aGlzLm1vZHVsZSApO1xuXHRcdH1cblx0XHRyZXR1cm4gaG9va3M7XG5cdH0sXG5cblx0ZmluaXNoOiBmdW5jdGlvbigpIHtcblx0XHRjb25maWcuY3VycmVudCA9IHRoaXM7XG5cdFx0aWYgKCBjb25maWcucmVxdWlyZUV4cGVjdHMgJiYgdGhpcy5leHBlY3RlZCA9PT0gbnVsbCApIHtcblx0XHRcdHRoaXMucHVzaEZhaWx1cmUoIFwiRXhwZWN0ZWQgbnVtYmVyIG9mIGFzc2VydGlvbnMgdG8gYmUgZGVmaW5lZCwgYnV0IGV4cGVjdCgpIHdhcyBcIiArXG5cdFx0XHRcdFwibm90IGNhbGxlZC5cIiwgdGhpcy5zdGFjayApO1xuXHRcdH0gZWxzZSBpZiAoIHRoaXMuZXhwZWN0ZWQgIT09IG51bGwgJiYgdGhpcy5leHBlY3RlZCAhPT0gdGhpcy5hc3NlcnRpb25zLmxlbmd0aCApIHtcblx0XHRcdHRoaXMucHVzaEZhaWx1cmUoIFwiRXhwZWN0ZWQgXCIgKyB0aGlzLmV4cGVjdGVkICsgXCIgYXNzZXJ0aW9ucywgYnV0IFwiICtcblx0XHRcdFx0dGhpcy5hc3NlcnRpb25zLmxlbmd0aCArIFwiIHdlcmUgcnVuXCIsIHRoaXMuc3RhY2sgKTtcblx0XHR9IGVsc2UgaWYgKCB0aGlzLmV4cGVjdGVkID09PSBudWxsICYmICF0aGlzLmFzc2VydGlvbnMubGVuZ3RoICkge1xuXHRcdFx0dGhpcy5wdXNoRmFpbHVyZSggXCJFeHBlY3RlZCBhdCBsZWFzdCBvbmUgYXNzZXJ0aW9uLCBidXQgbm9uZSB3ZXJlIHJ1biAtIGNhbGwgXCIgK1xuXHRcdFx0XHRcImV4cGVjdCgwKSB0byBhY2NlcHQgemVybyBhc3NlcnRpb25zLlwiLCB0aGlzLnN0YWNrICk7XG5cdFx0fVxuXG5cdFx0dmFyIGksXG5cdFx0XHRiYWQgPSAwO1xuXG5cdFx0dGhpcy5ydW50aW1lID0gbm93KCkgLSB0aGlzLnN0YXJ0ZWQ7XG5cdFx0Y29uZmlnLnN0YXRzLmFsbCArPSB0aGlzLmFzc2VydGlvbnMubGVuZ3RoO1xuXHRcdGNvbmZpZy5tb2R1bGVTdGF0cy5hbGwgKz0gdGhpcy5hc3NlcnRpb25zLmxlbmd0aDtcblxuXHRcdGZvciAoIGkgPSAwOyBpIDwgdGhpcy5hc3NlcnRpb25zLmxlbmd0aDsgaSsrICkge1xuXHRcdFx0aWYgKCAhdGhpcy5hc3NlcnRpb25zWyBpIF0ucmVzdWx0ICkge1xuXHRcdFx0XHRiYWQrKztcblx0XHRcdFx0Y29uZmlnLnN0YXRzLmJhZCsrO1xuXHRcdFx0XHRjb25maWcubW9kdWxlU3RhdHMuYmFkKys7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cnVuTG9nZ2luZ0NhbGxiYWNrcyggXCJ0ZXN0RG9uZVwiLCB7XG5cdFx0XHRuYW1lOiB0aGlzLnRlc3ROYW1lLFxuXHRcdFx0bW9kdWxlOiB0aGlzLm1vZHVsZS5uYW1lLFxuXHRcdFx0c2tpcHBlZDogISF0aGlzLnNraXAsXG5cdFx0XHRmYWlsZWQ6IGJhZCxcblx0XHRcdHBhc3NlZDogdGhpcy5hc3NlcnRpb25zLmxlbmd0aCAtIGJhZCxcblx0XHRcdHRvdGFsOiB0aGlzLmFzc2VydGlvbnMubGVuZ3RoLFxuXHRcdFx0cnVudGltZTogdGhpcy5ydW50aW1lLFxuXG5cdFx0XHQvLyBIVE1MIFJlcG9ydGVyIHVzZVxuXHRcdFx0YXNzZXJ0aW9uczogdGhpcy5hc3NlcnRpb25zLFxuXHRcdFx0dGVzdElkOiB0aGlzLnRlc3RJZCxcblxuXHRcdFx0Ly8gU291cmNlIG9mIFRlc3Rcblx0XHRcdHNvdXJjZTogdGhpcy5zdGFjayxcblxuXHRcdFx0Ly8gREVQUkVDQVRFRDogdGhpcyBwcm9wZXJ0eSB3aWxsIGJlIHJlbW92ZWQgaW4gMi4wLjAsIHVzZSBydW50aW1lIGluc3RlYWRcblx0XHRcdGR1cmF0aW9uOiB0aGlzLnJ1bnRpbWVcblx0XHR9KTtcblxuXHRcdC8vIFFVbml0LnJlc2V0KCkgaXMgZGVwcmVjYXRlZCBhbmQgd2lsbCBiZSByZXBsYWNlZCBmb3IgYSBuZXdcblx0XHQvLyBmaXh0dXJlIHJlc2V0IGZ1bmN0aW9uIG9uIFFVbml0IDIuMC8yLjEuXG5cdFx0Ly8gSXQncyBzdGlsbCBjYWxsZWQgaGVyZSBmb3IgYmFja3dhcmRzIGNvbXBhdGliaWxpdHkgaGFuZGxpbmdcblx0XHRRVW5pdC5yZXNldCgpO1xuXG5cdFx0Y29uZmlnLmN1cnJlbnQgPSB1bmRlZmluZWQ7XG5cdH0sXG5cblx0cXVldWU6IGZ1bmN0aW9uKCkge1xuXHRcdHZhciBwcmlvcml0eSxcblx0XHRcdHRlc3QgPSB0aGlzO1xuXG5cdFx0aWYgKCAhdGhpcy52YWxpZCgpICkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHJ1bigpIHtcblxuXHRcdFx0Ly8gZWFjaCBvZiB0aGVzZSBjYW4gYnkgYXN5bmNcblx0XHRcdHN5bmNocm9uaXplKFtcblx0XHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0dGVzdC5iZWZvcmUoKTtcblx0XHRcdFx0fSxcblxuXHRcdFx0XHR0ZXN0Lmhvb2tzKCBcImJlZm9yZUVhY2hcIiApLFxuXHRcdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0XHR0ZXN0LnJ1bigpO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdHRlc3QuaG9va3MoIFwiYWZ0ZXJFYWNoXCIgKS5yZXZlcnNlKCksXG5cblx0XHRcdFx0ZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0dGVzdC5hZnRlcigpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRmdW5jdGlvbigpIHtcblx0XHRcdFx0XHR0ZXN0LmZpbmlzaCgpO1xuXHRcdFx0XHR9XG5cdFx0XHRdKTtcblx0XHR9XG5cblx0XHQvLyBQcmlvcml0aXplIHByZXZpb3VzbHkgZmFpbGVkIHRlc3RzLCBkZXRlY3RlZCBmcm9tIHNlc3Npb25TdG9yYWdlXG5cdFx0cHJpb3JpdHkgPSBRVW5pdC5jb25maWcucmVvcmRlciAmJiBkZWZpbmVkLnNlc3Npb25TdG9yYWdlICYmXG5cdFx0XHRcdCtzZXNzaW9uU3RvcmFnZS5nZXRJdGVtKCBcInF1bml0LXRlc3QtXCIgKyB0aGlzLm1vZHVsZS5uYW1lICsgXCItXCIgKyB0aGlzLnRlc3ROYW1lICk7XG5cblx0XHRyZXR1cm4gc3luY2hyb25pemUoIHJ1biwgcHJpb3JpdHkgKTtcblx0fSxcblxuXHRwdXNoOiBmdW5jdGlvbiggcmVzdWx0LCBhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCBuZWdhdGl2ZSApIHtcblx0XHR2YXIgc291cmNlLFxuXHRcdFx0ZGV0YWlscyA9IHtcblx0XHRcdFx0bW9kdWxlOiB0aGlzLm1vZHVsZS5uYW1lLFxuXHRcdFx0XHRuYW1lOiB0aGlzLnRlc3ROYW1lLFxuXHRcdFx0XHRyZXN1bHQ6IHJlc3VsdCxcblx0XHRcdFx0bWVzc2FnZTogbWVzc2FnZSxcblx0XHRcdFx0YWN0dWFsOiBhY3R1YWwsXG5cdFx0XHRcdGV4cGVjdGVkOiBleHBlY3RlZCxcblx0XHRcdFx0dGVzdElkOiB0aGlzLnRlc3RJZCxcblx0XHRcdFx0bmVnYXRpdmU6IG5lZ2F0aXZlIHx8IGZhbHNlLFxuXHRcdFx0XHRydW50aW1lOiBub3coKSAtIHRoaXMuc3RhcnRlZFxuXHRcdFx0fTtcblxuXHRcdGlmICggIXJlc3VsdCApIHtcblx0XHRcdHNvdXJjZSA9IHNvdXJjZUZyb21TdGFja3RyYWNlKCk7XG5cblx0XHRcdGlmICggc291cmNlICkge1xuXHRcdFx0XHRkZXRhaWxzLnNvdXJjZSA9IHNvdXJjZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRydW5Mb2dnaW5nQ2FsbGJhY2tzKCBcImxvZ1wiLCBkZXRhaWxzICk7XG5cblx0XHR0aGlzLmFzc2VydGlvbnMucHVzaCh7XG5cdFx0XHRyZXN1bHQ6ICEhcmVzdWx0LFxuXHRcdFx0bWVzc2FnZTogbWVzc2FnZVxuXHRcdH0pO1xuXHR9LFxuXG5cdHB1c2hGYWlsdXJlOiBmdW5jdGlvbiggbWVzc2FnZSwgc291cmNlLCBhY3R1YWwgKSB7XG5cdFx0aWYgKCAhKCB0aGlzIGluc3RhbmNlb2YgVGVzdCApICkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCBcInB1c2hGYWlsdXJlKCkgYXNzZXJ0aW9uIG91dHNpZGUgdGVzdCBjb250ZXh0LCB3YXMgXCIgK1xuXHRcdFx0XHRzb3VyY2VGcm9tU3RhY2t0cmFjZSggMiApICk7XG5cdFx0fVxuXG5cdFx0dmFyIGRldGFpbHMgPSB7XG5cdFx0XHRcdG1vZHVsZTogdGhpcy5tb2R1bGUubmFtZSxcblx0XHRcdFx0bmFtZTogdGhpcy50ZXN0TmFtZSxcblx0XHRcdFx0cmVzdWx0OiBmYWxzZSxcblx0XHRcdFx0bWVzc2FnZTogbWVzc2FnZSB8fCBcImVycm9yXCIsXG5cdFx0XHRcdGFjdHVhbDogYWN0dWFsIHx8IG51bGwsXG5cdFx0XHRcdHRlc3RJZDogdGhpcy50ZXN0SWQsXG5cdFx0XHRcdHJ1bnRpbWU6IG5vdygpIC0gdGhpcy5zdGFydGVkXG5cdFx0XHR9O1xuXG5cdFx0aWYgKCBzb3VyY2UgKSB7XG5cdFx0XHRkZXRhaWxzLnNvdXJjZSA9IHNvdXJjZTtcblx0XHR9XG5cblx0XHRydW5Mb2dnaW5nQ2FsbGJhY2tzKCBcImxvZ1wiLCBkZXRhaWxzICk7XG5cblx0XHR0aGlzLmFzc2VydGlvbnMucHVzaCh7XG5cdFx0XHRyZXN1bHQ6IGZhbHNlLFxuXHRcdFx0bWVzc2FnZTogbWVzc2FnZVxuXHRcdH0pO1xuXHR9LFxuXG5cdHJlc29sdmVQcm9taXNlOiBmdW5jdGlvbiggcHJvbWlzZSwgcGhhc2UgKSB7XG5cdFx0dmFyIHRoZW4sIG1lc3NhZ2UsXG5cdFx0XHR0ZXN0ID0gdGhpcztcblx0XHRpZiAoIHByb21pc2UgIT0gbnVsbCApIHtcblx0XHRcdHRoZW4gPSBwcm9taXNlLnRoZW47XG5cdFx0XHRpZiAoIFFVbml0Lm9iamVjdFR5cGUoIHRoZW4gKSA9PT0gXCJmdW5jdGlvblwiICkge1xuXHRcdFx0XHRRVW5pdC5zdG9wKCk7XG5cdFx0XHRcdHRoZW4uY2FsbChcblx0XHRcdFx0XHRwcm9taXNlLFxuXHRcdFx0XHRcdGZ1bmN0aW9uKCkgeyBRVW5pdC5zdGFydCgpOyB9LFxuXHRcdFx0XHRcdGZ1bmN0aW9uKCBlcnJvciApIHtcblx0XHRcdFx0XHRcdG1lc3NhZ2UgPSBcIlByb21pc2UgcmVqZWN0ZWQgXCIgK1xuXHRcdFx0XHRcdFx0XHQoICFwaGFzZSA/IFwiZHVyaW5nXCIgOiBwaGFzZS5yZXBsYWNlKCAvRWFjaCQvLCBcIlwiICkgKSArXG5cdFx0XHRcdFx0XHRcdFwiIFwiICsgdGVzdC50ZXN0TmFtZSArIFwiOiBcIiArICggZXJyb3IubWVzc2FnZSB8fCBlcnJvciApO1xuXHRcdFx0XHRcdFx0dGVzdC5wdXNoRmFpbHVyZSggbWVzc2FnZSwgZXh0cmFjdFN0YWNrdHJhY2UoIGVycm9yLCAwICkgKTtcblxuXHRcdFx0XHRcdFx0Ly8gZWxzZSBuZXh0IHRlc3Qgd2lsbCBjYXJyeSB0aGUgcmVzcG9uc2liaWxpdHlcblx0XHRcdFx0XHRcdHNhdmVHbG9iYWwoKTtcblxuXHRcdFx0XHRcdFx0Ly8gVW5ibG9ja1xuXHRcdFx0XHRcdFx0UVVuaXQuc3RhcnQoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9LFxuXG5cdHZhbGlkOiBmdW5jdGlvbigpIHtcblx0XHR2YXIgaW5jbHVkZSxcblx0XHRcdGZpbHRlciA9IGNvbmZpZy5maWx0ZXIgJiYgY29uZmlnLmZpbHRlci50b0xvd2VyQ2FzZSgpLFxuXHRcdFx0bW9kdWxlID0gUVVuaXQudXJsUGFyYW1zLm1vZHVsZSAmJiBRVW5pdC51cmxQYXJhbXMubW9kdWxlLnRvTG93ZXJDYXNlKCksXG5cdFx0XHRmdWxsTmFtZSA9ICggdGhpcy5tb2R1bGUubmFtZSArIFwiOiBcIiArIHRoaXMudGVzdE5hbWUgKS50b0xvd2VyQ2FzZSgpO1xuXG5cdFx0ZnVuY3Rpb24gdGVzdEluTW9kdWxlQ2hhaW4oIHRlc3RNb2R1bGUgKSB7XG5cdFx0XHR2YXIgdGVzdE1vZHVsZU5hbWUgPSB0ZXN0TW9kdWxlLm5hbWUgPyB0ZXN0TW9kdWxlLm5hbWUudG9Mb3dlckNhc2UoKSA6IG51bGw7XG5cdFx0XHRpZiAoIHRlc3RNb2R1bGVOYW1lID09PSBtb2R1bGUgKSB7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSBlbHNlIGlmICggdGVzdE1vZHVsZS5wYXJlbnRNb2R1bGUgKSB7XG5cdFx0XHRcdHJldHVybiB0ZXN0SW5Nb2R1bGVDaGFpbiggdGVzdE1vZHVsZS5wYXJlbnRNb2R1bGUgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBJbnRlcm5hbGx5LWdlbmVyYXRlZCB0ZXN0cyBhcmUgYWx3YXlzIHZhbGlkXG5cdFx0aWYgKCB0aGlzLmNhbGxiYWNrICYmIHRoaXMuY2FsbGJhY2sudmFsaWRUZXN0ICkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKCBjb25maWcudGVzdElkLmxlbmd0aCA+IDAgJiYgaW5BcnJheSggdGhpcy50ZXN0SWQsIGNvbmZpZy50ZXN0SWQgKSA8IDAgKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0aWYgKCBtb2R1bGUgJiYgIXRlc3RJbk1vZHVsZUNoYWluKCB0aGlzLm1vZHVsZSApICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdGlmICggIWZpbHRlciApIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdGluY2x1ZGUgPSBmaWx0ZXIuY2hhckF0KCAwICkgIT09IFwiIVwiO1xuXHRcdGlmICggIWluY2x1ZGUgKSB7XG5cdFx0XHRmaWx0ZXIgPSBmaWx0ZXIuc2xpY2UoIDEgKTtcblx0XHR9XG5cblx0XHQvLyBJZiB0aGUgZmlsdGVyIG1hdGNoZXMsIHdlIG5lZWQgdG8gaG9ub3VyIGluY2x1ZGVcblx0XHRpZiAoIGZ1bGxOYW1lLmluZGV4T2YoIGZpbHRlciApICE9PSAtMSApIHtcblx0XHRcdHJldHVybiBpbmNsdWRlO1xuXHRcdH1cblxuXHRcdC8vIE90aGVyd2lzZSwgZG8gdGhlIG9wcG9zaXRlXG5cdFx0cmV0dXJuICFpbmNsdWRlO1xuXHR9XG59O1xuXG4vLyBSZXNldHMgdGhlIHRlc3Qgc2V0dXAuIFVzZWZ1bCBmb3IgdGVzdHMgdGhhdCBtb2RpZnkgdGhlIERPTS5cbi8qXG5ERVBSRUNBVEVEOiBVc2UgbXVsdGlwbGUgdGVzdHMgaW5zdGVhZCBvZiByZXNldHRpbmcgaW5zaWRlIGEgdGVzdC5cblVzZSB0ZXN0U3RhcnQgb3IgdGVzdERvbmUgZm9yIGN1c3RvbSBjbGVhbnVwLlxuVGhpcyBtZXRob2Qgd2lsbCB0aHJvdyBhbiBlcnJvciBpbiAyLjAsIGFuZCB3aWxsIGJlIHJlbW92ZWQgaW4gMi4xXG4qL1xuUVVuaXQucmVzZXQgPSBmdW5jdGlvbigpIHtcblxuXHQvLyBSZXR1cm4gb24gbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRzXG5cdC8vIFRoaXMgaXMgbmVjZXNzYXJ5IHRvIG5vdCBicmVhayBvbiBub2RlIHRlc3RzXG5cdGlmICggIWRlZmluZWQuZG9jdW1lbnQgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dmFyIGZpeHR1cmUgPSBkZWZpbmVkLmRvY3VtZW50ICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkICYmXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCggXCJxdW5pdC1maXh0dXJlXCIgKTtcblxuXHRpZiAoIGZpeHR1cmUgKSB7XG5cdFx0Zml4dHVyZS5pbm5lckhUTUwgPSBjb25maWcuZml4dHVyZTtcblx0fVxufTtcblxuUVVuaXQucHVzaEZhaWx1cmUgPSBmdW5jdGlvbigpIHtcblx0aWYgKCAhUVVuaXQuY29uZmlnLmN1cnJlbnQgKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBcInB1c2hGYWlsdXJlKCkgYXNzZXJ0aW9uIG91dHNpZGUgdGVzdCBjb250ZXh0LCBpbiBcIiArXG5cdFx0XHRzb3VyY2VGcm9tU3RhY2t0cmFjZSggMiApICk7XG5cdH1cblxuXHQvLyBHZXRzIGN1cnJlbnQgdGVzdCBvYmpcblx0dmFyIGN1cnJlbnRUZXN0ID0gUVVuaXQuY29uZmlnLmN1cnJlbnQ7XG5cblx0cmV0dXJuIGN1cnJlbnRUZXN0LnB1c2hGYWlsdXJlLmFwcGx5KCBjdXJyZW50VGVzdCwgYXJndW1lbnRzICk7XG59O1xuXG4vLyBCYXNlZCBvbiBKYXZhJ3MgU3RyaW5nLmhhc2hDb2RlLCBhIHNpbXBsZSBidXQgbm90XG4vLyByaWdvcm91c2x5IGNvbGxpc2lvbiByZXNpc3RhbnQgaGFzaGluZyBmdW5jdGlvblxuZnVuY3Rpb24gZ2VuZXJhdGVIYXNoKCBtb2R1bGUsIHRlc3ROYW1lICkge1xuXHR2YXIgaGV4LFxuXHRcdGkgPSAwLFxuXHRcdGhhc2ggPSAwLFxuXHRcdHN0ciA9IG1vZHVsZSArIFwiXFx4MUNcIiArIHRlc3ROYW1lLFxuXHRcdGxlbiA9IHN0ci5sZW5ndGg7XG5cblx0Zm9yICggOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0aGFzaCAgPSAoICggaGFzaCA8PCA1ICkgLSBoYXNoICkgKyBzdHIuY2hhckNvZGVBdCggaSApO1xuXHRcdGhhc2ggfD0gMDtcblx0fVxuXG5cdC8vIENvbnZlcnQgdGhlIHBvc3NpYmx5IG5lZ2F0aXZlIGludGVnZXIgaGFzaCBjb2RlIGludG8gYW4gOCBjaGFyYWN0ZXIgaGV4IHN0cmluZywgd2hpY2ggaXNuJ3Rcblx0Ly8gc3RyaWN0bHkgbmVjZXNzYXJ5IGJ1dCBpbmNyZWFzZXMgdXNlciB1bmRlcnN0YW5kaW5nIHRoYXQgdGhlIGlkIGlzIGEgU0hBLWxpa2UgaGFzaFxuXHRoZXggPSAoIDB4MTAwMDAwMDAwICsgaGFzaCApLnRvU3RyaW5nKCAxNiApO1xuXHRpZiAoIGhleC5sZW5ndGggPCA4ICkge1xuXHRcdGhleCA9IFwiMDAwMDAwMFwiICsgaGV4O1xuXHR9XG5cblx0cmV0dXJuIGhleC5zbGljZSggLTggKTtcbn1cblxuZnVuY3Rpb24gc3luY2hyb25pemUoIGNhbGxiYWNrLCBwcmlvcml0eSApIHtcblx0dmFyIGxhc3QgPSAhcHJpb3JpdHk7XG5cblx0aWYgKCBRVW5pdC5vYmplY3RUeXBlKCBjYWxsYmFjayApID09PSBcImFycmF5XCIgKSB7XG5cdFx0d2hpbGUgKCBjYWxsYmFjay5sZW5ndGggKSB7XG5cdFx0XHRzeW5jaHJvbml6ZSggY2FsbGJhY2suc2hpZnQoKSApO1xuXHRcdH1cblx0XHRyZXR1cm47XG5cdH1cblxuXHRpZiAoIHByaW9yaXR5ICkge1xuXHRcdHByaW9yaXR5RmlsbCggY2FsbGJhY2sgKTtcblx0fSBlbHNlIHtcblx0XHRjb25maWcucXVldWUucHVzaCggY2FsbGJhY2sgKTtcblx0fVxuXG5cdGlmICggY29uZmlnLmF1dG9ydW4gJiYgIWNvbmZpZy5ibG9ja2luZyApIHtcblx0XHRwcm9jZXNzKCBsYXN0ICk7XG5cdH1cbn1cblxuLy8gUGxhY2UgcHJldmlvdXNseSBmYWlsZWQgdGVzdHMgb24gYSBxdWV1ZSBwcmlvcml0eSBsaW5lLCByZXNwZWN0aW5nIHRoZSBvcmRlciB0aGV5IGdldCBhc3NpZ25lZC5cbmZ1bmN0aW9uIHByaW9yaXR5RmlsbCggY2FsbGJhY2sgKSB7XG5cdHZhciBxdWV1ZSwgcHJpb3JpdGl6ZWRRdWV1ZTtcblxuXHRxdWV1ZSA9IGNvbmZpZy5xdWV1ZS5zbGljZSggcHJpb3JpdHlGaWxsLnBvcyApO1xuXHRwcmlvcml0aXplZFF1ZXVlID0gY29uZmlnLnF1ZXVlLnNsaWNlKCAwLCAtY29uZmlnLnF1ZXVlLmxlbmd0aCArIHByaW9yaXR5RmlsbC5wb3MgKTtcblxuXHRxdWV1ZS51bnNoaWZ0KCBjYWxsYmFjayApO1xuXHRxdWV1ZS51bnNoaWZ0LmFwcGx5KCBxdWV1ZSwgcHJpb3JpdGl6ZWRRdWV1ZSApO1xuXG5cdGNvbmZpZy5xdWV1ZSA9IHF1ZXVlO1xuXG5cdHByaW9yaXR5RmlsbC5wb3MgKz0gMTtcbn1cbnByaW9yaXR5RmlsbC5wb3MgPSAwO1xuXG5mdW5jdGlvbiBzYXZlR2xvYmFsKCkge1xuXHRjb25maWcucG9sbHV0aW9uID0gW107XG5cblx0aWYgKCBjb25maWcubm9nbG9iYWxzICkge1xuXHRcdGZvciAoIHZhciBrZXkgaW4gZ2xvYmFsICkge1xuXHRcdFx0aWYgKCBoYXNPd24uY2FsbCggZ2xvYmFsLCBrZXkgKSApIHtcblxuXHRcdFx0XHQvLyBpbiBPcGVyYSBzb21ldGltZXMgRE9NIGVsZW1lbnQgaWRzIHNob3cgdXAgaGVyZSwgaWdub3JlIHRoZW1cblx0XHRcdFx0aWYgKCAvXnF1bml0LXRlc3Qtb3V0cHV0Ly50ZXN0KCBrZXkgKSApIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRjb25maWcucG9sbHV0aW9uLnB1c2goIGtleSApO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBjaGVja1BvbGx1dGlvbigpIHtcblx0dmFyIG5ld0dsb2JhbHMsXG5cdFx0ZGVsZXRlZEdsb2JhbHMsXG5cdFx0b2xkID0gY29uZmlnLnBvbGx1dGlvbjtcblxuXHRzYXZlR2xvYmFsKCk7XG5cblx0bmV3R2xvYmFscyA9IGRpZmYoIGNvbmZpZy5wb2xsdXRpb24sIG9sZCApO1xuXHRpZiAoIG5ld0dsb2JhbHMubGVuZ3RoID4gMCApIHtcblx0XHRRVW5pdC5wdXNoRmFpbHVyZSggXCJJbnRyb2R1Y2VkIGdsb2JhbCB2YXJpYWJsZShzKTogXCIgKyBuZXdHbG9iYWxzLmpvaW4oIFwiLCBcIiApICk7XG5cdH1cblxuXHRkZWxldGVkR2xvYmFscyA9IGRpZmYoIG9sZCwgY29uZmlnLnBvbGx1dGlvbiApO1xuXHRpZiAoIGRlbGV0ZWRHbG9iYWxzLmxlbmd0aCA+IDAgKSB7XG5cdFx0UVVuaXQucHVzaEZhaWx1cmUoIFwiRGVsZXRlZCBnbG9iYWwgdmFyaWFibGUocyk6IFwiICsgZGVsZXRlZEdsb2JhbHMuam9pbiggXCIsIFwiICkgKTtcblx0fVxufVxuXG4vLyBXaWxsIGJlIGV4cG9zZWQgYXMgUVVuaXQuYXN5bmNUZXN0XG5mdW5jdGlvbiBhc3luY1Rlc3QoIHRlc3ROYW1lLCBleHBlY3RlZCwgY2FsbGJhY2sgKSB7XG5cdGlmICggYXJndW1lbnRzLmxlbmd0aCA9PT0gMiApIHtcblx0XHRjYWxsYmFjayA9IGV4cGVjdGVkO1xuXHRcdGV4cGVjdGVkID0gbnVsbDtcblx0fVxuXG5cdFFVbml0LnRlc3QoIHRlc3ROYW1lLCBleHBlY3RlZCwgY2FsbGJhY2ssIHRydWUgKTtcbn1cblxuLy8gV2lsbCBiZSBleHBvc2VkIGFzIFFVbml0LnRlc3RcbmZ1bmN0aW9uIHRlc3QoIHRlc3ROYW1lLCBleHBlY3RlZCwgY2FsbGJhY2ssIGFzeW5jICkge1xuXHRpZiAoIGZvY3VzZWQgKSAgeyByZXR1cm47IH1cblxuXHR2YXIgbmV3VGVzdDtcblxuXHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggPT09IDIgKSB7XG5cdFx0Y2FsbGJhY2sgPSBleHBlY3RlZDtcblx0XHRleHBlY3RlZCA9IG51bGw7XG5cdH1cblxuXHRuZXdUZXN0ID0gbmV3IFRlc3Qoe1xuXHRcdHRlc3ROYW1lOiB0ZXN0TmFtZSxcblx0XHRleHBlY3RlZDogZXhwZWN0ZWQsXG5cdFx0YXN5bmM6IGFzeW5jLFxuXHRcdGNhbGxiYWNrOiBjYWxsYmFja1xuXHR9KTtcblxuXHRuZXdUZXN0LnF1ZXVlKCk7XG59XG5cbi8vIFdpbGwgYmUgZXhwb3NlZCBhcyBRVW5pdC5za2lwXG5mdW5jdGlvbiBza2lwKCB0ZXN0TmFtZSApIHtcblx0aWYgKCBmb2N1c2VkICkgIHsgcmV0dXJuOyB9XG5cblx0dmFyIHRlc3QgPSBuZXcgVGVzdCh7XG5cdFx0dGVzdE5hbWU6IHRlc3ROYW1lLFxuXHRcdHNraXA6IHRydWVcblx0fSk7XG5cblx0dGVzdC5xdWV1ZSgpO1xufVxuXG4vLyBXaWxsIGJlIGV4cG9zZWQgYXMgUVVuaXQub25seVxuZnVuY3Rpb24gb25seSggdGVzdE5hbWUsIGV4cGVjdGVkLCBjYWxsYmFjaywgYXN5bmMgKSB7XG5cdHZhciBuZXdUZXN0O1xuXG5cdGlmICggZm9jdXNlZCApICB7IHJldHVybjsgfVxuXG5cdFFVbml0LmNvbmZpZy5xdWV1ZS5sZW5ndGggPSAwO1xuXHRmb2N1c2VkID0gdHJ1ZTtcblxuXHRpZiAoIGFyZ3VtZW50cy5sZW5ndGggPT09IDIgKSB7XG5cdFx0Y2FsbGJhY2sgPSBleHBlY3RlZDtcblx0XHRleHBlY3RlZCA9IG51bGw7XG5cdH1cblxuXHRuZXdUZXN0ID0gbmV3IFRlc3Qoe1xuXHRcdHRlc3ROYW1lOiB0ZXN0TmFtZSxcblx0XHRleHBlY3RlZDogZXhwZWN0ZWQsXG5cdFx0YXN5bmM6IGFzeW5jLFxuXHRcdGNhbGxiYWNrOiBjYWxsYmFja1xuXHR9KTtcblxuXHRuZXdUZXN0LnF1ZXVlKCk7XG59XG5cbmZ1bmN0aW9uIEFzc2VydCggdGVzdENvbnRleHQgKSB7XG5cdHRoaXMudGVzdCA9IHRlc3RDb250ZXh0O1xufVxuXG4vLyBBc3NlcnQgaGVscGVyc1xuUVVuaXQuYXNzZXJ0ID0gQXNzZXJ0LnByb3RvdHlwZSA9IHtcblxuXHQvLyBTcGVjaWZ5IHRoZSBudW1iZXIgb2YgZXhwZWN0ZWQgYXNzZXJ0aW9ucyB0byBndWFyYW50ZWUgdGhhdCBmYWlsZWQgdGVzdFxuXHQvLyAobm8gYXNzZXJ0aW9ucyBhcmUgcnVuIGF0IGFsbCkgZG9uJ3Qgc2xpcCB0aHJvdWdoLlxuXHRleHBlY3Q6IGZ1bmN0aW9uKCBhc3NlcnRzICkge1xuXHRcdGlmICggYXJndW1lbnRzLmxlbmd0aCA9PT0gMSApIHtcblx0XHRcdHRoaXMudGVzdC5leHBlY3RlZCA9IGFzc2VydHM7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB0aGlzLnRlc3QuZXhwZWN0ZWQ7XG5cdFx0fVxuXHR9LFxuXG5cdC8vIEluY3JlbWVudCB0aGlzIFRlc3QncyBzZW1hcGhvcmUgY291bnRlciwgdGhlbiByZXR1cm4gYSBmdW5jdGlvbiB0aGF0XG5cdC8vIGRlY3JlbWVudHMgdGhhdCBjb3VudGVyIGEgbWF4aW11bSBvZiBvbmNlLlxuXHRhc3luYzogZnVuY3Rpb24oIGNvdW50ICkge1xuXHRcdHZhciB0ZXN0ID0gdGhpcy50ZXN0LFxuXHRcdFx0cG9wcGVkID0gZmFsc2UsXG5cdFx0XHRhY2NlcHRDYWxsQ291bnQgPSBjb3VudDtcblxuXHRcdGlmICggdHlwZW9mIGFjY2VwdENhbGxDb3VudCA9PT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRcdGFjY2VwdENhbGxDb3VudCA9IDE7XG5cdFx0fVxuXG5cdFx0dGVzdC5zZW1hcGhvcmUgKz0gMTtcblx0XHR0ZXN0LnVzZWRBc3luYyA9IHRydWU7XG5cdFx0cGF1c2VQcm9jZXNzaW5nKCk7XG5cblx0XHRyZXR1cm4gZnVuY3Rpb24gZG9uZSgpIHtcblxuXHRcdFx0aWYgKCBwb3BwZWQgKSB7XG5cdFx0XHRcdHRlc3QucHVzaEZhaWx1cmUoIFwiVG9vIG1hbnkgY2FsbHMgdG8gdGhlIGBhc3NlcnQuYXN5bmNgIGNhbGxiYWNrXCIsXG5cdFx0XHRcdFx0c291cmNlRnJvbVN0YWNrdHJhY2UoIDIgKSApO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRhY2NlcHRDYWxsQ291bnQgLT0gMTtcblx0XHRcdGlmICggYWNjZXB0Q2FsbENvdW50ID4gMCApIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR0ZXN0LnNlbWFwaG9yZSAtPSAxO1xuXHRcdFx0cG9wcGVkID0gdHJ1ZTtcblx0XHRcdHJlc3VtZVByb2Nlc3NpbmcoKTtcblx0XHR9O1xuXHR9LFxuXG5cdC8vIEV4cG9ydHMgdGVzdC5wdXNoKCkgdG8gdGhlIHVzZXIgQVBJXG5cdHB1c2g6IGZ1bmN0aW9uKCAvKiByZXN1bHQsIGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsIG5lZ2F0aXZlICovICkge1xuXHRcdHZhciBhc3NlcnQgPSB0aGlzLFxuXHRcdFx0Y3VycmVudFRlc3QgPSAoIGFzc2VydCBpbnN0YW5jZW9mIEFzc2VydCAmJiBhc3NlcnQudGVzdCApIHx8IFFVbml0LmNvbmZpZy5jdXJyZW50O1xuXG5cdFx0Ly8gQmFja3dhcmRzIGNvbXBhdGliaWxpdHkgZml4LlxuXHRcdC8vIEFsbG93cyB0aGUgZGlyZWN0IHVzZSBvZiBnbG9iYWwgZXhwb3J0ZWQgYXNzZXJ0aW9ucyBhbmQgUVVuaXQuYXNzZXJ0Lipcblx0XHQvLyBBbHRob3VnaCwgaXQncyB1c2UgaXMgbm90IHJlY29tbWVuZGVkIGFzIGl0IGNhbiBsZWFrIGFzc2VydGlvbnNcblx0XHQvLyB0byBvdGhlciB0ZXN0cyBmcm9tIGFzeW5jIHRlc3RzLCBiZWNhdXNlIHdlIG9ubHkgZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50IHRlc3QsXG5cdFx0Ly8gbm90IGV4YWN0bHkgdGhlIHRlc3Qgd2hlcmUgYXNzZXJ0aW9uIHdlcmUgaW50ZW5kZWQgdG8gYmUgY2FsbGVkLlxuXHRcdGlmICggIWN1cnJlbnRUZXN0ICkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCBcImFzc2VydGlvbiBvdXRzaWRlIHRlc3QgY29udGV4dCwgaW4gXCIgKyBzb3VyY2VGcm9tU3RhY2t0cmFjZSggMiApICk7XG5cdFx0fVxuXG5cdFx0aWYgKCBjdXJyZW50VGVzdC51c2VkQXN5bmMgPT09IHRydWUgJiYgY3VycmVudFRlc3Quc2VtYXBob3JlID09PSAwICkge1xuXHRcdFx0Y3VycmVudFRlc3QucHVzaEZhaWx1cmUoIFwiQXNzZXJ0aW9uIGFmdGVyIHRoZSBmaW5hbCBgYXNzZXJ0LmFzeW5jYCB3YXMgcmVzb2x2ZWRcIixcblx0XHRcdFx0c291cmNlRnJvbVN0YWNrdHJhY2UoIDIgKSApO1xuXG5cdFx0XHQvLyBBbGxvdyB0aGlzIGFzc2VydGlvbiB0byBjb250aW51ZSBydW5uaW5nIGFueXdheS4uLlxuXHRcdH1cblxuXHRcdGlmICggISggYXNzZXJ0IGluc3RhbmNlb2YgQXNzZXJ0ICkgKSB7XG5cdFx0XHRhc3NlcnQgPSBjdXJyZW50VGVzdC5hc3NlcnQ7XG5cdFx0fVxuXHRcdHJldHVybiBhc3NlcnQudGVzdC5wdXNoLmFwcGx5KCBhc3NlcnQudGVzdCwgYXJndW1lbnRzICk7XG5cdH0sXG5cblx0b2s6IGZ1bmN0aW9uKCByZXN1bHQsIG1lc3NhZ2UgKSB7XG5cdFx0bWVzc2FnZSA9IG1lc3NhZ2UgfHwgKCByZXN1bHQgPyBcIm9rYXlcIiA6IFwiZmFpbGVkLCBleHBlY3RlZCBhcmd1bWVudCB0byBiZSB0cnV0aHksIHdhczogXCIgK1xuXHRcdFx0UVVuaXQuZHVtcC5wYXJzZSggcmVzdWx0ICkgKTtcblx0XHR0aGlzLnB1c2goICEhcmVzdWx0LCByZXN1bHQsIHRydWUsIG1lc3NhZ2UgKTtcblx0fSxcblxuXHRub3RPazogZnVuY3Rpb24oIHJlc3VsdCwgbWVzc2FnZSApIHtcblx0XHRtZXNzYWdlID0gbWVzc2FnZSB8fCAoICFyZXN1bHQgPyBcIm9rYXlcIiA6IFwiZmFpbGVkLCBleHBlY3RlZCBhcmd1bWVudCB0byBiZSBmYWxzeSwgd2FzOiBcIiArXG5cdFx0XHRRVW5pdC5kdW1wLnBhcnNlKCByZXN1bHQgKSApO1xuXHRcdHRoaXMucHVzaCggIXJlc3VsdCwgcmVzdWx0LCBmYWxzZSwgbWVzc2FnZSwgdHJ1ZSApO1xuXHR9LFxuXG5cdGVxdWFsOiBmdW5jdGlvbiggYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSApIHtcblx0XHQvKmpzaGludCBlcWVxZXE6ZmFsc2UgKi9cblx0XHR0aGlzLnB1c2goIGV4cGVjdGVkID09IGFjdHVhbCwgYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSApO1xuXHR9LFxuXG5cdG5vdEVxdWFsOiBmdW5jdGlvbiggYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSApIHtcblx0XHQvKmpzaGludCBlcWVxZXE6ZmFsc2UgKi9cblx0XHR0aGlzLnB1c2goIGV4cGVjdGVkICE9IGFjdHVhbCwgYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgdHJ1ZSApO1xuXHR9LFxuXG5cdHByb3BFcXVhbDogZnVuY3Rpb24oIGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UgKSB7XG5cdFx0YWN0dWFsID0gb2JqZWN0VmFsdWVzKCBhY3R1YWwgKTtcblx0XHRleHBlY3RlZCA9IG9iamVjdFZhbHVlcyggZXhwZWN0ZWQgKTtcblx0XHR0aGlzLnB1c2goIFFVbml0LmVxdWl2KCBhY3R1YWwsIGV4cGVjdGVkICksIGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UgKTtcblx0fSxcblxuXHRub3RQcm9wRXF1YWw6IGZ1bmN0aW9uKCBhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlICkge1xuXHRcdGFjdHVhbCA9IG9iamVjdFZhbHVlcyggYWN0dWFsICk7XG5cdFx0ZXhwZWN0ZWQgPSBvYmplY3RWYWx1ZXMoIGV4cGVjdGVkICk7XG5cdFx0dGhpcy5wdXNoKCAhUVVuaXQuZXF1aXYoIGFjdHVhbCwgZXhwZWN0ZWQgKSwgYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSwgdHJ1ZSApO1xuXHR9LFxuXG5cdGRlZXBFcXVhbDogZnVuY3Rpb24oIGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UgKSB7XG5cdFx0dGhpcy5wdXNoKCBRVW5pdC5lcXVpdiggYWN0dWFsLCBleHBlY3RlZCApLCBhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlICk7XG5cdH0sXG5cblx0bm90RGVlcEVxdWFsOiBmdW5jdGlvbiggYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSApIHtcblx0XHR0aGlzLnB1c2goICFRVW5pdC5lcXVpdiggYWN0dWFsLCBleHBlY3RlZCApLCBhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlLCB0cnVlICk7XG5cdH0sXG5cblx0c3RyaWN0RXF1YWw6IGZ1bmN0aW9uKCBhY3R1YWwsIGV4cGVjdGVkLCBtZXNzYWdlICkge1xuXHRcdHRoaXMucHVzaCggZXhwZWN0ZWQgPT09IGFjdHVhbCwgYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSApO1xuXHR9LFxuXG5cdG5vdFN0cmljdEVxdWFsOiBmdW5jdGlvbiggYWN0dWFsLCBleHBlY3RlZCwgbWVzc2FnZSApIHtcblx0XHR0aGlzLnB1c2goIGV4cGVjdGVkICE9PSBhY3R1YWwsIGFjdHVhbCwgZXhwZWN0ZWQsIG1lc3NhZ2UsIHRydWUgKTtcblx0fSxcblxuXHRcInRocm93c1wiOiBmdW5jdGlvbiggYmxvY2ssIGV4cGVjdGVkLCBtZXNzYWdlICkge1xuXHRcdHZhciBhY3R1YWwsIGV4cGVjdGVkVHlwZSxcblx0XHRcdGV4cGVjdGVkT3V0cHV0ID0gZXhwZWN0ZWQsXG5cdFx0XHRvayA9IGZhbHNlLFxuXHRcdFx0Y3VycmVudFRlc3QgPSAoIHRoaXMgaW5zdGFuY2VvZiBBc3NlcnQgJiYgdGhpcy50ZXN0ICkgfHwgUVVuaXQuY29uZmlnLmN1cnJlbnQ7XG5cblx0XHQvLyAnZXhwZWN0ZWQnIGlzIG9wdGlvbmFsIHVubGVzcyBkb2luZyBzdHJpbmcgY29tcGFyaXNvblxuXHRcdGlmICggbWVzc2FnZSA9PSBudWxsICYmIHR5cGVvZiBleHBlY3RlZCA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdG1lc3NhZ2UgPSBleHBlY3RlZDtcblx0XHRcdGV4cGVjdGVkID0gbnVsbDtcblx0XHR9XG5cblx0XHRjdXJyZW50VGVzdC5pZ25vcmVHbG9iYWxFcnJvcnMgPSB0cnVlO1xuXHRcdHRyeSB7XG5cdFx0XHRibG9jay5jYWxsKCBjdXJyZW50VGVzdC50ZXN0RW52aXJvbm1lbnQgKTtcblx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRhY3R1YWwgPSBlO1xuXHRcdH1cblx0XHRjdXJyZW50VGVzdC5pZ25vcmVHbG9iYWxFcnJvcnMgPSBmYWxzZTtcblxuXHRcdGlmICggYWN0dWFsICkge1xuXHRcdFx0ZXhwZWN0ZWRUeXBlID0gUVVuaXQub2JqZWN0VHlwZSggZXhwZWN0ZWQgKTtcblxuXHRcdFx0Ly8gd2UgZG9uJ3Qgd2FudCB0byB2YWxpZGF0ZSB0aHJvd24gZXJyb3Jcblx0XHRcdGlmICggIWV4cGVjdGVkICkge1xuXHRcdFx0XHRvayA9IHRydWU7XG5cdFx0XHRcdGV4cGVjdGVkT3V0cHV0ID0gbnVsbDtcblxuXHRcdFx0Ly8gZXhwZWN0ZWQgaXMgYSByZWdleHBcblx0XHRcdH0gZWxzZSBpZiAoIGV4cGVjdGVkVHlwZSA9PT0gXCJyZWdleHBcIiApIHtcblx0XHRcdFx0b2sgPSBleHBlY3RlZC50ZXN0KCBlcnJvclN0cmluZyggYWN0dWFsICkgKTtcblxuXHRcdFx0Ly8gZXhwZWN0ZWQgaXMgYSBzdHJpbmdcblx0XHRcdH0gZWxzZSBpZiAoIGV4cGVjdGVkVHlwZSA9PT0gXCJzdHJpbmdcIiApIHtcblx0XHRcdFx0b2sgPSBleHBlY3RlZCA9PT0gZXJyb3JTdHJpbmcoIGFjdHVhbCApO1xuXG5cdFx0XHQvLyBleHBlY3RlZCBpcyBhIGNvbnN0cnVjdG9yLCBtYXliZSBhbiBFcnJvciBjb25zdHJ1Y3RvclxuXHRcdFx0fSBlbHNlIGlmICggZXhwZWN0ZWRUeXBlID09PSBcImZ1bmN0aW9uXCIgJiYgYWN0dWFsIGluc3RhbmNlb2YgZXhwZWN0ZWQgKSB7XG5cdFx0XHRcdG9rID0gdHJ1ZTtcblxuXHRcdFx0Ly8gZXhwZWN0ZWQgaXMgYW4gRXJyb3Igb2JqZWN0XG5cdFx0XHR9IGVsc2UgaWYgKCBleHBlY3RlZFR5cGUgPT09IFwib2JqZWN0XCIgKSB7XG5cdFx0XHRcdG9rID0gYWN0dWFsIGluc3RhbmNlb2YgZXhwZWN0ZWQuY29uc3RydWN0b3IgJiZcblx0XHRcdFx0XHRhY3R1YWwubmFtZSA9PT0gZXhwZWN0ZWQubmFtZSAmJlxuXHRcdFx0XHRcdGFjdHVhbC5tZXNzYWdlID09PSBleHBlY3RlZC5tZXNzYWdlO1xuXG5cdFx0XHQvLyBleHBlY3RlZCBpcyBhIHZhbGlkYXRpb24gZnVuY3Rpb24gd2hpY2ggcmV0dXJucyB0cnVlIGlmIHZhbGlkYXRpb24gcGFzc2VkXG5cdFx0XHR9IGVsc2UgaWYgKCBleHBlY3RlZFR5cGUgPT09IFwiZnVuY3Rpb25cIiAmJiBleHBlY3RlZC5jYWxsKCB7fSwgYWN0dWFsICkgPT09IHRydWUgKSB7XG5cdFx0XHRcdGV4cGVjdGVkT3V0cHV0ID0gbnVsbDtcblx0XHRcdFx0b2sgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGN1cnJlbnRUZXN0LmFzc2VydC5wdXNoKCBvaywgYWN0dWFsLCBleHBlY3RlZE91dHB1dCwgbWVzc2FnZSApO1xuXHR9XG59O1xuXG4vLyBQcm92aWRlIGFuIGFsdGVybmF0aXZlIHRvIGFzc2VydC50aHJvd3MoKSwgZm9yIGVudmlyb25tZW50cyB0aGF0IGNvbnNpZGVyIHRocm93cyBhIHJlc2VydmVkIHdvcmRcbi8vIEtub3duIHRvIHVzIGFyZTogQ2xvc3VyZSBDb21waWxlciwgTmFyd2hhbFxuKGZ1bmN0aW9uKCkge1xuXHQvKmpzaGludCBzdWI6dHJ1ZSAqL1xuXHRBc3NlcnQucHJvdG90eXBlLnJhaXNlcyA9IEFzc2VydC5wcm90b3R5cGVbIFwidGhyb3dzXCIgXTtcbn0oKSk7XG5cbmZ1bmN0aW9uIGVycm9yU3RyaW5nKCBlcnJvciApIHtcblx0dmFyIG5hbWUsIG1lc3NhZ2UsXG5cdFx0cmVzdWx0RXJyb3JTdHJpbmcgPSBlcnJvci50b1N0cmluZygpO1xuXHRpZiAoIHJlc3VsdEVycm9yU3RyaW5nLnN1YnN0cmluZyggMCwgNyApID09PSBcIltvYmplY3RcIiApIHtcblx0XHRuYW1lID0gZXJyb3IubmFtZSA/IGVycm9yLm5hbWUudG9TdHJpbmcoKSA6IFwiRXJyb3JcIjtcblx0XHRtZXNzYWdlID0gZXJyb3IubWVzc2FnZSA/IGVycm9yLm1lc3NhZ2UudG9TdHJpbmcoKSA6IFwiXCI7XG5cdFx0aWYgKCBuYW1lICYmIG1lc3NhZ2UgKSB7XG5cdFx0XHRyZXR1cm4gbmFtZSArIFwiOiBcIiArIG1lc3NhZ2U7XG5cdFx0fSBlbHNlIGlmICggbmFtZSApIHtcblx0XHRcdHJldHVybiBuYW1lO1xuXHRcdH0gZWxzZSBpZiAoIG1lc3NhZ2UgKSB7XG5cdFx0XHRyZXR1cm4gbWVzc2FnZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIFwiRXJyb3JcIjtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHJlc3VsdEVycm9yU3RyaW5nO1xuXHR9XG59XG5cbi8vIFRlc3QgZm9yIGVxdWFsaXR5IGFueSBKYXZhU2NyaXB0IHR5cGUuXG4vLyBBdXRob3I6IFBoaWxpcHBlIFJhdGjDqSA8cHJhdGhlQGdtYWlsLmNvbT5cblFVbml0LmVxdWl2ID0gKGZ1bmN0aW9uKCkge1xuXG5cdC8vIFN0YWNrIHRvIGRlY2lkZSBiZXR3ZWVuIHNraXAvYWJvcnQgZnVuY3Rpb25zXG5cdHZhciBjYWxsZXJzID0gW107XG5cblx0Ly8gU3RhY2sgdG8gYXZvaWRpbmcgbG9vcHMgZnJvbSBjaXJjdWxhciByZWZlcmVuY2luZ1xuXHR2YXIgcGFyZW50cyA9IFtdO1xuXHR2YXIgcGFyZW50c0IgPSBbXTtcblxuXHRmdW5jdGlvbiB1c2VTdHJpY3RFcXVhbGl0eSggYiwgYSApIHtcblxuXHRcdC8qanNoaW50IGVxZXFlcTpmYWxzZSAqL1xuXHRcdGlmICggYiBpbnN0YW5jZW9mIGEuY29uc3RydWN0b3IgfHwgYSBpbnN0YW5jZW9mIGIuY29uc3RydWN0b3IgKSB7XG5cblx0XHRcdC8vIFRvIGNhdGNoIHNob3J0IGFubm90YXRpb24gVlMgJ25ldycgYW5ub3RhdGlvbiBvZiBhIGRlY2xhcmF0aW9uLiBlLmcuOlxuXHRcdFx0Ly8gYHZhciBpID0gMTtgXG5cdFx0XHQvLyBgdmFyIGogPSBuZXcgTnVtYmVyKDEpO2Bcblx0XHRcdHJldHVybiBhID09IGI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBhID09PSBiO1xuXHRcdH1cblx0fVxuXG5cdGZ1bmN0aW9uIGNvbXBhcmVDb25zdHJ1Y3RvcnMoIGEsIGIgKSB7XG5cdFx0dmFyIGdldFByb3RvID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uKCBvYmogKSB7XG5cblx0XHRcdC8qanNoaW50IHByb3RvOiB0cnVlICovXG5cdFx0XHRyZXR1cm4gb2JqLl9fcHJvdG9fXztcblx0XHR9O1xuXHRcdHZhciBwcm90b0EgPSBnZXRQcm90byggYSApO1xuXHRcdHZhciBwcm90b0IgPSBnZXRQcm90byggYiApO1xuXG5cdFx0Ly8gQ29tcGFyaW5nIGNvbnN0cnVjdG9ycyBpcyBtb3JlIHN0cmljdCB0aGFuIHVzaW5nIGBpbnN0YW5jZW9mYFxuXHRcdGlmICggYS5jb25zdHJ1Y3RvciA9PT0gYi5jb25zdHJ1Y3RvciApIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdC8vIFJlZiAjODUxXG5cdFx0Ly8gSWYgdGhlIG9iaiBwcm90b3R5cGUgZGVzY2VuZHMgZnJvbSBhIG51bGwgY29uc3RydWN0b3IsIHRyZWF0IGl0XG5cdFx0Ly8gYXMgYSBudWxsIHByb3RvdHlwZS5cblx0XHRpZiAoIHByb3RvQSAmJiBwcm90b0EuY29uc3RydWN0b3IgPT09IG51bGwgKSB7XG5cdFx0XHRwcm90b0EgPSBudWxsO1xuXHRcdH1cblx0XHRpZiAoIHByb3RvQiAmJiBwcm90b0IuY29uc3RydWN0b3IgPT09IG51bGwgKSB7XG5cdFx0XHRwcm90b0IgPSBudWxsO1xuXHRcdH1cblxuXHRcdC8vIEFsbG93IG9iamVjdHMgd2l0aCBubyBwcm90b3R5cGUgdG8gYmUgZXF1aXZhbGVudCB0b1xuXHRcdC8vIG9iamVjdHMgd2l0aCBPYmplY3QgYXMgdGhlaXIgY29uc3RydWN0b3IuXG5cdFx0aWYgKCAoIHByb3RvQSA9PT0gbnVsbCAmJiBwcm90b0IgPT09IE9iamVjdC5wcm90b3R5cGUgKSB8fFxuXHRcdFx0XHQoIHByb3RvQiA9PT0gbnVsbCAmJiBwcm90b0EgPT09IE9iamVjdC5wcm90b3R5cGUgKSApIHtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdHZhciBjYWxsYmFja3MgPSB7XG5cdFx0XCJzdHJpbmdcIjogdXNlU3RyaWN0RXF1YWxpdHksXG5cdFx0XCJib29sZWFuXCI6IHVzZVN0cmljdEVxdWFsaXR5LFxuXHRcdFwibnVtYmVyXCI6IHVzZVN0cmljdEVxdWFsaXR5LFxuXHRcdFwibnVsbFwiOiB1c2VTdHJpY3RFcXVhbGl0eSxcblx0XHRcInVuZGVmaW5lZFwiOiB1c2VTdHJpY3RFcXVhbGl0eSxcblx0XHRcInN5bWJvbFwiOiB1c2VTdHJpY3RFcXVhbGl0eSxcblxuXHRcdFwibmFuXCI6IGZ1bmN0aW9uKCBiICkge1xuXHRcdFx0cmV0dXJuIGlzTmFOKCBiICk7XG5cdFx0fSxcblxuXHRcdFwiZGF0ZVwiOiBmdW5jdGlvbiggYiwgYSApIHtcblx0XHRcdHJldHVybiBRVW5pdC5vYmplY3RUeXBlKCBiICkgPT09IFwiZGF0ZVwiICYmIGEudmFsdWVPZigpID09PSBiLnZhbHVlT2YoKTtcblx0XHR9LFxuXG5cdFx0XCJyZWdleHBcIjogZnVuY3Rpb24oIGIsIGEgKSB7XG5cdFx0XHRyZXR1cm4gUVVuaXQub2JqZWN0VHlwZSggYiApID09PSBcInJlZ2V4cFwiICYmXG5cblx0XHRcdFx0Ly8gVGhlIHJlZ2V4IGl0c2VsZlxuXHRcdFx0XHRhLnNvdXJjZSA9PT0gYi5zb3VyY2UgJiZcblxuXHRcdFx0XHQvLyBBbmQgaXRzIG1vZGlmaWVyc1xuXHRcdFx0XHRhLmdsb2JhbCA9PT0gYi5nbG9iYWwgJiZcblxuXHRcdFx0XHQvLyAoZ21pKSAuLi5cblx0XHRcdFx0YS5pZ25vcmVDYXNlID09PSBiLmlnbm9yZUNhc2UgJiZcblx0XHRcdFx0YS5tdWx0aWxpbmUgPT09IGIubXVsdGlsaW5lICYmXG5cdFx0XHRcdGEuc3RpY2t5ID09PSBiLnN0aWNreTtcblx0XHR9LFxuXG5cdFx0Ly8gLSBza2lwIHdoZW4gdGhlIHByb3BlcnR5IGlzIGEgbWV0aG9kIG9mIGFuIGluc3RhbmNlIChPT1ApXG5cdFx0Ly8gLSBhYm9ydCBvdGhlcndpc2UsXG5cdFx0Ly8gaW5pdGlhbCA9PT0gd291bGQgaGF2ZSBjYXRjaCBpZGVudGljYWwgcmVmZXJlbmNlcyBhbnl3YXlcblx0XHRcImZ1bmN0aW9uXCI6IGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIGNhbGxlciA9IGNhbGxlcnNbIGNhbGxlcnMubGVuZ3RoIC0gMSBdO1xuXHRcdFx0cmV0dXJuIGNhbGxlciAhPT0gT2JqZWN0ICYmIHR5cGVvZiBjYWxsZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cdFx0fSxcblxuXHRcdFwiYXJyYXlcIjogZnVuY3Rpb24oIGIsIGEgKSB7XG5cdFx0XHR2YXIgaSwgaiwgbGVuLCBsb29wLCBhQ2lyY3VsYXIsIGJDaXJjdWxhcjtcblxuXHRcdFx0Ly8gYiBjb3VsZCBiZSBhbiBvYmplY3QgbGl0ZXJhbCBoZXJlXG5cdFx0XHRpZiAoIFFVbml0Lm9iamVjdFR5cGUoIGIgKSAhPT0gXCJhcnJheVwiICkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdGxlbiA9IGEubGVuZ3RoO1xuXHRcdFx0aWYgKCBsZW4gIT09IGIubGVuZ3RoICkge1xuXHRcdFx0XHQvLyBzYWZlIGFuZCBmYXN0ZXJcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBUcmFjayByZWZlcmVuY2UgdG8gYXZvaWQgY2lyY3VsYXIgcmVmZXJlbmNlc1xuXHRcdFx0cGFyZW50cy5wdXNoKCBhICk7XG5cdFx0XHRwYXJlbnRzQi5wdXNoKCBiICk7XG5cdFx0XHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdFx0XHRsb29wID0gZmFsc2U7XG5cdFx0XHRcdGZvciAoIGogPSAwOyBqIDwgcGFyZW50cy5sZW5ndGg7IGorKyApIHtcblx0XHRcdFx0XHRhQ2lyY3VsYXIgPSBwYXJlbnRzWyBqIF0gPT09IGFbIGkgXTtcblx0XHRcdFx0XHRiQ2lyY3VsYXIgPSBwYXJlbnRzQlsgaiBdID09PSBiWyBpIF07XG5cdFx0XHRcdFx0aWYgKCBhQ2lyY3VsYXIgfHwgYkNpcmN1bGFyICkge1xuXHRcdFx0XHRcdFx0aWYgKCBhWyBpIF0gPT09IGJbIGkgXSB8fCBhQ2lyY3VsYXIgJiYgYkNpcmN1bGFyICkge1xuXHRcdFx0XHRcdFx0XHRsb29wID0gdHJ1ZTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHBhcmVudHMucG9wKCk7XG5cdFx0XHRcdFx0XHRcdHBhcmVudHNCLnBvcCgpO1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICggIWxvb3AgJiYgIWlubmVyRXF1aXYoIGFbIGkgXSwgYlsgaSBdICkgKSB7XG5cdFx0XHRcdFx0cGFyZW50cy5wb3AoKTtcblx0XHRcdFx0XHRwYXJlbnRzQi5wb3AoKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHBhcmVudHMucG9wKCk7XG5cdFx0XHRwYXJlbnRzQi5wb3AoKTtcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH0sXG5cblx0XHRcInNldFwiOiBmdW5jdGlvbiggYiwgYSApIHtcblx0XHRcdHZhciBhQXJyYXksIGJBcnJheTtcblxuXHRcdFx0Ly8gYGJgIGNvdWxkIGJlIGFueSBvYmplY3QgaGVyZVxuXHRcdFx0aWYgKCBRVW5pdC5vYmplY3RUeXBlKCBiICkgIT09IFwic2V0XCIgKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0YUFycmF5ID0gW107XG5cdFx0XHRhLmZvckVhY2goIGZ1bmN0aW9uKCB2ICkge1xuXHRcdFx0XHRhQXJyYXkucHVzaCggdiApO1xuXHRcdFx0fSk7XG5cdFx0XHRiQXJyYXkgPSBbXTtcblx0XHRcdGIuZm9yRWFjaCggZnVuY3Rpb24oIHYgKSB7XG5cdFx0XHRcdGJBcnJheS5wdXNoKCB2ICk7XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIGlubmVyRXF1aXYoIGJBcnJheSwgYUFycmF5ICk7XG5cdFx0fSxcblxuXHRcdFwibWFwXCI6IGZ1bmN0aW9uKCBiLCBhICkge1xuXHRcdFx0dmFyIGFBcnJheSwgYkFycmF5O1xuXG5cdFx0XHQvLyBgYmAgY291bGQgYmUgYW55IG9iamVjdCBoZXJlXG5cdFx0XHRpZiAoIFFVbml0Lm9iamVjdFR5cGUoIGIgKSAhPT0gXCJtYXBcIiApIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXG5cdFx0XHRhQXJyYXkgPSBbXTtcblx0XHRcdGEuZm9yRWFjaCggZnVuY3Rpb24oIHYsIGsgKSB7XG5cdFx0XHRcdGFBcnJheS5wdXNoKCBbIGssIHYgXSApO1xuXHRcdFx0fSk7XG5cdFx0XHRiQXJyYXkgPSBbXTtcblx0XHRcdGIuZm9yRWFjaCggZnVuY3Rpb24oIHYsIGsgKSB7XG5cdFx0XHRcdGJBcnJheS5wdXNoKCBbIGssIHYgXSApO1xuXHRcdFx0fSk7XG5cblx0XHRcdHJldHVybiBpbm5lckVxdWl2KCBiQXJyYXksIGFBcnJheSApO1xuXHRcdH0sXG5cblx0XHRcIm9iamVjdFwiOiBmdW5jdGlvbiggYiwgYSApIHtcblx0XHRcdHZhciBpLCBqLCBsb29wLCBhQ2lyY3VsYXIsIGJDaXJjdWxhcjtcblxuXHRcdFx0Ly8gRGVmYXVsdCB0byB0cnVlXG5cdFx0XHR2YXIgZXEgPSB0cnVlO1xuXHRcdFx0dmFyIGFQcm9wZXJ0aWVzID0gW107XG5cdFx0XHR2YXIgYlByb3BlcnRpZXMgPSBbXTtcblxuXHRcdFx0aWYgKCBjb21wYXJlQ29uc3RydWN0b3JzKCBhLCBiICkgPT09IGZhbHNlICkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFN0YWNrIGNvbnN0cnVjdG9yIGJlZm9yZSB0cmF2ZXJzaW5nIHByb3BlcnRpZXNcblx0XHRcdGNhbGxlcnMucHVzaCggYS5jb25zdHJ1Y3RvciApO1xuXG5cdFx0XHQvLyBUcmFjayByZWZlcmVuY2UgdG8gYXZvaWQgY2lyY3VsYXIgcmVmZXJlbmNlc1xuXHRcdFx0cGFyZW50cy5wdXNoKCBhICk7XG5cdFx0XHRwYXJlbnRzQi5wdXNoKCBiICk7XG5cblx0XHRcdC8vIEJlIHN0cmljdDogZG9uJ3QgZW5zdXJlIGhhc093blByb3BlcnR5IGFuZCBnbyBkZWVwXG5cdFx0XHRmb3IgKCBpIGluIGEgKSB7XG5cdFx0XHRcdGxvb3AgPSBmYWxzZTtcblx0XHRcdFx0Zm9yICggaiA9IDA7IGogPCBwYXJlbnRzLmxlbmd0aDsgaisrICkge1xuXHRcdFx0XHRcdGFDaXJjdWxhciA9IHBhcmVudHNbIGogXSA9PT0gYVsgaSBdO1xuXHRcdFx0XHRcdGJDaXJjdWxhciA9IHBhcmVudHNCWyBqIF0gPT09IGJbIGkgXTtcblx0XHRcdFx0XHRpZiAoIGFDaXJjdWxhciB8fCBiQ2lyY3VsYXIgKSB7XG5cdFx0XHRcdFx0XHRpZiAoIGFbIGkgXSA9PT0gYlsgaSBdIHx8IGFDaXJjdWxhciAmJiBiQ2lyY3VsYXIgKSB7XG5cdFx0XHRcdFx0XHRcdGxvb3AgPSB0cnVlO1xuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0ZXEgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdGFQcm9wZXJ0aWVzLnB1c2goIGkgKTtcblx0XHRcdFx0aWYgKCAhbG9vcCAmJiAhaW5uZXJFcXVpdiggYVsgaSBdLCBiWyBpIF0gKSApIHtcblx0XHRcdFx0XHRlcSA9IGZhbHNlO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHBhcmVudHMucG9wKCk7XG5cdFx0XHRwYXJlbnRzQi5wb3AoKTtcblxuXHRcdFx0Ly8gVW5zdGFjaywgd2UgYXJlIGRvbmVcblx0XHRcdGNhbGxlcnMucG9wKCk7XG5cblx0XHRcdGZvciAoIGkgaW4gYiApIHtcblxuXHRcdFx0XHQvLyBDb2xsZWN0IGIncyBwcm9wZXJ0aWVzXG5cdFx0XHRcdGJQcm9wZXJ0aWVzLnB1c2goIGkgKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gRW5zdXJlcyBpZGVudGljYWwgcHJvcGVydGllcyBuYW1lXG5cdFx0XHRyZXR1cm4gZXEgJiYgaW5uZXJFcXVpdiggYVByb3BlcnRpZXMuc29ydCgpLCBiUHJvcGVydGllcy5zb3J0KCkgKTtcblx0XHR9XG5cdH07XG5cblx0ZnVuY3Rpb24gdHlwZUVxdWl2KCBhLCBiICkge1xuXHRcdHZhciBwcm9wID0gUVVuaXQub2JqZWN0VHlwZSggYSApO1xuXHRcdHJldHVybiBjYWxsYmFja3NbIHByb3AgXSggYiwgYSApO1xuXHR9XG5cblx0Ly8gVGhlIHJlYWwgZXF1aXYgZnVuY3Rpb25cblx0ZnVuY3Rpb24gaW5uZXJFcXVpdigpIHtcblx0XHR2YXIgYXJncyA9IFtdLnNsaWNlLmFwcGx5KCBhcmd1bWVudHMgKTtcblx0XHRpZiAoIGFyZ3MubGVuZ3RoIDwgMiApIHtcblxuXHRcdFx0Ly8gRW5kIHRyYW5zaXRpb25cblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblxuXHRcdHJldHVybiAoIChmdW5jdGlvbiggYSwgYiApIHtcblx0XHRcdGlmICggYSA9PT0gYiApIHtcblxuXHRcdFx0XHQvLyBDYXRjaCB0aGUgbW9zdCB5b3UgY2FuXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSBlbHNlIGlmICggYSA9PT0gbnVsbCB8fCBiID09PSBudWxsIHx8IHR5cGVvZiBhID09PSBcInVuZGVmaW5lZFwiIHx8XG5cdFx0XHRcdFx0dHlwZW9mIGIgPT09IFwidW5kZWZpbmVkXCIgfHxcblx0XHRcdFx0XHRRVW5pdC5vYmplY3RUeXBlKCBhICkgIT09IFFVbml0Lm9iamVjdFR5cGUoIGIgKSApIHtcblxuXHRcdFx0XHQvLyBEb24ndCBsb3NlIHRpbWUgd2l0aCBlcnJvciBwcm9uZSBjYXNlc1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdHlwZUVxdWl2KCBhLCBiICk7XG5cdFx0XHR9XG5cblx0XHQvLyBBcHBseSB0cmFuc2l0aW9uIHdpdGggKDEuLm4pIGFyZ3VtZW50c1xuXHRcdH0oIGFyZ3NbIDAgXSwgYXJnc1sgMSBdICkgKSAmJlxuXHRcdFx0aW5uZXJFcXVpdi5hcHBseSggdGhpcywgYXJncy5zcGxpY2UoIDEsIGFyZ3MubGVuZ3RoIC0gMSApICkgKTtcblx0fVxuXG5cdHJldHVybiBpbm5lckVxdWl2O1xufSgpKTtcblxuLy8gQmFzZWQgb24ganNEdW1wIGJ5IEFyaWVsIEZsZXNsZXJcbi8vIGh0dHA6Ly9mbGVzbGVyLmJsb2dzcG90LmNvbS8yMDA4LzA1L2pzZHVtcC1wcmV0dHktZHVtcC1vZi1hbnktamF2YXNjcmlwdC5odG1sXG5RVW5pdC5kdW1wID0gKGZ1bmN0aW9uKCkge1xuXHRmdW5jdGlvbiBxdW90ZSggc3RyICkge1xuXHRcdHJldHVybiBcIlxcXCJcIiArIHN0ci50b1N0cmluZygpLnJlcGxhY2UoIC9cXFxcL2csIFwiXFxcXFxcXFxcIiApLnJlcGxhY2UoIC9cIi9nLCBcIlxcXFxcXFwiXCIgKSArIFwiXFxcIlwiO1xuXHR9XG5cdGZ1bmN0aW9uIGxpdGVyYWwoIG8gKSB7XG5cdFx0cmV0dXJuIG8gKyBcIlwiO1xuXHR9XG5cdGZ1bmN0aW9uIGpvaW4oIHByZSwgYXJyLCBwb3N0ICkge1xuXHRcdHZhciBzID0gZHVtcC5zZXBhcmF0b3IoKSxcblx0XHRcdGJhc2UgPSBkdW1wLmluZGVudCgpLFxuXHRcdFx0aW5uZXIgPSBkdW1wLmluZGVudCggMSApO1xuXHRcdGlmICggYXJyLmpvaW4gKSB7XG5cdFx0XHRhcnIgPSBhcnIuam9pbiggXCIsXCIgKyBzICsgaW5uZXIgKTtcblx0XHR9XG5cdFx0aWYgKCAhYXJyICkge1xuXHRcdFx0cmV0dXJuIHByZSArIHBvc3Q7XG5cdFx0fVxuXHRcdHJldHVybiBbIHByZSwgaW5uZXIgKyBhcnIsIGJhc2UgKyBwb3N0IF0uam9pbiggcyApO1xuXHR9XG5cdGZ1bmN0aW9uIGFycmF5KCBhcnIsIHN0YWNrICkge1xuXHRcdHZhciBpID0gYXJyLmxlbmd0aCxcblx0XHRcdHJldCA9IG5ldyBBcnJheSggaSApO1xuXG5cdFx0aWYgKCBkdW1wLm1heERlcHRoICYmIGR1bXAuZGVwdGggPiBkdW1wLm1heERlcHRoICkge1xuXHRcdFx0cmV0dXJuIFwiW29iamVjdCBBcnJheV1cIjtcblx0XHR9XG5cblx0XHR0aGlzLnVwKCk7XG5cdFx0d2hpbGUgKCBpLS0gKSB7XG5cdFx0XHRyZXRbIGkgXSA9IHRoaXMucGFyc2UoIGFyclsgaSBdLCB1bmRlZmluZWQsIHN0YWNrICk7XG5cdFx0fVxuXHRcdHRoaXMuZG93bigpO1xuXHRcdHJldHVybiBqb2luKCBcIltcIiwgcmV0LCBcIl1cIiApO1xuXHR9XG5cblx0dmFyIHJlTmFtZSA9IC9eZnVuY3Rpb24gKFxcdyspLyxcblx0XHRkdW1wID0ge1xuXG5cdFx0XHQvLyBvYmpUeXBlIGlzIHVzZWQgbW9zdGx5IGludGVybmFsbHksIHlvdSBjYW4gZml4IGEgKGN1c3RvbSkgdHlwZSBpbiBhZHZhbmNlXG5cdFx0XHRwYXJzZTogZnVuY3Rpb24oIG9iaiwgb2JqVHlwZSwgc3RhY2sgKSB7XG5cdFx0XHRcdHN0YWNrID0gc3RhY2sgfHwgW107XG5cdFx0XHRcdHZhciByZXMsIHBhcnNlciwgcGFyc2VyVHlwZSxcblx0XHRcdFx0XHRpblN0YWNrID0gaW5BcnJheSggb2JqLCBzdGFjayApO1xuXG5cdFx0XHRcdGlmICggaW5TdGFjayAhPT0gLTEgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFwicmVjdXJzaW9uKFwiICsgKCBpblN0YWNrIC0gc3RhY2subGVuZ3RoICkgKyBcIilcIjtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdG9ialR5cGUgPSBvYmpUeXBlIHx8IHRoaXMudHlwZU9mKCBvYmogICk7XG5cdFx0XHRcdHBhcnNlciA9IHRoaXMucGFyc2Vyc1sgb2JqVHlwZSBdO1xuXHRcdFx0XHRwYXJzZXJUeXBlID0gdHlwZW9mIHBhcnNlcjtcblxuXHRcdFx0XHRpZiAoIHBhcnNlclR5cGUgPT09IFwiZnVuY3Rpb25cIiApIHtcblx0XHRcdFx0XHRzdGFjay5wdXNoKCBvYmogKTtcblx0XHRcdFx0XHRyZXMgPSBwYXJzZXIuY2FsbCggdGhpcywgb2JqLCBzdGFjayApO1xuXHRcdFx0XHRcdHN0YWNrLnBvcCgpO1xuXHRcdFx0XHRcdHJldHVybiByZXM7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuICggcGFyc2VyVHlwZSA9PT0gXCJzdHJpbmdcIiApID8gcGFyc2VyIDogdGhpcy5wYXJzZXJzLmVycm9yO1xuXHRcdFx0fSxcblx0XHRcdHR5cGVPZjogZnVuY3Rpb24oIG9iaiApIHtcblx0XHRcdFx0dmFyIHR5cGU7XG5cdFx0XHRcdGlmICggb2JqID09PSBudWxsICkge1xuXHRcdFx0XHRcdHR5cGUgPSBcIm51bGxcIjtcblx0XHRcdFx0fSBlbHNlIGlmICggdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRcdFx0XHR0eXBlID0gXCJ1bmRlZmluZWRcIjtcblx0XHRcdFx0fSBlbHNlIGlmICggUVVuaXQuaXMoIFwicmVnZXhwXCIsIG9iaiApICkge1xuXHRcdFx0XHRcdHR5cGUgPSBcInJlZ2V4cFwiO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBRVW5pdC5pcyggXCJkYXRlXCIsIG9iaiApICkge1xuXHRcdFx0XHRcdHR5cGUgPSBcImRhdGVcIjtcblx0XHRcdFx0fSBlbHNlIGlmICggUVVuaXQuaXMoIFwiZnVuY3Rpb25cIiwgb2JqICkgKSB7XG5cdFx0XHRcdFx0dHlwZSA9IFwiZnVuY3Rpb25cIjtcblx0XHRcdFx0fSBlbHNlIGlmICggb2JqLnNldEludGVydmFsICE9PSB1bmRlZmluZWQgJiZcblx0XHRcdFx0XHRcdG9iai5kb2N1bWVudCAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHRcdFx0XHRvYmoubm9kZVR5cGUgPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0XHR0eXBlID0gXCJ3aW5kb3dcIjtcblx0XHRcdFx0fSBlbHNlIGlmICggb2JqLm5vZGVUeXBlID09PSA5ICkge1xuXHRcdFx0XHRcdHR5cGUgPSBcImRvY3VtZW50XCI7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIG9iai5ub2RlVHlwZSApIHtcblx0XHRcdFx0XHR0eXBlID0gXCJub2RlXCI7XG5cdFx0XHRcdH0gZWxzZSBpZiAoXG5cblx0XHRcdFx0XHQvLyBuYXRpdmUgYXJyYXlzXG5cdFx0XHRcdFx0dG9TdHJpbmcuY2FsbCggb2JqICkgPT09IFwiW29iamVjdCBBcnJheV1cIiB8fFxuXG5cdFx0XHRcdFx0Ly8gTm9kZUxpc3Qgb2JqZWN0c1xuXHRcdFx0XHRcdCggdHlwZW9mIG9iai5sZW5ndGggPT09IFwibnVtYmVyXCIgJiYgb2JqLml0ZW0gIT09IHVuZGVmaW5lZCAmJlxuXHRcdFx0XHRcdCggb2JqLmxlbmd0aCA/IG9iai5pdGVtKCAwICkgPT09IG9ialsgMCBdIDogKCBvYmouaXRlbSggMCApID09PSBudWxsICYmXG5cdFx0XHRcdFx0b2JqWyAwIF0gPT09IHVuZGVmaW5lZCApICkgKVxuXHRcdFx0XHQpIHtcblx0XHRcdFx0XHR0eXBlID0gXCJhcnJheVwiO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBvYmouY29uc3RydWN0b3IgPT09IEVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciApIHtcblx0XHRcdFx0XHR0eXBlID0gXCJlcnJvclwiO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHR5cGUgPSB0eXBlb2Ygb2JqO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB0eXBlO1xuXHRcdFx0fSxcblx0XHRcdHNlcGFyYXRvcjogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHJldHVybiB0aGlzLm11bHRpbGluZSA/IHRoaXMuSFRNTCA/IFwiPGJyIC8+XCIgOiBcIlxcblwiIDogdGhpcy5IVE1MID8gXCImIzE2MDtcIiA6IFwiIFwiO1xuXHRcdFx0fSxcblx0XHRcdC8vIGV4dHJhIGNhbiBiZSBhIG51bWJlciwgc2hvcnRjdXQgZm9yIGluY3JlYXNpbmctY2FsbGluZy1kZWNyZWFzaW5nXG5cdFx0XHRpbmRlbnQ6IGZ1bmN0aW9uKCBleHRyYSApIHtcblx0XHRcdFx0aWYgKCAhdGhpcy5tdWx0aWxpbmUgKSB7XG5cdFx0XHRcdFx0cmV0dXJuIFwiXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0dmFyIGNociA9IHRoaXMuaW5kZW50Q2hhcjtcblx0XHRcdFx0aWYgKCB0aGlzLkhUTUwgKSB7XG5cdFx0XHRcdFx0Y2hyID0gY2hyLnJlcGxhY2UoIC9cXHQvZywgXCIgICBcIiApLnJlcGxhY2UoIC8gL2csIFwiJiMxNjA7XCIgKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gbmV3IEFycmF5KCB0aGlzLmRlcHRoICsgKCBleHRyYSB8fCAwICkgKS5qb2luKCBjaHIgKTtcblx0XHRcdH0sXG5cdFx0XHR1cDogZnVuY3Rpb24oIGEgKSB7XG5cdFx0XHRcdHRoaXMuZGVwdGggKz0gYSB8fCAxO1xuXHRcdFx0fSxcblx0XHRcdGRvd246IGZ1bmN0aW9uKCBhICkge1xuXHRcdFx0XHR0aGlzLmRlcHRoIC09IGEgfHwgMTtcblx0XHRcdH0sXG5cdFx0XHRzZXRQYXJzZXI6IGZ1bmN0aW9uKCBuYW1lLCBwYXJzZXIgKSB7XG5cdFx0XHRcdHRoaXMucGFyc2Vyc1sgbmFtZSBdID0gcGFyc2VyO1xuXHRcdFx0fSxcblx0XHRcdC8vIFRoZSBuZXh0IDMgYXJlIGV4cG9zZWQgc28geW91IGNhbiB1c2UgdGhlbVxuXHRcdFx0cXVvdGU6IHF1b3RlLFxuXHRcdFx0bGl0ZXJhbDogbGl0ZXJhbCxcblx0XHRcdGpvaW46IGpvaW4sXG5cdFx0XHQvL1xuXHRcdFx0ZGVwdGg6IDEsXG5cdFx0XHRtYXhEZXB0aDogUVVuaXQuY29uZmlnLm1heERlcHRoLFxuXG5cdFx0XHQvLyBUaGlzIGlzIHRoZSBsaXN0IG9mIHBhcnNlcnMsIHRvIG1vZGlmeSB0aGVtLCB1c2UgZHVtcC5zZXRQYXJzZXJcblx0XHRcdHBhcnNlcnM6IHtcblx0XHRcdFx0d2luZG93OiBcIltXaW5kb3ddXCIsXG5cdFx0XHRcdGRvY3VtZW50OiBcIltEb2N1bWVudF1cIixcblx0XHRcdFx0ZXJyb3I6IGZ1bmN0aW9uKCBlcnJvciApIHtcblx0XHRcdFx0XHRyZXR1cm4gXCJFcnJvcihcXFwiXCIgKyBlcnJvci5tZXNzYWdlICsgXCJcXFwiKVwiO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR1bmtub3duOiBcIltVbmtub3duXVwiLFxuXHRcdFx0XHRcIm51bGxcIjogXCJudWxsXCIsXG5cdFx0XHRcdFwidW5kZWZpbmVkXCI6IFwidW5kZWZpbmVkXCIsXG5cdFx0XHRcdFwiZnVuY3Rpb25cIjogZnVuY3Rpb24oIGZuICkge1xuXHRcdFx0XHRcdHZhciByZXQgPSBcImZ1bmN0aW9uXCIsXG5cblx0XHRcdFx0XHRcdC8vIGZ1bmN0aW9ucyBuZXZlciBoYXZlIG5hbWUgaW4gSUVcblx0XHRcdFx0XHRcdG5hbWUgPSBcIm5hbWVcIiBpbiBmbiA/IGZuLm5hbWUgOiAoIHJlTmFtZS5leGVjKCBmbiApIHx8IFtdIClbIDEgXTtcblxuXHRcdFx0XHRcdGlmICggbmFtZSApIHtcblx0XHRcdFx0XHRcdHJldCArPSBcIiBcIiArIG5hbWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHJldCArPSBcIiggXCI7XG5cblx0XHRcdFx0XHRyZXQgPSBbIHJldCwgZHVtcC5wYXJzZSggZm4sIFwiZnVuY3Rpb25BcmdzXCIgKSwgXCIpe1wiIF0uam9pbiggXCJcIiApO1xuXHRcdFx0XHRcdHJldHVybiBqb2luKCByZXQsIGR1bXAucGFyc2UoIGZuLCBcImZ1bmN0aW9uQ29kZVwiICksIFwifVwiICk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFycmF5OiBhcnJheSxcblx0XHRcdFx0bm9kZWxpc3Q6IGFycmF5LFxuXHRcdFx0XHRcImFyZ3VtZW50c1wiOiBhcnJheSxcblx0XHRcdFx0b2JqZWN0OiBmdW5jdGlvbiggbWFwLCBzdGFjayApIHtcblx0XHRcdFx0XHR2YXIga2V5cywga2V5LCB2YWwsIGksIG5vbkVudW1lcmFibGVQcm9wZXJ0aWVzLFxuXHRcdFx0XHRcdFx0cmV0ID0gW107XG5cblx0XHRcdFx0XHRpZiAoIGR1bXAubWF4RGVwdGggJiYgZHVtcC5kZXB0aCA+IGR1bXAubWF4RGVwdGggKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gXCJbb2JqZWN0IE9iamVjdF1cIjtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRkdW1wLnVwKCk7XG5cdFx0XHRcdFx0a2V5cyA9IFtdO1xuXHRcdFx0XHRcdGZvciAoIGtleSBpbiBtYXAgKSB7XG5cdFx0XHRcdFx0XHRrZXlzLnB1c2goIGtleSApO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIFNvbWUgcHJvcGVydGllcyBhcmUgbm90IGFsd2F5cyBlbnVtZXJhYmxlIG9uIEVycm9yIG9iamVjdHMuXG5cdFx0XHRcdFx0bm9uRW51bWVyYWJsZVByb3BlcnRpZXMgPSBbIFwibWVzc2FnZVwiLCBcIm5hbWVcIiBdO1xuXHRcdFx0XHRcdGZvciAoIGkgaW4gbm9uRW51bWVyYWJsZVByb3BlcnRpZXMgKSB7XG5cdFx0XHRcdFx0XHRrZXkgPSBub25FbnVtZXJhYmxlUHJvcGVydGllc1sgaSBdO1xuXHRcdFx0XHRcdFx0aWYgKCBrZXkgaW4gbWFwICYmIGluQXJyYXkoIGtleSwga2V5cyApIDwgMCApIHtcblx0XHRcdFx0XHRcdFx0a2V5cy5wdXNoKCBrZXkgKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0a2V5cy5zb3J0KCk7XG5cdFx0XHRcdFx0Zm9yICggaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrICkge1xuXHRcdFx0XHRcdFx0a2V5ID0ga2V5c1sgaSBdO1xuXHRcdFx0XHRcdFx0dmFsID0gbWFwWyBrZXkgXTtcblx0XHRcdFx0XHRcdHJldC5wdXNoKCBkdW1wLnBhcnNlKCBrZXksIFwia2V5XCIgKSArIFwiOiBcIiArXG5cdFx0XHRcdFx0XHRcdGR1bXAucGFyc2UoIHZhbCwgdW5kZWZpbmVkLCBzdGFjayApICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGR1bXAuZG93bigpO1xuXHRcdFx0XHRcdHJldHVybiBqb2luKCBcIntcIiwgcmV0LCBcIn1cIiApO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRub2RlOiBmdW5jdGlvbiggbm9kZSApIHtcblx0XHRcdFx0XHR2YXIgbGVuLCBpLCB2YWwsXG5cdFx0XHRcdFx0XHRvcGVuID0gZHVtcC5IVE1MID8gXCImbHQ7XCIgOiBcIjxcIixcblx0XHRcdFx0XHRcdGNsb3NlID0gZHVtcC5IVE1MID8gXCImZ3Q7XCIgOiBcIj5cIixcblx0XHRcdFx0XHRcdHRhZyA9IG5vZGUubm9kZU5hbWUudG9Mb3dlckNhc2UoKSxcblx0XHRcdFx0XHRcdHJldCA9IG9wZW4gKyB0YWcsXG5cdFx0XHRcdFx0XHRhdHRycyA9IG5vZGUuYXR0cmlidXRlcztcblxuXHRcdFx0XHRcdGlmICggYXR0cnMgKSB7XG5cdFx0XHRcdFx0XHRmb3IgKCBpID0gMCwgbGVuID0gYXR0cnMubGVuZ3RoOyBpIDwgbGVuOyBpKysgKSB7XG5cdFx0XHRcdFx0XHRcdHZhbCA9IGF0dHJzWyBpIF0ubm9kZVZhbHVlO1xuXG5cdFx0XHRcdFx0XHRcdC8vIElFNiBpbmNsdWRlcyBhbGwgYXR0cmlidXRlcyBpbiAuYXR0cmlidXRlcywgZXZlbiBvbmVzIG5vdCBleHBsaWNpdGx5XG5cdFx0XHRcdFx0XHRcdC8vIHNldC4gVGhvc2UgaGF2ZSB2YWx1ZXMgbGlrZSB1bmRlZmluZWQsIG51bGwsIDAsIGZhbHNlLCBcIlwiIG9yXG5cdFx0XHRcdFx0XHRcdC8vIFwiaW5oZXJpdFwiLlxuXHRcdFx0XHRcdFx0XHRpZiAoIHZhbCAmJiB2YWwgIT09IFwiaW5oZXJpdFwiICkge1xuXHRcdFx0XHRcdFx0XHRcdHJldCArPSBcIiBcIiArIGF0dHJzWyBpIF0ubm9kZU5hbWUgKyBcIj1cIiArXG5cdFx0XHRcdFx0XHRcdFx0XHRkdW1wLnBhcnNlKCB2YWwsIFwiYXR0cmlidXRlXCIgKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXQgKz0gY2xvc2U7XG5cblx0XHRcdFx0XHQvLyBTaG93IGNvbnRlbnQgb2YgVGV4dE5vZGUgb3IgQ0RBVEFTZWN0aW9uXG5cdFx0XHRcdFx0aWYgKCBub2RlLm5vZGVUeXBlID09PSAzIHx8IG5vZGUubm9kZVR5cGUgPT09IDQgKSB7XG5cdFx0XHRcdFx0XHRyZXQgKz0gbm9kZS5ub2RlVmFsdWU7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIHJldCArIG9wZW4gKyBcIi9cIiArIHRhZyArIGNsb3NlO1xuXHRcdFx0XHR9LFxuXG5cdFx0XHRcdC8vIGZ1bmN0aW9uIGNhbGxzIGl0IGludGVybmFsbHksIGl0J3MgdGhlIGFyZ3VtZW50cyBwYXJ0IG9mIHRoZSBmdW5jdGlvblxuXHRcdFx0XHRmdW5jdGlvbkFyZ3M6IGZ1bmN0aW9uKCBmbiApIHtcblx0XHRcdFx0XHR2YXIgYXJncyxcblx0XHRcdFx0XHRcdGwgPSBmbi5sZW5ndGg7XG5cblx0XHRcdFx0XHRpZiAoICFsICkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIFwiXCI7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0YXJncyA9IG5ldyBBcnJheSggbCApO1xuXHRcdFx0XHRcdHdoaWxlICggbC0tICkge1xuXG5cdFx0XHRcdFx0XHQvLyA5NyBpcyAnYSdcblx0XHRcdFx0XHRcdGFyZ3NbIGwgXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoIDk3ICsgbCApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gXCIgXCIgKyBhcmdzLmpvaW4oIFwiLCBcIiApICsgXCIgXCI7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdC8vIG9iamVjdCBjYWxscyBpdCBpbnRlcm5hbGx5LCB0aGUga2V5IHBhcnQgb2YgYW4gaXRlbSBpbiBhIG1hcFxuXHRcdFx0XHRrZXk6IHF1b3RlLFxuXHRcdFx0XHQvLyBmdW5jdGlvbiBjYWxscyBpdCBpbnRlcm5hbGx5LCBpdCdzIHRoZSBjb250ZW50IG9mIHRoZSBmdW5jdGlvblxuXHRcdFx0XHRmdW5jdGlvbkNvZGU6IFwiW2NvZGVdXCIsXG5cdFx0XHRcdC8vIG5vZGUgY2FsbHMgaXQgaW50ZXJuYWxseSwgaXQncyBhbiBodG1sIGF0dHJpYnV0ZSB2YWx1ZVxuXHRcdFx0XHRhdHRyaWJ1dGU6IHF1b3RlLFxuXHRcdFx0XHRzdHJpbmc6IHF1b3RlLFxuXHRcdFx0XHRkYXRlOiBxdW90ZSxcblx0XHRcdFx0cmVnZXhwOiBsaXRlcmFsLFxuXHRcdFx0XHRudW1iZXI6IGxpdGVyYWwsXG5cdFx0XHRcdFwiYm9vbGVhblwiOiBsaXRlcmFsXG5cdFx0XHR9LFxuXHRcdFx0Ly8gaWYgdHJ1ZSwgZW50aXRpZXMgYXJlIGVzY2FwZWQgKCA8LCA+LCBcXHQsIHNwYWNlIGFuZCBcXG4gKVxuXHRcdFx0SFRNTDogZmFsc2UsXG5cdFx0XHQvLyBpbmRlbnRhdGlvbiB1bml0XG5cdFx0XHRpbmRlbnRDaGFyOiBcIiAgXCIsXG5cdFx0XHQvLyBpZiB0cnVlLCBpdGVtcyBpbiBhIGNvbGxlY3Rpb24sIGFyZSBzZXBhcmF0ZWQgYnkgYSBcXG4sIGVsc2UganVzdCBhIHNwYWNlLlxuXHRcdFx0bXVsdGlsaW5lOiB0cnVlXG5cdFx0fTtcblxuXHRyZXR1cm4gZHVtcDtcbn0oKSk7XG5cbi8vIGJhY2sgY29tcGF0XG5RVW5pdC5qc0R1bXAgPSBRVW5pdC5kdW1wO1xuXG4vLyBGb3IgYnJvd3NlciwgZXhwb3J0IG9ubHkgc2VsZWN0IGdsb2JhbHNcbmlmICggZGVmaW5lZC5kb2N1bWVudCApIHtcblxuXHQvLyBEZXByZWNhdGVkXG5cdC8vIEV4dGVuZCBhc3NlcnQgbWV0aG9kcyB0byBRVW5pdCBhbmQgR2xvYmFsIHNjb3BlIHRocm91Z2ggQmFja3dhcmRzIGNvbXBhdGliaWxpdHlcblx0KGZ1bmN0aW9uKCkge1xuXHRcdHZhciBpLFxuXHRcdFx0YXNzZXJ0aW9ucyA9IEFzc2VydC5wcm90b3R5cGU7XG5cblx0XHRmdW5jdGlvbiBhcHBseUN1cnJlbnQoIGN1cnJlbnQgKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdHZhciBhc3NlcnQgPSBuZXcgQXNzZXJ0KCBRVW5pdC5jb25maWcuY3VycmVudCApO1xuXHRcdFx0XHRjdXJyZW50LmFwcGx5KCBhc3NlcnQsIGFyZ3VtZW50cyApO1xuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRmb3IgKCBpIGluIGFzc2VydGlvbnMgKSB7XG5cdFx0XHRRVW5pdFsgaSBdID0gYXBwbHlDdXJyZW50KCBhc3NlcnRpb25zWyBpIF0gKTtcblx0XHR9XG5cdH0pKCk7XG5cblx0KGZ1bmN0aW9uKCkge1xuXHRcdHZhciBpLCBsLFxuXHRcdFx0a2V5cyA9IFtcblx0XHRcdFx0XCJ0ZXN0XCIsXG5cdFx0XHRcdFwibW9kdWxlXCIsXG5cdFx0XHRcdFwiZXhwZWN0XCIsXG5cdFx0XHRcdFwiYXN5bmNUZXN0XCIsXG5cdFx0XHRcdFwic3RhcnRcIixcblx0XHRcdFx0XCJzdG9wXCIsXG5cdFx0XHRcdFwib2tcIixcblx0XHRcdFx0XCJub3RPa1wiLFxuXHRcdFx0XHRcImVxdWFsXCIsXG5cdFx0XHRcdFwibm90RXF1YWxcIixcblx0XHRcdFx0XCJwcm9wRXF1YWxcIixcblx0XHRcdFx0XCJub3RQcm9wRXF1YWxcIixcblx0XHRcdFx0XCJkZWVwRXF1YWxcIixcblx0XHRcdFx0XCJub3REZWVwRXF1YWxcIixcblx0XHRcdFx0XCJzdHJpY3RFcXVhbFwiLFxuXHRcdFx0XHRcIm5vdFN0cmljdEVxdWFsXCIsXG5cdFx0XHRcdFwidGhyb3dzXCIsXG5cdFx0XHRcdFwicmFpc2VzXCJcblx0XHRcdF07XG5cblx0XHRmb3IgKCBpID0gMCwgbCA9IGtleXMubGVuZ3RoOyBpIDwgbDsgaSsrICkge1xuXHRcdFx0d2luZG93WyBrZXlzWyBpIF0gXSA9IFFVbml0WyBrZXlzWyBpIF0gXTtcblx0XHR9XG5cdH0pKCk7XG5cblx0d2luZG93LlFVbml0ID0gUVVuaXQ7XG59XG5cbi8vIEZvciBub2RlanNcbmlmICggdHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUgJiYgbW9kdWxlLmV4cG9ydHMgKSB7XG5cdG1vZHVsZS5leHBvcnRzID0gUVVuaXQ7XG5cblx0Ly8gRm9yIGNvbnNpc3RlbmN5IHdpdGggQ29tbW9uSlMgZW52aXJvbm1lbnRzJyBleHBvcnRzXG5cdG1vZHVsZS5leHBvcnRzLlFVbml0ID0gUVVuaXQ7XG59XG5cbi8vIEZvciBDb21tb25KUyB3aXRoIGV4cG9ydHMsIGJ1dCB3aXRob3V0IG1vZHVsZS5leHBvcnRzLCBsaWtlIFJoaW5vXG5pZiAoIHR5cGVvZiBleHBvcnRzICE9PSBcInVuZGVmaW5lZFwiICYmIGV4cG9ydHMgKSB7XG5cdGV4cG9ydHMuUVVuaXQgPSBRVW5pdDtcbn1cblxuaWYgKCB0eXBlb2YgZGVmaW5lID09PSBcImZ1bmN0aW9uXCIgJiYgZGVmaW5lLmFtZCApIHtcblx0ZGVmaW5lKCBmdW5jdGlvbigpIHtcblx0XHRyZXR1cm4gUVVuaXQ7XG5cdH0gKTtcblx0UVVuaXQuY29uZmlnLmF1dG9zdGFydCA9IGZhbHNlO1xufVxuXG4vKlxuICogVGhpcyBmaWxlIGlzIGEgbW9kaWZpZWQgdmVyc2lvbiBvZiBnb29nbGUtZGlmZi1tYXRjaC1wYXRjaCdzIEphdmFTY3JpcHQgaW1wbGVtZW50YXRpb25cbiAqIChodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2dvb2dsZS1kaWZmLW1hdGNoLXBhdGNoL3NvdXJjZS9icm93c2UvdHJ1bmsvamF2YXNjcmlwdC9kaWZmX21hdGNoX3BhdGNoX3VuY29tcHJlc3NlZC5qcyksXG4gKiBtb2RpZmljYXRpb25zIGFyZSBsaWNlbnNlZCBhcyBtb3JlIGZ1bGx5IHNldCBmb3J0aCBpbiBMSUNFTlNFLnR4dC5cbiAqXG4gKiBUaGUgb3JpZ2luYWwgc291cmNlIG9mIGdvb2dsZS1kaWZmLW1hdGNoLXBhdGNoIGlzIGF0dHJpYnV0YWJsZSBhbmQgbGljZW5zZWQgYXMgZm9sbG93czpcbiAqXG4gKiBDb3B5cmlnaHQgMjAwNiBHb29nbGUgSW5jLlxuICogaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2dvb2dsZS1kaWZmLW1hdGNoLXBhdGNoL1xuICpcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbiAqXG4gKiBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbiAqXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuICpcbiAqIE1vcmUgSW5mbzpcbiAqICBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2dvb2dsZS1kaWZmLW1hdGNoLXBhdGNoL1xuICpcbiAqIFVzYWdlOiBRVW5pdC5kaWZmKGV4cGVjdGVkLCBhY3R1YWwpXG4gKlxuICovXG5RVW5pdC5kaWZmID0gKCBmdW5jdGlvbigpIHtcblx0ZnVuY3Rpb24gRGlmZk1hdGNoUGF0Y2goKSB7XG5cdH1cblxuXHQvLyAgRElGRiBGVU5DVElPTlNcblxuXHQvKipcblx0ICogVGhlIGRhdGEgc3RydWN0dXJlIHJlcHJlc2VudGluZyBhIGRpZmYgaXMgYW4gYXJyYXkgb2YgdHVwbGVzOlxuXHQgKiBbW0RJRkZfREVMRVRFLCAnSGVsbG8nXSwgW0RJRkZfSU5TRVJULCAnR29vZGJ5ZSddLCBbRElGRl9FUVVBTCwgJyB3b3JsZC4nXV1cblx0ICogd2hpY2ggbWVhbnM6IGRlbGV0ZSAnSGVsbG8nLCBhZGQgJ0dvb2RieWUnIGFuZCBrZWVwICcgd29ybGQuJ1xuXHQgKi9cblx0dmFyIERJRkZfREVMRVRFID0gLTEsXG5cdFx0RElGRl9JTlNFUlQgPSAxLFxuXHRcdERJRkZfRVFVQUwgPSAwO1xuXG5cdC8qKlxuXHQgKiBGaW5kIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIHR3byB0ZXh0cy4gIFNpbXBsaWZpZXMgdGhlIHByb2JsZW0gYnkgc3RyaXBwaW5nXG5cdCAqIGFueSBjb21tb24gcHJlZml4IG9yIHN1ZmZpeCBvZmYgdGhlIHRleHRzIGJlZm9yZSBkaWZmaW5nLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dDEgT2xkIHN0cmluZyB0byBiZSBkaWZmZWQuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MiBOZXcgc3RyaW5nIHRvIGJlIGRpZmZlZC5cblx0ICogQHBhcmFtIHtib29sZWFuPX0gb3B0Q2hlY2tsaW5lcyBPcHRpb25hbCBzcGVlZHVwIGZsYWcuIElmIHByZXNlbnQgYW5kIGZhbHNlLFxuXHQgKiAgICAgdGhlbiBkb24ndCBydW4gYSBsaW5lLWxldmVsIGRpZmYgZmlyc3QgdG8gaWRlbnRpZnkgdGhlIGNoYW5nZWQgYXJlYXMuXG5cdCAqICAgICBEZWZhdWx0cyB0byB0cnVlLCB3aGljaCBkb2VzIGEgZmFzdGVyLCBzbGlnaHRseSBsZXNzIG9wdGltYWwgZGlmZi5cblx0ICogQHJldHVybiB7IUFycmF5LjwhRGlmZk1hdGNoUGF0Y2guRGlmZj59IEFycmF5IG9mIGRpZmYgdHVwbGVzLlxuXHQgKi9cblx0RGlmZk1hdGNoUGF0Y2gucHJvdG90eXBlLkRpZmZNYWluID0gZnVuY3Rpb24oIHRleHQxLCB0ZXh0Miwgb3B0Q2hlY2tsaW5lcyApIHtcblx0XHR2YXIgZGVhZGxpbmUsIGNoZWNrbGluZXMsIGNvbW1vbmxlbmd0aCxcblx0XHRcdGNvbW1vbnByZWZpeCwgY29tbW9uc3VmZml4LCBkaWZmcztcblxuXHRcdC8vIFRoZSBkaWZmIG11c3QgYmUgY29tcGxldGUgaW4gdXAgdG8gMSBzZWNvbmQuXG5cdFx0ZGVhZGxpbmUgPSAoIG5ldyBEYXRlKCkgKS5nZXRUaW1lKCkgKyAxMDAwO1xuXG5cdFx0Ly8gQ2hlY2sgZm9yIG51bGwgaW5wdXRzLlxuXHRcdGlmICggdGV4dDEgPT09IG51bGwgfHwgdGV4dDIgPT09IG51bGwgKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoIFwiTnVsbCBpbnB1dC4gKERpZmZNYWluKVwiICk7XG5cdFx0fVxuXG5cdFx0Ly8gQ2hlY2sgZm9yIGVxdWFsaXR5IChzcGVlZHVwKS5cblx0XHRpZiAoIHRleHQxID09PSB0ZXh0MiApIHtcblx0XHRcdGlmICggdGV4dDEgKSB7XG5cdFx0XHRcdHJldHVybiBbXG5cdFx0XHRcdFx0WyBESUZGX0VRVUFMLCB0ZXh0MSBdXG5cdFx0XHRcdF07XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gW107XG5cdFx0fVxuXG5cdFx0aWYgKCB0eXBlb2Ygb3B0Q2hlY2tsaW5lcyA9PT0gXCJ1bmRlZmluZWRcIiApIHtcblx0XHRcdG9wdENoZWNrbGluZXMgPSB0cnVlO1xuXHRcdH1cblxuXHRcdGNoZWNrbGluZXMgPSBvcHRDaGVja2xpbmVzO1xuXG5cdFx0Ly8gVHJpbSBvZmYgY29tbW9uIHByZWZpeCAoc3BlZWR1cCkuXG5cdFx0Y29tbW9ubGVuZ3RoID0gdGhpcy5kaWZmQ29tbW9uUHJlZml4KCB0ZXh0MSwgdGV4dDIgKTtcblx0XHRjb21tb25wcmVmaXggPSB0ZXh0MS5zdWJzdHJpbmcoIDAsIGNvbW1vbmxlbmd0aCApO1xuXHRcdHRleHQxID0gdGV4dDEuc3Vic3RyaW5nKCBjb21tb25sZW5ndGggKTtcblx0XHR0ZXh0MiA9IHRleHQyLnN1YnN0cmluZyggY29tbW9ubGVuZ3RoICk7XG5cblx0XHQvLyBUcmltIG9mZiBjb21tb24gc3VmZml4IChzcGVlZHVwKS5cblx0XHRjb21tb25sZW5ndGggPSB0aGlzLmRpZmZDb21tb25TdWZmaXgoIHRleHQxLCB0ZXh0MiApO1xuXHRcdGNvbW1vbnN1ZmZpeCA9IHRleHQxLnN1YnN0cmluZyggdGV4dDEubGVuZ3RoIC0gY29tbW9ubGVuZ3RoICk7XG5cdFx0dGV4dDEgPSB0ZXh0MS5zdWJzdHJpbmcoIDAsIHRleHQxLmxlbmd0aCAtIGNvbW1vbmxlbmd0aCApO1xuXHRcdHRleHQyID0gdGV4dDIuc3Vic3RyaW5nKCAwLCB0ZXh0Mi5sZW5ndGggLSBjb21tb25sZW5ndGggKTtcblxuXHRcdC8vIENvbXB1dGUgdGhlIGRpZmYgb24gdGhlIG1pZGRsZSBibG9jay5cblx0XHRkaWZmcyA9IHRoaXMuZGlmZkNvbXB1dGUoIHRleHQxLCB0ZXh0MiwgY2hlY2tsaW5lcywgZGVhZGxpbmUgKTtcblxuXHRcdC8vIFJlc3RvcmUgdGhlIHByZWZpeCBhbmQgc3VmZml4LlxuXHRcdGlmICggY29tbW9ucHJlZml4ICkge1xuXHRcdFx0ZGlmZnMudW5zaGlmdCggWyBESUZGX0VRVUFMLCBjb21tb25wcmVmaXggXSApO1xuXHRcdH1cblx0XHRpZiAoIGNvbW1vbnN1ZmZpeCApIHtcblx0XHRcdGRpZmZzLnB1c2goIFsgRElGRl9FUVVBTCwgY29tbW9uc3VmZml4IF0gKTtcblx0XHR9XG5cdFx0dGhpcy5kaWZmQ2xlYW51cE1lcmdlKCBkaWZmcyApO1xuXHRcdHJldHVybiBkaWZmcztcblx0fTtcblxuXHQvKipcblx0ICogUmVkdWNlIHRoZSBudW1iZXIgb2YgZWRpdHMgYnkgZWxpbWluYXRpbmcgb3BlcmF0aW9uYWxseSB0cml2aWFsIGVxdWFsaXRpZXMuXG5cdCAqIEBwYXJhbSB7IUFycmF5LjwhRGlmZk1hdGNoUGF0Y2guRGlmZj59IGRpZmZzIEFycmF5IG9mIGRpZmYgdHVwbGVzLlxuXHQgKi9cblx0RGlmZk1hdGNoUGF0Y2gucHJvdG90eXBlLmRpZmZDbGVhbnVwRWZmaWNpZW5jeSA9IGZ1bmN0aW9uKCBkaWZmcyApIHtcblx0XHR2YXIgY2hhbmdlcywgZXF1YWxpdGllcywgZXF1YWxpdGllc0xlbmd0aCwgbGFzdGVxdWFsaXR5LFxuXHRcdFx0cG9pbnRlciwgcHJlSW5zLCBwcmVEZWwsIHBvc3RJbnMsIHBvc3REZWw7XG5cdFx0Y2hhbmdlcyA9IGZhbHNlO1xuXHRcdGVxdWFsaXRpZXMgPSBbXTsgLy8gU3RhY2sgb2YgaW5kaWNlcyB3aGVyZSBlcXVhbGl0aWVzIGFyZSBmb3VuZC5cblx0XHRlcXVhbGl0aWVzTGVuZ3RoID0gMDsgLy8gS2VlcGluZyBvdXIgb3duIGxlbmd0aCB2YXIgaXMgZmFzdGVyIGluIEpTLlxuXHRcdC8qKiBAdHlwZSB7P3N0cmluZ30gKi9cblx0XHRsYXN0ZXF1YWxpdHkgPSBudWxsO1xuXHRcdC8vIEFsd2F5cyBlcXVhbCB0byBkaWZmc1tlcXVhbGl0aWVzW2VxdWFsaXRpZXNMZW5ndGggLSAxXV1bMV1cblx0XHRwb2ludGVyID0gMDsgLy8gSW5kZXggb2YgY3VycmVudCBwb3NpdGlvbi5cblx0XHQvLyBJcyB0aGVyZSBhbiBpbnNlcnRpb24gb3BlcmF0aW9uIGJlZm9yZSB0aGUgbGFzdCBlcXVhbGl0eS5cblx0XHRwcmVJbnMgPSBmYWxzZTtcblx0XHQvLyBJcyB0aGVyZSBhIGRlbGV0aW9uIG9wZXJhdGlvbiBiZWZvcmUgdGhlIGxhc3QgZXF1YWxpdHkuXG5cdFx0cHJlRGVsID0gZmFsc2U7XG5cdFx0Ly8gSXMgdGhlcmUgYW4gaW5zZXJ0aW9uIG9wZXJhdGlvbiBhZnRlciB0aGUgbGFzdCBlcXVhbGl0eS5cblx0XHRwb3N0SW5zID0gZmFsc2U7XG5cdFx0Ly8gSXMgdGhlcmUgYSBkZWxldGlvbiBvcGVyYXRpb24gYWZ0ZXIgdGhlIGxhc3QgZXF1YWxpdHkuXG5cdFx0cG9zdERlbCA9IGZhbHNlO1xuXHRcdHdoaWxlICggcG9pbnRlciA8IGRpZmZzLmxlbmd0aCApIHtcblxuXHRcdFx0Ly8gRXF1YWxpdHkgZm91bmQuXG5cdFx0XHRpZiAoIGRpZmZzWyBwb2ludGVyIF1bIDAgXSA9PT0gRElGRl9FUVVBTCApIHtcblx0XHRcdFx0aWYgKCBkaWZmc1sgcG9pbnRlciBdWyAxIF0ubGVuZ3RoIDwgNCAmJiAoIHBvc3RJbnMgfHwgcG9zdERlbCApICkge1xuXG5cdFx0XHRcdFx0Ly8gQ2FuZGlkYXRlIGZvdW5kLlxuXHRcdFx0XHRcdGVxdWFsaXRpZXNbIGVxdWFsaXRpZXNMZW5ndGgrKyBdID0gcG9pbnRlcjtcblx0XHRcdFx0XHRwcmVJbnMgPSBwb3N0SW5zO1xuXHRcdFx0XHRcdHByZURlbCA9IHBvc3REZWw7XG5cdFx0XHRcdFx0bGFzdGVxdWFsaXR5ID0gZGlmZnNbIHBvaW50ZXIgXVsgMSBdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdFx0Ly8gTm90IGEgY2FuZGlkYXRlLCBhbmQgY2FuIG5ldmVyIGJlY29tZSBvbmUuXG5cdFx0XHRcdFx0ZXF1YWxpdGllc0xlbmd0aCA9IDA7XG5cdFx0XHRcdFx0bGFzdGVxdWFsaXR5ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0XHRwb3N0SW5zID0gcG9zdERlbCA9IGZhbHNlO1xuXG5cdFx0XHQvLyBBbiBpbnNlcnRpb24gb3IgZGVsZXRpb24uXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGlmICggZGlmZnNbIHBvaW50ZXIgXVsgMCBdID09PSBESUZGX0RFTEVURSApIHtcblx0XHRcdFx0XHRwb3N0RGVsID0gdHJ1ZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRwb3N0SW5zID0gdHJ1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8qXG5cdFx0XHRcdCAqIEZpdmUgdHlwZXMgdG8gYmUgc3BsaXQ6XG5cdFx0XHRcdCAqIDxpbnM+QTwvaW5zPjxkZWw+QjwvZGVsPlhZPGlucz5DPC9pbnM+PGRlbD5EPC9kZWw+XG5cdFx0XHRcdCAqIDxpbnM+QTwvaW5zPlg8aW5zPkM8L2lucz48ZGVsPkQ8L2RlbD5cblx0XHRcdFx0ICogPGlucz5BPC9pbnM+PGRlbD5CPC9kZWw+WDxpbnM+QzwvaW5zPlxuXHRcdFx0XHQgKiA8aW5zPkE8L2RlbD5YPGlucz5DPC9pbnM+PGRlbD5EPC9kZWw+XG5cdFx0XHRcdCAqIDxpbnM+QTwvaW5zPjxkZWw+QjwvZGVsPlg8ZGVsPkM8L2RlbD5cblx0XHRcdFx0ICovXG5cdFx0XHRcdGlmICggbGFzdGVxdWFsaXR5ICYmICggKCBwcmVJbnMgJiYgcHJlRGVsICYmIHBvc3RJbnMgJiYgcG9zdERlbCApIHx8XG5cdFx0XHRcdFx0XHQoICggbGFzdGVxdWFsaXR5Lmxlbmd0aCA8IDIgKSAmJlxuXHRcdFx0XHRcdFx0KCBwcmVJbnMgKyBwcmVEZWwgKyBwb3N0SW5zICsgcG9zdERlbCApID09PSAzICkgKSApIHtcblxuXHRcdFx0XHRcdC8vIER1cGxpY2F0ZSByZWNvcmQuXG5cdFx0XHRcdFx0ZGlmZnMuc3BsaWNlKFxuXHRcdFx0XHRcdFx0ZXF1YWxpdGllc1sgZXF1YWxpdGllc0xlbmd0aCAtIDEgXSxcblx0XHRcdFx0XHRcdDAsXG5cdFx0XHRcdFx0XHRbIERJRkZfREVMRVRFLCBsYXN0ZXF1YWxpdHkgXVxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHQvLyBDaGFuZ2Ugc2Vjb25kIGNvcHkgdG8gaW5zZXJ0LlxuXHRcdFx0XHRcdGRpZmZzWyBlcXVhbGl0aWVzWyBlcXVhbGl0aWVzTGVuZ3RoIC0gMSBdICsgMSBdWyAwIF0gPSBESUZGX0lOU0VSVDtcblx0XHRcdFx0XHRlcXVhbGl0aWVzTGVuZ3RoLS07IC8vIFRocm93IGF3YXkgdGhlIGVxdWFsaXR5IHdlIGp1c3QgZGVsZXRlZDtcblx0XHRcdFx0XHRsYXN0ZXF1YWxpdHkgPSBudWxsO1xuXHRcdFx0XHRcdGlmICggcHJlSW5zICYmIHByZURlbCApIHtcblx0XHRcdFx0XHRcdC8vIE5vIGNoYW5nZXMgbWFkZSB3aGljaCBjb3VsZCBhZmZlY3QgcHJldmlvdXMgZW50cnksIGtlZXAgZ29pbmcuXG5cdFx0XHRcdFx0XHRwb3N0SW5zID0gcG9zdERlbCA9IHRydWU7XG5cdFx0XHRcdFx0XHRlcXVhbGl0aWVzTGVuZ3RoID0gMDtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZXF1YWxpdGllc0xlbmd0aC0tOyAvLyBUaHJvdyBhd2F5IHRoZSBwcmV2aW91cyBlcXVhbGl0eS5cblx0XHRcdFx0XHRcdHBvaW50ZXIgPSBlcXVhbGl0aWVzTGVuZ3RoID4gMCA/IGVxdWFsaXRpZXNbIGVxdWFsaXRpZXNMZW5ndGggLSAxIF0gOiAtMTtcblx0XHRcdFx0XHRcdHBvc3RJbnMgPSBwb3N0RGVsID0gZmFsc2U7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGNoYW5nZXMgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRwb2ludGVyKys7XG5cdFx0fVxuXG5cdFx0aWYgKCBjaGFuZ2VzICkge1xuXHRcdFx0dGhpcy5kaWZmQ2xlYW51cE1lcmdlKCBkaWZmcyApO1xuXHRcdH1cblx0fTtcblxuXHQvKipcblx0ICogQ29udmVydCBhIGRpZmYgYXJyYXkgaW50byBhIHByZXR0eSBIVE1MIHJlcG9ydC5cblx0ICogQHBhcmFtIHshQXJyYXkuPCFEaWZmTWF0Y2hQYXRjaC5EaWZmPn0gZGlmZnMgQXJyYXkgb2YgZGlmZiB0dXBsZXMuXG5cdCAqIEBwYXJhbSB7aW50ZWdlcn0gc3RyaW5nIHRvIGJlIGJlYXV0aWZpZWQuXG5cdCAqIEByZXR1cm4ge3N0cmluZ30gSFRNTCByZXByZXNlbnRhdGlvbi5cblx0ICovXG5cdERpZmZNYXRjaFBhdGNoLnByb3RvdHlwZS5kaWZmUHJldHR5SHRtbCA9IGZ1bmN0aW9uKCBkaWZmcyApIHtcblx0XHR2YXIgb3AsIGRhdGEsIHgsXG5cdFx0XHRodG1sID0gW107XG5cdFx0Zm9yICggeCA9IDA7IHggPCBkaWZmcy5sZW5ndGg7IHgrKyApIHtcblx0XHRcdG9wID0gZGlmZnNbIHggXVsgMCBdOyAvLyBPcGVyYXRpb24gKGluc2VydCwgZGVsZXRlLCBlcXVhbClcblx0XHRcdGRhdGEgPSBkaWZmc1sgeCBdWyAxIF07IC8vIFRleHQgb2YgY2hhbmdlLlxuXHRcdFx0c3dpdGNoICggb3AgKSB7XG5cdFx0XHRjYXNlIERJRkZfSU5TRVJUOlxuXHRcdFx0XHRodG1sWyB4IF0gPSBcIjxpbnM+XCIgKyBkYXRhICsgXCI8L2lucz5cIjtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIERJRkZfREVMRVRFOlxuXHRcdFx0XHRodG1sWyB4IF0gPSBcIjxkZWw+XCIgKyBkYXRhICsgXCI8L2RlbD5cIjtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIERJRkZfRVFVQUw6XG5cdFx0XHRcdGh0bWxbIHggXSA9IFwiPHNwYW4+XCIgKyBkYXRhICsgXCI8L3NwYW4+XCI7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gaHRtbC5qb2luKCBcIlwiICk7XG5cdH07XG5cblx0LyoqXG5cdCAqIERldGVybWluZSB0aGUgY29tbW9uIHByZWZpeCBvZiB0d28gc3RyaW5ncy5cblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQxIEZpcnN0IHN0cmluZy5cblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQyIFNlY29uZCBzdHJpbmcuXG5cdCAqIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBjaGFyYWN0ZXJzIGNvbW1vbiB0byB0aGUgc3RhcnQgb2YgZWFjaFxuXHQgKiAgICAgc3RyaW5nLlxuXHQgKi9cblx0RGlmZk1hdGNoUGF0Y2gucHJvdG90eXBlLmRpZmZDb21tb25QcmVmaXggPSBmdW5jdGlvbiggdGV4dDEsIHRleHQyICkge1xuXHRcdHZhciBwb2ludGVybWlkLCBwb2ludGVybWF4LCBwb2ludGVybWluLCBwb2ludGVyc3RhcnQ7XG5cdFx0Ly8gUXVpY2sgY2hlY2sgZm9yIGNvbW1vbiBudWxsIGNhc2VzLlxuXHRcdGlmICggIXRleHQxIHx8ICF0ZXh0MiB8fCB0ZXh0MS5jaGFyQXQoIDAgKSAhPT0gdGV4dDIuY2hhckF0KCAwICkgKSB7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cdFx0Ly8gQmluYXJ5IHNlYXJjaC5cblx0XHQvLyBQZXJmb3JtYW5jZSBhbmFseXNpczogaHR0cDovL25laWwuZnJhc2VyLm5hbWUvbmV3cy8yMDA3LzEwLzA5L1xuXHRcdHBvaW50ZXJtaW4gPSAwO1xuXHRcdHBvaW50ZXJtYXggPSBNYXRoLm1pbiggdGV4dDEubGVuZ3RoLCB0ZXh0Mi5sZW5ndGggKTtcblx0XHRwb2ludGVybWlkID0gcG9pbnRlcm1heDtcblx0XHRwb2ludGVyc3RhcnQgPSAwO1xuXHRcdHdoaWxlICggcG9pbnRlcm1pbiA8IHBvaW50ZXJtaWQgKSB7XG5cdFx0XHRpZiAoIHRleHQxLnN1YnN0cmluZyggcG9pbnRlcnN0YXJ0LCBwb2ludGVybWlkICkgPT09XG5cdFx0XHRcdFx0dGV4dDIuc3Vic3RyaW5nKCBwb2ludGVyc3RhcnQsIHBvaW50ZXJtaWQgKSApIHtcblx0XHRcdFx0cG9pbnRlcm1pbiA9IHBvaW50ZXJtaWQ7XG5cdFx0XHRcdHBvaW50ZXJzdGFydCA9IHBvaW50ZXJtaW47XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRwb2ludGVybWF4ID0gcG9pbnRlcm1pZDtcblx0XHRcdH1cblx0XHRcdHBvaW50ZXJtaWQgPSBNYXRoLmZsb29yKCAoIHBvaW50ZXJtYXggLSBwb2ludGVybWluICkgLyAyICsgcG9pbnRlcm1pbiApO1xuXHRcdH1cblx0XHRyZXR1cm4gcG9pbnRlcm1pZDtcblx0fTtcblxuXHQvKipcblx0ICogRGV0ZXJtaW5lIHRoZSBjb21tb24gc3VmZml4IG9mIHR3byBzdHJpbmdzLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dDEgRmlyc3Qgc3RyaW5nLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dDIgU2Vjb25kIHN0cmluZy5cblx0ICogQHJldHVybiB7bnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoYXJhY3RlcnMgY29tbW9uIHRvIHRoZSBlbmQgb2YgZWFjaCBzdHJpbmcuXG5cdCAqL1xuXHREaWZmTWF0Y2hQYXRjaC5wcm90b3R5cGUuZGlmZkNvbW1vblN1ZmZpeCA9IGZ1bmN0aW9uKCB0ZXh0MSwgdGV4dDIgKSB7XG5cdFx0dmFyIHBvaW50ZXJtaWQsIHBvaW50ZXJtYXgsIHBvaW50ZXJtaW4sIHBvaW50ZXJlbmQ7XG5cdFx0Ly8gUXVpY2sgY2hlY2sgZm9yIGNvbW1vbiBudWxsIGNhc2VzLlxuXHRcdGlmICggIXRleHQxIHx8XG5cdFx0XHRcdCF0ZXh0MiB8fFxuXHRcdFx0XHR0ZXh0MS5jaGFyQXQoIHRleHQxLmxlbmd0aCAtIDEgKSAhPT0gdGV4dDIuY2hhckF0KCB0ZXh0Mi5sZW5ndGggLSAxICkgKSB7XG5cdFx0XHRyZXR1cm4gMDtcblx0XHR9XG5cdFx0Ly8gQmluYXJ5IHNlYXJjaC5cblx0XHQvLyBQZXJmb3JtYW5jZSBhbmFseXNpczogaHR0cDovL25laWwuZnJhc2VyLm5hbWUvbmV3cy8yMDA3LzEwLzA5L1xuXHRcdHBvaW50ZXJtaW4gPSAwO1xuXHRcdHBvaW50ZXJtYXggPSBNYXRoLm1pbiggdGV4dDEubGVuZ3RoLCB0ZXh0Mi5sZW5ndGggKTtcblx0XHRwb2ludGVybWlkID0gcG9pbnRlcm1heDtcblx0XHRwb2ludGVyZW5kID0gMDtcblx0XHR3aGlsZSAoIHBvaW50ZXJtaW4gPCBwb2ludGVybWlkICkge1xuXHRcdFx0aWYgKCB0ZXh0MS5zdWJzdHJpbmcoIHRleHQxLmxlbmd0aCAtIHBvaW50ZXJtaWQsIHRleHQxLmxlbmd0aCAtIHBvaW50ZXJlbmQgKSA9PT1cblx0XHRcdFx0XHR0ZXh0Mi5zdWJzdHJpbmcoIHRleHQyLmxlbmd0aCAtIHBvaW50ZXJtaWQsIHRleHQyLmxlbmd0aCAtIHBvaW50ZXJlbmQgKSApIHtcblx0XHRcdFx0cG9pbnRlcm1pbiA9IHBvaW50ZXJtaWQ7XG5cdFx0XHRcdHBvaW50ZXJlbmQgPSBwb2ludGVybWluO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cG9pbnRlcm1heCA9IHBvaW50ZXJtaWQ7XG5cdFx0XHR9XG5cdFx0XHRwb2ludGVybWlkID0gTWF0aC5mbG9vciggKCBwb2ludGVybWF4IC0gcG9pbnRlcm1pbiApIC8gMiArIHBvaW50ZXJtaW4gKTtcblx0XHR9XG5cdFx0cmV0dXJuIHBvaW50ZXJtaWQ7XG5cdH07XG5cblx0LyoqXG5cdCAqIEZpbmQgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gdHdvIHRleHRzLiAgQXNzdW1lcyB0aGF0IHRoZSB0ZXh0cyBkbyBub3Rcblx0ICogaGF2ZSBhbnkgY29tbW9uIHByZWZpeCBvciBzdWZmaXguXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MSBPbGQgc3RyaW5nIHRvIGJlIGRpZmZlZC5cblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQyIE5ldyBzdHJpbmcgdG8gYmUgZGlmZmVkLlxuXHQgKiBAcGFyYW0ge2Jvb2xlYW59IGNoZWNrbGluZXMgU3BlZWR1cCBmbGFnLiAgSWYgZmFsc2UsIHRoZW4gZG9uJ3QgcnVuIGFcblx0ICogICAgIGxpbmUtbGV2ZWwgZGlmZiBmaXJzdCB0byBpZGVudGlmeSB0aGUgY2hhbmdlZCBhcmVhcy5cblx0ICogICAgIElmIHRydWUsIHRoZW4gcnVuIGEgZmFzdGVyLCBzbGlnaHRseSBsZXNzIG9wdGltYWwgZGlmZi5cblx0ICogQHBhcmFtIHtudW1iZXJ9IGRlYWRsaW5lIFRpbWUgd2hlbiB0aGUgZGlmZiBzaG91bGQgYmUgY29tcGxldGUgYnkuXG5cdCAqIEByZXR1cm4geyFBcnJheS48IURpZmZNYXRjaFBhdGNoLkRpZmY+fSBBcnJheSBvZiBkaWZmIHR1cGxlcy5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdERpZmZNYXRjaFBhdGNoLnByb3RvdHlwZS5kaWZmQ29tcHV0ZSA9IGZ1bmN0aW9uKCB0ZXh0MSwgdGV4dDIsIGNoZWNrbGluZXMsIGRlYWRsaW5lICkge1xuXHRcdHZhciBkaWZmcywgbG9uZ3RleHQsIHNob3J0dGV4dCwgaSwgaG0sXG5cdFx0XHR0ZXh0MUEsIHRleHQyQSwgdGV4dDFCLCB0ZXh0MkIsXG5cdFx0XHRtaWRDb21tb24sIGRpZmZzQSwgZGlmZnNCO1xuXG5cdFx0aWYgKCAhdGV4dDEgKSB7XG5cdFx0XHQvLyBKdXN0IGFkZCBzb21lIHRleHQgKHNwZWVkdXApLlxuXHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0WyBESUZGX0lOU0VSVCwgdGV4dDIgXVxuXHRcdFx0XTtcblx0XHR9XG5cblx0XHRpZiAoICF0ZXh0MiApIHtcblx0XHRcdC8vIEp1c3QgZGVsZXRlIHNvbWUgdGV4dCAoc3BlZWR1cCkuXG5cdFx0XHRyZXR1cm4gW1xuXHRcdFx0XHRbIERJRkZfREVMRVRFLCB0ZXh0MSBdXG5cdFx0XHRdO1xuXHRcdH1cblxuXHRcdGxvbmd0ZXh0ID0gdGV4dDEubGVuZ3RoID4gdGV4dDIubGVuZ3RoID8gdGV4dDEgOiB0ZXh0Mjtcblx0XHRzaG9ydHRleHQgPSB0ZXh0MS5sZW5ndGggPiB0ZXh0Mi5sZW5ndGggPyB0ZXh0MiA6IHRleHQxO1xuXHRcdGkgPSBsb25ndGV4dC5pbmRleE9mKCBzaG9ydHRleHQgKTtcblx0XHRpZiAoIGkgIT09IC0xICkge1xuXHRcdFx0Ly8gU2hvcnRlciB0ZXh0IGlzIGluc2lkZSB0aGUgbG9uZ2VyIHRleHQgKHNwZWVkdXApLlxuXHRcdFx0ZGlmZnMgPSBbXG5cdFx0XHRcdFsgRElGRl9JTlNFUlQsIGxvbmd0ZXh0LnN1YnN0cmluZyggMCwgaSApIF0sXG5cdFx0XHRcdFsgRElGRl9FUVVBTCwgc2hvcnR0ZXh0IF0sXG5cdFx0XHRcdFsgRElGRl9JTlNFUlQsIGxvbmd0ZXh0LnN1YnN0cmluZyggaSArIHNob3J0dGV4dC5sZW5ndGggKSBdXG5cdFx0XHRdO1xuXHRcdFx0Ly8gU3dhcCBpbnNlcnRpb25zIGZvciBkZWxldGlvbnMgaWYgZGlmZiBpcyByZXZlcnNlZC5cblx0XHRcdGlmICggdGV4dDEubGVuZ3RoID4gdGV4dDIubGVuZ3RoICkge1xuXHRcdFx0XHRkaWZmc1sgMCBdWyAwIF0gPSBkaWZmc1sgMiBdWyAwIF0gPSBESUZGX0RFTEVURTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBkaWZmcztcblx0XHR9XG5cblx0XHRpZiAoIHNob3J0dGV4dC5sZW5ndGggPT09IDEgKSB7XG5cdFx0XHQvLyBTaW5nbGUgY2hhcmFjdGVyIHN0cmluZy5cblx0XHRcdC8vIEFmdGVyIHRoZSBwcmV2aW91cyBzcGVlZHVwLCB0aGUgY2hhcmFjdGVyIGNhbid0IGJlIGFuIGVxdWFsaXR5LlxuXHRcdFx0cmV0dXJuIFtcblx0XHRcdFx0WyBESUZGX0RFTEVURSwgdGV4dDEgXSxcblx0XHRcdFx0WyBESUZGX0lOU0VSVCwgdGV4dDIgXVxuXHRcdFx0XTtcblx0XHR9XG5cblx0XHQvLyBDaGVjayB0byBzZWUgaWYgdGhlIHByb2JsZW0gY2FuIGJlIHNwbGl0IGluIHR3by5cblx0XHRobSA9IHRoaXMuZGlmZkhhbGZNYXRjaCggdGV4dDEsIHRleHQyICk7XG5cdFx0aWYgKCBobSApIHtcblx0XHRcdC8vIEEgaGFsZi1tYXRjaCB3YXMgZm91bmQsIHNvcnQgb3V0IHRoZSByZXR1cm4gZGF0YS5cblx0XHRcdHRleHQxQSA9IGhtWyAwIF07XG5cdFx0XHR0ZXh0MUIgPSBobVsgMSBdO1xuXHRcdFx0dGV4dDJBID0gaG1bIDIgXTtcblx0XHRcdHRleHQyQiA9IGhtWyAzIF07XG5cdFx0XHRtaWRDb21tb24gPSBobVsgNCBdO1xuXHRcdFx0Ly8gU2VuZCBib3RoIHBhaXJzIG9mZiBmb3Igc2VwYXJhdGUgcHJvY2Vzc2luZy5cblx0XHRcdGRpZmZzQSA9IHRoaXMuRGlmZk1haW4oIHRleHQxQSwgdGV4dDJBLCBjaGVja2xpbmVzLCBkZWFkbGluZSApO1xuXHRcdFx0ZGlmZnNCID0gdGhpcy5EaWZmTWFpbiggdGV4dDFCLCB0ZXh0MkIsIGNoZWNrbGluZXMsIGRlYWRsaW5lICk7XG5cdFx0XHQvLyBNZXJnZSB0aGUgcmVzdWx0cy5cblx0XHRcdHJldHVybiBkaWZmc0EuY29uY2F0KCBbXG5cdFx0XHRcdFsgRElGRl9FUVVBTCwgbWlkQ29tbW9uIF1cblx0XHRcdF0sIGRpZmZzQiApO1xuXHRcdH1cblxuXHRcdGlmICggY2hlY2tsaW5lcyAmJiB0ZXh0MS5sZW5ndGggPiAxMDAgJiYgdGV4dDIubGVuZ3RoID4gMTAwICkge1xuXHRcdFx0cmV0dXJuIHRoaXMuZGlmZkxpbmVNb2RlKCB0ZXh0MSwgdGV4dDIsIGRlYWRsaW5lICk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXMuZGlmZkJpc2VjdCggdGV4dDEsIHRleHQyLCBkZWFkbGluZSApO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBEbyB0aGUgdHdvIHRleHRzIHNoYXJlIGEgc3Vic3RyaW5nIHdoaWNoIGlzIGF0IGxlYXN0IGhhbGYgdGhlIGxlbmd0aCBvZiB0aGVcblx0ICogbG9uZ2VyIHRleHQ/XG5cdCAqIFRoaXMgc3BlZWR1cCBjYW4gcHJvZHVjZSBub24tbWluaW1hbCBkaWZmcy5cblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQxIEZpcnN0IHN0cmluZy5cblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQyIFNlY29uZCBzdHJpbmcuXG5cdCAqIEByZXR1cm4ge0FycmF5LjxzdHJpbmc+fSBGaXZlIGVsZW1lbnQgQXJyYXksIGNvbnRhaW5pbmcgdGhlIHByZWZpeCBvZlxuXHQgKiAgICAgdGV4dDEsIHRoZSBzdWZmaXggb2YgdGV4dDEsIHRoZSBwcmVmaXggb2YgdGV4dDIsIHRoZSBzdWZmaXggb2Zcblx0ICogICAgIHRleHQyIGFuZCB0aGUgY29tbW9uIG1pZGRsZS4gIE9yIG51bGwgaWYgdGhlcmUgd2FzIG5vIG1hdGNoLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0RGlmZk1hdGNoUGF0Y2gucHJvdG90eXBlLmRpZmZIYWxmTWF0Y2ggPSBmdW5jdGlvbiggdGV4dDEsIHRleHQyICkge1xuXHRcdHZhciBsb25ndGV4dCwgc2hvcnR0ZXh0LCBkbXAsXG5cdFx0XHR0ZXh0MUEsIHRleHQyQiwgdGV4dDJBLCB0ZXh0MUIsIG1pZENvbW1vbixcblx0XHRcdGhtMSwgaG0yLCBobTtcblxuXHRcdGxvbmd0ZXh0ID0gdGV4dDEubGVuZ3RoID4gdGV4dDIubGVuZ3RoID8gdGV4dDEgOiB0ZXh0Mjtcblx0XHRzaG9ydHRleHQgPSB0ZXh0MS5sZW5ndGggPiB0ZXh0Mi5sZW5ndGggPyB0ZXh0MiA6IHRleHQxO1xuXHRcdGlmICggbG9uZ3RleHQubGVuZ3RoIDwgNCB8fCBzaG9ydHRleHQubGVuZ3RoICogMiA8IGxvbmd0ZXh0Lmxlbmd0aCApIHtcblx0XHRcdHJldHVybiBudWxsOyAvLyBQb2ludGxlc3MuXG5cdFx0fVxuXHRcdGRtcCA9IHRoaXM7IC8vICd0aGlzJyBiZWNvbWVzICd3aW5kb3cnIGluIGEgY2xvc3VyZS5cblxuXHRcdC8qKlxuXHRcdCAqIERvZXMgYSBzdWJzdHJpbmcgb2Ygc2hvcnR0ZXh0IGV4aXN0IHdpdGhpbiBsb25ndGV4dCBzdWNoIHRoYXQgdGhlIHN1YnN0cmluZ1xuXHRcdCAqIGlzIGF0IGxlYXN0IGhhbGYgdGhlIGxlbmd0aCBvZiBsb25ndGV4dD9cblx0XHQgKiBDbG9zdXJlLCBidXQgZG9lcyBub3QgcmVmZXJlbmNlIGFueSBleHRlcm5hbCB2YXJpYWJsZXMuXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IGxvbmd0ZXh0IExvbmdlciBzdHJpbmcuXG5cdFx0ICogQHBhcmFtIHtzdHJpbmd9IHNob3J0dGV4dCBTaG9ydGVyIHN0cmluZy5cblx0XHQgKiBAcGFyYW0ge251bWJlcn0gaSBTdGFydCBpbmRleCBvZiBxdWFydGVyIGxlbmd0aCBzdWJzdHJpbmcgd2l0aGluIGxvbmd0ZXh0LlxuXHRcdCAqIEByZXR1cm4ge0FycmF5LjxzdHJpbmc+fSBGaXZlIGVsZW1lbnQgQXJyYXksIGNvbnRhaW5pbmcgdGhlIHByZWZpeCBvZlxuXHRcdCAqICAgICBsb25ndGV4dCwgdGhlIHN1ZmZpeCBvZiBsb25ndGV4dCwgdGhlIHByZWZpeCBvZiBzaG9ydHRleHQsIHRoZSBzdWZmaXhcblx0XHQgKiAgICAgb2Ygc2hvcnR0ZXh0IGFuZCB0aGUgY29tbW9uIG1pZGRsZS4gIE9yIG51bGwgaWYgdGhlcmUgd2FzIG5vIG1hdGNoLlxuXHRcdCAqIEBwcml2YXRlXG5cdFx0ICovXG5cdFx0ZnVuY3Rpb24gZGlmZkhhbGZNYXRjaEkoIGxvbmd0ZXh0LCBzaG9ydHRleHQsIGkgKSB7XG5cdFx0XHR2YXIgc2VlZCwgaiwgYmVzdENvbW1vbiwgcHJlZml4TGVuZ3RoLCBzdWZmaXhMZW5ndGgsXG5cdFx0XHRcdGJlc3RMb25ndGV4dEEsIGJlc3RMb25ndGV4dEIsIGJlc3RTaG9ydHRleHRBLCBiZXN0U2hvcnR0ZXh0Qjtcblx0XHRcdC8vIFN0YXJ0IHdpdGggYSAxLzQgbGVuZ3RoIHN1YnN0cmluZyBhdCBwb3NpdGlvbiBpIGFzIGEgc2VlZC5cblx0XHRcdHNlZWQgPSBsb25ndGV4dC5zdWJzdHJpbmcoIGksIGkgKyBNYXRoLmZsb29yKCBsb25ndGV4dC5sZW5ndGggLyA0ICkgKTtcblx0XHRcdGogPSAtMTtcblx0XHRcdGJlc3RDb21tb24gPSBcIlwiO1xuXHRcdFx0d2hpbGUgKCAoIGogPSBzaG9ydHRleHQuaW5kZXhPZiggc2VlZCwgaiArIDEgKSApICE9PSAtMSApIHtcblx0XHRcdFx0cHJlZml4TGVuZ3RoID0gZG1wLmRpZmZDb21tb25QcmVmaXgoIGxvbmd0ZXh0LnN1YnN0cmluZyggaSApLFxuXHRcdFx0XHRcdHNob3J0dGV4dC5zdWJzdHJpbmcoIGogKSApO1xuXHRcdFx0XHRzdWZmaXhMZW5ndGggPSBkbXAuZGlmZkNvbW1vblN1ZmZpeCggbG9uZ3RleHQuc3Vic3RyaW5nKCAwLCBpICksXG5cdFx0XHRcdFx0c2hvcnR0ZXh0LnN1YnN0cmluZyggMCwgaiApICk7XG5cdFx0XHRcdGlmICggYmVzdENvbW1vbi5sZW5ndGggPCBzdWZmaXhMZW5ndGggKyBwcmVmaXhMZW5ndGggKSB7XG5cdFx0XHRcdFx0YmVzdENvbW1vbiA9IHNob3J0dGV4dC5zdWJzdHJpbmcoIGogLSBzdWZmaXhMZW5ndGgsIGogKSArXG5cdFx0XHRcdFx0XHRzaG9ydHRleHQuc3Vic3RyaW5nKCBqLCBqICsgcHJlZml4TGVuZ3RoICk7XG5cdFx0XHRcdFx0YmVzdExvbmd0ZXh0QSA9IGxvbmd0ZXh0LnN1YnN0cmluZyggMCwgaSAtIHN1ZmZpeExlbmd0aCApO1xuXHRcdFx0XHRcdGJlc3RMb25ndGV4dEIgPSBsb25ndGV4dC5zdWJzdHJpbmcoIGkgKyBwcmVmaXhMZW5ndGggKTtcblx0XHRcdFx0XHRiZXN0U2hvcnR0ZXh0QSA9IHNob3J0dGV4dC5zdWJzdHJpbmcoIDAsIGogLSBzdWZmaXhMZW5ndGggKTtcblx0XHRcdFx0XHRiZXN0U2hvcnR0ZXh0QiA9IHNob3J0dGV4dC5zdWJzdHJpbmcoIGogKyBwcmVmaXhMZW5ndGggKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKCBiZXN0Q29tbW9uLmxlbmd0aCAqIDIgPj0gbG9uZ3RleHQubGVuZ3RoICkge1xuXHRcdFx0XHRyZXR1cm4gWyBiZXN0TG9uZ3RleHRBLCBiZXN0TG9uZ3RleHRCLFxuXHRcdFx0XHRcdGJlc3RTaG9ydHRleHRBLCBiZXN0U2hvcnR0ZXh0QiwgYmVzdENvbW1vblxuXHRcdFx0XHRdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gRmlyc3QgY2hlY2sgaWYgdGhlIHNlY29uZCBxdWFydGVyIGlzIHRoZSBzZWVkIGZvciBhIGhhbGYtbWF0Y2guXG5cdFx0aG0xID0gZGlmZkhhbGZNYXRjaEkoIGxvbmd0ZXh0LCBzaG9ydHRleHQsXG5cdFx0XHRNYXRoLmNlaWwoIGxvbmd0ZXh0Lmxlbmd0aCAvIDQgKSApO1xuXHRcdC8vIENoZWNrIGFnYWluIGJhc2VkIG9uIHRoZSB0aGlyZCBxdWFydGVyLlxuXHRcdGhtMiA9IGRpZmZIYWxmTWF0Y2hJKCBsb25ndGV4dCwgc2hvcnR0ZXh0LFxuXHRcdFx0TWF0aC5jZWlsKCBsb25ndGV4dC5sZW5ndGggLyAyICkgKTtcblx0XHRpZiAoICFobTEgJiYgIWhtMiApIHtcblx0XHRcdHJldHVybiBudWxsO1xuXHRcdH0gZWxzZSBpZiAoICFobTIgKSB7XG5cdFx0XHRobSA9IGhtMTtcblx0XHR9IGVsc2UgaWYgKCAhaG0xICkge1xuXHRcdFx0aG0gPSBobTI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIEJvdGggbWF0Y2hlZC4gIFNlbGVjdCB0aGUgbG9uZ2VzdC5cblx0XHRcdGhtID0gaG0xWyA0IF0ubGVuZ3RoID4gaG0yWyA0IF0ubGVuZ3RoID8gaG0xIDogaG0yO1xuXHRcdH1cblxuXHRcdC8vIEEgaGFsZi1tYXRjaCB3YXMgZm91bmQsIHNvcnQgb3V0IHRoZSByZXR1cm4gZGF0YS5cblx0XHR0ZXh0MUEsIHRleHQxQiwgdGV4dDJBLCB0ZXh0MkI7XG5cdFx0aWYgKCB0ZXh0MS5sZW5ndGggPiB0ZXh0Mi5sZW5ndGggKSB7XG5cdFx0XHR0ZXh0MUEgPSBobVsgMCBdO1xuXHRcdFx0dGV4dDFCID0gaG1bIDEgXTtcblx0XHRcdHRleHQyQSA9IGhtWyAyIF07XG5cdFx0XHR0ZXh0MkIgPSBobVsgMyBdO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0ZXh0MkEgPSBobVsgMCBdO1xuXHRcdFx0dGV4dDJCID0gaG1bIDEgXTtcblx0XHRcdHRleHQxQSA9IGhtWyAyIF07XG5cdFx0XHR0ZXh0MUIgPSBobVsgMyBdO1xuXHRcdH1cblx0XHRtaWRDb21tb24gPSBobVsgNCBdO1xuXHRcdHJldHVybiBbIHRleHQxQSwgdGV4dDFCLCB0ZXh0MkEsIHRleHQyQiwgbWlkQ29tbW9uIF07XG5cdH07XG5cblx0LyoqXG5cdCAqIERvIGEgcXVpY2sgbGluZS1sZXZlbCBkaWZmIG9uIGJvdGggc3RyaW5ncywgdGhlbiByZWRpZmYgdGhlIHBhcnRzIGZvclxuXHQgKiBncmVhdGVyIGFjY3VyYWN5LlxuXHQgKiBUaGlzIHNwZWVkdXAgY2FuIHByb2R1Y2Ugbm9uLW1pbmltYWwgZGlmZnMuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MSBPbGQgc3RyaW5nIHRvIGJlIGRpZmZlZC5cblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQyIE5ldyBzdHJpbmcgdG8gYmUgZGlmZmVkLlxuXHQgKiBAcGFyYW0ge251bWJlcn0gZGVhZGxpbmUgVGltZSB3aGVuIHRoZSBkaWZmIHNob3VsZCBiZSBjb21wbGV0ZSBieS5cblx0ICogQHJldHVybiB7IUFycmF5LjwhRGlmZk1hdGNoUGF0Y2guRGlmZj59IEFycmF5IG9mIGRpZmYgdHVwbGVzLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0RGlmZk1hdGNoUGF0Y2gucHJvdG90eXBlLmRpZmZMaW5lTW9kZSA9IGZ1bmN0aW9uKCB0ZXh0MSwgdGV4dDIsIGRlYWRsaW5lICkge1xuXHRcdHZhciBhLCBkaWZmcywgbGluZWFycmF5LCBwb2ludGVyLCBjb3VudEluc2VydCxcblx0XHRcdGNvdW50RGVsZXRlLCB0ZXh0SW5zZXJ0LCB0ZXh0RGVsZXRlLCBqO1xuXHRcdC8vIFNjYW4gdGhlIHRleHQgb24gYSBsaW5lLWJ5LWxpbmUgYmFzaXMgZmlyc3QuXG5cdFx0YSA9IHRoaXMuZGlmZkxpbmVzVG9DaGFycyggdGV4dDEsIHRleHQyICk7XG5cdFx0dGV4dDEgPSBhLmNoYXJzMTtcblx0XHR0ZXh0MiA9IGEuY2hhcnMyO1xuXHRcdGxpbmVhcnJheSA9IGEubGluZUFycmF5O1xuXG5cdFx0ZGlmZnMgPSB0aGlzLkRpZmZNYWluKCB0ZXh0MSwgdGV4dDIsIGZhbHNlLCBkZWFkbGluZSApO1xuXG5cdFx0Ly8gQ29udmVydCB0aGUgZGlmZiBiYWNrIHRvIG9yaWdpbmFsIHRleHQuXG5cdFx0dGhpcy5kaWZmQ2hhcnNUb0xpbmVzKCBkaWZmcywgbGluZWFycmF5ICk7XG5cdFx0Ly8gRWxpbWluYXRlIGZyZWFrIG1hdGNoZXMgKGUuZy4gYmxhbmsgbGluZXMpXG5cdFx0dGhpcy5kaWZmQ2xlYW51cFNlbWFudGljKCBkaWZmcyApO1xuXG5cdFx0Ly8gUmVkaWZmIGFueSByZXBsYWNlbWVudCBibG9ja3MsIHRoaXMgdGltZSBjaGFyYWN0ZXItYnktY2hhcmFjdGVyLlxuXHRcdC8vIEFkZCBhIGR1bW15IGVudHJ5IGF0IHRoZSBlbmQuXG5cdFx0ZGlmZnMucHVzaCggWyBESUZGX0VRVUFMLCBcIlwiIF0gKTtcblx0XHRwb2ludGVyID0gMDtcblx0XHRjb3VudERlbGV0ZSA9IDA7XG5cdFx0Y291bnRJbnNlcnQgPSAwO1xuXHRcdHRleHREZWxldGUgPSBcIlwiO1xuXHRcdHRleHRJbnNlcnQgPSBcIlwiO1xuXHRcdHdoaWxlICggcG9pbnRlciA8IGRpZmZzLmxlbmd0aCApIHtcblx0XHRcdHN3aXRjaCAoIGRpZmZzWyBwb2ludGVyIF1bIDAgXSApIHtcblx0XHRcdGNhc2UgRElGRl9JTlNFUlQ6XG5cdFx0XHRcdGNvdW50SW5zZXJ0Kys7XG5cdFx0XHRcdHRleHRJbnNlcnQgKz0gZGlmZnNbIHBvaW50ZXIgXVsgMSBdO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgRElGRl9ERUxFVEU6XG5cdFx0XHRcdGNvdW50RGVsZXRlKys7XG5cdFx0XHRcdHRleHREZWxldGUgKz0gZGlmZnNbIHBvaW50ZXIgXVsgMSBdO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdGNhc2UgRElGRl9FUVVBTDpcblx0XHRcdFx0Ly8gVXBvbiByZWFjaGluZyBhbiBlcXVhbGl0eSwgY2hlY2sgZm9yIHByaW9yIHJlZHVuZGFuY2llcy5cblx0XHRcdFx0aWYgKCBjb3VudERlbGV0ZSA+PSAxICYmIGNvdW50SW5zZXJ0ID49IDEgKSB7XG5cdFx0XHRcdFx0Ly8gRGVsZXRlIHRoZSBvZmZlbmRpbmcgcmVjb3JkcyBhbmQgYWRkIHRoZSBtZXJnZWQgb25lcy5cblx0XHRcdFx0XHRkaWZmcy5zcGxpY2UoIHBvaW50ZXIgLSBjb3VudERlbGV0ZSAtIGNvdW50SW5zZXJ0LFxuXHRcdFx0XHRcdFx0Y291bnREZWxldGUgKyBjb3VudEluc2VydCApO1xuXHRcdFx0XHRcdHBvaW50ZXIgPSBwb2ludGVyIC0gY291bnREZWxldGUgLSBjb3VudEluc2VydDtcblx0XHRcdFx0XHRhID0gdGhpcy5EaWZmTWFpbiggdGV4dERlbGV0ZSwgdGV4dEluc2VydCwgZmFsc2UsIGRlYWRsaW5lICk7XG5cdFx0XHRcdFx0Zm9yICggaiA9IGEubGVuZ3RoIC0gMTsgaiA+PSAwOyBqLS0gKSB7XG5cdFx0XHRcdFx0XHRkaWZmcy5zcGxpY2UoIHBvaW50ZXIsIDAsIGFbIGogXSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwb2ludGVyID0gcG9pbnRlciArIGEubGVuZ3RoO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvdW50SW5zZXJ0ID0gMDtcblx0XHRcdFx0Y291bnREZWxldGUgPSAwO1xuXHRcdFx0XHR0ZXh0RGVsZXRlID0gXCJcIjtcblx0XHRcdFx0dGV4dEluc2VydCA9IFwiXCI7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0cG9pbnRlcisrO1xuXHRcdH1cblx0XHRkaWZmcy5wb3AoKTsgLy8gUmVtb3ZlIHRoZSBkdW1teSBlbnRyeSBhdCB0aGUgZW5kLlxuXG5cdFx0cmV0dXJuIGRpZmZzO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBGaW5kIHRoZSAnbWlkZGxlIHNuYWtlJyBvZiBhIGRpZmYsIHNwbGl0IHRoZSBwcm9ibGVtIGluIHR3b1xuXHQgKiBhbmQgcmV0dXJuIHRoZSByZWN1cnNpdmVseSBjb25zdHJ1Y3RlZCBkaWZmLlxuXHQgKiBTZWUgTXllcnMgMTk4NiBwYXBlcjogQW4gTyhORCkgRGlmZmVyZW5jZSBBbGdvcml0aG0gYW5kIEl0cyBWYXJpYXRpb25zLlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gdGV4dDEgT2xkIHN0cmluZyB0byBiZSBkaWZmZWQuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MiBOZXcgc3RyaW5nIHRvIGJlIGRpZmZlZC5cblx0ICogQHBhcmFtIHtudW1iZXJ9IGRlYWRsaW5lIFRpbWUgYXQgd2hpY2ggdG8gYmFpbCBpZiBub3QgeWV0IGNvbXBsZXRlLlxuXHQgKiBAcmV0dXJuIHshQXJyYXkuPCFEaWZmTWF0Y2hQYXRjaC5EaWZmPn0gQXJyYXkgb2YgZGlmZiB0dXBsZXMuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHREaWZmTWF0Y2hQYXRjaC5wcm90b3R5cGUuZGlmZkJpc2VjdCA9IGZ1bmN0aW9uKCB0ZXh0MSwgdGV4dDIsIGRlYWRsaW5lICkge1xuXHRcdHZhciB0ZXh0MUxlbmd0aCwgdGV4dDJMZW5ndGgsIG1heEQsIHZPZmZzZXQsIHZMZW5ndGgsXG5cdFx0XHR2MSwgdjIsIHgsIGRlbHRhLCBmcm9udCwgazFzdGFydCwgazFlbmQsIGsyc3RhcnQsXG5cdFx0XHRrMmVuZCwgazJPZmZzZXQsIGsxT2Zmc2V0LCB4MSwgeDIsIHkxLCB5MiwgZCwgazEsIGsyO1xuXHRcdC8vIENhY2hlIHRoZSB0ZXh0IGxlbmd0aHMgdG8gcHJldmVudCBtdWx0aXBsZSBjYWxscy5cblx0XHR0ZXh0MUxlbmd0aCA9IHRleHQxLmxlbmd0aDtcblx0XHR0ZXh0Mkxlbmd0aCA9IHRleHQyLmxlbmd0aDtcblx0XHRtYXhEID0gTWF0aC5jZWlsKCAoIHRleHQxTGVuZ3RoICsgdGV4dDJMZW5ndGggKSAvIDIgKTtcblx0XHR2T2Zmc2V0ID0gbWF4RDtcblx0XHR2TGVuZ3RoID0gMiAqIG1heEQ7XG5cdFx0djEgPSBuZXcgQXJyYXkoIHZMZW5ndGggKTtcblx0XHR2MiA9IG5ldyBBcnJheSggdkxlbmd0aCApO1xuXHRcdC8vIFNldHRpbmcgYWxsIGVsZW1lbnRzIHRvIC0xIGlzIGZhc3RlciBpbiBDaHJvbWUgJiBGaXJlZm94IHRoYW4gbWl4aW5nXG5cdFx0Ly8gaW50ZWdlcnMgYW5kIHVuZGVmaW5lZC5cblx0XHRmb3IgKCB4ID0gMDsgeCA8IHZMZW5ndGg7IHgrKyApIHtcblx0XHRcdHYxWyB4IF0gPSAtMTtcblx0XHRcdHYyWyB4IF0gPSAtMTtcblx0XHR9XG5cdFx0djFbIHZPZmZzZXQgKyAxIF0gPSAwO1xuXHRcdHYyWyB2T2Zmc2V0ICsgMSBdID0gMDtcblx0XHRkZWx0YSA9IHRleHQxTGVuZ3RoIC0gdGV4dDJMZW5ndGg7XG5cdFx0Ly8gSWYgdGhlIHRvdGFsIG51bWJlciBvZiBjaGFyYWN0ZXJzIGlzIG9kZCwgdGhlbiB0aGUgZnJvbnQgcGF0aCB3aWxsIGNvbGxpZGVcblx0XHQvLyB3aXRoIHRoZSByZXZlcnNlIHBhdGguXG5cdFx0ZnJvbnQgPSAoIGRlbHRhICUgMiAhPT0gMCApO1xuXHRcdC8vIE9mZnNldHMgZm9yIHN0YXJ0IGFuZCBlbmQgb2YgayBsb29wLlxuXHRcdC8vIFByZXZlbnRzIG1hcHBpbmcgb2Ygc3BhY2UgYmV5b25kIHRoZSBncmlkLlxuXHRcdGsxc3RhcnQgPSAwO1xuXHRcdGsxZW5kID0gMDtcblx0XHRrMnN0YXJ0ID0gMDtcblx0XHRrMmVuZCA9IDA7XG5cdFx0Zm9yICggZCA9IDA7IGQgPCBtYXhEOyBkKysgKSB7XG5cdFx0XHQvLyBCYWlsIG91dCBpZiBkZWFkbGluZSBpcyByZWFjaGVkLlxuXHRcdFx0aWYgKCAoIG5ldyBEYXRlKCkgKS5nZXRUaW1lKCkgPiBkZWFkbGluZSApIHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8vIFdhbGsgdGhlIGZyb250IHBhdGggb25lIHN0ZXAuXG5cdFx0XHRmb3IgKCBrMSA9IC1kICsgazFzdGFydDsgazEgPD0gZCAtIGsxZW5kOyBrMSArPSAyICkge1xuXHRcdFx0XHRrMU9mZnNldCA9IHZPZmZzZXQgKyBrMTtcblx0XHRcdFx0aWYgKCBrMSA9PT0gLWQgfHwgKCBrMSAhPT0gZCAmJiB2MVsgazFPZmZzZXQgLSAxIF0gPCB2MVsgazFPZmZzZXQgKyAxIF0gKSApIHtcblx0XHRcdFx0XHR4MSA9IHYxWyBrMU9mZnNldCArIDEgXTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR4MSA9IHYxWyBrMU9mZnNldCAtIDEgXSArIDE7XG5cdFx0XHRcdH1cblx0XHRcdFx0eTEgPSB4MSAtIGsxO1xuXHRcdFx0XHR3aGlsZSAoIHgxIDwgdGV4dDFMZW5ndGggJiYgeTEgPCB0ZXh0Mkxlbmd0aCAmJlxuXHRcdFx0XHRcdHRleHQxLmNoYXJBdCggeDEgKSA9PT0gdGV4dDIuY2hhckF0KCB5MSApICkge1xuXHRcdFx0XHRcdHgxKys7XG5cdFx0XHRcdFx0eTErKztcblx0XHRcdFx0fVxuXHRcdFx0XHR2MVsgazFPZmZzZXQgXSA9IHgxO1xuXHRcdFx0XHRpZiAoIHgxID4gdGV4dDFMZW5ndGggKSB7XG5cdFx0XHRcdFx0Ly8gUmFuIG9mZiB0aGUgcmlnaHQgb2YgdGhlIGdyYXBoLlxuXHRcdFx0XHRcdGsxZW5kICs9IDI7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIHkxID4gdGV4dDJMZW5ndGggKSB7XG5cdFx0XHRcdFx0Ly8gUmFuIG9mZiB0aGUgYm90dG9tIG9mIHRoZSBncmFwaC5cblx0XHRcdFx0XHRrMXN0YXJ0ICs9IDI7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIGZyb250ICkge1xuXHRcdFx0XHRcdGsyT2Zmc2V0ID0gdk9mZnNldCArIGRlbHRhIC0gazE7XG5cdFx0XHRcdFx0aWYgKCBrMk9mZnNldCA+PSAwICYmIGsyT2Zmc2V0IDwgdkxlbmd0aCAmJiB2MlsgazJPZmZzZXQgXSAhPT0gLTEgKSB7XG5cdFx0XHRcdFx0XHQvLyBNaXJyb3IgeDIgb250byB0b3AtbGVmdCBjb29yZGluYXRlIHN5c3RlbS5cblx0XHRcdFx0XHRcdHgyID0gdGV4dDFMZW5ndGggLSB2MlsgazJPZmZzZXQgXTtcblx0XHRcdFx0XHRcdGlmICggeDEgPj0geDIgKSB7XG5cdFx0XHRcdFx0XHRcdC8vIE92ZXJsYXAgZGV0ZWN0ZWQuXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmRpZmZCaXNlY3RTcGxpdCggdGV4dDEsIHRleHQyLCB4MSwgeTEsIGRlYWRsaW5lICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIFdhbGsgdGhlIHJldmVyc2UgcGF0aCBvbmUgc3RlcC5cblx0XHRcdGZvciAoIGsyID0gLWQgKyBrMnN0YXJ0OyBrMiA8PSBkIC0gazJlbmQ7IGsyICs9IDIgKSB7XG5cdFx0XHRcdGsyT2Zmc2V0ID0gdk9mZnNldCArIGsyO1xuXHRcdFx0XHRpZiAoIGsyID09PSAtZCB8fCAoIGsyICE9PSBkICYmIHYyWyBrMk9mZnNldCAtIDEgXSA8IHYyWyBrMk9mZnNldCArIDEgXSApICkge1xuXHRcdFx0XHRcdHgyID0gdjJbIGsyT2Zmc2V0ICsgMSBdO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHgyID0gdjJbIGsyT2Zmc2V0IC0gMSBdICsgMTtcblx0XHRcdFx0fVxuXHRcdFx0XHR5MiA9IHgyIC0gazI7XG5cdFx0XHRcdHdoaWxlICggeDIgPCB0ZXh0MUxlbmd0aCAmJiB5MiA8IHRleHQyTGVuZ3RoICYmXG5cdFx0XHRcdFx0dGV4dDEuY2hhckF0KCB0ZXh0MUxlbmd0aCAtIHgyIC0gMSApID09PVxuXHRcdFx0XHRcdHRleHQyLmNoYXJBdCggdGV4dDJMZW5ndGggLSB5MiAtIDEgKSApIHtcblx0XHRcdFx0XHR4MisrO1xuXHRcdFx0XHRcdHkyKys7XG5cdFx0XHRcdH1cblx0XHRcdFx0djJbIGsyT2Zmc2V0IF0gPSB4Mjtcblx0XHRcdFx0aWYgKCB4MiA+IHRleHQxTGVuZ3RoICkge1xuXHRcdFx0XHRcdC8vIFJhbiBvZmYgdGhlIGxlZnQgb2YgdGhlIGdyYXBoLlxuXHRcdFx0XHRcdGsyZW5kICs9IDI7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIHkyID4gdGV4dDJMZW5ndGggKSB7XG5cdFx0XHRcdFx0Ly8gUmFuIG9mZiB0aGUgdG9wIG9mIHRoZSBncmFwaC5cblx0XHRcdFx0XHRrMnN0YXJ0ICs9IDI7XG5cdFx0XHRcdH0gZWxzZSBpZiAoICFmcm9udCApIHtcblx0XHRcdFx0XHRrMU9mZnNldCA9IHZPZmZzZXQgKyBkZWx0YSAtIGsyO1xuXHRcdFx0XHRcdGlmICggazFPZmZzZXQgPj0gMCAmJiBrMU9mZnNldCA8IHZMZW5ndGggJiYgdjFbIGsxT2Zmc2V0IF0gIT09IC0xICkge1xuXHRcdFx0XHRcdFx0eDEgPSB2MVsgazFPZmZzZXQgXTtcblx0XHRcdFx0XHRcdHkxID0gdk9mZnNldCArIHgxIC0gazFPZmZzZXQ7XG5cdFx0XHRcdFx0XHQvLyBNaXJyb3IgeDIgb250byB0b3AtbGVmdCBjb29yZGluYXRlIHN5c3RlbS5cblx0XHRcdFx0XHRcdHgyID0gdGV4dDFMZW5ndGggLSB4Mjtcblx0XHRcdFx0XHRcdGlmICggeDEgPj0geDIgKSB7XG5cdFx0XHRcdFx0XHRcdC8vIE92ZXJsYXAgZGV0ZWN0ZWQuXG5cdFx0XHRcdFx0XHRcdHJldHVybiB0aGlzLmRpZmZCaXNlY3RTcGxpdCggdGV4dDEsIHRleHQyLCB4MSwgeTEsIGRlYWRsaW5lICk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHRcdC8vIERpZmYgdG9vayB0b28gbG9uZyBhbmQgaGl0IHRoZSBkZWFkbGluZSBvclxuXHRcdC8vIG51bWJlciBvZiBkaWZmcyBlcXVhbHMgbnVtYmVyIG9mIGNoYXJhY3RlcnMsIG5vIGNvbW1vbmFsaXR5IGF0IGFsbC5cblx0XHRyZXR1cm4gW1xuXHRcdFx0WyBESUZGX0RFTEVURSwgdGV4dDEgXSxcblx0XHRcdFsgRElGRl9JTlNFUlQsIHRleHQyIF1cblx0XHRdO1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBHaXZlbiB0aGUgbG9jYXRpb24gb2YgdGhlICdtaWRkbGUgc25ha2UnLCBzcGxpdCB0aGUgZGlmZiBpbiB0d28gcGFydHNcblx0ICogYW5kIHJlY3Vyc2UuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MSBPbGQgc3RyaW5nIHRvIGJlIGRpZmZlZC5cblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQyIE5ldyBzdHJpbmcgdG8gYmUgZGlmZmVkLlxuXHQgKiBAcGFyYW0ge251bWJlcn0geCBJbmRleCBvZiBzcGxpdCBwb2ludCBpbiB0ZXh0MS5cblx0ICogQHBhcmFtIHtudW1iZXJ9IHkgSW5kZXggb2Ygc3BsaXQgcG9pbnQgaW4gdGV4dDIuXG5cdCAqIEBwYXJhbSB7bnVtYmVyfSBkZWFkbGluZSBUaW1lIGF0IHdoaWNoIHRvIGJhaWwgaWYgbm90IHlldCBjb21wbGV0ZS5cblx0ICogQHJldHVybiB7IUFycmF5LjwhRGlmZk1hdGNoUGF0Y2guRGlmZj59IEFycmF5IG9mIGRpZmYgdHVwbGVzLlxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0RGlmZk1hdGNoUGF0Y2gucHJvdG90eXBlLmRpZmZCaXNlY3RTcGxpdCA9IGZ1bmN0aW9uKCB0ZXh0MSwgdGV4dDIsIHgsIHksIGRlYWRsaW5lICkge1xuXHRcdHZhciB0ZXh0MWEsIHRleHQxYiwgdGV4dDJhLCB0ZXh0MmIsIGRpZmZzLCBkaWZmc2I7XG5cdFx0dGV4dDFhID0gdGV4dDEuc3Vic3RyaW5nKCAwLCB4ICk7XG5cdFx0dGV4dDJhID0gdGV4dDIuc3Vic3RyaW5nKCAwLCB5ICk7XG5cdFx0dGV4dDFiID0gdGV4dDEuc3Vic3RyaW5nKCB4ICk7XG5cdFx0dGV4dDJiID0gdGV4dDIuc3Vic3RyaW5nKCB5ICk7XG5cblx0XHQvLyBDb21wdXRlIGJvdGggZGlmZnMgc2VyaWFsbHkuXG5cdFx0ZGlmZnMgPSB0aGlzLkRpZmZNYWluKCB0ZXh0MWEsIHRleHQyYSwgZmFsc2UsIGRlYWRsaW5lICk7XG5cdFx0ZGlmZnNiID0gdGhpcy5EaWZmTWFpbiggdGV4dDFiLCB0ZXh0MmIsIGZhbHNlLCBkZWFkbGluZSApO1xuXG5cdFx0cmV0dXJuIGRpZmZzLmNvbmNhdCggZGlmZnNiICk7XG5cdH07XG5cblx0LyoqXG5cdCAqIFJlZHVjZSB0aGUgbnVtYmVyIG9mIGVkaXRzIGJ5IGVsaW1pbmF0aW5nIHNlbWFudGljYWxseSB0cml2aWFsIGVxdWFsaXRpZXMuXG5cdCAqIEBwYXJhbSB7IUFycmF5LjwhRGlmZk1hdGNoUGF0Y2guRGlmZj59IGRpZmZzIEFycmF5IG9mIGRpZmYgdHVwbGVzLlxuXHQgKi9cblx0RGlmZk1hdGNoUGF0Y2gucHJvdG90eXBlLmRpZmZDbGVhbnVwU2VtYW50aWMgPSBmdW5jdGlvbiggZGlmZnMgKSB7XG5cdFx0dmFyIGNoYW5nZXMsIGVxdWFsaXRpZXMsIGVxdWFsaXRpZXNMZW5ndGgsIGxhc3RlcXVhbGl0eSxcblx0XHRcdHBvaW50ZXIsIGxlbmd0aEluc2VydGlvbnMyLCBsZW5ndGhEZWxldGlvbnMyLCBsZW5ndGhJbnNlcnRpb25zMSxcblx0XHRcdGxlbmd0aERlbGV0aW9uczEsIGRlbGV0aW9uLCBpbnNlcnRpb24sIG92ZXJsYXBMZW5ndGgxLCBvdmVybGFwTGVuZ3RoMjtcblx0XHRjaGFuZ2VzID0gZmFsc2U7XG5cdFx0ZXF1YWxpdGllcyA9IFtdOyAvLyBTdGFjayBvZiBpbmRpY2VzIHdoZXJlIGVxdWFsaXRpZXMgYXJlIGZvdW5kLlxuXHRcdGVxdWFsaXRpZXNMZW5ndGggPSAwOyAvLyBLZWVwaW5nIG91ciBvd24gbGVuZ3RoIHZhciBpcyBmYXN0ZXIgaW4gSlMuXG5cdFx0LyoqIEB0eXBlIHs/c3RyaW5nfSAqL1xuXHRcdGxhc3RlcXVhbGl0eSA9IG51bGw7XG5cdFx0Ly8gQWx3YXlzIGVxdWFsIHRvIGRpZmZzW2VxdWFsaXRpZXNbZXF1YWxpdGllc0xlbmd0aCAtIDFdXVsxXVxuXHRcdHBvaW50ZXIgPSAwOyAvLyBJbmRleCBvZiBjdXJyZW50IHBvc2l0aW9uLlxuXHRcdC8vIE51bWJlciBvZiBjaGFyYWN0ZXJzIHRoYXQgY2hhbmdlZCBwcmlvciB0byB0aGUgZXF1YWxpdHkuXG5cdFx0bGVuZ3RoSW5zZXJ0aW9uczEgPSAwO1xuXHRcdGxlbmd0aERlbGV0aW9uczEgPSAwO1xuXHRcdC8vIE51bWJlciBvZiBjaGFyYWN0ZXJzIHRoYXQgY2hhbmdlZCBhZnRlciB0aGUgZXF1YWxpdHkuXG5cdFx0bGVuZ3RoSW5zZXJ0aW9uczIgPSAwO1xuXHRcdGxlbmd0aERlbGV0aW9uczIgPSAwO1xuXHRcdHdoaWxlICggcG9pbnRlciA8IGRpZmZzLmxlbmd0aCApIHtcblx0XHRcdGlmICggZGlmZnNbIHBvaW50ZXIgXVsgMCBdID09PSBESUZGX0VRVUFMICkgeyAvLyBFcXVhbGl0eSBmb3VuZC5cblx0XHRcdFx0ZXF1YWxpdGllc1sgZXF1YWxpdGllc0xlbmd0aCsrIF0gPSBwb2ludGVyO1xuXHRcdFx0XHRsZW5ndGhJbnNlcnRpb25zMSA9IGxlbmd0aEluc2VydGlvbnMyO1xuXHRcdFx0XHRsZW5ndGhEZWxldGlvbnMxID0gbGVuZ3RoRGVsZXRpb25zMjtcblx0XHRcdFx0bGVuZ3RoSW5zZXJ0aW9uczIgPSAwO1xuXHRcdFx0XHRsZW5ndGhEZWxldGlvbnMyID0gMDtcblx0XHRcdFx0bGFzdGVxdWFsaXR5ID0gZGlmZnNbIHBvaW50ZXIgXVsgMSBdO1xuXHRcdFx0fSBlbHNlIHsgLy8gQW4gaW5zZXJ0aW9uIG9yIGRlbGV0aW9uLlxuXHRcdFx0XHRpZiAoIGRpZmZzWyBwb2ludGVyIF1bIDAgXSA9PT0gRElGRl9JTlNFUlQgKSB7XG5cdFx0XHRcdFx0bGVuZ3RoSW5zZXJ0aW9uczIgKz0gZGlmZnNbIHBvaW50ZXIgXVsgMSBdLmxlbmd0aDtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRsZW5ndGhEZWxldGlvbnMyICs9IGRpZmZzWyBwb2ludGVyIF1bIDEgXS5sZW5ndGg7XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gRWxpbWluYXRlIGFuIGVxdWFsaXR5IHRoYXQgaXMgc21hbGxlciBvciBlcXVhbCB0byB0aGUgZWRpdHMgb24gYm90aFxuXHRcdFx0XHQvLyBzaWRlcyBvZiBpdC5cblx0XHRcdFx0aWYgKCBsYXN0ZXF1YWxpdHkgJiYgKCBsYXN0ZXF1YWxpdHkubGVuZ3RoIDw9XG5cdFx0XHRcdFx0XHRNYXRoLm1heCggbGVuZ3RoSW5zZXJ0aW9uczEsIGxlbmd0aERlbGV0aW9uczEgKSApICYmXG5cdFx0XHRcdFx0XHQoIGxhc3RlcXVhbGl0eS5sZW5ndGggPD0gTWF0aC5tYXgoIGxlbmd0aEluc2VydGlvbnMyLFxuXHRcdFx0XHRcdFx0XHRsZW5ndGhEZWxldGlvbnMyICkgKSApIHtcblxuXHRcdFx0XHRcdC8vIER1cGxpY2F0ZSByZWNvcmQuXG5cdFx0XHRcdFx0ZGlmZnMuc3BsaWNlKFxuXHRcdFx0XHRcdFx0ZXF1YWxpdGllc1sgZXF1YWxpdGllc0xlbmd0aCAtIDEgXSxcblx0XHRcdFx0XHRcdDAsXG5cdFx0XHRcdFx0XHRbIERJRkZfREVMRVRFLCBsYXN0ZXF1YWxpdHkgXVxuXHRcdFx0XHRcdCk7XG5cblx0XHRcdFx0XHQvLyBDaGFuZ2Ugc2Vjb25kIGNvcHkgdG8gaW5zZXJ0LlxuXHRcdFx0XHRcdGRpZmZzWyBlcXVhbGl0aWVzWyBlcXVhbGl0aWVzTGVuZ3RoIC0gMSBdICsgMSBdWyAwIF0gPSBESUZGX0lOU0VSVDtcblxuXHRcdFx0XHRcdC8vIFRocm93IGF3YXkgdGhlIGVxdWFsaXR5IHdlIGp1c3QgZGVsZXRlZC5cblx0XHRcdFx0XHRlcXVhbGl0aWVzTGVuZ3RoLS07XG5cblx0XHRcdFx0XHQvLyBUaHJvdyBhd2F5IHRoZSBwcmV2aW91cyBlcXVhbGl0eSAoaXQgbmVlZHMgdG8gYmUgcmVldmFsdWF0ZWQpLlxuXHRcdFx0XHRcdGVxdWFsaXRpZXNMZW5ndGgtLTtcblx0XHRcdFx0XHRwb2ludGVyID0gZXF1YWxpdGllc0xlbmd0aCA+IDAgPyBlcXVhbGl0aWVzWyBlcXVhbGl0aWVzTGVuZ3RoIC0gMSBdIDogLTE7XG5cblx0XHRcdFx0XHQvLyBSZXNldCB0aGUgY291bnRlcnMuXG5cdFx0XHRcdFx0bGVuZ3RoSW5zZXJ0aW9uczEgPSAwO1xuXHRcdFx0XHRcdGxlbmd0aERlbGV0aW9uczEgPSAwO1xuXHRcdFx0XHRcdGxlbmd0aEluc2VydGlvbnMyID0gMDtcblx0XHRcdFx0XHRsZW5ndGhEZWxldGlvbnMyID0gMDtcblx0XHRcdFx0XHRsYXN0ZXF1YWxpdHkgPSBudWxsO1xuXHRcdFx0XHRcdGNoYW5nZXMgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRwb2ludGVyKys7XG5cdFx0fVxuXG5cdFx0Ly8gTm9ybWFsaXplIHRoZSBkaWZmLlxuXHRcdGlmICggY2hhbmdlcyApIHtcblx0XHRcdHRoaXMuZGlmZkNsZWFudXBNZXJnZSggZGlmZnMgKTtcblx0XHR9XG5cblx0XHQvLyBGaW5kIGFueSBvdmVybGFwcyBiZXR3ZWVuIGRlbGV0aW9ucyBhbmQgaW5zZXJ0aW9ucy5cblx0XHQvLyBlLmc6IDxkZWw+YWJjeHh4PC9kZWw+PGlucz54eHhkZWY8L2lucz5cblx0XHQvLyAgIC0+IDxkZWw+YWJjPC9kZWw+eHh4PGlucz5kZWY8L2lucz5cblx0XHQvLyBlLmc6IDxkZWw+eHh4YWJjPC9kZWw+PGlucz5kZWZ4eHg8L2lucz5cblx0XHQvLyAgIC0+IDxpbnM+ZGVmPC9pbnM+eHh4PGRlbD5hYmM8L2RlbD5cblx0XHQvLyBPbmx5IGV4dHJhY3QgYW4gb3ZlcmxhcCBpZiBpdCBpcyBhcyBiaWcgYXMgdGhlIGVkaXQgYWhlYWQgb3IgYmVoaW5kIGl0LlxuXHRcdHBvaW50ZXIgPSAxO1xuXHRcdHdoaWxlICggcG9pbnRlciA8IGRpZmZzLmxlbmd0aCApIHtcblx0XHRcdGlmICggZGlmZnNbIHBvaW50ZXIgLSAxIF1bIDAgXSA9PT0gRElGRl9ERUxFVEUgJiZcblx0XHRcdFx0XHRkaWZmc1sgcG9pbnRlciBdWyAwIF0gPT09IERJRkZfSU5TRVJUICkge1xuXHRcdFx0XHRkZWxldGlvbiA9IGRpZmZzWyBwb2ludGVyIC0gMSBdWyAxIF07XG5cdFx0XHRcdGluc2VydGlvbiA9IGRpZmZzWyBwb2ludGVyIF1bIDEgXTtcblx0XHRcdFx0b3ZlcmxhcExlbmd0aDEgPSB0aGlzLmRpZmZDb21tb25PdmVybGFwKCBkZWxldGlvbiwgaW5zZXJ0aW9uICk7XG5cdFx0XHRcdG92ZXJsYXBMZW5ndGgyID0gdGhpcy5kaWZmQ29tbW9uT3ZlcmxhcCggaW5zZXJ0aW9uLCBkZWxldGlvbiApO1xuXHRcdFx0XHRpZiAoIG92ZXJsYXBMZW5ndGgxID49IG92ZXJsYXBMZW5ndGgyICkge1xuXHRcdFx0XHRcdGlmICggb3ZlcmxhcExlbmd0aDEgPj0gZGVsZXRpb24ubGVuZ3RoIC8gMiB8fFxuXHRcdFx0XHRcdFx0XHRvdmVybGFwTGVuZ3RoMSA+PSBpbnNlcnRpb24ubGVuZ3RoIC8gMiApIHtcblx0XHRcdFx0XHRcdC8vIE92ZXJsYXAgZm91bmQuICBJbnNlcnQgYW4gZXF1YWxpdHkgYW5kIHRyaW0gdGhlIHN1cnJvdW5kaW5nIGVkaXRzLlxuXHRcdFx0XHRcdFx0ZGlmZnMuc3BsaWNlKFxuXHRcdFx0XHRcdFx0XHRwb2ludGVyLFxuXHRcdFx0XHRcdFx0XHQwLFxuXHRcdFx0XHRcdFx0XHRbIERJRkZfRVFVQUwsIGluc2VydGlvbi5zdWJzdHJpbmcoIDAsIG92ZXJsYXBMZW5ndGgxICkgXVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdGRpZmZzWyBwb2ludGVyIC0gMSBdWyAxIF0gPVxuXHRcdFx0XHRcdFx0XHRkZWxldGlvbi5zdWJzdHJpbmcoIDAsIGRlbGV0aW9uLmxlbmd0aCAtIG92ZXJsYXBMZW5ndGgxICk7XG5cdFx0XHRcdFx0XHRkaWZmc1sgcG9pbnRlciArIDEgXVsgMSBdID0gaW5zZXJ0aW9uLnN1YnN0cmluZyggb3ZlcmxhcExlbmd0aDEgKTtcblx0XHRcdFx0XHRcdHBvaW50ZXIrKztcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0aWYgKCBvdmVybGFwTGVuZ3RoMiA+PSBkZWxldGlvbi5sZW5ndGggLyAyIHx8XG5cdFx0XHRcdFx0XHRcdG92ZXJsYXBMZW5ndGgyID49IGluc2VydGlvbi5sZW5ndGggLyAyICkge1xuXG5cdFx0XHRcdFx0XHQvLyBSZXZlcnNlIG92ZXJsYXAgZm91bmQuXG5cdFx0XHRcdFx0XHQvLyBJbnNlcnQgYW4gZXF1YWxpdHkgYW5kIHN3YXAgYW5kIHRyaW0gdGhlIHN1cnJvdW5kaW5nIGVkaXRzLlxuXHRcdFx0XHRcdFx0ZGlmZnMuc3BsaWNlKFxuXHRcdFx0XHRcdFx0XHRwb2ludGVyLFxuXHRcdFx0XHRcdFx0XHQwLFxuXHRcdFx0XHRcdFx0XHRbIERJRkZfRVFVQUwsIGRlbGV0aW9uLnN1YnN0cmluZyggMCwgb3ZlcmxhcExlbmd0aDIgKSBdXG5cdFx0XHRcdFx0XHQpO1xuXG5cdFx0XHRcdFx0XHRkaWZmc1sgcG9pbnRlciAtIDEgXVsgMCBdID0gRElGRl9JTlNFUlQ7XG5cdFx0XHRcdFx0XHRkaWZmc1sgcG9pbnRlciAtIDEgXVsgMSBdID1cblx0XHRcdFx0XHRcdFx0aW5zZXJ0aW9uLnN1YnN0cmluZyggMCwgaW5zZXJ0aW9uLmxlbmd0aCAtIG92ZXJsYXBMZW5ndGgyICk7XG5cdFx0XHRcdFx0XHRkaWZmc1sgcG9pbnRlciArIDEgXVsgMCBdID0gRElGRl9ERUxFVEU7XG5cdFx0XHRcdFx0XHRkaWZmc1sgcG9pbnRlciArIDEgXVsgMSBdID1cblx0XHRcdFx0XHRcdFx0ZGVsZXRpb24uc3Vic3RyaW5nKCBvdmVybGFwTGVuZ3RoMiApO1xuXHRcdFx0XHRcdFx0cG9pbnRlcisrO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRwb2ludGVyKys7XG5cdFx0XHR9XG5cdFx0XHRwb2ludGVyKys7XG5cdFx0fVxuXHR9O1xuXG5cdC8qKlxuXHQgKiBEZXRlcm1pbmUgaWYgdGhlIHN1ZmZpeCBvZiBvbmUgc3RyaW5nIGlzIHRoZSBwcmVmaXggb2YgYW5vdGhlci5cblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQxIEZpcnN0IHN0cmluZy5cblx0ICogQHBhcmFtIHtzdHJpbmd9IHRleHQyIFNlY29uZCBzdHJpbmcuXG5cdCAqIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBjaGFyYWN0ZXJzIGNvbW1vbiB0byB0aGUgZW5kIG9mIHRoZSBmaXJzdFxuXHQgKiAgICAgc3RyaW5nIGFuZCB0aGUgc3RhcnQgb2YgdGhlIHNlY29uZCBzdHJpbmcuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHREaWZmTWF0Y2hQYXRjaC5wcm90b3R5cGUuZGlmZkNvbW1vbk92ZXJsYXAgPSBmdW5jdGlvbiggdGV4dDEsIHRleHQyICkge1xuXHRcdHZhciB0ZXh0MUxlbmd0aCwgdGV4dDJMZW5ndGgsIHRleHRMZW5ndGgsXG5cdFx0XHRiZXN0LCBsZW5ndGgsIHBhdHRlcm4sIGZvdW5kO1xuXHRcdC8vIENhY2hlIHRoZSB0ZXh0IGxlbmd0aHMgdG8gcHJldmVudCBtdWx0aXBsZSBjYWxscy5cblx0XHR0ZXh0MUxlbmd0aCA9IHRleHQxLmxlbmd0aDtcblx0XHR0ZXh0Mkxlbmd0aCA9IHRleHQyLmxlbmd0aDtcblx0XHQvLyBFbGltaW5hdGUgdGhlIG51bGwgY2FzZS5cblx0XHRpZiAoIHRleHQxTGVuZ3RoID09PSAwIHx8IHRleHQyTGVuZ3RoID09PSAwICkge1xuXHRcdFx0cmV0dXJuIDA7XG5cdFx0fVxuXHRcdC8vIFRydW5jYXRlIHRoZSBsb25nZXIgc3RyaW5nLlxuXHRcdGlmICggdGV4dDFMZW5ndGggPiB0ZXh0Mkxlbmd0aCApIHtcblx0XHRcdHRleHQxID0gdGV4dDEuc3Vic3RyaW5nKCB0ZXh0MUxlbmd0aCAtIHRleHQyTGVuZ3RoICk7XG5cdFx0fSBlbHNlIGlmICggdGV4dDFMZW5ndGggPCB0ZXh0Mkxlbmd0aCApIHtcblx0XHRcdHRleHQyID0gdGV4dDIuc3Vic3RyaW5nKCAwLCB0ZXh0MUxlbmd0aCApO1xuXHRcdH1cblx0XHR0ZXh0TGVuZ3RoID0gTWF0aC5taW4oIHRleHQxTGVuZ3RoLCB0ZXh0Mkxlbmd0aCApO1xuXHRcdC8vIFF1aWNrIGNoZWNrIGZvciB0aGUgd29yc3QgY2FzZS5cblx0XHRpZiAoIHRleHQxID09PSB0ZXh0MiApIHtcblx0XHRcdHJldHVybiB0ZXh0TGVuZ3RoO1xuXHRcdH1cblxuXHRcdC8vIFN0YXJ0IGJ5IGxvb2tpbmcgZm9yIGEgc2luZ2xlIGNoYXJhY3RlciBtYXRjaFxuXHRcdC8vIGFuZCBpbmNyZWFzZSBsZW5ndGggdW50aWwgbm8gbWF0Y2ggaXMgZm91bmQuXG5cdFx0Ly8gUGVyZm9ybWFuY2UgYW5hbHlzaXM6IGh0dHA6Ly9uZWlsLmZyYXNlci5uYW1lL25ld3MvMjAxMC8xMS8wNC9cblx0XHRiZXN0ID0gMDtcblx0XHRsZW5ndGggPSAxO1xuXHRcdHdoaWxlICggdHJ1ZSApIHtcblx0XHRcdHBhdHRlcm4gPSB0ZXh0MS5zdWJzdHJpbmcoIHRleHRMZW5ndGggLSBsZW5ndGggKTtcblx0XHRcdGZvdW5kID0gdGV4dDIuaW5kZXhPZiggcGF0dGVybiApO1xuXHRcdFx0aWYgKCBmb3VuZCA9PT0gLTEgKSB7XG5cdFx0XHRcdHJldHVybiBiZXN0O1xuXHRcdFx0fVxuXHRcdFx0bGVuZ3RoICs9IGZvdW5kO1xuXHRcdFx0aWYgKCBmb3VuZCA9PT0gMCB8fCB0ZXh0MS5zdWJzdHJpbmcoIHRleHRMZW5ndGggLSBsZW5ndGggKSA9PT1cblx0XHRcdFx0XHR0ZXh0Mi5zdWJzdHJpbmcoIDAsIGxlbmd0aCApICkge1xuXHRcdFx0XHRiZXN0ID0gbGVuZ3RoO1xuXHRcdFx0XHRsZW5ndGgrKztcblx0XHRcdH1cblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIFNwbGl0IHR3byB0ZXh0cyBpbnRvIGFuIGFycmF5IG9mIHN0cmluZ3MuICBSZWR1Y2UgdGhlIHRleHRzIHRvIGEgc3RyaW5nIG9mXG5cdCAqIGhhc2hlcyB3aGVyZSBlYWNoIFVuaWNvZGUgY2hhcmFjdGVyIHJlcHJlc2VudHMgb25lIGxpbmUuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MSBGaXJzdCBzdHJpbmcuXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0MiBTZWNvbmQgc3RyaW5nLlxuXHQgKiBAcmV0dXJuIHt7Y2hhcnMxOiBzdHJpbmcsIGNoYXJzMjogc3RyaW5nLCBsaW5lQXJyYXk6ICFBcnJheS48c3RyaW5nPn19XG5cdCAqICAgICBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgZW5jb2RlZCB0ZXh0MSwgdGhlIGVuY29kZWQgdGV4dDIgYW5kXG5cdCAqICAgICB0aGUgYXJyYXkgb2YgdW5pcXVlIHN0cmluZ3MuXG5cdCAqICAgICBUaGUgemVyb3RoIGVsZW1lbnQgb2YgdGhlIGFycmF5IG9mIHVuaXF1ZSBzdHJpbmdzIGlzIGludGVudGlvbmFsbHkgYmxhbmsuXG5cdCAqIEBwcml2YXRlXG5cdCAqL1xuXHREaWZmTWF0Y2hQYXRjaC5wcm90b3R5cGUuZGlmZkxpbmVzVG9DaGFycyA9IGZ1bmN0aW9uKCB0ZXh0MSwgdGV4dDIgKSB7XG5cdFx0dmFyIGxpbmVBcnJheSwgbGluZUhhc2gsIGNoYXJzMSwgY2hhcnMyO1xuXHRcdGxpbmVBcnJheSA9IFtdOyAvLyBlLmcuIGxpbmVBcnJheVs0XSA9PT0gJ0hlbGxvXFxuJ1xuXHRcdGxpbmVIYXNoID0ge307IC8vIGUuZy4gbGluZUhhc2hbJ0hlbGxvXFxuJ10gPT09IDRcblxuXHRcdC8vICdcXHgwMCcgaXMgYSB2YWxpZCBjaGFyYWN0ZXIsIGJ1dCB2YXJpb3VzIGRlYnVnZ2VycyBkb24ndCBsaWtlIGl0LlxuXHRcdC8vIFNvIHdlJ2xsIGluc2VydCBhIGp1bmsgZW50cnkgdG8gYXZvaWQgZ2VuZXJhdGluZyBhIG51bGwgY2hhcmFjdGVyLlxuXHRcdGxpbmVBcnJheVsgMCBdID0gXCJcIjtcblxuXHRcdC8qKlxuXHRcdCAqIFNwbGl0IGEgdGV4dCBpbnRvIGFuIGFycmF5IG9mIHN0cmluZ3MuICBSZWR1Y2UgdGhlIHRleHRzIHRvIGEgc3RyaW5nIG9mXG5cdFx0ICogaGFzaGVzIHdoZXJlIGVhY2ggVW5pY29kZSBjaGFyYWN0ZXIgcmVwcmVzZW50cyBvbmUgbGluZS5cblx0XHQgKiBNb2RpZmllcyBsaW5lYXJyYXkgYW5kIGxpbmVoYXNoIHRocm91Z2ggYmVpbmcgYSBjbG9zdXJlLlxuXHRcdCAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0IFN0cmluZyB0byBlbmNvZGUuXG5cdFx0ICogQHJldHVybiB7c3RyaW5nfSBFbmNvZGVkIHN0cmluZy5cblx0XHQgKiBAcHJpdmF0ZVxuXHRcdCAqL1xuXHRcdGZ1bmN0aW9uIGRpZmZMaW5lc1RvQ2hhcnNNdW5nZSggdGV4dCApIHtcblx0XHRcdHZhciBjaGFycywgbGluZVN0YXJ0LCBsaW5lRW5kLCBsaW5lQXJyYXlMZW5ndGgsIGxpbmU7XG5cdFx0XHRjaGFycyA9IFwiXCI7XG5cdFx0XHQvLyBXYWxrIHRoZSB0ZXh0LCBwdWxsaW5nIG91dCBhIHN1YnN0cmluZyBmb3IgZWFjaCBsaW5lLlxuXHRcdFx0Ly8gdGV4dC5zcGxpdCgnXFxuJykgd291bGQgd291bGQgdGVtcG9yYXJpbHkgZG91YmxlIG91ciBtZW1vcnkgZm9vdHByaW50LlxuXHRcdFx0Ly8gTW9kaWZ5aW5nIHRleHQgd291bGQgY3JlYXRlIG1hbnkgbGFyZ2Ugc3RyaW5ncyB0byBnYXJiYWdlIGNvbGxlY3QuXG5cdFx0XHRsaW5lU3RhcnQgPSAwO1xuXHRcdFx0bGluZUVuZCA9IC0xO1xuXHRcdFx0Ly8gS2VlcGluZyBvdXIgb3duIGxlbmd0aCB2YXJpYWJsZSBpcyBmYXN0ZXIgdGhhbiBsb29raW5nIGl0IHVwLlxuXHRcdFx0bGluZUFycmF5TGVuZ3RoID0gbGluZUFycmF5Lmxlbmd0aDtcblx0XHRcdHdoaWxlICggbGluZUVuZCA8IHRleHQubGVuZ3RoIC0gMSApIHtcblx0XHRcdFx0bGluZUVuZCA9IHRleHQuaW5kZXhPZiggXCJcXG5cIiwgbGluZVN0YXJ0ICk7XG5cdFx0XHRcdGlmICggbGluZUVuZCA9PT0gLTEgKSB7XG5cdFx0XHRcdFx0bGluZUVuZCA9IHRleHQubGVuZ3RoIC0gMTtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaW5lID0gdGV4dC5zdWJzdHJpbmcoIGxpbmVTdGFydCwgbGluZUVuZCArIDEgKTtcblx0XHRcdFx0bGluZVN0YXJ0ID0gbGluZUVuZCArIDE7XG5cblx0XHRcdFx0aWYgKCBsaW5lSGFzaC5oYXNPd25Qcm9wZXJ0eSA/IGxpbmVIYXNoLmhhc093blByb3BlcnR5KCBsaW5lICkgOlxuXHRcdFx0XHRcdFx0XHQoIGxpbmVIYXNoWyBsaW5lIF0gIT09IHVuZGVmaW5lZCApICkge1xuXHRcdFx0XHRcdGNoYXJzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoIGxpbmVIYXNoWyBsaW5lIF0gKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjaGFycyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKCBsaW5lQXJyYXlMZW5ndGggKTtcblx0XHRcdFx0XHRsaW5lSGFzaFsgbGluZSBdID0gbGluZUFycmF5TGVuZ3RoO1xuXHRcdFx0XHRcdGxpbmVBcnJheVsgbGluZUFycmF5TGVuZ3RoKysgXSA9IGxpbmU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBjaGFycztcblx0XHR9XG5cblx0XHRjaGFyczEgPSBkaWZmTGluZXNUb0NoYXJzTXVuZ2UoIHRleHQxICk7XG5cdFx0Y2hhcnMyID0gZGlmZkxpbmVzVG9DaGFyc011bmdlKCB0ZXh0MiApO1xuXHRcdHJldHVybiB7XG5cdFx0XHRjaGFyczE6IGNoYXJzMSxcblx0XHRcdGNoYXJzMjogY2hhcnMyLFxuXHRcdFx0bGluZUFycmF5OiBsaW5lQXJyYXlcblx0XHR9O1xuXHR9O1xuXG5cdC8qKlxuXHQgKiBSZWh5ZHJhdGUgdGhlIHRleHQgaW4gYSBkaWZmIGZyb20gYSBzdHJpbmcgb2YgbGluZSBoYXNoZXMgdG8gcmVhbCBsaW5lcyBvZlxuXHQgKiB0ZXh0LlxuXHQgKiBAcGFyYW0geyFBcnJheS48IURpZmZNYXRjaFBhdGNoLkRpZmY+fSBkaWZmcyBBcnJheSBvZiBkaWZmIHR1cGxlcy5cblx0ICogQHBhcmFtIHshQXJyYXkuPHN0cmluZz59IGxpbmVBcnJheSBBcnJheSBvZiB1bmlxdWUgc3RyaW5ncy5cblx0ICogQHByaXZhdGVcblx0ICovXG5cdERpZmZNYXRjaFBhdGNoLnByb3RvdHlwZS5kaWZmQ2hhcnNUb0xpbmVzID0gZnVuY3Rpb24oIGRpZmZzLCBsaW5lQXJyYXkgKSB7XG5cdFx0dmFyIHgsIGNoYXJzLCB0ZXh0LCB5O1xuXHRcdGZvciAoIHggPSAwOyB4IDwgZGlmZnMubGVuZ3RoOyB4KysgKSB7XG5cdFx0XHRjaGFycyA9IGRpZmZzWyB4IF1bIDEgXTtcblx0XHRcdHRleHQgPSBbXTtcblx0XHRcdGZvciAoIHkgPSAwOyB5IDwgY2hhcnMubGVuZ3RoOyB5KysgKSB7XG5cdFx0XHRcdHRleHRbIHkgXSA9IGxpbmVBcnJheVsgY2hhcnMuY2hhckNvZGVBdCggeSApIF07XG5cdFx0XHR9XG5cdFx0XHRkaWZmc1sgeCBdWyAxIF0gPSB0ZXh0LmpvaW4oIFwiXCIgKTtcblx0XHR9XG5cdH07XG5cblx0LyoqXG5cdCAqIFJlb3JkZXIgYW5kIG1lcmdlIGxpa2UgZWRpdCBzZWN0aW9ucy4gIE1lcmdlIGVxdWFsaXRpZXMuXG5cdCAqIEFueSBlZGl0IHNlY3Rpb24gY2FuIG1vdmUgYXMgbG9uZyBhcyBpdCBkb2Vzbid0IGNyb3NzIGFuIGVxdWFsaXR5LlxuXHQgKiBAcGFyYW0geyFBcnJheS48IURpZmZNYXRjaFBhdGNoLkRpZmY+fSBkaWZmcyBBcnJheSBvZiBkaWZmIHR1cGxlcy5cblx0ICovXG5cdERpZmZNYXRjaFBhdGNoLnByb3RvdHlwZS5kaWZmQ2xlYW51cE1lcmdlID0gZnVuY3Rpb24oIGRpZmZzICkge1xuXHRcdHZhciBwb2ludGVyLCBjb3VudERlbGV0ZSwgY291bnRJbnNlcnQsIHRleHRJbnNlcnQsIHRleHREZWxldGUsXG5cdFx0XHRjb21tb25sZW5ndGgsIGNoYW5nZXMsIGRpZmZQb2ludGVyLCBwb3NpdGlvbjtcblx0XHRkaWZmcy5wdXNoKCBbIERJRkZfRVFVQUwsIFwiXCIgXSApOyAvLyBBZGQgYSBkdW1teSBlbnRyeSBhdCB0aGUgZW5kLlxuXHRcdHBvaW50ZXIgPSAwO1xuXHRcdGNvdW50RGVsZXRlID0gMDtcblx0XHRjb3VudEluc2VydCA9IDA7XG5cdFx0dGV4dERlbGV0ZSA9IFwiXCI7XG5cdFx0dGV4dEluc2VydCA9IFwiXCI7XG5cdFx0Y29tbW9ubGVuZ3RoO1xuXHRcdHdoaWxlICggcG9pbnRlciA8IGRpZmZzLmxlbmd0aCApIHtcblx0XHRcdHN3aXRjaCAoIGRpZmZzWyBwb2ludGVyIF1bIDAgXSApIHtcblx0XHRcdGNhc2UgRElGRl9JTlNFUlQ6XG5cdFx0XHRcdGNvdW50SW5zZXJ0Kys7XG5cdFx0XHRcdHRleHRJbnNlcnQgKz0gZGlmZnNbIHBvaW50ZXIgXVsgMSBdO1xuXHRcdFx0XHRwb2ludGVyKys7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBESUZGX0RFTEVURTpcblx0XHRcdFx0Y291bnREZWxldGUrKztcblx0XHRcdFx0dGV4dERlbGV0ZSArPSBkaWZmc1sgcG9pbnRlciBdWyAxIF07XG5cdFx0XHRcdHBvaW50ZXIrKztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIERJRkZfRVFVQUw6XG5cdFx0XHRcdC8vIFVwb24gcmVhY2hpbmcgYW4gZXF1YWxpdHksIGNoZWNrIGZvciBwcmlvciByZWR1bmRhbmNpZXMuXG5cdFx0XHRcdGlmICggY291bnREZWxldGUgKyBjb3VudEluc2VydCA+IDEgKSB7XG5cdFx0XHRcdFx0aWYgKCBjb3VudERlbGV0ZSAhPT0gMCAmJiBjb3VudEluc2VydCAhPT0gMCApIHtcblx0XHRcdFx0XHRcdC8vIEZhY3RvciBvdXQgYW55IGNvbW1vbiBwcmVmaXhpZXMuXG5cdFx0XHRcdFx0XHRjb21tb25sZW5ndGggPSB0aGlzLmRpZmZDb21tb25QcmVmaXgoIHRleHRJbnNlcnQsIHRleHREZWxldGUgKTtcblx0XHRcdFx0XHRcdGlmICggY29tbW9ubGVuZ3RoICE9PSAwICkge1xuXHRcdFx0XHRcdFx0XHRpZiAoICggcG9pbnRlciAtIGNvdW50RGVsZXRlIC0gY291bnRJbnNlcnQgKSA+IDAgJiZcblx0XHRcdFx0XHRcdFx0XHRcdGRpZmZzWyBwb2ludGVyIC0gY291bnREZWxldGUgLSBjb3VudEluc2VydCAtIDEgXVsgMCBdID09PVxuXHRcdFx0XHRcdFx0XHRcdFx0RElGRl9FUVVBTCApIHtcblx0XHRcdFx0XHRcdFx0XHRkaWZmc1sgcG9pbnRlciAtIGNvdW50RGVsZXRlIC0gY291bnRJbnNlcnQgLSAxIF1bIDEgXSArPVxuXHRcdFx0XHRcdFx0XHRcdFx0dGV4dEluc2VydC5zdWJzdHJpbmcoIDAsIGNvbW1vbmxlbmd0aCApO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGRpZmZzLnNwbGljZSggMCwgMCwgWyBESUZGX0VRVUFMLFxuXHRcdFx0XHRcdFx0XHRcdFx0dGV4dEluc2VydC5zdWJzdHJpbmcoIDAsIGNvbW1vbmxlbmd0aCApXG5cdFx0XHRcdFx0XHRcdFx0XSApO1xuXHRcdFx0XHRcdFx0XHRcdHBvaW50ZXIrKztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR0ZXh0SW5zZXJ0ID0gdGV4dEluc2VydC5zdWJzdHJpbmcoIGNvbW1vbmxlbmd0aCApO1xuXHRcdFx0XHRcdFx0XHR0ZXh0RGVsZXRlID0gdGV4dERlbGV0ZS5zdWJzdHJpbmcoIGNvbW1vbmxlbmd0aCApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly8gRmFjdG9yIG91dCBhbnkgY29tbW9uIHN1ZmZpeGllcy5cblx0XHRcdFx0XHRcdGNvbW1vbmxlbmd0aCA9IHRoaXMuZGlmZkNvbW1vblN1ZmZpeCggdGV4dEluc2VydCwgdGV4dERlbGV0ZSApO1xuXHRcdFx0XHRcdFx0aWYgKCBjb21tb25sZW5ndGggIT09IDAgKSB7XG5cdFx0XHRcdFx0XHRcdGRpZmZzWyBwb2ludGVyIF1bIDEgXSA9IHRleHRJbnNlcnQuc3Vic3RyaW5nKCB0ZXh0SW5zZXJ0Lmxlbmd0aCAtXG5cdFx0XHRcdFx0XHRcdFx0XHRjb21tb25sZW5ndGggKSArIGRpZmZzWyBwb2ludGVyIF1bIDEgXTtcblx0XHRcdFx0XHRcdFx0dGV4dEluc2VydCA9IHRleHRJbnNlcnQuc3Vic3RyaW5nKCAwLCB0ZXh0SW5zZXJ0Lmxlbmd0aCAtXG5cdFx0XHRcdFx0XHRcdFx0Y29tbW9ubGVuZ3RoICk7XG5cdFx0XHRcdFx0XHRcdHRleHREZWxldGUgPSB0ZXh0RGVsZXRlLnN1YnN0cmluZyggMCwgdGV4dERlbGV0ZS5sZW5ndGggLVxuXHRcdFx0XHRcdFx0XHRcdGNvbW1vbmxlbmd0aCApO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQvLyBEZWxldGUgdGhlIG9mZmVuZGluZyByZWNvcmRzIGFuZCBhZGQgdGhlIG1lcmdlZCBvbmVzLlxuXHRcdFx0XHRcdGlmICggY291bnREZWxldGUgPT09IDAgKSB7XG5cdFx0XHRcdFx0XHRkaWZmcy5zcGxpY2UoIHBvaW50ZXIgLSBjb3VudEluc2VydCxcblx0XHRcdFx0XHRcdFx0Y291bnREZWxldGUgKyBjb3VudEluc2VydCwgWyBESUZGX0lOU0VSVCwgdGV4dEluc2VydCBdICk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmICggY291bnRJbnNlcnQgPT09IDAgKSB7XG5cdFx0XHRcdFx0XHRkaWZmcy5zcGxpY2UoIHBvaW50ZXIgLSBjb3VudERlbGV0ZSxcblx0XHRcdFx0XHRcdFx0Y291bnREZWxldGUgKyBjb3VudEluc2VydCwgWyBESUZGX0RFTEVURSwgdGV4dERlbGV0ZSBdICk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGRpZmZzLnNwbGljZShcblx0XHRcdFx0XHRcdFx0cG9pbnRlciAtIGNvdW50RGVsZXRlIC0gY291bnRJbnNlcnQsXG5cdFx0XHRcdFx0XHRcdGNvdW50RGVsZXRlICsgY291bnRJbnNlcnQsXG5cdFx0XHRcdFx0XHRcdFsgRElGRl9ERUxFVEUsIHRleHREZWxldGUgXSwgWyBESUZGX0lOU0VSVCwgdGV4dEluc2VydCBdXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRwb2ludGVyID0gcG9pbnRlciAtIGNvdW50RGVsZXRlIC0gY291bnRJbnNlcnQgK1xuXHRcdFx0XHRcdFx0KCBjb3VudERlbGV0ZSA/IDEgOiAwICkgKyAoIGNvdW50SW5zZXJ0ID8gMSA6IDAgKSArIDE7XG5cdFx0XHRcdH0gZWxzZSBpZiAoIHBvaW50ZXIgIT09IDAgJiYgZGlmZnNbIHBvaW50ZXIgLSAxIF1bIDAgXSA9PT0gRElGRl9FUVVBTCApIHtcblxuXHRcdFx0XHRcdC8vIE1lcmdlIHRoaXMgZXF1YWxpdHkgd2l0aCB0aGUgcHJldmlvdXMgb25lLlxuXHRcdFx0XHRcdGRpZmZzWyBwb2ludGVyIC0gMSBdWyAxIF0gKz0gZGlmZnNbIHBvaW50ZXIgXVsgMSBdO1xuXHRcdFx0XHRcdGRpZmZzLnNwbGljZSggcG9pbnRlciwgMSApO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHBvaW50ZXIrKztcblx0XHRcdFx0fVxuXHRcdFx0XHRjb3VudEluc2VydCA9IDA7XG5cdFx0XHRcdGNvdW50RGVsZXRlID0gMDtcblx0XHRcdFx0dGV4dERlbGV0ZSA9IFwiXCI7XG5cdFx0XHRcdHRleHRJbnNlcnQgPSBcIlwiO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKCBkaWZmc1sgZGlmZnMubGVuZ3RoIC0gMSBdWyAxIF0gPT09IFwiXCIgKSB7XG5cdFx0XHRkaWZmcy5wb3AoKTsgLy8gUmVtb3ZlIHRoZSBkdW1teSBlbnRyeSBhdCB0aGUgZW5kLlxuXHRcdH1cblxuXHRcdC8vIFNlY29uZCBwYXNzOiBsb29rIGZvciBzaW5nbGUgZWRpdHMgc3Vycm91bmRlZCBvbiBib3RoIHNpZGVzIGJ5IGVxdWFsaXRpZXNcblx0XHQvLyB3aGljaCBjYW4gYmUgc2hpZnRlZCBzaWRld2F5cyB0byBlbGltaW5hdGUgYW4gZXF1YWxpdHkuXG5cdFx0Ly8gZS5nOiBBPGlucz5CQTwvaW5zPkMgLT4gPGlucz5BQjwvaW5zPkFDXG5cdFx0Y2hhbmdlcyA9IGZhbHNlO1xuXHRcdHBvaW50ZXIgPSAxO1xuXG5cdFx0Ly8gSW50ZW50aW9uYWxseSBpZ25vcmUgdGhlIGZpcnN0IGFuZCBsYXN0IGVsZW1lbnQgKGRvbid0IG5lZWQgY2hlY2tpbmcpLlxuXHRcdHdoaWxlICggcG9pbnRlciA8IGRpZmZzLmxlbmd0aCAtIDEgKSB7XG5cdFx0XHRpZiAoIGRpZmZzWyBwb2ludGVyIC0gMSBdWyAwIF0gPT09IERJRkZfRVFVQUwgJiZcblx0XHRcdFx0XHRkaWZmc1sgcG9pbnRlciArIDEgXVsgMCBdID09PSBESUZGX0VRVUFMICkge1xuXG5cdFx0XHRcdGRpZmZQb2ludGVyID0gZGlmZnNbIHBvaW50ZXIgXVsgMSBdO1xuXHRcdFx0XHRwb3NpdGlvbiA9IGRpZmZQb2ludGVyLnN1YnN0cmluZyhcblx0XHRcdFx0XHRkaWZmUG9pbnRlci5sZW5ndGggLSBkaWZmc1sgcG9pbnRlciAtIDEgXVsgMSBdLmxlbmd0aFxuXHRcdFx0XHQpO1xuXG5cdFx0XHRcdC8vIFRoaXMgaXMgYSBzaW5nbGUgZWRpdCBzdXJyb3VuZGVkIGJ5IGVxdWFsaXRpZXMuXG5cdFx0XHRcdGlmICggcG9zaXRpb24gPT09IGRpZmZzWyBwb2ludGVyIC0gMSBdWyAxIF0gKSB7XG5cblx0XHRcdFx0XHQvLyBTaGlmdCB0aGUgZWRpdCBvdmVyIHRoZSBwcmV2aW91cyBlcXVhbGl0eS5cblx0XHRcdFx0XHRkaWZmc1sgcG9pbnRlciBdWyAxIF0gPSBkaWZmc1sgcG9pbnRlciAtIDEgXVsgMSBdICtcblx0XHRcdFx0XHRcdGRpZmZzWyBwb2ludGVyIF1bIDEgXS5zdWJzdHJpbmcoIDAsIGRpZmZzWyBwb2ludGVyIF1bIDEgXS5sZW5ndGggLVxuXHRcdFx0XHRcdFx0XHRkaWZmc1sgcG9pbnRlciAtIDEgXVsgMSBdLmxlbmd0aCApO1xuXHRcdFx0XHRcdGRpZmZzWyBwb2ludGVyICsgMSBdWyAxIF0gPVxuXHRcdFx0XHRcdFx0ZGlmZnNbIHBvaW50ZXIgLSAxIF1bIDEgXSArIGRpZmZzWyBwb2ludGVyICsgMSBdWyAxIF07XG5cdFx0XHRcdFx0ZGlmZnMuc3BsaWNlKCBwb2ludGVyIC0gMSwgMSApO1xuXHRcdFx0XHRcdGNoYW5nZXMgPSB0cnVlO1xuXHRcdFx0XHR9IGVsc2UgaWYgKCBkaWZmUG9pbnRlci5zdWJzdHJpbmcoIDAsIGRpZmZzWyBwb2ludGVyICsgMSBdWyAxIF0ubGVuZ3RoICkgPT09XG5cdFx0XHRcdFx0XHRkaWZmc1sgcG9pbnRlciArIDEgXVsgMSBdICkge1xuXG5cdFx0XHRcdFx0Ly8gU2hpZnQgdGhlIGVkaXQgb3ZlciB0aGUgbmV4dCBlcXVhbGl0eS5cblx0XHRcdFx0XHRkaWZmc1sgcG9pbnRlciAtIDEgXVsgMSBdICs9IGRpZmZzWyBwb2ludGVyICsgMSBdWyAxIF07XG5cdFx0XHRcdFx0ZGlmZnNbIHBvaW50ZXIgXVsgMSBdID1cblx0XHRcdFx0XHRcdGRpZmZzWyBwb2ludGVyIF1bIDEgXS5zdWJzdHJpbmcoIGRpZmZzWyBwb2ludGVyICsgMSBdWyAxIF0ubGVuZ3RoICkgK1xuXHRcdFx0XHRcdFx0ZGlmZnNbIHBvaW50ZXIgKyAxIF1bIDEgXTtcblx0XHRcdFx0XHRkaWZmcy5zcGxpY2UoIHBvaW50ZXIgKyAxLCAxICk7XG5cdFx0XHRcdFx0Y2hhbmdlcyA9IHRydWU7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHBvaW50ZXIrKztcblx0XHR9XG5cdFx0Ly8gSWYgc2hpZnRzIHdlcmUgbWFkZSwgdGhlIGRpZmYgbmVlZHMgcmVvcmRlcmluZyBhbmQgYW5vdGhlciBzaGlmdCBzd2VlcC5cblx0XHRpZiAoIGNoYW5nZXMgKSB7XG5cdFx0XHR0aGlzLmRpZmZDbGVhbnVwTWVyZ2UoIGRpZmZzICk7XG5cdFx0fVxuXHR9O1xuXG5cdHJldHVybiBmdW5jdGlvbiggbywgbiApIHtcblx0XHR2YXIgZGlmZiwgb3V0cHV0LCB0ZXh0O1xuXHRcdGRpZmYgPSBuZXcgRGlmZk1hdGNoUGF0Y2goKTtcblx0XHRvdXRwdXQgPSBkaWZmLkRpZmZNYWluKCBvLCBuICk7XG5cdFx0ZGlmZi5kaWZmQ2xlYW51cEVmZmljaWVuY3koIG91dHB1dCApO1xuXHRcdHRleHQgPSBkaWZmLmRpZmZQcmV0dHlIdG1sKCBvdXRwdXQgKTtcblxuXHRcdHJldHVybiB0ZXh0O1xuXHR9O1xufSgpICk7XG5cbi8vIEdldCBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdCwgbGlrZSB3aW5kb3cgaW4gYnJvd3NlcnNcbn0oIChmdW5jdGlvbigpIHtcblx0cmV0dXJuIHRoaXM7XG59KSgpICkpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbi8vIERvbid0IGxvYWQgdGhlIEhUTUwgUmVwb3J0ZXIgb24gbm9uLUJyb3dzZXIgZW52aXJvbm1lbnRzXG5pZiAoIHR5cGVvZiB3aW5kb3cgPT09IFwidW5kZWZpbmVkXCIgfHwgIXdpbmRvdy5kb2N1bWVudCApIHtcblx0cmV0dXJuO1xufVxuXG4vLyBEZXByZWNhdGVkIFFVbml0LmluaXQgLSBSZWYgIzUzMFxuLy8gUmUtaW5pdGlhbGl6ZSB0aGUgY29uZmlndXJhdGlvbiBvcHRpb25zXG5RVW5pdC5pbml0ID0gZnVuY3Rpb24oKSB7XG5cdHZhciB0ZXN0cywgYmFubmVyLCByZXN1bHQsIHF1bml0LFxuXHRcdGNvbmZpZyA9IFFVbml0LmNvbmZpZztcblxuXHRjb25maWcuc3RhdHMgPSB7IGFsbDogMCwgYmFkOiAwIH07XG5cdGNvbmZpZy5tb2R1bGVTdGF0cyA9IHsgYWxsOiAwLCBiYWQ6IDAgfTtcblx0Y29uZmlnLnN0YXJ0ZWQgPSAwO1xuXHRjb25maWcudXBkYXRlUmF0ZSA9IDEwMDA7XG5cdGNvbmZpZy5ibG9ja2luZyA9IGZhbHNlO1xuXHRjb25maWcuYXV0b3N0YXJ0ID0gdHJ1ZTtcblx0Y29uZmlnLmF1dG9ydW4gPSBmYWxzZTtcblx0Y29uZmlnLmZpbHRlciA9IFwiXCI7XG5cdGNvbmZpZy5xdWV1ZSA9IFtdO1xuXG5cdC8vIFJldHVybiBvbiBub24tYnJvd3NlciBlbnZpcm9ubWVudHNcblx0Ly8gVGhpcyBpcyBuZWNlc3NhcnkgdG8gbm90IGJyZWFrIG9uIG5vZGUgdGVzdHNcblx0aWYgKCB0eXBlb2Ygd2luZG93ID09PSBcInVuZGVmaW5lZFwiICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdHF1bml0ID0gaWQoIFwicXVuaXRcIiApO1xuXHRpZiAoIHF1bml0ICkge1xuXHRcdHF1bml0LmlubmVySFRNTCA9XG5cdFx0XHRcIjxoMSBpZD0ncXVuaXQtaGVhZGVyJz5cIiArIGVzY2FwZVRleHQoIGRvY3VtZW50LnRpdGxlICkgKyBcIjwvaDE+XCIgK1xuXHRcdFx0XCI8aDIgaWQ9J3F1bml0LWJhbm5lcic+PC9oMj5cIiArXG5cdFx0XHRcIjxkaXYgaWQ9J3F1bml0LXRlc3RydW5uZXItdG9vbGJhcic+PC9kaXY+XCIgK1xuXHRcdFx0XCI8aDIgaWQ9J3F1bml0LXVzZXJBZ2VudCc+PC9oMj5cIiArXG5cdFx0XHRcIjxvbCBpZD0ncXVuaXQtdGVzdHMnPjwvb2w+XCI7XG5cdH1cblxuXHR0ZXN0cyA9IGlkKCBcInF1bml0LXRlc3RzXCIgKTtcblx0YmFubmVyID0gaWQoIFwicXVuaXQtYmFubmVyXCIgKTtcblx0cmVzdWx0ID0gaWQoIFwicXVuaXQtdGVzdHJlc3VsdFwiICk7XG5cblx0aWYgKCB0ZXN0cyApIHtcblx0XHR0ZXN0cy5pbm5lckhUTUwgPSBcIlwiO1xuXHR9XG5cblx0aWYgKCBiYW5uZXIgKSB7XG5cdFx0YmFubmVyLmNsYXNzTmFtZSA9IFwiXCI7XG5cdH1cblxuXHRpZiAoIHJlc3VsdCApIHtcblx0XHRyZXN1bHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggcmVzdWx0ICk7XG5cdH1cblxuXHRpZiAoIHRlc3RzICkge1xuXHRcdHJlc3VsdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwicFwiICk7XG5cdFx0cmVzdWx0LmlkID0gXCJxdW5pdC10ZXN0cmVzdWx0XCI7XG5cdFx0cmVzdWx0LmNsYXNzTmFtZSA9IFwicmVzdWx0XCI7XG5cdFx0dGVzdHMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoIHJlc3VsdCwgdGVzdHMgKTtcblx0XHRyZXN1bHQuaW5uZXJIVE1MID0gXCJSdW5uaW5nLi4uPGJyIC8+JiMxNjA7XCI7XG5cdH1cbn07XG5cbnZhciBjb25maWcgPSBRVW5pdC5jb25maWcsXG5cdGNvbGxhcHNlTmV4dCA9IGZhbHNlLFxuXHRoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LFxuXHRkZWZpbmVkID0ge1xuXHRcdGRvY3VtZW50OiB3aW5kb3cuZG9jdW1lbnQgIT09IHVuZGVmaW5lZCxcblx0XHRzZXNzaW9uU3RvcmFnZTogKGZ1bmN0aW9uKCkge1xuXHRcdFx0dmFyIHggPSBcInF1bml0LXRlc3Qtc3RyaW5nXCI7XG5cdFx0XHR0cnkge1xuXHRcdFx0XHRzZXNzaW9uU3RvcmFnZS5zZXRJdGVtKCB4LCB4ICk7XG5cdFx0XHRcdHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oIHggKTtcblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0XHR9IGNhdGNoICggZSApIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH0oKSlcblx0fSxcblx0bW9kdWxlc0xpc3QgPSBbXTtcblxuLyoqXG4qIEVzY2FwZSB0ZXh0IGZvciBhdHRyaWJ1dGUgb3IgdGV4dCBjb250ZW50LlxuKi9cbmZ1bmN0aW9uIGVzY2FwZVRleHQoIHMgKSB7XG5cdGlmICggIXMgKSB7XG5cdFx0cmV0dXJuIFwiXCI7XG5cdH1cblx0cyA9IHMgKyBcIlwiO1xuXG5cdC8vIEJvdGggc2luZ2xlIHF1b3RlcyBhbmQgZG91YmxlIHF1b3RlcyAoZm9yIGF0dHJpYnV0ZXMpXG5cdHJldHVybiBzLnJlcGxhY2UoIC9bJ1wiPD4mXS9nLCBmdW5jdGlvbiggcyApIHtcblx0XHRzd2l0Y2ggKCBzICkge1xuXHRcdGNhc2UgXCInXCI6XG5cdFx0XHRyZXR1cm4gXCImIzAzOTtcIjtcblx0XHRjYXNlIFwiXFxcIlwiOlxuXHRcdFx0cmV0dXJuIFwiJnF1b3Q7XCI7XG5cdFx0Y2FzZSBcIjxcIjpcblx0XHRcdHJldHVybiBcIiZsdDtcIjtcblx0XHRjYXNlIFwiPlwiOlxuXHRcdFx0cmV0dXJuIFwiJmd0O1wiO1xuXHRcdGNhc2UgXCImXCI6XG5cdFx0XHRyZXR1cm4gXCImYW1wO1wiO1xuXHRcdH1cblx0fSk7XG59XG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gZWxlbVxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKi9cbmZ1bmN0aW9uIGFkZEV2ZW50KCBlbGVtLCB0eXBlLCBmbiApIHtcblx0aWYgKCBlbGVtLmFkZEV2ZW50TGlzdGVuZXIgKSB7XG5cblx0XHQvLyBTdGFuZGFyZHMtYmFzZWQgYnJvd3NlcnNcblx0XHRlbGVtLmFkZEV2ZW50TGlzdGVuZXIoIHR5cGUsIGZuLCBmYWxzZSApO1xuXHR9IGVsc2UgaWYgKCBlbGVtLmF0dGFjaEV2ZW50ICkge1xuXG5cdFx0Ly8gc3VwcG9ydDogSUUgPDlcblx0XHRlbGVtLmF0dGFjaEV2ZW50KCBcIm9uXCIgKyB0eXBlLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBldmVudCA9IHdpbmRvdy5ldmVudDtcblx0XHRcdGlmICggIWV2ZW50LnRhcmdldCApIHtcblx0XHRcdFx0ZXZlbnQudGFyZ2V0ID0gZXZlbnQuc3JjRWxlbWVudCB8fCBkb2N1bWVudDtcblx0XHRcdH1cblxuXHRcdFx0Zm4uY2FsbCggZWxlbSwgZXZlbnQgKTtcblx0XHR9KTtcblx0fVxufVxuXG4vKipcbiAqIEBwYXJhbSB7QXJyYXl8Tm9kZUxpc3R9IGVsZW1zXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqL1xuZnVuY3Rpb24gYWRkRXZlbnRzKCBlbGVtcywgdHlwZSwgZm4gKSB7XG5cdHZhciBpID0gZWxlbXMubGVuZ3RoO1xuXHR3aGlsZSAoIGktLSApIHtcblx0XHRhZGRFdmVudCggZWxlbXNbIGkgXSwgdHlwZSwgZm4gKTtcblx0fVxufVxuXG5mdW5jdGlvbiBoYXNDbGFzcyggZWxlbSwgbmFtZSApIHtcblx0cmV0dXJuICggXCIgXCIgKyBlbGVtLmNsYXNzTmFtZSArIFwiIFwiICkuaW5kZXhPZiggXCIgXCIgKyBuYW1lICsgXCIgXCIgKSA+PSAwO1xufVxuXG5mdW5jdGlvbiBhZGRDbGFzcyggZWxlbSwgbmFtZSApIHtcblx0aWYgKCAhaGFzQ2xhc3MoIGVsZW0sIG5hbWUgKSApIHtcblx0XHRlbGVtLmNsYXNzTmFtZSArPSAoIGVsZW0uY2xhc3NOYW1lID8gXCIgXCIgOiBcIlwiICkgKyBuYW1lO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUNsYXNzKCBlbGVtLCBuYW1lICkge1xuXHRpZiAoIGhhc0NsYXNzKCBlbGVtLCBuYW1lICkgKSB7XG5cdFx0cmVtb3ZlQ2xhc3MoIGVsZW0sIG5hbWUgKTtcblx0fSBlbHNlIHtcblx0XHRhZGRDbGFzcyggZWxlbSwgbmFtZSApO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzKCBlbGVtLCBuYW1lICkge1xuXHR2YXIgc2V0ID0gXCIgXCIgKyBlbGVtLmNsYXNzTmFtZSArIFwiIFwiO1xuXG5cdC8vIENsYXNzIG5hbWUgbWF5IGFwcGVhciBtdWx0aXBsZSB0aW1lc1xuXHR3aGlsZSAoIHNldC5pbmRleE9mKCBcIiBcIiArIG5hbWUgKyBcIiBcIiApID49IDAgKSB7XG5cdFx0c2V0ID0gc2V0LnJlcGxhY2UoIFwiIFwiICsgbmFtZSArIFwiIFwiLCBcIiBcIiApO1xuXHR9XG5cblx0Ly8gdHJpbSBmb3IgcHJldHRpbmVzc1xuXHRlbGVtLmNsYXNzTmFtZSA9IHR5cGVvZiBzZXQudHJpbSA9PT0gXCJmdW5jdGlvblwiID8gc2V0LnRyaW0oKSA6IHNldC5yZXBsYWNlKCAvXlxccyt8XFxzKyQvZywgXCJcIiApO1xufVxuXG5mdW5jdGlvbiBpZCggbmFtZSApIHtcblx0cmV0dXJuIGRlZmluZWQuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQgJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoIG5hbWUgKTtcbn1cblxuZnVuY3Rpb24gZ2V0VXJsQ29uZmlnSHRtbCgpIHtcblx0dmFyIGksIGosIHZhbCxcblx0XHRlc2NhcGVkLCBlc2NhcGVkVG9vbHRpcCxcblx0XHRzZWxlY3Rpb24gPSBmYWxzZSxcblx0XHRsZW4gPSBjb25maWcudXJsQ29uZmlnLmxlbmd0aCxcblx0XHR1cmxDb25maWdIdG1sID0gXCJcIjtcblxuXHRmb3IgKCBpID0gMDsgaSA8IGxlbjsgaSsrICkge1xuXHRcdHZhbCA9IGNvbmZpZy51cmxDb25maWdbIGkgXTtcblx0XHRpZiAoIHR5cGVvZiB2YWwgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHR2YWwgPSB7XG5cdFx0XHRcdGlkOiB2YWwsXG5cdFx0XHRcdGxhYmVsOiB2YWxcblx0XHRcdH07XG5cdFx0fVxuXG5cdFx0ZXNjYXBlZCA9IGVzY2FwZVRleHQoIHZhbC5pZCApO1xuXHRcdGVzY2FwZWRUb29sdGlwID0gZXNjYXBlVGV4dCggdmFsLnRvb2x0aXAgKTtcblxuXHRcdGlmICggY29uZmlnWyB2YWwuaWQgXSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdFx0Y29uZmlnWyB2YWwuaWQgXSA9IFFVbml0LnVybFBhcmFtc1sgdmFsLmlkIF07XG5cdFx0fVxuXG5cdFx0aWYgKCAhdmFsLnZhbHVlIHx8IHR5cGVvZiB2YWwudmFsdWUgPT09IFwic3RyaW5nXCIgKSB7XG5cdFx0XHR1cmxDb25maWdIdG1sICs9IFwiPGlucHV0IGlkPSdxdW5pdC11cmxjb25maWctXCIgKyBlc2NhcGVkICtcblx0XHRcdFx0XCInIG5hbWU9J1wiICsgZXNjYXBlZCArIFwiJyB0eXBlPSdjaGVja2JveCdcIiArXG5cdFx0XHRcdCggdmFsLnZhbHVlID8gXCIgdmFsdWU9J1wiICsgZXNjYXBlVGV4dCggdmFsLnZhbHVlICkgKyBcIidcIiA6IFwiXCIgKSArXG5cdFx0XHRcdCggY29uZmlnWyB2YWwuaWQgXSA/IFwiIGNoZWNrZWQ9J2NoZWNrZWQnXCIgOiBcIlwiICkgK1xuXHRcdFx0XHRcIiB0aXRsZT0nXCIgKyBlc2NhcGVkVG9vbHRpcCArIFwiJyAvPjxsYWJlbCBmb3I9J3F1bml0LXVybGNvbmZpZy1cIiArIGVzY2FwZWQgK1xuXHRcdFx0XHRcIicgdGl0bGU9J1wiICsgZXNjYXBlZFRvb2x0aXAgKyBcIic+XCIgKyB2YWwubGFiZWwgKyBcIjwvbGFiZWw+XCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHVybENvbmZpZ0h0bWwgKz0gXCI8bGFiZWwgZm9yPSdxdW5pdC11cmxjb25maWctXCIgKyBlc2NhcGVkICtcblx0XHRcdFx0XCInIHRpdGxlPSdcIiArIGVzY2FwZWRUb29sdGlwICsgXCInPlwiICsgdmFsLmxhYmVsICtcblx0XHRcdFx0XCI6IDwvbGFiZWw+PHNlbGVjdCBpZD0ncXVuaXQtdXJsY29uZmlnLVwiICsgZXNjYXBlZCArXG5cdFx0XHRcdFwiJyBuYW1lPSdcIiArIGVzY2FwZWQgKyBcIicgdGl0bGU9J1wiICsgZXNjYXBlZFRvb2x0aXAgKyBcIic+PG9wdGlvbj48L29wdGlvbj5cIjtcblxuXHRcdFx0aWYgKCBRVW5pdC5pcyggXCJhcnJheVwiLCB2YWwudmFsdWUgKSApIHtcblx0XHRcdFx0Zm9yICggaiA9IDA7IGogPCB2YWwudmFsdWUubGVuZ3RoOyBqKysgKSB7XG5cdFx0XHRcdFx0ZXNjYXBlZCA9IGVzY2FwZVRleHQoIHZhbC52YWx1ZVsgaiBdICk7XG5cdFx0XHRcdFx0dXJsQ29uZmlnSHRtbCArPSBcIjxvcHRpb24gdmFsdWU9J1wiICsgZXNjYXBlZCArIFwiJ1wiICtcblx0XHRcdFx0XHRcdCggY29uZmlnWyB2YWwuaWQgXSA9PT0gdmFsLnZhbHVlWyBqIF0gP1xuXHRcdFx0XHRcdFx0XHQoIHNlbGVjdGlvbiA9IHRydWUgKSAmJiBcIiBzZWxlY3RlZD0nc2VsZWN0ZWQnXCIgOiBcIlwiICkgK1xuXHRcdFx0XHRcdFx0XCI+XCIgKyBlc2NhcGVkICsgXCI8L29wdGlvbj5cIjtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Zm9yICggaiBpbiB2YWwudmFsdWUgKSB7XG5cdFx0XHRcdFx0aWYgKCBoYXNPd24uY2FsbCggdmFsLnZhbHVlLCBqICkgKSB7XG5cdFx0XHRcdFx0XHR1cmxDb25maWdIdG1sICs9IFwiPG9wdGlvbiB2YWx1ZT0nXCIgKyBlc2NhcGVUZXh0KCBqICkgKyBcIidcIiArXG5cdFx0XHRcdFx0XHRcdCggY29uZmlnWyB2YWwuaWQgXSA9PT0gaiA/XG5cdFx0XHRcdFx0XHRcdFx0KCBzZWxlY3Rpb24gPSB0cnVlICkgJiYgXCIgc2VsZWN0ZWQ9J3NlbGVjdGVkJ1wiIDogXCJcIiApICtcblx0XHRcdFx0XHRcdFx0XCI+XCIgKyBlc2NhcGVUZXh0KCB2YWwudmFsdWVbIGogXSApICsgXCI8L29wdGlvbj5cIjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGlmICggY29uZmlnWyB2YWwuaWQgXSAmJiAhc2VsZWN0aW9uICkge1xuXHRcdFx0XHRlc2NhcGVkID0gZXNjYXBlVGV4dCggY29uZmlnWyB2YWwuaWQgXSApO1xuXHRcdFx0XHR1cmxDb25maWdIdG1sICs9IFwiPG9wdGlvbiB2YWx1ZT0nXCIgKyBlc2NhcGVkICtcblx0XHRcdFx0XHRcIicgc2VsZWN0ZWQ9J3NlbGVjdGVkJyBkaXNhYmxlZD0nZGlzYWJsZWQnPlwiICsgZXNjYXBlZCArIFwiPC9vcHRpb24+XCI7XG5cdFx0XHR9XG5cdFx0XHR1cmxDb25maWdIdG1sICs9IFwiPC9zZWxlY3Q+XCI7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHVybENvbmZpZ0h0bWw7XG59XG5cbi8vIEhhbmRsZSBcImNsaWNrXCIgZXZlbnRzIG9uIHRvb2xiYXIgY2hlY2tib3hlcyBhbmQgXCJjaGFuZ2VcIiBmb3Igc2VsZWN0IG1lbnVzLlxuLy8gVXBkYXRlcyB0aGUgVVJMIHdpdGggdGhlIG5ldyBzdGF0ZSBvZiBgY29uZmlnLnVybENvbmZpZ2AgdmFsdWVzLlxuZnVuY3Rpb24gdG9vbGJhckNoYW5nZWQoKSB7XG5cdHZhciB1cGRhdGVkVXJsLCB2YWx1ZSxcblx0XHRmaWVsZCA9IHRoaXMsXG5cdFx0cGFyYW1zID0ge307XG5cblx0Ly8gRGV0ZWN0IGlmIGZpZWxkIGlzIGEgc2VsZWN0IG1lbnUgb3IgYSBjaGVja2JveFxuXHRpZiAoIFwic2VsZWN0ZWRJbmRleFwiIGluIGZpZWxkICkge1xuXHRcdHZhbHVlID0gZmllbGQub3B0aW9uc1sgZmllbGQuc2VsZWN0ZWRJbmRleCBdLnZhbHVlIHx8IHVuZGVmaW5lZDtcblx0fSBlbHNlIHtcblx0XHR2YWx1ZSA9IGZpZWxkLmNoZWNrZWQgPyAoIGZpZWxkLmRlZmF1bHRWYWx1ZSB8fCB0cnVlICkgOiB1bmRlZmluZWQ7XG5cdH1cblxuXHRwYXJhbXNbIGZpZWxkLm5hbWUgXSA9IHZhbHVlO1xuXHR1cGRhdGVkVXJsID0gc2V0VXJsKCBwYXJhbXMgKTtcblxuXHRpZiAoIFwiaGlkZXBhc3NlZFwiID09PSBmaWVsZC5uYW1lICYmIFwicmVwbGFjZVN0YXRlXCIgaW4gd2luZG93Lmhpc3RvcnkgKSB7XG5cdFx0Y29uZmlnWyBmaWVsZC5uYW1lIF0gPSB2YWx1ZSB8fCBmYWxzZTtcblx0XHRpZiAoIHZhbHVlICkge1xuXHRcdFx0YWRkQ2xhc3MoIGlkKCBcInF1bml0LXRlc3RzXCIgKSwgXCJoaWRlcGFzc1wiICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlbW92ZUNsYXNzKCBpZCggXCJxdW5pdC10ZXN0c1wiICksIFwiaGlkZXBhc3NcIiApO1xuXHRcdH1cblxuXHRcdC8vIEl0IGlzIG5vdCBuZWNlc3NhcnkgdG8gcmVmcmVzaCB0aGUgd2hvbGUgcGFnZVxuXHRcdHdpbmRvdy5oaXN0b3J5LnJlcGxhY2VTdGF0ZSggbnVsbCwgXCJcIiwgdXBkYXRlZFVybCApO1xuXHR9IGVsc2Uge1xuXHRcdHdpbmRvdy5sb2NhdGlvbiA9IHVwZGF0ZWRVcmw7XG5cdH1cbn1cblxuZnVuY3Rpb24gc2V0VXJsKCBwYXJhbXMgKSB7XG5cdHZhciBrZXksXG5cdFx0cXVlcnlzdHJpbmcgPSBcIj9cIjtcblxuXHRwYXJhbXMgPSBRVW5pdC5leHRlbmQoIFFVbml0LmV4dGVuZCgge30sIFFVbml0LnVybFBhcmFtcyApLCBwYXJhbXMgKTtcblxuXHRmb3IgKCBrZXkgaW4gcGFyYW1zICkge1xuXHRcdGlmICggaGFzT3duLmNhbGwoIHBhcmFtcywga2V5ICkgKSB7XG5cdFx0XHRpZiAoIHBhcmFtc1sga2V5IF0gPT09IHVuZGVmaW5lZCApIHtcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHR9XG5cdFx0XHRxdWVyeXN0cmluZyArPSBlbmNvZGVVUklDb21wb25lbnQoIGtleSApO1xuXHRcdFx0aWYgKCBwYXJhbXNbIGtleSBdICE9PSB0cnVlICkge1xuXHRcdFx0XHRxdWVyeXN0cmluZyArPSBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCggcGFyYW1zWyBrZXkgXSApO1xuXHRcdFx0fVxuXHRcdFx0cXVlcnlzdHJpbmcgKz0gXCImXCI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3QgK1xuXHRcdGxvY2F0aW9uLnBhdGhuYW1lICsgcXVlcnlzdHJpbmcuc2xpY2UoIDAsIC0xICk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5VXJsUGFyYW1zKCkge1xuXHR2YXIgc2VsZWN0ZWRNb2R1bGUsXG5cdFx0bW9kdWxlc0xpc3QgPSBpZCggXCJxdW5pdC1tb2R1bGVmaWx0ZXJcIiApLFxuXHRcdGZpbHRlciA9IGlkKCBcInF1bml0LWZpbHRlci1pbnB1dFwiICkudmFsdWU7XG5cblx0c2VsZWN0ZWRNb2R1bGUgPSBtb2R1bGVzTGlzdCA/XG5cdFx0ZGVjb2RlVVJJQ29tcG9uZW50KCBtb2R1bGVzTGlzdC5vcHRpb25zWyBtb2R1bGVzTGlzdC5zZWxlY3RlZEluZGV4IF0udmFsdWUgKSA6XG5cdFx0dW5kZWZpbmVkO1xuXG5cdHdpbmRvdy5sb2NhdGlvbiA9IHNldFVybCh7XG5cdFx0bW9kdWxlOiAoIHNlbGVjdGVkTW9kdWxlID09PSBcIlwiICkgPyB1bmRlZmluZWQgOiBzZWxlY3RlZE1vZHVsZSxcblx0XHRmaWx0ZXI6ICggZmlsdGVyID09PSBcIlwiICkgPyB1bmRlZmluZWQgOiBmaWx0ZXIsXG5cblx0XHQvLyBSZW1vdmUgdGVzdElkIGZpbHRlclxuXHRcdHRlc3RJZDogdW5kZWZpbmVkXG5cdH0pO1xufVxuXG5mdW5jdGlvbiB0b29sYmFyVXJsQ29uZmlnQ29udGFpbmVyKCkge1xuXHR2YXIgdXJsQ29uZmlnQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJzcGFuXCIgKTtcblxuXHR1cmxDb25maWdDb250YWluZXIuaW5uZXJIVE1MID0gZ2V0VXJsQ29uZmlnSHRtbCgpO1xuXHRhZGRDbGFzcyggdXJsQ29uZmlnQ29udGFpbmVyLCBcInF1bml0LXVybC1jb25maWdcIiApO1xuXG5cdC8vIEZvciBvbGRJRSBzdXBwb3J0OlxuXHQvLyAqIEFkZCBoYW5kbGVycyB0byB0aGUgaW5kaXZpZHVhbCBlbGVtZW50cyBpbnN0ZWFkIG9mIHRoZSBjb250YWluZXJcblx0Ly8gKiBVc2UgXCJjbGlja1wiIGluc3RlYWQgb2YgXCJjaGFuZ2VcIiBmb3IgY2hlY2tib3hlc1xuXHRhZGRFdmVudHMoIHVybENvbmZpZ0NvbnRhaW5lci5nZXRFbGVtZW50c0J5VGFnTmFtZSggXCJpbnB1dFwiICksIFwiY2xpY2tcIiwgdG9vbGJhckNoYW5nZWQgKTtcblx0YWRkRXZlbnRzKCB1cmxDb25maWdDb250YWluZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwic2VsZWN0XCIgKSwgXCJjaGFuZ2VcIiwgdG9vbGJhckNoYW5nZWQgKTtcblxuXHRyZXR1cm4gdXJsQ29uZmlnQ29udGFpbmVyO1xufVxuXG5mdW5jdGlvbiB0b29sYmFyTG9vc2VGaWx0ZXIoKSB7XG5cdHZhciBmaWx0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImZvcm1cIiApLFxuXHRcdGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJsYWJlbFwiICksXG5cdFx0aW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImlucHV0XCIgKSxcblx0XHRidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImJ1dHRvblwiICk7XG5cblx0YWRkQ2xhc3MoIGZpbHRlciwgXCJxdW5pdC1maWx0ZXJcIiApO1xuXG5cdGxhYmVsLmlubmVySFRNTCA9IFwiRmlsdGVyOiBcIjtcblxuXHRpbnB1dC50eXBlID0gXCJ0ZXh0XCI7XG5cdGlucHV0LnZhbHVlID0gY29uZmlnLmZpbHRlciB8fCBcIlwiO1xuXHRpbnB1dC5uYW1lID0gXCJmaWx0ZXJcIjtcblx0aW5wdXQuaWQgPSBcInF1bml0LWZpbHRlci1pbnB1dFwiO1xuXG5cdGJ1dHRvbi5pbm5lckhUTUwgPSBcIkdvXCI7XG5cblx0bGFiZWwuYXBwZW5kQ2hpbGQoIGlucHV0ICk7XG5cblx0ZmlsdGVyLmFwcGVuZENoaWxkKCBsYWJlbCApO1xuXHRmaWx0ZXIuYXBwZW5kQ2hpbGQoIGJ1dHRvbiApO1xuXHRhZGRFdmVudCggZmlsdGVyLCBcInN1Ym1pdFwiLCBmdW5jdGlvbiggZXYgKSB7XG5cdFx0YXBwbHlVcmxQYXJhbXMoKTtcblxuXHRcdGlmICggZXYgJiYgZXYucHJldmVudERlZmF1bHQgKSB7XG5cdFx0XHRldi5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdH1cblxuXHRcdHJldHVybiBmYWxzZTtcblx0fSk7XG5cblx0cmV0dXJuIGZpbHRlcjtcbn1cblxuZnVuY3Rpb24gdG9vbGJhck1vZHVsZUZpbHRlckh0bWwoKSB7XG5cdHZhciBpLFxuXHRcdG1vZHVsZUZpbHRlckh0bWwgPSBcIlwiO1xuXG5cdGlmICggIW1vZHVsZXNMaXN0Lmxlbmd0aCApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRtb2R1bGVzTGlzdC5zb3J0KGZ1bmN0aW9uKCBhLCBiICkge1xuXHRcdHJldHVybiBhLmxvY2FsZUNvbXBhcmUoIGIgKTtcblx0fSk7XG5cblx0bW9kdWxlRmlsdGVySHRtbCArPSBcIjxsYWJlbCBmb3I9J3F1bml0LW1vZHVsZWZpbHRlcic+TW9kdWxlOiA8L2xhYmVsPlwiICtcblx0XHRcIjxzZWxlY3QgaWQ9J3F1bml0LW1vZHVsZWZpbHRlcicgbmFtZT0nbW9kdWxlZmlsdGVyJz48b3B0aW9uIHZhbHVlPScnIFwiICtcblx0XHQoIFFVbml0LnVybFBhcmFtcy5tb2R1bGUgPT09IHVuZGVmaW5lZCA/IFwic2VsZWN0ZWQ9J3NlbGVjdGVkJ1wiIDogXCJcIiApICtcblx0XHRcIj48IEFsbCBNb2R1bGVzID48L29wdGlvbj5cIjtcblxuXHRmb3IgKCBpID0gMDsgaSA8IG1vZHVsZXNMaXN0Lmxlbmd0aDsgaSsrICkge1xuXHRcdG1vZHVsZUZpbHRlckh0bWwgKz0gXCI8b3B0aW9uIHZhbHVlPSdcIiArXG5cdFx0XHRlc2NhcGVUZXh0KCBlbmNvZGVVUklDb21wb25lbnQoIG1vZHVsZXNMaXN0WyBpIF0gKSApICsgXCInIFwiICtcblx0XHRcdCggUVVuaXQudXJsUGFyYW1zLm1vZHVsZSA9PT0gbW9kdWxlc0xpc3RbIGkgXSA/IFwic2VsZWN0ZWQ9J3NlbGVjdGVkJ1wiIDogXCJcIiApICtcblx0XHRcdFwiPlwiICsgZXNjYXBlVGV4dCggbW9kdWxlc0xpc3RbIGkgXSApICsgXCI8L29wdGlvbj5cIjtcblx0fVxuXHRtb2R1bGVGaWx0ZXJIdG1sICs9IFwiPC9zZWxlY3Q+XCI7XG5cblx0cmV0dXJuIG1vZHVsZUZpbHRlckh0bWw7XG59XG5cbmZ1bmN0aW9uIHRvb2xiYXJNb2R1bGVGaWx0ZXIoKSB7XG5cdHZhciB0b29sYmFyID0gaWQoIFwicXVuaXQtdGVzdHJ1bm5lci10b29sYmFyXCIgKSxcblx0XHRtb2R1bGVGaWx0ZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcInNwYW5cIiApLFxuXHRcdG1vZHVsZUZpbHRlckh0bWwgPSB0b29sYmFyTW9kdWxlRmlsdGVySHRtbCgpO1xuXG5cdGlmICggIXRvb2xiYXIgfHwgIW1vZHVsZUZpbHRlckh0bWwgKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0bW9kdWxlRmlsdGVyLnNldEF0dHJpYnV0ZSggXCJpZFwiLCBcInF1bml0LW1vZHVsZWZpbHRlci1jb250YWluZXJcIiApO1xuXHRtb2R1bGVGaWx0ZXIuaW5uZXJIVE1MID0gbW9kdWxlRmlsdGVySHRtbDtcblxuXHRhZGRFdmVudCggbW9kdWxlRmlsdGVyLmxhc3RDaGlsZCwgXCJjaGFuZ2VcIiwgYXBwbHlVcmxQYXJhbXMgKTtcblxuXHR0b29sYmFyLmFwcGVuZENoaWxkKCBtb2R1bGVGaWx0ZXIgKTtcbn1cblxuZnVuY3Rpb24gYXBwZW5kVG9vbGJhcigpIHtcblx0dmFyIHRvb2xiYXIgPSBpZCggXCJxdW5pdC10ZXN0cnVubmVyLXRvb2xiYXJcIiApO1xuXG5cdGlmICggdG9vbGJhciApIHtcblx0XHR0b29sYmFyLmFwcGVuZENoaWxkKCB0b29sYmFyVXJsQ29uZmlnQ29udGFpbmVyKCkgKTtcblx0XHR0b29sYmFyLmFwcGVuZENoaWxkKCB0b29sYmFyTG9vc2VGaWx0ZXIoKSApO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEhlYWRlcigpIHtcblx0dmFyIGhlYWRlciA9IGlkKCBcInF1bml0LWhlYWRlclwiICk7XG5cblx0aWYgKCBoZWFkZXIgKSB7XG5cdFx0aGVhZGVyLmlubmVySFRNTCA9IFwiPGEgaHJlZj0nXCIgK1xuXHRcdFx0c2V0VXJsKHsgZmlsdGVyOiB1bmRlZmluZWQsIG1vZHVsZTogdW5kZWZpbmVkLCB0ZXN0SWQ6IHVuZGVmaW5lZCB9KSArXG5cdFx0XHRcIic+XCIgKyBoZWFkZXIuaW5uZXJIVE1MICsgXCI8L2E+IFwiO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEJhbm5lcigpIHtcblx0dmFyIGJhbm5lciA9IGlkKCBcInF1bml0LWJhbm5lclwiICk7XG5cblx0aWYgKCBiYW5uZXIgKSB7XG5cdFx0YmFubmVyLmNsYXNzTmFtZSA9IFwiXCI7XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwZW5kVGVzdFJlc3VsdHMoKSB7XG5cdHZhciB0ZXN0cyA9IGlkKCBcInF1bml0LXRlc3RzXCIgKSxcblx0XHRyZXN1bHQgPSBpZCggXCJxdW5pdC10ZXN0cmVzdWx0XCIgKTtcblxuXHRpZiAoIHJlc3VsdCApIHtcblx0XHRyZXN1bHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCggcmVzdWx0ICk7XG5cdH1cblxuXHRpZiAoIHRlc3RzICkge1xuXHRcdHRlc3RzLmlubmVySFRNTCA9IFwiXCI7XG5cdFx0cmVzdWx0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJwXCIgKTtcblx0XHRyZXN1bHQuaWQgPSBcInF1bml0LXRlc3RyZXN1bHRcIjtcblx0XHRyZXN1bHQuY2xhc3NOYW1lID0gXCJyZXN1bHRcIjtcblx0XHR0ZXN0cy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSggcmVzdWx0LCB0ZXN0cyApO1xuXHRcdHJlc3VsdC5pbm5lckhUTUwgPSBcIlJ1bm5pbmcuLi48YnIgLz4mIzE2MDtcIjtcblx0fVxufVxuXG5mdW5jdGlvbiBzdG9yZUZpeHR1cmUoKSB7XG5cdHZhciBmaXh0dXJlID0gaWQoIFwicXVuaXQtZml4dHVyZVwiICk7XG5cdGlmICggZml4dHVyZSApIHtcblx0XHRjb25maWcuZml4dHVyZSA9IGZpeHR1cmUuaW5uZXJIVE1MO1xuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEZpbHRlcmVkVGVzdCgpIHtcblx0dmFyIHRlc3RJZCA9IFFVbml0LmNvbmZpZy50ZXN0SWQ7XG5cdGlmICggIXRlc3RJZCB8fCB0ZXN0SWQubGVuZ3RoIDw9IDAgKSB7XG5cdFx0cmV0dXJuIFwiXCI7XG5cdH1cblx0cmV0dXJuIFwiPGRpdiBpZD0ncXVuaXQtZmlsdGVyZWRUZXN0Jz5SZXJ1bm5pbmcgc2VsZWN0ZWQgdGVzdHM6IFwiICsgdGVzdElkLmpvaW4oXCIsIFwiKSArXG5cdFx0XCIgPGEgaWQ9J3F1bml0LWNsZWFyRmlsdGVyJyBocmVmPSdcIiArXG5cdFx0c2V0VXJsKHsgZmlsdGVyOiB1bmRlZmluZWQsIG1vZHVsZTogdW5kZWZpbmVkLCB0ZXN0SWQ6IHVuZGVmaW5lZCB9KSArXG5cdFx0XCInPlwiICsgXCJSdW4gYWxsIHRlc3RzXCIgKyBcIjwvYT48L2Rpdj5cIjtcbn1cblxuZnVuY3Rpb24gYXBwZW5kVXNlckFnZW50KCkge1xuXHR2YXIgdXNlckFnZW50ID0gaWQoIFwicXVuaXQtdXNlckFnZW50XCIgKTtcblxuXHRpZiAoIHVzZXJBZ2VudCApIHtcblx0XHR1c2VyQWdlbnQuaW5uZXJIVE1MID0gXCJcIjtcblx0XHR1c2VyQWdlbnQuYXBwZW5kQ2hpbGQoXG5cdFx0XHRkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShcblx0XHRcdFx0XCJRVW5pdCBcIiArIFFVbml0LnZlcnNpb24gKyBcIjsgXCIgKyBuYXZpZ2F0b3IudXNlckFnZW50XG5cdFx0XHQpXG5cdFx0KTtcblx0fVxufVxuXG5mdW5jdGlvbiBhcHBlbmRUZXN0c0xpc3QoIG1vZHVsZXMgKSB7XG5cdHZhciBpLCBsLCB4LCB6LCB0ZXN0LCBtb2R1bGVPYmo7XG5cblx0Zm9yICggaSA9IDAsIGwgPSBtb2R1bGVzLmxlbmd0aDsgaSA8IGw7IGkrKyApIHtcblx0XHRtb2R1bGVPYmogPSBtb2R1bGVzWyBpIF07XG5cblx0XHRpZiAoIG1vZHVsZU9iai5uYW1lICkge1xuXHRcdFx0bW9kdWxlc0xpc3QucHVzaCggbW9kdWxlT2JqLm5hbWUgKTtcblx0XHR9XG5cblx0XHRmb3IgKCB4ID0gMCwgeiA9IG1vZHVsZU9iai50ZXN0cy5sZW5ndGg7IHggPCB6OyB4KysgKSB7XG5cdFx0XHR0ZXN0ID0gbW9kdWxlT2JqLnRlc3RzWyB4IF07XG5cblx0XHRcdGFwcGVuZFRlc3QoIHRlc3QubmFtZSwgdGVzdC50ZXN0SWQsIG1vZHVsZU9iai5uYW1lICk7XG5cdFx0fVxuXHR9XG59XG5cbmZ1bmN0aW9uIGFwcGVuZFRlc3QoIG5hbWUsIHRlc3RJZCwgbW9kdWxlTmFtZSApIHtcblx0dmFyIHRpdGxlLCByZXJ1blRyaWdnZXIsIHRlc3RCbG9jaywgYXNzZXJ0TGlzdCxcblx0XHR0ZXN0cyA9IGlkKCBcInF1bml0LXRlc3RzXCIgKTtcblxuXHRpZiAoICF0ZXN0cyApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHR0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwic3Ryb25nXCIgKTtcblx0dGl0bGUuaW5uZXJIVE1MID0gZ2V0TmFtZUh0bWwoIG5hbWUsIG1vZHVsZU5hbWUgKTtcblxuXHRyZXJ1blRyaWdnZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImFcIiApO1xuXHRyZXJ1blRyaWdnZXIuaW5uZXJIVE1MID0gXCJSZXJ1blwiO1xuXHRyZXJ1blRyaWdnZXIuaHJlZiA9IHNldFVybCh7IHRlc3RJZDogdGVzdElkIH0pO1xuXG5cdHRlc3RCbG9jayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwibGlcIiApO1xuXHR0ZXN0QmxvY2suYXBwZW5kQ2hpbGQoIHRpdGxlICk7XG5cdHRlc3RCbG9jay5hcHBlbmRDaGlsZCggcmVydW5UcmlnZ2VyICk7XG5cdHRlc3RCbG9jay5pZCA9IFwicXVuaXQtdGVzdC1vdXRwdXQtXCIgKyB0ZXN0SWQ7XG5cblx0YXNzZXJ0TGlzdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwib2xcIiApO1xuXHRhc3NlcnRMaXN0LmNsYXNzTmFtZSA9IFwicXVuaXQtYXNzZXJ0LWxpc3RcIjtcblxuXHR0ZXN0QmxvY2suYXBwZW5kQ2hpbGQoIGFzc2VydExpc3QgKTtcblxuXHR0ZXN0cy5hcHBlbmRDaGlsZCggdGVzdEJsb2NrICk7XG59XG5cbi8vIEhUTUwgUmVwb3J0ZXIgaW5pdGlhbGl6YXRpb24gYW5kIGxvYWRcblFVbml0LmJlZ2luKGZ1bmN0aW9uKCBkZXRhaWxzICkge1xuXHR2YXIgcXVuaXQgPSBpZCggXCJxdW5pdFwiICk7XG5cblx0Ly8gRml4dHVyZSBpcyB0aGUgb25seSBvbmUgbmVjZXNzYXJ5IHRvIHJ1biB3aXRob3V0IHRoZSAjcXVuaXQgZWxlbWVudFxuXHRzdG9yZUZpeHR1cmUoKTtcblxuXHRpZiAoIHF1bml0ICkge1xuXHRcdHF1bml0LmlubmVySFRNTCA9XG5cdFx0XHRcIjxoMSBpZD0ncXVuaXQtaGVhZGVyJz5cIiArIGVzY2FwZVRleHQoIGRvY3VtZW50LnRpdGxlICkgKyBcIjwvaDE+XCIgK1xuXHRcdFx0XCI8aDIgaWQ9J3F1bml0LWJhbm5lcic+PC9oMj5cIiArXG5cdFx0XHRcIjxkaXYgaWQ9J3F1bml0LXRlc3RydW5uZXItdG9vbGJhcic+PC9kaXY+XCIgK1xuXHRcdFx0YXBwZW5kRmlsdGVyZWRUZXN0KCkgK1xuXHRcdFx0XCI8aDIgaWQ9J3F1bml0LXVzZXJBZ2VudCc+PC9oMj5cIiArXG5cdFx0XHRcIjxvbCBpZD0ncXVuaXQtdGVzdHMnPjwvb2w+XCI7XG5cdH1cblxuXHRhcHBlbmRIZWFkZXIoKTtcblx0YXBwZW5kQmFubmVyKCk7XG5cdGFwcGVuZFRlc3RSZXN1bHRzKCk7XG5cdGFwcGVuZFVzZXJBZ2VudCgpO1xuXHRhcHBlbmRUb29sYmFyKCk7XG5cdGFwcGVuZFRlc3RzTGlzdCggZGV0YWlscy5tb2R1bGVzICk7XG5cdHRvb2xiYXJNb2R1bGVGaWx0ZXIoKTtcblxuXHRpZiAoIHF1bml0ICYmIGNvbmZpZy5oaWRlcGFzc2VkICkge1xuXHRcdGFkZENsYXNzKCBxdW5pdC5sYXN0Q2hpbGQsIFwiaGlkZXBhc3NcIiApO1xuXHR9XG59KTtcblxuUVVuaXQuZG9uZShmdW5jdGlvbiggZGV0YWlscyApIHtcblx0dmFyIGksIGtleSxcblx0XHRiYW5uZXIgPSBpZCggXCJxdW5pdC1iYW5uZXJcIiApLFxuXHRcdHRlc3RzID0gaWQoIFwicXVuaXQtdGVzdHNcIiApLFxuXHRcdGh0bWwgPSBbXG5cdFx0XHRcIlRlc3RzIGNvbXBsZXRlZCBpbiBcIixcblx0XHRcdGRldGFpbHMucnVudGltZSxcblx0XHRcdFwiIG1pbGxpc2Vjb25kcy48YnIgLz5cIixcblx0XHRcdFwiPHNwYW4gY2xhc3M9J3Bhc3NlZCc+XCIsXG5cdFx0XHRkZXRhaWxzLnBhc3NlZCxcblx0XHRcdFwiPC9zcGFuPiBhc3NlcnRpb25zIG9mIDxzcGFuIGNsYXNzPSd0b3RhbCc+XCIsXG5cdFx0XHRkZXRhaWxzLnRvdGFsLFxuXHRcdFx0XCI8L3NwYW4+IHBhc3NlZCwgPHNwYW4gY2xhc3M9J2ZhaWxlZCc+XCIsXG5cdFx0XHRkZXRhaWxzLmZhaWxlZCxcblx0XHRcdFwiPC9zcGFuPiBmYWlsZWQuXCJcblx0XHRdLmpvaW4oIFwiXCIgKTtcblxuXHRpZiAoIGJhbm5lciApIHtcblx0XHRiYW5uZXIuY2xhc3NOYW1lID0gZGV0YWlscy5mYWlsZWQgPyBcInF1bml0LWZhaWxcIiA6IFwicXVuaXQtcGFzc1wiO1xuXHR9XG5cblx0aWYgKCB0ZXN0cyApIHtcblx0XHRpZCggXCJxdW5pdC10ZXN0cmVzdWx0XCIgKS5pbm5lckhUTUwgPSBodG1sO1xuXHR9XG5cblx0aWYgKCBjb25maWcuYWx0ZXJ0aXRsZSAmJiBkZWZpbmVkLmRvY3VtZW50ICYmIGRvY3VtZW50LnRpdGxlICkge1xuXG5cdFx0Ly8gc2hvdyDinJYgZm9yIGdvb2QsIOKclCBmb3IgYmFkIHN1aXRlIHJlc3VsdCBpbiB0aXRsZVxuXHRcdC8vIHVzZSBlc2NhcGUgc2VxdWVuY2VzIGluIGNhc2UgZmlsZSBnZXRzIGxvYWRlZCB3aXRoIG5vbi11dGYtOC1jaGFyc2V0XG5cdFx0ZG9jdW1lbnQudGl0bGUgPSBbXG5cdFx0XHQoIGRldGFpbHMuZmFpbGVkID8gXCJcXHUyNzE2XCIgOiBcIlxcdTI3MTRcIiApLFxuXHRcdFx0ZG9jdW1lbnQudGl0bGUucmVwbGFjZSggL15bXFx1MjcxNFxcdTI3MTZdIC9pLCBcIlwiIClcblx0XHRdLmpvaW4oIFwiIFwiICk7XG5cdH1cblxuXHQvLyBjbGVhciBvd24gc2Vzc2lvblN0b3JhZ2UgaXRlbXMgaWYgYWxsIHRlc3RzIHBhc3NlZFxuXHRpZiAoIGNvbmZpZy5yZW9yZGVyICYmIGRlZmluZWQuc2Vzc2lvblN0b3JhZ2UgJiYgZGV0YWlscy5mYWlsZWQgPT09IDAgKSB7XG5cdFx0Zm9yICggaSA9IDA7IGkgPCBzZXNzaW9uU3RvcmFnZS5sZW5ndGg7IGkrKyApIHtcblx0XHRcdGtleSA9IHNlc3Npb25TdG9yYWdlLmtleSggaSsrICk7XG5cdFx0XHRpZiAoIGtleS5pbmRleE9mKCBcInF1bml0LXRlc3QtXCIgKSA9PT0gMCApIHtcblx0XHRcdFx0c2Vzc2lvblN0b3JhZ2UucmVtb3ZlSXRlbSgga2V5ICk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gc2Nyb2xsIGJhY2sgdG8gdG9wIHRvIHNob3cgcmVzdWx0c1xuXHRpZiAoIGNvbmZpZy5zY3JvbGx0b3AgJiYgd2luZG93LnNjcm9sbFRvICkge1xuXHRcdHdpbmRvdy5zY3JvbGxUbyggMCwgMCApO1xuXHR9XG59KTtcblxuZnVuY3Rpb24gZ2V0TmFtZUh0bWwoIG5hbWUsIG1vZHVsZSApIHtcblx0dmFyIG5hbWVIdG1sID0gXCJcIjtcblxuXHRpZiAoIG1vZHVsZSApIHtcblx0XHRuYW1lSHRtbCA9IFwiPHNwYW4gY2xhc3M9J21vZHVsZS1uYW1lJz5cIiArIGVzY2FwZVRleHQoIG1vZHVsZSApICsgXCI8L3NwYW4+OiBcIjtcblx0fVxuXG5cdG5hbWVIdG1sICs9IFwiPHNwYW4gY2xhc3M9J3Rlc3QtbmFtZSc+XCIgKyBlc2NhcGVUZXh0KCBuYW1lICkgKyBcIjwvc3Bhbj5cIjtcblxuXHRyZXR1cm4gbmFtZUh0bWw7XG59XG5cblFVbml0LnRlc3RTdGFydChmdW5jdGlvbiggZGV0YWlscyApIHtcblx0dmFyIHJ1bm5pbmcsIHRlc3RCbG9jaywgYmFkO1xuXG5cdHRlc3RCbG9jayA9IGlkKCBcInF1bml0LXRlc3Qtb3V0cHV0LVwiICsgZGV0YWlscy50ZXN0SWQgKTtcblx0aWYgKCB0ZXN0QmxvY2sgKSB7XG5cdFx0dGVzdEJsb2NrLmNsYXNzTmFtZSA9IFwicnVubmluZ1wiO1xuXHR9IGVsc2Uge1xuXG5cdFx0Ly8gUmVwb3J0IGxhdGVyIHJlZ2lzdGVyZWQgdGVzdHNcblx0XHRhcHBlbmRUZXN0KCBkZXRhaWxzLm5hbWUsIGRldGFpbHMudGVzdElkLCBkZXRhaWxzLm1vZHVsZSApO1xuXHR9XG5cblx0cnVubmluZyA9IGlkKCBcInF1bml0LXRlc3RyZXN1bHRcIiApO1xuXHRpZiAoIHJ1bm5pbmcgKSB7XG5cdFx0YmFkID0gUVVuaXQuY29uZmlnLnJlb3JkZXIgJiYgZGVmaW5lZC5zZXNzaW9uU3RvcmFnZSAmJlxuXHRcdFx0K3Nlc3Npb25TdG9yYWdlLmdldEl0ZW0oIFwicXVuaXQtdGVzdC1cIiArIGRldGFpbHMubW9kdWxlICsgXCItXCIgKyBkZXRhaWxzLm5hbWUgKTtcblxuXHRcdHJ1bm5pbmcuaW5uZXJIVE1MID0gKCBiYWQgP1xuXHRcdFx0XCJSZXJ1bm5pbmcgcHJldmlvdXNseSBmYWlsZWQgdGVzdDogPGJyIC8+XCIgOlxuXHRcdFx0XCJSdW5uaW5nOiA8YnIgLz5cIiApICtcblx0XHRcdGdldE5hbWVIdG1sKCBkZXRhaWxzLm5hbWUsIGRldGFpbHMubW9kdWxlICk7XG5cdH1cblxufSk7XG5cbmZ1bmN0aW9uIHN0cmlwSHRtbCggc3RyaW5nICkge1xuXHQvLyBzdHJpcCB0YWdzLCBodG1sIGVudGl0eSBhbmQgd2hpdGVzcGFjZXNcblx0cmV0dXJuIHN0cmluZy5yZXBsYWNlKC88XFwvP1tePl0rKD58JCkvZywgXCJcIikucmVwbGFjZSgvXFwmcXVvdDsvZywgXCJcIikucmVwbGFjZSgvXFxzKy9nLCBcIlwiKTtcbn1cblxuUVVuaXQubG9nKGZ1bmN0aW9uKCBkZXRhaWxzICkge1xuXHR2YXIgYXNzZXJ0TGlzdCwgYXNzZXJ0TGksXG5cdFx0bWVzc2FnZSwgZXhwZWN0ZWQsIGFjdHVhbCwgZGlmZixcblx0XHRzaG93RGlmZiA9IGZhbHNlLFxuXHRcdHRlc3RJdGVtID0gaWQoIFwicXVuaXQtdGVzdC1vdXRwdXQtXCIgKyBkZXRhaWxzLnRlc3RJZCApO1xuXG5cdGlmICggIXRlc3RJdGVtICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdG1lc3NhZ2UgPSBlc2NhcGVUZXh0KCBkZXRhaWxzLm1lc3NhZ2UgKSB8fCAoIGRldGFpbHMucmVzdWx0ID8gXCJva2F5XCIgOiBcImZhaWxlZFwiICk7XG5cdG1lc3NhZ2UgPSBcIjxzcGFuIGNsYXNzPSd0ZXN0LW1lc3NhZ2UnPlwiICsgbWVzc2FnZSArIFwiPC9zcGFuPlwiO1xuXHRtZXNzYWdlICs9IFwiPHNwYW4gY2xhc3M9J3J1bnRpbWUnPkAgXCIgKyBkZXRhaWxzLnJ1bnRpbWUgKyBcIiBtczwvc3Bhbj5cIjtcblxuXHQvLyBwdXNoRmFpbHVyZSBkb2Vzbid0IHByb3ZpZGUgZGV0YWlscy5leHBlY3RlZFxuXHQvLyB3aGVuIGl0IGNhbGxzLCBpdCdzIGltcGxpY2l0IHRvIGFsc28gbm90IHNob3cgZXhwZWN0ZWQgYW5kIGRpZmYgc3R1ZmZcblx0Ly8gQWxzbywgd2UgbmVlZCB0byBjaGVjayBkZXRhaWxzLmV4cGVjdGVkIGV4aXN0ZW5jZSwgYXMgaXQgY2FuIGV4aXN0IGFuZCBiZSB1bmRlZmluZWRcblx0aWYgKCAhZGV0YWlscy5yZXN1bHQgJiYgaGFzT3duLmNhbGwoIGRldGFpbHMsIFwiZXhwZWN0ZWRcIiApICkge1xuXHRcdGlmICggZGV0YWlscy5uZWdhdGl2ZSApIHtcblx0XHRcdGV4cGVjdGVkID0gZXNjYXBlVGV4dCggXCJOT1QgXCIgKyBRVW5pdC5kdW1wLnBhcnNlKCBkZXRhaWxzLmV4cGVjdGVkICkgKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0ZXhwZWN0ZWQgPSBlc2NhcGVUZXh0KCBRVW5pdC5kdW1wLnBhcnNlKCBkZXRhaWxzLmV4cGVjdGVkICkgKTtcblx0XHR9XG5cblx0XHRhY3R1YWwgPSBlc2NhcGVUZXh0KCBRVW5pdC5kdW1wLnBhcnNlKCBkZXRhaWxzLmFjdHVhbCApICk7XG5cdFx0bWVzc2FnZSArPSBcIjx0YWJsZT48dHIgY2xhc3M9J3Rlc3QtZXhwZWN0ZWQnPjx0aD5FeHBlY3RlZDogPC90aD48dGQ+PHByZT5cIiArXG5cdFx0XHRleHBlY3RlZCArXG5cdFx0XHRcIjwvcHJlPjwvdGQ+PC90cj5cIjtcblxuXHRcdGlmICggYWN0dWFsICE9PSBleHBlY3RlZCApIHtcblxuXHRcdFx0bWVzc2FnZSArPSBcIjx0ciBjbGFzcz0ndGVzdC1hY3R1YWwnPjx0aD5SZXN1bHQ6IDwvdGg+PHRkPjxwcmU+XCIgK1xuXHRcdFx0XHRhY3R1YWwgKyBcIjwvcHJlPjwvdGQ+PC90cj5cIjtcblxuXHRcdFx0Ly8gRG9uJ3Qgc2hvdyBkaWZmIGlmIGFjdHVhbCBvciBleHBlY3RlZCBhcmUgYm9vbGVhbnNcblx0XHRcdGlmICggISggL14odHJ1ZXxmYWxzZSkkLy50ZXN0KCBhY3R1YWwgKSApICYmXG5cdFx0XHRcdFx0ISggL14odHJ1ZXxmYWxzZSkkLy50ZXN0KCBleHBlY3RlZCApICkgKSB7XG5cdFx0XHRcdGRpZmYgPSBRVW5pdC5kaWZmKCBleHBlY3RlZCwgYWN0dWFsICk7XG5cdFx0XHRcdHNob3dEaWZmID0gc3RyaXBIdG1sKCBkaWZmICkubGVuZ3RoICE9PVxuXHRcdFx0XHRcdHN0cmlwSHRtbCggZXhwZWN0ZWQgKS5sZW5ndGggK1xuXHRcdFx0XHRcdHN0cmlwSHRtbCggYWN0dWFsICkubGVuZ3RoO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBEb24ndCBzaG93IGRpZmYgaWYgZXhwZWN0ZWQgYW5kIGFjdHVhbCBhcmUgdG90YWxseSBkaWZmZXJlbnRcblx0XHRcdGlmICggc2hvd0RpZmYgKSB7XG5cdFx0XHRcdG1lc3NhZ2UgKz0gXCI8dHIgY2xhc3M9J3Rlc3QtZGlmZic+PHRoPkRpZmY6IDwvdGg+PHRkPjxwcmU+XCIgK1xuXHRcdFx0XHRcdGRpZmYgKyBcIjwvcHJlPjwvdGQ+PC90cj5cIjtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKCBleHBlY3RlZC5pbmRleE9mKCBcIltvYmplY3QgQXJyYXldXCIgKSAhPT0gLTEgfHxcblx0XHRcdFx0ZXhwZWN0ZWQuaW5kZXhPZiggXCJbb2JqZWN0IE9iamVjdF1cIiApICE9PSAtMSApIHtcblx0XHRcdG1lc3NhZ2UgKz0gXCI8dHIgY2xhc3M9J3Rlc3QtbWVzc2FnZSc+PHRoPk1lc3NhZ2U6IDwvdGg+PHRkPlwiICtcblx0XHRcdFx0XCJEaWZmIHN1cHByZXNzZWQgYXMgdGhlIGRlcHRoIG9mIG9iamVjdCBpcyBtb3JlIHRoYW4gY3VycmVudCBtYXggZGVwdGggKFwiICtcblx0XHRcdFx0UVVuaXQuY29uZmlnLm1heERlcHRoICsgXCIpLjxwPkhpbnQ6IFVzZSA8Y29kZT5RVW5pdC5kdW1wLm1heERlcHRoPC9jb2RlPiB0byBcIiArXG5cdFx0XHRcdFwiIHJ1biB3aXRoIGEgaGlnaGVyIG1heCBkZXB0aCBvciA8YSBocmVmPSdcIiArIHNldFVybCh7IG1heERlcHRoOiAtMSB9KSArIFwiJz5cIiArXG5cdFx0XHRcdFwiUmVydW48L2E+IHdpdGhvdXQgbWF4IGRlcHRoLjwvcD48L3RkPjwvdHI+XCI7XG5cdFx0fVxuXG5cdFx0aWYgKCBkZXRhaWxzLnNvdXJjZSApIHtcblx0XHRcdG1lc3NhZ2UgKz0gXCI8dHIgY2xhc3M9J3Rlc3Qtc291cmNlJz48dGg+U291cmNlOiA8L3RoPjx0ZD48cHJlPlwiICtcblx0XHRcdFx0ZXNjYXBlVGV4dCggZGV0YWlscy5zb3VyY2UgKSArIFwiPC9wcmU+PC90ZD48L3RyPlwiO1xuXHRcdH1cblxuXHRcdG1lc3NhZ2UgKz0gXCI8L3RhYmxlPlwiO1xuXG5cdC8vIHRoaXMgb2Njb3VycyB3aGVuIHB1c2hGYWlsdXJlIGlzIHNldCBhbmQgd2UgaGF2ZSBhbiBleHRyYWN0ZWQgc3RhY2sgdHJhY2Vcblx0fSBlbHNlIGlmICggIWRldGFpbHMucmVzdWx0ICYmIGRldGFpbHMuc291cmNlICkge1xuXHRcdG1lc3NhZ2UgKz0gXCI8dGFibGU+XCIgK1xuXHRcdFx0XCI8dHIgY2xhc3M9J3Rlc3Qtc291cmNlJz48dGg+U291cmNlOiA8L3RoPjx0ZD48cHJlPlwiICtcblx0XHRcdGVzY2FwZVRleHQoIGRldGFpbHMuc291cmNlICkgKyBcIjwvcHJlPjwvdGQ+PC90cj5cIiArXG5cdFx0XHRcIjwvdGFibGU+XCI7XG5cdH1cblxuXHRhc3NlcnRMaXN0ID0gdGVzdEl0ZW0uZ2V0RWxlbWVudHNCeVRhZ05hbWUoIFwib2xcIiApWyAwIF07XG5cblx0YXNzZXJ0TGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCBcImxpXCIgKTtcblx0YXNzZXJ0TGkuY2xhc3NOYW1lID0gZGV0YWlscy5yZXN1bHQgPyBcInBhc3NcIiA6IFwiZmFpbFwiO1xuXHRhc3NlcnRMaS5pbm5lckhUTUwgPSBtZXNzYWdlO1xuXHRhc3NlcnRMaXN0LmFwcGVuZENoaWxkKCBhc3NlcnRMaSApO1xufSk7XG5cblFVbml0LnRlc3REb25lKGZ1bmN0aW9uKCBkZXRhaWxzICkge1xuXHR2YXIgdGVzdFRpdGxlLCB0aW1lLCB0ZXN0SXRlbSwgYXNzZXJ0TGlzdCxcblx0XHRnb29kLCBiYWQsIHRlc3RDb3VudHMsIHNraXBwZWQsIHNvdXJjZU5hbWUsXG5cdFx0dGVzdHMgPSBpZCggXCJxdW5pdC10ZXN0c1wiICk7XG5cblx0aWYgKCAhdGVzdHMgKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0dGVzdEl0ZW0gPSBpZCggXCJxdW5pdC10ZXN0LW91dHB1dC1cIiArIGRldGFpbHMudGVzdElkICk7XG5cblx0YXNzZXJ0TGlzdCA9IHRlc3RJdGVtLmdldEVsZW1lbnRzQnlUYWdOYW1lKCBcIm9sXCIgKVsgMCBdO1xuXG5cdGdvb2QgPSBkZXRhaWxzLnBhc3NlZDtcblx0YmFkID0gZGV0YWlscy5mYWlsZWQ7XG5cblx0Ly8gc3RvcmUgcmVzdWx0IHdoZW4gcG9zc2libGVcblx0aWYgKCBjb25maWcucmVvcmRlciAmJiBkZWZpbmVkLnNlc3Npb25TdG9yYWdlICkge1xuXHRcdGlmICggYmFkICkge1xuXHRcdFx0c2Vzc2lvblN0b3JhZ2Uuc2V0SXRlbSggXCJxdW5pdC10ZXN0LVwiICsgZGV0YWlscy5tb2R1bGUgKyBcIi1cIiArIGRldGFpbHMubmFtZSwgYmFkICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHNlc3Npb25TdG9yYWdlLnJlbW92ZUl0ZW0oIFwicXVuaXQtdGVzdC1cIiArIGRldGFpbHMubW9kdWxlICsgXCItXCIgKyBkZXRhaWxzLm5hbWUgKTtcblx0XHR9XG5cdH1cblxuXHRpZiAoIGJhZCA9PT0gMCApIHtcblxuXHRcdC8vIENvbGxhcHNlIHRoZSBwYXNzaW5nIHRlc3RzXG5cdFx0YWRkQ2xhc3MoIGFzc2VydExpc3QsIFwicXVuaXQtY29sbGFwc2VkXCIgKTtcblx0fSBlbHNlIGlmICggYmFkICYmIGNvbmZpZy5jb2xsYXBzZSAmJiAhY29sbGFwc2VOZXh0ICkge1xuXG5cdFx0Ly8gU2tpcCBjb2xsYXBzaW5nIHRoZSBmaXJzdCBmYWlsaW5nIHRlc3Rcblx0XHRjb2xsYXBzZU5leHQgPSB0cnVlO1xuXHR9IGVsc2Uge1xuXG5cdFx0Ly8gQ29sbGFwc2UgcmVtYWluaW5nIHRlc3RzXG5cdFx0YWRkQ2xhc3MoIGFzc2VydExpc3QsIFwicXVuaXQtY29sbGFwc2VkXCIgKTtcblx0fVxuXG5cdC8vIHRlc3RJdGVtLmZpcnN0Q2hpbGQgaXMgdGhlIHRlc3QgbmFtZVxuXHR0ZXN0VGl0bGUgPSB0ZXN0SXRlbS5maXJzdENoaWxkO1xuXG5cdHRlc3RDb3VudHMgPSBiYWQgP1xuXHRcdFwiPGIgY2xhc3M9J2ZhaWxlZCc+XCIgKyBiYWQgKyBcIjwvYj4sIFwiICsgXCI8YiBjbGFzcz0ncGFzc2VkJz5cIiArIGdvb2QgKyBcIjwvYj4sIFwiIDpcblx0XHRcIlwiO1xuXG5cdHRlc3RUaXRsZS5pbm5lckhUTUwgKz0gXCIgPGIgY2xhc3M9J2NvdW50cyc+KFwiICsgdGVzdENvdW50cyArXG5cdFx0ZGV0YWlscy5hc3NlcnRpb25zLmxlbmd0aCArIFwiKTwvYj5cIjtcblxuXHRpZiAoIGRldGFpbHMuc2tpcHBlZCApIHtcblx0XHR0ZXN0SXRlbS5jbGFzc05hbWUgPSBcInNraXBwZWRcIjtcblx0XHRza2lwcGVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJlbVwiICk7XG5cdFx0c2tpcHBlZC5jbGFzc05hbWUgPSBcInF1bml0LXNraXBwZWQtbGFiZWxcIjtcblx0XHRza2lwcGVkLmlubmVySFRNTCA9IFwic2tpcHBlZFwiO1xuXHRcdHRlc3RJdGVtLmluc2VydEJlZm9yZSggc2tpcHBlZCwgdGVzdFRpdGxlICk7XG5cdH0gZWxzZSB7XG5cdFx0YWRkRXZlbnQoIHRlc3RUaXRsZSwgXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHRvZ2dsZUNsYXNzKCBhc3NlcnRMaXN0LCBcInF1bml0LWNvbGxhcHNlZFwiICk7XG5cdFx0fSk7XG5cblx0XHR0ZXN0SXRlbS5jbGFzc05hbWUgPSBiYWQgPyBcImZhaWxcIiA6IFwicGFzc1wiO1xuXG5cdFx0dGltZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIFwic3BhblwiICk7XG5cdFx0dGltZS5jbGFzc05hbWUgPSBcInJ1bnRpbWVcIjtcblx0XHR0aW1lLmlubmVySFRNTCA9IGRldGFpbHMucnVudGltZSArIFwiIG1zXCI7XG5cdFx0dGVzdEl0ZW0uaW5zZXJ0QmVmb3JlKCB0aW1lLCBhc3NlcnRMaXN0ICk7XG5cdH1cblxuXHQvLyBTaG93IHRoZSBzb3VyY2Ugb2YgdGhlIHRlc3Qgd2hlbiBzaG93aW5nIGFzc2VydGlvbnNcblx0aWYgKCBkZXRhaWxzLnNvdXJjZSApIHtcblx0XHRzb3VyY2VOYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCggXCJwXCIgKTtcblx0XHRzb3VyY2VOYW1lLmlubmVySFRNTCA9IFwiPHN0cm9uZz5Tb3VyY2U6IDwvc3Ryb25nPlwiICsgZGV0YWlscy5zb3VyY2U7XG5cdFx0YWRkQ2xhc3MoIHNvdXJjZU5hbWUsIFwicXVuaXQtc291cmNlXCIgKTtcblx0XHRpZiAoIGJhZCA9PT0gMCApIHtcblx0XHRcdGFkZENsYXNzKCBzb3VyY2VOYW1lLCBcInF1bml0LWNvbGxhcHNlZFwiICk7XG5cdFx0fVxuXHRcdGFkZEV2ZW50KCB0ZXN0VGl0bGUsIFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR0b2dnbGVDbGFzcyggc291cmNlTmFtZSwgXCJxdW5pdC1jb2xsYXBzZWRcIiApO1xuXHRcdH0pO1xuXHRcdHRlc3RJdGVtLmFwcGVuZENoaWxkKCBzb3VyY2VOYW1lICk7XG5cdH1cbn0pO1xuXG5pZiAoIGRlZmluZWQuZG9jdW1lbnQgKSB7XG5cblx0Ly8gQXZvaWQgcmVhZHlTdGF0ZSBpc3N1ZSB3aXRoIHBoYW50b21qc1xuXHQvLyBSZWY6ICM4MThcblx0dmFyIG5vdFBoYW50b20gPSAoIGZ1bmN0aW9uKCBwICkge1xuXHRcdHJldHVybiAhKCBwICYmIHAudmVyc2lvbiAmJiBwLnZlcnNpb24ubWFqb3IgPiAwICk7XG5cdH0gKSggd2luZG93LnBoYW50b20gKTtcblxuXHRpZiAoIG5vdFBoYW50b20gJiYgZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gXCJjb21wbGV0ZVwiICkge1xuXHRcdFFVbml0LmxvYWQoKTtcblx0fSBlbHNlIHtcblx0XHRhZGRFdmVudCggd2luZG93LCBcImxvYWRcIiwgUVVuaXQubG9hZCApO1xuXHR9XG59IGVsc2Uge1xuXHRjb25maWcucGFnZUxvYWRlZCA9IHRydWU7XG5cdGNvbmZpZy5hdXRvcnVuID0gdHJ1ZTtcbn1cblxufSkoKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyBub2RlX21vZHVsZXMvYm9vdHN0cmFwL2pzL3Rlc3RzL3ZlbmRvci9xdW5pdC5qcyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7O0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBTUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkJBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQVdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQVNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FBUUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUFPQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFhQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUFhQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FBV0E7O0FBQUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FBV0E7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBS0E7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQVNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFNQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Iiwic291cmNlUm9vdCI6IiJ9");

/***/ }
/******/ ]);
/*!
 * Bootstrap v4.0.0-alpha.4 (http://getbootstrap.com)
 * Copyright 2011-2016 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] >= 4)) {
    throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0')
  }
}(jQuery);


+function ($) {

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.4): util.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

'use strict';

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var Util = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Private TransitionEnd Helpers
   * ------------------------------------------------------------------------
   */

  var transition = false;

  var MAX_UID = 1000000;

  var TransitionEndEvent = {
    WebkitTransition: 'webkitTransitionEnd',
    MozTransition: 'transitionend',
    OTransition: 'oTransitionEnd otransitionend',
    transition: 'transitionend'
  };

  // shoutout AngusCroll (https://goo.gl/pxwQGp)
  function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function isElement(obj) {
    return (obj[0] || obj).nodeType;
  }

  function getSpecialTransitionEndEvent() {
    return {
      bindType: transition.end,
      delegateType: transition.end,
      handle: function handle(event) {
        if ($(event.target).is(this)) {
          return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
        }
        return undefined;
      }
    };
  }

  function transitionEndTest() {
    if (window.QUnit) {
      return false;
    }

    var el = document.createElement('bootstrap');

    for (var _name in TransitionEndEvent) {
      if (el.style[_name] !== undefined) {
        return { end: TransitionEndEvent[_name] };
      }
    }

    return false;
  }

  function transitionEndEmulator(duration) {
    var _this = this;

    var called = false;

    $(this).one(Util.TRANSITION_END, function () {
      called = true;
    });

    setTimeout(function () {
      if (!called) {
        Util.triggerTransitionEnd(_this);
      }
    }, duration);

    return this;
  }

  function setTransitionEndSupport() {
    transition = transitionEndTest();

    $.fn.emulateTransitionEnd = transitionEndEmulator;

    if (Util.supportsTransitionEnd()) {
      $.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
  }

  /**
   * --------------------------------------------------------------------------
   * Public Util Api
   * --------------------------------------------------------------------------
   */

  var Util = {

    TRANSITION_END: 'bsTransitionEnd',

    getUID: function getUID(prefix) {
      do {
        /* eslint-disable no-bitwise */
        prefix += ~ ~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        /* eslint-enable no-bitwise */
      } while (document.getElementById(prefix));
      return prefix;
    },

    getSelectorFromElement: function getSelectorFromElement(element) {
      var selector = element.getAttribute('data-target');

      if (!selector) {
        selector = element.getAttribute('href') || '';
        selector = /^#[a-z]/i.test(selector) ? selector : null;
      }

      return selector;
    },

    reflow: function reflow(element) {
      new Function('bs', 'return bs')(element.offsetHeight);
    },

    triggerTransitionEnd: function triggerTransitionEnd(element) {
      $(element).trigger(transition.end);
    },

    supportsTransitionEnd: function supportsTransitionEnd() {
      return Boolean(transition);
    },

    typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
      for (var property in configTypes) {
        if (configTypes.hasOwnProperty(property)) {
          var expectedTypes = configTypes[property];
          var value = config[property];
          var valueType = undefined;

          if (value && isElement(value)) {
            valueType = 'element';
          } else {
            valueType = toType(value);
          }

          if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(componentName.toUpperCase() + ': ' + ('Option "' + property + '" provided type "' + valueType + '" ') + ('but expected type "' + expectedTypes + '".'));
          }
        }
      }
    }
  };

  setTransitionEndSupport();

  return Util;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.4): alert.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Alert = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'alert';
  var VERSION = '4.0.0-alpha.4';
  var DATA_KEY = 'bs.alert';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Selector = {
    DISMISS: '[data-dismiss="alert"]'
  };

  var Event = {
    CLOSE: 'close' + EVENT_KEY,
    CLOSED: 'closed' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    ALERT: 'alert',
    FADE: 'fade',
    IN: 'in'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Alert = (function () {
    function Alert(element) {
      _classCallCheck(this, Alert);

      this._element = element;
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Alert, [{
      key: 'close',

      // public

      value: function close(element) {
        element = element || this._element;

        var rootElement = this._getRootElement(element);
        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      }

      // private

    }, {
      key: '_getRootElement',
      value: function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) {
          parent = $(selector)[0];
        }

        if (!parent) {
          parent = $(element).closest('.' + ClassName.ALERT)[0];
        }

        return parent;
      }
    }, {
      key: '_triggerCloseEvent',
      value: function _triggerCloseEvent(element) {
        var closeEvent = $.Event(Event.CLOSE);

        $(element).trigger(closeEvent);
        return closeEvent;
      }
    }, {
      key: '_removeElement',
      value: function _removeElement(element) {
        $(element).removeClass(ClassName.IN);

        if (!Util.supportsTransitionEnd() || !$(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);
          return;
        }

        $(element).one(Util.TRANSITION_END, $.proxy(this._destroyElement, this, element)).emulateTransitionEnd(TRANSITION_DURATION);
      }
    }, {
      key: '_destroyElement',
      value: function _destroyElement(element) {
        $(element).detach().trigger(Event.CLOSED).remove();
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      }
    }, {
      key: '_handleDismiss',
      value: function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Alert;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Alert._jQueryInterface;
  $.fn[NAME].Constructor = Alert;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Alert._jQueryInterface;
  };

  return Alert;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.4): button.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Button = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'button';
  var VERSION = '4.0.0-alpha.4';
  var DATA_KEY = 'bs.button';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var ClassName = {
    ACTIVE: 'active',
    BUTTON: 'btn',
    FOCUS: 'focus'
  };

  var Selector = {
    DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
    DATA_TOGGLE: '[data-toggle="buttons"]',
    INPUT: 'input',
    ACTIVE: '.active',
    BUTTON: '.btn'
  };

  var Event = {
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    FOCUS_BLUR_DATA_API: 'focus' + EVENT_KEY + DATA_API_KEY + ' ' + ('blur' + EVENT_KEY + DATA_API_KEY)
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Button = (function () {
    function Button(element) {
      _classCallCheck(this, Button);

      this._element = element;
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Button, [{
      key: 'toggle',

      // public

      value: function toggle() {
        var triggerChangeEvent = true;
        var rootElement = $(this._element).closest(Selector.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = $(this._element).find(Selector.INPUT)[0];

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && $(this._element).hasClass(ClassName.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = $(rootElement).find(Selector.ACTIVE)[0];

                if (activeElement) {
                  $(activeElement).removeClass(ClassName.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              input.checked = !$(this._element).hasClass(ClassName.ACTIVE);
              $(this._element).trigger('change');
            }

            input.focus();
          }
        } else {
          this._element.setAttribute('aria-pressed', !$(this._element).hasClass(ClassName.ACTIVE));
        }

        if (triggerChangeEvent) {
          $(this._element).toggleClass(ClassName.ACTIVE);
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);
        this._element = null;
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            data = new Button(this);
            $(this).data(DATA_KEY, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Button;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    event.preventDefault();

    var button = event.target;

    if (!$(button).hasClass(ClassName.BUTTON)) {
      button = $(button).closest(Selector.BUTTON);
    }

    Button._jQueryInterface.call($(button), 'toggle');
  }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
    var button = $(event.target).closest(Selector.BUTTON)[0];
    $(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Button._jQueryInterface;
  $.fn[NAME].Constructor = Button;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Button._jQueryInterface;
  };

  return Button;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.4): carousel.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Carousel = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'carousel';
  var VERSION = '4.0.0-alpha.4';
  var DATA_KEY = 'bs.carousel';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;
  var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key
  var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

  var Default = {
    interval: 5000,
    keyboard: true,
    slide: false,
    pause: 'hover',
    wrap: true
  };

  var DefaultType = {
    interval: '(number|boolean)',
    keyboard: 'boolean',
    slide: '(boolean|string)',
    pause: '(string|boolean)',
    wrap: 'boolean'
  };

  var Direction = {
    NEXT: 'next',
    PREVIOUS: 'prev'
  };

  var Event = {
    SLIDE: 'slide' + EVENT_KEY,
    SLID: 'slid' + EVENT_KEY,
    KEYDOWN: 'keydown' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    CAROUSEL: 'carousel',
    ACTIVE: 'active',
    SLIDE: 'slide',
    RIGHT: 'right',
    LEFT: 'left',
    ITEM: 'carousel-item'
  };

  var Selector = {
    ACTIVE: '.active',
    ACTIVE_ITEM: '.active.carousel-item',
    ITEM: '.carousel-item',
    NEXT_PREV: '.next, .prev',
    INDICATORS: '.carousel-indicators',
    DATA_SLIDE: '[data-slide], [data-slide-to]',
    DATA_RIDE: '[data-ride="carousel"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Carousel = (function () {
    function Carousel(element, config) {
      _classCallCheck(this, Carousel);

      this._items = null;
      this._interval = null;
      this._activeElement = null;

      this._isPaused = false;
      this._isSliding = false;

      this._config = this._getConfig(config);
      this._element = $(element)[0];
      this._indicatorsElement = $(this._element).find(Selector.INDICATORS)[0];

      this._addEventListeners();
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Carousel, [{
      key: 'next',

      // public

      value: function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      }
    }, {
      key: 'nextWhenVisible',
      value: function nextWhenVisible() {
        // Don't call next when the page isn't visible
        if (!document.hidden) {
          this.next();
        }
      }
    }, {
      key: 'prev',
      value: function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREVIOUS);
        }
      }
    }, {
      key: 'pause',
      value: function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if ($(this._element).find(Selector.NEXT_PREV)[0] && Util.supportsTransitionEnd()) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      }
    }, {
      key: 'cycle',
      value: function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval($.proxy(document.visibilityState ? this.nextWhenVisible : this.next, this), this._config.interval);
        }
      }
    }, {
      key: 'to',
      value: function to(index) {
        var _this2 = this;

        this._activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          $(this._element).one(Event.SLID, function () {
            return _this2.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREVIOUS;

        this._slide(direction, this._items[index]);
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $(this._element).off(EVENT_KEY);
        $.removeData(this._element, DATA_KEY);

        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      }

      // private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      }
    }, {
      key: '_addEventListeners',
      value: function _addEventListeners() {
        if (this._config.keyboard) {
          $(this._element).on(Event.KEYDOWN, $.proxy(this._keydown, this));
        }

        if (this._config.pause === 'hover' && !('ontouchstart' in document.documentElement)) {
          $(this._element).on(Event.MOUSEENTER, $.proxy(this.pause, this)).on(Event.MOUSELEAVE, $.proxy(this.cycle, this));
        }
      }
    }, {
      key: '_keydown',
      value: function _keydown(event) {
        event.preventDefault();

        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            this.prev();
            break;
          case ARROW_RIGHT_KEYCODE:
            this.next();
            break;
          default:
            return;
        }
      }
    }, {
      key: '_getItemIndex',
      value: function _getItemIndex(element) {
        this._items = $.makeArray($(element).parent().find(Selector.ITEM));
        return this._items.indexOf(element);
      }
    }, {
      key: '_getItemByDirection',
      value: function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREVIOUS;
        var activeIndex = this._getItemIndex(activeElement);
        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        var delta = direction === Direction.PREVIOUS ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;

        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      }
    }, {
      key: '_triggerSlideEvent',
      value: function _triggerSlideEvent(relatedTarget, directionalClassname) {
        var slideEvent = $.Event(Event.SLIDE, {
          relatedTarget: relatedTarget,
          direction: directionalClassname
        });

        $(this._element).trigger(slideEvent);

        return slideEvent;
      }
    }, {
      key: '_setActiveIndicatorElement',
      value: function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          $(this._indicatorsElement).find(Selector.ACTIVE).removeClass(ClassName.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) {
            $(nextIndicator).addClass(ClassName.ACTIVE);
          }
        }
      }
    }, {
      key: '_slide',
      value: function _slide(direction, element) {
        var _this3 = this;

        var activeElement = $(this._element).find(Selector.ACTIVE_ITEM)[0];
        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

        var isCycling = Boolean(this._interval);

        var directionalClassName = direction === Direction.NEXT ? ClassName.LEFT : ClassName.RIGHT;

        if (nextElement && $(nextElement).hasClass(ClassName.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, directionalClassName);
        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = $.Event(Event.SLID, {
          relatedTarget: nextElement,
          direction: directionalClassName
        });

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.SLIDE)) {

          $(nextElement).addClass(direction);

          Util.reflow(nextElement);

          $(activeElement).addClass(directionalClassName);
          $(nextElement).addClass(directionalClassName);

          $(activeElement).one(Util.TRANSITION_END, function () {
            $(nextElement).removeClass(directionalClassName).removeClass(direction);

            $(nextElement).addClass(ClassName.ACTIVE);

            $(activeElement).removeClass(ClassName.ACTIVE).removeClass(direction).removeClass(directionalClassName);

            _this3._isSliding = false;

            setTimeout(function () {
              return $(_this3._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          $(activeElement).removeClass(ClassName.ACTIVE);
          $(nextElement).addClass(ClassName.ACTIVE);

          this._isSliding = false;
          $(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = $.extend({}, Default, $(this).data());

          if (typeof config === 'object') {
            $.extend(_config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (data[action] === undefined) {
              throw new Error('No method named "' + action + '"');
            }
            data[action]();
          } else if (_config.interval) {
            data.pause();
            data.cycle();
          }
        });
      }
    }, {
      key: '_dataApiClickHandler',
      value: function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        var target = $(selector)[0];

        if (!target || !$(target).hasClass(ClassName.CAROUSEL)) {
          return;
        }

        var config = $.extend({}, $(target).data(), $(this).data());
        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call($(target), config);

        if (slideIndex) {
          $(target).data(DATA_KEY).to(slideIndex);
        }

        event.preventDefault();
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Carousel;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);

  $(window).on(Event.LOAD_DATA_API, function () {
    $(Selector.DATA_RIDE).each(function () {
      var $carousel = $(this);
      Carousel._jQueryInterface.call($carousel, $carousel.data());
    });
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Carousel._jQueryInterface;
  $.fn[NAME].Constructor = Carousel;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Carousel._jQueryInterface;
  };

  return Carousel;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.4): collapse.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Collapse = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'collapse';
  var VERSION = '4.0.0-alpha.4';
  var DATA_KEY = 'bs.collapse';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 600;

  var Default = {
    toggle: true,
    parent: ''
  };

  var DefaultType = {
    toggle: 'boolean',
    parent: 'string'
  };

  var Event = {
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    IN: 'in',
    COLLAPSE: 'collapse',
    COLLAPSING: 'collapsing',
    COLLAPSED: 'collapsed'
  };

  var Dimension = {
    WIDTH: 'width',
    HEIGHT: 'height'
  };

  var Selector = {
    ACTIVES: '.panel > .in, .panel > .collapsing',
    DATA_TOGGLE: '[data-toggle="collapse"]'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Collapse = (function () {
    function Collapse(element, config) {
      _classCallCheck(this, Collapse);

      this._isTransitioning = false;
      this._element = element;
      this._config = this._getConfig(config);
      this._triggerArray = $.makeArray($('[data-toggle="collapse"][href="#' + element.id + '"],' + ('[data-toggle="collapse"][data-target="#' + element.id + '"]')));

      this._parent = this._config.parent ? this._getParent() : null;

      if (!this._config.parent) {
        this._addAriaAndCollapsedClass(this._element, this._triggerArray);
      }

      if (this._config.toggle) {
        this.toggle();
      }
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Collapse, [{
      key: 'toggle',

      // public

      value: function toggle() {
        if ($(this._element).hasClass(ClassName.IN)) {
          this.hide();
        } else {
          this.show();
        }
      }
    }, {
      key: 'show',
      value: function show() {
        var _this4 = this;

        if (this._isTransitioning || $(this._element).hasClass(ClassName.IN)) {
          return;
        }

        var actives = undefined;
        var activesData = undefined;

        if (this._parent) {
          actives = $.makeArray($(Selector.ACTIVES));
          if (!actives.length) {
            actives = null;
          }
        }

        if (actives) {
          activesData = $(actives).data(DATA_KEY);
          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = $.Event(Event.SHOW);
        $(this._element).trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call($(actives), 'hide');
          if (!activesData) {
            $(actives).data(DATA_KEY, null);
          }
        }

        var dimension = this._getDimension();

        $(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);

        this._element.style[dimension] = 0;
        this._element.setAttribute('aria-expanded', true);

        if (this._triggerArray.length) {
          $(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          $(_this4._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.IN);

          _this4._element.style[dimension] = '';

          _this4.setTransitioning(false);

          $(_this4._element).trigger(Event.SHOWN);
        };

        if (!Util.supportsTransitionEnd()) {
          complete();
          return;
        }

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = 'scroll' + capitalizedDimension;

        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);

        this._element.style[dimension] = this._element[scrollSize] + 'px';
      }
    }, {
      key: 'hide',
      value: function hide() {
        var _this5 = this;

        if (this._isTransitioning || !$(this._element).hasClass(ClassName.IN)) {
          return;
        }

        var startEvent = $.Event(Event.HIDE);
        $(this._element).trigger(startEvent);
        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();
        var offsetDimension = dimension === Dimension.WIDTH ? 'offsetWidth' : 'offsetHeight';

        this._element.style[dimension] = this._element[offsetDimension] + 'px';

        Util.reflow(this._element);

        $(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.IN);

        this._element.setAttribute('aria-expanded', false);

        if (this._triggerArray.length) {
          $(this._triggerArray).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this5.setTransitioning(false);
          $(_this5._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
        };

        this._element.style[dimension] = 0;

        if (!Util.supportsTransitionEnd()) {
          complete();
          return;
        }

        $(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
      }
    }, {
      key: 'setTransitioning',
      value: function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);

        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      }

      // private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, Default, config);
        config.toggle = Boolean(config.toggle); // coerce string values
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      }
    }, {
      key: '_getDimension',
      value: function _getDimension() {
        var hasWidth = $(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      }
    }, {
      key: '_getParent',
      value: function _getParent() {
        var _this6 = this;

        var parent = $(this._config.parent)[0];
        var selector = '[data-toggle="collapse"][data-parent="' + this._config.parent + '"]';

        $(parent).find(selector).each(function (i, element) {
          _this6._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });

        return parent;
      }
    }, {
      key: '_addAriaAndCollapsedClass',
      value: function _addAriaAndCollapsedClass(element, triggerArray) {
        if (element) {
          var isOpen = $(element).hasClass(ClassName.IN);
          element.setAttribute('aria-expanded', isOpen);

          if (triggerArray.length) {
            $(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
          }
        }
      }

      // static

    }], [{
      key: '_getTargetFromElement',
      value: function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? $(selector)[0] : null;
      }
    }, {
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY);
          var _config = $.extend({}, Default, $this.data(), typeof config === 'object' && config);

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Collapse;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();

    var target = Collapse._getTargetFromElement(this);
    var data = $(target).data(DATA_KEY);
    var config = data ? 'toggle' : $(this).data();

    Collapse._jQueryInterface.call($(target), config);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Collapse._jQueryInterface;
  $.fn[NAME].Constructor = Collapse;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Collapse._jQueryInterface;
  };

  return Collapse;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.4): dropdown.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Dropdown = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'dropdown';
  var VERSION = '4.0.0-alpha.4';
  var DATA_KEY = 'bs.dropdown';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key
  var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key
  var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key
  var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY,
    KEYDOWN_DATA_API: 'keydown' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    BACKDROP: 'dropdown-backdrop',
    DISABLED: 'disabled',
    OPEN: 'open'
  };

  var Selector = {
    BACKDROP: '.dropdown-backdrop',
    DATA_TOGGLE: '[data-toggle="dropdown"]',
    FORM_CHILD: '.dropdown form',
    ROLE_MENU: '[role="menu"]',
    ROLE_LISTBOX: '[role="listbox"]',
    NAVBAR_NAV: '.navbar-nav',
    VISIBLE_ITEMS: '[role="menu"] li:not(.disabled) a, ' + '[role="listbox"] li:not(.disabled) a'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Dropdown = (function () {
    function Dropdown(element) {
      _classCallCheck(this, Dropdown);

      this._element = element;

      this._addEventListeners();
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Dropdown, [{
      key: 'toggle',

      // public

      value: function toggle() {
        if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
          return false;
        }

        var parent = Dropdown._getParentFromElement(this);
        var isActive = $(parent).hasClass(ClassName.OPEN);

        Dropdown._clearMenus();

        if (isActive) {
          return false;
        }

        if ('ontouchstart' in document.documentElement && !$(parent).closest(Selector.NAVBAR_NAV).length) {

          // if mobile we use a backdrop because click events don't delegate
          var dropdown = document.createElement('div');
          dropdown.className = ClassName.BACKDROP;
          $(dropdown).insertBefore(this);
          $(dropdown).on('click', Dropdown._clearMenus);
        }

        var relatedTarget = { relatedTarget: this };
        var showEvent = $.Event(Event.SHOW, relatedTarget);

        $(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return false;
        }

        this.focus();
        this.setAttribute('aria-expanded', 'true');

        $(parent).toggleClass(ClassName.OPEN);
        $(parent).trigger($.Event(Event.SHOWN, relatedTarget));

        return false;
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);
        $(this._element).off(EVENT_KEY);
        this._element = null;
      }

      // private

    }, {
      key: '_addEventListeners',
      value: function _addEventListeners() {
        $(this._element).on(Event.CLICK, this.toggle);
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);

          if (!data) {
            $(this).data(DATA_KEY, data = new Dropdown(this));
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config].call(this);
          }
        });
      }
    }, {
      key: '_clearMenus',
      value: function _clearMenus(event) {
        if (event && event.which === RIGHT_MOUSE_BUTTON_WHICH) {
          return;
        }

        var backdrop = $(Selector.BACKDROP)[0];
        if (backdrop) {
          backdrop.parentNode.removeChild(backdrop);
        }

        var toggles = $.makeArray($(Selector.DATA_TOGGLE));

        for (var i = 0; i < toggles.length; i++) {
          var _parent = Dropdown._getParentFromElement(toggles[i]);
          var relatedTarget = { relatedTarget: toggles[i] };

          if (!$(_parent).hasClass(ClassName.OPEN)) {
            continue;
          }

          if (event && event.type === 'click' && /input|textarea/i.test(event.target.tagName) && $.contains(_parent, event.target)) {
            continue;
          }

          var hideEvent = $.Event(Event.HIDE, relatedTarget);
          $(_parent).trigger(hideEvent);
          if (hideEvent.isDefaultPrevented()) {
            continue;
          }

          toggles[i].setAttribute('aria-expanded', 'false');

          $(_parent).removeClass(ClassName.OPEN).trigger($.Event(Event.HIDDEN, relatedTarget));
        }
      }
    }, {
      key: '_getParentFromElement',
      value: function _getParentFromElement(element) {
        var parent = undefined;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = $(selector)[0];
        }

        return parent || element.parentNode;
      }
    }, {
      key: '_dataApiKeydownHandler',
      value: function _dataApiKeydownHandler(event) {
        if (!/(38|40|27|32)/.test(event.which) || /input|textarea/i.test(event.target.tagName)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);
        var isActive = $(parent).hasClass(ClassName.OPEN);

        if (!isActive && event.which !== ESCAPE_KEYCODE || isActive && event.which === ESCAPE_KEYCODE) {

          if (event.which === ESCAPE_KEYCODE) {
            var toggle = $(parent).find(Selector.DATA_TOGGLE)[0];
            $(toggle).trigger('focus');
          }

          $(this).trigger('click');
          return;
        }

        var items = $.makeArray($(Selector.VISIBLE_ITEMS));

        items = items.filter(function (item) {
          return item.offsetWidth || item.offsetHeight;
        });

        if (!items.length) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // up
          index--;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Dropdown;
  })();

  $(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_MENU, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.ROLE_LISTBOX, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, Dropdown.prototype.toggle).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
    e.stopPropagation();
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Dropdown._jQueryInterface;
  $.fn[NAME].Constructor = Dropdown;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Dropdown._jQueryInterface;
  };

  return Dropdown;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.4): modal.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Modal = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'modal';
  var VERSION = '4.0.0-alpha.4';
  var DATA_KEY = 'bs.modal';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 300;
  var BACKDROP_TRANSITION_DURATION = 150;
  var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

  var Default = {
    backdrop: true,
    keyboard: true,
    focus: true,
    show: true
  };

  var DefaultType = {
    backdrop: '(boolean|string)',
    keyboard: 'boolean',
    focus: 'boolean',
    show: 'boolean'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    RESIZE: 'resize' + EVENT_KEY,
    CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
    KEYDOWN_DISMISS: 'keydown.dismiss' + EVENT_KEY,
    MOUSEUP_DISMISS: 'mouseup.dismiss' + EVENT_KEY,
    MOUSEDOWN_DISMISS: 'mousedown.dismiss' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
    BACKDROP: 'modal-backdrop',
    OPEN: 'modal-open',
    FADE: 'fade',
    IN: 'in'
  };

  var Selector = {
    DIALOG: '.modal-dialog',
    DATA_TOGGLE: '[data-toggle="modal"]',
    DATA_DISMISS: '[data-dismiss="modal"]',
    FIXED_CONTENT: '.navbar-fixed-top, .navbar-fixed-bottom, .is-fixed'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Modal = (function () {
    function Modal(element, config) {
      _classCallCheck(this, Modal);

      this._config = this._getConfig(config);
      this._element = element;
      this._dialog = $(element).find(Selector.DIALOG)[0];
      this._backdrop = null;
      this._isShown = false;
      this._isBodyOverflowing = false;
      this._ignoreBackdropClick = false;
      this._originalBodyPadding = 0;
      this._scrollbarWidth = 0;
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Modal, [{
      key: 'toggle',

      // public

      value: function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      }
    }, {
      key: 'show',
      value: function show(relatedTarget) {
        var _this7 = this;

        var showEvent = $.Event(Event.SHOW, {
          relatedTarget: relatedTarget
        });

        $(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();
        this._setScrollbar();

        $(document.body).addClass(ClassName.OPEN);

        this._setEscapeEvent();
        this._setResizeEvent();

        $(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, $.proxy(this.hide, this));

        $(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
          $(_this7._element).one(Event.MOUSEUP_DISMISS, function (event) {
            if ($(event.target).is(_this7._element)) {
              _this7._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop($.proxy(this._showElement, this, relatedTarget));
      }
    }, {
      key: 'hide',
      value: function hide(event) {
        if (event) {
          event.preventDefault();
        }

        var hideEvent = $.Event(Event.HIDE);

        $(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;

        this._setEscapeEvent();
        this._setResizeEvent();

        $(document).off(Event.FOCUSIN);

        $(this._element).removeClass(ClassName.IN);

        $(this._element).off(Event.CLICK_DISMISS);
        $(this._dialog).off(Event.MOUSEDOWN_DISMISS);

        if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {

          $(this._element).one(Util.TRANSITION_END, $.proxy(this._hideModal, this)).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          this._hideModal();
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);

        $(window).off(EVENT_KEY);
        $(document).off(EVENT_KEY);
        $(this._element).off(EVENT_KEY);
        $(this._backdrop).off(EVENT_KEY);

        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._originalBodyPadding = null;
        this._scrollbarWidth = null;
      }

      // private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      }
    }, {
      key: '_showElement',
      value: function _showElement(relatedTarget) {
        var _this8 = this;

        var transition = Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // don't move modals dom position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';
        this._element.removeAttribute('aria-hidden');
        this._element.scrollTop = 0;

        if (transition) {
          Util.reflow(this._element);
        }

        $(this._element).addClass(ClassName.IN);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var shownEvent = $.Event(Event.SHOWN, {
          relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
          if (_this8._config.focus) {
            _this8._element.focus();
          }
          $(_this8._element).trigger(shownEvent);
        };

        if (transition) {
          $(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          transitionComplete();
        }
      }
    }, {
      key: '_enforceFocus',
      value: function _enforceFocus() {
        var _this9 = this;

        $(document).off(Event.FOCUSIN) // guard against infinite focus loop
        .on(Event.FOCUSIN, function (event) {
          if (document !== event.target && _this9._element !== event.target && !$(_this9._element).has(event.target).length) {
            _this9._element.focus();
          }
        });
      }
    }, {
      key: '_setEscapeEvent',
      value: function _setEscapeEvent() {
        var _this10 = this;

        if (this._isShown && this._config.keyboard) {
          $(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
            if (event.which === ESCAPE_KEYCODE) {
              _this10.hide();
            }
          });
        } else if (!this._isShown) {
          $(this._element).off(Event.KEYDOWN_DISMISS);
        }
      }
    }, {
      key: '_setResizeEvent',
      value: function _setResizeEvent() {
        if (this._isShown) {
          $(window).on(Event.RESIZE, $.proxy(this._handleUpdate, this));
        } else {
          $(window).off(Event.RESIZE);
        }
      }
    }, {
      key: '_hideModal',
      value: function _hideModal() {
        var _this11 = this;

        this._element.style.display = 'none';
        this._element.setAttribute('aria-hidden', 'true');
        this._showBackdrop(function () {
          $(document.body).removeClass(ClassName.OPEN);
          _this11._resetAdjustments();
          _this11._resetScrollbar();
          $(_this11._element).trigger(Event.HIDDEN);
        });
      }
    }, {
      key: '_removeBackdrop',
      value: function _removeBackdrop() {
        if (this._backdrop) {
          $(this._backdrop).remove();
          this._backdrop = null;
        }
      }
    }, {
      key: '_showBackdrop',
      value: function _showBackdrop(callback) {
        var _this12 = this;

        var animate = $(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

        if (this._isShown && this._config.backdrop) {
          var doAnimate = Util.supportsTransitionEnd() && animate;

          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName.BACKDROP;

          if (animate) {
            $(this._backdrop).addClass(animate);
          }

          $(this._backdrop).appendTo(document.body);

          $(this._element).on(Event.CLICK_DISMISS, function (event) {
            if (_this12._ignoreBackdropClick) {
              _this12._ignoreBackdropClick = false;
              return;
            }
            if (event.target !== event.currentTarget) {
              return;
            }
            if (_this12._config.backdrop === 'static') {
              _this12._element.focus();
            } else {
              _this12.hide();
            }
          });

          if (doAnimate) {
            Util.reflow(this._backdrop);
          }

          $(this._backdrop).addClass(ClassName.IN);

          if (!callback) {
            return;
          }

          if (!doAnimate) {
            callback();
            return;
          }

          $(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
        } else if (!this._isShown && this._backdrop) {
          $(this._backdrop).removeClass(ClassName.IN);

          var callbackRemove = function callbackRemove() {
            _this12._removeBackdrop();
            if (callback) {
              callback();
            }
          };

          if (Util.supportsTransitionEnd() && $(this._element).hasClass(ClassName.FADE)) {
            $(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(BACKDROP_TRANSITION_DURATION);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      }

      // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------

    }, {
      key: '_handleUpdate',
      value: function _handleUpdate() {
        this._adjustDialog();
      }
    }, {
      key: '_adjustDialog',
      value: function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + 'px';
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + 'px';
        }
      }
    }, {
      key: '_resetAdjustments',
      value: function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      }
    }, {
      key: '_checkScrollbar',
      value: function _checkScrollbar() {
        this._isBodyOverflowing = document.body.clientWidth < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      }
    }, {
      key: '_setScrollbar',
      value: function _setScrollbar() {
        var bodyPadding = parseInt($(Selector.FIXED_CONTENT).css('padding-right') || 0, 10);

        this._originalBodyPadding = document.body.style.paddingRight || '';

        if (this._isBodyOverflowing) {
          document.body.style.paddingRight = bodyPadding + this._scrollbarWidth + 'px';
        }
      }
    }, {
      key: '_resetScrollbar',
      value: function _resetScrollbar() {
        document.body.style.paddingRight = this._originalBodyPadding;
      }
    }, {
      key: '_getScrollbarWidth',
      value: function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = $.extend({}, Modal.Default, $(this).data(), typeof config === 'object' && config);

          if (!data) {
            data = new Modal(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return Modal;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    var _this13 = this;

    var target = undefined;
    var selector = Util.getSelectorFromElement(this);

    if (selector) {
      target = $(selector)[0];
    }

    var config = $(target).data(DATA_KEY) ? 'toggle' : $.extend({}, $(target).data(), $(this).data());

    if (this.tagName === 'A') {
      event.preventDefault();
    }

    var $target = $(target).one(Event.SHOW, function (showEvent) {
      if (showEvent.isDefaultPrevented()) {
        // only register focus restorer if modal will actually get shown
        return;
      }

      $target.one(Event.HIDDEN, function () {
        if ($(_this13).is(':visible')) {
          _this13.focus();
        }
      });
    });

    Modal._jQueryInterface.call($(target), config, this);
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Modal._jQueryInterface;
  $.fn[NAME].Constructor = Modal;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Modal._jQueryInterface;
  };

  return Modal;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.4): scrollspy.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var ScrollSpy = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'scrollspy';
  var VERSION = '4.0.0-alpha.4';
  var DATA_KEY = 'bs.scrollspy';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = {
    offset: 10,
    method: 'auto',
    target: ''
  };

  var DefaultType = {
    offset: 'number',
    method: 'string',
    target: '(string|element)'
  };

  var Event = {
    ACTIVATE: 'activate' + EVENT_KEY,
    SCROLL: 'scroll' + EVENT_KEY,
    LOAD_DATA_API: 'load' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_ITEM: 'dropdown-item',
    DROPDOWN_MENU: 'dropdown-menu',
    NAV_LINK: 'nav-link',
    NAV: 'nav',
    ACTIVE: 'active'
  };

  var Selector = {
    DATA_SPY: '[data-spy="scroll"]',
    ACTIVE: '.active',
    LIST_ITEM: '.list-item',
    LI: 'li',
    LI_DROPDOWN: 'li.dropdown',
    NAV_LINKS: '.nav-link',
    DROPDOWN: '.dropdown',
    DROPDOWN_ITEMS: '.dropdown-item',
    DROPDOWN_TOGGLE: '.dropdown-toggle'
  };

  var OffsetMethod = {
    OFFSET: 'offset',
    POSITION: 'position'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var ScrollSpy = (function () {
    function ScrollSpy(element, config) {
      _classCallCheck(this, ScrollSpy);

      this._element = element;
      this._scrollElement = element.tagName === 'BODY' ? window : element;
      this._config = this._getConfig(config);
      this._selector = this._config.target + ' ' + Selector.NAV_LINKS + ',' + (this._config.target + ' ' + Selector.DROPDOWN_ITEMS);
      this._offsets = [];
      this._targets = [];
      this._activeTarget = null;
      this._scrollHeight = 0;

      $(this._scrollElement).on(Event.SCROLL, $.proxy(this._process, this));

      this.refresh();
      this._process();
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(ScrollSpy, [{
      key: 'refresh',

      // public

      value: function refresh() {
        var _this14 = this;

        var autoMethod = this._scrollElement !== this._scrollElement.window ? OffsetMethod.POSITION : OffsetMethod.OFFSET;

        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;

        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;

        this._offsets = [];
        this._targets = [];

        this._scrollHeight = this._getScrollHeight();

        var targets = $.makeArray($(this._selector));

        targets.map(function (element) {
          var target = undefined;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = $(targetSelector)[0];
          }

          if (target && (target.offsetWidth || target.offsetHeight)) {
            // todo (fat): remove sketch reliance on jQuery position/offset
            return [$(target)[offsetMethod]().top + offsetBase, targetSelector];
          }
          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this14._offsets.push(item[0]);
          _this14._targets.push(item[1]);
        });
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeData(this._element, DATA_KEY);
        $(this._scrollElement).off(EVENT_KEY);

        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      }

      // private

    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, Default, config);

        if (typeof config.target !== 'string') {
          var id = $(config.target).attr('id');
          if (!id) {
            id = Util.getUID(NAME);
            $(config.target).attr('id', id);
          }
          config.target = '#' + id;
        }

        Util.typeCheckConfig(NAME, config, DefaultType);

        return config;
      }
    }, {
      key: '_getScrollTop',
      value: function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.scrollY : this._scrollElement.scrollTop;
      }
    }, {
      key: '_getScrollHeight',
      value: function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      }
    }, {
      key: '_process',
      value: function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;
        var scrollHeight = this._getScrollHeight();
        var maxScroll = this._config.offset + scrollHeight - this._scrollElement.offsetHeight;

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }
        }

        if (this._activeTarget && scrollTop < this._offsets[0]) {
          this._activeTarget = null;
          this._clear();
          return;
        }

        for (var i = this._offsets.length; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (this._offsets[i + 1] === undefined || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      }
    }, {
      key: '_activate',
      value: function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(',');
        queries = queries.map(function (selector) {
          return selector + '[data-target="' + target + '"],' + (selector + '[href="' + target + '"]');
        });

        var $link = $(queries.join(','));

        if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
          $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          $link.addClass(ClassName.ACTIVE);
        } else {
          // todo (fat) this is kinda sus...
          // recursively add actives to tested nav-links
          $link.parents(Selector.LI).find(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
        }

        $(this._scrollElement).trigger(Event.ACTIVATE, {
          relatedTarget: target
        });
      }
    }, {
      key: '_clear',
      value: function _clear() {
        $(this._selector).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = typeof config === 'object' && config || null;

          if (!data) {
            data = new ScrollSpy(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }]);

    return ScrollSpy;
  })();

  $(window).on(Event.LOAD_DATA_API, function () {
    var scrollSpys = $.makeArray($(Selector.DATA_SPY));

    for (var i = scrollSpys.length; i--;) {
      var $spy = $(scrollSpys[i]);
      ScrollSpy._jQueryInterface.call($spy, $spy.data());
    }
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = ScrollSpy._jQueryInterface;
  $.fn[NAME].Constructor = ScrollSpy;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return ScrollSpy._jQueryInterface;
  };

  return ScrollSpy;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.4): tab.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tab = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tab';
  var VERSION = '4.0.0-alpha.4';
  var DATA_KEY = 'bs.tab';
  var EVENT_KEY = '.' + DATA_KEY;
  var DATA_API_KEY = '.data-api';
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
  };

  var ClassName = {
    DROPDOWN_MENU: 'dropdown-menu',
    ACTIVE: 'active',
    FADE: 'fade',
    IN: 'in'
  };

  var Selector = {
    A: 'a',
    LI: 'li',
    DROPDOWN: '.dropdown',
    UL: 'ul:not(.dropdown-menu)',
    FADE_CHILD: '> .nav-item .fade, > .fade',
    ACTIVE: '.active',
    ACTIVE_CHILD: '> .nav-item > .active, > .active',
    DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"]',
    DROPDOWN_TOGGLE: '.dropdown-toggle',
    DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tab = (function () {
    function Tab(element) {
      _classCallCheck(this, Tab);

      this._element = element;
    }

    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Tab, [{
      key: 'show',

      // public

      value: function show() {
        var _this15 = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $(this._element).hasClass(ClassName.ACTIVE)) {
          return;
        }

        var target = undefined;
        var previous = undefined;
        var ulElement = $(this._element).closest(Selector.UL)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (ulElement) {
          previous = $.makeArray($(ulElement).find(Selector.ACTIVE));
          previous = previous[previous.length - 1];
        }

        var hideEvent = $.Event(Event.HIDE, {
          relatedTarget: this._element
        });

        var showEvent = $.Event(Event.SHOW, {
          relatedTarget: previous
        });

        if (previous) {
          $(previous).trigger(hideEvent);
        }

        $(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = $(selector)[0];
        }

        this._activate(this._element, ulElement);

        var complete = function complete() {
          var hiddenEvent = $.Event(Event.HIDDEN, {
            relatedTarget: _this15._element
          });

          var shownEvent = $.Event(Event.SHOWN, {
            relatedTarget: previous
          });

          $(previous).trigger(hiddenEvent);
          $(_this15._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        $.removeClass(this._element, DATA_KEY);
        this._element = null;
      }

      // private

    }, {
      key: '_activate',
      value: function _activate(element, container, callback) {
        var active = $(container).find(Selector.ACTIVE_CHILD)[0];
        var isTransitioning = callback && Util.supportsTransitionEnd() && (active && $(active).hasClass(ClassName.FADE) || Boolean($(container).find(Selector.FADE_CHILD)[0]));

        var complete = $.proxy(this._transitionComplete, this, element, active, isTransitioning, callback);

        if (active && isTransitioning) {
          $(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          complete();
        }

        if (active) {
          $(active).removeClass(ClassName.IN);
        }
      }
    }, {
      key: '_transitionComplete',
      value: function _transitionComplete(element, active, isTransitioning, callback) {
        if (active) {
          $(active).removeClass(ClassName.ACTIVE);

          var dropdownChild = $(active).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) {
            $(dropdownChild).removeClass(ClassName.ACTIVE);
          }

          active.setAttribute('aria-expanded', false);
        }

        $(element).addClass(ClassName.ACTIVE);
        element.setAttribute('aria-expanded', true);

        if (isTransitioning) {
          Util.reflow(element);
          $(element).addClass(ClassName.IN);
        } else {
          $(element).removeClass(ClassName.FADE);
        }

        if (element.parentNode && $(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {

          var dropdownElement = $(element).closest(Selector.DROPDOWN)[0];
          if (dropdownElement) {
            $(dropdownElement).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $(this);
          var data = $this.data(DATA_KEY);

          if (!data) {
            data = data = new Tab(this);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }]);

    return Tab;
  })();

  $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
    event.preventDefault();
    Tab._jQueryInterface.call($(this), 'show');
  });

  /**
   * ------------------------------------------------------------------------
   * jQuery
   * ------------------------------------------------------------------------
   */

  $.fn[NAME] = Tab._jQueryInterface;
  $.fn[NAME].Constructor = Tab;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tab._jQueryInterface;
  };

  return Tab;
})(jQuery);

/* global Tether */

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.4): tooltip.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Tooltip = (function ($) {

  /**
   * Check for Tether dependency
   * Tether - http://github.hubspot.com/tether/
   */
  if (window.Tether === undefined) {
    throw new Error('Bootstrap tooltips require Tether (http://github.hubspot.com/tether/)');
  }

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'tooltip';
  var VERSION = '4.0.0-alpha.4';
  var DATA_KEY = 'bs.tooltip';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];
  var TRANSITION_DURATION = 150;
  var CLASS_PREFIX = 'bs-tether';

  var Default = {
    animation: true,
    template: '<div class="tooltip" role="tooltip">' + '<div class="tooltip-arrow"></div>' + '<div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    selector: false,
    placement: 'top',
    offset: '0 0',
    constraints: []
  };

  var DefaultType = {
    animation: 'boolean',
    template: 'string',
    title: '(string|element|function)',
    trigger: 'string',
    delay: '(number|object)',
    html: 'boolean',
    selector: '(string|boolean)',
    placement: '(string|function)',
    offset: 'string',
    constraints: 'array'
  };

  var AttachmentMap = {
    TOP: 'bottom center',
    RIGHT: 'middle left',
    BOTTOM: 'top center',
    LEFT: 'middle right'
  };

  var HoverState = {
    IN: 'in',
    OUT: 'out'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  var ClassName = {
    FADE: 'fade',
    IN: 'in'
  };

  var Selector = {
    TOOLTIP: '.tooltip',
    TOOLTIP_INNER: '.tooltip-inner'
  };

  var TetherClass = {
    element: false,
    enabled: false
  };

  var Trigger = {
    HOVER: 'hover',
    FOCUS: 'focus',
    CLICK: 'click',
    MANUAL: 'manual'
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Tooltip = (function () {
    function Tooltip(element, config) {
      _classCallCheck(this, Tooltip);

      // private
      this._isEnabled = true;
      this._timeout = 0;
      this._hoverState = '';
      this._activeTrigger = {};
      this._tether = null;

      // protected
      this.element = element;
      this.config = this._getConfig(config);
      this.tip = null;

      this._setListeners();
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    // getters

    _createClass(Tooltip, [{
      key: 'enable',

      // public

      value: function enable() {
        this._isEnabled = true;
      }
    }, {
      key: 'disable',
      value: function disable() {
        this._isEnabled = false;
      }
    }, {
      key: 'toggleEnabled',
      value: function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      }
    }, {
      key: 'toggle',
      value: function toggle(event) {
        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = $(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {

          if ($(this.getTipElement()).hasClass(ClassName.IN)) {
            this._leave(null, this);
            return;
          }

          this._enter(null, this);
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        clearTimeout(this._timeout);

        this.cleanupTether();

        $.removeData(this.element, this.constructor.DATA_KEY);

        $(this.element).off(this.constructor.EVENT_KEY);

        if (this.tip) {
          $(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;
        this._tether = null;

        this.element = null;
        this.config = null;
        this.tip = null;
      }
    }, {
      key: 'show',
      value: function show() {
        var _this16 = this;

        var showEvent = $.Event(this.constructor.Event.SHOW);

        if (this.isWithContent() && this._isEnabled) {
          $(this.element).trigger(showEvent);

          var isInTheDom = $.contains(this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);

          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);

          this.setContent();

          if (this.config.animation) {
            $(tip).addClass(ClassName.FADE);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);

          $(tip).data(this.constructor.DATA_KEY, this).appendTo(document.body);

          $(this.element).trigger(this.constructor.Event.INSERTED);

          this._tether = new Tether({
            attachment: attachment,
            element: tip,
            target: this.element,
            classes: TetherClass,
            classPrefix: CLASS_PREFIX,
            offset: this.config.offset,
            constraints: this.config.constraints,
            addTargetClasses: false
          });

          Util.reflow(tip);
          this._tether.position();

          $(tip).addClass(ClassName.IN);

          var complete = function complete() {
            var prevHoverState = _this16._hoverState;
            _this16._hoverState = null;

            $(_this16.element).trigger(_this16.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this16._leave(null, _this16);
            }
          };

          if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {
            $(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(Tooltip._TRANSITION_DURATION);
            return;
          }

          complete();
        }
      }
    }, {
      key: 'hide',
      value: function hide(callback) {
        var _this17 = this;

        var tip = this.getTipElement();
        var hideEvent = $.Event(this.constructor.Event.HIDE);
        var complete = function complete() {
          if (_this17._hoverState !== HoverState.IN && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this17.element.removeAttribute('aria-describedby');
          $(_this17.element).trigger(_this17.constructor.Event.HIDDEN);
          _this17.cleanupTether();

          if (callback) {
            callback();
          }
        };

        $(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        $(tip).removeClass(ClassName.IN);

        if (Util.supportsTransitionEnd() && $(this.tip).hasClass(ClassName.FADE)) {

          $(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(TRANSITION_DURATION);
        } else {
          complete();
        }

        this._hoverState = '';
      }

      // protected

    }, {
      key: 'isWithContent',
      value: function isWithContent() {
        return Boolean(this.getTitle());
      }
    }, {
      key: 'getTipElement',
      value: function getTipElement() {
        return this.tip = this.tip || $(this.config.template)[0];
      }
    }, {
      key: 'setContent',
      value: function setContent() {
        var $tip = $(this.getTipElement());

        this.setElementContent($tip.find(Selector.TOOLTIP_INNER), this.getTitle());

        $tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);

        this.cleanupTether();
      }
    }, {
      key: 'setElementContent',
      value: function setElementContent($element, content) {
        var html = this.config.html;
        if (typeof content === 'object' && (content.nodeType || content.jquery)) {
          // content is a DOM node or a jQuery
          if (html) {
            if (!$(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($(content).text());
          }
        } else {
          $element[html ? 'html' : 'text'](content);
        }
      }
    }, {
      key: 'getTitle',
      value: function getTitle() {
        var title = this.element.getAttribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      }
    }, {
      key: 'cleanupTether',
      value: function cleanupTether() {
        if (this._tether) {
          this._tether.destroy();
        }
      }

      // private

    }, {
      key: '_getAttachment',
      value: function _getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
      }
    }, {
      key: '_setListeners',
      value: function _setListeners() {
        var _this18 = this;

        var triggers = this.config.trigger.split(' ');

        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            $(_this18.element).on(_this18.constructor.Event.CLICK, _this18.config.selector, $.proxy(_this18.toggle, _this18));
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this18.constructor.Event.MOUSEENTER : _this18.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this18.constructor.Event.MOUSELEAVE : _this18.constructor.Event.FOCUSOUT;

            $(_this18.element).on(eventIn, _this18.config.selector, $.proxy(_this18._enter, _this18)).on(eventOut, _this18.config.selector, $.proxy(_this18._leave, _this18));
          }
        });

        if (this.config.selector) {
          this.config = $.extend({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      }
    }, {
      key: '_fixTitle',
      value: function _fixTitle() {
        var titleType = typeof this.element.getAttribute('data-original-title');
        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      }
    }, {
      key: '_enter',
      value: function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;

        context = context || $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }

        if ($(context.getTipElement()).hasClass(ClassName.IN) || context._hoverState === HoverState.IN) {
          context._hoverState = HoverState.IN;
          return;
        }

        clearTimeout(context._timeout);

        context._hoverState = HoverState.IN;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.IN) {
            context.show();
          }
        }, context.config.delay.show);
      }
    }, {
      key: '_leave',
      value: function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;

        context = context || $(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);

        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      }
    }, {
      key: '_isWithActiveTrigger',
      value: function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      }
    }, {
      key: '_getConfig',
      value: function _getConfig(config) {
        config = $.extend({}, this.constructor.Default, $(this.element).data(), config);

        if (config.delay && typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);

        return config;
      }
    }, {
      key: '_getDelegateConfig',
      value: function _getDelegateConfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = typeof config === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',
      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Tooltip;
  })();

  $.fn[NAME] = Tooltip._jQueryInterface;
  $.fn[NAME].Constructor = Tooltip;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Tooltip._jQueryInterface;
  };

  return Tooltip;
})(jQuery);

/**
 * --------------------------------------------------------------------------
 * Bootstrap (v4.0.0-alpha.4): popover.js
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */

var Popover = (function ($) {

  /**
   * ------------------------------------------------------------------------
   * Constants
   * ------------------------------------------------------------------------
   */

  var NAME = 'popover';
  var VERSION = '4.0.0-alpha.4';
  var DATA_KEY = 'bs.popover';
  var EVENT_KEY = '.' + DATA_KEY;
  var JQUERY_NO_CONFLICT = $.fn[NAME];

  var Default = $.extend({}, Tooltip.Default, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip">' + '<div class="popover-arrow"></div>' + '<h3 class="popover-title"></h3>' + '<div class="popover-content"></div></div>'
  });

  var DefaultType = $.extend({}, Tooltip.DefaultType, {
    content: '(string|element|function)'
  });

  var ClassName = {
    FADE: 'fade',
    IN: 'in'
  };

  var Selector = {
    TITLE: '.popover-title',
    CONTENT: '.popover-content',
    ARROW: '.popover-arrow'
  };

  var Event = {
    HIDE: 'hide' + EVENT_KEY,
    HIDDEN: 'hidden' + EVENT_KEY,
    SHOW: 'show' + EVENT_KEY,
    SHOWN: 'shown' + EVENT_KEY,
    INSERTED: 'inserted' + EVENT_KEY,
    CLICK: 'click' + EVENT_KEY,
    FOCUSIN: 'focusin' + EVENT_KEY,
    FOCUSOUT: 'focusout' + EVENT_KEY,
    MOUSEENTER: 'mouseenter' + EVENT_KEY,
    MOUSELEAVE: 'mouseleave' + EVENT_KEY
  };

  /**
   * ------------------------------------------------------------------------
   * Class Definition
   * ------------------------------------------------------------------------
   */

  var Popover = (function (_Tooltip) {
    _inherits(Popover, _Tooltip);

    function Popover() {
      _classCallCheck(this, Popover);

      _get(Object.getPrototypeOf(Popover.prototype), 'constructor', this).apply(this, arguments);
    }

    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    _createClass(Popover, [{
      key: 'isWithContent',

      // overrides

      value: function isWithContent() {
        return this.getTitle() || this._getContent();
      }
    }, {
      key: 'getTipElement',
      value: function getTipElement() {
        return this.tip = this.tip || $(this.config.template)[0];
      }
    }, {
      key: 'setContent',
      value: function setContent() {
        var $tip = $(this.getTipElement());

        // we use append for html objects to maintain js events
        this.setElementContent($tip.find(Selector.TITLE), this.getTitle());
        this.setElementContent($tip.find(Selector.CONTENT), this._getContent());

        $tip.removeClass(ClassName.FADE).removeClass(ClassName.IN);

        this.cleanupTether();
      }

      // private

    }, {
      key: '_getContent',
      value: function _getContent() {
        return this.element.getAttribute('data-content') || (typeof this.config.content === 'function' ? this.config.content.call(this.element) : this.config.content);
      }

      // static

    }], [{
      key: '_jQueryInterface',
      value: function _jQueryInterface(config) {
        return this.each(function () {
          var data = $(this).data(DATA_KEY);
          var _config = typeof config === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            $(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (data[config] === undefined) {
              throw new Error('No method named "' + config + '"');
            }
            data[config]();
          }
        });
      }
    }, {
      key: 'VERSION',

      // getters

      get: function get() {
        return VERSION;
      }
    }, {
      key: 'Default',
      get: function get() {
        return Default;
      }
    }, {
      key: 'NAME',
      get: function get() {
        return NAME;
      }
    }, {
      key: 'DATA_KEY',
      get: function get() {
        return DATA_KEY;
      }
    }, {
      key: 'Event',
      get: function get() {
        return Event;
      }
    }, {
      key: 'EVENT_KEY',
      get: function get() {
        return EVENT_KEY;
      }
    }, {
      key: 'DefaultType',
      get: function get() {
        return DefaultType;
      }
    }]);

    return Popover;
  })(Tooltip);

  $.fn[NAME] = Popover._jQueryInterface;
  $.fn[NAME].Constructor = Popover;
  $.fn[NAME].noConflict = function () {
    $.fn[NAME] = JQUERY_NO_CONFLICT;
    return Popover._jQueryInterface;
  };

  return Popover;
})(jQuery);

}(jQuery);

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

eval("/**\n * First we will load all of this project's JavaScript dependencies which\n * include Vue and Vue Resource. This gives a great starting point for\n * building robust, powerful web applications using Vue and Laravel.\n */\n\n//require('./bootstrap');\n\n/**\n * Next, we will create a fresh Vue application instance and attach it to\n * the page. Then, you may begin adding components to this application\n * or customize the JavaScript scaffolding to fit your unique needs.\n */\n\n// Vue.component('example', require('./components/Example.vue'));\n\n// const app = new Vue({\n//     el: '#app'\n// });\n\nconsole.log(\"funciona\");//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMC5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy9yZXNvdXJjZXMvYXNzZXRzL2pzL2FwcC5qcz84YjY3Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRmlyc3Qgd2Ugd2lsbCBsb2FkIGFsbCBvZiB0aGlzIHByb2plY3QncyBKYXZhU2NyaXB0IGRlcGVuZGVuY2llcyB3aGljaFxuICogaW5jbHVkZSBWdWUgYW5kIFZ1ZSBSZXNvdXJjZS4gVGhpcyBnaXZlcyBhIGdyZWF0IHN0YXJ0aW5nIHBvaW50IGZvclxuICogYnVpbGRpbmcgcm9idXN0LCBwb3dlcmZ1bCB3ZWIgYXBwbGljYXRpb25zIHVzaW5nIFZ1ZSBhbmQgTGFyYXZlbC5cbiAqL1xuXG4vL3JlcXVpcmUoJy4vYm9vdHN0cmFwJyk7XG5cbi8qKlxuICogTmV4dCwgd2Ugd2lsbCBjcmVhdGUgYSBmcmVzaCBWdWUgYXBwbGljYXRpb24gaW5zdGFuY2UgYW5kIGF0dGFjaCBpdCB0b1xuICogdGhlIHBhZ2UuIFRoZW4sIHlvdSBtYXkgYmVnaW4gYWRkaW5nIGNvbXBvbmVudHMgdG8gdGhpcyBhcHBsaWNhdGlvblxuICogb3IgY3VzdG9taXplIHRoZSBKYXZhU2NyaXB0IHNjYWZmb2xkaW5nIHRvIGZpdCB5b3VyIHVuaXF1ZSBuZWVkcy5cbiAqL1xuXG4vLyBWdWUuY29tcG9uZW50KCdleGFtcGxlJywgcmVxdWlyZSgnLi9jb21wb25lbnRzL0V4YW1wbGUudnVlJykpO1xuXG4vLyBjb25zdCBhcHAgPSBuZXcgVnVlKHtcbi8vICAgICBlbDogJyNhcHAnXG4vLyB9KTtcblxuY29uc29sZS5sb2coXCJmdW5jaW9uYVwiKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gcmVzb3VyY2VzL2Fzc2V0cy9qcy9hcHAuanMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSIsInNvdXJjZVJvb3QiOiIifQ==");

/***/ }
/******/ ]);
//# sourceMappingURL=all.js.map

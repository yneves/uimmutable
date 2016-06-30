//! moment.js
//! version : 2.13.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, function () { 'use strict';

    var hookCallback;

    function utils_hooks__hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function create_utc__createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function valid__isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            m._isValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                m._isValid = m._isValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }
        }
        return m._isValid;
    }

    function valid__createInvalid (flags) {
        var m = create_utc__createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    function isUndefined(input) {
        return input === void 0;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = utils_hooks__hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i in momentProperties) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            utils_hooks__hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (utils_hooks__hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (utils_hooks__hooks.deprecationHandler != null) {
                utils_hooks__hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(arguments).join(', ') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (utils_hooks__hooks.deprecationHandler != null) {
            utils_hooks__hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    utils_hooks__hooks.suppressDeprecationWarnings = false;
    utils_hooks__hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function isObject(input) {
        return Object.prototype.toString.call(input) === '[object Object]';
    }

    function locale_set__set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _ordinalParseLenient.
        this._ordinalParseLenient = new RegExp(this._ordinalParse.source + '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    // internal storage for locale config files
    var locales = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return null;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                require('./locale/' + name);
                // because defineLocale currently also sets the global locale, we
                // want to undo that for lazy loaded locales
                locale_locales__getSetGlobalLocale(oldLocale);
            } catch (e) { }
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function locale_locales__getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = locale_locales__getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale');
                config = mergeConfigs(locales[name]._config, config);
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    config = mergeConfigs(locales[config.parentLocale]._config, config);
                } else {
                    // treat as if there is no base config
                    deprecateSimple('parentLocaleUndefined',
                            'specified parentLocale is not defined yet');
                }
            }
            locales[name] = new Locale(config);

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);

            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale;
            if (locales[name] != null) {
                config = mergeConfigs(locales[name]._config, config);
            }
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            locale_locales__getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function locale_locales__getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function locale_locales__listLocales() {
        return keys(locales);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                get_set__set(this, unit, value);
                utils_hooks__hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get_set__get(this, unit);
            }
        };
    }

    function get_set__get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function get_set__set (mom, unit, value) {
        if (mom.isValid()) {
            mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
        }
    }

    // MOMENTS

    function getSet (units, value) {
        var unit;
        if (typeof units === 'object') {
            for (unit in units) {
                this.set(unit, units[unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i;


    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (typeof callback === 'number') {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s+)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        return isArray(this._months) ? this._months[m.month()] :
            this._months[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function units_month__handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = create_utc__createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return units_month__handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (typeof value !== 'number') {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            utils_hooks__hooks.updateOffset(this, true);
            return this;
        } else {
            return get_set__get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    utils_hooks__hooks.createFromInputFallback = deprecate(
        'moment construction falls back to js Date. This is ' +
        'discouraged and will be removed in upcoming major ' +
        'release. Please refer to ' +
        'https://github.com/moment/moment/issues/1407 for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    function createDate (y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getFullYear())) {
            date.setFullYear(y);
        }
        return date;
    }

    function createUTCDate (y) {
        var date = new Date(Date.UTC.apply(null, arguments));

        //the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0 && isFinite(date.getUTCFullYear())) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? utils_hooks__hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = utils_hooks__hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    utils_hooks__hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(utils_hooks__hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse)) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(local__createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            weekYear = defaults(w.gg, config._a[YEAR], weekOfYear(local__createLocal(), dow, doy).year);
            week = defaults(w.w, 1);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from begining of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to begining of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // constant that refers to the ISO standard
    utils_hooks__hooks.ISO_8601 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === utils_hooks__hooks.ISO_8601) {
            configFromISO(config);
            return;
        }

        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (getParsingFlags(config).bigHour === true &&
                config._a[HOUR] <= 12 &&
                config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!valid__isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || locale_locales__getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return valid__createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        } else if (isDate(input)) {
            config._d = input;
        } else {
            configFromInput(config);
        }

        if (!valid__isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (input === undefined) {
            config._d = new Date(utils_hooks__hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (typeof(input) === 'object') {
            configFromObject(config);
        } else if (typeof(input) === 'number') {
            // from milliseconds
            config._d = new Date(input);
        } else {
            utils_hooks__hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (typeof(locale) === 'boolean') {
            strict = locale;
            locale = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function local__createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
         'moment().min is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548',
         function () {
             var other = local__createLocal.apply(null, arguments);
             if (this.isValid() && other.isValid()) {
                 return other < this ? this : other;
             } else {
                 return valid__createInvalid();
             }
         }
     );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548',
        function () {
            var other = local__createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return valid__createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return local__createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = locale_locales__getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = ((string || '').match(matcher) || []);
        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : local__createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            utils_hooks__hooks.updateOffset(res, false);
            return res;
        } else {
            return local__createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    utils_hooks__hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
            } else if (Math.abs(input) < 16) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    add_subtract__addSubtract(this, create__createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    utils_hooks__hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm) {
            this.utcOffset(this._tzm);
        } else if (typeof this._i === 'string') {
            this.utcOffset(offsetFromString(matchOffset, this._i));
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? local__createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? create_utc__createUTC(c._a) : local__createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?\d*)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-)?P(?:(-?[0-9,.]*)Y)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)W)?(?:(-?[0-9,.]*)D)?(?:T(?:(-?[0-9,.]*)H)?(?:(-?[0-9,.]*)M)?(?:(-?[0-9,.]*)S)?)?$/;

    function create__createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (typeof input === 'number') {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])        * sign,
                h  : toInt(match[HOUR])        * sign,
                m  : toInt(match[MINUTE])      * sign,
                s  : toInt(match[SECOND])      * sign,
                ms : toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(local__createLocal(duration.from), local__createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    create__createDuration.fn = Duration.prototype;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {milliseconds: 0, months: 0};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period).');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = create__createDuration(val, period);
            add_subtract__addSubtract(this, dur, direction);
            return this;
        };
    }

    function add_subtract__addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (days) {
            get_set__set(mom, 'Date', get_set__get(mom, 'Date') + days * isAdding);
        }
        if (months) {
            setMonth(mom, get_set__get(mom, 'Month') + months * isAdding);
        }
        if (updateOffset) {
            utils_hooks__hooks.updateOffset(mom, days || months);
        }
    }

    var add_subtract__add      = createAdder(1, 'add');
    var add_subtract__subtract = createAdder(-1, 'subtract');

    function moment_calendar__calendar (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || local__createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            diff = this.diff(sod, 'days', true),
            format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format]() : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, local__createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : local__createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units || 'millisecond');
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input,units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input,units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            delta, output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        if (units === 'year' || units === 'month' || units === 'quarter') {
            output = monthDiff(this, that);
            if (units === 'quarter') {
                output = output / 3;
            } else if (units === 'year') {
                output = output / 12;
            }
        } else {
            delta = this - that;
            output = units === 'second' ? delta / 1e3 : // 1000
                units === 'minute' ? delta / 6e4 : // 1000 * 60
                units === 'hour' ? delta / 36e5 : // 1000 * 60 * 60
                units === 'day' ? (delta - zoneDelta) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                units === 'week' ? (delta - zoneDelta) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                delta;
        }
        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    utils_hooks__hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    utils_hooks__hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function moment_format__toISOString () {
        var m = this.clone().utc();
        if (0 < m.year() && m.year() <= 9999) {
            if (isFunction(Date.prototype.toISOString)) {
                // native implementation is ~50x faster, use it when we can
                return this.toDate().toISOString();
            } else {
                return formatMoment(m, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
            }
        } else {
            return formatMoment(m, 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        }
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? utils_hooks__hooks.defaultFormatUtc : utils_hooks__hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 local__createLocal(time).isValid())) {
            return create__createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(local__createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 local__createLocal(time).isValid())) {
            return create__createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(local__createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = locale_locales__getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    function startOf (units) {
        units = normalizeUnits(units);
        // the following switch intentionally omits break keywords
        // to utilize falling through the cases.
        switch (units) {
        case 'year':
            this.month(0);
            /* falls through */
        case 'quarter':
        case 'month':
            this.date(1);
            /* falls through */
        case 'week':
        case 'isoWeek':
        case 'day':
        case 'date':
            this.hours(0);
            /* falls through */
        case 'hour':
            this.minutes(0);
            /* falls through */
        case 'minute':
            this.seconds(0);
            /* falls through */
        case 'second':
            this.milliseconds(0);
        }

        // weeks are a special case
        if (units === 'week') {
            this.weekday(0);
        }
        if (units === 'isoWeek') {
            this.isoWeekday(1);
        }

        // quarters are also special
        if (units === 'quarter') {
            this.month(Math.floor(this.month() / 3) * 3);
        }

        return this;
    }

    function endOf (units) {
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond') {
            return this;
        }

        // 'date' is an alias for 'day', so it should be considered as such.
        if (units === 'date') {
            units = 'day';
        }

        return this.startOf(units).add(1, (units === 'isoWeek' ? 'week' : units)).subtract(1, 'ms');
    }

    function to_type__valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return this._offset ? new Date(this.valueOf()) : this._d;
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function moment_valid__isValid () {
        return valid__isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = utils_hooks__hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 1st is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        return isStrict ? locale._ordinalParse : locale._ordinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0], 10);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    // LOCALES

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        return isArray(this._weekdays) ? this._weekdays[m.day()] :
            this._weekdays[this._weekdays.isFormat.test(format) ? 'format' : 'standalone'][m.day()];
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return this._weekdaysShort[m.day()];
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return this._weekdaysMin[m.day()];
    }

    function day_of_week__handleStrictParse(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = create_utc__createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return day_of_week__handleStrictParse.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = create_utc__createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.
        return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = create_utc__createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour he wants. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var momentPrototype__proto = Moment.prototype;

    momentPrototype__proto.add               = add_subtract__add;
    momentPrototype__proto.calendar          = moment_calendar__calendar;
    momentPrototype__proto.clone             = clone;
    momentPrototype__proto.diff              = diff;
    momentPrototype__proto.endOf             = endOf;
    momentPrototype__proto.format            = format;
    momentPrototype__proto.from              = from;
    momentPrototype__proto.fromNow           = fromNow;
    momentPrototype__proto.to                = to;
    momentPrototype__proto.toNow             = toNow;
    momentPrototype__proto.get               = getSet;
    momentPrototype__proto.invalidAt         = invalidAt;
    momentPrototype__proto.isAfter           = isAfter;
    momentPrototype__proto.isBefore          = isBefore;
    momentPrototype__proto.isBetween         = isBetween;
    momentPrototype__proto.isSame            = isSame;
    momentPrototype__proto.isSameOrAfter     = isSameOrAfter;
    momentPrototype__proto.isSameOrBefore    = isSameOrBefore;
    momentPrototype__proto.isValid           = moment_valid__isValid;
    momentPrototype__proto.lang              = lang;
    momentPrototype__proto.locale            = locale;
    momentPrototype__proto.localeData        = localeData;
    momentPrototype__proto.max               = prototypeMax;
    momentPrototype__proto.min               = prototypeMin;
    momentPrototype__proto.parsingFlags      = parsingFlags;
    momentPrototype__proto.set               = getSet;
    momentPrototype__proto.startOf           = startOf;
    momentPrototype__proto.subtract          = add_subtract__subtract;
    momentPrototype__proto.toArray           = toArray;
    momentPrototype__proto.toObject          = toObject;
    momentPrototype__proto.toDate            = toDate;
    momentPrototype__proto.toISOString       = moment_format__toISOString;
    momentPrototype__proto.toJSON            = toJSON;
    momentPrototype__proto.toString          = toString;
    momentPrototype__proto.unix              = unix;
    momentPrototype__proto.valueOf           = to_type__valueOf;
    momentPrototype__proto.creationData      = creationData;

    // Year
    momentPrototype__proto.year       = getSetYear;
    momentPrototype__proto.isLeapYear = getIsLeapYear;

    // Week Year
    momentPrototype__proto.weekYear    = getSetWeekYear;
    momentPrototype__proto.isoWeekYear = getSetISOWeekYear;

    // Quarter
    momentPrototype__proto.quarter = momentPrototype__proto.quarters = getSetQuarter;

    // Month
    momentPrototype__proto.month       = getSetMonth;
    momentPrototype__proto.daysInMonth = getDaysInMonth;

    // Week
    momentPrototype__proto.week           = momentPrototype__proto.weeks        = getSetWeek;
    momentPrototype__proto.isoWeek        = momentPrototype__proto.isoWeeks     = getSetISOWeek;
    momentPrototype__proto.weeksInYear    = getWeeksInYear;
    momentPrototype__proto.isoWeeksInYear = getISOWeeksInYear;

    // Day
    momentPrototype__proto.date       = getSetDayOfMonth;
    momentPrototype__proto.day        = momentPrototype__proto.days             = getSetDayOfWeek;
    momentPrototype__proto.weekday    = getSetLocaleDayOfWeek;
    momentPrototype__proto.isoWeekday = getSetISODayOfWeek;
    momentPrototype__proto.dayOfYear  = getSetDayOfYear;

    // Hour
    momentPrototype__proto.hour = momentPrototype__proto.hours = getSetHour;

    // Minute
    momentPrototype__proto.minute = momentPrototype__proto.minutes = getSetMinute;

    // Second
    momentPrototype__proto.second = momentPrototype__proto.seconds = getSetSecond;

    // Millisecond
    momentPrototype__proto.millisecond = momentPrototype__proto.milliseconds = getSetMillisecond;

    // Offset
    momentPrototype__proto.utcOffset            = getSetOffset;
    momentPrototype__proto.utc                  = setOffsetToUTC;
    momentPrototype__proto.local                = setOffsetToLocal;
    momentPrototype__proto.parseZone            = setOffsetToParsedOffset;
    momentPrototype__proto.hasAlignedHourOffset = hasAlignedHourOffset;
    momentPrototype__proto.isDST                = isDaylightSavingTime;
    momentPrototype__proto.isDSTShifted         = isDaylightSavingTimeShifted;
    momentPrototype__proto.isLocal              = isLocal;
    momentPrototype__proto.isUtcOffset          = isUtcOffset;
    momentPrototype__proto.isUtc                = isUtc;
    momentPrototype__proto.isUTC                = isUtc;

    // Timezone
    momentPrototype__proto.zoneAbbr = getZoneAbbr;
    momentPrototype__proto.zoneName = getZoneName;

    // Deprecations
    momentPrototype__proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    momentPrototype__proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    momentPrototype__proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    momentPrototype__proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. https://github.com/moment/moment/issues/1779', getSetZone);

    var momentPrototype = momentPrototype__proto;

    function moment__createUnix (input) {
        return local__createLocal(input * 1000);
    }

    function moment__createInZone () {
        return local__createLocal.apply(null, arguments).parseZone();
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function locale_calendar__calendar (key, mom, now) {
        var output = this._calendar[key];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    function preParsePostFormat (string) {
        return string;
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relative__relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var prototype__proto = Locale.prototype;

    prototype__proto._calendar       = defaultCalendar;
    prototype__proto.calendar        = locale_calendar__calendar;
    prototype__proto._longDateFormat = defaultLongDateFormat;
    prototype__proto.longDateFormat  = longDateFormat;
    prototype__proto._invalidDate    = defaultInvalidDate;
    prototype__proto.invalidDate     = invalidDate;
    prototype__proto._ordinal        = defaultOrdinal;
    prototype__proto.ordinal         = ordinal;
    prototype__proto._ordinalParse   = defaultOrdinalParse;
    prototype__proto.preparse        = preParsePostFormat;
    prototype__proto.postformat      = preParsePostFormat;
    prototype__proto._relativeTime   = defaultRelativeTime;
    prototype__proto.relativeTime    = relative__relativeTime;
    prototype__proto.pastFuture      = pastFuture;
    prototype__proto.set             = locale_set__set;

    // Month
    prototype__proto.months            =        localeMonths;
    prototype__proto._months           = defaultLocaleMonths;
    prototype__proto.monthsShort       =        localeMonthsShort;
    prototype__proto._monthsShort      = defaultLocaleMonthsShort;
    prototype__proto.monthsParse       =        localeMonthsParse;
    prototype__proto._monthsRegex      = defaultMonthsRegex;
    prototype__proto.monthsRegex       = monthsRegex;
    prototype__proto._monthsShortRegex = defaultMonthsShortRegex;
    prototype__proto.monthsShortRegex  = monthsShortRegex;

    // Week
    prototype__proto.week = localeWeek;
    prototype__proto._week = defaultLocaleWeek;
    prototype__proto.firstDayOfYear = localeFirstDayOfYear;
    prototype__proto.firstDayOfWeek = localeFirstDayOfWeek;

    // Day of Week
    prototype__proto.weekdays       =        localeWeekdays;
    prototype__proto._weekdays      = defaultLocaleWeekdays;
    prototype__proto.weekdaysMin    =        localeWeekdaysMin;
    prototype__proto._weekdaysMin   = defaultLocaleWeekdaysMin;
    prototype__proto.weekdaysShort  =        localeWeekdaysShort;
    prototype__proto._weekdaysShort = defaultLocaleWeekdaysShort;
    prototype__proto.weekdaysParse  =        localeWeekdaysParse;

    prototype__proto._weekdaysRegex      = defaultWeekdaysRegex;
    prototype__proto.weekdaysRegex       =        weekdaysRegex;
    prototype__proto._weekdaysShortRegex = defaultWeekdaysShortRegex;
    prototype__proto.weekdaysShortRegex  =        weekdaysShortRegex;
    prototype__proto._weekdaysMinRegex   = defaultWeekdaysMinRegex;
    prototype__proto.weekdaysMinRegex    =        weekdaysMinRegex;

    // Hours
    prototype__proto.isPM = localeIsPM;
    prototype__proto._meridiemParse = defaultLocaleMeridiemParse;
    prototype__proto.meridiem = localeMeridiem;

    function lists__get (format, index, field, setter) {
        var locale = locale_locales__getLocale();
        var utc = create_utc__createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (typeof format === 'number') {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return lists__get(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = lists__get(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = locale_locales__getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return lists__get(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = lists__get(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function lists__listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function lists__listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function lists__listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function lists__listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function lists__listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    locale_locales__getSetGlobalLocale('en', {
        ordinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports
    utils_hooks__hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', locale_locales__getSetGlobalLocale);
    utils_hooks__hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', locale_locales__getLocale);

    var mathAbs = Math.abs;

    function duration_abs__abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function duration_add_subtract__addSubtract (duration, input, value, direction) {
        var other = create__createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function duration_add_subtract__add (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function duration_add_subtract__subtract (input, value) {
        return duration_add_subtract__addSubtract(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'year') {
            days   = this._days   + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            return units === 'month' ? months : months / 12;
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function duration_as__valueOf () {
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asYears        = makeAs('y');

    function duration_get__get (units) {
        units = normalizeUnits(units);
        return this[units + 's']();
    }

    function makeGetter(name) {
        return function () {
            return this._data[name];
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        s: 45,  // seconds to minute
        m: 45,  // minutes to hour
        h: 22,  // hours to day
        d: 26,  // days to month
        M: 11   // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function duration_humanize__relativeTime (posNegDuration, withoutSuffix, locale) {
        var duration = create__createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds < thresholds.s && ['s', seconds]  ||
                minutes <= 1           && ['m']           ||
                minutes < thresholds.m && ['mm', minutes] ||
                hours   <= 1           && ['h']           ||
                hours   < thresholds.h && ['hh', hours]   ||
                days    <= 1           && ['d']           ||
                days    < thresholds.d && ['dd', days]    ||
                months  <= 1           && ['M']           ||
                months  < thresholds.M && ['MM', months]  ||
                years   <= 1           && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set a threshold for relative time strings
    function duration_humanize__getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        return true;
    }

    function humanize (withSuffix) {
        var locale = this.localeData();
        var output = duration_humanize__relativeTime(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var iso_string__abs = Math.abs;

    function iso_string__toISOString() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        var seconds = iso_string__abs(this._milliseconds) / 1000;
        var days         = iso_string__abs(this._days);
        var months       = iso_string__abs(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds;
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        return (total < 0 ? '-' : '') +
            'P' +
            (Y ? Y + 'Y' : '') +
            (M ? M + 'M' : '') +
            (D ? D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? h + 'H' : '') +
            (m ? m + 'M' : '') +
            (s ? s + 'S' : '');
    }

    var duration_prototype__proto = Duration.prototype;

    duration_prototype__proto.abs            = duration_abs__abs;
    duration_prototype__proto.add            = duration_add_subtract__add;
    duration_prototype__proto.subtract       = duration_add_subtract__subtract;
    duration_prototype__proto.as             = as;
    duration_prototype__proto.asMilliseconds = asMilliseconds;
    duration_prototype__proto.asSeconds      = asSeconds;
    duration_prototype__proto.asMinutes      = asMinutes;
    duration_prototype__proto.asHours        = asHours;
    duration_prototype__proto.asDays         = asDays;
    duration_prototype__proto.asWeeks        = asWeeks;
    duration_prototype__proto.asMonths       = asMonths;
    duration_prototype__proto.asYears        = asYears;
    duration_prototype__proto.valueOf        = duration_as__valueOf;
    duration_prototype__proto._bubble        = bubble;
    duration_prototype__proto.get            = duration_get__get;
    duration_prototype__proto.milliseconds   = milliseconds;
    duration_prototype__proto.seconds        = seconds;
    duration_prototype__proto.minutes        = minutes;
    duration_prototype__proto.hours          = hours;
    duration_prototype__proto.days           = days;
    duration_prototype__proto.weeks          = weeks;
    duration_prototype__proto.months         = months;
    duration_prototype__proto.years          = years;
    duration_prototype__proto.humanize       = humanize;
    duration_prototype__proto.toISOString    = iso_string__toISOString;
    duration_prototype__proto.toString       = iso_string__toISOString;
    duration_prototype__proto.toJSON         = iso_string__toISOString;
    duration_prototype__proto.locale         = locale;
    duration_prototype__proto.localeData     = localeData;

    // Deprecations
    duration_prototype__proto.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', iso_string__toISOString);
    duration_prototype__proto.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    utils_hooks__hooks.version = '2.13.0';

    setHookCallback(local__createLocal);

    utils_hooks__hooks.fn                    = momentPrototype;
    utils_hooks__hooks.min                   = min;
    utils_hooks__hooks.max                   = max;
    utils_hooks__hooks.now                   = now;
    utils_hooks__hooks.utc                   = create_utc__createUTC;
    utils_hooks__hooks.unix                  = moment__createUnix;
    utils_hooks__hooks.months                = lists__listMonths;
    utils_hooks__hooks.isDate                = isDate;
    utils_hooks__hooks.locale                = locale_locales__getSetGlobalLocale;
    utils_hooks__hooks.invalid               = valid__createInvalid;
    utils_hooks__hooks.duration              = create__createDuration;
    utils_hooks__hooks.isMoment              = isMoment;
    utils_hooks__hooks.weekdays              = lists__listWeekdays;
    utils_hooks__hooks.parseZone             = moment__createInZone;
    utils_hooks__hooks.localeData            = locale_locales__getLocale;
    utils_hooks__hooks.isDuration            = isDuration;
    utils_hooks__hooks.monthsShort           = lists__listMonthsShort;
    utils_hooks__hooks.weekdaysMin           = lists__listWeekdaysMin;
    utils_hooks__hooks.defineLocale          = defineLocale;
    utils_hooks__hooks.updateLocale          = updateLocale;
    utils_hooks__hooks.locales               = locale_locales__listLocales;
    utils_hooks__hooks.weekdaysShort         = lists__listWeekdaysShort;
    utils_hooks__hooks.normalizeUnits        = normalizeUnits;
    utils_hooks__hooks.relativeTimeThreshold = duration_humanize__getSetRelativeTimeThreshold;
    utils_hooks__hooks.prototype             = momentPrototype;

    var _moment = utils_hooks__hooks;

    return _moment;

}));
//! moment.js locale configuration
//! locale : brazilian portuguese (pt-br)
//! author : Caio Ribeiro Pereira : https://github.com/caio-ribeiro-pereira

;(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined'
       && typeof require === 'function' ? factory(require('../moment')) :
   typeof define === 'function' && define.amd ? define(['moment'], factory) :
   factory(global.moment)
}(this, function (moment) { 'use strict';


    var pt_br = moment.defineLocale('pt-br', {
        months : 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
        monthsShort : 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
        weekdays : 'Domingo_Segunda-feira_Terça-feira_Quarta-feira_Quinta-feira_Sexta-feira_Sábado'.split('_'),
        weekdaysShort : 'Dom_Seg_Ter_Qua_Qui_Sex_Sáb'.split('_'),
        weekdaysMin : 'Dom_2ª_3ª_4ª_5ª_6ª_Sáb'.split('_'),
        weekdaysParseExact : true,
        longDateFormat : {
            LT : 'HH:mm',
            LTS : 'HH:mm:ss',
            L : 'DD/MM/YYYY',
            LL : 'D [de] MMMM [de] YYYY',
            LLL : 'D [de] MMMM [de] YYYY [às] HH:mm',
            LLLL : 'dddd, D [de] MMMM [de] YYYY [às] HH:mm'
        },
        calendar : {
            sameDay: '[Hoje às] LT',
            nextDay: '[Amanhã às] LT',
            nextWeek: 'dddd [às] LT',
            lastDay: '[Ontem às] LT',
            lastWeek: function () {
                return (this.day() === 0 || this.day() === 6) ?
                    '[Último] dddd [às] LT' : // Saturday + Sunday
                    '[Última] dddd [às] LT'; // Monday - Friday
            },
            sameElse: 'L'
        },
        relativeTime : {
            future : 'em %s',
            past : '%s atrás',
            s : 'poucos segundos',
            m : 'um minuto',
            mm : '%d minutos',
            h : 'uma hora',
            hh : '%d horas',
            d : 'um dia',
            dd : '%d dias',
            M : 'um mês',
            MM : '%d meses',
            y : 'um ano',
            yy : '%d anos'
        },
        ordinalParse: /\d{1,2}º/,
        ordinal : '%dº'
    });

    return pt_br;

}));
/**
 * A mixin for handling (effectively) onClickOutside for React components.
 * Note that we're not intercepting any events in this approach, and we're
 * not using double events for capturing and discarding in layers or wrappers.
 *
 * The idea is that components define function
 *
 *   handleClickOutside: function() { ... }
 *
 * If no such function is defined, an error will be thrown, as this means
 * either it still needs to be written, or the component should not be using
 * this mixing since it will not exhibit onClickOutside behaviour.
 *
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['react-dom'], function(reactDom) {
      return factory(root, reactDom);
    });
  } else if (typeof exports === 'object') {
    // Node. Note that this does not work with strict
    // CommonJS, but only CommonJS-like environments
    // that support module.exports
    module.exports = factory(root, require('react-dom'));
  } else {
    // Browser globals (root is window)
    root.OnClickOutside = factory(root, ReactDOM);
  }
}(this, function (root, ReactDOM) {
  "use strict";

  // Use a parallel array because we can't use
  // objects as keys, they get toString-coerced
  var registeredComponents = [];
  var handlers = [];

  var IGNORE_CLASS = 'ignore-react-onclickoutside';

  var isSourceFound = function(source, localNode, ignoreClass) {
    if (source === localNode) {
      return true;
    }
    // SVG <use/> elements do not technically reside in the rendered DOM, so
    // they do not have classList directly, but they offer a link to their
    // corresponding element, which can have classList. This extra check is for
    // that case.
    // See: http://www.w3.org/TR/SVG11/struct.html#InterfaceSVGUseElement
    // Discussion: https://github.com/Pomax/react-onclickoutside/pull/17
    if (source.correspondingElement) {
      return source.correspondingElement.classList.contains(ignoreClass);
    }
    return source.classList.contains(ignoreClass);
  };

  return {
    componentDidMount: function() {
      if(typeof this.handleClickOutside !== "function")
        throw new Error("Component lacks a handleClickOutside(event) function for processing outside click events.");

      var fn = this.__outsideClickHandler = (function(localNode, eventHandler, ignoreClass) {
        return function(evt) {
          evt.stopPropagation();
          var source = evt.target;
          var found = false;
          // If source=local then this event came from "somewhere"
          // inside and should be ignored. We could handle this with
          // a layered approach, too, but that requires going back to
          // thinking in terms of Dom node nesting, running counter
          // to React's "you shouldn't care about the DOM" philosophy.
          while(source.parentNode) {
            found = isSourceFound(source, localNode, ignoreClass);
            if(found) return;
            source = source.parentNode;
          }
          // If element is in detached DOM, consider it not clicked
          // outside as it can't be known whether it was outside.
          if(source !== document) return;
          eventHandler(evt);
        }
      }(ReactDOM.findDOMNode(this), this.handleClickOutside, this.props.outsideClickIgnoreClass || IGNORE_CLASS));

      var pos = registeredComponents.length;
      registeredComponents.push(this);
      handlers[pos] = fn;

      // If there is a truthy disableOnClickOutside property for this
      // component, don't immediately start listening for outside events.
      if (!this.props.disableOnClickOutside) {
        this.enableOnClickOutside();
      }
    },

    componentWillUnmount: function() {
      this.disableOnClickOutside();
      this.__outsideClickHandler = false;
      var pos = registeredComponents.indexOf(this);
      if( pos>-1) {
        if (handlers[pos]) {
          // clean up so we don't leak memory
          handlers.splice(pos, 1);
          registeredComponents.splice(pos, 1);
        }
      }
    },

    /**
     * Can be called to explicitly enable event listening
     * for clicks and touches outside of this element.
     */
    enableOnClickOutside: function() {
      var fn = this.__outsideClickHandler;
      if (document != null) {
        document.addEventListener("mousedown", fn);
        document.addEventListener("touchstart", fn);
      }
    },

    /**
     * Can be called to explicitly disable event listening
     * for clicks and touches outside of this element.
     */
    disableOnClickOutside: function() {
      var fn = this.__outsideClickHandler;
      if (document != null) {
        document.removeEventListener("mousedown", fn);
        document.removeEventListener("touchstart", fn);
      }
    }
  };

}));

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("moment"), require("react"), require("react-onclickoutside"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["moment", "react", "react-onclickoutside", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["DatePicker"] = factory(require("moment"), require("react"), require("react-onclickoutside"), require("react-dom"));
	else
		root["DatePicker"] = factory(root["moment"], root["React"], root["OnClickOutside"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_14__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _date_input = __webpack_require__(1);

	var _date_input2 = _interopRequireDefault(_date_input);

	var _calendar = __webpack_require__(5);

	var _calendar2 = _interopRequireDefault(_calendar);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _tether_component = __webpack_require__(13);

	var _tether_component2 = _interopRequireDefault(_tether_component);

	var _classnames2 = __webpack_require__(12);

	var _classnames3 = _interopRequireDefault(_classnames2);

	var _date_utils = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var outsideClickIgnoreClass = 'react-datepicker-ignore-onclickoutside';

	/**
	 * General datepicker component.
	 */

	var DatePicker = _react2.default.createClass({
	  displayName: 'DatePicker',

	  propTypes: {
	    className: _react2.default.PropTypes.string,
	    dateFormat: _react2.default.PropTypes.string,
	    dateFormatCalendar: _react2.default.PropTypes.string,
	    disabled: _react2.default.PropTypes.bool,
	    endDate: _react2.default.PropTypes.object,
	    excludeDates: _react2.default.PropTypes.array,
	    filterDate: _react2.default.PropTypes.func,
	    id: _react2.default.PropTypes.string,
	    includeDates: _react2.default.PropTypes.array,
	    isClearable: _react2.default.PropTypes.bool,
	    locale: _react2.default.PropTypes.string,
	    maxDate: _react2.default.PropTypes.object,
	    minDate: _react2.default.PropTypes.object,
	    name: _react2.default.PropTypes.string,
	    onBlur: _react2.default.PropTypes.func,
	    onChange: _react2.default.PropTypes.func.isRequired,
	    onFocus: _react2.default.PropTypes.func,
	    placeholderText: _react2.default.PropTypes.string,
	    popoverAttachment: _react2.default.PropTypes.string,
	    popoverTargetAttachment: _react2.default.PropTypes.string,
	    popoverTargetOffset: _react2.default.PropTypes.string,
	    readOnly: _react2.default.PropTypes.bool,
	    renderCalendarTo: _react2.default.PropTypes.any,
	    required: _react2.default.PropTypes.bool,
	    selected: _react2.default.PropTypes.object,
	    showYearDropdown: _react2.default.PropTypes.bool,
	    startDate: _react2.default.PropTypes.object,
	    tabIndex: _react2.default.PropTypes.number,
	    tetherConstraints: _react2.default.PropTypes.array,
	    title: _react2.default.PropTypes.string,
	    todayButton: _react2.default.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      dateFormatCalendar: 'MMMM YYYY',
	      onChange: function onChange() {},

	      disabled: false,
	      onFocus: function onFocus() {},
	      onBlur: function onBlur() {},

	      popoverAttachment: 'top left',
	      popoverTargetAttachment: 'bottom left',
	      popoverTargetOffset: '10px 0',
	      tetherConstraints: [{
	        to: 'window',
	        attachment: 'together'
	      }]
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      open: false
	    };
	  },
	  setOpen: function setOpen(open) {
	    this.setState({ open: open });
	  },
	  handleFocus: function handleFocus(event) {
	    this.props.onFocus(event);
	    this.setOpen(true);
	  },
	  handleBlur: function handleBlur(event) {
	    if (this.state.open) {
	      this.refs.input.focus();
	    } else {
	      this.props.onBlur(event);
	    }
	  },
	  handleCalendarClickOutside: function handleCalendarClickOutside(event) {
	    this.setOpen(false);
	  },
	  handleSelect: function handleSelect(date) {
	    this.setSelected(date);
	    this.setOpen(false);
	  },
	  setSelected: function setSelected(date) {
	    if (!(0, _date_utils.isSameDay)(this.props.selected, date)) {
	      this.props.onChange(date);
	    }
	  },
	  onInputClick: function onInputClick() {
	    if (!this.props.disabled) {
	      this.setOpen(true);
	    }
	  },
	  onInputKeyDown: function onInputKeyDown(event) {
	    if (event.key === 'Enter' || event.key === 'Escape') {
	      event.preventDefault();
	      this.setOpen(false);
	    } else if (event.key === 'Tab') {
	      this.setOpen(false);
	    }
	  },
	  onClearClick: function onClearClick(event) {
	    event.preventDefault();
	    this.props.onChange(null);
	  },
	  renderCalendar: function renderCalendar() {
	    if (!this.state.open || this.props.disabled) {
	      return null;
	    }
	    return _react2.default.createElement(_calendar2.default, {
	      ref: 'calendar',
	      locale: this.props.locale,
	      dateFormat: this.props.dateFormatCalendar,
	      selected: this.props.selected,
	      onSelect: this.handleSelect,
	      minDate: this.props.minDate,
	      maxDate: this.props.maxDate,
	      startDate: this.props.startDate,
	      endDate: this.props.endDate,
	      excludeDates: this.props.excludeDates,
	      filterDate: this.props.filterDate,
	      onClickOutside: this.handleCalendarClickOutside,
	      includeDates: this.props.includeDates,
	      showYearDropdown: this.props.showYearDropdown,
	      todayButton: this.props.todayButton,
	      outsideClickIgnoreClass: outsideClickIgnoreClass });
	  },
	  renderDateInput: function renderDateInput() {
	    var className = (0, _classnames3.default)(this.props.className, _defineProperty({}, outsideClickIgnoreClass, this.state.open));
	    return _react2.default.createElement(_date_input2.default, {
	      ref: 'input',
	      id: this.props.id,
	      name: this.props.name,
	      date: this.props.selected,
	      locale: this.props.locale,
	      minDate: this.props.minDate,
	      maxDate: this.props.maxDate,
	      excludeDates: this.props.excludeDates,
	      includeDates: this.props.includeDates,
	      filterDate: this.props.filterDate,
	      dateFormat: this.props.dateFormat,
	      onFocus: this.handleFocus,
	      onBlur: this.handleBlur,
	      onClick: this.onInputClick,
	      onKeyDown: this.onInputKeyDown,
	      onChangeDate: this.setSelected,
	      placeholder: this.props.placeholderText,
	      disabled: this.props.disabled,
	      className: className,
	      title: this.props.title,
	      readOnly: this.props.readOnly,
	      required: this.props.required,
	      tabIndex: this.props.tabIndex });
	  },
	  renderClearButton: function renderClearButton() {
	    if (this.props.isClearable && this.props.selected != null) {
	      return _react2.default.createElement('a', { className: 'react-datepicker__close-icon', href: '#', onClick: this.onClearClick });
	    } else {
	      return null;
	    }
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      _tether_component2.default,
	      {
	        classPrefix: "react-datepicker__tether",
	        attachment: this.props.popoverAttachment,
	        targetAttachment: this.props.popoverTargetAttachment,
	        targetOffset: this.props.popoverTargetOffset,
	        renderElementTo: this.props.renderCalendarTo,
	        constraints: this.props.tetherConstraints },
	      _react2.default.createElement(
	        'div',
	        { className: 'react-datepicker__input-container' },
	        this.renderDateInput(),
	        this.renderClearButton()
	      ),
	      this.renderCalendar()
	    );
	  }
	});

	module.exports = DatePicker;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _moment = __webpack_require__(2);

	var _moment2 = _interopRequireDefault(_moment);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _date_utils = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var DateInput = _react2.default.createClass({
	  displayName: 'DateInput',

	  propTypes: {
	    date: _react2.default.PropTypes.object,
	    dateFormat: _react2.default.PropTypes.string,
	    disabled: _react2.default.PropTypes.bool,
	    excludeDates: _react2.default.PropTypes.array,
	    filterDate: _react2.default.PropTypes.func,
	    includeDates: _react2.default.PropTypes.array,
	    locale: _react2.default.PropTypes.string,
	    maxDate: _react2.default.PropTypes.object,
	    minDate: _react2.default.PropTypes.object,
	    onBlur: _react2.default.PropTypes.func,
	    onChange: _react2.default.PropTypes.func,
	    onChangeDate: _react2.default.PropTypes.func
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      dateFormat: 'L'
	    };
	  },
	  getInitialState: function getInitialState() {
	    return {
	      value: this.safeDateFormat(this.props)
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
	    if (!(0, _date_utils.isSameDay)(newProps.date, this.props.date) || newProps.locale !== this.props.locale || newProps.dateFormat !== this.props.dateFormat) {
	      this.setState({
	        value: this.safeDateFormat(newProps)
	      });
	    }
	  },
	  handleChange: function handleChange(event) {
	    if (this.props.onChange) {
	      this.props.onChange(event);
	    }
	    if (!event.isDefaultPrevented()) {
	      this.handleChangeDate(event.target.value);
	    }
	  },
	  handleChangeDate: function handleChangeDate(value) {
	    if (this.props.onChangeDate) {
	      var date = (0, _moment2.default)(value, this.props.dateFormat, this.props.locale || _moment2.default.locale(), true);
	      if (date.isValid() && !(0, _date_utils.isDayDisabled)(date, this.props)) {
	        this.props.onChangeDate(date);
	      } else if (value === '') {
	        this.props.onChangeDate(null);
	      }
	    }
	    this.setState({ value: value });
	  },
	  safeDateFormat: function safeDateFormat(props) {
	    return props.date && props.date.clone().locale(props.locale || _moment2.default.locale()).format(props.dateFormat) || '';
	  },
	  handleBlur: function handleBlur(event) {
	    this.setState({
	      value: this.safeDateFormat(this.props)
	    });
	    if (this.props.onBlur) {
	      this.props.onBlur(event);
	    }
	  },
	  focus: function focus() {
	    this.refs.input.focus();
	  },
	  render: function render() {
	    return _react2.default.createElement('input', _extends({
	      ref: 'input',
	      type: 'text'
	    }, this.props, {
	      value: this.state.value,
	      onBlur: this.handleBlur,
	      onChange: this.handleChange }));
	  }
	});

	module.exports = DateInput;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.isSameDay = isSameDay;
	exports.isDayDisabled = isDayDisabled;
	exports.allDaysDisabledBefore = allDaysDisabledBefore;
	exports.allDaysDisabledAfter = allDaysDisabledAfter;
	exports.getEffectiveMinDate = getEffectiveMinDate;
	exports.getEffectiveMaxDate = getEffectiveMaxDate;

	var _moment = __webpack_require__(2);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function isSameDay(moment1, moment2) {
	  if (moment1 && moment2) {
	    return moment1.isSame(moment2, 'day');
	  } else {
	    return !moment1 && !moment2;
	  }
	}

	function isDayDisabled(day) {
	  var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	  var minDate = _ref.minDate;
	  var maxDate = _ref.maxDate;
	  var excludeDates = _ref.excludeDates;
	  var includeDates = _ref.includeDates;
	  var filterDate = _ref.filterDate;

	  return minDate && day.isBefore(minDate, 'day') || maxDate && day.isAfter(maxDate, 'day') || excludeDates && excludeDates.some(function (excludeDate) {
	    return isSameDay(day, excludeDate);
	  }) || includeDates && !includeDates.some(function (includeDate) {
	    return isSameDay(day, includeDate);
	  }) || filterDate && !filterDate(day.clone()) || false;
	}

	function allDaysDisabledBefore(day, unit) {
	  var _ref2 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	  var minDate = _ref2.minDate;
	  var includeDates = _ref2.includeDates;

	  var dateBefore = day.clone().subtract(1, unit);
	  return minDate && dateBefore.isBefore(minDate, unit) || includeDates && includeDates.every(function (includeDate) {
	    return dateBefore.isBefore(includeDate, unit);
	  }) || false;
	}

	function allDaysDisabledAfter(day, unit) {
	  var _ref3 = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

	  var maxDate = _ref3.maxDate;
	  var includeDates = _ref3.includeDates;

	  var dateAfter = day.clone().add(1, unit);
	  return maxDate && dateAfter.isAfter(maxDate, unit) || includeDates && includeDates.every(function (includeDate) {
	    return dateAfter.isAfter(includeDate, unit);
	  }) || false;
	}

	function getEffectiveMinDate(_ref4) {
	  var minDate = _ref4.minDate;
	  var includeDates = _ref4.includeDates;

	  if (includeDates && minDate) {
	    return _moment2.default.min(includeDates.filter(function (includeDate) {
	      return minDate.isSameOrBefore(includeDate, 'day');
	    }));
	  } else if (includeDates) {
	    return _moment2.default.min(includeDates);
	  } else {
	    return minDate;
	  }
	}

	function getEffectiveMaxDate(_ref5) {
	  var maxDate = _ref5.maxDate;
	  var includeDates = _ref5.includeDates;

	  if (includeDates && maxDate) {
	    return _moment2.default.max(includeDates.filter(function (includeDate) {
	      return maxDate.isSameOrAfter(includeDate, 'day');
	    }));
	  } else if (includeDates) {
	    return _moment2.default.max(includeDates);
	  } else {
	    return maxDate;
	  }
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _moment = __webpack_require__(2);

	var _moment2 = _interopRequireDefault(_moment);

	var _year_dropdown = __webpack_require__(6);

	var _year_dropdown2 = _interopRequireDefault(_year_dropdown);

	var _month = __webpack_require__(9);

	var _month2 = _interopRequireDefault(_month);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _date_utils = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Calendar = _react2.default.createClass({
	  displayName: 'Calendar',

	  propTypes: {
	    dateFormat: _react2.default.PropTypes.string.isRequired,
	    endDate: _react2.default.PropTypes.object,
	    excludeDates: _react2.default.PropTypes.array,
	    filterDate: _react2.default.PropTypes.func,
	    includeDates: _react2.default.PropTypes.array,
	    locale: _react2.default.PropTypes.string,
	    maxDate: _react2.default.PropTypes.object,
	    minDate: _react2.default.PropTypes.object,
	    onClickOutside: _react2.default.PropTypes.func.isRequired,
	    onSelect: _react2.default.PropTypes.func.isRequired,
	    selected: _react2.default.PropTypes.object,
	    showYearDropdown: _react2.default.PropTypes.bool,
	    startDate: _react2.default.PropTypes.object,
	    todayButton: _react2.default.PropTypes.string
	  },

	  mixins: [__webpack_require__(8)],

	  getInitialState: function getInitialState() {
	    return {
	      date: this.localizeMoment(this.getDateInView())
	    };
	  },
	  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	    if (nextProps.selected && !(0, _date_utils.isSameDay)(nextProps.selected, this.props.selected)) {
	      this.setState({
	        date: this.localizeMoment(nextProps.selected)
	      });
	    }
	  },
	  handleClickOutside: function handleClickOutside(event) {
	    this.props.onClickOutside(event);
	  },
	  getDateInView: function getDateInView() {
	    var selected = this.props.selected;

	    var minDate = (0, _date_utils.getEffectiveMinDate)(this.props);
	    var maxDate = (0, _date_utils.getEffectiveMaxDate)(this.props);
	    var current = (0, _moment2.default)();
	    if (selected) {
	      return selected;
	    } else if (minDate && minDate.isAfter(current)) {
	      return minDate;
	    } else if (maxDate && maxDate.isBefore(current)) {
	      return maxDate;
	    } else {
	      return current;
	    }
	  },
	  localizeMoment: function localizeMoment(date) {
	    return date.clone().locale(this.props.locale || _moment2.default.locale());
	  },
	  increaseMonth: function increaseMonth() {
	    this.setState({
	      date: this.state.date.clone().add(1, 'month')
	    });
	  },
	  decreaseMonth: function decreaseMonth() {
	    this.setState({
	      date: this.state.date.clone().subtract(1, 'month')
	    });
	  },
	  handleDayClick: function handleDayClick(day) {
	    this.props.onSelect(day);
	  },
	  changeYear: function changeYear(year) {
	    this.setState({
	      date: this.state.date.clone().set('year', year)
	    });
	  },
	  header: function header() {
	    var startOfWeek = this.state.date.clone().startOf('week');
	    return [0, 1, 2, 3, 4, 5, 6].map(function (offset) {
	      var day = startOfWeek.clone().add(offset, 'days');
	      return _react2.default.createElement(
	        'div',
	        { key: offset, className: 'react-datepicker__day-name' },
	        day.localeData().weekdaysMin(day)
	      );
	    });
	  },
	  renderPreviousMonthButton: function renderPreviousMonthButton() {
	    if ((0, _date_utils.allDaysDisabledBefore)(this.state.date, 'month', this.props)) {
	      return;
	    }
	    return _react2.default.createElement('a', {
	      className: 'react-datepicker__navigation react-datepicker__navigation--previous',
	      onClick: this.decreaseMonth });
	  },
	  renderNextMonthButton: function renderNextMonthButton() {
	    if ((0, _date_utils.allDaysDisabledAfter)(this.state.date, 'month', this.props)) {
	      return;
	    }
	    return _react2.default.createElement('a', {
	      className: 'react-datepicker__navigation react-datepicker__navigation--next',
	      onClick: this.increaseMonth });
	  },
	  renderCurrentMonth: function renderCurrentMonth() {
	    var classes = ['react-datepicker__current-month'];
	    if (this.props.showYearDropdown) {
	      classes.push('react-datepicker__current-month--hasYearDropdown');
	    }
	    return _react2.default.createElement(
	      'div',
	      { className: classes.join(' ') },
	      this.state.date.format(this.props.dateFormat)
	    );
	  },
	  renderYearDropdown: function renderYearDropdown() {
	    if (!this.props.showYearDropdown) {
	      return;
	    }
	    return _react2.default.createElement(_year_dropdown2.default, {
	      onChange: this.changeYear,
	      year: this.state.date.year() });
	  },
	  renderTodayButton: function renderTodayButton() {
	    var _this = this;

	    if (!this.props.todayButton) {
	      return;
	    }
	    return _react2.default.createElement(
	      'div',
	      { className: 'react-datepicker__today-button', onClick: function onClick() {
	          return _this.props.onSelect((0, _moment2.default)());
	        } },
	      this.props.todayButton
	    );
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'react-datepicker' },
	      _react2.default.createElement('div', { className: 'react-datepicker__triangle' }),
	      _react2.default.createElement(
	        'div',
	        { className: 'react-datepicker__header' },
	        this.renderPreviousMonthButton(),
	        this.renderCurrentMonth(),
	        this.renderYearDropdown(),
	        this.renderNextMonthButton(),
	        _react2.default.createElement(
	          'div',
	          null,
	          this.header()
	        )
	      ),
	      _react2.default.createElement(_month2.default, {
	        day: this.state.date,
	        onDayClick: this.handleDayClick,
	        minDate: this.props.minDate,
	        maxDate: this.props.maxDate,
	        excludeDates: this.props.excludeDates,
	        includeDates: this.props.includeDates,
	        filterDate: this.props.filterDate,
	        selected: this.props.selected,
	        startDate: this.props.startDate,
	        endDate: this.props.endDate }),
	      this.renderTodayButton()
	    );
	  }
	});

	module.exports = Calendar;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _year_dropdown_options = __webpack_require__(7);

	var _year_dropdown_options2 = _interopRequireDefault(_year_dropdown_options);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var YearDropdown = _react2.default.createClass({
	  displayName: 'YearDropdown',

	  propTypes: {
	    onChange: _react2.default.PropTypes.func.isRequired,
	    year: _react2.default.PropTypes.number.isRequired
	  },

	  getInitialState: function getInitialState() {
	    return {
	      dropdownVisible: false
	    };
	  },
	  renderReadView: function renderReadView() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'react-datepicker__year-read-view', onClick: this.toggleDropdown },
	      _react2.default.createElement(
	        'span',
	        { className: 'react-datepicker__year-read-view--selected-year' },
	        this.props.year
	      ),
	      _react2.default.createElement('span', { className: 'react-datepicker__year-read-view--down-arrow' })
	    );
	  },
	  renderDropdown: function renderDropdown() {
	    return _react2.default.createElement(_year_dropdown_options2.default, {
	      ref: 'options',
	      year: this.props.year,
	      onChange: this.onChange,
	      onCancel: this.toggleDropdown });
	  },
	  onChange: function onChange(year) {
	    this.toggleDropdown();
	    if (year === this.props.year) return;
	    this.props.onChange(year);
	  },
	  toggleDropdown: function toggleDropdown() {
	    this.setState({
	      dropdownVisible: !this.state.dropdownVisible
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      null,
	      this.state.dropdownVisible ? this.renderDropdown() : this.renderReadView()
	    );
	  }
	});

	module.exports = YearDropdown;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generateYears(year) {
	  var list = [];
	  for (var i = 0; i < 5; i++) {
	    list.push(year - i);
	  }
	  return list;
	}

	var YearDropdownOptions = _react2.default.createClass({
	  displayName: 'YearDropdownOptions',

	  propTypes: {
	    onCancel: _react2.default.PropTypes.func.isRequired,
	    onChange: _react2.default.PropTypes.func.isRequired,
	    year: _react2.default.PropTypes.number.isRequired
	  },

	  mixins: [__webpack_require__(8)],

	  getInitialState: function getInitialState() {
	    return {
	      yearsList: generateYears(this.props.year)
	    };
	  },
	  renderOptions: function renderOptions() {
	    var _this = this;

	    var selectedYear = this.props.year;
	    var options = this.state.yearsList.map(function (year) {
	      return _react2.default.createElement(
	        'div',
	        { className: 'react-datepicker__year-option',
	          key: year,
	          onClick: _this.onChange.bind(_this, year) },
	        selectedYear === year ? _react2.default.createElement(
	          'span',
	          { className: 'react-datepicker__year-option--selected' },
	          '✓'
	        ) : '',
	        year
	      );
	    });

	    options.unshift(_react2.default.createElement(
	      'div',
	      { className: 'react-datepicker__year-option',
	        ref: "upcoming",
	        key: "upcoming",
	        onClick: this.incrementYears },
	      _react2.default.createElement('a', { className: 'react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-upcoming' })
	    ));
	    options.push(_react2.default.createElement(
	      'div',
	      { className: 'react-datepicker__year-option',
	        ref: "previous",
	        key: "previous",
	        onClick: this.decrementYears },
	      _react2.default.createElement('a', { className: 'react-datepicker__navigation react-datepicker__navigation--years react-datepicker__navigation--years-previous' })
	    ));
	    return options;
	  },
	  onChange: function onChange(year) {
	    this.props.onChange(year);
	  },
	  handleClickOutside: function handleClickOutside() {
	    this.props.onCancel();
	  },
	  shiftYears: function shiftYears(amount) {
	    var years = this.state.yearsList.map(function (year) {
	      return year + amount;
	    });

	    this.setState({
	      yearsList: years
	    });
	  },
	  incrementYears: function incrementYears() {
	    return this.shiftYears(1);
	  },
	  decrementYears: function decrementYears() {
	    return this.shiftYears(-1);
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'react-datepicker__year-dropdown' },
	      this.renderOptions()
	    );
	  }
	});

	module.exports = YearDropdownOptions;

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _week = __webpack_require__(10);

	var _week2 = _interopRequireDefault(_week);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Month = _react2.default.createClass({
	  displayName: 'Month',

	  propTypes: {
	    day: _react2.default.PropTypes.object.isRequired,
	    endDate: _react2.default.PropTypes.object,
	    excludeDates: _react2.default.PropTypes.array,
	    filterDate: _react2.default.PropTypes.func,
	    includeDates: _react2.default.PropTypes.array,
	    maxDate: _react2.default.PropTypes.object,
	    minDate: _react2.default.PropTypes.object,
	    onDayClick: _react2.default.PropTypes.func,
	    selected: _react2.default.PropTypes.object,
	    startDate: _react2.default.PropTypes.object
	  },

	  handleDayClick: function handleDayClick(day) {
	    if (this.props.onDayClick) {
	      this.props.onDayClick(day);
	    }
	  },
	  isWeekInMonth: function isWeekInMonth(startOfWeek) {
	    var day = this.props.day;
	    var endOfWeek = startOfWeek.clone().add(6, 'days');
	    return startOfWeek.isSame(day, 'month') || endOfWeek.isSame(day, 'month');
	  },
	  renderWeeks: function renderWeeks() {
	    var _this = this;

	    var startOfMonth = this.props.day.clone().startOf('month').startOf('week');
	    return [0, 1, 2, 3, 4, 5].map(function (offset) {
	      return startOfMonth.clone().add(offset, 'weeks');
	    }).filter(function (startOfWeek) {
	      return _this.isWeekInMonth(startOfWeek);
	    }).map(function (startOfWeek, offset) {
	      return _react2.default.createElement(_week2.default, {
	        key: offset,
	        day: startOfWeek,
	        month: _this.props.day.month(),
	        onDayClick: _this.handleDayClick,
	        minDate: _this.props.minDate,
	        maxDate: _this.props.maxDate,
	        excludeDates: _this.props.excludeDates,
	        includeDates: _this.props.includeDates,
	        filterDate: _this.props.filterDate,
	        selected: _this.props.selected,
	        startDate: _this.props.startDate,
	        endDate: _this.props.endDate });
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'react-datepicker__month' },
	      this.renderWeeks()
	    );
	  }
	});

	module.exports = Month;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _day = __webpack_require__(11);

	var _day2 = _interopRequireDefault(_day);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Week = _react2.default.createClass({
	  displayName: 'Week',

	  propTypes: {
	    day: _react2.default.PropTypes.object.isRequired,
	    endDate: _react2.default.PropTypes.object,
	    excludeDates: _react2.default.PropTypes.array,
	    filterDate: _react2.default.PropTypes.func,
	    includeDates: _react2.default.PropTypes.array,
	    maxDate: _react2.default.PropTypes.object,
	    minDate: _react2.default.PropTypes.object,
	    month: _react2.default.PropTypes.number,
	    onDayClick: _react2.default.PropTypes.func,
	    selected: _react2.default.PropTypes.object,
	    startDate: _react2.default.PropTypes.object
	  },

	  handleDayClick: function handleDayClick(day) {
	    if (this.props.onDayClick) {
	      this.props.onDayClick(day);
	    }
	  },
	  renderDays: function renderDays() {
	    var _this = this;

	    var startOfWeek = this.props.day.clone().startOf('week');
	    return [0, 1, 2, 3, 4, 5, 6].map(function (offset) {
	      var day = startOfWeek.clone().add(offset, 'days');
	      return _react2.default.createElement(_day2.default, {
	        key: offset,
	        day: day,
	        month: _this.props.month,
	        onClick: _this.handleDayClick.bind(_this, day),
	        minDate: _this.props.minDate,
	        maxDate: _this.props.maxDate,
	        excludeDates: _this.props.excludeDates,
	        includeDates: _this.props.includeDates,
	        filterDate: _this.props.filterDate,
	        selected: _this.props.selected,
	        startDate: _this.props.startDate,
	        endDate: _this.props.endDate });
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'react-datepicker__week' },
	      this.renderDays()
	    );
	  }
	});

	module.exports = Week;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _moment = __webpack_require__(2);

	var _moment2 = _interopRequireDefault(_moment);

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(12);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _date_utils = __webpack_require__(4);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Day = _react2.default.createClass({
	  displayName: 'Day',

	  propTypes: {
	    day: _react2.default.PropTypes.object.isRequired,
	    endDate: _react2.default.PropTypes.object,
	    excludeDates: _react2.default.PropTypes.array,
	    filterDate: _react2.default.PropTypes.func,
	    includeDates: _react2.default.PropTypes.array,
	    maxDate: _react2.default.PropTypes.object,
	    minDate: _react2.default.PropTypes.object,
	    month: _react2.default.PropTypes.number,
	    onClick: _react2.default.PropTypes.func,
	    selected: _react2.default.PropTypes.object,
	    startDate: _react2.default.PropTypes.object
	  },

	  handleClick: function handleClick(event) {
	    if (!this.isDisabled() && this.props.onClick) {
	      this.props.onClick(event);
	    }
	  },
	  isSameDay: function isSameDay(other) {
	    return (0, _date_utils.isSameDay)(this.props.day, other);
	  },
	  isDisabled: function isDisabled() {
	    return (0, _date_utils.isDayDisabled)(this.props.day, this.props);
	  },
	  isInRange: function isInRange() {
	    var _props = this.props;
	    var day = _props.day;
	    var startDate = _props.startDate;
	    var endDate = _props.endDate;

	    if (!startDate || !endDate) return false;

	    var before = startDate.clone().startOf('day').subtract(1, 'seconds');
	    var after = endDate.clone().startOf('day').add(1, 'seconds');
	    return day.clone().startOf('day').isBetween(before, after);
	  },
	  isWeekend: function isWeekend() {
	    var weekday = this.props.day.day();
	    return weekday === 0 || weekday === 6;
	  },
	  isOutsideMonth: function isOutsideMonth() {
	    return this.props.month !== undefined && this.props.month !== this.props.day.month();
	  },
	  getClassNames: function getClassNames() {
	    return (0, _classnames2.default)('react-datepicker__day', {
	      'react-datepicker__day--disabled': this.isDisabled(),
	      'react-datepicker__day--selected': this.isSameDay(this.props.selected),
	      'react-datepicker__day--in-range': this.isInRange(),
	      'react-datepicker__day--today': this.isSameDay((0, _moment2.default)()),
	      'react-datepicker__day--weekend': this.isWeekend(),
	      'react-datepicker__day--outside-month': this.isOutsideMonth()
	    });
	  },
	  render: function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: this.getClassNames(), onClick: this.handleClick },
	      this.props.day.date()
	    );
	  }
	});

	module.exports = Day;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _react = __webpack_require__(3);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(14);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _tether = __webpack_require__(15);

	var _tether2 = _interopRequireDefault(_tether);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function childrenPropType(_ref, propName, componentName) {
	  var children = _ref.children;

	  var childCount = _react.Children.count(children);
	  if (childCount <= 0) {
	    return new Error(componentName + ' expects at least one child to use as the target element.');
	  } else if (childCount > 2) {
	    return new Error('Only a max of two children allowed in ' + componentName + '.');
	  }
	}

	var attachmentPositions = ['top left', 'top center', 'top right', 'middle left', 'middle center', 'middle right', 'bottom left', 'bottom center', 'bottom right'];

	var TetherComponent = _react2.default.createClass({
	  displayName: 'TetherComponent',

	  propTypes: {
	    attachment: _react.PropTypes.oneOf(attachmentPositions).isRequired,
	    children: childrenPropType,
	    className: _react.PropTypes.string,
	    classPrefix: _react.PropTypes.string,
	    classes: _react.PropTypes.object,
	    constraints: _react.PropTypes.array,
	    enabled: _react.PropTypes.bool,
	    id: _react.PropTypes.string,
	    offset: _react.PropTypes.string,
	    optimizations: _react.PropTypes.object,
	    renderElementTag: _react.PropTypes.string,
	    renderElementTo: _react.PropTypes.any,
	    style: _react.PropTypes.object,
	    targetAttachment: _react.PropTypes.oneOf(attachmentPositions),
	    targetModifier: _react.PropTypes.string,
	    targetOffset: _react.PropTypes.string
	  },

	  getDefaultProps: function getDefaultProps() {
	    return {
	      renderElementTag: 'div',
	      renderElementTo: null
	    };
	  },
	  componentDidMount: function componentDidMount() {
	    this._targetNode = _reactDom2.default.findDOMNode(this);
	    this._update();
	  },
	  componentDidUpdate: function componentDidUpdate() {
	    this._update();
	  },
	  componentWillUnmount: function componentWillUnmount() {
	    this._destroy();
	  },
	  disable: function disable() {
	    this._tether.disable();
	  },
	  enable: function enable() {
	    this._tether.enable();
	  },
	  position: function position() {
	    this._tether.position();
	  },
	  _destroy: function _destroy() {
	    if (this._elementParentNode) {
	      _reactDom2.default.unmountComponentAtNode(this._elementParentNode);
	      this._elementParentNode.parentNode.removeChild(this._elementParentNode);
	    }

	    if (this._tether) {
	      this._tether.destroy();
	    }

	    this._elementParentNode = null;
	    this._tether = null;
	  },
	  _update: function _update() {
	    var _this = this;

	    var _props = this.props;
	    var children = _props.children;
	    var renderElementTag = _props.renderElementTag;
	    var renderElementTo = _props.renderElementTo;

	    var elementComponent = children[1];

	    // if no element component provided, bail out
	    if (!elementComponent) {
	      // destroy Tether elements if they have been created
	      if (this._tether) {
	        this._destroy();
	      }
	      return;
	    }

	    // create element node container if it hasn't been yet
	    if (!this._elementParentNode) {
	      // create a node that we can stick our content Component in
	      this._elementParentNode = document.createElement(renderElementTag);

	      // append node to the end of the body
	      var renderTo = renderElementTo || document.body;
	      renderTo.appendChild(this._elementParentNode);
	    }

	    // render element component into the DOM
	    _reactDom2.default.unstable_renderSubtreeIntoContainer(this, elementComponent, this._elementParentNode, function () {
	      // don't update Tether until the subtree has finished rendering
	      _this._updateTether();
	    });
	  },
	  _updateTether: function _updateTether() {
	    var _props2 = this.props;
	    var renderElementTag = _props2.renderElementTag;
	    var renderElementTo = _props2.renderElementTo;

	    var options = _objectWithoutProperties(_props2, ['renderElementTag', 'renderElementTo']); // eslint-disable-line no-unused-vars


	    var tetherOptions = _extends({
	      target: this._targetNode,
	      element: this._elementParentNode
	    }, options);

	    if (!this._tether) {
	      this._tether = new _tether2.default(tetherOptions);
	    } else {
	      this._tether.setOptions(tetherOptions);
	    }

	    this._tether.position();
	  },
	  render: function render() {
	    var children = this.props.children;

	    var firstChild = null;

	    // we use forEach because the second child could be null
	    // causing children to not be an array
	    _react.Children.forEach(children, function (child, index) {
	      if (index === 0) {
	        firstChild = child;
	        return;
	      }
	    });

	    return firstChild;
	  }
	});

	module.exports = TetherComponent;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! tether 1.3.1 */

	(function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory(require, exports, module);
	  } else {
	    root.Tether = factory();
	  }
	}(this, function(require, exports, module) {

	'use strict';

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var TetherBase = undefined;
	if (typeof TetherBase === 'undefined') {
	  TetherBase = { modules: [] };
	}

	var zeroElement = null;

	function getScrollParents(el) {
	  // In firefox if the el is inside an iframe with display: none; window.getComputedStyle() will return null;
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
	  var computedStyle = getComputedStyle(el) || {};
	  var position = computedStyle.position;
	  var parents = [];

	  if (position === 'fixed') {
	    return [el];
	  }

	  var parent = el;
	  while ((parent = parent.parentNode) && parent && parent.nodeType === 1) {
	    var style = undefined;
	    try {
	      style = getComputedStyle(parent);
	    } catch (err) {}

	    if (typeof style === 'undefined' || style === null) {
	      parents.push(parent);
	      return parents;
	    }

	    var _style = style;
	    var overflow = _style.overflow;
	    var overflowX = _style.overflowX;
	    var overflowY = _style.overflowY;

	    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
	      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
	        parents.push(parent);
	      }
	    }
	  }

	  parents.push(document.body);
	  return parents;
	}

	var uniqueId = (function () {
	  var id = 0;
	  return function () {
	    return ++id;
	  };
	})();

	var zeroPosCache = {};
	var getOrigin = function getOrigin() {
	  // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
	  // jitter as the user scrolls that messes with our ability to detect if two positions
	  // are equivilant or not.  We place an element at the top left of the page that will
	  // get the same jitter, so we can cancel the two out.
	  var node = zeroElement;
	  if (!node) {
	    node = document.createElement('div');
	    node.setAttribute('data-tether-id', uniqueId());
	    extend(node.style, {
	      top: 0,
	      left: 0,
	      position: 'absolute'
	    });

	    document.body.appendChild(node);

	    zeroElement = node;
	  }

	  var id = node.getAttribute('data-tether-id');
	  if (typeof zeroPosCache[id] === 'undefined') {
	    zeroPosCache[id] = {};

	    var rect = node.getBoundingClientRect();
	    for (var k in rect) {
	      // Can't use extend, as on IE9, elements don't resolve to be hasOwnProperty
	      zeroPosCache[id][k] = rect[k];
	    }

	    // Clear the cache when this position call is done
	    defer(function () {
	      delete zeroPosCache[id];
	    });
	  }

	  return zeroPosCache[id];
	};

	function removeUtilElements() {
	  if (zeroElement) {
	    document.body.removeChild(zeroElement);
	  }
	  zeroElement = null;
	};

	function getBounds(el) {
	  var doc = undefined;
	  if (el === document) {
	    doc = document;
	    el = document.documentElement;
	  } else {
	    doc = el.ownerDocument;
	  }

	  var docEl = doc.documentElement;

	  var box = {};
	  // The original object returned by getBoundingClientRect is immutable, so we clone it
	  // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
	  var rect = el.getBoundingClientRect();
	  for (var k in rect) {
	    box[k] = rect[k];
	  }

	  var origin = getOrigin();

	  box.top -= origin.top;
	  box.left -= origin.left;

	  if (typeof box.width === 'undefined') {
	    box.width = document.body.scrollWidth - box.left - box.right;
	  }
	  if (typeof box.height === 'undefined') {
	    box.height = document.body.scrollHeight - box.top - box.bottom;
	  }

	  box.top = box.top - docEl.clientTop;
	  box.left = box.left - docEl.clientLeft;
	  box.right = doc.body.clientWidth - box.width - box.left;
	  box.bottom = doc.body.clientHeight - box.height - box.top;

	  return box;
	}

	function getOffsetParent(el) {
	  return el.offsetParent || document.documentElement;
	}

	function getScrollBarSize() {
	  var inner = document.createElement('div');
	  inner.style.width = '100%';
	  inner.style.height = '200px';

	  var outer = document.createElement('div');
	  extend(outer.style, {
	    position: 'absolute',
	    top: 0,
	    left: 0,
	    pointerEvents: 'none',
	    visibility: 'hidden',
	    width: '200px',
	    height: '150px',
	    overflow: 'hidden'
	  });

	  outer.appendChild(inner);

	  document.body.appendChild(outer);

	  var widthContained = inner.offsetWidth;
	  outer.style.overflow = 'scroll';
	  var widthScroll = inner.offsetWidth;

	  if (widthContained === widthScroll) {
	    widthScroll = outer.clientWidth;
	  }

	  document.body.removeChild(outer);

	  var width = widthContained - widthScroll;

	  return { width: width, height: width };
	}

	function extend() {
	  var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  var args = [];

	  Array.prototype.push.apply(args, arguments);

	  args.slice(1).forEach(function (obj) {
	    if (obj) {
	      for (var key in obj) {
	        if (({}).hasOwnProperty.call(obj, key)) {
	          out[key] = obj[key];
	        }
	      }
	    }
	  });

	  return out;
	}

	function removeClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    name.split(' ').forEach(function (cls) {
	      if (cls.trim()) {
	        el.classList.remove(cls);
	      }
	    });
	  } else {
	    var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
	    var className = getClassName(el).replace(regex, ' ');
	    setClassName(el, className);
	  }
	}

	function addClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    name.split(' ').forEach(function (cls) {
	      if (cls.trim()) {
	        el.classList.add(cls);
	      }
	    });
	  } else {
	    removeClass(el, name);
	    var cls = getClassName(el) + (' ' + name);
	    setClassName(el, cls);
	  }
	}

	function hasClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    return el.classList.contains(name);
	  }
	  var className = getClassName(el);
	  return new RegExp('(^| )' + name + '( |$)', 'gi').test(className);
	}

	function getClassName(el) {
	  if (el.className instanceof SVGAnimatedString) {
	    return el.className.baseVal;
	  }
	  return el.className;
	}

	function setClassName(el, className) {
	  el.setAttribute('class', className);
	}

	function updateClasses(el, add, all) {
	  // Of the set of 'all' classes, we need the 'add' classes, and only the
	  // 'add' classes to be set.
	  all.forEach(function (cls) {
	    if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
	      removeClass(el, cls);
	    }
	  });

	  add.forEach(function (cls) {
	    if (!hasClass(el, cls)) {
	      addClass(el, cls);
	    }
	  });
	}

	var deferred = [];

	var defer = function defer(fn) {
	  deferred.push(fn);
	};

	var flush = function flush() {
	  var fn = undefined;
	  while (fn = deferred.pop()) {
	    fn();
	  }
	};

	var Evented = (function () {
	  function Evented() {
	    _classCallCheck(this, Evented);
	  }

	  _createClass(Evented, [{
	    key: 'on',
	    value: function on(event, handler, ctx) {
	      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	      if (typeof this.bindings === 'undefined') {
	        this.bindings = {};
	      }
	      if (typeof this.bindings[event] === 'undefined') {
	        this.bindings[event] = [];
	      }
	      this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
	    }
	  }, {
	    key: 'once',
	    value: function once(event, handler, ctx) {
	      this.on(event, handler, ctx, true);
	    }
	  }, {
	    key: 'off',
	    value: function off(event, handler) {
	      if (typeof this.bindings !== 'undefined' && typeof this.bindings[event] !== 'undefined') {
	        return;
	      }

	      if (typeof handler === 'undefined') {
	        delete this.bindings[event];
	      } else {
	        var i = 0;
	        while (i < this.bindings[event].length) {
	          if (this.bindings[event][i].handler === handler) {
	            this.bindings[event].splice(i, 1);
	          } else {
	            ++i;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'trigger',
	    value: function trigger(event) {
	      if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
	        var i = 0;

	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }

	        while (i < this.bindings[event].length) {
	          var _bindings$event$i = this.bindings[event][i];
	          var handler = _bindings$event$i.handler;
	          var ctx = _bindings$event$i.ctx;
	          var once = _bindings$event$i.once;

	          var context = ctx;
	          if (typeof context === 'undefined') {
	            context = this;
	          }

	          handler.apply(context, args);

	          if (once) {
	            this.bindings[event].splice(i, 1);
	          } else {
	            ++i;
	          }
	        }
	      }
	    }
	  }]);

	  return Evented;
	})();

	TetherBase.Utils = {
	  getScrollParents: getScrollParents,
	  getBounds: getBounds,
	  getOffsetParent: getOffsetParent,
	  extend: extend,
	  addClass: addClass,
	  removeClass: removeClass,
	  hasClass: hasClass,
	  updateClasses: updateClasses,
	  defer: defer,
	  flush: flush,
	  uniqueId: uniqueId,
	  Evented: Evented,
	  getScrollBarSize: getScrollBarSize,
	  removeUtilElements: removeUtilElements
	};
	/* globals TetherBase, performance */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	if (typeof TetherBase === 'undefined') {
	  throw new Error('You must include the utils.js file before tether.js');
	}

	var _TetherBase$Utils = TetherBase.Utils;
	var getScrollParents = _TetherBase$Utils.getScrollParents;
	var getBounds = _TetherBase$Utils.getBounds;
	var getOffsetParent = _TetherBase$Utils.getOffsetParent;
	var extend = _TetherBase$Utils.extend;
	var addClass = _TetherBase$Utils.addClass;
	var removeClass = _TetherBase$Utils.removeClass;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;
	var flush = _TetherBase$Utils.flush;
	var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;
	var removeUtilElements = _TetherBase$Utils.removeUtilElements;

	function within(a, b) {
	  var diff = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];

	  return a + diff >= b && b >= a - diff;
	}

	var transformKey = (function () {
	  if (typeof document === 'undefined') {
	    return '';
	  }
	  var el = document.createElement('div');

	  var transforms = ['transform', 'webkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
	  for (var i = 0; i < transforms.length; ++i) {
	    var key = transforms[i];
	    if (el.style[key] !== undefined) {
	      return key;
	    }
	  }
	})();

	var tethers = [];

	var position = function position() {
	  tethers.forEach(function (tether) {
	    tether.position(false);
	  });
	  flush();
	};

	function now() {
	  if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
	    return performance.now();
	  }
	  return +new Date();
	}

	(function () {
	  var lastCall = null;
	  var lastDuration = null;
	  var pendingTimeout = null;

	  var tick = function tick() {
	    if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
	      // We voluntarily throttle ourselves if we can't manage 60fps
	      lastDuration = Math.min(lastDuration - 16, 250);

	      // Just in case this is the last event, remember to position just once more
	      pendingTimeout = setTimeout(tick, 250);
	      return;
	    }

	    if (typeof lastCall !== 'undefined' && now() - lastCall < 10) {
	      // Some browsers call events a little too frequently, refuse to run more than is reasonable
	      return;
	    }

	    if (pendingTimeout != null) {
	      clearTimeout(pendingTimeout);
	      pendingTimeout = null;
	    }

	    lastCall = now();
	    position();
	    lastDuration = now() - lastCall;
	  };

	  if (typeof window !== 'undefined' && typeof window.addEventListener !== 'undefined') {
	    ['resize', 'scroll', 'touchmove'].forEach(function (event) {
	      window.addEventListener(event, tick);
	    });
	  }
	})();

	var MIRROR_LR = {
	  center: 'center',
	  left: 'right',
	  right: 'left'
	};

	var MIRROR_TB = {
	  middle: 'middle',
	  top: 'bottom',
	  bottom: 'top'
	};

	var OFFSET_MAP = {
	  top: 0,
	  left: 0,
	  middle: '50%',
	  center: '50%',
	  bottom: '100%',
	  right: '100%'
	};

	var autoToFixedAttachment = function autoToFixedAttachment(attachment, relativeToAttachment) {
	  var left = attachment.left;
	  var top = attachment.top;

	  if (left === 'auto') {
	    left = MIRROR_LR[relativeToAttachment.left];
	  }

	  if (top === 'auto') {
	    top = MIRROR_TB[relativeToAttachment.top];
	  }

	  return { left: left, top: top };
	};

	var attachmentToOffset = function attachmentToOffset(attachment) {
	  var left = attachment.left;
	  var top = attachment.top;

	  if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
	    left = OFFSET_MAP[attachment.left];
	  }

	  if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
	    top = OFFSET_MAP[attachment.top];
	  }

	  return { left: left, top: top };
	};

	function addOffset() {
	  var out = { top: 0, left: 0 };

	  for (var _len = arguments.length, offsets = Array(_len), _key = 0; _key < _len; _key++) {
	    offsets[_key] = arguments[_key];
	  }

	  offsets.forEach(function (_ref) {
	    var top = _ref.top;
	    var left = _ref.left;

	    if (typeof top === 'string') {
	      top = parseFloat(top, 10);
	    }
	    if (typeof left === 'string') {
	      left = parseFloat(left, 10);
	    }

	    out.top += top;
	    out.left += left;
	  });

	  return out;
	}

	function offsetToPx(offset, size) {
	  if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
	    offset.left = parseFloat(offset.left, 10) / 100 * size.width;
	  }
	  if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
	    offset.top = parseFloat(offset.top, 10) / 100 * size.height;
	  }

	  return offset;
	}

	var parseOffset = function parseOffset(value) {
	  var _value$split = value.split(' ');

	  var _value$split2 = _slicedToArray(_value$split, 2);

	  var top = _value$split2[0];
	  var left = _value$split2[1];

	  return { top: top, left: left };
	};
	var parseAttachment = parseOffset;

	var TetherClass = (function (_Evented) {
	  _inherits(TetherClass, _Evented);

	  function TetherClass(options) {
	    var _this = this;

	    _classCallCheck(this, TetherClass);

	    _get(Object.getPrototypeOf(TetherClass.prototype), 'constructor', this).call(this);
	    this.position = this.position.bind(this);

	    tethers.push(this);

	    this.history = [];

	    this.setOptions(options, false);

	    TetherBase.modules.forEach(function (module) {
	      if (typeof module.initialize !== 'undefined') {
	        module.initialize.call(_this);
	      }
	    });

	    this.position();
	  }

	  _createClass(TetherClass, [{
	    key: 'getClass',
	    value: function getClass() {
	      var key = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	      var classes = this.options.classes;

	      if (typeof classes !== 'undefined' && classes[key]) {
	        return this.options.classes[key];
	      } else if (this.options.classPrefix) {
	        return this.options.classPrefix + '-' + key;
	      } else {
	        return key;
	      }
	    }
	  }, {
	    key: 'setOptions',
	    value: function setOptions(options) {
	      var _this2 = this;

	      var pos = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	      var defaults = {
	        offset: '0 0',
	        targetOffset: '0 0',
	        targetAttachment: 'auto auto',
	        classPrefix: 'tether'
	      };

	      this.options = extend(defaults, options);

	      var _options = this.options;
	      var element = _options.element;
	      var target = _options.target;
	      var targetModifier = _options.targetModifier;

	      this.element = element;
	      this.target = target;
	      this.targetModifier = targetModifier;

	      if (this.target === 'viewport') {
	        this.target = document.body;
	        this.targetModifier = 'visible';
	      } else if (this.target === 'scroll-handle') {
	        this.target = document.body;
	        this.targetModifier = 'scroll-handle';
	      }

	      ['element', 'target'].forEach(function (key) {
	        if (typeof _this2[key] === 'undefined') {
	          throw new Error('Tether Error: Both element and target must be defined');
	        }

	        if (typeof _this2[key].jquery !== 'undefined') {
	          _this2[key] = _this2[key][0];
	        } else if (typeof _this2[key] === 'string') {
	          _this2[key] = document.querySelector(_this2[key]);
	        }
	      });

	      addClass(this.element, this.getClass('element'));
	      if (!(this.options.addTargetClasses === false)) {
	        addClass(this.target, this.getClass('target'));
	      }

	      if (!this.options.attachment) {
	        throw new Error('Tether Error: You must provide an attachment');
	      }

	      this.targetAttachment = parseAttachment(this.options.targetAttachment);
	      this.attachment = parseAttachment(this.options.attachment);
	      this.offset = parseOffset(this.options.offset);
	      this.targetOffset = parseOffset(this.options.targetOffset);

	      if (typeof this.scrollParents !== 'undefined') {
	        this.disable();
	      }

	      if (this.targetModifier === 'scroll-handle') {
	        this.scrollParents = [this.target];
	      } else {
	        this.scrollParents = getScrollParents(this.target);
	      }

	      if (!(this.options.enabled === false)) {
	        this.enable(pos);
	      }
	    }
	  }, {
	    key: 'getTargetBounds',
	    value: function getTargetBounds() {
	      if (typeof this.targetModifier !== 'undefined') {
	        if (this.targetModifier === 'visible') {
	          if (this.target === document.body) {
	            return { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth };
	          } else {
	            var bounds = getBounds(this.target);

	            var out = {
	              height: bounds.height,
	              width: bounds.width,
	              top: bounds.top,
	              left: bounds.left
	            };

	            out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
	            out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
	            out.height = Math.min(innerHeight, out.height);
	            out.height -= 2;

	            out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
	            out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
	            out.width = Math.min(innerWidth, out.width);
	            out.width -= 2;

	            if (out.top < pageYOffset) {
	              out.top = pageYOffset;
	            }
	            if (out.left < pageXOffset) {
	              out.left = pageXOffset;
	            }

	            return out;
	          }
	        } else if (this.targetModifier === 'scroll-handle') {
	          var bounds = undefined;
	          var target = this.target;
	          if (target === document.body) {
	            target = document.documentElement;

	            bounds = {
	              left: pageXOffset,
	              top: pageYOffset,
	              height: innerHeight,
	              width: innerWidth
	            };
	          } else {
	            bounds = getBounds(target);
	          }

	          var style = getComputedStyle(target);

	          var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || this.target !== document.body;

	          var scrollBottom = 0;
	          if (hasBottomScroll) {
	            scrollBottom = 15;
	          }

	          var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;

	          var out = {
	            width: 15,
	            height: height * 0.975 * (height / target.scrollHeight),
	            left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
	          };

	          var fitAdj = 0;
	          if (height < 408 && this.target === document.body) {
	            fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
	          }

	          if (this.target !== document.body) {
	            out.height = Math.max(out.height, 24);
	          }

	          var scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
	          out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);

	          if (this.target === document.body) {
	            out.height = Math.max(out.height, 24);
	          }

	          return out;
	        }
	      } else {
	        return getBounds(this.target);
	      }
	    }
	  }, {
	    key: 'clearCache',
	    value: function clearCache() {
	      this._cache = {};
	    }
	  }, {
	    key: 'cache',
	    value: function cache(k, getter) {
	      // More than one module will often need the same DOM info, so
	      // we keep a cache which is cleared on each position call
	      if (typeof this._cache === 'undefined') {
	        this._cache = {};
	      }

	      if (typeof this._cache[k] === 'undefined') {
	        this._cache[k] = getter.call(this);
	      }

	      return this._cache[k];
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      var _this3 = this;

	      var pos = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      if (!(this.options.addTargetClasses === false)) {
	        addClass(this.target, this.getClass('enabled'));
	      }
	      addClass(this.element, this.getClass('enabled'));
	      this.enabled = true;

	      this.scrollParents.forEach(function (parent) {
	        if (parent !== document) {
	          parent.addEventListener('scroll', _this3.position);
	        }
	      });

	      if (pos) {
	        this.position();
	      }
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      var _this4 = this;

	      removeClass(this.target, this.getClass('enabled'));
	      removeClass(this.element, this.getClass('enabled'));
	      this.enabled = false;

	      if (typeof this.scrollParents !== 'undefined') {
	        this.scrollParents.forEach(function (parent) {
	          parent.removeEventListener('scroll', _this4.position);
	        });
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this5 = this;

	      this.disable();

	      tethers.forEach(function (tether, i) {
	        if (tether === _this5) {
	          tethers.splice(i, 1);
	        }
	      });

	      // Remove any elements we were using for convenience from the DOM
	      if (tethers.length === 0) {
	        removeUtilElements();
	      }
	    }
	  }, {
	    key: 'updateAttachClasses',
	    value: function updateAttachClasses(elementAttach, targetAttach) {
	      var _this6 = this;

	      elementAttach = elementAttach || this.attachment;
	      targetAttach = targetAttach || this.targetAttachment;
	      var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];

	      if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
	        // updateAttachClasses can be called more than once in a position call, so
	        // we need to clean up after ourselves such that when the last defer gets
	        // ran it doesn't add any extra classes from previous calls.
	        this._addAttachClasses.splice(0, this._addAttachClasses.length);
	      }

	      if (typeof this._addAttachClasses === 'undefined') {
	        this._addAttachClasses = [];
	      }
	      var add = this._addAttachClasses;

	      if (elementAttach.top) {
	        add.push(this.getClass('element-attached') + '-' + elementAttach.top);
	      }
	      if (elementAttach.left) {
	        add.push(this.getClass('element-attached') + '-' + elementAttach.left);
	      }
	      if (targetAttach.top) {
	        add.push(this.getClass('target-attached') + '-' + targetAttach.top);
	      }
	      if (targetAttach.left) {
	        add.push(this.getClass('target-attached') + '-' + targetAttach.left);
	      }

	      var all = [];
	      sides.forEach(function (side) {
	        all.push(_this6.getClass('element-attached') + '-' + side);
	        all.push(_this6.getClass('target-attached') + '-' + side);
	      });

	      defer(function () {
	        if (!(typeof _this6._addAttachClasses !== 'undefined')) {
	          return;
	        }

	        updateClasses(_this6.element, _this6._addAttachClasses, all);
	        if (!(_this6.options.addTargetClasses === false)) {
	          updateClasses(_this6.target, _this6._addAttachClasses, all);
	        }

	        delete _this6._addAttachClasses;
	      });
	    }
	  }, {
	    key: 'position',
	    value: function position() {
	      var _this7 = this;

	      var flushChanges = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];

	      // flushChanges commits the changes immediately, leave true unless you are positioning multiple
	      // tethers (in which case call Tether.Utils.flush yourself when you're done)

	      if (!this.enabled) {
	        return;
	      }

	      this.clearCache();

	      // Turn 'auto' attachments into the appropriate corner or edge
	      var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);

	      this.updateAttachClasses(this.attachment, targetAttachment);

	      var elementPos = this.cache('element-bounds', function () {
	        return getBounds(_this7.element);
	      });

	      var width = elementPos.width;
	      var height = elementPos.height;

	      if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
	        var _lastSize = this.lastSize;

	        // We cache the height and width to make it possible to position elements that are
	        // getting hidden.
	        width = _lastSize.width;
	        height = _lastSize.height;
	      } else {
	        this.lastSize = { width: width, height: height };
	      }

	      var targetPos = this.cache('target-bounds', function () {
	        return _this7.getTargetBounds();
	      });
	      var targetSize = targetPos;

	      // Get an actual px offset from the attachment
	      var offset = offsetToPx(attachmentToOffset(this.attachment), { width: width, height: height });
	      var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);

	      var manualOffset = offsetToPx(this.offset, { width: width, height: height });
	      var manualTargetOffset = offsetToPx(this.targetOffset, targetSize);

	      // Add the manually provided offset
	      offset = addOffset(offset, manualOffset);
	      targetOffset = addOffset(targetOffset, manualTargetOffset);

	      // It's now our goal to make (element position + offset) == (target position + target offset)
	      var left = targetPos.left + targetOffset.left - offset.left;
	      var top = targetPos.top + targetOffset.top - offset.top;

	      for (var i = 0; i < TetherBase.modules.length; ++i) {
	        var _module2 = TetherBase.modules[i];
	        var ret = _module2.position.call(this, {
	          left: left,
	          top: top,
	          targetAttachment: targetAttachment,
	          targetPos: targetPos,
	          elementPos: elementPos,
	          offset: offset,
	          targetOffset: targetOffset,
	          manualOffset: manualOffset,
	          manualTargetOffset: manualTargetOffset,
	          scrollbarSize: scrollbarSize,
	          attachment: this.attachment
	        });

	        if (ret === false) {
	          return false;
	        } else if (typeof ret === 'undefined' || typeof ret !== 'object') {
	          continue;
	        } else {
	          top = ret.top;
	          left = ret.left;
	        }
	      }

	      // We describe the position three different ways to give the optimizer
	      // a chance to decide the best possible way to position the element
	      // with the fewest repaints.
	      var next = {
	        // It's position relative to the page (absolute positioning when
	        // the element is a child of the body)
	        page: {
	          top: top,
	          left: left
	        },

	        // It's position relative to the viewport (fixed positioning)
	        viewport: {
	          top: top - pageYOffset,
	          bottom: pageYOffset - top - height + innerHeight,
	          left: left - pageXOffset,
	          right: pageXOffset - left - width + innerWidth
	        }
	      };

	      var scrollbarSize = undefined;
	      if (document.body.scrollWidth > window.innerWidth) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.bottom -= scrollbarSize.height;
	      }

	      if (document.body.scrollHeight > window.innerHeight) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.right -= scrollbarSize.width;
	      }

	      if (['', 'static'].indexOf(document.body.style.position) === -1 || ['', 'static'].indexOf(document.body.parentElement.style.position) === -1) {
	        // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
	        next.page.bottom = document.body.scrollHeight - top - height;
	        next.page.right = document.body.scrollWidth - left - width;
	      }

	      if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
	        (function () {
	          var offsetParent = _this7.cache('target-offsetparent', function () {
	            return getOffsetParent(_this7.target);
	          });
	          var offsetPosition = _this7.cache('target-offsetparent-bounds', function () {
	            return getBounds(offsetParent);
	          });
	          var offsetParentStyle = getComputedStyle(offsetParent);
	          var offsetParentSize = offsetPosition;

	          var offsetBorder = {};
	          ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
	            offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
	          });

	          offsetPosition.right = document.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
	          offsetPosition.bottom = document.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;

	          if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
	            if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
	              // We're within the visible part of the target's scroll parent
	              var scrollTop = offsetParent.scrollTop;
	              var scrollLeft = offsetParent.scrollLeft;

	              // It's position relative to the target's offset parent (absolute positioning when
	              // the element is moved to be a child of the target's offset parent).
	              next.offset = {
	                top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
	                left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
	              };
	            }
	          }
	        })();
	      }

	      // We could also travel up the DOM and try each containing context, rather than only
	      // looking at the body, but we're gonna get diminishing returns.

	      this.move(next);

	      this.history.unshift(next);

	      if (this.history.length > 3) {
	        this.history.pop();
	      }

	      if (flushChanges) {
	        flush();
	      }

	      return true;
	    }

	    // THE ISSUE
	  }, {
	    key: 'move',
	    value: function move(pos) {
	      var _this8 = this;

	      if (!(typeof this.element.parentNode !== 'undefined')) {
	        return;
	      }

	      var same = {};

	      for (var type in pos) {
	        same[type] = {};

	        for (var key in pos[type]) {
	          var found = false;

	          for (var i = 0; i < this.history.length; ++i) {
	            var point = this.history[i];
	            if (typeof point[type] !== 'undefined' && !within(point[type][key], pos[type][key])) {
	              found = true;
	              break;
	            }
	          }

	          if (!found) {
	            same[type][key] = true;
	          }
	        }
	      }

	      var css = { top: '', left: '', right: '', bottom: '' };

	      var transcribe = function transcribe(_same, _pos) {
	        var hasOptimizations = typeof _this8.options.optimizations !== 'undefined';
	        var gpu = hasOptimizations ? _this8.options.optimizations.gpu : null;
	        if (gpu !== false) {
	          var yPos = undefined,
	              xPos = undefined;
	          if (_same.top) {
	            css.top = 0;
	            yPos = _pos.top;
	          } else {
	            css.bottom = 0;
	            yPos = -_pos.bottom;
	          }

	          if (_same.left) {
	            css.left = 0;
	            xPos = _pos.left;
	          } else {
	            css.right = 0;
	            xPos = -_pos.right;
	          }

	          css[transformKey] = 'translateX(' + Math.round(xPos) + 'px) translateY(' + Math.round(yPos) + 'px)';

	          if (transformKey !== 'msTransform') {
	            // The Z transform will keep this in the GPU (faster, and prevents artifacts),
	            // but IE9 doesn't support 3d transforms and will choke.
	            css[transformKey] += " translateZ(0)";
	          }
	        } else {
	          if (_same.top) {
	            css.top = _pos.top + 'px';
	          } else {
	            css.bottom = _pos.bottom + 'px';
	          }

	          if (_same.left) {
	            css.left = _pos.left + 'px';
	          } else {
	            css.right = _pos.right + 'px';
	          }
	        }
	      };

	      var moved = false;
	      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
	        css.position = 'absolute';
	        transcribe(same.page, pos.page);
	      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
	        css.position = 'fixed';
	        transcribe(same.viewport, pos.viewport);
	      } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
	        (function () {
	          css.position = 'absolute';
	          var offsetParent = _this8.cache('target-offsetparent', function () {
	            return getOffsetParent(_this8.target);
	          });

	          if (getOffsetParent(_this8.element) !== offsetParent) {
	            defer(function () {
	              _this8.element.parentNode.removeChild(_this8.element);
	              offsetParent.appendChild(_this8.element);
	            });
	          }

	          transcribe(same.offset, pos.offset);
	          moved = true;
	        })();
	      } else {
	        css.position = 'absolute';
	        transcribe({ top: true, left: true }, pos.page);
	      }

	      if (!moved) {
	        var offsetParentIsBody = true;
	        var currentNode = this.element.parentNode;
	        while (currentNode && currentNode.nodeType === 1 && currentNode.tagName !== 'BODY') {
	          if (getComputedStyle(currentNode).position !== 'static') {
	            offsetParentIsBody = false;
	            break;
	          }

	          currentNode = currentNode.parentNode;
	        }

	        if (!offsetParentIsBody) {
	          this.element.parentNode.removeChild(this.element);
	          document.body.appendChild(this.element);
	        }
	      }

	      // Any css change will trigger a repaint, so let's avoid one if nothing changed
	      var writeCSS = {};
	      var write = false;
	      for (var key in css) {
	        var val = css[key];
	        var elVal = this.element.style[key];

	        if (elVal !== val) {
	          write = true;
	          writeCSS[key] = val;
	        }
	      }

	      if (write) {
	        defer(function () {
	          extend(_this8.element.style, writeCSS);
	        });
	      }
	    }
	  }]);

	  return TetherClass;
	})(Evented);

	TetherClass.modules = [];

	TetherBase.position = position;

	var Tether = extend(TetherClass, TetherBase);
	/* globals TetherBase */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	var _TetherBase$Utils = TetherBase.Utils;
	var getBounds = _TetherBase$Utils.getBounds;
	var extend = _TetherBase$Utils.extend;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;

	var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];

	function getBoundingRect(tether, to) {
	  if (to === 'scrollParent') {
	    to = tether.scrollParents[0];
	  } else if (to === 'window') {
	    to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
	  }

	  if (to === document) {
	    to = to.documentElement;
	  }

	  if (typeof to.nodeType !== 'undefined') {
	    (function () {
	      var size = getBounds(to);
	      var pos = size;
	      var style = getComputedStyle(to);

	      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];

	      BOUNDS_FORMAT.forEach(function (side, i) {
	        side = side[0].toUpperCase() + side.substr(1);
	        if (side === 'Top' || side === 'Left') {
	          to[i] += parseFloat(style['border' + side + 'Width']);
	        } else {
	          to[i] -= parseFloat(style['border' + side + 'Width']);
	        }
	      });
	    })();
	  }

	  return to;
	}

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var _this = this;

	    var top = _ref.top;
	    var left = _ref.left;
	    var targetAttachment = _ref.targetAttachment;

	    if (!this.options.constraints) {
	      return true;
	    }

	    var _cache = this.cache('element-bounds', function () {
	      return getBounds(_this.element);
	    });

	    var height = _cache.height;
	    var width = _cache.width;

	    if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
	      var _lastSize = this.lastSize;

	      // Handle the item getting hidden as a result of our positioning without glitching
	      // the classes in and out
	      width = _lastSize.width;
	      height = _lastSize.height;
	    }

	    var targetSize = this.cache('target-bounds', function () {
	      return _this.getTargetBounds();
	    });

	    var targetHeight = targetSize.height;
	    var targetWidth = targetSize.width;

	    var allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];

	    this.options.constraints.forEach(function (constraint) {
	      var outOfBoundsClass = constraint.outOfBoundsClass;
	      var pinnedClass = constraint.pinnedClass;

	      if (outOfBoundsClass) {
	        allClasses.push(outOfBoundsClass);
	      }
	      if (pinnedClass) {
	        allClasses.push(pinnedClass);
	      }
	    });

	    allClasses.forEach(function (cls) {
	      ['left', 'top', 'right', 'bottom'].forEach(function (side) {
	        allClasses.push(cls + '-' + side);
	      });
	    });

	    var addClasses = [];

	    var tAttachment = extend({}, targetAttachment);
	    var eAttachment = extend({}, this.attachment);

	    this.options.constraints.forEach(function (constraint) {
	      var to = constraint.to;
	      var attachment = constraint.attachment;
	      var pin = constraint.pin;

	      if (typeof attachment === 'undefined') {
	        attachment = '';
	      }

	      var changeAttachX = undefined,
	          changeAttachY = undefined;
	      if (attachment.indexOf(' ') >= 0) {
	        var _attachment$split = attachment.split(' ');

	        var _attachment$split2 = _slicedToArray(_attachment$split, 2);

	        changeAttachY = _attachment$split2[0];
	        changeAttachX = _attachment$split2[1];
	      } else {
	        changeAttachX = changeAttachY = attachment;
	      }

	      var bounds = getBoundingRect(_this, to);

	      if (changeAttachY === 'target' || changeAttachY === 'both') {
	        if (top < bounds[1] && tAttachment.top === 'top') {
	          top += targetHeight;
	          tAttachment.top = 'bottom';
	        }

	        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
	          top -= targetHeight;
	          tAttachment.top = 'top';
	        }
	      }

	      if (changeAttachY === 'together') {
	        if (tAttachment.top === 'top') {
	          if (eAttachment.top === 'bottom' && top < bounds[1]) {
	            top += targetHeight;
	            tAttachment.top = 'bottom';

	            top += height;
	            eAttachment.top = 'top';
	          } else if (eAttachment.top === 'top' && top + height > bounds[3] && top - (height - targetHeight) >= bounds[1]) {
	            top -= height - targetHeight;
	            tAttachment.top = 'bottom';

	            eAttachment.top = 'bottom';
	          }
	        }

	        if (tAttachment.top === 'bottom') {
	          if (eAttachment.top === 'top' && top + height > bounds[3]) {
	            top -= targetHeight;
	            tAttachment.top = 'top';

	            top -= height;
	            eAttachment.top = 'bottom';
	          } else if (eAttachment.top === 'bottom' && top < bounds[1] && top + (height * 2 - targetHeight) <= bounds[3]) {
	            top += height - targetHeight;
	            tAttachment.top = 'top';

	            eAttachment.top = 'top';
	          }
	        }

	        if (tAttachment.top === 'middle') {
	          if (top + height > bounds[3] && eAttachment.top === 'top') {
	            top -= height;
	            eAttachment.top = 'bottom';
	          } else if (top < bounds[1] && eAttachment.top === 'bottom') {
	            top += height;
	            eAttachment.top = 'top';
	          }
	        }
	      }

	      if (changeAttachX === 'target' || changeAttachX === 'both') {
	        if (left < bounds[0] && tAttachment.left === 'left') {
	          left += targetWidth;
	          tAttachment.left = 'right';
	        }

	        if (left + width > bounds[2] && tAttachment.left === 'right') {
	          left -= targetWidth;
	          tAttachment.left = 'left';
	        }
	      }

	      if (changeAttachX === 'together') {
	        if (left < bounds[0] && tAttachment.left === 'left') {
	          if (eAttachment.left === 'right') {
	            left += targetWidth;
	            tAttachment.left = 'right';

	            left += width;
	            eAttachment.left = 'left';
	          } else if (eAttachment.left === 'left') {
	            left += targetWidth;
	            tAttachment.left = 'right';

	            left -= width;
	            eAttachment.left = 'right';
	          }
	        } else if (left + width > bounds[2] && tAttachment.left === 'right') {
	          if (eAttachment.left === 'left') {
	            left -= targetWidth;
	            tAttachment.left = 'left';

	            left -= width;
	            eAttachment.left = 'right';
	          } else if (eAttachment.left === 'right') {
	            left -= targetWidth;
	            tAttachment.left = 'left';

	            left += width;
	            eAttachment.left = 'left';
	          }
	        } else if (tAttachment.left === 'center') {
	          if (left + width > bounds[2] && eAttachment.left === 'left') {
	            left -= width;
	            eAttachment.left = 'right';
	          } else if (left < bounds[0] && eAttachment.left === 'right') {
	            left += width;
	            eAttachment.left = 'left';
	          }
	        }
	      }

	      if (changeAttachY === 'element' || changeAttachY === 'both') {
	        if (top < bounds[1] && eAttachment.top === 'bottom') {
	          top += height;
	          eAttachment.top = 'top';
	        }

	        if (top + height > bounds[3] && eAttachment.top === 'top') {
	          top -= height;
	          eAttachment.top = 'bottom';
	        }
	      }

	      if (changeAttachX === 'element' || changeAttachX === 'both') {
	        if (left < bounds[0]) {
	          if (eAttachment.left === 'right') {
	            left += width;
	            eAttachment.left = 'left';
	          } else if (eAttachment.left === 'center') {
	            left += width / 2;
	            eAttachment.left = 'left';
	          }
	        }

	        if (left + width > bounds[2]) {
	          if (eAttachment.left === 'left') {
	            left -= width;
	            eAttachment.left = 'right';
	          } else if (eAttachment.left === 'center') {
	            left -= width / 2;
	            eAttachment.left = 'right';
	          }
	        }
	      }

	      if (typeof pin === 'string') {
	        pin = pin.split(',').map(function (p) {
	          return p.trim();
	        });
	      } else if (pin === true) {
	        pin = ['top', 'left', 'right', 'bottom'];
	      }

	      pin = pin || [];

	      var pinned = [];
	      var oob = [];

	      if (top < bounds[1]) {
	        if (pin.indexOf('top') >= 0) {
	          top = bounds[1];
	          pinned.push('top');
	        } else {
	          oob.push('top');
	        }
	      }

	      if (top + height > bounds[3]) {
	        if (pin.indexOf('bottom') >= 0) {
	          top = bounds[3] - height;
	          pinned.push('bottom');
	        } else {
	          oob.push('bottom');
	        }
	      }

	      if (left < bounds[0]) {
	        if (pin.indexOf('left') >= 0) {
	          left = bounds[0];
	          pinned.push('left');
	        } else {
	          oob.push('left');
	        }
	      }

	      if (left + width > bounds[2]) {
	        if (pin.indexOf('right') >= 0) {
	          left = bounds[2] - width;
	          pinned.push('right');
	        } else {
	          oob.push('right');
	        }
	      }

	      if (pinned.length) {
	        (function () {
	          var pinnedClass = undefined;
	          if (typeof _this.options.pinnedClass !== 'undefined') {
	            pinnedClass = _this.options.pinnedClass;
	          } else {
	            pinnedClass = _this.getClass('pinned');
	          }

	          addClasses.push(pinnedClass);
	          pinned.forEach(function (side) {
	            addClasses.push(pinnedClass + '-' + side);
	          });
	        })();
	      }

	      if (oob.length) {
	        (function () {
	          var oobClass = undefined;
	          if (typeof _this.options.outOfBoundsClass !== 'undefined') {
	            oobClass = _this.options.outOfBoundsClass;
	          } else {
	            oobClass = _this.getClass('out-of-bounds');
	          }

	          addClasses.push(oobClass);
	          oob.forEach(function (side) {
	            addClasses.push(oobClass + '-' + side);
	          });
	        })();
	      }

	      if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
	        eAttachment.left = tAttachment.left = false;
	      }
	      if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
	        eAttachment.top = tAttachment.top = false;
	      }

	      if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
	        _this.updateAttachClasses(eAttachment, tAttachment);
	        _this.trigger('update', {
	          attachment: eAttachment,
	          targetAttachment: tAttachment
	        });
	      }
	    });

	    defer(function () {
	      if (!(_this.options.addTargetClasses === false)) {
	        updateClasses(_this.target, addClasses, allClasses);
	      }
	      updateClasses(_this.element, addClasses, allClasses);
	    });

	    return { top: top, left: left };
	  }
	});
	/* globals TetherBase */

	'use strict';

	var _TetherBase$Utils = TetherBase.Utils;
	var getBounds = _TetherBase$Utils.getBounds;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var _this = this;

	    var top = _ref.top;
	    var left = _ref.left;

	    var _cache = this.cache('element-bounds', function () {
	      return getBounds(_this.element);
	    });

	    var height = _cache.height;
	    var width = _cache.width;

	    var targetPos = this.getTargetBounds();

	    var bottom = top + height;
	    var right = left + width;

	    var abutted = [];
	    if (top <= targetPos.bottom && bottom >= targetPos.top) {
	      ['left', 'right'].forEach(function (side) {
	        var targetPosSide = targetPos[side];
	        if (targetPosSide === left || targetPosSide === right) {
	          abutted.push(side);
	        }
	      });
	    }

	    if (left <= targetPos.right && right >= targetPos.left) {
	      ['top', 'bottom'].forEach(function (side) {
	        var targetPosSide = targetPos[side];
	        if (targetPosSide === top || targetPosSide === bottom) {
	          abutted.push(side);
	        }
	      });
	    }

	    var allClasses = [];
	    var addClasses = [];

	    var sides = ['left', 'top', 'right', 'bottom'];
	    allClasses.push(this.getClass('abutted'));
	    sides.forEach(function (side) {
	      allClasses.push(_this.getClass('abutted') + '-' + side);
	    });

	    if (abutted.length) {
	      addClasses.push(this.getClass('abutted'));
	    }

	    abutted.forEach(function (side) {
	      addClasses.push(_this.getClass('abutted') + '-' + side);
	    });

	    defer(function () {
	      if (!(_this.options.addTargetClasses === false)) {
	        updateClasses(_this.target, addClasses, allClasses);
	      }
	      updateClasses(_this.element, addClasses, allClasses);
	    });

	    return true;
	  }
	});
	/* globals TetherBase */

	'use strict';

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	TetherBase.modules.push({
	  position: function position(_ref) {
	    var top = _ref.top;
	    var left = _ref.left;

	    if (!this.options.shift) {
	      return;
	    }

	    var shift = this.options.shift;
	    if (typeof this.options.shift === 'function') {
	      shift = this.options.shift.call(this, { top: top, left: left });
	    }

	    var shiftTop = undefined,
	        shiftLeft = undefined;
	    if (typeof shift === 'string') {
	      shift = shift.split(' ');
	      shift[1] = shift[1] || shift[0];

	      var _shift = shift;

	      var _shift2 = _slicedToArray(_shift, 2);

	      shiftTop = _shift2[0];
	      shiftLeft = _shift2[1];

	      shiftTop = parseFloat(shiftTop, 10);
	      shiftLeft = parseFloat(shiftLeft, 10);
	    } else {
	      shiftTop = shift.top;
	      shiftLeft = shift.left;
	    }

	    top += shiftTop;
	    left += shiftLeft;

	    return { top: top, left: left };
	  }
	});
	return Tether;

	}));


/***/ }
/******/ ])
});
;
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}rey.factory('uim.DateFormat',[function(){return{date:{input:'DD/MM/YYYY',output:'YYYY-MM-DD'},time:{input:'HH:mm',output:'HH:mm:ss'},datetime:{input:'DD/MM/YYYY HH:mm',output:'YYYY-MM-DD HH:mm:ss'}};}]);/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.factory('uim.DatePicker',[function(){return DatePicker;}]);/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.factory('moment',[function(){return moment;}]);/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.factory('uim.ValueFormat',['moment','uim.DateFormat',function(moment,DateFormat){return{date:function date(value){var date=moment(value,DateFormat.date.output);if(date.isValid()){return date.format(DateFormat.date.input);}},time:function time(value){var time=moment(value,DateFormat.time.output);if(time.isValid()){return time.format(DateFormat.time.input);}},datetime:function datetime(value){var datetime=moment(value,DateFormat.datetime.output);if(datetime.isValid()){return datetime.format(DateFormat.datetime.input);}}};}]);/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.Breadcrumb',['React','Immutable','classNames','uim.LinkGroup',function(React,Immutable,classNames,LinkGroup){return{statics:{pickProps:LinkGroup.pickProps},propTypes:{className:React.PropTypes.string},render:function render(){var classes=_defineProperty({breadcrumb:true},this.props.className,this.props.className);return React.createElement(LinkGroup,_extends({},this.props,{className:classNames(classes)}));}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.Failure',['React','Immutable','classNames','uim.Icon',function(React,Immutable,classNames,Icon){return{propTypes:{label:React.PropTypes.string.isRequired,message:React.PropTypes.string,buttonLabel:React.PropTypes.string.isRequired,onClose:React.PropTypes.func.isRequired},getDefaultProps:function getDefaultProps(){return{buttonLabel:'OK'};},render:function render(){return React.createElement('div',{className:'dialog failure'},React.createElement('header',null,React.createElement(Icon,{name:'exclamation-circle'}),React.createElement('h2',null,this.props.label)),this.props.message?React.createElement('p',null,this.props.message):undefined,React.createElement('footer',null,React.createElement('button',{type:'button',onClick:this.props.onClose},this.props.buttonLabel)));}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.Button',['React','Immutable','classNames',function(React,Immutable,classNames){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),label:field.get('label'),htmlType:field.get('htmlType'),disabled:field.get('disabled'),style:field.get('style'),className:field.get('className')};}},propTypes:{path:React.PropTypes.List.isRequired,name:React.PropTypes.string.isRequired,label:React.PropTypes.string.isRequired,disabled:React.PropTypes.bool.isRequired,htmlType:React.PropTypes.string.isRequired,onClick:React.PropTypes.func,className:React.PropTypes.string,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object])},getDefaultProps:function getDefaultProps(){return{path:Immutable.List(),htmlType:'button',disabled:false};},handleClick:function handleClick(event){if(this.props.onClick){this.props.onClick({name:this.props.name,path:this.props.path,event:event});}},render:function render(){var style=Immutable.Map.isMap(this.props.style)?this.props.style.toJS():this.props.style;var classes=_defineProperty({button:true},this.props.className,!!this.props.className);return React.createElement('button',{style:style,'data-button-name':this.props.name,type:this.props.htmlType,disabled:this.props.disabled,className:classNames(classes),onClick:this.handleClick},this.props.label);}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.ButtonGroup',['React','Immutable','classNames','uim.Button',function(React,Immutable,classNames,Button){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),label:field.get('label'),buttons:field.get('buttons'),className:field.get('className'),style:field.get('style'),value:values.getIn(path)};}},propTypes:{path:React.PropTypes.List.isRequired,buttons:React.PropTypes.List.isRequired,onClick:React.PropTypes.func.isRequired,className:React.PropTypes.string,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object])},handleClick:function handleClick(button,event){if(this.props.onClick){event.button=button;this.props.onClick(event);}},renderButton:function renderButton(button,index){var props=Button.pickProps(this.props.path,button);return React.createElement(Button,_extends({key:index},props,{onClick:this.handleClick.bind(this,button)}));},render:function render(){var _classes3;var style=Immutable.Map.isMap(this.props.style)?this.props.style.toJS():this.props.style;var classes=(_classes3={},_defineProperty(_classes3,'button-group',true),_defineProperty(_classes3,this.props.className,!!this.props.className),_classes3);return React.createElement('div',{'data-field-name':this.props.name,style:style,className:classNames(classes)},this.props.buttons.map(this.renderButton));}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.Checkbox',['React','Immutable','classNames',function(React,Immutable,classNames){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),label:field.get('label'),className:field.get('className'),style:field.get('style'),disabled:field.get('disabled'),value:field.get('value'),checked:!!values.getIn(path)};}},propTypes:{path:React.PropTypes.List.isRequired,name:React.PropTypes.string.isRequired,label:React.PropTypes.string.isRequired,checked:React.PropTypes.bool.isRequired,onClick:React.PropTypes.func.isRequired,onChange:React.PropTypes.func.isRequired,value:React.PropTypes.any,disabled:React.PropTypes.bool,className:React.PropTypes.string,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object])},handleClick:function handleClick(event){if(this.props.onClick){this.props.onClick({name:this.props.name,path:this.props.path,value:this.refs.input.checked,event:event});}},handleChange:function handleChange(event){if(this.props.onChange){this.props.onChange({name:this.props.name,path:this.props.path,value:this.refs.input.checked,event:event});}},render:function render(){var style=Immutable.Map.isMap(this.props.style)?this.props.style.toJS():this.props.style;var classes=_defineProperty({checkbox:true,disabled:this.props.disabled},this.props.className,!!this.props.className);return React.createElement('label',{className:classNames(classes),style:style},React.createElement('input',{ref:'input',type:'checkbox',name:this.props.name,checked:this.props.checked,disabled:this.props.disabled,value:this.props.value,onClick:this.handleClick,onChange:this.handleChange}),React.createElement('span',null,this.props.label));}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.CheckGroup',['React','Immutable','classNames','uim.Button','uim.Field',function(React,Immutable,classNames,Button,Field){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),label:field.get('label'),checkboxes:field.get('checkboxes'),className:field.get('className'),style:field.get('style'),value:values.getIn(path)};}},propTypes:{path:React.PropTypes.List.isRequired,label:React.PropTypes.string,input:React.PropTypes.bool.isRequired,checkboxes:React.PropTypes.List.isRequired,values:React.PropTypes.Map.isRequired,onChange:React.PropTypes.func.isRequired,className:React.PropTypes.string,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object])},renderCheckbox:function renderCheckbox(option,index){var name=option.get('name')||index;var label=option.get('label')||name;var path=this.props.path.push(name);return React.createElement(Checkbox,{ref:name,key:index,path:path,name:name,label:label,checked:!!this.props.values.getIn(path),disabled:option.get('disabled'),onChange:this.props.onChange});},render:function render(){var _classes5;var classes=(_classes5={},_defineProperty(_classes5,'check-group',true),_defineProperty(_classes5,this.props.className,!!this.props.className),_classes5);return React.createElement(Field,{ref:'field',name:this.props.name,label:this.props.label,style:this.props.style,className:classNames(classes)},this.props.checkboxes.map(this.renderCheckbox));}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.DateField',['React','Immutable','classNames','uim.Value','uim.Field','uim.DatePicker','uim.DateFormat',function(React,Immutable,classNames,Value,Field,DatePicker,DateFormat){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),label:field.get('label'),className:field.get('className'),value:values.getIn(path),style:field.get('style'),inputFormat:field.get('inputFormat'),outputFormat:field.get('outputFormat'),placeholder:field.get('placeholder')};}},propTypes:{path:React.PropTypes.List.isRequired,label:React.PropTypes.string.isRequired,input:React.PropTypes.bool.isRequired,value:React.PropTypes.any,onChange:React.PropTypes.func,className:React.PropTypes.string,inputFormat:React.PropTypes.string.isRequired,outputFormat:React.PropTypes.string.isRequired,placeholder:React.PropTypes.string,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object])},getDefaultProps:function getDefaultProps(){return{inputFormat:DateFormat.date.input,outputFormat:DateFormat.date.output};},parseInput:function parseInput(date){if(typeof date==='string'){date=date.substr(0,this.props.outputFormat.length);}return date?moment(date,this.props.outputFormat):undefined;},parseOutput:function parseOutput(date){return date.isValid()?date.format(this.props.outputFormat):undefined;},handleChange:function handleChange(value){if(this.props.onChange){this.props.onChange({name:this.props.name,path:this.props.path,value:this.parseOutput(value)});}},renderContent:function renderContent(){var content=void 0;if(this.props.input){content=React.createElement(DatePicker,{dateFormat:this.props.inputFormat,selected:this.parseInput(this.props.value),onChange:this.handleChange,placeholderText:this.props.placeholder});}else{content=React.createElement(Value,{className:'date-value',path:this.props.path,name:this.props.name,value:this.props.value,format:'date'});}return content;},render:function render(){var _classes6;var classes=(_classes6={},_defineProperty(_classes6,'date-field',true),_defineProperty(_classes6,this.props.className,!!this.props.className),_classes6);return React.createElement(Field,{ref:'field',name:this.props.name,label:this.props.label,style:this.props.style,className:classNames(classes)},this.renderContent());}};}]);/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.DateRangeField',['React','Immutable','classNames','uim.Value','uim.Field','uim.DatePicker','uim.DateFormat',function(React,Immutable,classNames,Value,Field,DatePicker,DateFormat){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),label:field.get('label'),className:field.get('className'),value:values.getIn(path),style:field.get('style'),inputFormat:field.get('inputFormat'),outputFormat:field.get('outputFormat'),placeholder:field.get('placeholder')};}},propTypes:{path:React.PropTypes.List.isRequired,label:React.PropTypes.string.isRequired,input:React.PropTypes.bool.isRequired,value:React.PropTypes.List,onChange:React.PropTypes.func,placeholder:React.PropTypes.oneOfType([React.PropTypes.string,React.PropTypes.List]),className:React.PropTypes.string,inputFormat:React.PropTypes.string.isRequired,outputFormat:React.PropTypes.string.isRequired,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object])},getDefaultProps:function getDefaultProps(){return{inputFormat:DateFormat.date.input,outputFormat:DateFormat.date.output};},parseInput:function parseInput(value,index){var date=void 0;if(Immutable.List.isList(value)){date=value.get(index);}else if(index===0&&rey.isString(value)){date=value;}if(typeof date==='string'){date=date.substr(0,this.props.outputFormat.length);}return date?moment(date,this.props.outputFormat):undefined;},parseOutput:function parseOutput(date){return date&&date.isValid()?date.format(this.props.outputFormat):undefined;},handleChange:function handleChange(value,index){var newValue=void 0;if(Immutable.List.isList(this.props.value)){newValue=this.props.value.set(index,this.parseOutput(value));}else{newValue=Immutable.List().set(index,this.parseOutput(value));}if(this.props.onChange){this.props.onChange({name:this.props.name,path:this.props.path,value:newValue});}},getPlaceholder:function getPlaceholder(index){var placeholder=void 0;if(rey.isString(this.props.placeholder)){placeholder=this.props.placeholder;}else if(Immutable.List.isList(this.props.placeholder)){placeholder=this.props.placeholder.get(index);}return placeholder;},renderContent:function renderContent(){var _this=this;var content=void 0;if(this.props.input){var startDate=this.parseInput(this.props.value,0);var endDate=this.parseInput(this.props.value,1);content=[React.createElement(DatePicker,{key:'startDate',ref:'startDate',startDate:startDate,endDate:endDate,selected:startDate,dateFormat:this.props.inputFormat,isClearable:true,onBlur:function onBlur(){return _this.refs.startDate.setOpen(false);},onChange:function onChange(date){return _this.handleChange(date,0);},placeholderText:this.getPlaceholder(0)}),React.createElement(DatePicker,{key:'endDate',ref:'endDate',startDate:startDate,endDate:endDate,selected:endDate,isClearable:true,onBlur:function onBlur(){return _this.refs.endDate.setOpen(false);},dateFormat:this.props.inputFormat,onChange:function onChange(date){return _this.handleChange(date,1);},placeholderText:this.getPlaceholder(1)})];}else{content=React.createElement(Value,{className:'date-range-value',path:this.props.path,name:this.props.name,value:this.props.value,format:'date'});}return content;},render:function render(){var _classes7;var classes=(_classes7={},_defineProperty(_classes7,'date-range-field',true),_defineProperty(_classes7,this.props.className,!!this.props.className),_classes7);return React.createElement(Field,{ref:'field',style:this.props.style,name:this.props.name,label:this.props.label,className:classNames(classes)},this.renderContent());}};}]);/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.Field',['React','Immutable','classNames',function(React,Immutable,classNames){return{propTypes:{name:React.PropTypes.string.isRequired,label:React.PropTypes.string,className:React.PropTypes.string,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object])},render:function render(){var style=Immutable.Map.isMap(this.props.style)?this.props.style.toJS():this.props.style;var classes=_defineProperty({field:true},this.props.className,!!this.props.className);return React.createElement('div',{'data-field-name':this.props.name,style:style,className:classNames(classes)},React.createElement('label',null,this.props.label),this.props.children);}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.FieldGroup',['React','Immutable','classNames','uim.IconButton',function(React,Immutable,classNames,IconButton){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),label:field.get('label'),fields:field.get('fields'),className:field.get('className'),style:field.get('style'),multiple:field.get('multiple'),values:values};}},propTypes:{path:React.PropTypes.List.isRequired,input:React.PropTypes.bool.isRequired,fields:React.PropTypes.List.isRequired,values:React.PropTypes.Map.isRequired,collapsed:React.PropTypes.bool.isRequired,multiple:React.PropTypes.bool.isRequired,className:React.PropTypes.string,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object]),onClick:React.PropTypes.func,onChange:React.PropTypes.func},getDefaultProps:function getDefaultProps(){return{path:Immutable.List(),input:true,collapsed:false,multiple:false};},onClickAddEntry:function onClickAddEntry(event){if(this.props.onChange){var entries=this.props.values.getIn(this.props.path);this.props.onChange({name:this.props.name,path:this.props.path.push(entries?entries.size:0),value:Immutable.Map(),event:event});}},onClickRemoveEntry:function onClickRemoveEntry(entryIndex,event){if(this.props.onChange){var entries=this.props.values.getIn(this.props.path);this.props.onChange({name:this.props.name,path:this.props.path.push(entryIndex),value:null,event:event});}},renderField:function renderField(path,field,index){var Component=rey.inject('uim.'+field.get('type'));if(!Component){console.error(new Error('unknown component type ('+field.get('type')+')'));}if(!Component.pickProps){console.error(new Error('invalid component type ('+field.get('type')+')'));}var props=Component.pickProps(path,field,this.props.values);return React.createElement(Component,_extends({key:index},props,{input:this.props.input,onClick:this.props.onClick,onChange:this.props.onChange}));},renderEntry:function renderEntry(entryIndex){var _this2=this;return React.createElement('div',{key:entryIndex,className:'field-group-entry'},this.props.input&&React.createElement('div',{className:'field-group-entry-action'},React.createElement(IconButton,{name:'removeFieldGroupEntry',icon:'trash-o',onClick:this.onClickRemoveEntry.bind(this,entryIndex)})),React.createElement('div',{className:'field-group-entry-fields'},this.props.fields.map(function(field,index){return _this2.renderField(_this2.props.path.push(entryIndex),field,index);})));},wrapEntries:function wrapEntries(children){return React.createElement('div',{className:'field-group-entries'},children,React.createElement('div',{className:'field-group-entries-action'},React.createElement(IconButton,{name:'addFieldGroupEntry',icon:'plus',onClick:this.onClickAddEntry})));},renderFields:function renderFields(){var _this3=this;var content=void 0;if(this.props.multiple){(function(){var children=[];var entries=_this3.props.values.getIn(_this3.props.path);if(Immutable.Map.isMap(entries)){entries.forEach(function(entry,entryIndex){if(Immutable.Map.isMap(entry)){children.push(_this3.renderEntry(entryIndex));}},_this3);}if(!children.length){children=_this3.renderEntry(0);}content=_this3.wrapEntries(children);})();}else{content=this.props.fields.map(function(field,index){return _this3.renderField(_this3.props.path,field,index);});}return content;},render:function render(){var _classes9;var style=Immutable.Map.isMap(this.props.style)?this.props.style.toJS():this.props.style;var classes=(_classes9={},_defineProperty(_classes9,'field-group',true),_defineProperty(_classes9,'field-group-multiple',!!this.props.multiple),_defineProperty(_classes9,this.props.className,!!this.props.className),_classes9);if(this.props.collapsed){style.display='none';}return React.createElement('div',{className:classNames(classes),style:style},this.renderFields());}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.Fieldset',['React','Immutable','classNames','uim.FieldGroup',function(React,Immutable,classNames,FieldGroup){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),label:field.get('label'),fields:field.get('fields'),className:field.get('className'),style:field.get('style'),multiple:field.get('multiple'),collapsible:field.get('collapsible'),collapsed:field.get('collapsed'),values:values};}},propTypes:{path:React.PropTypes.List.isRequired,name:React.PropTypes.string.isRequired,label:React.PropTypes.string.isRequired,fields:React.PropTypes.List.isRequired,values:React.PropTypes.Map.isRequired,collapsible:React.PropTypes.bool.isRequired,collapsed:React.PropTypes.bool.isRequired,multiple:React.PropTypes.bool.isRequired,input:React.PropTypes.bool.isRequired,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object]),onChange:React.PropTypes.func,className:React.PropTypes.string},getDefaultProps:function getDefaultProps(){return{path:Immutable.List(),input:true,collapsible:false,collapsed:false,multiple:false};},getInitialState:function getInitialState(){return{collapsed:this.props.collapsed};},handleClickLegend:function handleClickLegend(){if(this.props.collapsible){this.setState({collapsed:!this.state.collapsed});}},render:function render(){var classes=_defineProperty({fieldset:true},this.props.className,!!this.props.className);var style=Immutable.Map.isMap(this.props.style)?this.props.style.toJS():this.props.style;return React.createElement('div',{'data-fieldset-name':this.props.name,style:style,className:classNames(classes)},React.createElement('fieldset',null,React.createElement('legend',{onClick:this.handleClickLegend},this.props.label),React.createElement(FieldGroup,{path:this.props.path,fields:this.props.fields,values:this.props.values,input:this.props.input,collapsed:this.state.collapsed,multiple:this.props.multiple,onClick:this.props.onClick,onChange:this.props.onChange})));}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.FileField',['React','Immutable','classNames','uim.Value','uim.Field','uim.Icon',function(React,Immutable,classNames,Value,Field,Icon){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),label:field.get('label'),className:field.get('className'),style:field.get('style'),multiple:field.get('multiple'),placeholder:field.get('placeholder'),value:values.getIn(path)};}},propTypes:{path:React.PropTypes.List.isRequired,name:React.PropTypes.string.isRequired,label:React.PropTypes.string,input:React.PropTypes.bool.isRequired,placeholder:React.PropTypes.string.isRequired,multiple:React.PropTypes.bool.isRequired,value:React.PropTypes.any,onChange:React.PropTypes.func,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object]),className:React.PropTypes.string},getInitialState:function getInitialState(){return{files:[]};},getDefaultProps:function getDefaultProps(){return{multiple:false,placeholder:'Browse file...'};},getFiles:function getFiles(){var files;if(this.props.input){files=this.state.files;}else if(Immutable.List.isList(this.props.value)){files=this.props.value.toJS();}else if(Immutable.Map.isMap(this.props.value)){files=[this.props.value.toJS()];}else{files=[];}return files;},onBrowseFile:function onBrowseFile(event){var files=Array.prototype.slice.call(this.refs.input.files);if(this.props.multiple){files=this.state.files.concat(files);}this.setState({files:files},this.handleChange.bind(this,event));this.refs.input.value='';},handleChange:function handleChange(event){if(this.props.onChange){this.props.onChange({name:this.props.name,path:this.props.path,value:this.props.multiple?this.state.files:this.state.files[0],event:event});}},renderInput:function renderInput(){if(this.props.input){return React.createElement('div',{className:'file-field-input'},React.createElement(Icon,{name:'cloud-upload'}),this.props.placeholder,React.createElement('input',{ref:'input',type:'file',multiple:this.props.multiple,onChange:this.onBrowseFile}));}},onClickFile:function onClickFile(file,event){if(this.props.onClick){this.props.onClick({name:this.props.name,path:this.props.path,value:file,event:event});}},onRemoveFile:function onRemoveFile(removedFile,event){event.stopPropagation();this.setState({files:this.state.files.filter(function(file){return file!==removedFile;})},this.handleChange.bind(this,event));},renderFile:function renderFile(file,index){return React.createElement('div',{key:index,className:'file-field-file',onClick:this.onClickFile.bind(this,file)},React.createElement(Icon,{name:'file-o'}),file.name,this.props.input&&React.createElement(Icon,{name:'trash-o',onClick:this.onRemoveFile.bind(this,file)}));},renderContent:function renderContent(){return React.createElement('div',{className:'file-field-content'},this.renderInput(),this.getFiles().map(this.renderFile,this));},render:function render(){var _classes11;var classes=(_classes11={},_defineProperty(_classes11,'file-field',true),_defineProperty(_classes11,this.props.className,!!this.props.className),_classes11);return React.createElement(Field,{ref:'field',name:this.props.name,label:this.props.label,style:this.props.style,className:classNames(classes)},this.renderContent());}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.Formset',['React','Immutable','classNames','uim.FieldGroup',function(React,Immutable,classNames,FieldGroup){return{propTypes:{path:React.PropTypes.List.isRequired,name:React.PropTypes.string.isRequired,label:React.PropTypes.node,fields:React.PropTypes.List.isRequired,values:React.PropTypes.Map.isRequired,input:React.PropTypes.bool.isRequired,collapsible:React.PropTypes.bool.isRequired,onClick:React.PropTypes.func,onChange:React.PropTypes.func,className:React.PropTypes.string,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object])},getDefaultProps:function getDefaultProps(){return{path:Immutable.List(),input:true,collapsible:false};},getInitialState:function getInitialState(){return{collapsed:false};},handleClickTitle:function handleClickTitle(){if(this.props.collapsible){this.setState({collapsed:!this.state.collapsed});}},renderTitle:function renderTitle(){if(this.props.label){return React.createElement('h1',{className:'title',onClick:this.handleClickTitle},React.createElement('span',null,this.props.label));}},render:function render(){var style=Immutable.Map.isMap(this.props.style)?this.props.style.toJS():this.props.style;var classes=_defineProperty({formset:true},this.props.className,!!this.props.className);return React.createElement('div',{'data-form-name':this.props.name,style:style,className:classNames(classes)},this.renderTitle(),React.createElement(FieldGroup,{path:this.props.path,input:this.props.input,fields:this.props.fields,values:this.props.values,collapsed:this.state.collapsed,onClick:this.props.onClick,onChange:this.props.onChange}));}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.MemoField',['React','Immutable','classNames','uim.Value','uim.Field',function(React,Immutable,classNames,Value,Field){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),label:field.get('label'),rows:field.get('rows'),cols:field.get('cols'),className:field.get('className'),style:field.get('style'),value:values.getIn(path)};}},propTypes:{path:React.PropTypes.List.isRequired,name:React.PropTypes.string.isRequired,label:React.PropTypes.string.isRequired,input:React.PropTypes.bool.isRequired,rows:React.PropTypes.number,cols:React.PropTypes.number,value:React.PropTypes.any,onChange:React.PropTypes.func,className:React.PropTypes.string,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object])},handleChange:function handleChange(event){if(this.props.onChange){this.props.onChange({name:this.props.name,path:this.props.path,value:this.refs.input.value,event:event});}},renderContent:function renderContent(){var content=void 0;if(this.props.input){content=React.createElement('textarea',{ref:'input',rows:this.props.rows,cols:this.props.cols,value:this.props.value||'',onChange:this.handleChange});}else{content=React.createElement(Value,{className:'memo-value',path:this.props.path,name:this.props.name,value:this.props.value});}return content;},render:function render(){var _classes13;var classes=(_classes13={},_defineProperty(_classes13,'memo-field',true),_defineProperty(_classes13,this.props.className,!!this.props.className),_classes13);return React.createElement(Field,{ref:'field',name:this.props.name,label:this.props.label,style:this.props.style,className:classNames(classes)},this.renderContent());}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.PasswordField',['React','Immutable','classNames','uim.Field',function(React,Immutable,classNames,Field){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),label:field.get('label'),className:field.get('className'),style:field.get('style'),empty:!values.getIn(path)};}},propTypes:{path:React.PropTypes.List.isRequired,name:React.PropTypes.string.isRequired,label:React.PropTypes.string.isRequired,empty:React.PropTypes.bool,onChange:React.PropTypes.func,className:React.PropTypes.string,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object])},componentDidUpdate:function componentDidUpdate(){if(this.props.empty){this.refs.input.value='';}},handleChange:function handleChange(event){if(this.props.onChange){this.props.onChange({name:this.props.name,path:this.props.path,value:this.refs.input.value,event:event});}},render:function render(){var _classes14;var classes=(_classes14={},_defineProperty(_classes14,'password-field',true),_defineProperty(_classes14,this.props.className,!!this.props.className),_classes14);return React.createElement(Field,{ref:'field',name:this.props.name,label:this.props.label,style:this.props.style,className:classNames(classes)},React.createElement('input',{ref:'input',type:'password',onChange:this.handleChange}));}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.Radio',['React','Immutable','classNames',function(React,Immutable,classNames){return{propTypes:{path:React.PropTypes.List.isRequired,name:React.PropTypes.string.isRequired,label:React.PropTypes.string.isRequired,value:React.PropTypes.any.isRequired,checked:React.PropTypes.bool.isRequired,onChange:React.PropTypes.func.isRequired,disabled:React.PropTypes.bool,className:React.PropTypes.string,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object])},handleChange:function handleChange(event){if(this.props.onChange){this.props.onChange({name:this.props.name,path:this.props.path,value:this.refs.input.value,event:event});}},render:function render(){var style=Immutable.Map.isMap(this.props.style)?this.props.style.toJS():this.props.style;var classes=_defineProperty({radio:true,disabled:this.props.disabled},this.props.className,!!this.props.className);return React.createElement('label',{style:style,className:classNames(classes)},React.createElement('input',{ref:'input',type:'radio',name:this.props.name,value:this.props.value,checked:this.props.checked,disabled:this.props.disabled,onChange:this.handleChange}),React.createElement('span',null,this.props.label));}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.RadioGroup',['React','Immutable','classNames','uim.Field','uim.Value','uim.Radio',function(React,Immutable,classNames,Field,Value,Radio){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),label:field.get('label'),options:field.get('options'),className:field.get('className'),style:field.get('style'),value:values.getIn(path)};}},propTypes:{path:React.PropTypes.List.isRequired,name:React.PropTypes.string.isRequired,label:React.PropTypes.string,input:React.PropTypes.bool.isRequired,options:React.PropTypes.List.isRequired,value:React.PropTypes.any,onChange:React.PropTypes.func.isRequired,className:React.PropTypes.string,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object])},renderRadio:function renderRadio(option,index){return React.createElement(Radio,{ref:index,key:index,path:this.props.path,name:this.props.name,label:option.get('label'),value:option.get('value'),checked:this.props.value===option.get('value'),disabled:option.get('disabled'),onChange:this.props.onChange});},getSelectedLabel:function getSelectedLabel(){var value=this.props.value;var selected=this.props.options.find(function(option){return option.get('value')===value;});if(selected){return selected.get('label');}},renderContent:function renderContent(){var content=void 0;if(this.props.input){content=this.props.options.map(this.renderRadio);}else{content=React.createElement(Value,{className:'radio-value',path:this.props.path,name:this.props.name,value:this.getSelectedLabel()});}return content;},render:function render(){var _classes16;var classes=(_classes16={},_defineProperty(_classes16,'radio-group',true),_defineProperty(_classes16,this.props.className,!!this.props.className),_classes16);return React.createElement(Field,{ref:'field',name:this.props.name,label:this.props.label,style:this.props.style,className:classNames(classes)},this.renderContent());}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.SelectButton',['React','Immutable','classNames','uim.Icon','uim.Value',function(React,Immutable,classNames,Icon,Value){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,label:field.get('label'),name:field.get('name'),options:field.get('options'),disabled:field.get('disabled'),disabledValues:field.get('disabledValues'),className:field.get('className'),blankValue:field.get('blankValue'),multiple:field.get('multiple'),style:field.get('style'),value:values.getIn(path)};}},propTypes:{path:React.PropTypes.List.isRequired,name:React.PropTypes.string.isRequired,options:React.PropTypes.List.isRequired,disabled:React.PropTypes.bool.isRequired,multiple:React.PropTypes.bool.isRequired,disabledValues:React.PropTypes.List,blankValue:React.PropTypes.string,value:React.PropTypes.any,onChange:React.PropTypes.func,onClick:React.PropTypes.func,className:React.PropTypes.string,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object])},getInitialState:function getInitialState(){return{showOptions:false};},getDefaultProps:function getDefaultProps(){return{path:Immutable.List(),disabled:false,multiple:false};},handleClickCaret:function handleClickCaret(event){event.event.stopPropagation();this.setState({showOptions:!this.state.showOptions});},getChangedValue:function getChangedValue(option){var value;if(this.props.multiple){var index=this.props.value.indexOf(option.get('value'));if(index===-1){value=this.props.value.push(option.get('value'));}else{value=this.props.value.delete(index);}}else{value=option.get('value');}return value;},handleClickOption:function handleClickOption(option,event){event.stopPropagation();if(!option.get('disabled')){if(!this.props.multiple){this.setState({showOptions:!this.state.showOptions});}if(this.props.onChange){this.props.onChange({name:this.props.name,path:this.props.path,value:this.getChangedValue(option),option:option,event:event});}}},handleClickValue:function handleClickValue(event){if(this.props.onClick){this.props.onClick({name:this.props.name,path:this.props.path,value:this.props.value,event:event.event});}},renderOptionIcon:function renderOptionIcon(option){var icon;if(option.has('icon')){icon=React.createElement(Icon,{key:'icon',name:option.get('icon')});}return icon;},renderSelected:function renderSelected(option){var selected;if(this.props.multiple){if(this.props.value.indexOf(option.get('value'))!==-1){selected=React.createElement(Icon,{name:'check',className:'icon-selected'});}else{selected=React.createElement(Icon,{name:'check',className:'icon-unselected'});}}return selected;},renderOption:function renderOption(option,index){var classes={};classes['select-button-option']=true;classes['disabled']=!!option.get('disabled');classes[option.get('className')]=!!option.get('className');var onClick=this.handleClickOption.bind(this,option);return React.createElement('li',{key:index,className:classNames(classes),onClick:onClick},this.renderSelected(option),this.renderOptionIcon(option),option.get('label'));},isDisabled:function isDisabled(){return this.props.disabled||(this.props.disabledValues?this.props.disabledValues.indexOf(this.props.value)!==-1:false);},isSelected:function isSelected(option){var selected=false;if(this.props.value||this.props.value===0){if(this.props.multiple){if(this.props.value.indexOf(option.get('value'))!==-1){selected=true;}}else if(option.get('value')===this.props.value){selected=true;}}return selected;},getSelectedOptions:function getSelectedOptions(){return this.props.options.filter(function(option){return this.isSelected(option);},this);},renderSelectedOption:function renderSelectedOption(){var classes={};classes['select-button-value']=true;var selectedOptions=this.getSelectedOptions();var value;var icon;if(selectedOptions.size>1){value=selectedOptions.map(function(option){return option.get('selectedLabel')||option.get('label');}).join(', ');}else if(selectedOptions.size>0){classes[selectedOptions.getIn([0,'className'])]=!!selectedOptions.getIn([0,'className']);value=selectedOptions.getIn([0,'selectedLabel'])||selectedOptions.getIn([0,'label']);icon=this.renderOptionIcon(selectedOptions.get(0));}else if(this.props.blankValue){classes['select-button-blank']=true;value=this.props.blankValue;}return React.createElement(Value,{onClick:this.handleClickValue,className:classNames(classes),path:this.props.path,name:this.props.name,value:[icon,value]});},renderCaretIcon:function renderCaretIcon(){return React.createElement(Icon,{key:'icon',name:'caret-down',className:'select-button-icon',onClick:this.handleClickCaret});},renderList:function renderList(){return React.createElement('ul',{key:'list'},this.props.options.map(this.renderOption));},renderOptions:function renderOptions(){if(!this.isDisabled()){return[this.renderCaretIcon(),this.renderList()];}},render:function render(){var _classes17;var style=Immutable.Map.isMap(this.props.style)?this.props.style.toJS():this.props.style;var classes=(_classes17={button:true,disabled:this.isDisabled()},_defineProperty(_classes17,'select-button',true),_defineProperty(_classes17,'show-options',this.state.showOptions),_defineProperty(_classes17,this.props.className,!!this.props.className),_classes17);return React.createElement('a',{'data-button-name':this.props.name,className:classNames(classes),style:style},this.renderSelectedOption(),this.renderOptions());}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.SelectButtonField',['React','Immutable','classNames','uim.SelectButton','uim.Field',function(React,Immutable,classNames,SelectButton,Field){return{statics:{pickProps:SelectButton.pickProps},propTypes:{path:React.PropTypes.List.isRequired,name:React.PropTypes.string.isRequired,label:React.PropTypes.string.isRequired,options:React.PropTypes.List.isRequired,disabled:React.PropTypes.bool.isRequired,disabledValues:React.PropTypes.List,blankValue:React.PropTypes.string,value:React.PropTypes.any,onChange:React.PropTypes.func,onClick:React.PropTypes.func,className:React.PropTypes.string,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object])},getDefaultProps:function getDefaultProps(){return{path:Immutable.List(),disabled:false};},render:function render(){var _classes18;var classes=(_classes18={},_defineProperty(_classes18,'select-button-field',true),_defineProperty(_classes18,this.props.className,!!this.props.className),_classes18);return React.createElement(Field,{ref:'field',name:this.props.name,label:this.props.label,style:this.props.style,className:classNames(classes)},React.createElement(SelectButton,{path:this.props.path,name:this.props.name,options:this.props.options,value:this.props.value,disabled:this.props.disabled,disabledValues:this.props.disabledValues,onClick:this.props.onClick,onChange:this.props.onChange,className:this.props.className}));}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.SelectField',['React','Immutable','classNames','uim.Value','uim.Field',function(React,Immutable,classNames,Value,Field){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),label:field.get('label'),options:field.get('options'),className:field.get('className'),style:field.get('style'),value:values.getIn(path)};}},propTypes:{path:React.PropTypes.List.isRequired,name:React.PropTypes.string.isRequired,label:React.PropTypes.string.isRequired,input:React.PropTypes.bool.isRequired,options:React.PropTypes.List.isRequired,value:React.PropTypes.any,onChange:React.PropTypes.func,className:React.PropTypes.string,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object])},handleChange:function handleChange(event){if(this.props.onChange){this.props.onChange({name:this.props.name,path:this.props.path,value:this.refs.input.value,event:event});}},renderOption:function renderOption(option,index){return React.createElement('option',{key:index,value:option.get('value')},option.get('label'));},getSelectedLabel:function getSelectedLabel(){var value=this.props.value;var selected=this.props.options.find(function(option){return option.get('value')===value;});if(selected){return selected.get('label');}},renderContent:function renderContent(){var content=void 0;if(this.props.input){content=React.createElement('select',{ref:'input',value:this.props.value||'',onChange:this.handleChange},this.props.options.map(this.renderOption));}else{content=React.createElement(Value,{className:'select-value',path:this.props.path,name:this.props.name,value:this.getSelectedLabel()});}return content;},render:function render(){var _classes19;var classes=(_classes19={},_defineProperty(_classes19,'select-field',true),_defineProperty(_classes19,this.props.className,!!this.props.className),_classes19);return React.createElement(Field,{ref:'field',name:this.props.name,label:this.props.label,style:this.props.style,className:classNames(classes)},this.renderContent());}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.TextField',['React','Immutable','classNames','uim.Value','uim.Field',function(React,Immutable,classNames,Value,Field){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),label:field.get('label'),className:field.get('className'),options:field.get('options'),style:field.get('style'),value:values.getIn(path)};}},propTypes:{path:React.PropTypes.List.isRequired,name:React.PropTypes.string.isRequired,label:React.PropTypes.string.isRequired,input:React.PropTypes.bool.isRequired,value:React.PropTypes.any,options:React.PropTypes.List,onChange:React.PropTypes.func,className:React.PropTypes.string,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object])},handleChange:function handleChange(event){if(this.props.onChange){this.props.onChange({name:this.props.name,path:this.props.path,value:this.refs.input.value,event:event});}},getId:function getId(){return this.props.path.toJS().join('-');},renderOptions:function renderOptions(){if(this.props.input&&this.props.options){return React.createElement('datalist',{id:this.getId()+'-options'},this.props.options.map(function(option,index){return React.createElement('option',{key:index,value:option},option);}));}},renderContent:function renderContent(){var content=void 0;if(this.props.input){content=React.createElement('input',{ref:'input',type:'text',value:this.props.value||'',list:this.getId()+'-options',onChange:this.handleChange});}else{content=React.createElement(Value,{className:'text-value',path:this.props.path,name:this.props.name,value:this.props.value});}return content;},render:function render(){var _classes20;var classes=(_classes20={},_defineProperty(_classes20,'text-field',true),_defineProperty(_classes20,this.props.className,!!this.props.className),_classes20);return React.createElement(Field,{ref:'field',name:this.props.name,label:this.props.label,style:this.props.style,className:classNames(classes)},this.renderContent(),this.renderOptions());}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.TimeField',['React','Immutable','classNames','uim.Value','uim.Field',function(React,Immutable,classNames,Value,Field){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),label:field.get('label'),className:field.get('className'),style:field.get('style'),value:values.getIn(path)};}},propTypes:{path:React.PropTypes.List.isRequired,name:React.PropTypes.string.isRequired,label:React.PropTypes.string.isRequired,input:React.PropTypes.bool.isRequired,value:React.PropTypes.any,onChange:React.PropTypes.func.isRequired,className:React.PropTypes.string,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object])},handleChange:function handleChange(event){if(this.props.onChange){this.props.onChange({name:this.props.name,path:this.props.path,value:this.refs.input.value,event:event});}},renderContent:function renderContent(){var content=void 0;if(this.props.input){content=React.createElement('input',{ref:'input',type:'time',value:this.props.value,onChange:this.handleChange});}else{content=React.createElement(Value,{className:'time-value',path:this.props.path,name:this.props.name,value:this.props.value});}return content;},render:function render(){var _classes21;var classes=(_classes21={},_defineProperty(_classes21,'time-field',true),_defineProperty(_classes21,this.props.className,!!this.props.className),_classes21);return React.createElement(Field,{ref:'field',name:this.props.name,label:this.props.label,style:this.props.style,className:classNames(classes)},this.renderContent());}};}]);/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.Value',['React','Immutable','classNames','uim.ValueFormat',function(React,Immutable,classNames,ValueFormat){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),format:field.get('format'),className:field.get('className'),style:field.get('style'),value:values.getIn(path),texts:field.get('texts')};}},propTypes:{path:React.PropTypes.List,name:React.PropTypes.string,value:React.PropTypes.any,texts:React.PropTypes.Map,format:React.PropTypes.string,className:React.PropTypes.string,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object]),onClick:React.PropTypes.func},handleClick:function handleClick(event){if(this.props.onClick){this.props.onClick({name:this.props.name,path:this.props.path,value:this.props.value,event:event});}},getValue:function getValue(){var value=void 0;if(this.props.value||this.props.value===0){if(this.props.format){if(ValueFormat[this.props.format]){value=ValueFormat[this.props.format](this.props.value);}else{throw new Error('unknown format ('+this.props.format+')');}}else{value=this.props.value;}}else{value='-';}if(this.props.texts){value=this.props.texts.get(value);}return value;},render:function render(){var style=Immutable.Map.isMap(this.props.style)?this.props.style.toJS():this.props.style;var classes=_defineProperty({value:true},this.props.className,!!this.props.className);return React.createElement('div',{className:classNames(classes),style:this.props.style,onClick:this.handleClick},this.getValue());}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.Icon',['React','Immutable','classNames',function(React,Immutable,classNames){var globals=arguments.length<=3||arguments[3]===undefined?{}:arguments[3];return{statics:{globals:globals,pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),icon:field.get('icon'),className:field.get('className')};}},propTypes:{path:React.PropTypes.List.isRequired,name:React.PropTypes.string.isRequired,icon:React.PropTypes.string,className:React.PropTypes.string,onClick:React.PropTypes.func},getDefaultProps:function getDefaultProps(){return{path:Immutable.List()};},handleClick:function handleClick(event){if(this.props.onClick){this.props.onClick({name:this.props.name,path:this.props.path,event:event});}},render:function render(){var _classes23;var icon=this.props.icon||this.props.name;var classes=(_classes23={icon:true},_defineProperty(_classes23,globals.className||'fa',true),_defineProperty(_classes23,this.props.className,!!this.props.className),_defineProperty(_classes23,(globals.classNamePrefix||'fa-')+icon,true),_classes23);return React.createElement('span',{className:classNames(classes),onClick:this.handleClick});}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.IconButton',['React','Immutable','classNames','uim.Icon',function(React,Immutable,classNames,Icon){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),icon:field.get('icon'),disabled:field.get('disabled'),className:field.get('className')};}},propTypes:{path:React.PropTypes.List.isRequired,name:React.PropTypes.string.isRequired,icon:React.PropTypes.string.isRequired,disabled:React.PropTypes.bool.isRequired,onClick:React.PropTypes.func,className:React.PropTypes.string},getDefaultProps:function getDefaultProps(){return{path:Immutable.List(),disabled:false};},handleClick:function handleClick(event){if(this.props.onClick){this.props.onClick({name:this.props.name,path:this.props.path,event:event});}},render:function render(){var _classes24;var classes=(_classes24={},_defineProperty(_classes24,'icon-button',true),_defineProperty(_classes24,this.props.className,!!this.props.className),_classes24);return React.createElement(Icon,{name:this.props.name,icon:this.props.icon,className:classNames(classes),'data-button-name':this.props.name,disabled:this.props.disabled,onClick:this.handleClick});}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.Link',['React','Immutable','classNames',function(React,Immutable,classNames){var globals=arguments.length<=3||arguments[3]===undefined?{}:arguments[3];return{statics:{globals:globals,pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),href:field.get('href'),label:field.get('label'),className:field.get('className')};}},propTypes:{name:React.PropTypes.string,path:React.PropTypes.List.isRequired,href:React.PropTypes.string.isRequired,label:React.PropTypes.string,onClick:React.PropTypes.func,className:React.PropTypes.string},getDefaultProps:function getDefaultProps(){return{path:Immutable.List()};},handleClick:function handleClick(event){if(this.props.onClick){this.props.onClick({name:this.props.name,path:this.props.path,event:event});}if(globals.clickHandler){globals.clickHandler(event,this.props.href);}},render:function render(){var classes=_defineProperty({},this.props.className,!!this.props.className);return React.createElement('a',{name:this.props.name,href:this.props.href,className:classNames(classes),onClick:this.handleClick},this.props.label?this.props.label:undefined,this.props.children?this.props.children:undefined);}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.LinkButton',['React','Immutable','classNames','uim.Link',function(React,Immutable,classNames,Link){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),href:field.get('href'),label:field.get('label'),disabled:field.get('disabled'),className:field.get('className')};}},propTypes:{path:React.PropTypes.List.isRequired,name:React.PropTypes.string.isRequired,label:React.PropTypes.string.isRequired,disabled:React.PropTypes.bool.isRequired,onClick:React.PropTypes.func,className:React.PropTypes.string},getDefaultProps:function getDefaultProps(){return{disabled:false};},handleClick:function handleClick(event){if(this.props.onClick){this.props.onClick({name:this.props.name,path:this.props.path,event:event});}},render:function render(){var _classes26;var classes=(_classes26={button:true},_defineProperty(_classes26,'link-button',true),_defineProperty(_classes26,this.props.className,!!this.props.className),_classes26);return React.createElement(Link,{name:this.props.name,href:this.props.href,label:this.props.label,className:classNames(classes),'data-button-name':this.props.name,disabled:this.props.disabled,onClick:this.handleClick});}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.LinkGroup',['React','Immutable','classNames','uim.Link','uim.Icon',function(React,Immutable,classNames,Link,Icon){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),links:field.get('links'),className:field.get('className'),collapsed:field.get('collapsed')};}},propTypes:{path:React.PropTypes.List.isRequired,name:React.PropTypes.string.isRequired,links:React.PropTypes.List.isRequired,className:React.PropTypes.string,collapsed:React.PropTypes.bool.isRequired},getDefaultProps:function getDefaultProps(){return{path:Immutable.List(),links:Immutable.List(),collapsed:false};},renderIcon:function renderIcon(link){if(link.has('icon')){return React.createElement(Icon,{key:'icon',name:link.get('icon')});}},renderLink:function renderLink(link,index){return React.createElement('li',{key:index,className:link.get('className')},React.createElement(Link,{name:link.get('name'),href:link.get('href'),className:link.get('className')},this.renderIcon(link),link.get('label')));},render:function render(){var _classes27;var classes=(_classes27={},_defineProperty(_classes27,'link-group',true),_defineProperty(_classes27,this.props.className,!!this.props.className),_classes27);var style={};if(this.props.collapsed){style.display='none';}return React.createElement('ul',{className:classNames(classes),style:style},this.props.links.map(this.renderLink));}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.List',['React','Immutable','classNames','uim.Table','uim.Formset','uim.Toolbar','uim.Pages','uim.SelectButton',function(React,Immutable,classNames,Table,Formset,Toolbar,Pages,SelectButton){return{propTypes:{path:React.PropTypes.List.isRequired,name:React.PropTypes.string.isRequired,values:React.PropTypes.Map.isRequired,filter:React.PropTypes.oneOfType([React.PropTypes.List,React.PropTypes.node,React.PropTypes.bool]),header:React.PropTypes.oneOfType([React.PropTypes.List,React.PropTypes.node,React.PropTypes.bool]),footer:React.PropTypes.oneOfType([React.PropTypes.List,React.PropTypes.node,React.PropTypes.bool]),rows:React.PropTypes.List.isRequired,columns:React.PropTypes.List.isRequired,transformColumns:React.PropTypes.func,empty:React.PropTypes.node,onClick:React.PropTypes.func,onChange:React.PropTypes.func,className:React.PropTypes.string,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object])},getDefaultProps:function getDefaultProps(){return{rows:Immutable.List(),path:Immutable.List(),columns:Immutable.List(),header:true,footer:false};},renderFilter:function renderFilter(){if(this.props.filter){var filter=this.props.filter;if(Immutable.List.isList(this.props.filter)){filter=React.createElement(Formset,{name:'filter',path:this.props.path,values:this.props.values,fields:this.props.filter,onClick:this.props.onClick,onChange:this.props.onChange});}return React.createElement('div',{className:'list-filter'},filter);}},renderLimit:function renderLimit(){if(this.props.limits.size){return React.createElement(SelectButton,{name:'limit',path:this.props.path.push('limit'),value:this.props.values.getIn(this.props.path.push('limit')),options:this.props.limits,onChange:this.props.onChange,className:'select-limit'});}},renderPages:function renderPages(){if(this.props.pages>1){return React.createElement('div',{className:'list-pages'},React.createElement(Pages,{name:'page',path:this.props.path.push('page'),value:Number(this.props.values.getIn(this.props.path.push('page'))),pages:this.props.pages,onChange:this.props.onChange}),this.renderLimit());}},isEmpty:function isEmpty(){return this.props.rows.size===0&&this.props.empty;},renderEmpty:function renderEmpty(){return React.createElement('div',{className:'list-empty'},React.createElement('p',null,this.props.empty));},renderHeader:function renderHeader(){var header=this.props.header;if(Immutable.List.isList(this.props.header)){header=React.createElement(Toolbar,{name:'header',path:this.props.path,tools:this.props.header,values:this.props.values,onClick:this.props.onClick,onChange:this.props.onChange});}return header;},renderFooter:function renderFooter(){var footer=this.props.footer;if(Immutable.List.isList(this.props.footer)){footer=React.createElement(Toolbar,{name:'footer',path:this.props.path,tools:this.props.footer,values:this.props.values,onClick:this.props.onClick,onChange:this.props.onChange});}return footer;},renderTable:function renderTable(){return React.createElement('div',{className:'list-table'},React.createElement(Table,{name:'table',header:this.renderHeader(),footer:this.renderFooter(),rows:this.props.rows,columns:this.props.columns,transformColumns:this.props.transformColumns,onClick:this.props.onClick,onChange:this.props.onChange}));},render:function render(){var style=Immutable.Map.isMap(this.props.style)?this.props.style.toJS():this.props.style;var classes=_defineProperty({list:true},this.props.className,!!this.props.className);return React.createElement('div',{'data-list-name':this.props.name,style:style,className:classNames(classes)},this.renderFilter(),this.isEmpty()?this.renderEmpty():this.renderTable(),this.renderPages());}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.Pages',['React','Immutable','classNames','uim.Icon',function(React,Immutable,classNames,Icon){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),pages:field.get('pages'),range:field.get('range'),value:Number(values.getIn(path)),className:field.get('className'),style:field.get('style')};}},propTypes:{name:React.PropTypes.string.isRequired,path:React.PropTypes.List.isRequired,value:React.PropTypes.number.isRequired,pages:React.PropTypes.number.isRequired,range:React.PropTypes.number.isRequired,onChange:React.PropTypes.func,className:React.PropTypes.string,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object])},getDefaultProps:function getDefaultProps(){return{path:Immutable.List(),value:1,pages:1,range:5};},handleClick:function handleClick(event,page){if(page&&page!==this.props.value){if(this.props.onChange){this.props.onChange({name:this.props.name,path:this.props.path,value:page,event:event});}}},renderPages:function renderPages(){var _this4=this;var parts=[];var pages=this.props.pages;var current=this.props.value;var previous=current>1;var next=current<pages;var first=Math.max(1,current-this.props.range);var last=Math.min(pages,current+this.props.range);if(previous){parts.push(React.createElement('li',{key:'previous',onClick:function onClick(e){return _this4.handleClick(e,current-1);}},React.createElement(Icon,{name:'previous',icon:'chevron-left'})));}var _loop=function _loop(i){parts.push(React.createElement('li',{key:i,onClick:function onClick(e){return _this4.handleClick(e,i);},className:current===i?'current':''},i.toString()));};for(var i=first;i<=last;i++){_loop(i);}if(next){parts.push(React.createElement('li',{key:'next',onClick:function onClick(e){return _this4.handleClick(e,current+1);}},React.createElement(Icon,{name:'next',icon:'chevron-right'})));}return parts;},render:function render(){var style=Immutable.Map.isMap(this.props.style)?this.props.style.toJS():this.props.style;var classes=_defineProperty({pages:true},this.props.className,!!this.props.className);return React.createElement('ul',{style:style,className:classNames(classes)},this.renderPages());}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.Table',['React','Immutable','classNames',function(React,Immutable,classNames){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),rows:field.get('rows'),columns:field.get('columns'),header:field.get('header'),footer:field.get('footer'),className:field.get('className'),style:field.get('style')};}},propTypes:{path:React.PropTypes.List.isRequired,name:React.PropTypes.string.isRequired,header:React.PropTypes.oneOfType([React.PropTypes.node,React.PropTypes.bool]),footer:React.PropTypes.oneOfType([React.PropTypes.node,React.PropTypes.bool]),rows:React.PropTypes.List.isRequired,columns:React.PropTypes.List.isRequired,transformColumns:React.PropTypes.func,onClick:React.PropTypes.func,onChange:React.PropTypes.func,className:React.PropTypes.string,style:React.PropTypes.oneOfType([React.PropTypes.Map,React.PropTypes.object])},getDefaultProps:function getDefaultProps(){return{path:Immutable.List(),rows:Immutable.List(),columns:Immutable.List(),header:true,footer:false};},handleClick:function handleClick(row,column,event){if(this.props.onClick){event.row=row;event.column=column;this.props.onClick(event);}},isValidTarget:function isValidTarget(target){return target.hasAttribute('data-row-index')&&target.hasAttribute('data-column-index');},findTarget:function findTarget(event){var target=event.target;while(!this.isValidTarget(target)){target=target.parentNode;if(target===document.body){break;}}if(this.isValidTarget(target)){return target;}},handleClickBody:function handleClickBody(event){var target=this.findTarget(event);if(target){var rowIndex=Number(target.getAttribute('data-row-index'));var colIndex=Number(target.getAttribute('data-column-index'));var row=this.props.rows.get(rowIndex);var column=this.props.columns.get(colIndex);if(this.props.onClick){this.props.onClick({name:this.props.name,path:this.props.path,row:row,column:column,event:event});}}},handleChange:function handleChange(row,column,event){if(this.props.onChange){event.row=row;event.column=column;this.props.onChange(event);}},renderHeadCol:function renderHeadCol(column,index){var style={};if(column.get('width')){style.width=column.get('width');}return React.createElement('th',{key:index,style:style,className:'table-column','data-column-index':index,'data-column-name':column.get('name')},column.get('label'));},renderCol:function renderCol(row,rowIndex,column,colIndex){var Component=rey.inject('uim.'+column.get('type'));if(!Component){throw new Error('unknown component type ('+column.get('type')+')');}if(!Component.pickProps){throw new Error('invalid component type ('+column.get('type')+')');}var props=Component.pickProps(this.props.path,column,row);return React.createElement('td',{key:colIndex,className:'table-column','data-row-index':rowIndex,'data-column-index':colIndex,'data-column-name':column.get('name')},React.createElement(Component,_extends({},props,{onClick:this.handleClick.bind(this,row,column),onChange:this.handleChange.bind(this,row,column)})));},renderRow:function renderRow(row,rowIndex){var _this5=this;return React.createElement('tr',{key:rowIndex,className:'table-row','data-row-index':rowIndex},this.getColumns(row,rowIndex).map(function(column,colIndex){return _this5.renderCol(row,rowIndex,column,colIndex);}));},getColumns:function getColumns(row,rowIndex){var columns=this.props.columns;if(this.props.transformColumns){columns=this.props.transformColumns(columns,row,rowIndex);}return columns;},renderBody:function renderBody(){var classes={'table-body':true,'no-foot':!this.props.footer};return React.createElement('tbody',{className:classNames(classes),onClick:this.handleClickBody},this.props.rows.map(this.renderRow));},renderHeader:function renderHeader(){if(this.props.header){var content=void 0;if(this.props.header===true){content=React.createElement('tr',{className:'table-head table-row'},this.getColumns().map(this.renderHeadCol));}else{content=React.createElement('tr',{className:'table-head table-custom-head table-row'},React.createElement('th',{className:'table-column',colSpan:this.props.columns.size},this.props.header));}return React.createElement('thead',null,content);}},renderFooter:function renderFooter(){if(this.props.footer){return React.createElement('tfoot',null,React.createElement('tr',{className:'table-foot table-custom-foot table-row'},React.createElement('td',{className:'table-column',colSpan:this.props.columns.size},this.props.footer)));}},render:function render(){var style=Immutable.Map.isMap(this.props.style)?this.props.style.toJS():this.props.style;var classes=_defineProperty({table:true},this.props.className,!!this.props.className);return React.createElement('table',{'data-table-name':this.props.name,style:style,className:classNames(classes),cellSpacing:0},this.renderHeader(),this.renderBody(),this.renderFooter());}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.Loading',['React',function(React){return{render:function render(){return React.createElement('div',{className:'loading'},React.createElement('span',{className:'fa fa-spinner fa-spin'}));}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.MenuButton',['React','Immutable','classNames','uim.Icon','uim.LinkGroup','uim.IconButton',function(React,Immutable,classNames,Icon,LinkGroup,IconButton){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),icon:field.get('icon'),links:field.get('links'),groups:field.get('groups'),button:field.get('button'),counter:field.get('counter'),className:field.get('className')};}},propTypes:{path:React.PropTypes.List.isRequired,name:React.PropTypes.string.isRequired,icon:React.PropTypes.string.isRequired,button:React.PropTypes.bool.isRequired,links:React.PropTypes.List,groups:React.PropTypes.List,counter:React.PropTypes.number,className:React.PropTypes.string},getDefaultProps:function getDefaultProps(){return{path:Immutable.List(),icon:'bars',button:false};},getInitialState:function getInitialState(){return{showMenu:false};},handleClick:function handleClick(){this.setState({showMenu:!this.state.showMenu});},renderIcon:function renderIcon(){var icon=void 0;if(this.props.button){icon=React.createElement(IconButton,{name:this.props.icon,icon:this.props.icon,onClick:this.handleClick});}else{icon=React.createElement(Icon,{name:this.props.icon,onClick:this.handleClick});}return icon;},renderCounter:function renderCounter(){if(this.props.counter){return React.createElement('div',{className:'menu-button-counter',onClick:this.handleClick},this.props.counter);}},renderMenu:function renderMenu(){var _this6=this;var content=void 0;if(this.props.groups){content=this.props.groups.map(function(group,index){return React.createElement('div',{key:index,className:'menu-button-group'},group.get('label')&&React.createElement('h2',null,group.get('label')),React.createElement(LinkGroup,{name:_this6.props.name+'-'+index+'-links',path:_this6.props.path.concat(index,'links'),links:group.get('links'),className:'menu-button-links'}));});}else if(this.props.links){content=React.createElement(LinkGroup,{name:this.props.name+'-links',path:this.props.path.push('links'),links:this.props.links,className:'menu-button-links'});}return React.createElement('div',{className:'menu-button-dropdown'},content);},render:function render(){var _classes31;var classes=(_classes31={show:this.state.showMenu},_defineProperty(_classes31,'menu-button',true),_defineProperty(_classes31,this.props.className,!!this.props.className),_classes31);return React.createElement('div',{className:classNames(classes)},this.renderCounter(),this.renderIcon(),this.renderMenu());}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.Menuset',['React','Immutable','classNames','uim.LinkGroup',function(React,Immutable,classNames,LinkGroup){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),label:field.get('label'),links:field.get('links'),className:field.get('className'),collapsible:field.get('collapsible'),collapsed:field.get('collapsed')};}},propTypes:{path:React.PropTypes.List.isRequired,name:React.PropTypes.string.isRequired,label:React.PropTypes.string.isRequired,links:React.PropTypes.List.isRequired,collapsible:React.PropTypes.bool.isRequired,collapsed:React.PropTypes.bool.isRequired,className:React.PropTypes.string},getDefaultProps:function getDefaultProps(){return{path:Immutable.List(),collapsible:false,collapsed:false};},getInitialState:function getInitialState(){return{collapsed:this.props.collapsed};},handleClickLegend:function handleClickLegend(){if(this.props.collapsible){this.setState({collapsed:!this.state.collapsed});}},renderLabel:function renderLabel(){if(this.props.label){return React.createElement('legend',{onClick:this.handleClickLegend},this.props.label);}},render:function render(){var classes=_defineProperty({menuset:true},this.props.className,!!this.props.className);return React.createElement('div',{'data-menu-name':this.props.name,className:classNames(classes)},React.createElement('fieldset',null,this.renderLabel(),React.createElement(LinkGroup,{name:this.props.name,path:this.props.path,links:this.props.links,collapsed:this.state.collapsed})));}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.Overlay',['React','Immutable','classNames',function(React,Immutable,classNames){return{render:function render(){return React.createElement('div',{className:'overlay'},React.createElement('div',{className:'overlay-container'},this.props.children));}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.Success',['React','Immutable','classNames','uim.Icon',function(React,Immutable,classNames,Icon){return{propTypes:{label:React.PropTypes.string.isRequired,message:React.PropTypes.string,buttonLabel:React.PropTypes.string.isRequired,onClose:React.PropTypes.func.isRequired},getDefaultProps:function getDefaultProps(){return{buttonLabel:'OK'};},render:function render(){return React.createElement('div',{className:'dialog success'},React.createElement('header',null,React.createElement(Icon,{name:'check-circle-o'}),React.createElement('h2',null,this.props.label)),this.props.message?React.createElement('p',null,this.props.message):undefined,React.createElement('footer',null,React.createElement('button',{type:'button',onClick:this.props.onClose},this.props.buttonLabel)));}};}]);// - -------------------------------------------------------------------- - //
/*!
**  uimmutable -- React components with Immutable powers.
**  Copyright (c) 2015 Yuri Neves Silveira <http://yneves.com>
**  Licensed under The MIT License <http://opensource.org/licenses/MIT>
**  Distributed on <http://github.com/yneves/uimmutable>
*/// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.Toolbar',['React','Immutable','classNames',function(React,Immutable,classNames){return{statics:{pickProps:function pickProps(path,field,values){path=field.has('path')?field.get('path'):path.push(field.get('name'));return{path:path,name:field.get('name'),tools:field.get('tools'),className:field.get('className'),values:values};}},propTypes:{path:React.PropTypes.List.isRequired,values:React.PropTypes.Map.isRequired,tools:React.PropTypes.List,className:React.PropTypes.string,onClick:React.PropTypes.func,onChange:React.PropTypes.func},getDefaultProps:function getDefaultProps(){return{path:Immutable.List(),tools:Immutable.List(),values:Immutable.Map()};},renderTool:function renderTool(tool,index){var Component=rey.inject('uim.'+tool.get('type'));if(!Component){console.error(new Error('unknown component type ('+tool.get('type')+')'));}if(!Component.pickProps){console.error(new Error('invalid component type ('+tool.get('type')+')'));}var props=Component.pickProps(this.props.path,tool,this.props.values);return React.createElement('div',{key:index,'data-tool-name':tool.get('name'),className:'tool'},React.createElement(Component,_extends({},props,{onClick:this.props.onClick,onChange:this.props.onChange})));},render:function render(){var classes=_defineProperty({toolbar:true},this.props.className,!!this.props.className);return React.createElement('div',{'data-toolbar-name':this.props.name,className:classNames(classes)},this.props.tools.map(this.renderTool));}};}]);// - -------------------------------------------------------------------- - //
// - -------------------------------------------------------------------- - //
'use strict';rey.component('uim.View',['React','Immutable','classNames','CSSTransitionGroup','uim.Loading','uim.Toolbar','uim.Overlay',function(React,Immutable,classNames,CSSTransitionGroup,Loading,Toolbar,Overlay){return{propTypes:{header:React.PropTypes.any,footer:React.PropTypes.any,overlay:React.PropTypes.any,isLoading:React.PropTypes.bool,className:React.PropTypes.string},renderOverlay:function renderOverlay(){var hasOverlay=Immutable.List.isList(this.props.overlay)?!!this.props.overlay.size:!!this.props.overlay;if(hasOverlay){return React.createElement(Overlay,null,this.props.overlay);}},renderHeader:function renderHeader(){var header=void 0;if(Immutable.List.isList(this.props.header)){header=React.createElement(Toolbar,{name:'header',tools:this.props.header,onClick:this.props.onClick});}else if(this.props.header){header=this.props.header;}if(header){return React.createElement('header',{className:'header'},React.createElement('div',{className:'header-center'},header));}},renderFooter:function renderFooter(){var footer=void 0;if(Immutable.List.isList(this.props.footer)){footer=React.createElement(Toolbar,{name:'footer',tools:this.props.footer,onClick:this.props.onClick});}else if(this.props.footer){footer=this.props.footer;}if(footer){return React.createElement('footer',{className:'footer'},React.createElement('div',{className:'footer-center'},footer));}},render:function render(){var classes=_defineProperty({view:true},this.props.className,!!this.props.className);return React.createElement('div',{className:classNames(classes)},this.renderHeader(),React.createElement('main',null,this.props.children,this.props.isLoading?React.createElement(Loading,null):undefined),this.renderFooter(),React.createElement(CSSTransitionGroup,{transitionName:'overlay',transitionEnterTimeout:400,transitionLeaveTimeout:120},this.renderOverlay()));}};}]);// - -------------------------------------------------------------------- - //

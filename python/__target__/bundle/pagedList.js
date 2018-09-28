pagedList =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./python/__target__/org.transcrypt.__runtime__.js
// Transcrypt'ed from Python, 2018-09-28 10:05:45
var __name__ = 'org.transcrypt.__runtime__';
var __envir__ = {};
__envir__.interpreter_name = 'python';
__envir__.transpiler_name = 'transcrypt';
__envir__.executor_name = __envir__.transpiler_name;
__envir__.transpiler_version = '3.7.5';

function __nest__ (headObject, tailNames, value) {
    var current = headObject;
    if (tailNames != '') {
        var tailChain = tailNames.split ('.');
        var firstNewIndex = tailChain.length;
        for (var index = 0; index < tailChain.length; index++) {
            if (!current.hasOwnProperty (tailChain [index])) {
                firstNewIndex = index;
                break;
            }
            current = current [tailChain [index]];
        }
        for (var index = firstNewIndex; index < tailChain.length; index++) {
            current [tailChain [index]] = {};
            current = current [tailChain [index]];
        }
    }
    for (let attrib of Object.getOwnPropertyNames (value)) {
        Object.defineProperty (current, attrib, {
            get () {return value [attrib];},
            enumerable: true,
            configurable: true
        });
    }
};
function __init__ (module) {
    if (!module.__inited__) {
        module.__all__.__init__ (module.__all__);
        module.__inited__ = true;
    }
    return module.__all__;
};
var __proxy__ = false;
function __get__ (self, func, quotedFuncName) {
    if (self) {
        if (self.hasOwnProperty ('__class__') || typeof self == 'string' || self instanceof String) {
            if (quotedFuncName) {
                Object.defineProperty (self, quotedFuncName, {
                    value: function () {
                        var args = [] .slice.apply (arguments);
                        return func.apply (null, [self] .concat (args));
                    },
                    writable: true,
                    enumerable: true,
                    configurable: true
                });
            }
            return function () {
                var args = [] .slice.apply (arguments);
                return func.apply (null, [self] .concat (args));
            };
        }
        else {
            return func;
        }
    }
    else {
        return func;
    }
};
function __getcm__ (self, func, quotedFuncName) {
    if (self.hasOwnProperty ('__class__')) {
        return function () {
            var args = [] .slice.apply (arguments);
            return func.apply (null, [self.__class__] .concat (args));
        };
    }
    else {
        return function () {
            var args = [] .slice.apply (arguments);
            return func.apply (null, [self] .concat (args));
        };
    }
};
function __getsm__ (self, func, quotedFuncName) {
    return func;
};
var py_metatype = {
    __name__: 'type',
    __bases__: [],
    __new__: function (meta, name, bases, attribs) {
        var cls = function () {
            var args = [] .slice.apply (arguments);
            return cls.__new__ (args);
        };
        for (var index = bases.length - 1; index >= 0; index--) {
            var base = bases [index];
            for (var attrib in base) {
                var descrip = Object.getOwnPropertyDescriptor (base, attrib);
                Object.defineProperty (cls, attrib, descrip);
            }
            for (let symbol of Object.getOwnPropertySymbols (base)) {
                let descrip = Object.getOwnPropertyDescriptor (base, symbol);
                Object.defineProperty (cls, symbol, descrip);
            }
        }
        cls.__metaclass__ = meta;
        cls.__name__ = name.startsWith ('py_') ? name.slice (3) : name;
        cls.__bases__ = bases;
        for (var attrib in attribs) {
            var descrip = Object.getOwnPropertyDescriptor (attribs, attrib);
            Object.defineProperty (cls, attrib, descrip);
        }
        for (let symbol of Object.getOwnPropertySymbols (attribs)) {
            let descrip = Object.getOwnPropertyDescriptor (attribs, symbol);
            Object.defineProperty (cls, symbol, descrip);
        }
        return cls;
    }
};
py_metatype.__metaclass__ = py_metatype;
var object = {
    __init__: function (self) {},
    __metaclass__: py_metatype,
    __name__: 'object',
    __bases__: [],
    __new__: function (args) {
        var instance = Object.create (this, {__class__: {value: this, enumerable: true}});
        if ('__getattr__' in this || '__setattr__' in this) {
            instance = new Proxy (instance, {
                get: function (target, name) {
                    let result = target [name];
                    if (result == undefined) {
                        return target.__getattr__ (name);
                    }
                    else {
                        return result;
                    }
                },
                set: function (target, name, value) {
                    try {
                        target.__setattr__ (name, value);
                    }
                    catch (exception) {
                        target [name] = value;
                    }
                    return true;
                }
            })
        }
        this.__init__.apply (null, [instance] .concat (args));
        return instance;
    }
};
function __class__ (name, bases, attribs, meta) {
    if (meta === undefined) {
        meta = bases [0] .__metaclass__;
    }
    return meta.__new__ (meta, name, bases, attribs);
};
function __pragma__ () {};
function __call__ (/* <callee>, <this>, <params>* */) {
    var args = [] .slice.apply (arguments);
    if (typeof args [0] == 'object' && '__call__' in args [0]) {
        return args [0] .__call__ .apply (args [1], args.slice (2));
    }
    else {
        return args [0] .apply (args [1], args.slice (2));
    }
};
__envir__.executor_name = __envir__.transpiler_name;
var __main__ = {__file__: ''};
var __except__ = null;
function __kwargtrans__ (anObject) {
    anObject.__kwargtrans__ = null;
    anObject.constructor = Object;
    return anObject;
}
function __super__ (aClass, methodName) {
    for (let base of aClass.__bases__) {
        if (methodName in base) {
           return base [methodName];
        }
    }
    throw new Exception ('Superclass method not found');
}
function property (getter, setter) {
    if (!setter) {
        setter = function () {};
    }
    return {get: function () {return getter (this)}, set: function (value) {setter (this, value)}, enumerable: true};
}
function __setproperty__ (anObject, name, descriptor) {
    if (!anObject.hasOwnProperty (name)) {
        Object.defineProperty (anObject, name, descriptor);
    }
}
function assert (condition, message) {
    if (!condition) {
        throw AssertionError (message, new Error ());
    }
}
function __mergekwargtrans__ (object0, object1) {
    var result = {};
    for (var attrib in object0) {
        result [attrib] = object0 [attrib];
    }
    for (var attrib in object1) {
        result [attrib] = object1 [attrib];
    }
    return result;
};
function __mergefields__ (targetClass, sourceClass) {
    let fieldNames = ['__reprfields__', '__comparefields__', '__initfields__']
    if (sourceClass [fieldNames [0]]) {
        if (targetClass [fieldNames [0]]) {
            for (let fieldName of fieldNames) {
                targetClass [fieldName] = new Set ([...targetClass [fieldName], ...sourceClass [fieldName]]);
            }
        }
        else {
            for (let fieldName of fieldNames) {
                targetClass [fieldName] = new Set (sourceClass [fieldName]);
            }
        }
    }
}
function __withblock__ (manager, statements) {
    if (hasattr (manager, '__enter__')) {
        try {
            manager.__enter__ ();
            statements ();
            manager.__exit__ ();
        }
        catch (exception) {
            if (! (manager.__exit__ (exception.name, exception, exception.stack))) {
                throw exception;
            }
        }
    }
    else {
        statements ();
        manager.close ();
    }
};
function dir (obj) {
    var aList = [];
    for (var aKey in obj) {
        aList.push (aKey.startsWith ('py_') ? aKey.slice (3) : aKey);
    }
    aList.sort ();
    return aList;
};
function setattr (obj, name, value) {
    obj [name] = value;
};
function getattr (obj, name) {
    return name in obj ? obj [name] : obj ['py_' + name];
};
function hasattr (obj, name) {
    try {
        return name in obj || 'py_' + name in obj;
    }
    catch (exception) {
        return false;
    }
};
function delattr (obj, name) {
    if (name in obj) {
        delete obj [name];
    }
    else {
        delete obj ['py_' + name];
    }
};
function __in__ (element, container) {
    if (container === undefined || container === null) {
        return false;
    }
    if (container.__contains__ instanceof Function) {
        return container.__contains__ (element);
    }
    else {
        return (
            container.indexOf ?
            container.indexOf (element) > -1 :
            container.hasOwnProperty (element)
        );
    }
};
function __specialattrib__ (attrib) {
    return (attrib.startswith ('__') && attrib.endswith ('__')) || attrib == 'constructor' || attrib.startswith ('py_');
};
function len (anObject) {
    if (anObject === undefined || anObject === null) {
        return 0;
    }
    if (anObject.__len__ instanceof Function) {
        return anObject.__len__ ();
    }
    if (anObject.length !== undefined) {
        return anObject.length;
    }
    var length = 0;
    for (var attr in anObject) {
        if (!__specialattrib__ (attr)) {
            length++;
        }
    }
    return length;
};
function __i__ (any) {
    return py_typeof (any) == dict ? any.py_keys () : any;
}
function __k__ (keyed, key) {
    var result = keyed [key];
    if (typeof result == 'undefined') {
        if (keyed instanceof Array)
            if (key == +key && key >= 0 && keyed.length > key)
                return result;
            else
                throw IndexError (key, new Error());
        else
            throw KeyError (key, new Error());
    }
    return result;
}
function __t__ (target) {
    return (
        target === undefined || target === null ? false :
        ['boolean', 'number'] .indexOf (typeof target) >= 0 ? target :
        target.__bool__ instanceof Function ? (target.__bool__ () ? target : false) :
        target.__len__ instanceof Function ?  (target.__len__ () !== 0 ? target : false) :
        target instanceof Function ? target :
        len (target) !== 0 ? target :
        false
    );
}
function org_transcrypt_runtime_float (any) {
    if (any == 'inf') {
        return Infinity;
    }
    else if (any == '-inf') {
        return -Infinity;
    }
    else if (any == 'nan') {
        return NaN;
    }
    else if (isNaN (parseFloat (any))) {
        if (any === false) {
            return 0;
        }
        else if (any === true) {
            return 1;
        }
        else {
            throw ValueError ("could not convert string to float: '" + str(any) + "'", new Error ());
        }
    }
    else {
        return +any;
    }
};
org_transcrypt_runtime_float.__name__ = 'float';
org_transcrypt_runtime_float.__bases__ = [object];
function org_transcrypt_runtime_int (any) {
    return org_transcrypt_runtime_float (any) | 0
};
org_transcrypt_runtime_int.__name__ = 'int';
org_transcrypt_runtime_int.__bases__ = [object];
function bool (any) {
    return !!__t__ (any);
};
bool.__name__ = 'bool';
bool.__bases__ = [org_transcrypt_runtime_int];
function py_typeof (anObject) {
    var aType = typeof anObject;
    if (aType == 'object') {
        try {
            return '__class__' in anObject ? anObject.__class__ : object;
        }
        catch (exception) {
            return aType;
        }
    }
    else {
        return (
            aType == 'boolean' ? bool :
            aType == 'string' ? str :
            aType == 'number' ? (anObject % 1 == 0 ? org_transcrypt_runtime_int : org_transcrypt_runtime_float) :
            null
        );
    }
};
function issubclass (aClass, classinfo) {
    if (classinfo instanceof Array) {
        for (let aClass2 of classinfo) {
            if (issubclass (aClass, aClass2)) {
                return true;
            }
        }
        return false;
    }
    try {
        var aClass2 = aClass;
        if (aClass2 == classinfo) {
            return true;
        }
        else {
            var bases = [].slice.call (aClass2.__bases__);
            while (bases.length) {
                aClass2 = bases.shift ();
                if (aClass2 == classinfo) {
                    return true;
                }
                if (aClass2.__bases__.length) {
                    bases = [].slice.call (aClass2.__bases__).concat (bases);
                }
            }
            return false;
        }
    }
    catch (exception) {
        return aClass == classinfo || classinfo == object;
    }
};
function isinstance (anObject, classinfo) {
    try {
        return '__class__' in anObject ? issubclass (anObject.__class__, classinfo) : issubclass (py_typeof (anObject), classinfo);
    }
    catch (exception) {
        return issubclass (py_typeof (anObject), classinfo);
    }
};
function callable (anObject) {
    return anObject && typeof anObject == 'object' && '__call__' in anObject ? true : typeof anObject === 'function';
};
function repr (anObject) {
    try {
        return anObject.__repr__ ();
    }
    catch (exception) {
        try {
            return anObject.__str__ ();
        }
        catch (exception) {
            try {
                if (anObject == null) {
                    return 'None';
                }
                else if (anObject.constructor == Object) {
                    var result = '{';
                    var comma = false;
                    for (var attrib in anObject) {
                        if (!__specialattrib__ (attrib)) {
                            if (attrib.isnumeric ()) {
                                var attribRepr = attrib;
                            }
                            else {
                                var attribRepr = '\'' + attrib + '\'';
                            }
                            if (comma) {
                                result += ', ';
                            }
                            else {
                                comma = true;
                            }
                            result += attribRepr + ': ' + repr (anObject [attrib]);
                        }
                    }
                    result += '}';
                    return result;
                }
                else {
                    return typeof anObject == 'boolean' ? anObject.toString () .capitalize () : anObject.toString ();
                }
            }
            catch (exception) {
                return '<object of type: ' + typeof anObject + '>';
            }
        }
    }
};
function chr (charCode) {
    return String.fromCharCode (charCode);
};
function ord (aChar) {
    return aChar.charCodeAt (0);
};
function max (nrOrSeq) {
    return arguments.length == 1 ? Math.max (...nrOrSeq) : Math.max (...arguments);
};
function min (nrOrSeq) {
    return arguments.length == 1 ? Math.min (...nrOrSeq) : Math.min (...arguments);
};
var abs = Math.abs;
function round (number, ndigits) {
    if (ndigits) {
        var scale = Math.pow (10, ndigits);
        number *= scale;
    }
    var rounded = Math.round (number);
    if (rounded - number == 0.5 && rounded % 2) {
        rounded -= 1;
    }
    if (ndigits) {
        rounded /= scale;
    }
    return rounded;
};
function __jsUsePyNext__ () {
    try {
        var result = this.__next__ ();
        return {value: result, done: false};
    }
    catch (exception) {
        return {value: undefined, done: true};
    }
}
function __pyUseJsNext__ () {
    var result = this.next ();
    if (result.done) {
        throw StopIteration (new Error ());
    }
    else {
        return result.value;
    }
}
function py_iter (iterable) {
    if (typeof iterable == 'string' || '__iter__' in iterable) {
        var result = iterable.__iter__ ();
        result.next = __jsUsePyNext__;
    }
    else if ('selector' in iterable) {
        var result = list (iterable) .__iter__ ();
        result.next = __jsUsePyNext__;
    }
    else if ('next' in iterable) {
        var result = iterable
        if (! ('__next__' in result)) {
            result.__next__ = __pyUseJsNext__;
        }
    }
    else if (Symbol.iterator in iterable) {
        var result = iterable [Symbol.iterator] ();
        result.__next__ = __pyUseJsNext__;
    }
    else {
        throw IterableError (new Error ());
    }
    result [Symbol.iterator] = function () {return result;};
    return result;
}
function py_next (iterator) {
    try {
        var result = iterator.__next__ ();
    }
    catch (exception) {
        var result = iterator.next ();
        if (result.done) {
            throw StopIteration (new Error ());
        }
        else {
            return result.value;
        }
    }
    if (result == undefined) {
        throw StopIteration (new Error ());
    }
    else {
        return result;
    }
}
function __PyIterator__ (iterable) {
    this.iterable = iterable;
    this.index = 0;
}
__PyIterator__.prototype.__next__ = function() {
    if (this.index < this.iterable.length) {
        return this.iterable [this.index++];
    }
    else {
        throw StopIteration (new Error ());
    }
};
function __JsIterator__ (iterable) {
    this.iterable = iterable;
    this.index = 0;
}
__JsIterator__.prototype.next = function () {
    if (this.index < this.iterable.py_keys.length) {
        return {value: this.index++, done: false};
    }
    else {
        return {value: undefined, done: true};
    }
};
function py_reversed (iterable) {
    iterable = iterable.slice ();
    iterable.reverse ();
    return iterable;
};
function zip () {
    var args = [] .slice.call (arguments);
    for (var i = 0; i < args.length; i++) {
        if (typeof args [i] == 'string') {
            args [i] = args [i] .split ('');
        }
        else if (!Array.isArray (args [i])) {
            args [i] = Array.from (args [i]);
        }
    }
    var shortest = args.length == 0 ? [] : args.reduce (
        function (array0, array1) {
            return array0.length < array1.length ? array0 : array1;
        }
    );
    return shortest.map (
        function (current, index) {
            return args.map (
                function (current) {
                    return current [index];
                }
            );
        }
    );
};
function range (start, stop, step) {
    if (stop == undefined) {
        stop = start;
        start = 0;
    }
    if (step == undefined) {
        step = 1;
    }
    if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
        return [];
    }
    var result = [];
    for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
        result.push(i);
    }
    return result;
};
function any (iterable) {
    for (let item of iterable) {
        if (bool (item)) {
            return true;
        }
    }
    return false;
}
function org_transcrypt_runtime_all (iterable) {
    for (let item of iterable) {
        if (! bool (item)) {
            return false;
        }
    }
    return true;
}
function sum (iterable) {
    let result = 0;
    for (let item of iterable) {
        result += item;
    }
    return result;
}
function enumerate (iterable) {
    return zip (range (len (iterable)), iterable);
}
function copy (anObject) {
    if (anObject == null || typeof anObject == "object") {
        return anObject;
    }
    else {
        var result = {};
        for (var attrib in obj) {
            if (anObject.hasOwnProperty (attrib)) {
                result [attrib] = anObject [attrib];
            }
        }
        return result;
    }
}
function deepcopy (anObject) {
    if (anObject == null || typeof anObject == "object") {
        return anObject;
    }
    else {
        var result = {};
        for (var attrib in obj) {
            if (anObject.hasOwnProperty (attrib)) {
                result [attrib] = deepcopy (anObject [attrib]);
            }
        }
        return result;
    }
}
function list (iterable) {
    let instance = iterable ? Array.from (iterable) : [];
    return instance;
}
Array.prototype.__class__ = list;
list.__name__ = 'list';
list.__bases__ = [object];
Array.prototype.__iter__ = function () {return new __PyIterator__ (this);};
Array.prototype.__getslice__ = function (start, stop, step) {
    if (start < 0) {
        start = this.length + start;
    }
    if (stop == null) {
        stop = this.length;
    }
    else if (stop < 0) {
        stop = this.length + stop;
    }
    else if (stop > this.length) {
        stop = this.length;
    }
    let result = list ([]);
    for (let index = start; index < stop; index += step) {
        result.push (this [index]);
    }
    return result;
};
Array.prototype.__setslice__ = function (start, stop, step, source) {
    if (start < 0) {
        start = this.length + start;
    }
    if (stop == null) {
        stop = this.length;
    }
    else if (stop < 0) {
        stop = this.length + stop;
    }
    if (step == null) {
        Array.prototype.splice.apply (this, [start, stop - start] .concat (source));
    }
    else {
        let sourceIndex = 0;
        for (let targetIndex = start; targetIndex < stop; targetIndex += step) {
            this [targetIndex] = source [sourceIndex++];
        }
    }
};
Array.prototype.__repr__ = function () {
    if (this.__class__ == set && !this.length) {
        return 'set()';
    }
    let result = !this.__class__ || this.__class__ == list ? '[' : this.__class__ == tuple ? '(' : '{';
    for (let index = 0; index < this.length; index++) {
        if (index) {
            result += ', ';
        }
        result += repr (this [index]);
    }
    if (this.__class__ == tuple && this.length == 1) {
        result += ',';
    }
    result += !this.__class__ || this.__class__ == list ? ']' : this.__class__ == tuple ? ')' : '}';;
    return result;
};
Array.prototype.__str__ = Array.prototype.__repr__;
Array.prototype.append = function (element) {
    this.push (element);
};
Array.prototype.py_clear = function () {
    this.length = 0;
};
Array.prototype.extend = function (aList) {
    this.push.apply (this, aList);
};
Array.prototype.insert = function (index, element) {
    this.splice (index, 0, element);
};
Array.prototype.remove = function (element) {
    let index = this.indexOf (element);
    if (index == -1) {
        throw ValueError ("list.remove(x): x not in list", new Error ());
    }
    this.splice (index, 1);
};
Array.prototype.index = function (element) {
    return this.indexOf (element);
};
Array.prototype.py_pop = function (index) {
    if (index == undefined) {
        return this.pop ();
    }
    else {
        return this.splice (index, 1) [0];
    }
};
Array.prototype.py_sort = function () {
    __sort__.apply  (null, [this].concat ([] .slice.apply (arguments)));
};
Array.prototype.__add__ = function (aList) {
    return list (this.concat (aList));
};
Array.prototype.__mul__ = function (scalar) {
    let result = this;
    for (let i = 1; i < scalar; i++) {
        result = result.concat (this);
    }
    return result;
};
Array.prototype.__rmul__ = Array.prototype.__mul__;
function tuple (iterable) {
    let instance = iterable ? [] .slice.apply (iterable) : [];
    instance.__class__ = tuple;
    return instance;
}
tuple.__name__ = 'tuple';
tuple.__bases__ = [object];
function set (iterable) {
    let instance = [];
    if (iterable) {
        for (let index = 0; index < iterable.length; index++) {
            instance.add (iterable [index]);
        }
    }
    instance.__class__ = set;
    return instance;
}
set.__name__ = 'set';
set.__bases__ = [object];
Array.prototype.__bindexOf__ = function (element) {
    element += '';
    let mindex = 0;
    let maxdex = this.length - 1;
    while (mindex <= maxdex) {
        let index = (mindex + maxdex) / 2 | 0;
        let middle = this [index] + '';
        if (middle < element) {
            mindex = index + 1;
        }
        else if (middle > element) {
            maxdex = index - 1;
        }
        else {
            return index;
        }
    }
    return -1;
};
Array.prototype.add = function (element) {
    if (this.indexOf (element) == -1) {
        this.push (element);
    }
};
Array.prototype.discard = function (element) {
    var index = this.indexOf (element);
    if (index != -1) {
        this.splice (index, 1);
    }
};
Array.prototype.isdisjoint = function (other) {
    this.sort ();
    for (let i = 0; i < other.length; i++) {
        if (this.__bindexOf__ (other [i]) != -1) {
            return false;
        }
    }
    return true;
};
Array.prototype.issuperset = function (other) {
    this.sort ();
    for (let i = 0; i < other.length; i++) {
        if (this.__bindexOf__ (other [i]) == -1) {
            return false;
        }
    }
    return true;
};
Array.prototype.issubset = function (other) {
    return set (other.slice ()) .issuperset (this);
};
Array.prototype.union = function (other) {
    let result = set (this.slice () .sort ());
    for (let i = 0; i < other.length; i++) {
        if (result.__bindexOf__ (other [i]) == -1) {
            result.push (other [i]);
        }
    }
    return result;
};
Array.prototype.intersection = function (other) {
    this.sort ();
    let result = set ();
    for (let i = 0; i < other.length; i++) {
        if (this.__bindexOf__ (other [i]) != -1) {
            result.push (other [i]);
        }
    }
    return result;
};
Array.prototype.difference = function (other) {
    let sother = set (other.slice () .sort ());
    let result = set ();
    for (let i = 0; i < this.length; i++) {
        if (sother.__bindexOf__ (this [i]) == -1) {
            result.push (this [i]);
        }
    }
    return result;
};
Array.prototype.symmetric_difference = function (other) {
    return this.union (other) .difference (this.intersection (other));
};
Array.prototype.py_update = function () {
    let updated = [] .concat.apply (this.slice (), arguments) .sort ();
    this.py_clear ();
    for (let i = 0; i < updated.length; i++) {
        if (updated [i] != updated [i - 1]) {
            this.push (updated [i]);
        }
    }
};
Array.prototype.__eq__ = function (other) {
    if (this.length != other.length) {
        return false;
    }
    if (this.__class__ == set) {
        this.sort ();
        other.sort ();
    }
    for (let i = 0; i < this.length; i++) {
        if (this [i] != other [i]) {
            return false;
        }
    }
    return true;
};
Array.prototype.__ne__ = function (other) {
    return !this.__eq__ (other);
};
Array.prototype.__le__ = function (other) {
    if (this.__class__ == set) {
        return this.issubset (other);
    }
    else {
        for (let i = 0; i < this.length; i++) {
            if (this [i] > other [i]) {
                return false;
            }
            else if (this [i] < other [i]) {
                return true;
            }
        }
        return true;
    }
};
Array.prototype.__ge__ = function (other) {
    if (this.__class__ == set) {
        return this.issuperset (other);
    }
    else {
        for (let i = 0; i < this.length; i++) {
            if (this [i] < other [i]) {
                return false;
            }
            else if (this [i] > other [i]) {
                return true;
            }
        }
        return true;
    }
};
Array.prototype.__lt__ = function (other) {
    return (
        this.__class__ == set ?
        this.issubset (other) && !this.issuperset (other) :
        !this.__ge__ (other)
    );
};
Array.prototype.__gt__ = function (other) {
    return (
        this.__class__ == set ?
        this.issuperset (other) && !this.issubset (other) :
        !this.__le__ (other)
    );
};
function bytearray (bytable, encoding) {
    if (bytable == undefined) {
        return new Uint8Array (0);
    }
    else {
        let aType = py_typeof (bytable);
        if (aType == org_transcrypt_runtime_int) {
            return new Uint8Array (bytable);
        }
        else if (aType == str) {
            let aBytes = new Uint8Array (len (bytable));
            for (let i = 0; i < len (bytable); i++) {
                aBytes [i] = bytable.charCodeAt (i);
            }
            return aBytes;
        }
        else if (aType == list || aType == tuple) {
            return new Uint8Array (bytable);
        }
        else {
            throw py_TypeError;
        }
    }
}
var bytes = bytearray;
Uint8Array.prototype.__add__ = function (aBytes) {
    let result = new Uint8Array (this.length + aBytes.length);
    result.set (this);
    result.set (aBytes, this.length);
    return result;
};
Uint8Array.prototype.__mul__ = function (scalar) {
    let result = new Uint8Array (scalar * this.length);
    for (let i = 0; i < scalar; i++) {
        result.set (this, i * this.length);
    }
    return result;
};
Uint8Array.prototype.__rmul__ = Uint8Array.prototype.__mul__;
function str (stringable) {
    if (typeof stringable === 'number')
        return stringable.toString();
    else {
        try {
            return stringable.__str__ ();
        }
        catch (exception) {
            try {
                return repr (stringable);
            }
            catch (exception) {
                return String (stringable);
            }
        }
    }
};
String.prototype.__class__ = str;
str.__name__ = 'str';
str.__bases__ = [object];
String.prototype.__iter__ = function () {new __PyIterator__ (this);};
String.prototype.__repr__ = function () {
    return (this.indexOf ('\'') == -1 ? '\'' + this + '\'' : '"' + this + '"') .py_replace ('\t', '\\t') .py_replace ('\n', '\\n');
};
String.prototype.__str__ = function () {
    return this;
};
String.prototype.capitalize = function () {
    return this.charAt (0).toUpperCase () + this.slice (1);
};
String.prototype.endswith = function (suffix) {
    if (suffix instanceof Array) {
        for (var i=0;i<suffix.length;i++) {
            if (this.slice (-suffix[i].length) == suffix[i])
                return true;
        }
    } else
        return suffix == '' || this.slice (-suffix.length) == suffix;
    return false;
};
String.prototype.find = function (sub, start) {
    return this.indexOf (sub, start);
};
String.prototype.__getslice__ = function (start, stop, step) {
    if (start < 0) {
        start = this.length + start;
    }
    if (stop == null) {
        stop = this.length;
    }
    else if (stop < 0) {
        stop = this.length + stop;
    }
    var result = '';
    if (step == 1) {
        result = this.substring (start, stop);
    }
    else {
        for (var index = start; index < stop; index += step) {
            result = result.concat (this.charAt(index));
        }
    }
    return result;
};
__setproperty__ (String.prototype, 'format', {
    get: function () {return __get__ (this, function (self) {
        var args = tuple ([] .slice.apply (arguments).slice (1));
        var autoIndex = 0;
        return self.replace (/\{(\w*)\}/g, function (match, key) {
            if (key == '') {
                key = autoIndex++;
            }
            if (key == +key) {
                return args [key] == undefined ? match : str (args [key]);
            }
            else {
                for (var index = 0; index < args.length; index++) {
                    if (typeof args [index] == 'object' && args [index][key] != undefined) {
                        return str (args [index][key]);
                    }
                }
                return match;
            }
        });
    });},
    enumerable: true
});
String.prototype.isalnum = function () {
    return /^[0-9a-zA-Z]{1,}$/.test(this)
}
String.prototype.isalpha = function () {
    return /^[a-zA-Z]{1,}$/.test(this)
}
String.prototype.isdecimal = function () {
    return /^[0-9]{1,}$/.test(this)
}
String.prototype.isdigit = function () {
    return this.isdecimal()
}
String.prototype.islower = function () {
    return /^[a-z]{1,}$/.test(this)
}
String.prototype.isupper = function () {
    return /^[A-Z]{1,}$/.test(this)
}
String.prototype.isspace = function () {
    return /^[\s]{1,}$/.test(this)
}
String.prototype.isnumeric = function () {
    return !isNaN (parseFloat (this)) && isFinite (this);
};
String.prototype.join = function (strings) {
    strings = Array.from (strings);
    return strings.join (this);
};
String.prototype.lower = function () {
    return this.toLowerCase ();
};
String.prototype.py_replace = function (old, aNew, maxreplace) {
    return this.split (old, maxreplace) .join (aNew);
};
String.prototype.lstrip = function () {
    return this.replace (/^\s*/g, '');
};
String.prototype.rfind = function (sub, start) {
    return this.lastIndexOf (sub, start);
};
String.prototype.rsplit = function (sep, maxsplit) {
    if (sep == undefined || sep == null) {
        sep = /\s+/;
        var stripped = this.strip ();
    }
    else {
        var stripped = this;
    }
    if (maxsplit == undefined || maxsplit == -1) {
        return stripped.split (sep);
    }
    else {
        var result = stripped.split (sep);
        if (maxsplit < result.length) {
            var maxrsplit = result.length - maxsplit;
            return [result.slice (0, maxrsplit) .join (sep)] .concat (result.slice (maxrsplit));
        }
        else {
            return result;
        }
    }
};
String.prototype.rstrip = function () {
    return this.replace (/\s*$/g, '');
};
String.prototype.py_split = function (sep, maxsplit) {
    if (sep == undefined || sep == null) {
        sep = /\s+/;
        var stripped = this.strip ();
    }
    else {
        var stripped = this;
    }
    if (maxsplit == undefined || maxsplit == -1) {
        return stripped.split (sep);
    }
    else {
        var result = stripped.split (sep);
        if (maxsplit < result.length) {
            return result.slice (0, maxsplit).concat ([result.slice (maxsplit).join (sep)]);
        }
        else {
            return result;
        }
    }
};
String.prototype.startswith = function (prefix) {
    if (prefix instanceof Array) {
        for (var i=0;i<prefix.length;i++) {
            if (this.indexOf (prefix [i]) == 0)
                return true;
        }
    } else
        return this.indexOf (prefix) == 0;
    return false;
};
String.prototype.strip = function () {
    return this.trim ();
};
String.prototype.upper = function () {
    return this.toUpperCase ();
};
String.prototype.__mul__ = function (scalar) {
    var result = '';
    for (var i = 0; i < scalar; i++) {
        result = result + this;
    }
    return result;
};
String.prototype.__rmul__ = String.prototype.__mul__;
function __contains__ (element) {
    return this.hasOwnProperty (element);
}
function __keys__ () {
    var keys = [];
    for (var attrib in this) {
        if (!__specialattrib__ (attrib)) {
            keys.push (attrib);
        }
    }
    return keys;
}
function __items__ () {
    var items = [];
    for (var attrib in this) {
        if (!__specialattrib__ (attrib)) {
            items.push ([attrib, this [attrib]]);
        }
    }
    return items;
}
function __del__ (key) {
    delete this [key];
}
function __clear__ () {
    for (var attrib in this) {
        delete this [attrib];
    }
}
function __getdefault__ (aKey, aDefault) {
    var result = this [aKey];
    if (result == undefined) {
        result = this ['py_' + aKey]
    }
    return result == undefined ? (aDefault == undefined ? null : aDefault) : result;
}
function __setdefault__ (aKey, aDefault) {
    var result = this [aKey];
    if (result != undefined) {
        return result;
    }
    var val = aDefault == undefined ? null : aDefault;
    this [aKey] = val;
    return val;
}
function __pop__ (aKey, aDefault) {
    var result = this [aKey];
    if (result != undefined) {
        delete this [aKey];
        return result;
    } else {
        if ( aDefault === undefined ) {
            throw KeyError (aKey, new Error());
        }
    }
    return aDefault;
}
function __popitem__ () {
    var aKey = Object.keys (this) [0];
    if (aKey == null) {
        throw KeyError ("popitem(): dictionary is empty", new Error ());
    }
    var result = tuple ([aKey, this [aKey]]);
    delete this [aKey];
    return result;
}
function __update__ (aDict) {
    for (var aKey in aDict) {
        this [aKey] = aDict [aKey];
    }
}
function __values__ () {
    var values = [];
    for (var attrib in this) {
        if (!__specialattrib__ (attrib)) {
            values.push (this [attrib]);
        }
    }
    return values;
}
function __dgetitem__ (aKey) {
    return this [aKey];
}
function __dsetitem__ (aKey, aValue) {
    this [aKey] = aValue;
}
function dict (objectOrPairs) {
    var instance = {};
    if (!objectOrPairs || objectOrPairs instanceof Array) {
        if (objectOrPairs) {
            for (var index = 0; index < objectOrPairs.length; index++) {
                var pair = objectOrPairs [index];
                if ( !(pair instanceof Array) || pair.length != 2) {
                    throw ValueError(
                        "dict update sequence element #" + index +
                        " has length " + pair.length +
                        "; 2 is required", new Error());
                }
                var key = pair [0];
                var val = pair [1];
                if (!(objectOrPairs instanceof Array) && objectOrPairs instanceof Object) {
                     if (!isinstance (objectOrPairs, dict)) {
                         val = dict (val);
                     }
                }
                instance [key] = val;
            }
        }
    }
    else {
        if (isinstance (objectOrPairs, dict)) {
            var aKeys = objectOrPairs.py_keys ();
            for (var index = 0; index < aKeys.length; index++ ) {
                var key = aKeys [index];
                instance [key] = objectOrPairs [key];
            }
        } else if (objectOrPairs instanceof Object) {
            instance = objectOrPairs;
        } else {
            throw ValueError ("Invalid type of object for dict creation", new Error ());
        }
    }
    __setproperty__ (instance, '__class__', {value: dict, enumerable: false, writable: true});
    __setproperty__ (instance, '__contains__', {value: __contains__, enumerable: false});
    __setproperty__ (instance, 'py_keys', {value: __keys__, enumerable: false});
    __setproperty__ (instance, '__iter__', {value: function () {new __PyIterator__ (this.py_keys ());}, enumerable: false});
    __setproperty__ (instance, Symbol.iterator, {value: function () {new __JsIterator__ (this.py_keys ());}, enumerable: false});
    __setproperty__ (instance, 'py_items', {value: __items__, enumerable: false});
    __setproperty__ (instance, 'py_del', {value: __del__, enumerable: false});
    __setproperty__ (instance, 'py_clear', {value: __clear__, enumerable: false});
    __setproperty__ (instance, 'py_get', {value: __getdefault__, enumerable: false});
    __setproperty__ (instance, 'py_setdefault', {value: __setdefault__, enumerable: false});
    __setproperty__ (instance, 'py_pop', {value: __pop__, enumerable: false});
    __setproperty__ (instance, 'py_popitem', {value: __popitem__, enumerable: false});
    __setproperty__ (instance, 'py_update', {value: __update__, enumerable: false});
    __setproperty__ (instance, 'py_values', {value: __values__, enumerable: false});
    __setproperty__ (instance, '__getitem__', {value: __dgetitem__, enumerable: false});
    __setproperty__ (instance, '__setitem__', {value: __dsetitem__, enumerable: false});
    return instance;
}
dict.__name__ = 'dict';
dict.__bases__ = [object];
function __setdoc__ (docString) {
    this.__doc__ = docString;
    return this;
}
__setproperty__ (Function.prototype, '__setdoc__', {value: __setdoc__, enumerable: false});
function __jsmod__ (a, b) {
    if (typeof a == 'object' && '__mod__' in a) {
        return a.__mod__ (b);
    }
    else if (typeof b == 'object' && '__rmod__' in b) {
        return b.__rmod__ (a);
    }
    else {
        return a % b;
    }
};
function __mod__ (a, b) {
    if (typeof a == 'object' && '__mod__' in a) {
        return a.__mod__ (b);
    }
    else if (typeof b == 'object' && '__rmod__' in b) {
        return b.__rmod__ (a);
    }
    else {
        return ((a % b) + b) % b;
    }
};
function __pow__ (a, b) {
    if (typeof a == 'object' && '__pow__' in a) {
        return a.__pow__ (b);
    }
    else if (typeof b == 'object' && '__rpow__' in b) {
        return b.__rpow__ (a);
    }
    else {
        return Math.pow (a, b);
    }
};
var pow = __pow__;
function __neg__ (a) {
    if (typeof a == 'object' && '__neg__' in a) {
        return a.__neg__ ();
    }
    else {
        return -a;
    }
};
function __matmul__ (a, b) {
    return a.__matmul__ (b);
};
function __mul__ (a, b) {
    if (typeof a == 'object' && '__mul__' in a) {
        return a.__mul__ (b);
    }
    else if (typeof b == 'object' && '__rmul__' in b) {
        return b.__rmul__ (a);
    }
    else if (typeof a == 'string') {
        return a.__mul__ (b);
    }
    else if (typeof b == 'string') {
        return b.__rmul__ (a);
    }
    else {
        return a * b;
    }
};
function __truediv__ (a, b) {
    if (typeof a == 'object' && '__truediv__' in a) {
        return a.__truediv__ (b);
    }
    else if (typeof b == 'object' && '__rtruediv__' in b) {
        return b.__rtruediv__ (a);
    }
    else if (typeof a == 'object' && '__div__' in a) {
        return a.__div__ (b);
    }
    else if (typeof b == 'object' && '__rdiv__' in b) {
        return b.__rdiv__ (a);
    }
    else {
        return a / b;
    }
};
function __floordiv__ (a, b) {
    if (typeof a == 'object' && '__floordiv__' in a) {
        return a.__floordiv__ (b);
    }
    else if (typeof b == 'object' && '__rfloordiv__' in b) {
        return b.__rfloordiv__ (a);
    }
    else if (typeof a == 'object' && '__div__' in a) {
        return a.__div__ (b);
    }
    else if (typeof b == 'object' && '__rdiv__' in b) {
        return b.__rdiv__ (a);
    }
    else {
        return Math.floor (a / b);
    }
};
function __add__ (a, b) {
    if (typeof a == 'object' && '__add__' in a) {
        return a.__add__ (b);
    }
    else if (typeof b == 'object' && '__radd__' in b) {
        return b.__radd__ (a);
    }
    else {
        return a + b;
    }
};
function __sub__ (a, b) {
    if (typeof a == 'object' && '__sub__' in a) {
        return a.__sub__ (b);
    }
    else if (typeof b == 'object' && '__rsub__' in b) {
        return b.__rsub__ (a);
    }
    else {
        return a - b;
    }
};
function __lshift__ (a, b) {
    if (typeof a == 'object' && '__lshift__' in a) {
        return a.__lshift__ (b);
    }
    else if (typeof b == 'object' && '__rlshift__' in b) {
        return b.__rlshift__ (a);
    }
    else {
        return a << b;
    }
};
function __rshift__ (a, b) {
    if (typeof a == 'object' && '__rshift__' in a) {
        return a.__rshift__ (b);
    }
    else if (typeof b == 'object' && '__rrshift__' in b) {
        return b.__rrshift__ (a);
    }
    else {
        return a >> b;
    }
};
function __or__ (a, b) {
    if (typeof a == 'object' && '__or__' in a) {
        return a.__or__ (b);
    }
    else if (typeof b == 'object' && '__ror__' in b) {
        return b.__ror__ (a);
    }
    else {
        return a | b;
    }
};
function __xor__ (a, b) {
    if (typeof a == 'object' && '__xor__' in a) {
        return a.__xor__ (b);
    }
    else if (typeof b == 'object' && '__rxor__' in b) {
        return b.__rxor__ (a);
    }
    else {
        return a ^ b;
    }
};
function __and__ (a, b) {
    if (typeof a == 'object' && '__and__' in a) {
        return a.__and__ (b);
    }
    else if (typeof b == 'object' && '__rand__' in b) {
        return b.__rand__ (a);
    }
    else {
        return a & b;
    }
};
function __eq__ (a, b) {
    if (typeof a == 'object' && '__eq__' in a) {
        return a.__eq__ (b);
    }
    else {
        return a == b;
    }
};
function __ne__ (a, b) {
    if (typeof a == 'object' && '__ne__' in a) {
        return a.__ne__ (b);
    }
    else {
        return a != b
    }
};
function __lt__ (a, b) {
    if (typeof a == 'object' && '__lt__' in a) {
        return a.__lt__ (b);
    }
    else {
        return a < b;
    }
};
function __le__ (a, b) {
    if (typeof a == 'object' && '__le__' in a) {
        return a.__le__ (b);
    }
    else {
        return a <= b;
    }
};
function __gt__ (a, b) {
    if (typeof a == 'object' && '__gt__' in a) {
        return a.__gt__ (b);
    }
    else {
        return a > b;
    }
};
function __ge__ (a, b) {
    if (typeof a == 'object' && '__ge__' in a) {
        return a.__ge__ (b);
    }
    else {
        return a >= b;
    }
};
function __imatmul__ (a, b) {
    if ('__imatmul__' in a) {
        return a.__imatmul__ (b);
    }
    else {
        return a.__matmul__ (b);
    }
};
function __ipow__ (a, b) {
    if (typeof a == 'object' && '__pow__' in a) {
        return a.__ipow__ (b);
    }
    else if (typeof a == 'object' && '__ipow__' in a) {
        return a.__pow__ (b);
    }
    else if (typeof b == 'object' && '__rpow__' in b) {
        return b.__rpow__ (a);
    }
    else {
        return Math.pow (a, b);
    }
};
function __ijsmod__ (a, b) {
    if (typeof a == 'object' && '__imod__' in a) {
        return a.__ismod__ (b);
    }
    else if (typeof a == 'object' && '__mod__' in a) {
        return a.__mod__ (b);
    }
    else if (typeof b == 'object' && '__rpow__' in b) {
        return b.__rmod__ (a);
    }
    else {
        return a % b;
    }
};
function __imod__ (a, b) {
    if (typeof a == 'object' && '__imod__' in a) {
        return a.__imod__ (b);
    }
    else if (typeof a == 'object' && '__mod__' in a) {
        return a.__mod__ (b);
    }
    else if (typeof b == 'object' && '__rmod__' in b) {
        return b.__rmod__ (a);
    }
    else {
        return ((a % b) + b) % b;
    }
};
function __imul__ (a, b) {
    if (typeof a == 'object' && '__imul__' in a) {
        return a.__imul__ (b);
    }
    else if (typeof a == 'object' && '__mul__' in a) {
        return a = a.__mul__ (b);
    }
    else if (typeof b == 'object' && '__rmul__' in b) {
        return a = b.__rmul__ (a);
    }
    else if (typeof a == 'string') {
        return a = a.__mul__ (b);
    }
    else if (typeof b == 'string') {
        return a = b.__rmul__ (a);
    }
    else {
        return a *= b;
    }
};
function __idiv__ (a, b) {
    if (typeof a == 'object' && '__idiv__' in a) {
        return a.__idiv__ (b);
    }
    else if (typeof a == 'object' && '__div__' in a) {
        return a = a.__div__ (b);
    }
    else if (typeof b == 'object' && '__rdiv__' in b) {
        return a = b.__rdiv__ (a);
    }
    else {
        return a /= b;
    }
};
function __iadd__ (a, b) {
    if (typeof a == 'object' && '__iadd__' in a) {
        return a.__iadd__ (b);
    }
    else if (typeof a == 'object' && '__add__' in a) {
        return a = a.__add__ (b);
    }
    else if (typeof b == 'object' && '__radd__' in b) {
        return a = b.__radd__ (a);
    }
    else {
        return a += b;
    }
};
function __isub__ (a, b) {
    if (typeof a == 'object' && '__isub__' in a) {
        return a.__isub__ (b);
    }
    else if (typeof a == 'object' && '__sub__' in a) {
        return a = a.__sub__ (b);
    }
    else if (typeof b == 'object' && '__rsub__' in b) {
        return a = b.__rsub__ (a);
    }
    else {
        return a -= b;
    }
};
function __ilshift__ (a, b) {
    if (typeof a == 'object' && '__ilshift__' in a) {
        return a.__ilshift__ (b);
    }
    else if (typeof a == 'object' && '__lshift__' in a) {
        return a = a.__lshift__ (b);
    }
    else if (typeof b == 'object' && '__rlshift__' in b) {
        return a = b.__rlshift__ (a);
    }
    else {
        return a <<= b;
    }
};
function __irshift__ (a, b) {
    if (typeof a == 'object' && '__irshift__' in a) {
        return a.__irshift__ (b);
    }
    else if (typeof a == 'object' && '__rshift__' in a) {
        return a = a.__rshift__ (b);
    }
    else if (typeof b == 'object' && '__rrshift__' in b) {
        return a = b.__rrshift__ (a);
    }
    else {
        return a >>= b;
    }
};
function __ior__ (a, b) {
    if (typeof a == 'object' && '__ior__' in a) {
        return a.__ior__ (b);
    }
    else if (typeof a == 'object' && '__or__' in a) {
        return a = a.__or__ (b);
    }
    else if (typeof b == 'object' && '__ror__' in b) {
        return a = b.__ror__ (a);
    }
    else {
        return a |= b;
    }
};
function __ixor__ (a, b) {
    if (typeof a == 'object' && '__ixor__' in a) {
        return a.__ixor__ (b);
    }
    else if (typeof a == 'object' && '__xor__' in a) {
        return a = a.__xor__ (b);
    }
    else if (typeof b == 'object' && '__rxor__' in b) {
        return a = b.__rxor__ (a);
    }
    else {
        return a ^= b;
    }
};
function __iand__ (a, b) {
    if (typeof a == 'object' && '__iand__' in a) {
        return a.__iand__ (b);
    }
    else if (typeof a == 'object' && '__and__' in a) {
        return a = a.__and__ (b);
    }
    else if (typeof b == 'object' && '__rand__' in b) {
        return a = b.__rand__ (a);
    }
    else {
        return a &= b;
    }
};
function __getitem__ (container, key) {
    if (typeof container == 'object' && '__getitem__' in container) {
        return container.__getitem__ (key);
    }
    else if ((typeof container == 'string' || container instanceof Array) && key < 0) {
        return container [container.length + key];
    }
    else {
        return container [key];
    }
};
function __setitem__ (container, key, value) {
    if (typeof container == 'object' && '__setitem__' in container) {
        container.__setitem__ (key, value);
    }
    else if ((typeof container == 'string' || container instanceof Array) && key < 0) {
        container [container.length + key] = value;
    }
    else {
        container [key] = value;
    }
};
function __getslice__ (container, lower, upper, step) {
    if (typeof container == 'object' && '__getitem__' in container) {
        return container.__getitem__ ([lower, upper, step]);
    }
    else {
        return container.__getslice__ (lower, upper, step);
    }
};
function __setslice__ (container, lower, upper, step, value) {
    if (typeof container == 'object' && '__setitem__' in container) {
        container.__setitem__ ([lower, upper, step], value);
    }
    else {
        container.__setslice__ (lower, upper, step, value);
    }
};
var BaseException =  __class__ ('BaseException', [object], {
	__module__: __name__,
});
var Exception =  __class__ ('Exception', [BaseException], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		var kwargs = dict ();
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						default: kwargs [__attrib0__] = __allkwargs0__ [__attrib0__];
					}
				}
				delete kwargs.__kwargtrans__;
			}
			var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		self.__args__ = args;
		try {
			self.stack = kwargs.error.stack;
		}
		catch (__except0__) {
			self.stack = 'No stack trace available';
		}
	});},
	get __repr__ () {return __get__ (this, function (self) {
		if (len (self.__args__) > 1) {
			return '{}{}'.format (self.__class__.__name__, repr (tuple (self.__args__)));
		}
		else if (len (self.__args__)) {
			return '{}({})'.format (self.__class__.__name__, repr (self.__args__ [0]));
		}
		else {
			return '{}()'.format (self.__class__.__name__);
		}
	});},
	get __str__ () {return __get__ (this, function (self) {
		if (len (self.__args__) > 1) {
			return str (tuple (self.__args__));
		}
		else if (len (self.__args__)) {
			return str (self.__args__ [0]);
		}
		else {
			return '';
		}
	});}
});
var IterableError =  __class__ ('IterableError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, error) {
		Exception.__init__ (self, "Can't iterate over non-iterable", __kwargtrans__ ({error: error}));
	});}
});
var StopIteration =  __class__ ('StopIteration', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, error) {
		Exception.__init__ (self, 'Iterator exhausted', __kwargtrans__ ({error: error}));
	});}
});
var ValueError =  __class__ ('ValueError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
var KeyError =  __class__ ('KeyError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
var AssertionError =  __class__ ('AssertionError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		if (message) {
			Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
		}
		else {
			Exception.__init__ (self, __kwargtrans__ ({error: error}));
		}
	});}
});
var NotImplementedError =  __class__ ('NotImplementedError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
var IndexError =  __class__ ('IndexError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
var AttributeError =  __class__ ('AttributeError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
var py_TypeError =  __class__ ('py_TypeError', [Exception], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, message, error) {
		Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
	});}
});
var Warning =  __class__ ('Warning', [Exception], {
	__module__: __name__,
});
var UserWarning =  __class__ ('UserWarning', [Warning], {
	__module__: __name__,
});
var DeprecationWarning =  __class__ ('DeprecationWarning', [Warning], {
	__module__: __name__,
});
var RuntimeWarning =  __class__ ('RuntimeWarning', [Warning], {
	__module__: __name__,
});
var __sort__ = function (iterable, key, reverse) {
	if (typeof key == 'undefined' || (key != null && key.hasOwnProperty ("__kwargtrans__"))) {;
		var key = null;
	};
	if (typeof reverse == 'undefined' || (reverse != null && reverse.hasOwnProperty ("__kwargtrans__"))) {;
		var reverse = false;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'iterable': var iterable = __allkwargs0__ [__attrib0__]; break;
					case 'key': var key = __allkwargs0__ [__attrib0__]; break;
					case 'reverse': var reverse = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (key) {
		iterable.sort ((function __lambda__ (a, b) {
			if (arguments.length) {
				var __ilastarg0__ = arguments.length - 1;
				if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
					var __allkwargs0__ = arguments [__ilastarg0__--];
					for (var __attrib0__ in __allkwargs0__) {
						switch (__attrib0__) {
							case 'a': var a = __allkwargs0__ [__attrib0__]; break;
							case 'b': var b = __allkwargs0__ [__attrib0__]; break;
						}
					}
				}
			}
			else {
			}
			return (key (a) > key (b) ? 1 : -(1));
		}));
	}
	else {
		iterable.sort ();
	}
	if (reverse) {
		iterable.reverse ();
	}
};
var sorted = function (iterable, key, reverse) {
	if (typeof key == 'undefined' || (key != null && key.hasOwnProperty ("__kwargtrans__"))) {;
		var key = null;
	};
	if (typeof reverse == 'undefined' || (reverse != null && reverse.hasOwnProperty ("__kwargtrans__"))) {;
		var reverse = false;
	};
	if (arguments.length) {
		var __ilastarg0__ = arguments.length - 1;
		if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
			var __allkwargs0__ = arguments [__ilastarg0__--];
			for (var __attrib0__ in __allkwargs0__) {
				switch (__attrib0__) {
					case 'iterable': var iterable = __allkwargs0__ [__attrib0__]; break;
					case 'key': var key = __allkwargs0__ [__attrib0__]; break;
					case 'reverse': var reverse = __allkwargs0__ [__attrib0__]; break;
				}
			}
		}
	}
	else {
	}
	if (py_typeof (iterable) == dict) {
		var result = copy (iterable.py_keys ());
	}
	else {
		var result = copy (iterable);
	}
	__sort__ (result, key, reverse);
	return result;
};
var map = function (func, iterable) {
	return (function () {
		var __accu0__ = [];
		for (var item of iterable) {
			__accu0__.append (func (item));
		}
		return __accu0__;
	}) ();
};
var filter = function (func, iterable) {
	if (func == null) {
		var func = bool;
	}
	return (function () {
		var __accu0__ = [];
		for (var item of iterable) {
			if (func (item)) {
				__accu0__.append (item);
			}
		}
		return __accu0__;
	}) ();
};
var divmod = function (n, d) {
	return tuple ([Math.floor (n / d), __mod__ (n, d)]);
};
var __Terminal__ =  __class__ ('__Terminal__', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		self.buffer = '';
		try {
			self.element = document.getElementById ('__terminal__');
		}
		catch (__except0__) {
			self.element = null;
		}
		if (self.element) {
			self.element.style.overflowX = 'auto';
			self.element.style.boxSizing = 'border-box';
			self.element.style.padding = '5px';
			self.element.innerHTML = '_';
		}
	});},
	get print () {return __get__ (this, function (self) {
		var sep = ' ';
		var end = '\n';
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'sep': var sep = __allkwargs0__ [__attrib0__]; break;
						case 'end': var end = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
			var args = tuple ([].slice.apply (arguments).slice (1, __ilastarg0__ + 1));
		}
		else {
			var args = tuple ();
		}
		self.buffer = '{}{}{}'.format (self.buffer, sep.join ((function () {
			var __accu0__ = [];
			for (var arg of args) {
				__accu0__.append (str (arg));
			}
			return __accu0__;
		}) ()), end).__getslice__ (-(4096), null, 1);
		if (self.element) {
			self.element.innerHTML = self.buffer.py_replace ('\n', '<br>').py_replace (' ', '&nbsp');
			self.element.scrollTop = self.element.scrollHeight;
		}
		else {
			console.log (sep.join ((function () {
				var __accu0__ = [];
				for (var arg of args) {
					__accu0__.append (str (arg));
				}
				return __accu0__;
			}) ()));
		}
	});},
	get input () {return __get__ (this, function (self, question) {
		if (arguments.length) {
			var __ilastarg0__ = arguments.length - 1;
			if (arguments [__ilastarg0__] && arguments [__ilastarg0__].hasOwnProperty ("__kwargtrans__")) {
				var __allkwargs0__ = arguments [__ilastarg0__--];
				for (var __attrib0__ in __allkwargs0__) {
					switch (__attrib0__) {
						case 'self': var self = __allkwargs0__ [__attrib0__]; break;
						case 'question': var question = __allkwargs0__ [__attrib0__]; break;
					}
				}
			}
		}
		else {
		}
		self.print ('{}'.format (question), __kwargtrans__ ({end: ''}));
		var answer = window.prompt ('\n'.join (self.buffer.py_split ('\n').__getslice__ (-(8), null, 1)));
		self.print (answer);
		return answer;
	});}
});
var __terminal__ = __Terminal__ ();
var print = __terminal__.print;
var org_transcrypt_runtime_input = __terminal__.input;

//# sourceMappingURL=org.transcrypt.__runtime__.map
// CONCATENATED MODULE: ./python/__target__/pagedList.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findIndex", function() { return findIndex; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollPosition", function() { return ScrollPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrollPosition", function() { return scrollPosition; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "element", function() { return pagedList_element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Element", function() { return Element; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ElementWrapper", function() { return ElementWrapper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Delayer", function() { return Delayer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "namedTuple", function() { return namedTuple; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "containsAll", function() { return containsAll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "containsMore", function() { return containsMore; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultButtons", function() { return DefaultButtons; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addDefaultButton", function() { return addDefaultButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DefaultText", function() { return DefaultText; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagedList", function() { return PagedList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagedListStyling", function() { return PagedListStyling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagedListRow", function() { return PagedListRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagedListSubRow", function() { return PagedListSubRow; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagedListButton", function() { return PagedListButton; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PagedListColumn", function() { return PagedListColumn; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Pager", function() { return Pager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataServer", function() { return DataServer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AjaxServer", function() { return AjaxServer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FakeServer", function() { return FakeServer; });
// Transcrypt'ed from Python, 2018-09-28 10:05:45

var pagedList_name_ = '__main__';
var version = '0.0.0.3';
if (!(Array.prototype.findIndex)) {
	Array.prototype.findIndex = (function __lambda__ (func) {
		return findIndex (this, func);
	});
}
var findIndex = function (array, func) {
	var i = 0;
	while (i < array.length) {
		if (func (array [i])) {
			return i;
		}
		i++;
	}
	return -(1);
};
var ScrollPosition =  __class__ ('ScrollPosition', [object], {
	__module__: pagedList_name_,
	get left () {return __get__ (this, function (self) {
		var doc = document.documentElement;
		return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
	});},
	get top () {return __get__ (this, function (self) {
		var doc = document.documentElement;
		return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
	});},
	get save () {return __get__ (this, function (self) {
		self._left = self.left ();
		self._top = self.top ();
	});},
	get restore () {return __get__ (this, function (self) {
		window.scrollTo (self._left, self._top);
	});}
});
var scrollPosition = ScrollPosition ();
var pagedList_element = function (py_name) {
	return document.createElement (py_name);
};
var Element = function (py_name) {
	return ElementWrapper (pagedList_element (py_name));
};
var ElementWrapper =  __class__ ('ElementWrapper', [object], {
	__module__: pagedList_name_,
	get __init__ () {return __get__ (this, function (self, element) {
		if (element == null) {
			var __except0__ = Exception ('ElementWrapper: element cannot be None');
			__except0__.__cause__ = null;
			throw __except0__;
		}
		self.element = element;
	});},
	get getElement () {return __get__ (this, function (self) {
		return self.element;
	});},
	get append () {return __get__ (this, function (self) {
		var others = tuple ([].slice.apply (arguments).slice (1));
		for (var o of others) {
			self.element.appendChild (o.element);
		}
		return self;
	});},
	get attr () {return __get__ (this, function (self, py_name, value) {
		self.element.setAttribute (py_name, value);
		return self;
	});},
	get refresh () {return __get__ (this, function (self) {
		var __except0__ = Exception ('Needs to be implemented by sub-classes');
		__except0__.__cause__ = null;
		throw __except0__;
	});},
	get removeChilds () {return __get__ (this, function (self) {
		while (self.element.hasChildNodes ()) {
			self.element.removeChild (self.element.firstChild);
		}
	});},
	get removeFromParent () {return __get__ (this, function (self) {
		self.element.parentNode.removeChild (self.element);
	});},
	get children () {return __get__ (this, function (self) {
		return Array.prototype.slice.call (self.element.children);
	});},
	get indexInParent () {return __get__ (this, function (self) {
		return self.children ().indexOf (self.element);
	});},
	get insertBefore () {return __get__ (this, function (self, newnode, existingnode) {
		return self.element.insertBefore (newnode.element, existingnode.element);
	});}
});
var Delayer =  __class__ ('Delayer', [object], {
	__module__: pagedList_name_,
	get __init__ () {return __get__ (this, function (self, timespan) {
		self.timespan = timespan;
		self.lastTime = null;
		self.functionHolder = null;
	});},
	get now () {return __get__ (this, function (self) {
		return new Date ().getTime ();
	});},
	get execute () {return __get__ (this, function (self, func) {
		if (self.lastTime == null) {
			self.executeNow (func);
		}
		else {
			var waitTime = (self.lastTime + self.timespan) - self.now ();
			if (waitTime < 0) {
				self.executeNow (func);
			}
			else if (self.functionHolder == null) {
				self.functionHolder = func;
				var executeLater = function () {
					self.executeNow (self.functionHolder);
					self.functionHolder = null;
					self.lastTime = null;
				};
				setTimeout (executeLater, waitTime);
			}
			else {
				self.functionHolder = func;
			}
		}
	});},
	get executeNow () {return __get__ (this, function (self, func) {
		self.lastTime = new Date ().getTime ();
		func ();
	});}
});
var namedTuple = function (fields, py_values) {
	if (typeof py_values == 'undefined' || (py_values != null && py_values.hasOwnProperty ("__kwargtrans__"))) {;
		var py_values = null;
	};
	var result = dict ({});
	for (var field of fields) {
		result [field] = null;
	}
	if (!(py_values == null)) {
		for (var i = 0; i < py_values.length; i++) {
			result [fields [i]] = py_values [i];
		}
	}
	return result;
};
var containsAll = function (object, fields) {
	for (var f of fields) {
		if (!(object.hasOwnProperty (f))) {
			return false;
		}
	}
	return true;
};
var containsMore = function (object, fields) {
	for (var key of Object.keys (object)) {
		if (fields.indexOf (key) < 0) {
			return true;
		}
	}
	return false;
};
var DefaultButtons = list ([]);
var addDefaultButton = function (id, py_name, styleClass) {
	var result = PagedListButton (id, py_name, styleClass);
	DefaultButtons.append (result);
	return result;
};
var DefaultText = dict ({'TextTotal': 'Total', 'TextFilter': 'Filter'});
var PagedList =  __class__ ('PagedList', [ElementWrapper], {
	__module__: pagedList_name_,
	SendData: new set (['page', 'pageSize', 'filterColumns', 'filterValues', 'sortOn', 'sortAsc']),
	ReceiveData: new set (['Items', 'CurrentPage', 'PageCount', 'TotalCount']),
	get __init__ () {return __get__ (this, function (self, container, url) {
		if (Object.prototype.toString.call (container) == '[object String]') {
			self.containerId = container;
			var container = document.querySelector (self.containerId);
			if (container == null) {
				console.error ('Paged-List cannot find container with id {}'.format (self.containerId));
			}
			ElementWrapper.__init__ (self, container);
		}
		else {
			self.containerId = (!(container.id == '') ? container.id : 'Unknown id');
			ElementWrapper.__init__ (self, container);
		}
		self.topPager = Pager (pagedList_element ('div'), self);
		self.table = Element ('table');
		self.thead = Element ('thead');
		self.table.append (self.thead);
		self.tbody = Element ('tbody');
		self.table.append (self.tbody);
		self.headerRendered = false;
		self.rows = list ([]);
		self.bottomPager = Pager (pagedList_element ('div'), self);
		self.append (self.topPager, self.table, self.bottomPager);
		if (url == null || url == '') {
			self._server = FakeServer ();
		}
		else {
			self._server = AjaxServer (url);
		}
		self.receiveData = null;
		self.buttons = list ([]);
		self.columns = list ([]);
		self.sorting = dict ({'columnIndex': -(1), 'ascending': true});
		self.pageSize = 20;
		self.mergeButtonColumns = false;
		self._onPageRefreshed = null;
		self._onPageRefreshing = null;
		self.refreshDelayer = Delayer (500);
		self.styling = PagedListStyling (self);
		self.styling.tableClass ('table table-striped table-hover');
	});},
	get getStyling () {return __get__ (this, function (self) {
		return self.styling;
	});},
	get addColumn () {return __get__ (this, function (self, id, header) {
		if (typeof header == 'undefined' || (header != null && header.hasOwnProperty ("__kwargtrans__"))) {;
			var header = id;
		};
		var column = PagedListColumn (id, header);
		self.columns.append (column);
		return column;
	});},
	get setUrl () {return __get__ (this, function (self, url) {
		self._server.url = url;
		return self;
	});},
	get getUrl () {return __get__ (this, function (self) {
		if (!(self._server == null)) {
			return self._server.url;
		}
		return '';
	});},
	get onPageRefreshed () {return __get__ (this, function (self, func) {
		if (typeof func == 'undefined' || (func != null && func.hasOwnProperty ("__kwargtrans__"))) {;
			var func = null;
		};
		if (typeof (func) == 'function') {
			self._onPageRefreshed = func;
		}
		else if (func == null) {
			self._onPageRefreshed = null;
		}
		else {
			console.error ('.onPageRefreshed on Paged-List for container with id {} failed. Passed argument is not a function.'.format (self.containerId));
		}
		return self;
	});},
	get onPageRefreshing () {return __get__ (this, function (self, func) {
		if (typeof func == 'undefined' || (func != null && func.hasOwnProperty ("__kwargtrans__"))) {;
			var func = null;
		};
		if (typeof (func) == 'function') {
			self._onPageRefreshing = func;
		}
		else if (func == null) {
			self._onPageRefreshing = null;
		}
		else {
			console.error ('._onPageRefreshing on Paged-List for container with id {} failed. Passed argument is not a function.'.format (self.containerId));
		}
		return self;
	});},
	get addButton () {return __get__ (this, function (self, id, py_name, styleClass) {
		var button = null;
		if (styleClass == null) {
			var button = PagedListButton (id, id, py_name);
		}
		else {
			var button = PagedListButton (id, py_name, styleClass);
		}
		self.buttons.append (button);
		return button;
	});},
	get getTopPager () {return __get__ (this, function (self) {
		return self.topPager;
	});},
	get getBottomPager () {return __get__ (this, function (self) {
		return self.bottomPager;
	});},
	get hideCount () {return __get__ (this, function (self) {
		self.topPager.hideCount ();
		self.bottomPager.hideCount ();
		return self;
	});},
	get disablePagination () {return __get__ (this, function (self) {
		self.topPager.disable ();
		self.bottomPager.disable ();
		return self;
	});},
	get addDefaultButtons () {return __get__ (this, function (self) {
		var ids = tuple ([].slice.apply (arguments).slice (1));
		for (var button of DefaultButtons) {
			if (__in__ (button.id, ids)) {
				var newButton = button.copy ();
				if (self [newButton.id] == null) {
					self [newButton.id] = newButton;
					self.buttons.append (newButton);
				}
				else {
					console.error ("Paged-List for container with id {} cannot add default button '{}' since it already exists.".format (self.containerId, newButton.id));
				}
			}
		}
		for (var n of ids) {
			if (DefaultButtons.findIndex ((function __lambda__ (b) {
				return b.id == n;
			})) < 0) {
				console.error ("Paged-List for container with id {} cannot add default button '{}' since this isn't a default button.".format (self.containerId, n));
			}
		}
	});},
	get renderHeader () {return __get__ (this, function (self) {
		if (self.columns.length == 0) {
			console.error ('Paged-List for container with id {} cannot render header. It does not contain columns.'.format (self.containerId));
		}
		var tr = Element ('tr');
		self.thead.append (tr);
		for (var i = 0; i < self.columns.length; i++) {
			var column = self.columns [i];
			var th = Element ('th');
			tr.append (th);
			if (column.classesHeader.length > 0) {
				th.attr ('class', ' '.join (column.classesHeader));
			}
			if (column.stylesHeader.length > 0) {
				th.attr ('style', ' '.join (column.stylesHeader));
			}
			var elements = column.getElements (self);
			for (var e of elements) {
				th.append (e);
			}
			column.span.element.onclick = self.toggleSort.bind (null, i);
		}
		if (self.buttons.length > 0) {
			for (var button of self.buttons) {
				tr.append (Element ('th').attr ('class', self.styling.classButtonColumn));
				if (self.mergeButtonColumns) {
					break;
				}
			}
		}
		self.headerRendered = true;
	});},
	get toggleSort () {return __get__ (this, function (self, columnIndex) {
		var column = self.columns [columnIndex];
		if (column.sortable) {
			if (self.sorting.columnIndex >= 0) {
				self.columns [self.sorting.columnIndex].toggleFigure.attr ('class', '');
			}
			if (self.sorting.columnIndex == columnIndex) {
				if (self.sorting.ascending == true) {
					self.sorting.ascending = false;
				}
				else {
					self.sorting.columnIndex = -(1);
				}
			}
			else {
				self.sorting.columnIndex = columnIndex;
				self.sorting.ascending = true;
			}
			if (self.sorting.columnIndex >= 0) {
				if (self.sorting.ascending) {
					column.toggleFigure.attr ('class', self.styling.classAscending);
				}
				else {
					column.toggleFigure.attr ('class', self.styling.classDescending);
				}
			}
			self.getData (1, true);
		}
	});},
	get render () {return __get__ (this, function (self, data, fullPage) {
		if (self.columns.length == 0) {
			console.error ('Paged-List for container with id {} cannot render. It does not contain columns.'.format (self.containerId));
		}
		if (!(containsAll (data, PagedList.ReceiveData))) {
			console.error ('Paged-List for container with id {} cannot render. Received data does not contain all required fields: {}.'.format (self.containerId, PagedList.ReceiveData));
		}
		if (self._onPageRefreshing != null) {
			self._onPageRefreshing ();
		}
		if (data.CurrentPage > data.PageCount && data.PageCount > 0) {
			self.getData (data.PageCount);
			return ;
		}
		self.receiveData = data;
		if (self.headerRendered == false) {
			self.renderHeader ();
		}
		if (!(fullPage)) {
			for (var item of data.Items) {
				if (item.hasOwnProperty ('id') && !(item.hasOwnProperty ('Id'))) {
					item ['Id'] = item ['id'];
				}
			}
		}
		if (!(fullPage) && !(data.Items.every ((function __lambda__ (item) {
			return item.hasOwnProperty ('Id');
		})))) {
			var fullPage = true;
		}
		if (fullPage) {
			scrollPosition.save ();
			while (self.rows.length > 0) {
				self.rows [0].remove ();
			}
		}
		if (!(fullPage)) {
			var i = 0;
			while (i < self.rows.length) {
				var row = self.rows [i];
				if (data.Items.findIndex ((function __lambda__ (item) {
					return item.Id == row.item.Id;
				})) < 0) {
					row.remove ();
				}
				else {
					i++;
				}
			}
		}
		self.topPager.refresh (data.CurrentPage, data.PageCount, data.TotalCount);
		self.bottomPager.refresh (data.CurrentPage, data.PageCount, data.TotalCount);
		for (var i = 0; i < data.Items.length; i++) {
			var item = data.Items [i];
			if (fullPage) {
				PagedListRow (self, item);
			}
			else {
				var index = self.rows.findIndex ((function __lambda__ (r) {
					return r.item.Id == item.Id;
				}));
				if (index > -(1)) {
					var row = self.rows [index];
					row.refresh (item);
					self.rows.remove (row);
					self.rows.append (row);
				}
				else {
					PagedListRow (self, item);
				}
			}
		}
		if (!(fullPage)) {
			for (var row of self.rows) {
				row.refreshPosition ();
			}
		}
		if (fullPage) {
			setTimeout ((function __lambda__ () {
				return scrollPosition.restore ();
			}), 0);
		}
		if (self._onPageRefreshed != null) {
			self._onPageRefreshed ();
		}
	});},
	get getData () {return __get__ (this, function (self, page, fullPage) {
		if (typeof fullPage == 'undefined' || (fullPage != null && fullPage.hasOwnProperty ("__kwargtrans__"))) {;
			var fullPage = false;
		};
		if (self.headerRendered == false) {
			self.renderHeader ();
		}
		var sendData = namedTuple (PagedList.SendData, list ([page, self.pageSize, list ([]), list ([]), '', true]));
		for (var column of self.columns) {
			if (column.filterEnabled) {
				sendData.filterColumns.append (column.id);
				sendData.filterValues.append (column.getValueFunction ());
			}
		}
		if (self.sorting.columnIndex >= 0) {
			sendData.sortOn = self.columns [self.sorting.columnIndex].id;
			sendData.sortAsc = self.sorting.ascending;
		}
		var onSucces = function (data) {
			self.render.bind (null, data, fullPage) ();
		};
		self.refreshDelayer.execute (self._server.getPageData.bind (null, sendData, onSucces, self.getDataError));
	});},
	get getDataError () {return __get__ (this, function (self, data, errorText) {
		console.error ("Paged-List for container with id = {} didn't receive data. Error: {}.".format (self.containerId, errorText));
	});},
	get refresh () {return __get__ (this, function (self, fullPage) {
		if (typeof fullPage == 'undefined' || (fullPage != null && fullPage.hasOwnProperty ("__kwargtrans__"))) {;
			var fullPage = false;
		};
		if (self.receiveData == null) {
			self.getData (1, fullPage);
		}
		else {
			self.getData (self.receiveData.CurrentPage, fullPage);
		}
	});},
	get refreshItem () {return __get__ (this, function (self, item, newItem) {
		if (typeof newItem == 'undefined' || (newItem != null && newItem.hasOwnProperty ("__kwargtrans__"))) {;
			var newItem = null;
		};
		var r = self.getRow (item);
		if (r != null) {
			r.refresh (newItem);
		}
	});},
	get getRow () {return __get__ (this, function (self, item) {
		for (var row of self.rows) {
			if (item == row.item) {
				return row;
			}
		}
		return null;
	});},
	get getServer () {return __get__ (this, function (self) {
		return self._server;
	});},
	get fakeServer () {return __get__ (this, function (self) {
		self._server = FakeServer ();
		return self._server;
	});},
	get ajaxServer () {return __get__ (this, function (self, url) {
		self._server = AjaxServer (url);
		return self._server;
	});},
	get addRowListener () {return __get__ (this, function (self, event, func, useCapture) {
		if (typeof useCapture == 'undefined' || (useCapture != null && useCapture.hasOwnProperty ("__kwargtrans__"))) {;
			var useCapture = false;
		};
		var newFunction = function (ev) {
			var rowFound = null;
			for (var row of self.rows) {
				if (row.element.contains (ev.target)) {
					var rowFound = row;
					break;
				}
			}
			if (!(rowFound == null)) {
				func (rowFound.item, ev);
			}
		};
		var result = newFunction;
		self.tbody.element.addEventListener (event, result, useCapture);
		return result;
	});},
	get removeRowListener () {return __get__ (this, function (self, event, func, useCapture) {
		if (typeof useCapture == 'undefined' || (useCapture != null && useCapture.hasOwnProperty ("__kwargtrans__"))) {;
			var useCapture = false;
		};
		self.tbody.element.removeEventListener (event, func, useCapture);
	});}
});
var PagedListStyling =  __class__ ('PagedListStyling', [object], {
	__module__: pagedList_name_,
	get __init__ () {return __get__ (this, function (self, pagedList) {
		self.pagedList = pagedList;
		self._rowStylesFunctions = list ([]);
		self._rowClassesFunctions = list ([]);
		self.classExpanded = 'cursor glyphicon glyphicon-triangle-bottom';
		self.classCollapsed = 'cursor glyphicon glyphicon-triangle-right';
		self.classAscending = 'glyphicon glyphicon-triangle-top';
		self.classDescending = 'glyphicon glyphicon-triangle-bottom';
		self.classButtonColumn = 'pagedList-buttonColumn';
	});},
	get rowStyles () {return __get__ (this, function (self, func) {
		if (typeof (func) == 'function') {
			self._rowStylesFunctions.append (func);
		}
		else if (func == null) {
			self._rowStylesFunctions = list ([]);
		}
		else {
			console.error ('.rowStyles on Paged-List for container with id {} failed. Passed argument is not a function.'.format (self.containerId));
		}
		return self;
	});},
	get rowClasses () {return __get__ (this, function (self, func) {
		if (typeof (func) == 'function') {
			self._rowClassesFunctions.append (func);
		}
		else if (func == null) {
			self._rowClassesFunctions = list ([]);
		}
		else {
			console.error ('.rowClasses on Paged-List for container with id {} failed. Passed argument is not a function.'.format (self.containerId));
		}
		return self;
	});},
	get tableClass () {return __get__ (this, function (self, styleClass) {
		self.pagedList.table.attr ('class', styleClass);
		return self;
	});},
	get tableStyle () {return __get__ (this, function (self, style) {
		self.pagedList.table.attr ('style', style);
		return self;
	});},
	get setClassExpanded () {return __get__ (this, function (self, styleClass) {
		self.classExpanded = styleClass;
		return self;
	});},
	get setClassCollapsed () {return __get__ (this, function (self, styleClass) {
		self.classCollapsed = styleClass;
		return self;
	});},
	get setClassAscending () {return __get__ (this, function (self, styleClass) {
		self.classAscending = styleClass;
		return self;
	});},
	get setClassDescending () {return __get__ (this, function (self, styleClass) {
		self.classDescending = styleClass;
		return self;
	});},
	get setClassButtonColumn () {return __get__ (this, function (self, styleClass) {
		self.classButtonColumn = styleClass;
		return self;
	});}
});
var PagedListRow =  __class__ ('PagedListRow', [ElementWrapper], {
	__module__: pagedList_name_,
	get __init__ () {return __get__ (this, function (self, pagedList, item) {
		ElementWrapper.__init__ (self, pagedList_element ('tr'));
		self.pagedList = pagedList;
		self.item = item;
		self.refreshFunctions = list ([]);
		self.elementsToRemove = list ([]);
		self.subRows = list ([]);
		self.addToPagedList ();
		self.render ();
		self.refresh (self.item);
	});},
	get addToPagedList () {return __get__ (this, function (self) {
		self.pagedList.rows.append (self);
		self.pagedList.tbody.append (self);
	});},
	get remove () {return __get__ (this, function (self) {
		var index = self.pagedList.rows.indexOf (self);
		self.pagedList.rows.splice (index, 1);
		self.removeFromParent ();
		while (self.subRows.length > 0) {
			self.subRows [0].remove ();
		}
	});},
	get lengthInRows () {return __get__ (this, function (self) {
		return 1 + self.subRows.length;
	});},
	get positionInRows () {return __get__ (this, function (self) {
		var result = 0;
		for (var i = 0; i < self.pagedList.rows.length; i++) {
			var row = self.pagedList.rows [i];
			if (self == row) {
				break;
			}
			else {
				result += row.lengthInRows ();
			}
		}
		return result;
	});},
	get positionInParent () {return __get__ (this, function (self) {
		return self.indexInParent ();
	});},
	get render () {return __get__ (this, function (self) {
		for (var column of self.pagedList.columns) {
			var td = Element ('td');
			self.append (td);
			if (column.classesRows.length > 0) {
				td.attr ('class', ' '.join (column.classesRows));
			}
			if (column.stylesRows.length > 0) {
				td.attr ('style', ' '.join (column.stylesRows));
			}
			if (!(column.onExpandItemFunction == null)) {
				var buttonExpand = ElementWrapper (document.createElement ('span'));
				buttonExpand.isExpanded = false;
				var clsName = function (isExpanded) {
					return (isExpanded ? self.pagedList.styling.classExpanded : self.pagedList.styling.classCollapsed);
				};
				buttonExpand.element.className = clsName (buttonExpand.isExpanded);
				var toggleExpand = function (buttonExpand, expandFunction, rowBefore, event) {
					buttonExpand.isExpanded = !(buttonExpand.isExpanded);
					buttonExpand.element.className = clsName (buttonExpand.isExpanded);
					if (buttonExpand.isExpanded) {
						buttonExpand.row = PagedListSubRow (self.pagedList, rowBefore, expandFunction ());
						self.subRows.append (buttonExpand.row);
					}
					else {
						buttonExpand.row.remove ();
						buttonExpand.row = null;
					}
					event.stopPropagation ();
				};
				td.append (buttonExpand);
				var refreshFunction = function (buttonExpand, toggleExpand, column, item) {
					buttonExpand.element.onclick = toggleExpand.bind (null, buttonExpand, column.onExpandItemFunction.bind (null, item), self);
				};
				self.refreshFunctions.append (refreshFunction.bind (null, buttonExpand, toggleExpand, column));
			}
			if (!(column.itemToHtmlFunction == null)) {
				var htmlSpan = document.createElement ('span');
				td.element.appendChild (htmlSpan);
				var refreshFunction = function (span, column, item) {
					span.innerHTML = column.itemToHtmlFunction (item);
				};
				self.refreshFunctions.append (refreshFunction.bind (null, htmlSpan, column));
			}
			if (!(column.itemToElementFunction == null)) {
				var refreshFunction = function (td, column, item) {
					var columnElement = ElementWrapper (column.itemToElementFunction (item));
					self.elementsToRemove.append (columnElement);
					td.append (columnElement);
				};
				self.refreshFunctions.append (refreshFunction.bind (null, td, column));
			}
		}
		self.refreshFunctions.append (self.renderButtons);
	});},
	get renderButtons () {return __get__ (this, function (self, item) {
		if (self.pagedList.buttons.length > 0) {
			var td = null;
			if (self.pagedList.mergeButtonColumns) {
				var td = Element ('td').attr ('class', self.pagedList.styling.classButtonColumn);
				self.append (td);
				self.elementsToRemove.append (td);
			}
			for (var button of self.pagedList.buttons) {
				if (!(self.pagedList.mergeButtonColumns)) {
					var td = Element ('td').attr ('class', self.pagedList.styling.classButtonColumn);
					self.append (td);
					self.elementsToRemove.append (td);
				}
				if (button._showIf == null || button._showIf (item)) {
					var buttonElement = button.getElement (item);
					td.append (buttonElement);
				}
			}
		}
	});},
	get refresh () {return __get__ (this, function (self, item) {
		if (item != null) {
			self.item = item;
		}
		var style = '';
		for (var func of self.pagedList.styling._rowStylesFunctions) {
			style += func (self.item) + ' ';
		}
		self.attr ('style', style);
		var styleClass = '';
		for (var func of self.pagedList.styling._rowClassesFunctions) {
			styleClass += func (self.item) + ' ';
		}
		self.attr ('class', styleClass);
		if (!(self.pagedList._rowClassesFunction == null)) {
			self.attr ('class', self.pagedList._rowClassesFunction (self.item));
		}
		for (var element of self.elementsToRemove) {
			element.removeFromParent ();
		}
		self.elementsToRemove = list ([]);
		for (var func of self.refreshFunctions) {
			func (self.item);
		}
	});},
	get refreshPosition () {return __get__ (this, function (self) {
		var positionInParent = self.positionInParent ();
		var positionInRows = self.positionInRows ();
		if (!(positionInParent == positionInRows)) {
			self.removeFromParent ();
			var children = self.pagedList.tbody.children ();
			if (!(children.length > positionInRows)) {
				self.pagedList.tbody.append (self);
				for (var subRow of self.subRows) {
					self.pagedList.tbody.append (subRow);
				}
			}
			else {
				var existingNode = children [positionInRows];
				self.pagedList.tbody.insertBefore (self, existingNode);
				for (var subRow of self.subRows.__getslice__ (0, null, 1).reverse ()) {
					self.pagedList.tbody.insertBefore (subRow, existingNode);
				}
			}
		}
	});}
});
var PagedListSubRow =  __class__ ('PagedListSubRow', [ElementWrapper], {
	__module__: pagedList_name_,
	get __init__ () {return __get__ (this, function (self, pagedList, rowBefore, elementToShow) {
		ElementWrapper.__init__ (self, pagedList_element ('tr'));
		self.pagedList = pagedList;
		self.rowBefore = rowBefore;
		self.elementToShow = elementToShow;
		self.render ();
	});},
	get render () {return __get__ (this, function (self) {
		var td = Element ('td');
		td.element.className = 'subPagedListTd';
		self.append (td);
		td.element.colSpan = self.pagedList.columns.length + self.pagedList.buttons.length;
		var table = Element ('table');
		table.element.className = 'subPagedListTable';
		td.append (table);
		var subRow = Element ('tr');
		table.append (subRow);
		var td1 = Element ('td');
		td1.element.className = 'subPagedListCell1';
		subRow.append (td1);
		var td2 = Element ('td');
		td2.element.className = 'subPagedListCell2';
		subRow.append (td2);
		td2.element.appendChild (self.elementToShow);
		self.rowBefore.element.parentNode.insertBefore (self.element, self.rowBefore.element.nextSibling);
		$ (self.element).hide ().fadeIn ();
	});},
	get remove () {return __get__ (this, function (self) {
		self.removeFromParent ();
		var index = self.rowBefore.subRows.indexOf (self);
		if (index > -(1)) {
			self.rowBefore.subRows.splice (index, 1);
		}
	});}
});
var PagedListButton =  __class__ ('PagedListButton', [object], {
	__module__: pagedList_name_,
	get __init__ () {return __get__ (this, function (self, id, py_name, styleClass) {
		if (typeof styleClass == 'undefined' || (styleClass != null && styleClass.hasOwnProperty ("__kwargtrans__"))) {;
			var styleClass = '';
		};
		self.id = id;
		self.py_name = py_name;
		self.styleClass = styleClass;
		self._onclick = null;
		self._showIf = null;
	});},
	get onclick () {return __get__ (this, function (self, functionOnclick) {
		if (!(self._onclick == null)) {
			console.error ('.onclick on button {} failed. Button has already an onclick-function.'.format (self.id));
		}
		if (!(typeof (functionOnclick) == 'function')) {
			console.error ('.onclick on button {} failed. Passed argument is not a function.'.format (self.id));
		}
		self._onclick = functionOnclick;
		return self;
	});},
	get onClick () {return __get__ (this, function (self, functionOnclick) {
		return self.onclick (functionOnclick);
	});},
	get showIf () {return __get__ (this, function (self, functionShowIf) {
		if (!(typeof (functionShowIf) == 'function')) {
			console.error ('.showIf on button {} failed. Passed argument is not a function.'.format (self.id));
		}
		self._showIf = functionShowIf;
		return self;
	});},
	get showif () {return __get__ (this, function (self, functionShowIf) {
		return self.showIf (functionShowIf);
	});},
	get getElement () {return __get__ (this, function (self, item) {
		var result = Element ('button');
		result.element.innerHTML = self.py_name;
		result.attr ('class', self.styleClass);
		if (!(self._onclick == null)) {
			result.element.onclick = self._onclick.bind (null, item);
		}
		return result;
	});},
	get copy () {return __get__ (this, function (self) {
		var result = PagedListButton (self.id, self.py_name, self.styleClass);
		result._onclick = self._onclick;
		result._showIf = self._showIf;
		return result;
	});}
});
var PagedListColumn =  __class__ ('PagedListColumn', [object], {
	__module__: pagedList_name_,
	FilterItem: new set (['Text', 'Value']),
	get __init__ () {return __get__ (this, function (self, id, header) {
		self.id = id;
		self.header = header;
		self.sortable = false;
		self.filterEnabled = false;
		self.filterItems = null;
		self.itemToHtmlFunction = null;
		self.itemToElementFunction = null;
		self.onExpandItemFunction = null;
		self.span = null;
		self.toggleFigure = null;
		self.getValueFunction = null;
		self.classesHeader = list (['pagedListColumnHeader']);
		self.stylesHeader = list ([]);
		self.classesHeaderSpan = list ([]);
		self.stylesHeaderSpan = list ([]);
		self.classesRows = list (['pagedListColumnRow']);
		self.stylesRows = list ([]);
		self.filterInputElement = null;
	});},
	get addClassHeader () {return __get__ (this, function (self, styleClass) {
		self.classesHeader.append (styleClass);
		return self;
	});},
	get addStyleHeader () {return __get__ (this, function (self, style) {
		self.stylesHeader.append (style);
		return self;
	});},
	get addClassHeaderSpan () {return __get__ (this, function (self, styleClass) {
		self.classesHeaderSpan.append (styleClass);
		return self;
	});},
	get addStyleHeaderSpan () {return __get__ (this, function (self, style) {
		self.stylesHeaderSpan.append (style);
		return self;
	});},
	get addClassRows () {return __get__ (this, function (self, styleClass) {
		self.classesRows.append (styleClass);
		return self;
	});},
	get addStyleRows () {return __get__ (this, function (self, style) {
		self.stylesRows.append (style);
		return self;
	});},
	get addStyle () {return __get__ (this, function (self, style) {
		self.addStyleHeader (style);
		self.addStyleRows (style);
		return self;
	});},
	get addClass () {return __get__ (this, function (self, styleClass) {
		self.addClassHeader (styleClass);
		self.addClassRows (styleClass);
		return self;
	});},
	get enableSort () {return __get__ (this, function (self) {
		self.sortable = true;
		return self;
	});},
	get enableFilter () {return __get__ (this, function (self, py_items) {
		if (typeof py_items == 'undefined' || (py_items != null && py_items.hasOwnProperty ("__kwargtrans__"))) {;
			var py_items = null;
		};
		self.filterEnabled = true;
		if (!(py_items == null)) {
			if (!(py_items.length)) {
				console.error ('.enableFilter on column {} failed. Argument must be an array or list.'.format (self.header));
			}
			for (var item of py_items) {
				if (!(containsAll (item, PagedListColumn.FilterItem))) {
					console.error ('.enableFilter on column {} failed. Each FilterItem must contain all fields: {}'.format (self.header, PagedListColumn.FilterItem));
				}
			}
			self.filterItems = py_items.__getslice__ (0, null, 1);
		}
		return self;
	});},
	get itemToHtml () {return __get__ (this, function (self, itemToHtmlFunction) {
		if (!(typeof (itemToHtmlFunction) == 'function')) {
			console.error ('.itemToHtml on column {} failed. Passed argument is not a function.'.format (self.header));
		}
		self.itemToHtmlFunction = itemToHtmlFunction;
		return self;
	});},
	get itemToElement () {return __get__ (this, function (self, itemToElementFunction) {
		if (!(typeof (itemToElementFunction) == 'function')) {
			console.error ('.itemToElement on column {} failed. Passed argument is not a function.'.format (self.header));
		}
		self.itemToElementFunction = itemToElementFunction;
		return self;
	});},
	get onExpandItem () {return __get__ (this, function (self, onExpandItem) {
		if (!(typeof (onExpandItem) == 'function')) {
			console.error ('.onExpandItem on column {} failed. Passed argument is not a function.'.format (self.header));
		}
		self.onExpandItemFunction = onExpandItem;
		return self;
	});},
	get getElements () {return __get__ (this, function (self, pagedList) {
		var result = list ([]);
		if (self.span == null) {
			self.span = Element ('span');
			result.append (self.span);
			self.span.element.innerHTML = self.header;
			if (self.classesHeaderSpan.length > 0) {
				self.span.attr ('class', ' '.join (self.classesHeaderSpan));
			}
			if (self.stylesHeaderSpan.length > 0) {
				self.span.attr ('style', ' '.join (self.stylesHeaderSpan));
			}
			if (self.sortable) {
				self.span.attr ('role', 'button');
				self.toggleFigure = Element ('i');
				result.append (self.toggleFigure);
			}
			if (self.filterEnabled) {
				result.append (Element ('br'));
				var getValue = function (element) {
					return $ (element).val ();
				};
				if (self.filterItems == null || self.filterItems.length == 0) {
					var input = Element ('input').attr ('width', '100%').attr ('value', '').attr ('placeholder', DefaultText.TextFilter);
					self.filterInputElement = input;
					result.append (input);
					self.getValueFunction = getValue.bind (null, input.element);
					$ (input.element).bind ('input', pagedList.getData.bind (null, 1, true));
				}
				else {
					var select = Element ('select').attr ('width', '100%');
					result.append (select);
					self.filterInputElement = select;
					var filterItemToOption = function (filterItem) {
						var r = Element ('option').attr ('value', filterItem.Value);
						r.element.innerHTML = filterItem.Text;
						return r;
					};
					var options = self.filterItems.map (filterItemToOption);
					options [0].attr ('selected', 'selected');
					for (var option of options) {
						select.append (option);
					}
					self.getValueFunction = getValue.bind (null, select.element);
					$ (select.element).change (pagedList.getData.bind (null, 1, true));
				}
			}
		}
		else {
			console.error ("Column '{}'.getElements() is called twice (for Paged-List in container with id {}). ".format (self.id, pagedList.containerId));
		}
		return result;
	});}
});
var Pager =  __class__ ('Pager', [ElementWrapper], {
	__module__: pagedList_name_,
	get __init__ () {return __get__ (this, function (self, container, pagedList) {
		ElementWrapper.__init__ (self, container);
		self.pagedList = pagedList;
		self.table = Element ('table').attr ('width', '100%');
		self.table.attr ('style', 'height: 80px;');
		self.append (self.table);
		var tr = Element ('tr');
		self.table.append (tr);
		var td_left = Element ('td');
		tr.append (td_left);
		self.td_right = Element ('td').attr ('align', 'right');
		tr.append (self.td_right);
		self.numberList = Element ('ul');
		td_left.append (self.numberList);
		self.textNodeTotal = document.createTextNode ('{}: '.format (DefaultText.TextTotal));
		self.td_right.element.appendChild (self.textNodeTotal);
		self.count = Element ('span');
		self.td_right.append (self.count);
		self._hideCount = false;
		self.disabled = false;
		self.autoDisabled = false;
		self.setPaginationClass ('pagination');
		self.activeClass = 'active';
		self.setCountClass ('label label-default');
	});},
	get getTable () {return __get__ (this, function (self) {
		return self.table.element;
	});},
	get setPaginationClass () {return __get__ (this, function (self, styleClass) {
		self.numberList.attr ('class', styleClass);
		return self;
	});},
	get setActiveClass () {return __get__ (this, function (self, styleClass) {
		self.activeClass = styleClass;
		return self;
	});},
	get setCountClass () {return __get__ (this, function (self, styleClass) {
		self.count.attr ('class', styleClass);
		return self;
	});},
	get hideCount () {return __get__ (this, function (self) {
		self._hideCount = true;
		self.td_right.element.removeChild (self.textNodeTotal);
		self.td_right.element.removeChild (self.count.element);
		return self;
	});},
	get disable () {return __get__ (this, function (self) {
		self.disabled = true;
		self.attr ('style', 'display: none;');
		return self;
	});},
	get enable () {return __get__ (this, function (self) {
		self.disabled = false;
		self.attr ('style', 'display: block;');
		return self;
	});},
	get refresh () {return __get__ (this, function (self, currentPage, pageCount, itemCount) {
		if (self.disabled && self.autoDisabled && pageCount > 1) {
			self.enable ();
			self.autoDisabled = false;
		}
		if (!(self.disabled)) {
			self.numberList.removeChilds ();
			if (!(self._hideCount)) {
				self.count.element.innerHTML = itemCount;
			}
			var maxPages = 5;
			var startPage = Math.floor (currentPage / maxPages) * maxPages + 1;
			if (__mod__ (currentPage, maxPages) == 0) {
				startPage -= maxPages;
			}
			if (currentPage > maxPages) {
				self.addNumber (1, '<<');
				self.addNumber (startPage - 1, '<');
			}
			if (pageCount > 1) {
				var i = startPage;
				while (i < startPage + maxPages && i <= pageCount) {
					var li = self.addNumber (i);
					if (i == currentPage) {
						li.attr ('class', self.activeClass);
					}
					i++;
				}
				if (startPage + maxPages < pageCount) {
					self.addNumber (startPage + maxPages, '>');
					self.addNumber (pageCount, '>>');
				}
			}
		}
	});},
	get addNumber () {return __get__ (this, function (self, number, text) {
		if (typeof text == 'undefined' || (text != null && text.hasOwnProperty ("__kwargtrans__"))) {;
			var text = null;
		};
		var li = Element ('li');
		self.numberList.append (li);
		var a = Element ('a').attr ('href', '#');
		li.append (a);
		if (!(text == null)) {
			a.element.innerHTML = text;
		}
		else {
			a.element.innerHTML = number;
		}
		a.element.onclick = self.pagedList.getData.bind (null, number, true);
		return li;
	});}
});
var DataServer =  __class__ ('DataServer', [object], {
	__module__: pagedList_name_,
	get __init__ () {return __get__ (this, function (self) {
		// pass;
	});},
	get getPageData () {return __get__ (this, function (self, data, onSucces, onFailure) {
		console.error ('Server.getPageData should be overridden.');
	});}
});
var AjaxServer =  __class__ ('AjaxServer', [DataServer], {
	__module__: pagedList_name_,
	get __init__ () {return __get__ (this, function (self, url) {
		DataServer.__init__ (self);
		self.url = url;
	});},
	get getPageData () {return __get__ (this, function (self, data, onSucces, onFailure) {
		var ajaxCall = dict ({'type': 'POST', 'url': self.url, 'data': data, 'success': onSucces, 'error': onFailure});
		$.ajax (ajaxCall);
	});}
});
var FakeServer =  __class__ ('FakeServer', [DataServer], {
	__module__: pagedList_name_,
	get __init__ () {return __get__ (this, function (self) {
		DataServer.__init__ (self);
		self.data = list ([]);
	});},
	get getMaxId () {return __get__ (this, function (self) {
		var result = 0;
		for (var item of self.data) {
			if (item ['Id'] > result) {
				var result = item ['Id'];
			}
		}
	});},
	get addData () {return __get__ (this, function (self) {
		var py_items = tuple ([].slice.apply (arguments).slice (1));
		for (var item of py_items) {
			self.data.append (item);
		}
	});},
	get getData () {return __get__ (this, function (self) {
		return self.data;
	});},
	get clearData () {return __get__ (this, function (self) {
		self.data = list ([]);
	});},
	get getItem () {return __get__ (this, function (self, id) {
		for (var item of self.data) {
			if (item ['Id'] == id) {
				return item;
			}
		}
		return null;
	});},
	get deleteItem () {return __get__ (this, function (self, id) {
		var i = 0;
		while (i < self.data.length) {
			if (self.data [i] ['Id'] == id) {
				self.data.splice (i, 1);
				break;
			}
			i++;
		}
	});},
	get getNestedValue () {return function (obj, fields) {
		if (obj == null || len (fields) == 0) {
			return obj;
		}
		return FakeServer.getNestedValue (obj [fields [0]], fields.__getslice__ (1, null, 1));
	};},
	get getFilters () {return __get__ (this, function (self, filterColumns, filterValues) {
		var result = list ([]);
		var passFilter = function (field, value, item) {
			var itemValue = FakeServer.getNestedValue (item, field.py_split ('.'));
			if (itemValue == null) {
				return false;
			}
			if (Object.prototype.toString.call (itemValue) == '[object Number]') {
				if (py_isNaN (value)) {
					return false;
				}
				else {
					return itemValue == parseFloat (value);
				}
			}
			var match = itemValue.toString ().toLowerCase ().indexOf (value.toString ().toLowerCase ());
			return match > -(1);
		};
		for (var i = 0; i < filterColumns.length; i++) {
			if (!(filterValues [i] == '')) {
				result.append (passFilter.bind (null, filterColumns [i], filterValues [i]));
			}
		}
		return result;
	});},
	get getPageData () {return __get__ (this, function (self, data, onSucces, onFailure) {
		var py_items = list ([]);
		var filters = self.getFilters (data.filterColumns, data.filterValues);
		for (var item of self.data) {
			if (filters.every ((function __lambda__ (passFilter) {
				return passFilter (item);
			}))) {
				py_items.append (item);
			}
		}
		var fields = data.sortOn.py_split ('.');
		var compare = function (a, b) {
			var aValue = FakeServer.getNestedValue (a, fields);
			var bValue = FakeServer.getNestedValue (b, fields);
			if (!(aValue == null) && !(bValue == null)) {
				var isNumber = function (v) {
					return Object.prototype.toString.call (v) == '[object Number]';
				};
				if (isNumber (aValue) && isNumber (bValue)) {
					return aValue - bValue;
				}
				else {
					return aValue.toString ().localeCompare (bValue.toString ());
				}
			}
			else if (aValue == null && bValue == null) {
				return 0;
			}
			else if (aValue == null) {
				return -(1);
			}
			else {
				return 1;
			}
		};
		if (!(data.sortOn == '')) {
			if (data.sortAsc) {
				py_items.sort ((function __lambda__ (a, b) {
					return compare (a, b);
				}));
			}
			else {
				py_items.sort ((function __lambda__ (b, a) {
					return compare (a, b);
				}));
			}
		}
		var totalCount = py_items.length;
		var nrOfPages = Math.max (1, Math.ceil (py_items.length / data.pageSize));
		var page = (data.page > nrOfPages ? nrOfPages : (data.page < 1 ? 1 : data.page));
		var indexFrom = (page - 1) * data.pageSize;
		var indexTo = indexFrom + data.pageSize;
		var py_items = py_items.__getslice__ (indexFrom, indexTo, 1);
		var result = dict ({});
		result ['Items'] = py_items;
		result ['CurrentPage'] = page;
		result ['PageCount'] = nrOfPages;
		result ['TotalCount'] = totalCount;
		onSucces (result);
	});}
});

//# sourceMappingURL=pagedList.map

/***/ })
/******/ ]);
//# sourceMappingURL=pagedList.js.map
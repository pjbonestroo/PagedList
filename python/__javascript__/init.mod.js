	__nest__ (
		__all__,
		'init', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					if (Array.prototype.max) {
						console.log ('Overriding existing Array.prototype.max');
					}
					Array.prototype.max = (function __lambda__ () {
						return Math.max.apply (null, this);
					});
					if (Array.prototype.min) {
						console.log ('Overriding existing Array.prototype.min');
					}
					Array.prototype.min = (function __lambda__ () {
						return Math.min.apply (null, this);
					});
					if (Array.prototype.last) {
						console.log ('Overriding existing Array.prototype.last');
					}
					Array.prototype.last = (function __lambda__ () {
						return this [this.length - 1];
					});
					if (Array.prototype.sum) {
						console.log ('Overriding existing Array.prototype.sum');
					}
					Array.prototype.sum = (function __lambda__ () {
						return this.reduce ((function __lambda__ (a, b) {
							return a + b;
						}), 0);
					});
					if (!(Array.prototype.findIndex)) {
						Array.prototype.findIndex = (function __lambda__ (func) {
							return findIndex (this, func);
						});
					}
					if (Array.prototype.findLastIndex) {
						console.log ('Overriding existing Array.prototype.findLastIndex');
					}
					Array.prototype.findLastIndex = (function __lambda__ (func) {
						return findLastIndex (this, func);
					});
					if (Array.prototype.sortNumeric) {
						console.log ('Overriding existing Array.prototype.sortNumeric');
					}
					Array.prototype.sortNumeric = (function __lambda__ () {
						return this.sort ((function __lambda__ (a, b) {
							return a - b;
						}));
					});
					if (!(Math.hypot)) {
						Math.hypot = (function __lambda__ (a, b) {
							return Math.sqrt (Math.pow (a, 2.0) + Math.pow (b, 2.0));
						});
					}
					if (!(Number.MAX_SAFE_INTEGER)) {
						Number.MAX_SAFE_INTEGER = 9007199254740991;
					}
					if (!(Math.log10)) {
						Math.log10 = (function __lambda__ (v) {
							return Math.log (v) / Math.LN10;
						});
					}
					if (!(String.prototype.startsWith)) {
						String.prototype.startsWith = (function __lambda__ (comparator) {
							return startsWith (this, comparator);
						});
					}
					var startsWith = function (input, comparator) {
						if (input.length < comparator.length) {
							return false;
						}
						for (var i = 0; i < comparator.length; i++) {
							if (!(input [i] == comparator [i])) {
								return false;
							}
						}
						return true;
					};
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
					var findLastIndex = function (array, func) {
						var i = array.length - 1;
						while (i > -(1)) {
							if (func (array [i])) {
								return i;
							}
							i--;
						}
						return -(1);
					};
					var lazy = function (func) {
						var args = tuple ([].slice.apply (arguments).slice (1));
						var ns = dict ({'executed': false, 'result': null});
						var lazyfunc = function () {
							if (!(ns ['executed'])) {
								ns ['executed'] = true;
								ns ['result'] = func.apply (null, args);
							}
							return ns ['result'];
						};
						return lazyfunc;
					};
					var async = function (func) {
						var args = tuple ([].slice.apply (arguments).slice (1));
						var deferred = $.Deferred ();
						var execute = function () {
							try {
								deferred.resolve (func.apply (null, args));
							}
							catch (__except0__) {
								if (isinstance (__except0__, Exception)) {
									var e = __except0__;
									deferred.reject (e);
								}
								else {
									throw __except0__;
								}
							}
						};
						setTimeout (execute, 0);
						return deferred.promise ();
					};
					var test = function () {
						console.log ('----- init.test() -----');
						console.log ('max, min, last, sum:');
						console.log (list ([5, 44, 1]).max () == 44);
						console.log (list ([5, 44, 1]).min () == 1);
						console.log (list ([5, 44, 1]).last () == 1);
						console.log (list ([5, 44, 1]).sum () == 50);
						console.log ('findIndex:');
						console.log (list ([5, 6, 7, 8]).findIndex ((function __lambda__ (v) {
							return v < 5;
						})) == -(1));
						console.log (list ([5, 6, 7, 8]).findIndex ((function __lambda__ (v) {
							return v == 5;
						})) == 0);
						console.log (list ([5, 6, 7, 8]).findIndex ((function __lambda__ (v) {
							return v > 5;
						})) == 1);
						console.log ('findLastIndex:');
						console.log (list ([5, 6, 7, 8]).findLastIndex ((function __lambda__ (v) {
							return v > 8;
						})) == -(1));
						console.log (list ([5, 6, 7, 8]).findLastIndex ((function __lambda__ (v) {
							return v == 8;
						})) == 3);
						console.log (list ([5, 6, 7, 8]).findLastIndex ((function __lambda__ (v) {
							return v < 8;
						})) == 2);
						console.log ('sorted:');
						console.log (str (list ([25, 7, -(6), 5]).sortNumeric ()) == '[-6, 5, 7, 25]');
						console.log ('async test:');
						async ((function __lambda__ () {
							return 100;
						})).then ((function __lambda__ (v) {
							return async ((function __lambda__ (v2) {
								return console.log (v2 == 100);
							}), v);
						}));
					};
					__pragma__ ('<all>')
						__all__.async = async;
						__all__.findIndex = findIndex;
						__all__.findLastIndex = findLastIndex;
						__all__.lazy = lazy;
						__all__.startsWith = startsWith;
						__all__.test = test;
					__pragma__ ('</all>')
				}
			}
		}
	);

// Transcrypt'ed from Python, 2018-09-28 11:00:18
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = 'delayer';
export var Delayer =  __class__ ('Delayer', [object], {
	__module__: __name__,
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
		self.lastTime = self.now ();
		func ();
	});}
});
export var Delayer2 =  __class__ ('Delayer2', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self, timespan, resetDelay) {
		if (typeof resetDelay == 'undefined' || (resetDelay != null && resetDelay.hasOwnProperty ("__kwargtrans__"))) {;
			var resetDelay = false;
		};
		self.timespan = timespan;
		self.resetDelay = resetDelay;
		self.lastTimeout = null;
		self.hitTime = null;
	});},
	get now () {return __get__ (this, function (self) {
		return new Date ().getTime ();
	});},
	get execute () {return __get__ (this, function (self, func) {
		var execute_ = function (f) {
			f ();
			self.lastTimeout = null;
		};
		if (self.lastTimeout == null) {
			self.lastTimeout = setTimeout (execute_.bind (null, func), self.timespan);
			self.hitTime = self.now ();
		}
		else {
			clearTimeout (self.lastTimeout);
			var timeLeft = 0.0;
			if (self.resetDelay) {
				var timeLeft = self.timespan;
			}
			else {
				var timeLeft = Math.max (0, self.timespan - (self.now () - self.hitTime));
			}
			self.lastTimeout = setTimeout (execute_.bind (null, func), timeLeft);
		}
	});}
});

//# sourceMappingURL=delayer.map
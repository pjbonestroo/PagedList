// Transcrypt'ed from Python, 2018-09-28 11:00:18
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
var __name__ = 'elements';
export var ElementWrapper =  __class__ ('ElementWrapper', [object], {
	__module__: __name__,
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

//# sourceMappingURL=elements.map
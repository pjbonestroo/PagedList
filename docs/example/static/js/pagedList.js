"use strict";
// Transcrypt'ed from Python, 2017-12-16 14:11:08
function pagedList () {
   var __symbols__ = ['__py3.6__', '__esv5__'];
    var __all__ = {};
    var __world__ = __all__;
    
    /* Nested module-object creator, part of the nesting may already exist and have attributes
    
    A Transcrypt applicaton consists of a main module and additional modules.
    Transcrypt modules constitute a unique, unambigous tree by their dotted names, no matter which of the alternative module root paths they come from.
    The main module is represented by a main function by the name of the application.
    The locals of this function constitute the outer namespace of the Transcrypt application.
    References to all local variables of this function are also assigned to attributes of local variable __all__, using the variable names as an attribute names.
    The main function returns this local variable __all__ (that inside the function is also known by the name __world__)
    Normally this function result is assigned to window.<application name>.
    The function may than be exited (unless its main line starts an ongoing activity), but the application namespace stays alive tby the reference that window has to it.
    In case of the ongoing activity including the script is enough to start it, in other cases it has to be started explicitly by calling window.<application name>.<a function>.
    There may be multiple such entrypoint functions.
    
    Additional modules are represented by objects rather than functions, nested into __world__ (so into __all__ of the main function).
    This nesting can be directly or indirectly, according to the dotted paths of the additional modules.
    One of the methods of the module object is the __init__ function, that's executed once at module initialisation time.
    
    The additional modues also have an __all__ variable, an attribute rather than a local variable.
    However this __all__ object is passed to the __init__ function, so becomes a local variable there.
    Variables in additional modules first become locals to the __init__ function but references to all of them are assigend to __all__ under their same names.
    This resembles the cause of affairs in the main function.
    However __world__ only referes to the __all__ of the main module, not of any additional modules.
    Importing a module boils down to adding all members of its __all__ to the local namespace, directly or via dotted access, depending on the way of import.
    
    In each local namespace of the module function (main function for main module, __init__ for additional modules) there's a variable __name__ holding the name of the module.
    Classes are created inside the static scope of a particular module, and at that (class creation) time their variable __module__ gets assigned a reference to __name__.
    This assignement is generated explicitly by the compiler, as the class creation function __new__ of the metaclass isn't in the static scope containing __name__.
    
    In case of
        import a
        import a.b
    a will have been created at the moment that a.b is imported,
    so all a.b. is allowed to do is an extra attribute in a, namely a reference to b,
    not recreate a, since that would destroy attributes previously present in a
    
    In case of
        import a.b
        import a
    a will have to be created at the moment that a.b is imported
    
    In general in a chain
        import a.b.c.d.e
    a, a.b, a.b.c and a.b.c.d have to exist before e is created, since a.b.c.d should hold a reference to e.
    Since this applies recursively, if e.g. c is already created, we can be sure a and a.b. will also be already created.
    
    So to be able to create e, we'll have to walk the chain a.b.c.d, starting with a.
    As soon as we encounter a module in the chain that isn't already there, we'll have to create the remainder (tail) of the chain.
    
    e.g.
        import a.b.c.d.e
        import a.b.c
    
    will generate
        var modules = {};
        __nest__ (a, 'b.c.d.e', __init__ (__world__.a.b.c.d.e));
        __nest__ (a, 'b.c', __init__ (__world__.a.b.c));
        
    The task of the __nest__ function is to start at the head object and then walk to the chain of objects behind it (tail),
    creating the ones that do not exist already, and insert the necessary module reference attributes into them.   
    */
    
    var __nest__ = function (headObject, tailNames, value) {    
        var current = headObject;
        // In some cases this will be <main function>.__all__,
        // which is the main module and is also known under the synonym <main function.__world__.
        // N.B. <main function> is the entry point of a Transcrypt application,
        // Carrying the same name as the application except the file name extension.
        
        if (tailNames != '') {  // Split on empty string doesn't give empty list
            // Find the last already created object in tailNames
            var tailChain = tailNames.split ('.');
            var firstNewIndex = tailChain.length;
            for (var index = 0; index < tailChain.length; index++) {
                if (!current.hasOwnProperty (tailChain [index])) {
                    firstNewIndex = index;
                    break;
                }
                current = current [tailChain [index]];
            }
            
            // Create the rest of the objects, if any
            for (var index = firstNewIndex; index < tailChain.length; index++) {
                current [tailChain [index]] = {};
                current = current [tailChain [index]];
            }
        }
        
        // Insert it new attributes, it may have been created earlier and have other attributes
        for (var attrib in value) {
            current [attrib] = value [attrib];          
        }       
    };
    __all__.__nest__ = __nest__;
    
    // Initialize module if not yet done and return its globals
    var __init__ = function (module) {
        if (!module.__inited__) {
            module.__all__.__init__ (module.__all__);
            module.__inited__ = true;
        }
        return module.__all__;
    };
    __all__.__init__ = __init__;
    
    
    
    
    // Since we want to assign functions, a = b.f should make b.f produce a bound function
    // So __get__ should be called by a property rather then a function
    // Factory __get__ creates one of three curried functions for func
    // Which one is produced depends on what's to the left of the dot of the corresponding JavaScript property
    var __get__ = function (self, func, quotedFuncName) {
        if (self) {
            if (self.hasOwnProperty ('__class__') || typeof self == 'string' || self instanceof String) {           // Object before the dot
                if (quotedFuncName) {                                   // Memoize call since fcall is on, by installing bound function in instance
                    Object.defineProperty (self, quotedFuncName, {      // Will override the non-own property, next time it will be called directly
                        value: function () {                            // So next time just call curry function that calls function
                            var args = [] .slice.apply (arguments);
                            return func.apply (null, [self] .concat (args));
                        },              
                        writable: true,
                        enumerable: true,
                        configurable: true
                    });
                }
                return function () {                                    // Return bound function, code dupplication for efficiency if no memoizing
                    var args = [] .slice.apply (arguments);             // So multilayer search prototype, apply __get__, call curry func that calls func
                    return func.apply (null, [self] .concat (args));
                };
            }
            else {                                                      // Class before the dot
                return func;                                            // Return static method
            }
        }
        else {                                                          // Nothing before the dot
            return func;                                                // Return free function
        }
    }
    __all__.__get__ = __get__;

    var __getcm__ = function (self, func, quotedFuncName) {
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
    }
    __all__.__getcm__ = __getcm__;
    
    var __getsm__ = function (self, func, quotedFuncName) {
        return func;
    }
    __all__.__getsm__ = __getsm__;
        
    // Mother of all metaclasses        
    var py_metatype = {
        __name__: 'type',
        __bases__: [],
        
        // Overridable class creation worker
        __new__: function (meta, name, bases, attribs) {
            // Create the class cls, a functor, which the class creator function will return
            var cls = function () {                     // If cls is called with arg0, arg1, etc, it calls its __new__ method with [arg0, arg1, etc]
                var args = [] .slice.apply (arguments); // It has a __new__ method, not yet but at call time, since it is copied from the parent in the loop below
                return cls.__new__ (args);              // Each Python class directly or indirectly derives from object, which has the __new__ method
            };                                          // If there are no bases in the Python source, the compiler generates [object] for this parameter
            
            // Copy all methods, including __new__, properties and static attributes from base classes to new cls object
            // The new class object will simply be the prototype of its instances
            // JavaScript prototypical single inheritance will do here, since any object has only one class
            // This has nothing to do with Python multiple inheritance, that is implemented explictly in the copy loop below
            for (var index = bases.length - 1; index >= 0; index--) {   // Reversed order, since class vars of first base should win
                var base = bases [index];
                for (var attrib in base) {
                    var descrip = Object.getOwnPropertyDescriptor (base, attrib);
                    Object.defineProperty (cls, attrib, descrip);
                }           
            }
            
            // Add class specific attributes to the created cls object
            cls.__metaclass__ = meta;
            cls.__name__ = name;
            cls.__bases__ = bases;
            
            // Add own methods, properties and own static attributes to the created cls object
            for (var attrib in attribs) {
                var descrip = Object.getOwnPropertyDescriptor (attribs, attrib);
                Object.defineProperty (cls, attrib, descrip);
            }
            // Return created cls object
            return cls;
        }
    };
    py_metatype.__metaclass__ = py_metatype;
    __all__.py_metatype = py_metatype;
    
    // Mother of all classes
    var object = {
        __init__: function (self) {},
        
        __metaclass__: py_metatype, // By default, all classes have metaclass type, since they derive from object
        __name__: 'object',
        __bases__: [],
            
        // Object creator function, is inherited by all classes (so could be global)
        __new__: function (args) {  // Args are just the constructor args       
            // In JavaScript the Python class is the prototype of the Python object
            // In this way methods and static attributes will be available both with a class and an object before the dot
            // The descriptor produced by __get__ will return the right method flavor
            var instance = Object.create (this, {__class__: {value: this, enumerable: true}});
            

            // Call constructor
            this.__init__.apply (null, [instance] .concat (args));

            // Return constructed instance
            return instance;
        }   
    };
    __all__.object = object;
    
    // Class creator facade function, calls class creation worker
    var __class__ = function (name, bases, attribs, meta) {         // Parameter meta is optional
        if (meta == undefined) {
            meta = bases [0] .__metaclass__;
        }
                
        return meta.__new__ (meta, name, bases, attribs);
    }
    __all__.__class__ = __class__;
    
    // Define __pragma__ to preserve '<all>' and '</all>', since it's never generated as a function, must be done early, so here
    var __pragma__ = function () {};
    __all__.__pragma__ = __pragma__;
    
    	__nest__ (
		__all__,
		'org.transcrypt.__base__', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __name__ = 'org.transcrypt.__base__';
					var __Envir__ = __class__ ('__Envir__', [object], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self) {
							self.interpreter_name = 'python';
							self.transpiler_name = 'transcrypt';
							self.transpiler_version = '3.6.61';
							self.target_subdir = '__javascript__';
						});}
					});
					var __envir__ = __Envir__ ();
					__pragma__ ('<all>')
						__all__.__Envir__ = __Envir__;
						__all__.__envir__ = __envir__;
						__all__.__name__ = __name__;
					__pragma__ ('</all>')
				}
			}
		}
	);
	__nest__ (
		__all__,
		'org.transcrypt.__standard__', {
			__all__: {
				__inited__: false,
				__init__: function (__all__) {
					var __name__ = 'org.transcrypt.__standard__';
					var Exception = __class__ ('Exception', [object], {
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
							if (len (self.__args__)) {
								return '{}{}'.format (self.__class__.__name__, repr (tuple (self.__args__)));
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
					var IterableError = __class__ ('IterableError', [Exception], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, error) {
							Exception.__init__ (self, "Can't iterate over non-iterable", __kwargtrans__ ({error: error}));
						});}
					});
					var StopIteration = __class__ ('StopIteration', [Exception], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, error) {
							Exception.__init__ (self, 'Iterator exhausted', __kwargtrans__ ({error: error}));
						});}
					});
					var ValueError = __class__ ('ValueError', [Exception], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, message, error) {
							Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
						});}
					});
					var KeyError = __class__ ('KeyError', [Exception], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, message, error) {
							Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
						});}
					});
					var AssertionError = __class__ ('AssertionError', [Exception], {
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
					var NotImplementedError = __class__ ('NotImplementedError', [Exception], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, message, error) {
							Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
						});}
					});
					var IndexError = __class__ ('IndexError', [Exception], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, message, error) {
							Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
						});}
					});
					var AttributeError = __class__ ('AttributeError', [Exception], {
						__module__: __name__,
						get __init__ () {return __get__ (this, function (self, message, error) {
							Exception.__init__ (self, message, __kwargtrans__ ({error: error}));
						});}
					});
					var Warning = __class__ ('Warning', [Exception], {
						__module__: __name__,
					});
					var UserWarning = __class__ ('UserWarning', [Warning], {
						__module__: __name__,
					});
					var DeprecationWarning = __class__ ('DeprecationWarning', [Warning], {
						__module__: __name__,
					});
					var RuntimeWarning = __class__ ('RuntimeWarning', [Warning], {
						__module__: __name__,
					});
					var __sort__ = function (iterable, key, reverse) {
						if (typeof key == 'undefined' || (key != null && key .hasOwnProperty ("__kwargtrans__"))) {;
							var key = null;
						};
						if (typeof reverse == 'undefined' || (reverse != null && reverse .hasOwnProperty ("__kwargtrans__"))) {;
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
						if (typeof key == 'undefined' || (key != null && key .hasOwnProperty ("__kwargtrans__"))) {;
							var key = null;
						};
						if (typeof reverse == 'undefined' || (reverse != null && reverse .hasOwnProperty ("__kwargtrans__"))) {;
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
						return function () {
							var __accu0__ = [];
							var __iterable0__ = iterable;
							for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
								var item = __iterable0__ [__index0__];
								__accu0__.append (func (item));
							}
							return __accu0__;
						} ();
					};
					var filter = function (func, iterable) {
						if (func == null) {
							var func = bool;
						}
						return function () {
							var __accu0__ = [];
							var __iterable0__ = iterable;
							for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
								var item = __iterable0__ [__index0__];
								if (func (item)) {
									__accu0__.append (item);
								}
							}
							return __accu0__;
						} ();
					};
					var __Terminal__ = __class__ ('__Terminal__', [object], {
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
							self.buffer = '{}{}{}'.format (self.buffer, sep.join (function () {
								var __accu0__ = [];
								var __iterable0__ = args;
								for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
									var arg = __iterable0__ [__index0__];
									__accu0__.append (str (arg));
								}
								return __accu0__;
							} ()), end).__getslice__ (-(4096), null, 1);
							if (self.element) {
								self.element.innerHTML = self.buffer.py_replace ('\n', '<br>');
								self.element.scrollTop = self.element.scrollHeight;
							}
							else {
								console.log (sep.join (function () {
									var __accu0__ = [];
									var __iterable0__ = args;
									for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
										var arg = __iterable0__ [__index0__];
										__accu0__.append (str (arg));
									}
									return __accu0__;
								} ()));
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
							var answer = window.prompt ('\n'.join (self.buffer.py_split ('\n').__getslice__ (-(16), null, 1)));
							self.print (answer);
							return answer;
						});}
					});
					var __terminal__ = __Terminal__ ();
					__pragma__ ('<all>')
						__all__.AssertionError = AssertionError;
						__all__.AttributeError = AttributeError;
						__all__.DeprecationWarning = DeprecationWarning;
						__all__.Exception = Exception;
						__all__.IndexError = IndexError;
						__all__.IterableError = IterableError;
						__all__.KeyError = KeyError;
						__all__.NotImplementedError = NotImplementedError;
						__all__.RuntimeWarning = RuntimeWarning;
						__all__.StopIteration = StopIteration;
						__all__.UserWarning = UserWarning;
						__all__.ValueError = ValueError;
						__all__.Warning = Warning;
						__all__.__Terminal__ = __Terminal__;
						__all__.__name__ = __name__;
						__all__.__sort__ = __sort__;
						__all__.__terminal__ = __terminal__;
						__all__.filter = filter;
						__all__.map = map;
						__all__.sorted = sorted;
					__pragma__ ('</all>')
				}
			}
		}
	);
    var __call__ = function (/* <callee>, <this>, <params>* */) {   // Needed for __base__ and __standard__ if global 'opov' switch is on
        var args = [] .slice.apply (arguments);
        if (typeof args [0] == 'object' && '__call__' in args [0]) {        // Overloaded
            return args [0] .__call__ .apply (args [1], args.slice (2));
        }
        else {                                                              // Native
            return args [0] .apply (args [1], args.slice (2));
        }
    };
    __all__.__call__ = __call__;

    // Initialize non-nested modules __base__ and __standard__ and make its names available directly and via __all__
    // They can't do that itself, because they're regular Python modules
    // The compiler recognizes their names and generates them inline rather than nesting them
    // In this way it isn't needed to import them everywhere

    // __base__

    __nest__ (__all__, '', __init__ (__all__.org.transcrypt.__base__));
    var __envir__ = __all__.__envir__;

    // __standard__

    __nest__ (__all__, '', __init__ (__all__.org.transcrypt.__standard__));

    var Exception = __all__.Exception;
    var IterableError = __all__.IterableError;
    var StopIteration = __all__.StopIteration;
    var ValueError = __all__.ValueError;
    var KeyError = __all__.KeyError;
    var AssertionError = __all__.AssertionError;
    var NotImplementedError = __all__.NotImplementedError;
    var IndexError = __all__.IndexError;
    var AttributeError = __all__.AttributeError;

    // Warnings Exceptions
    var Warning = __all__.Warning;
    var UserWarning = __all__.UserWarning;
    var DeprecationWarning = __all__.DeprecationWarning;
    var RuntimeWarning = __all__.RuntimeWarning;

    var __sort__ = __all__.__sort__;
    var sorted = __all__.sorted;

    var map = __all__.map;
    var filter = __all__.filter;

    __all__.print = __all__.__terminal__.print;
    __all__.input = __all__.__terminal__.input;

    var __terminal__ = __all__.__terminal__;
    var print = __all__.print;
    var input = __all__.input;

    // Complete __envir__, that was created in __base__, for non-stub mode
    __envir__.executor_name = __envir__.transpiler_name;

    // Make make __main__ available in browser
    var __main__ = {__file__: ''};
    __all__.main = __main__;

    // Define current exception, there's at most one exception in the air at any time
    var __except__ = null;
    __all__.__except__ = __except__;
    
     // Creator of a marked dictionary, used to pass **kwargs parameter
    var __kwargtrans__ = function (anObject) {
        anObject.__kwargtrans__ = null; // Removable marker
        anObject.constructor = Object;
        return anObject;
    }
    __all__.__kwargtrans__ = __kwargtrans__;

    // 'Oneshot' dict promotor, used to enrich __all__ and help globals () return a true dict
    var __globals__ = function (anObject) {
        if (isinstance (anObject, dict)) {  // Don't attempt to promote (enrich) again, since it will make a copy
            return anObject;
        }
        else {
            return dict (anObject)
        }
    }
    __all__.__globals__ = __globals__
    
    // Partial implementation of super () .<methodName> (<params>)
    var __super__ = function (aClass, methodName) {
        // Lean and fast, no C3 linearization, only call first implementation encountered
        // Will allow __super__ ('<methodName>') (self, <params>) rather than only <className>.<methodName> (self, <params>)
        
        for (var index = 0; index < aClass.__bases__.length; index++) {
            var base = aClass.__bases__ [index];
            if (methodName in base) {
               return base [methodName];
            }
        }

        throw new Exception ('Superclass method not found');    // !!! Improve!
    }
    __all__.__super__ = __super__
        
    // Python property installer function, no member since that would bloat classes
    var property = function (getter, setter) {  // Returns a property descriptor rather than a property
        if (!setter) {  // ??? Make setter optional instead of dummy?
            setter = function () {};
        }
        return {get: function () {return getter (this)}, set: function (value) {setter (this, value)}, enumerable: true};
    }
    __all__.property = property;
    
    // Conditional JavaScript property installer function, prevents redefinition of properties if multiple Transcrypt apps are on one page
    var __setProperty__ = function (anObject, name, descriptor) {
        if (!anObject.hasOwnProperty (name)) {
            Object.defineProperty (anObject, name, descriptor);
        }
    }
    __all__.__setProperty__ = __setProperty__
    
    // Assert function, call to it only generated when compiling with --dassert option
    function assert (condition, message) {  // Message may be undefined
        if (!condition) {
            throw AssertionError (message, new Error ());
        }
    }

    __all__.assert = assert;

    var __merge__ = function (object0, object1) {
        var result = {};
        for (var attrib in object0) {
            result [attrib] = object0 [attrib];
        }
        for (var attrib in object1) {
            result [attrib] = object1 [attrib];
        }
        return result;
    };
    __all__.__merge__ = __merge__;

    // Manipulating attributes by name
    
    var dir = function (obj) {
        var aList = [];
        for (var aKey in obj) {
            aList.push (aKey);
        }
        aList.sort ();
        return aList;
    };
    __all__.dir = dir;

    var setattr = function (obj, name, value) {
        obj [name] = value;
    };
    __all__.setattr = setattr;

    var getattr = function (obj, name) {
        return obj [name];
    };
    __all__.getattr= getattr;

    var hasattr = function (obj, name) {
        try {
            return name in obj;
        }
        catch (exception) {
            return false;
        }
    };
    __all__.hasattr = hasattr;

    var delattr = function (obj, name) {
        delete obj [name];
    };
    __all__.delattr = (delattr);

    // The __in__ function, used to mimic Python's 'in' operator
    // In addition to CPython's semantics, the 'in' operator is also allowed to work on objects, avoiding a counterintuitive separation between Python dicts and JavaScript objects
    // In general many Transcrypt compound types feature a deliberate blend of Python and JavaScript facilities, facilitating efficient integration with JavaScript libraries
    // If only Python objects and Python dicts are dealt with in a certain context, the more pythonic 'hasattr' is preferred for the objects as opposed to 'in' for the dicts
    var __in__ = function (element, container) {
        if (py_typeof (container) == dict) {        // Currently only implemented as an augmented JavaScript object
            return container.hasOwnProperty (element);
        }
        else {                                      // Parameter 'element' itself is an array, string or a plain, non-dict JavaScript object
            return (
                container.indexOf ?                 // If it has an indexOf
                container.indexOf (element) > -1 :  // it's an array or a string,
                container.hasOwnProperty (element)  // else it's a plain, non-dict JavaScript object
            );
        }
    };
    __all__.__in__ = __in__;

    // Find out if an attribute is special
    var __specialattrib__ = function (attrib) {
        return (attrib.startswith ('__') && attrib.endswith ('__')) || attrib == 'constructor' || attrib.startswith ('py_');
    };
    __all__.__specialattrib__ = __specialattrib__;

    // Compute length of any object
    var len = function (anObject) {
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
    __all__.len = len;

    // General conversions and checks

    function __i__ (any) {  //  Convert to iterable
        return py_typeof (any) == dict ? any.py_keys () : any;
    }

    function __k__ (keyed, key) {  //  Check existence of dict key via retrieved element
        var result = keyed [key];
        if (typeof result == 'undefined') {
             throw KeyError (key, new Error());
        }
        return result;
    }

    // If the target object is somewhat true, return it. Otherwise return false.
    // Try to follow Python conventions of truthyness
    function __t__ (target) { 
        return (
            // Avoid invalid checks
            target === undefined || target === null ? false :
            
            // Take a quick shortcut if target is a simple type
            ['boolean', 'number'] .indexOf (typeof target) >= 0 ? target :
            
            // Use __bool__ (if present) to decide if target is true
            target.__bool__ instanceof Function ? (target.__bool__ () ? target : false) :
            
            // There is no __bool__, use __len__ (if present) instead
            target.__len__ instanceof Function ?  (target.__len__ () !== 0 ? target : false) :
            
            // There is no __bool__ and no __len__, declare Functions true.
            // Python objects are transpiled into instances of Function and if
            // there is no __bool__ or __len__, the object in Python is true.
            target instanceof Function ? target :
            
            // Target is something else, compute its len to decide
            len (target) !== 0 ? target :
            
            // When all else fails, declare target as false
            false
        );
    }
    __all__.__t__ = __t__;

    var bool = function (any) {     // Always truly returns a bool, rather than something truthy or falsy
        return !!__t__ (any);
    };
    bool.__name__ = 'bool';         // So it can be used as a type with a name
    __all__.bool = bool;

    var float = function (any) {
        if (any == 'inf') {
            return Infinity;
        }
        else if (any == '-inf') {
            return -Infinity;
        }
        else if (isNaN (parseFloat (any))) {    // Call to parseFloat needed to exclude '', ' ' etc.
            if (any === false) {
                return 0;
            }
            else if (any === true) {
                return 1;
            }
            else {  // Needed e.g. in autoTester.check, so "return any ? true : false" won't do
                throw ValueError ("could not convert string to float: '" + str(any) + "'", new Error ());
            }
        }
        else {
            return +any;
        }
    };
    float.__name__ = 'float';
    __all__.float = float;

    var int = function (any) {
        return float (any) | 0
    };
    int.__name__ = 'int';
    __all__.int = int;

    var py_typeof = function (anObject) {
        var aType = typeof anObject;
        if (aType == 'object') {    // Directly trying '__class__ in anObject' turns out to wreck anObject in Chrome if its a primitive
            try {
                return anObject.__class__;
            }
            catch (exception) {
                return aType;
            }
        }
        else {
            return (    // Odly, the braces are required here
                aType == 'boolean' ? bool :
                aType == 'string' ? str :
                aType == 'number' ? (anObject % 1 == 0 ? int : float) :
                null
            );
        }
    };
    __all__.py_typeof = py_typeof;

    var isinstance = function (anObject, classinfo) {
        function isA (queryClass) {
            if (queryClass == classinfo) {
                return true;
            }
            for (var index = 0; index < queryClass.__bases__.length; index++) {
                if (isA (queryClass.__bases__ [index], classinfo)) {
                    return true;
                }
            }
            return false;
        }

        if (classinfo instanceof Array) {   // Assume in most cases it isn't, then making it recursive rather than two functions saves a call
            for (var index = 0; index < classinfo.length; index++) {
                var aClass = classinfo [index];
                if (isinstance (anObject, aClass)) {
                    return true;
                }
            }
            return false;
        }

        try {                   // Most frequent use case first
            return '__class__' in anObject ? isA (anObject.__class__) : anObject instanceof classinfo;
        }
        catch (exception) {     // Using isinstance on primitives assumed rare
            var aType = py_typeof (anObject);
            return aType == classinfo || (aType == bool && classinfo == int);
        }
    };
    __all__.isinstance = isinstance;

    var callable = function (anObject) {
        if ( typeof anObject == 'object' && '__call__' in anObject ) {
            return true;
        }
        else {
            return typeof anObject === 'function';
        }
    };
    __all__.callable = callable;

    // Repr function uses __repr__ method, then __str__, then toString
    var repr = function (anObject) {
        try {
            return anObject.__repr__ ();
        }
        catch (exception) {
            try {
                return anObject.__str__ ();
            }
            catch (exception) { // anObject has no __repr__ and no __str__
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
                                    var attribRepr = attrib;                // If key can be interpreted as numerical, we make it numerical
                                }                                           // So we accept that '1' is misrepresented as 1
                                else {
                                    var attribRepr = '\'' + attrib + '\'';  // Alpha key in dict
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
    __all__.repr = repr;

    // Char from Unicode or ASCII
    var chr = function (charCode) {
        return String.fromCharCode (charCode);
    };
    __all__.chr = chr;

    // Unicode or ASCII from char
    var ord = function (aChar) {
        return aChar.charCodeAt (0);
    };
    __all__.ord = ord;

    // Maximum of n numbers
    var max = Math.max;
    __all__.max = max;

    // Minimum of n numbers
    var min = Math.min;
    __all__.min = min;

    // Absolute value
    var abs = Math.abs;
    __all__.abs = abs;

    // Bankers rounding
    var round = function (number, ndigits) {
        if (ndigits) {
            var scale = Math.pow (10, ndigits);
            number *= scale;
        }

        var rounded = Math.round (number);
        if (rounded - number == 0.5 && rounded % 2) {   // Has rounded up to odd, should have rounded down to even
            rounded -= 1;
        }

        if (ndigits) {
            rounded /= scale;
        }

        return rounded;
    };
    __all__.round = round;

    // BEGIN unified iterator model

    function __jsUsePyNext__ () {       // Add as 'next' method to make Python iterator JavaScript compatible
        try {
            var result = this.__next__ ();
            return {value: result, done: false};
        }
        catch (exception) {
            return {value: undefined, done: true};
        }
    }

    function __pyUseJsNext__ () {       // Add as '__next__' method to make JavaScript iterator Python compatible
        var result = this.next ();
        if (result.done) {
            throw StopIteration (new Error ());
        }
        else {
            return result.value;
        }
    }

    function py_iter (iterable) {                   // Alias for Python's iter function, produces a universal iterator / iterable, usable in Python and JavaScript
        if (typeof iterable == 'string' || '__iter__' in iterable) {    // JavaScript Array or string or Python iterable (string has no 'in')
            var result = iterable.__iter__ ();                          // Iterator has a __next__
            result.next = __jsUsePyNext__;                              // Give it a next
        }
        else if ('selector' in iterable) {                              // Assume it's a JQuery iterator
            var result = list (iterable) .__iter__ ();                  // Has a __next__
            result.next = __jsUsePyNext__;                              // Give it a next
        }
        else if ('next' in iterable) {                                  // It's a JavaScript iterator already,  maybe a generator, has a next and may have a __next__
            var result = iterable
            if (! ('__next__' in result)) {                             // If there's no danger of recursion
                result.__next__ = __pyUseJsNext__;                      // Give it a __next__
            }
        }
        else if (Symbol.iterator in iterable) {                         // It's a JavaScript iterable such as a typed array, but not an iterator
            var result = iterable [Symbol.iterator] ();                 // Has a next
            result.__next__ = __pyUseJsNext__;                          // Give it a __next__
        }
        else {
            throw IterableError (new Error ()); // No iterator at all
        }
        result [Symbol.iterator] = function () {return result;};
        return result;
    }

    function py_next (iterator) {               // Called only in a Python context, could receive Python or JavaScript iterator
        try {                                   // Primarily assume Python iterator, for max speed
            var result = iterator.__next__ ();
        }
        catch (exception) {                     // JavaScript iterators are the exception here
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

    __PyIterator__.prototype.__next__ = function () {
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

    // END unified iterator model

    // Reversed function for arrays
    var py_reversed = function (iterable) {
        iterable = iterable.slice ();
        iterable.reverse ();
        return iterable;
    };
    __all__.py_reversed = py_reversed;

    // Zip method for arrays and strings
    var zip = function () {
        var args = [] .slice.call (arguments);
        for (var i = 0; i < args.length; i++) {
            if (typeof args [i] == 'string') {
                args [i] = args [i] .split ('');
            }
            else if (!Array.isArray (args [i])) {
                args [i] = Array.from (args [i]);
            }
        }
        var shortest = args.length == 0 ? [] : args.reduce (    // Find shortest array in arguments
            function (array0, array1) {
                return array0.length < array1.length ? array0 : array1;
            }
        );
        return shortest.map (                   // Map each element of shortest array
            function (current, index) {         // To the result of this function
                return args.map (               // Map each array in arguments
                    function (current) {        // To the result of this function
                        return current [index]; // Namely it's index't entry
                    }
                );
            }
        );
    };
    __all__.zip = zip;

    // Range method, returning an array
    function range (start, stop, step) {
        if (stop == undefined) {
            // one param defined
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
    __all__.range = range;

    // Any, all and sum

    function any (iterable) {
        for (var index = 0; index < iterable.length; index++) {
            if (bool (iterable [index])) {
                return true;
            }
        }
        return false;
    }
    function all (iterable) {
        for (var index = 0; index < iterable.length; index++) {
            if (! bool (iterable [index])) {
                return false;
            }
        }
        return true;
    }
    function sum (iterable) {
        var result = 0;
        for (var index = 0; index < iterable.length; index++) {
            result += iterable [index];
        }
        return result;
    }

    __all__.any = any;
    __all__.all = all;
    __all__.sum = sum;

    // Enumerate method, returning a zipped list
    function enumerate (iterable) {
        return zip (range (len (iterable)), iterable);
    }
    __all__.enumerate = enumerate;

    // Shallow and deepcopy

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
    __all__.copy = copy;

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
    __all__.deepcopy = deepcopy;

    // List extensions to Array

    function list (iterable) {                                      // All such creators should be callable without new
        var instance = iterable ? [] .slice.apply (iterable) : [];  // Spread iterable, n.b. array.slice (), so array before dot
        // Sort is the normal JavaScript sort, Python sort is a non-member function
        return instance;
    }
    __all__.list = list;
    Array.prototype.__class__ = list;   // All arrays are lists (not only if constructed by the list ctor), unless constructed otherwise
    list.__name__ = 'list';

    /*
    Array.from = function (iterator) { // !!! remove
        result = [];
        for (item of iterator) {
            result.push (item);
        }
        return result;
    }
    */

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

        var result = list ([]);
        for (var index = start; index < stop; index += step) {
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

        if (step == null) { // Assign to 'ordinary' slice, replace subsequence
            Array.prototype.splice.apply (this, [start, stop - start] .concat (source));
        }
        else {              // Assign to extended slice, replace designated items one by one
            var sourceIndex = 0;
            for (var targetIndex = start; targetIndex < stop; targetIndex += step) {
                this [targetIndex] = source [sourceIndex++];
            }
        }
    };

    Array.prototype.__repr__ = function () {
        if (this.__class__ == set && !this.length) {
            return 'set()';
        }

        var result = !this.__class__ || this.__class__ == list ? '[' : this.__class__ == tuple ? '(' : '{';

        for (var index = 0; index < this.length; index++) {
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
        var index = this.indexOf (element);
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
            return this.pop ();  // Remove last element
        }
        else {
            return this.splice (index, 1) [0];
        }
    };

    Array.prototype.py_sort = function () {
        __sort__.apply  (null, [this].concat ([] .slice.apply (arguments)));    // Can't work directly with arguments
        // Python params: (iterable, key = None, reverse = False)
        // py_sort is called with the Transcrypt kwargs mechanism, and just passes the params on to __sort__
        // __sort__ is def'ed with the Transcrypt kwargs mechanism
    };

    Array.prototype.__add__ = function (aList) {
        return list (this.concat (aList));
    };

    Array.prototype.__mul__ = function (scalar) {
        var result = this;
        for (var i = 1; i < scalar; i++) {
            result = result.concat (this);
        }
        return result;
    };

    Array.prototype.__rmul__ = Array.prototype.__mul__;

    // Tuple extensions to Array

    function tuple (iterable) {
        var instance = iterable ? [] .slice.apply (iterable) : [];
        instance.__class__ = tuple; // Not all arrays are tuples
        return instance;
    }
    __all__.tuple = tuple;
    tuple.__name__ = 'tuple';

    // Set extensions to Array
    // N.B. Since sets are unordered, set operations will occasionally alter the 'this' array by sorting it

    function set (iterable) {
        var instance = [];
        if (iterable) {
            for (var index = 0; index < iterable.length; index++) {
                instance.add (iterable [index]);
            }
        }
        instance.__class__ = set;   // Not all arrays are sets
        return instance;
    }
    __all__.set = set;
    set.__name__ = 'set';

    Array.prototype.__bindexOf__ = function (element) { // Used to turn O (n^2) into O (n log n)
    // Since sorting is lex, compare has to be lex. This also allows for mixed lists

        element += '';

        var mindex = 0;
        var maxdex = this.length - 1;

        while (mindex <= maxdex) {
            var index = (mindex + maxdex) / 2 | 0;
            var middle = this [index] + '';

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
        if (this.indexOf (element) == -1) { // Avoid duplicates in set
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
        for (var i = 0; i < other.length; i++) {
            if (this.__bindexOf__ (other [i]) != -1) {
                return false;
            }
        }
        return true;
    };

    Array.prototype.issuperset = function (other) {
        this.sort ();
        for (var i = 0; i < other.length; i++) {
            if (this.__bindexOf__ (other [i]) == -1) {
                return false;
            }
        }
        return true;
    };

    Array.prototype.issubset = function (other) {
        return set (other.slice ()) .issuperset (this); // Sort copy of 'other', not 'other' itself, since it may be an ordered sequence
    };

    Array.prototype.union = function (other) {
        var result = set (this.slice () .sort ());
        for (var i = 0; i < other.length; i++) {
            if (result.__bindexOf__ (other [i]) == -1) {
                result.push (other [i]);
            }
        }
        return result;
    };

    Array.prototype.intersection = function (other) {
        this.sort ();
        var result = set ();
        for (var i = 0; i < other.length; i++) {
            if (this.__bindexOf__ (other [i]) != -1) {
                result.push (other [i]);
            }
        }
        return result;
    };

    Array.prototype.difference = function (other) {
        var sother = set (other.slice () .sort ());
        var result = set ();
        for (var i = 0; i < this.length; i++) {
            if (sother.__bindexOf__ (this [i]) == -1) {
                result.push (this [i]);
            }
        }
        return result;
    };

    Array.prototype.symmetric_difference = function (other) {
        return this.union (other) .difference (this.intersection (other));
    };

    Array.prototype.py_update = function () {   // O (n)
        var updated = [] .concat.apply (this.slice (), arguments) .sort ();
        this.py_clear ();
        for (var i = 0; i < updated.length; i++) {
            if (updated [i] != updated [i - 1]) {
                this.push (updated [i]);
            }
        }
    };

    Array.prototype.__eq__ = function (other) { // Also used for list
        if (this.length != other.length) {
            return false;
        }
        if (this.__class__ == set) {
            this.sort ();
            other.sort ();
        }
        for (var i = 0; i < this.length; i++) {
            if (this [i] != other [i]) {
                return false;
            }
        }
        return true;
    };

    Array.prototype.__ne__ = function (other) { // Also used for list
        return !this.__eq__ (other);
    };

    Array.prototype.__le__ = function (other) {
        return this.issubset (other);
    };

    Array.prototype.__ge__ = function (other) {
        return this.issuperset (other);
    };

    Array.prototype.__lt__ = function (other) {
        return this.issubset (other) && !this.issuperset (other);
    };

    Array.prototype.__gt__ = function (other) {
        return this.issuperset (other) && !this.issubset (other);
    };

    // String extensions

    function str (stringable) {
        try {
            return stringable.__str__ ();
        }
        catch (exception) {
            try {
                return repr (stringable);
            }
            catch (exception) {
                return String (stringable); // No new, so no permanent String object but a primitive in a temporary 'just in time' wrapper
            }
        }
    };
    __all__.str = str;

    String.prototype.__class__ = str;   // All strings are str
    str.__name__ = 'str';

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
        return suffix == '' || this.slice (-suffix.length) == suffix;
    };

    String.prototype.find  = function (sub, start) {
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
    }

    // Since it's worthwhile for the 'format' function to be able to deal with *args, it is defined as a property
    // __get__ will produce a bound function if there's something before the dot
    // Since a call using *args is compiled to e.g. <object>.<function>.apply (null, args), the function has to be bound already
    // Otherwise it will never be, because of the null argument
    // Using 'this' rather than 'null' contradicts the requirement to be able to pass bound functions around
    // The object 'before the dot' won't be available at call time in that case, unless implicitly via the function bound to it
    // While for Python methods this mechanism is generated by the compiler, for JavaScript methods it has to be provided manually
    // Call memoizing is unattractive here, since every string would then have to hold a reference to a bound format method
    __setProperty__ (String.prototype, 'format', {
        get: function () {return __get__ (this, function (self) {
            var args = tuple ([] .slice.apply (arguments).slice (1));
            var autoIndex = 0;
            return self.replace (/\{(\w*)\}/g, function (match, key) {
                if (key == '') {
                    key = autoIndex++;
                }
                if (key == +key) {  // So key is numerical
                    return args [key] == undefined ? match : str (args [key]);
                }
                else {              // Key is a string
                    for (var index = 0; index < args.length; index++) {
                        // Find first 'dict' that has that key and the right field
                        if (typeof args [index] == 'object' && args [index][key] != undefined) {
                            return str (args [index][key]); // Return that field field
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

    String.prototype.rsplit = function (sep, maxsplit) {    // Combination of general whitespace sep and positive maxsplit neither supported nor checked, expensive and rare
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

    String.prototype.py_split = function (sep, maxsplit) {  // Combination of general whitespace sep and positive maxsplit neither supported nor checked, expensive and rare
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
        return this.indexOf (prefix) == 0;
    };

    String.prototype.strip = function () {
        return this.trim ();
    };

    String.prototype.upper = function () {
        return this.toUpperCase ();
    };

    String.prototype.__mul__ = function (scalar) {
        var result = this;
        for (var i = 1; i < scalar; i++) {
            result = result + this;
        }
        return result;
    };

    String.prototype.__rmul__ = String.prototype.__mul__;

    // Dict extensions to object

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

    function __getdefault__ (aKey, aDefault) {  // Each Python object already has a function called __get__, so we call this one __getdefault__
        var result = this [aKey];
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
            // Identify check because user could pass None
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
        if (!objectOrPairs || objectOrPairs instanceof Array) { // It's undefined or an array of pairs
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
                         // User can potentially pass in an object
                         // that has a hierarchy of objects. This
                         // checks to make sure that these objects
                         // get converted to dict objects instead of
                         // leaving them as js objects.
                         
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
                // Passed object is a dict already so we need to be a little careful
                // N.B. - this is a shallow copy per python std - so
                // it is assumed that children have already become
                // python objects at some point.
                
                var aKeys = objectOrPairs.py_keys ();
                for (var index = 0; index < aKeys.length; index++ ) {
                    var key = aKeys [index];
                    instance [key] = objectOrPairs [key];
                }
            } else if (objectOrPairs instanceof Object) {
                // Passed object is a JavaScript object but not yet a dict, don't copy it
                instance = objectOrPairs;
            } else {
                // We have already covered Array so this indicates
                // that the passed object is not a js object - i.e.
                // it is an int or a string, which is invalid.
                
                throw ValueError ("Invalid type of object for dict creation", new Error ());
            }
        }

        // Trancrypt interprets e.g. {aKey: 'aValue'} as a Python dict literal rather than a JavaScript object literal
        // So dict literals rather than bare Object literals will be passed to JavaScript libraries
        // Some JavaScript libraries call all enumerable callable properties of an object that's passed to them
        // So the properties of a dict should be non-enumerable
        __setProperty__ (instance, '__class__', {value: dict, enumerable: false, writable: true});
        __setProperty__ (instance, 'py_keys', {value: __keys__, enumerable: false});
        __setProperty__ (instance, '__iter__', {value: function () {new __PyIterator__ (this.py_keys ());}, enumerable: false});
        __setProperty__ (instance, Symbol.iterator, {value: function () {new __JsIterator__ (this.py_keys ());}, enumerable: false});
        __setProperty__ (instance, 'py_items', {value: __items__, enumerable: false});
        __setProperty__ (instance, 'py_del', {value: __del__, enumerable: false});
        __setProperty__ (instance, 'py_clear', {value: __clear__, enumerable: false});
        __setProperty__ (instance, 'py_get', {value: __getdefault__, enumerable: false});
        __setProperty__ (instance, 'py_setdefault', {value: __setdefault__, enumerable: false});
        __setProperty__ (instance, 'py_pop', {value: __pop__, enumerable: false});
        __setProperty__ (instance, 'py_popitem', {value: __popitem__, enumerable: false});
        __setProperty__ (instance, 'py_update', {value: __update__, enumerable: false});
        __setProperty__ (instance, 'py_values', {value: __values__, enumerable: false});
        __setProperty__ (instance, '__getitem__', {value: __dgetitem__, enumerable: false});    // Needed since compound keys necessarily
        __setProperty__ (instance, '__setitem__', {value: __dsetitem__, enumerable: false});    // trigger overloading to deal with slices
        return instance;
    }

    __all__.dict = dict;
    dict.__name__ = 'dict';
    
    // Docstring setter

    function __setdoc__ (docString) {
        this.__doc__ = docString;
        return this;
    }

    // Python classes, methods and functions are all translated to JavaScript functions
    __setProperty__ (Function.prototype, '__setdoc__', {value: __setdoc__, enumerable: false});

    // General operator overloading, only the ones that make most sense in matrix and complex operations

    var __neg__ = function (a) {
        if (typeof a == 'object' && '__neg__' in a) {
            return a.__neg__ ();
        }
        else {
            return -a;
        }
    };
    __all__.__neg__ = __neg__;

    var __matmul__ = function (a, b) {
        return a.__matmul__ (b);
    };
    __all__.__matmul__ = __matmul__;

    var __pow__ = function (a, b) {
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
    __all__.pow = __pow__;

    var __jsmod__ = function (a, b) {
        if (typeof a == 'object' && '__mod__' in a) {
            return a.__mod__ (b);
        }
        else if (typeof b == 'object' && '__rpow__' in b) {
            return b.__rmod__ (a);
        }
        else {
            return a % b;
        }
    };
    __all__.__jsmod__ = __jsmod__;
    
    var __mod__ = function (a, b) {
        if (typeof a == 'object' && '__mod__' in a) {
            return a.__mod__ (b);
        }
        else if (typeof b == 'object' && '__rpow__' in b) {
            return b.__rmod__ (a);
        }
        else {
            return ((a % b) + b) % b;
        }
    };
    __all__.mod = __mod__;

    // Overloaded binary arithmetic
    
    var __mul__ = function (a, b) {
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
    __all__.__mul__ = __mul__;

    var __truediv__ = function (a, b) {
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
    __all__.__truediv__ = __truediv__;

    var __floordiv__ = function (a, b) {
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
    __all__.__floordiv__ = __floordiv__;

    var __add__ = function (a, b) {
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
    __all__.__add__ = __add__;

    var __sub__ = function (a, b) {
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
    __all__.__sub__ = __sub__;

    // Overloaded binary bitwise
    
    var __lshift__ = function (a, b) {
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
    __all__.__lshift__ = __lshift__;

    var __rshift__ = function (a, b) {
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
    __all__.__rshift__ = __rshift__;

    var __or__ = function (a, b) {
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
    __all__.__or__ = __or__;

    var __xor__ = function (a, b) {
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
    __all__.__xor__ = __xor__;

    var __and__ = function (a, b) {
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
    __all__.__and__ = __and__;

    // Overloaded binary compare
    
    var __eq__ = function (a, b) {
        if (typeof a == 'object' && '__eq__' in a) {
            return a.__eq__ (b);
        }
        else {
            return a == b;
        }
    };
    __all__.__eq__ = __eq__;

    var __ne__ = function (a, b) {
        if (typeof a == 'object' && '__ne__' in a) {
            return a.__ne__ (b);
        }
        else {
            return a != b
        }
    };
    __all__.__ne__ = __ne__;

    var __lt__ = function (a, b) {
        if (typeof a == 'object' && '__lt__' in a) {
            return a.__lt__ (b);
        }
        else {
            return a < b;
        }
    };
    __all__.__lt__ = __lt__;

    var __le__ = function (a, b) {
        if (typeof a == 'object' && '__le__' in a) {
            return a.__le__ (b);
        }
        else {
            return a <= b;
        }
    };
    __all__.__le__ = __le__;

    var __gt__ = function (a, b) {
        if (typeof a == 'object' && '__gt__' in a) {
            return a.__gt__ (b);
        }
        else {
            return a > b;
        }
    };
    __all__.__gt__ = __gt__;

    var __ge__ = function (a, b) {
        if (typeof a == 'object' && '__ge__' in a) {
            return a.__ge__ (b);
        }
        else {
            return a >= b;
        }
    };
    __all__.__ge__ = __ge__;
    
    // Overloaded augmented general
    
    var __imatmul__ = function (a, b) {
        if ('__imatmul__' in a) {
            return a.__imatmul__ (b);
        }
        else {
            return a.__matmul__ (b);
        }
    };
    __all__.__imatmul__ = __imatmul__;

    var __ipow__ = function (a, b) {
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
    __all__.ipow = __ipow__;

    var __ijsmod__ = function (a, b) {
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
    __all__.ijsmod__ = __ijsmod__;
    
    var __imod__ = function (a, b) {
        if (typeof a == 'object' && '__imod__' in a) {
            return a.__imod__ (b);
        }
        else if (typeof a == 'object' && '__mod__' in a) {
            return a.__mod__ (b);
        }
        else if (typeof b == 'object' && '__rpow__' in b) {
            return b.__rmod__ (a);
        }
        else {
            return ((a % b) + b) % b;
        }
    };
    __all__.imod = __imod__;
    
    // Overloaded augmented arithmetic
    
    var __imul__ = function (a, b) {
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
    __all__.__imul__ = __imul__;

    var __idiv__ = function (a, b) {
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
    __all__.__idiv__ = __idiv__;

    var __iadd__ = function (a, b) {
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
    __all__.__iadd__ = __iadd__;

    var __isub__ = function (a, b) {
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
    __all__.__isub__ = __isub__;

    // Overloaded augmented bitwise
    
    var __ilshift__ = function (a, b) {
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
    __all__.__ilshift__ = __ilshift__;

    var __irshift__ = function (a, b) {
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
    __all__.__irshift__ = __irshift__;

    var __ior__ = function (a, b) {
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
    __all__.__ior__ = __ior__;

    var __ixor__ = function (a, b) {
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
    __all__.__ixor__ = __ixor__;

    var __iand__ = function (a, b) {
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
    __all__.__iand__ = __iand__;
    
    // Indices and slices

    var __getitem__ = function (container, key) {                           // Slice c.q. index, direct generated call to runtime switch
        if (typeof container == 'object' && '__getitem__' in container) {
            return container.__getitem__ (key);                             // Overloaded on container
        }
        else {
            return container [key];                                         // Container must support bare JavaScript brackets
        }
    };
    __all__.__getitem__ = __getitem__;

    var __setitem__ = function (container, key, value) {                    // Slice c.q. index, direct generated call to runtime switch
        if (typeof container == 'object' && '__setitem__' in container) {
            container.__setitem__ (key, value);                             // Overloaded on container
        }
        else {
            container [key] = value;                                        // Container must support bare JavaScript brackets
        }
    };
    __all__.__setitem__ = __setitem__;

    var __getslice__ = function (container, lower, upper, step) {           // Slice only, no index, direct generated call to runtime switch
        if (typeof container == 'object' && '__getitem__' in container) {
            return container.__getitem__ ([lower, upper, step]);            // Container supports overloaded slicing c.q. indexing
        }
        else {
            return container.__getslice__ (lower, upper, step);             // Container only supports slicing injected natively in prototype
        }
    };
    __all__.__getslice__ = __getslice__;

    var __setslice__ = function (container, lower, upper, step, value) {    // Slice, no index, direct generated call to runtime switch
        if (typeof container == 'object' && '__setitem__' in container) {
            container.__setitem__ ([lower, upper, step], value);            // Container supports overloaded slicing c.q. indexing
        }
        else {
            container.__setslice__ (lower, upper, step, value);             // Container only supports slicing injected natively in prototype
        }
    };
    __all__.__setslice__ = __setslice__;
	(function () {
		var __name__ = '__main__';
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
		var ScrollPosition = __class__ ('ScrollPosition', [object], {
			__module__: __name__,
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
		var element = function (py_name) {
			return document.createElement (py_name);
		};
		var Element = function (py_name) {
			return ElementWrapper (element (py_name));
		};
		var ElementWrapper = __class__ ('ElementWrapper', [object], {
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
				var __iterable0__ = others;
				for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
					var o = __iterable0__ [__index0__];
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
		var Delayer = __class__ ('Delayer', [object], {
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
				self.lastTime = new Date ().getTime ();
				func ();
			});}
		});
		var namedTuple = function (fields, py_values) {
			if (typeof py_values == 'undefined' || (py_values != null && py_values .hasOwnProperty ("__kwargtrans__"))) {;
				var py_values = null;
			};
			var result = dict ({});
			var __iterable0__ = fields;
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var field = __iterable0__ [__index0__];
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
			var __iterable0__ = fields;
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var f = __iterable0__ [__index0__];
				if (!(object.hasOwnProperty (f))) {
					return false;
				}
			}
			return true;
		};
		var containsMore = function (object, fields) {
			var __iterable0__ = Object.keys (object);
			for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
				var key = __iterable0__ [__index0__];
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
		var PagedList = __class__ ('PagedList', [ElementWrapper], {
			__module__: __name__,
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
				self.topPager = Pager (element ('div'), self);
				self.table = Element ('table');
				self.thead = Element ('thead');
				self.table.append (self.thead);
				self.tbody = Element ('tbody');
				self.table.append (self.tbody);
				self.headerRendered = false;
				self.rows = list ([]);
				self.bottomPager = Pager (element ('div'), self);
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
				self.refreshDelayer = Delayer (500);
				self.styling = PagedListStyling (self);
				self.styling.tableClass ('table table-striped table-hover');
			});},
			get getStyling () {return __get__ (this, function (self) {
				return self.styling;
			});},
			get addColumn () {return __get__ (this, function (self, id, header) {
				if (typeof header == 'undefined' || (header != null && header .hasOwnProperty ("__kwargtrans__"))) {;
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
				if (typeof func == 'undefined' || (func != null && func .hasOwnProperty ("__kwargtrans__"))) {;
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
				var __iterable0__ = DefaultButtons;
				for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
					var button = __iterable0__ [__index0__];
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
				var __iterable0__ = ids;
				for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
					var n = __iterable0__ [__index0__];
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
					var __iterable0__ = elements;
					for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
						var e = __iterable0__ [__index0__];
						th.append (e);
					}
					column.span.element.onclick = self.toggleSort.bind (null, i);
				}
				if (self.buttons.length > 0) {
					var __iterable0__ = self.buttons;
					for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
						var button = __iterable0__ [__index0__];
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
				if (data.CurrentPage > data.PageCount && data.PageCount > 0) {
					self.getData (data.PageCount);
					return ;
				}
				self.receiveData = data;
				if (self.headerRendered == false) {
					self.renderHeader ();
				}
				if (!(fullPage)) {
					var __iterable0__ = data.Items;
					for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
						var item = __iterable0__ [__index0__];
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
					var __iterable0__ = self.rows;
					for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
						var row = __iterable0__ [__index0__];
						row.refreshPosition ();
					}
				}
				if (fullPage) {
					setTimeout ((function __lambda__ () {
						return scrollPosition.restore ();
					}), 0);
				}
				if (!(self._onPageRefreshed == null)) {
					self._onPageRefreshed ();
				}
			});},
			get getData () {return __get__ (this, function (self, page, fullPage) {
				if (typeof fullPage == 'undefined' || (fullPage != null && fullPage .hasOwnProperty ("__kwargtrans__"))) {;
					var fullPage = false;
				};
				if (self.headerRendered == false) {
					self.renderHeader ();
				}
				var sendData = namedTuple (PagedList.SendData, list ([page, self.pageSize, list ([]), list ([]), '', true]));
				var __iterable0__ = self.columns;
				for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
					var column = __iterable0__ [__index0__];
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
				if (typeof fullPage == 'undefined' || (fullPage != null && fullPage .hasOwnProperty ("__kwargtrans__"))) {;
					var fullPage = false;
				};
				if (self.receiveData == null) {
					self.getData (1, fullPage);
				}
				else {
					self.getData (self.receiveData.CurrentPage, fullPage);
				}
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
			get addRowListener () {return __get__ (this, function (self, event, func) {
				var newFunction = function (ev) {
					var rowFound = null;
					var __iterable0__ = self.rows;
					for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
						var row = __iterable0__ [__index0__];
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
				self.tbody.element.addEventListener (event, result, false);
				return result;
			});},
			get removeRowListener () {return __get__ (this, function (self, event, func) {
				self.tbody.element.removeEventListener (event, func, false);
			});}
		});
		var PagedListStyling = __class__ ('PagedListStyling', [object], {
			__module__: __name__,
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
		var PagedListRow = __class__ ('PagedListRow', [ElementWrapper], {
			__module__: __name__,
			get __init__ () {return __get__ (this, function (self, pagedList, item) {
				ElementWrapper.__init__ (self, element ('tr'));
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
				var __iterable0__ = self.pagedList.columns;
				for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
					var column = __iterable0__ [__index0__];
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
					var __iterable0__ = self.pagedList.buttons;
					for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
						var button = __iterable0__ [__index0__];
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
				self.item = item;
				var style = '';
				var __iterable0__ = self.pagedList.styling._rowStylesFunctions;
				for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
					var func = __iterable0__ [__index0__];
					style += func (item) + ' ';
				}
				self.attr ('style', style);
				var styleClass = '';
				var __iterable0__ = self.pagedList.styling._rowClassesFunctions;
				for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
					var func = __iterable0__ [__index0__];
					styleClass += func (item) + ' ';
				}
				self.attr ('class', styleClass);
				if (!(self.pagedList._rowClassesFunction == null)) {
					self.attr ('class', self.pagedList._rowClassesFunction (item));
				}
				var __iterable0__ = self.elementsToRemove;
				for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
					var element = __iterable0__ [__index0__];
					element.removeFromParent ();
				}
				self.elementsToRemove = list ([]);
				var __iterable0__ = self.refreshFunctions;
				for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
					var func = __iterable0__ [__index0__];
					func (item);
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
						var __iterable0__ = self.subRows;
						for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
							var subRow = __iterable0__ [__index0__];
							self.pagedList.tbody.append (subRow);
						}
					}
					else {
						var existingNode = children [positionInRows];
						self.pagedList.tbody.insertBefore (self, existingNode);
						var __iterable0__ = self.subRows.__getslice__ (0, null, 1).reverse ();
						for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
							var subRow = __iterable0__ [__index0__];
							self.pagedList.tbody.insertBefore (subRow, existingNode);
						}
					}
				}
			});}
		});
		var PagedListSubRow = __class__ ('PagedListSubRow', [ElementWrapper], {
			__module__: __name__,
			get __init__ () {return __get__ (this, function (self, pagedList, rowBefore, elementToShow) {
				ElementWrapper.__init__ (self, element ('tr'));
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
		var PagedListButton = __class__ ('PagedListButton', [object], {
			__module__: __name__,
			get __init__ () {return __get__ (this, function (self, id, py_name, styleClass) {
				if (typeof styleClass == 'undefined' || (styleClass != null && styleClass .hasOwnProperty ("__kwargtrans__"))) {;
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
		var PagedListColumn = __class__ ('PagedListColumn', [object], {
			__module__: __name__,
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
				if (typeof py_items == 'undefined' || (py_items != null && py_items .hasOwnProperty ("__kwargtrans__"))) {;
					var py_items = null;
				};
				self.filterEnabled = true;
				if (!(py_items == null)) {
					if (!(py_items.length)) {
						console.error ('.enableFilter on column {} failed. Argument must be an array or list.'.format (self.header));
					}
					var __iterable0__ = py_items;
					for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
						var item = __iterable0__ [__index0__];
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
							result.append (input);
							self.getValueFunction = getValue.bind (null, input.element);
							$ (input.element).bind ('input', pagedList.getData.bind (null, 1, true));
						}
						else {
							var select = Element ('select').attr ('width', '100%');
							result.append (select);
							var filterItemToOption = function (filterItem) {
								var r = Element ('option').attr ('value', filterItem.Value);
								r.element.innerHTML = filterItem.Text;
								return r;
							};
							var options = self.filterItems.map (filterItemToOption);
							options [0].attr ('selected', 'selected');
							var __iterable0__ = options;
							for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
								var option = __iterable0__ [__index0__];
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
		var Pager = __class__ ('Pager', [ElementWrapper], {
			__module__: __name__,
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
				if (typeof text == 'undefined' || (text != null && text .hasOwnProperty ("__kwargtrans__"))) {;
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
		var DataServer = __class__ ('DataServer', [object], {
			__module__: __name__,
			get __init__ () {return __get__ (this, function (self) {
				// pass;
			});},
			get getPageData () {return __get__ (this, function (self, data, onSucces, onFailure) {
				console.error ('Server.getPageData should be overridden.');
			});}
		});
		var AjaxServer = __class__ ('AjaxServer', [DataServer], {
			__module__: __name__,
			get __init__ () {return __get__ (this, function (self, url) {
				DataServer.__init__ (self);
				self.url = url;
			});},
			get getPageData () {return __get__ (this, function (self, data, onSucces, onFailure) {
				var ajaxCall = dict ({'type': 'POST', 'url': self.url, 'data': data, 'success': onSucces, 'error': onFailure});
				$.ajax (ajaxCall);
			});}
		});
		var FakeServer = __class__ ('FakeServer', [DataServer], {
			__module__: __name__,
			get __init__ () {return __get__ (this, function (self) {
				DataServer.__init__ (self);
				self.data = list ([]);
			});},
			get getMaxId () {return __get__ (this, function (self) {
				var result = 0;
				var __iterable0__ = self.data;
				for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
					var item = __iterable0__ [__index0__];
					if (item ['Id'] > result) {
						var result = item ['Id'];
					}
				}
			});},
			get addData () {return __get__ (this, function (self) {
				var py_items = tuple ([].slice.apply (arguments).slice (1));
				var __iterable0__ = py_items;
				for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
					var item = __iterable0__ [__index0__];
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
				var __iterable0__ = self.data;
				for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
					var item = __iterable0__ [__index0__];
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
			}},
			get getFilters () {return __get__ (this, function (self, filterColumns, filterValues) {
				var result = list ([]);
				var passFilter = function (field, value, item) {
					var itemValue = FakeServer.getNestedValue (item, field.py_split ('.'));
					if (itemValue == null) {
						return false;
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
				var __iterable0__ = self.data;
				for (var __index0__ = 0; __index0__ < len (__iterable0__); __index0__++) {
					var item = __iterable0__ [__index0__];
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
		__pragma__ ('<all>')
			__all__.AjaxServer = AjaxServer;
			__all__.DataServer = DataServer;
			__all__.DefaultButtons = DefaultButtons;
			__all__.DefaultText = DefaultText;
			__all__.Delayer = Delayer;
			__all__.Element = Element;
			__all__.ElementWrapper = ElementWrapper;
			__all__.FakeServer = FakeServer;
			__all__.PagedList = PagedList;
			__all__.PagedListButton = PagedListButton;
			__all__.PagedListColumn = PagedListColumn;
			__all__.PagedListRow = PagedListRow;
			__all__.PagedListStyling = PagedListStyling;
			__all__.PagedListSubRow = PagedListSubRow;
			__all__.Pager = Pager;
			__all__.ScrollPosition = ScrollPosition;
			__all__.__name__ = __name__;
			__all__.addDefaultButton = addDefaultButton;
			__all__.containsAll = containsAll;
			__all__.containsMore = containsMore;
			__all__.element = element;
			__all__.findIndex = findIndex;
			__all__.namedTuple = namedTuple;
			__all__.scrollPosition = scrollPosition;
			__all__.version = version;
		__pragma__ ('</all>')
	}) ();
   return __all__;
}
window ['pagedList'] = pagedList ();

// Transcrypt'ed from Python, 2018-09-28 11:00:17
import {AssertionError, AttributeError, BaseException, DeprecationWarning, Exception, IndexError, IterableError, KeyError, NotImplementedError, RuntimeWarning, StopIteration, UserWarning, ValueError, Warning, __JsIterator__, __PyIterator__, __Terminal__, __add__, __and__, __call__, __class__, __envir__, __eq__, __floordiv__, __ge__, __get__, __getcm__, __getitem__, __getslice__, __getsm__, __gt__, __i__, __iadd__, __iand__, __idiv__, __ijsmod__, __ilshift__, __imatmul__, __imod__, __imul__, __in__, __init__, __ior__, __ipow__, __irshift__, __isub__, __ixor__, __jsUsePyNext__, __jsmod__, __k__, __kwargtrans__, __le__, __lshift__, __lt__, __matmul__, __mergefields__, __mergekwargtrans__, __mod__, __mul__, __ne__, __neg__, __nest__, __or__, __pow__, __pragma__, __proxy__, __pyUseJsNext__, __rshift__, __setitem__, __setproperty__, __setslice__, __sort__, __specialattrib__, __sub__, __super__, __t__, __terminal__, __truediv__, __withblock__, __xor__, abs, all, any, assert, bool, bytearray, bytes, callable, chr, copy, deepcopy, delattr, dict, dir, divmod, enumerate, filter, float, getattr, hasattr, input, int, isinstance, issubclass, len, list, map, max, min, object, ord, pow, print, property, py_TypeError, py_iter, py_metatype, py_next, py_reversed, py_typeof, range, repr, round, set, setattr, sorted, str, sum, tuple, zip} from './org.transcrypt.__runtime__.js';
import {ElementWrapper} from './elements.js';
import {Delayer} from './delayer.js';
var __name__ = '__main__';
export var version = '0.0.0.5';
if (!(Array.prototype.findIndex)) {
	Array.prototype.findIndex = (function __lambda__ (func) {
		return findIndex (this, func);
	});
}
export var findIndex = function (array, func) {
	var i = 0;
	while (i < array.length) {
		if (func (array [i])) {
			return i;
		}
		i++;
	}
	return -(1);
};
export var ScrollPosition =  __class__ ('ScrollPosition', [object], {
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
export var scrollPosition = ScrollPosition ();
export var element = function (py_name) {
	return document.createElement (py_name);
};
export var Element = function (py_name) {
	return ElementWrapper (element (py_name));
};
export var namedTuple = function (fields, py_values) {
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
export var containsAll = function (object, fields) {
	for (var f of fields) {
		if (!(object.hasOwnProperty (f))) {
			return false;
		}
	}
	return true;
};
export var containsMore = function (object, fields) {
	for (var key of Object.keys (object)) {
		if (fields.indexOf (key) < 0) {
			return true;
		}
	}
	return false;
};
export var DefaultButtons = list ([]);
export var addDefaultButton = function (id, py_name, styleClass) {
	var result = PagedListButton (id, py_name, styleClass);
	DefaultButtons.append (result);
	return result;
};
export var DefaultText = dict ({'TextTotal': 'Total', 'TextFilter': 'Filter'});
export var PagedList =  __class__ ('PagedList', [ElementWrapper], {
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
export var PagedListStyling =  __class__ ('PagedListStyling', [object], {
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
export var PagedListRow =  __class__ ('PagedListRow', [ElementWrapper], {
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
export var PagedListSubRow =  __class__ ('PagedListSubRow', [ElementWrapper], {
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
export var PagedListButton =  __class__ ('PagedListButton', [object], {
	__module__: __name__,
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
export var PagedListColumn =  __class__ ('PagedListColumn', [object], {
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
export var Pager =  __class__ ('Pager', [ElementWrapper], {
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
export var DataServer =  __class__ ('DataServer', [object], {
	__module__: __name__,
	get __init__ () {return __get__ (this, function (self) {
		// pass;
	});},
	get getPageData () {return __get__ (this, function (self, data, onSucces, onFailure) {
		console.error ('Server.getPageData should be overridden.');
	});}
});
export var AjaxServer =  __class__ ('AjaxServer', [DataServer], {
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
export var FakeServer =  __class__ ('FakeServer', [DataServer], {
	__module__: __name__,
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
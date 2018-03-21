version = "0.0.0.3"

__pragma__ ('alias', 'S', '$') # to use jQuery library with 'S' instead of '$'

if not Array.prototype.findIndex:  # for IE
    Array.prototype.findIndex = lambda func: findIndex(this, func)

def findIndex(array, func):  # for IE
    i = 0
    while i < array.length:
        if func(array[i]):
            return i
        i += 1
    return -1

class ScrollPosition():

    def left(self):
        doc = document.documentElement
        return (window.pageXOffset or doc.scrollLeft) - (doc.clientLeft or 0)

    def top(self):
        doc = document.documentElement
        return (window.pageYOffset or doc.scrollTop) - (doc.clientTop or 0)

    def save(self):
        self._left = self.left()
        self._top = self.top()

    def restore(self):
        window.scrollTo(self._left, self._top)

scrollPosition = ScrollPosition()

# some helper methods / classes

def element(name):
    return document.createElement(name)
 
def Element(name):
    return ElementWrapper(element(name))

class ElementWrapper():
    def __init__(self, element):
        if element == None:
            raise Exception("ElementWrapper: element cannot be None")
        self.element = element

    def getElement(self):
        return self.element
     
    def append(self, *others):
        for o in others:
            self.element.appendChild(o.element)
        return self
         
    def attr(self, name, value):
        self.element.setAttribute(name, value)
        return self
         
    def refresh(self):
        raise Exception("Needs to be implemented by sub-classes")
    
    def removeChilds(self):
        while self.element.hasChildNodes():
            self.element.removeChild(self.element.firstChild)
    
    def removeFromParent(self):
        self.element.parentNode.removeChild(self.element)

    def children(self):
        return Array.prototype.slice.call(self.element.children)

    def indexInParent(self):
        return self.children().indexOf(self.element)

    def insertBefore(self, newnode: 'ElementWrapper', existingnode: 'ElementWrapper'):
        return self.element.insertBefore(newnode.element, existingnode.element)

class Delayer():
    """ Simple delayer to call functions not too many times in a certain timespan. """

    def __init__(self, timespan):
        self.timespan = timespan # timespan in milliseconds
        self.lastTime = None # last time executed in milliseconds since 1970/01/01
        self.functionHolder = None
    
    def now(self):
        return __new__(Date()).getTime()

    def execute(self, func):
        """ Function func gets executed (without arguments) if no other funcion is executed for a certain timespan.
        Otherwise the function is remembered and executed when the time is elapsed.
        If other calls are done in the meantime, only the last function gets executed when time is elapsed.
        If an other function call is just finished, this call will execute immediately.
        """
        if self.lastTime == None:
            self.executeNow(func)
        else:
            waitTime = self.lastTime + self.timespan - self.now()
            if waitTime < 0:
                self.executeNow(func)
            else:
                if self.functionHolder == None:
                    # place new timeout
                    self.functionHolder = func
                    def executeLater():
                        self.executeNow(self.functionHolder)
                        self.functionHolder = None
                        self.lastTime = None
                    setTimeout(executeLater, waitTime)
                else:
                    # hold new function for already placed timeout
                    self.functionHolder = func

    def executeNow(self, func):
        self.lastTime = __new__(Date()).getTime()
        func()

#
# Make object with attributes according fields
#
def namedTuple(fields, values=None):
    result = {}
    for field in fields:
        result[field] = None
    if not values == None:
        for i in range(0, values.length):
            result[fields[i]] = values[i]
    return result
        
def containsAll(object, fields):
    for f in fields:
        if not object.hasOwnProperty(f):
            return False
    return True

def containsMore(object, fields):
    for key in Object.js_keys(object):
        if fields.indexOf(key) < 0:
            return True
    return False

DefaultButtons = []

def addDefaultButton(id, name, styleClass):
    result = PagedListButton(id, name, styleClass)
    DefaultButtons.append(result)
    return result
    
DefaultText = { 'TextTotal': "Total", 'TextFilter': 'Filter' }

class PagedList(ElementWrapper):
    
    SendData = { 'page', 'pageSize', 'filterColumns', 'filterValues', 'sortOn', 'sortAsc' }
    ReceiveData = { 'Items', 'CurrentPage', 'PageCount', 'TotalCount' }
    
    def __init__(self, container: str, url: str):
        if Object.prototype.toString.call(container) == "[object String]": # container is an id
            self.containerId = container
            container = document.querySelector(self.containerId)
            if container == None:
                console.error("Paged-List cannot find container with id {}".format(self.containerId))
            ElementWrapper.__init__(self, container)
        else:
            self.containerId = container.id if not container.id == '' else 'Unknown id'
            # Todo: check if container is HTML Element
            ElementWrapper.__init__(self, container)
        self.topPager = Pager(element('div'), self)
        self.table = Element('table')
        self.thead = Element('thead'); self.table.append(self.thead)
        self.tbody = Element('tbody'); self.table.append(self.tbody)
        self.headerRendered = False
        self.rows = [] # type: List[PagedListRow]
        self.bottomPager = Pager(element('div'), self)
        self.append(self.topPager, self.table, self.bottomPager)
        if url == None or url == "":
            self._server = FakeServer() # type: DataServer
        else:
            self._server = AjaxServer(url) # type: DataServer
        self.receiveData = None  # object with field as in ReceiveData
        self.buttons = []  # PagedListButton's
        self.columns = []  # PagedListColumn's
        self.sorting = { 'columnIndex':-1, 'ascending': True }  # initial values, no sorting
        self.pageSize = 20  # default value
        self.mergeButtonColumns = False
        self._onPageRefreshed = None
        self._onPageRefreshing = None
        self.refreshDelayer = Delayer(500) # to make sure the refresh function does not get called too many times (for example caused by callbacks on server triggers)
        self.styling = PagedListStyling(self)
        self.styling.tableClass('table table-striped table-hover')

    def getStyling(self):
        return self.styling

    def addColumn(self, id: str, header: str = id):
        column = PagedListColumn(id, header)
        self.columns.append(column)
        return column

    def setUrl(self, url: str):
        self._server.url = url
        return self

    def getUrl(self):
        if not self._server == None:
            return self._server.url
        return ''

    def onPageRefreshed(self, func = None):
        if typeof(func) == 'function':
            self._onPageRefreshed = func
        elif func == None:
            self._onPageRefreshed = None
        else:
            console.error(".onPageRefreshed on Paged-List for container with id {} failed. Passed argument is not a function.".format(self.containerId))
        return self

    def onPageRefreshing(self, func = None):
        if typeof(func) == 'function':
            self._onPageRefreshing = func
        elif func == None:
            self._onPageRefreshing = None
        else:
            console.error("._onPageRefreshing on Paged-List for container with id {} failed. Passed argument is not a function.".format(self.containerId))
        return self
    
    def addButton(self, id, name, styleClass):
        button = None
        if styleClass == None:
            button = PagedListButton(id, id, name)
        else:
            button = PagedListButton(id, name, styleClass)
        self.buttons.append(button)
        return button

    def getTopPager(self):
        return self.topPager

    def getBottomPager(self):
        return self.bottomPager
    
    def hideCount(self):  # to hide the counter (Total: ...)
        self.topPager.hideCount()
        self.bottomPager.hideCount()
        return self
    
    def disablePagination(self):
        self.topPager.disable()
        self.bottomPager.disable()
        return self
    
    def addDefaultButtons(self, *ids):
        for button in DefaultButtons:
            if button.id in ids:
                newButton = button.copy()
                if self[newButton.id] == None:
                    self[newButton.id] = newButton
                    self.buttons.append(newButton)
                else:
                    console.error("Paged-List for container with id {} cannot add default button '{}' since it already exists.".format(self.containerId, newButton.id))
        for n in ids:
            if DefaultButtons.findIndex(lambda b: b.id == n) < 0:
                console.error("Paged-List for container with id {} cannot add default button '{}' since this isn't a default button.".format(self.containerId, n))
    
    def renderHeader(self):
        if self.columns.length == 0:
            console.error("Paged-List for container with id {} cannot render header. It does not contain columns.".format(self.containerId))
        tr = Element('tr'); self.thead.append(tr)
        for i in range(0, self.columns.length):
            column = self.columns[i]
            th = Element('th'); tr.append(th)
            if column.classesHeader.length > 0:
                th.attr('class', " ".join(column.classesHeader))
            if column.stylesHeader.length > 0:
                th.attr('style', " ".join(column.stylesHeader))
            #th.attr('style', 'vertical-align:top')
            elements = column.getElements(self)
            for e in elements:
                th.append(e)
            column.span.element.onclick = self.toggleSort.bind(None, i)
        if self.buttons.length > 0:
            for button in self.buttons:
                tr.append(Element('th').attr("class", self.styling.classButtonColumn))
                if self.mergeButtonColumns:
                    break
        self.headerRendered = True
    
    def toggleSort(self, columnIndex):
        column = self.columns[columnIndex]
        if column.sortable:
            if self.sorting.columnIndex >= 0:
                self.columns[self.sorting.columnIndex].toggleFigure.attr('class', '')
            if self.sorting.columnIndex == columnIndex:
                if self.sorting.ascending == True:
                    self.sorting.ascending = False
                else:
                    self.sorting.columnIndex = -1
            else:  # self.sorting.columnIndex == -1 or not self.sorting.columnIndex == columnIndex:
                self.sorting.columnIndex = columnIndex
                self.sorting.ascending = True
            # # set class on toggle figure
            if self.sorting.columnIndex >= 0:
                if self.sorting.ascending:
                    column.toggleFigure.attr('class', self.styling.classAscending)
                else:
                    column.toggleFigure.attr('class', self.styling.classDescending)
            self.getData(1, True)

    def render(self, data, fullPage):
        if self.columns.length == 0:
            console.error("Paged-List for container with id {} cannot render. It does not contain columns.".format(self.containerId))
        # ReceiveData = { 'Items', 'CurrentPage', 'PageCount', 'TotalCount' }
        if not containsAll(data, PagedList.ReceiveData):
            console.error("Paged-List for container with id {} cannot render. Received data does not contain all required fields: {}.".format(self.containerId, PagedList.ReceiveData))
        if self._onPageRefreshing != None:
            self._onPageRefreshing()
        if data.CurrentPage > data.PageCount and data.PageCount > 0:
            self.getData(data.PageCount)
            return
        self.receiveData = data
        # render header if not done yet
        if self.headerRendered == False:
            self.renderHeader()
        # set property 'Id' of item if item has property 'id' but not 'Id'
        if not fullPage:
            for item in data.Items:
                if item.hasOwnProperty('id') and not item.hasOwnProperty('Id'):
                    item['Id'] = item['id']
        # if not all items in data have property 'Id', force to rerender full page
        if not fullPage and not data.Items.every(lambda item: item.hasOwnProperty('Id')):
            fullPage = True
        # remove all current rows
        if fullPage:
            scrollPosition.save()
            while self.rows.length > 0:
                self.rows[0].remove()
        # remove all current rows which are not in data
        if not fullPage:
            i = 0
            while i < self.rows.length:
                row = self.rows[i]
                if data.Items.findIndex(lambda item: item.Id == row.item.Id) < 0:
                    row.remove()
                else:
                    i += 1
        # refresh top- and bottom-pagers
        self.topPager.refresh(data.CurrentPage, data.PageCount, data.TotalCount)
        self.bottomPager.refresh(data.CurrentPage, data.PageCount, data.TotalCount)
        # add or update rows for all items in data
        for i in range(0, data.Items.length):
            item = data.Items[i]
            if fullPage:
                PagedListRow(self, item)
            else:
                index = self.rows.findIndex(lambda r: r.item.Id == item.Id)
                if index > -1:
                    row = self.rows[index]
                    row.refresh(item)
                    # sorting according data.Items:
                    self.rows.remove(row)
                    self.rows.append(row)
                else:
                    PagedListRow(self, item)
        # refresh sorting according self.rows
        if not fullPage:
            for row in self.rows:
                row.refreshPosition()
        if fullPage:
            setTimeout(lambda: scrollPosition.restore(), 0)
        if self._onPageRefreshed != None:
            self._onPageRefreshed()

    def getData(self, page, fullPage = False):
        if self.headerRendered == False:
            self.renderHeader()
        # SendData = { 'page', 'pageSize', 'filterColumns', 'filterValues', 'sortOn', 'sortAsc' }
        sendData = namedTuple(PagedList.SendData, [page, self.pageSize, [], [], '', True ])
        for column in self.columns:
            if column.filterEnabled:
                sendData.filterColumns.append(column.id)
                sendData.filterValues.append(column.getValueFunction())
        if self.sorting.columnIndex >= 0:
            sendData.sortOn = self.columns[self.sorting.columnIndex].id
            sendData.sortAsc = self.sorting.ascending
        def onSucces(data):
            self.render.bind(None, data, fullPage)()
        self.refreshDelayer.execute(self._server.getPageData.bind(None, sendData, onSucces, self.getDataError))
        # self._server.getPageData(sendData, onSucces, self.getDataError)

    def getDataError(self, data, errorText):
        console.error("Paged-List for container with id = {} didn't receive data. Error: {}.".format(self.containerId, errorText))

    def refresh(self, fullPage = False):
        if self.receiveData == None:
            self.getData(1, fullPage)
        else:
            self.getData(self.receiveData.CurrentPage, fullPage)

    def refreshItem(self, item, newItem = None):
        r = self.getRow(item)
        if r != None:
            r.refresh(newItem)

    def getRow(self, item):
        """ Return the row which contains item as data """
        for row in self.rows: # type: PagedListRow
            if item == row.item:
                return row
        return None

    def getServer(self):
        return self._server

    def fakeServer(self):
        self._server = FakeServer()
        return self._server

    def ajaxServer(self, url):
        self._server = AjaxServer(url)
        return self._server

    def addRowListener(self, event, func, useCapture: bool = False):
        def newFunction(ev):
            rowFound = None
            for row in self.rows:
                if row.element.contains(ev.target):
                    rowFound = row
                    break
            if not rowFound == None:
                func(rowFound.item, ev)
        result = newFunction
        self.tbody.element.addEventListener(event, result, useCapture)
        return result

    def removeRowListener(self, event, func, useCapture: bool = False):
        self.tbody.element.removeEventListener(event, func, useCapture)
    
        
class PagedListStyling():

    def __init__(self, pagedList):
        self.pagedList = pagedList
        self._rowStylesFunctions = [] # type: List[Callable[[item], string]] # functions which return string with styles as function of item (data of 1 row)
        self._rowClassesFunctions = [] # type: List[Callable[[item], string]] # functions which return string with style classes as function of item (data of 1 row)
        self.classExpanded = 'cursor glyphicon glyphicon-triangle-bottom'
        self.classCollapsed = 'cursor glyphicon glyphicon-triangle-right'
        self.classAscending = 'glyphicon glyphicon-triangle-top'
        self.classDescending = 'glyphicon glyphicon-triangle-bottom'
        self.classButtonColumn = 'pagedList-buttonColumn'

    def rowStyles(self, func):
        if typeof(func) == 'function':
            self._rowStylesFunctions.append(func)
        elif func == None:
            self._rowStylesFunctions = []
        else:
            console.error(".rowStyles on Paged-List for container with id {} failed. Passed argument is not a function.".format(self.containerId))
        return self

    def rowClasses(self, func):
        if typeof(func) == 'function':
            self._rowClassesFunctions.append(func)
        elif func == None:
            self._rowClassesFunctions = []
        else:
            console.error(".rowClasses on Paged-List for container with id {} failed. Passed argument is not a function.".format(self.containerId))
        return self

    def tableClass(self, styleClass):
        self.pagedList.table.attr('class', styleClass)
        return self

    def tableStyle(self, style):
        self.pagedList.table.attr('style', style)
        return self

    def setClassExpanded(self, styleClass):
        self.classExpanded = styleClass
        return self

    def setClassCollapsed(self, styleClass):
        self.classCollapsed = styleClass
        return self

    def setClassAscending(self, styleClass):
        self.classAscending = styleClass
        return self

    def setClassDescending(self, styleClass):
        self.classDescending = styleClass
        return self

    def setClassButtonColumn(self, styleClass):
        self.classButtonColumn = styleClass
        return self

class PagedListRow(ElementWrapper):

    def __init__(self, pagedList: 'PagedList', item):
        """ item contains data for this row """
        ElementWrapper.__init__(self, element('tr'))
        self.pagedList = pagedList
        self.item = item
        self.refreshFunctions = []
        self.elementsToRemove = [] # List[ElementWrapper] # elements to remove on refresh
        self.subRows = [] # List[PagedListSubRow]
        self.addToPagedList()
        self.render()
        self.refresh(self.item)

    def addToPagedList(self):
        self.pagedList.rows.append(self)
        self.pagedList.tbody.append(self)

    def remove(self):
        index = self.pagedList.rows.indexOf(self)
        self.pagedList.rows.splice(index, 1)
        self.removeFromParent()
        while self.subRows.length > 0:
            self.subRows[0].remove()

    def lengthInRows(self):
        return 1 + self.subRows.length
    
    def positionInRows(self):
        result = 0
        for i in range(0, self.pagedList.rows.length):
            row = self.pagedList.rows[i]
            if self == row:
                break
            else:
                result += row.lengthInRows()
        return result

    def positionInParent(self):
        return self.indexInParent()

    def render(self):
        for column in self.pagedList.columns:
            td = Element('td')
            self.append(td)
            if column.classesRows.length > 0:
                td.attr('class', " ".join(column.classesRows))
            if column.stylesRows.length > 0:
                td.attr('style', " ".join(column.stylesRows))
            if not column.onExpandItemFunction == None:
                buttonExpand = ElementWrapper(document.createElement('span'))
                buttonExpand.isExpanded = False
                def clsName(isExpanded):
                    return self.pagedList.styling.classExpanded if isExpanded else self.pagedList.styling.classCollapsed
                buttonExpand.element.className = clsName(buttonExpand.isExpanded)
                def toggleExpand(buttonExpand, expandFunction, rowBefore: 'PagedListRow', event):
                    buttonExpand.isExpanded = not buttonExpand.isExpanded
                    buttonExpand.element.className = clsName(buttonExpand.isExpanded)
                    if buttonExpand.isExpanded:
                        buttonExpand.row = PagedListSubRow(self.pagedList, rowBefore, expandFunction())
                        self.subRows.append(buttonExpand.row)
                    else:
                        buttonExpand.row.remove()
                        buttonExpand.row = None
                    event.stopPropagation()
                td.append(buttonExpand)
                def refreshFunction(buttonExpand, toggleExpand, column, item):
                    buttonExpand.element.onclick = toggleExpand.bind(None, buttonExpand, column.onExpandItemFunction.bind(None, item), self)
                self.refreshFunctions.append(refreshFunction.bind(None, buttonExpand, toggleExpand, column))
            if not column.itemToHtmlFunction == None:
                htmlSpan = document.createElement('span'); td.element.appendChild(htmlSpan)
                def refreshFunction(span, column, item):
                    span.innerHTML = column.itemToHtmlFunction(item)
                self.refreshFunctions.append(refreshFunction.bind(None, htmlSpan, column))
            if not column.itemToElementFunction == None:
                def refreshFunction(td, column, item):
                    columnElement = ElementWrapper(column.itemToElementFunction(item))
                    self.elementsToRemove.append(columnElement)
                    td.append(columnElement)
                self.refreshFunctions.append(refreshFunction.bind(None, td, column))
        self.refreshFunctions.append(self.renderButtons)

    def renderButtons(self, item):
        if self.pagedList.buttons.length > 0:
            td = None
            if self.pagedList.mergeButtonColumns:
                td = Element('td').attr("class", self.pagedList.styling.classButtonColumn)
                self.append(td); self.elementsToRemove.append(td)
            for button in self.pagedList.buttons:
                if not self.pagedList.mergeButtonColumns:
                    td = Element('td').attr("class", self.pagedList.styling.classButtonColumn)
                    self.append(td); self.elementsToRemove.append(td)
                if button._showIf == None or button._showIf(item):
                    buttonElement = button.getElement(item)
                    td.append(buttonElement)

    def refresh(self, item):
        """ Compute styling and re-render elements of this row. """
        if item != None:
            self.item = item
        style = ""
        for func in self.pagedList.styling._rowStylesFunctions:
            style += func(self.item) + " "
        self.attr('style', style)
        styleClass = ""
        for func in self.pagedList.styling._rowClassesFunctions:
            styleClass += func(self.item) + " "
        self.attr('class', styleClass)
        if not self.pagedList._rowClassesFunction == None:
            self.attr('class', self.pagedList._rowClassesFunction(self.item))
        for element in self.elementsToRemove:
            element.removeFromParent()
        self.elementsToRemove = []
        for func in self.refreshFunctions:
            func(self.item)

    def refreshPosition(self):
        # make sorting of elements according sorting in pagedList.rows
        positionInParent = self.positionInParent()
        positionInRows = self.positionInRows()
        if not positionInParent == positionInRows:
            self.removeFromParent()
            children = self.pagedList.tbody.children()
            if not children.length > positionInRows:
                self.pagedList.tbody.append(self)
                for subRow in self.subRows:
                    self.pagedList.tbody.append(subRow)
            else:
                existingNode = children[positionInRows]
                self.pagedList.tbody.insertBefore(self, existingNode)
                for subRow in self.subRows[:].reverse():
                    self.pagedList.tbody.insertBefore(subRow, existingNode)

class PagedListSubRow(ElementWrapper):

    def __init__(self, pagedList: 'PagedList', rowBefore: 'PagedListRow', elementToShow):
        ElementWrapper.__init__(self, element('tr'))
        self.pagedList = pagedList
        self.rowBefore = rowBefore
        self.elementToShow = elementToShow
        self.render()

    def render(self):
        td = Element('td'); td.element.className = 'subPagedListTd'; self.append(td)
        td.element.colSpan = self.pagedList.columns.length + self.pagedList.buttons.length
        table = Element('table'); table.element.className = 'subPagedListTable'; td.append(table)
        subRow = Element('tr'); table.append(subRow)
        td1 = Element('td'); td1.element.className = 'subPagedListCell1'; subRow.append(td1)
        td2 = Element('td'); td2.element.className = 'subPagedListCell2'; subRow.append(td2)
        td2.element.appendChild(self.elementToShow)
        self.rowBefore.element.parentNode.insertBefore(self.element, self.rowBefore.element.nextSibling)
        S(self.element).hide().fadeIn()

    def remove(self):
        self.removeFromParent()
        index = self.rowBefore.subRows.indexOf(self)
        if index > -1:
            self.rowBefore.subRows.splice(index, 1)

# Button for PagedList. Buttons are shown for each row.
# Function onclick can be added which will be called with row-item as argument.
# Function showIf can be added to 
class PagedListButton():
    
    def __init__(self, id, name, styleClass=""):
        self.id = id
        self.name = name
        self.styleClass = styleClass
        self._onclick = None
        self._showIf = None
        
    def onclick(self, functionOnclick):
        if not self._onclick == None:
            console.error(".onclick on button {} failed. Button has already an onclick-function.".format(self.id))
        if not typeof(functionOnclick) == 'function':
            console.error(".onclick on button {} failed. Passed argument is not a function.".format(self.id))
        self._onclick = functionOnclick
        return self
    
    def onClick(self, functionOnclick):
        return self.onclick(functionOnclick)
    
    def showIf(self, functionShowIf):
        #if not self._showIf == None:
        #    console.error(".showIf on button {} failed. Button has already an showIf-function.".format(self.id))
        if not typeof(functionShowIf) == 'function':
            console.error(".showIf on button {} failed. Passed argument is not a function.".format(self.id))
        self._showIf = functionShowIf
        return self
    
    def showif(self, functionShowIf):
        return self.showIf(functionShowIf)
    
    def getElement(self, item):
        result = Element('button')
        result.element.innerHTML = self.name
        result.attr('class', self.styleClass)
        if not self._onclick == None:
            result.element.onclick = self._onclick.bind(None, item)
        return result
    
    def copy(self):
        result = PagedListButton(self.id, self.name, self.styleClass)
        result._onclick = self._onclick
        result._showIf = self._showIf
        return result

class PagedListColumn():
    
    FilterItem = { 'Text', 'Value' }
    
    def __init__(self, id, header):
        self.id = id
        self.header = header
        self.sortable = False
        self.filterEnabled = False
        self.filterItems = None
        self.itemToHtmlFunction = None  # function which accepts an item (the data for 1 row) and returns html string, which is the content of the table cell.
        self.itemToElementFunction = None # function which accepts an item (the data for 1 row) and returns an html element, which is the content of the table cell.
        self.onExpandItemFunction = None # function which accepts an item (the data for 1 row) and returns an html element, which must be shown below row when expand is clicked
        self.span = None  # element to show in header, and to click on for toggling sort
        self.toggleFigure = None  # figure (html element) to show sorting (arrow)
        self.getValueFunction = None  # function which returns the value of the sorting (input or select) element
        self.classesHeader = ["pagedListColumnHeader"] # html style classes to use for the header
        self.stylesHeader = [] # html styles to use for the header
        self.classesHeaderSpan = [] # html style classes to use for the span in the header
        self.stylesHeaderSpan = [] # html styles to use for the span in the header
        self.classesRows = ["pagedListColumnRow"] # html style classes to use for the data rows (for all rows, item independent)
        self.stylesRows = [] # html styles to use for the data rows (for all rows, item independent)

    
    def addClassHeader(self, styleClass):
        self.classesHeader.append(styleClass)
        return self

    def addStyleHeader(self, style):
        self.stylesHeader.append(style)
        return self

    def addClassHeaderSpan(self, styleClass):
        self.classesHeaderSpan.append(styleClass)
        return self

    def addStyleHeaderSpan(self, style):
        self.stylesHeaderSpan.append(style)
        return self

    def addClassRows(self, styleClass):
        self.classesRows.append(styleClass)
        return self

    def addStyleRows(self, style):
        self.stylesRows.append(style)
        return self

    def addStyle(self, style):
        self.addStyleHeader(style)
        self.addStyleRows(style)
        return self

    def addClass(self, styleClass):
        self.addClassHeader(styleClass)
        self.addClassRows(styleClass)
        return self
    
    def enableSort(self):
        self.sortable = True
        return self

    def enableFilter(self, items=None):
        self.filterEnabled = True
        if not items == None:
            if not items.length:
                console.error(".enableFilter on column {} failed. Argument must be an array or list.".format(self.header))
            for item in items:
                if not containsAll(item, PagedListColumn.FilterItem):
                    console.error(".enableFilter on column {} failed. Each FilterItem must contain all fields: {}".format(self.header, PagedListColumn.FilterItem))
            self.filterItems = items[:]
        return self
    
    def itemToHtml(self, itemToHtmlFunction):
        if not typeof(itemToHtmlFunction) == 'function':
            console.error(".itemToHtml on column {} failed. Passed argument is not a function.".format(self.header))
        self.itemToHtmlFunction = itemToHtmlFunction
        return self

    def itemToElement(self, itemToElementFunction):
        if not typeof(itemToElementFunction) == 'function':
            console.error(".itemToElement on column {} failed. Passed argument is not a function.".format(self.header))
        self.itemToElementFunction = itemToElementFunction
        return self

    def onExpandItem(self, onExpandItem):
        if not typeof(onExpandItem) == 'function':
            console.error(".onExpandItem on column {} failed. Passed argument is not a function.".format(self.header))
        self.onExpandItemFunction = onExpandItem
        return self
    
    def getElements(self, pagedList):
        result = []
        if self.span == None:
            self.span = Element('span'); result.append(self.span)
            self.span.element.innerHTML = self.header
            if self.classesHeaderSpan.length > 0:
                self.span.attr('class', " ".join(self.classesHeaderSpan))
            if self.stylesHeaderSpan.length > 0:
                self.span.attr('style', " ".join(self.stylesHeaderSpan))
            if self.sortable:
                self.span.attr('role', 'button')
                self.toggleFigure = Element('i')
                result.append(self.toggleFigure)
            if self.filterEnabled:
                result.append(Element('br'))
                def getValue(element):
                    return S(element).val()
                if self.filterItems == None or self.filterItems.length == 0:
                    input = Element('input').attr('width', '100%').attr('value', '').attr('placeholder', DefaultText.TextFilter)
                    result.append(input)
                    self.getValueFunction = getValue.bind(None, input.element)
                    S(input.element).bind('input', pagedList.getData.bind(None, 1, True))
                    # S(input.element).bindWithDelay('input', pagedList.getData.bind(None, 1, True), PagedList.Delay)
                else:
                    select = Element('select').attr('width', '100%'); result.append(select)
                    def filterItemToOption(filterItem):
                        r = Element('option').attr('value', filterItem.Value)
                        r.element.innerHTML = filterItem.Text
                        return r
                    options = self.filterItems.map(filterItemToOption)
                    options[0].attr('selected', 'selected')
                    for option in options:
                        select.append(option)
                    self.getValueFunction = getValue.bind(None, select.element)
                    S(select.element).change(pagedList.getData.bind(None, 1, True))
        else:
            console.error("Column '{}'.getElements() is called twice (for Paged-List in container with id {}). ".format(self.id, pagedList.containerId))
        return result
        
        
class Pager(ElementWrapper):
    
    def __init__(self, container, pagedList):
        ElementWrapper.__init__(self, container)
        self.pagedList = pagedList
        self.table = Element('table').attr('width', '100%')
        self.table.attr('style', 'height: 80px;')
        self.append(self.table)
        tr = Element('tr'); self.table.append(tr)
        td_left = Element('td'); tr.append(td_left)
        self.td_right = Element('td').attr('align', 'right'); tr.append(self.td_right)
        self.numberList = Element('ul'); td_left.append(self.numberList)
        self.textNodeTotal = document.createTextNode("{}: ".format(DefaultText.TextTotal))
        self.td_right.element.appendChild(self.textNodeTotal)
        self.count = Element('span')
        self.td_right.append(self.count)
        self._hideCount = False
        self.disabled = False
        self.autoDisabled = False # set to True if pagedList has only 1 page
        # styling
        self.setPaginationClass('pagination')
        self.activeClass = 'active'
        self.setCountClass('label label-default')

    def getTable(self):
        return self.table.element

    def setPaginationClass(self, styleClass):
        self.numberList.attr('class', styleClass)
        return self

    def setActiveClass(self, styleClass):
        self.activeClass = styleClass
        return self

    def setCountClass(self, styleClass):
        self.count.attr('class', styleClass)
        return self

    def hideCount(self): # to hide the counter (Total: ...)
        self._hideCount = True
        self.td_right.element.removeChild(self.textNodeTotal)
        self.td_right.element.removeChild(self.count.element)
        return self

    def disable(self):
        self.disabled = True
        self.attr('style', 'display: none;')
        return self

    def enable(self):
        self.disabled = False
        self.attr('style', 'display: block;')
        return self

    def refresh(self, currentPage, pageCount, itemCount):
        if self.disabled and self.autoDisabled and pageCount > 1:
            self.enable()
            self.autoDisabled = False
        if not self.disabled:
            # auto disabling feature:
            #if pageCount < 2:
            #    self.disable()
            #    self.autoDisabled = True
            #    return
            self.numberList.removeChilds()
            if not self._hideCount:
                self.count.element.innerHTML = itemCount
            maxPages = 5
            startPage = (Math.floor(currentPage / maxPages) * maxPages) + 1
            if currentPage % maxPages == 0:
                startPage -= maxPages
            if currentPage > maxPages:
                self.addNumber(1, "<<")
                self.addNumber(startPage - 1, "<")
            if pageCount > 1:
                i = startPage
                while i < startPage + maxPages and i <= pageCount:
                    li = self.addNumber(i)
                    if i == currentPage:
                        li.attr('class', self.activeClass)
                    i += 1
                if startPage + maxPages < pageCount:
                    self.addNumber(startPage + maxPages, ">")
                    self.addNumber(pageCount, ">>")
    
    def addNumber(self, number, text=None):
        li = Element('li'); self.numberList.append(li)
        a = Element('a').attr('href', '#'); li.append(a)
        if not text == None:
            a.element.innerHTML = text
        else:
            a.element.innerHTML = number
        a.element.onclick = self.pagedList.getData.bind(None, number, True)
        return li

class DataServer():

    def __init__(self):
        pass

    def getPageData(self, data, onSucces, onFailure): # data format: SendData = { 'page', 'pageSize', 'filterColumns', 'filterValues', 'sortOn', 'sortAsc' }
        console.error("Server.getPageData should be overridden.")

class AjaxServer(DataServer):

    def __init__(self, url):
        DataServer.__init__(self)
        self.url = url
    
    def getPageData(self, data, onSucces, onFailure):
        ajaxCall = {
            'type': 'POST',
            'url': self.url,
            'data': data,
            'success': onSucces,
            'error': onFailure
        }
        S.ajax(ajaxCall)

class FakeServer(DataServer):

    def __init__(self):
        DataServer.__init__(self)
        self.data = []

    def getMaxId(self):
        result = 0
        for item in self.data:
            if item['Id'] > result:
                result = item['Id']
    
    def addData(self, *items):
        for item in items:
            self.data.append(item)

    def getData(self):
        return self.data

    def clearData(self):
        self.data = []

    def getItem(self, id):
        for item in self.data:
            if item['Id'] == id:
                return item
        return None

    def deleteItem(self, id):
        i = 0
        while i < self.data.length:
            if self.data[i]['Id'] == id:
                self.data.splice(i, 1)
                break
            i += 1

    @staticmethod
    def getNestedValue(obj, fields):
        if obj == None or len(fields) == 0:
            return obj
        return FakeServer.getNestedValue(obj[fields[0]], fields[1:])

    def getFilters(self, filterColumns, filterValues): # returns list of functions which accepts an data item and returns true/false.
        result = []
        def passFilter(field, value, item):
            itemValue = FakeServer.getNestedValue(item, field.split("."))
            if itemValue == None:
                return False
            if Object.prototype.toString.call(itemValue) == '[object Number]':
                if isNaN(value):
                    return False
                else:
                    return itemValue == parseFloat(value)
            # match = itemValue.toString().search(__new__(RegExp(value.toString(), "i"))) # problem: value can contain special characters so that regex does not work
            match = itemValue.toString().toLowerCase().indexOf(value.toString().toLowerCase())
            return match > -1 # must be regular expression
        for i in range(0, filterColumns.length):
            if not filterValues[i] == "":
                result.append(passFilter.bind(None, filterColumns[i], filterValues[i]))
        return result

    def getPageData(self, data, onSucces, onFailure): # format: SendData = { 'page', 'pageSize', 'filterColumns', 'filterValues', 'sortOn', 'sortAsc' }
        items = []
        # filtering
        filters = self.getFilters(data.filterColumns, data.filterValues)
        for item in self.data:
            if filters.every(lambda passFilter: passFilter(item)):
                items.append(item)
        # sorting
        fields = data.sortOn.split(".")
        def compare(a, b):
            aValue = FakeServer.getNestedValue(a, fields)
            bValue = FakeServer.getNestedValue(b, fields)
            if not aValue == None and not bValue == None:
                def isNumber(v):
                    return Object.prototype.toString.call(v) == "[object Number]"
                if isNumber(aValue) and isNumber(bValue):
                    return aValue - bValue
                else:
                    return aValue.toString().localeCompare(bValue.toString())
            else:
                if aValue == None and bValue == None:
                    return 0
                elif aValue == None:
                    return -1
                else:
                    return 1
        if not data.sortOn == "":
            if data.sortAsc:
                items.js_sort(lambda a, b:  compare(a, b))
            else:
                items.js_sort(lambda b, a:  compare(a, b))
        totalCount = items.length
        # paging
        nrOfPages = Math.max(1, Math.ceil(items.length / data.pageSize))
        page = nrOfPages if data.page > nrOfPages else 1 if data.page < 1 else data.page
        indexFrom = (page - 1) * data.pageSize
        indexTo = indexFrom + data.pageSize
        items = items[indexFrom : indexTo]
        #
        result = {}
        result['Items'] = items
        result['CurrentPage'] = page
        result['PageCount'] = nrOfPages
        result['TotalCount'] = totalCount
        onSucces(result)


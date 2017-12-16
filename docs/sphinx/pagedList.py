
def addDefaultButton(id, name, styleClass):
    """ Configure a global button to the pagedList module. See also :any:`addDefaultButtons` \n
    :param id: self chosen id for the default button to be created. Must be unique. Example: "Select".
    :param name: text to show on the button. Example: "Select now!"
    :param styleClass: html style class to be added to the button. Example: :code:`btn btn-primary btn-xs`
    :return: PagedListButton

    After adding default buttons, any instance of PagedList can add these buttons by specifying the id's, like: :code:`myList.addDefaultButtons(["Select"])` """
    pass

#: Default text to show. Can for example be changed like
#:  :code:`pagedList.DefaultText.TextTotal = 'Totale!';`
DefaultText = { 'TextTotal': "Total", 'TextFilter': 'Filter' }

class PagedList():
    """
    :param container: container element to place this list in. It can be an html-element or an selector (str)
    :param url: (optional) url which will be used by this list to get new data. A :any:`AjaxServer` will be created. If an empty string or null is given, a :any:`FakeServer` will be created.

    On refresh the list sends a POST request with data like:
     :code:`{ page: 1, pageSize: 20, filterColumns: [], filterValues: [], sortOn: '', sortAsc: true }`
    It expects to get a response with data like: 
     :code:`{ Items: [], CurrentPage: 1, PageCount: 5, TotalCount: 95 }`
    
    """
    #: Default page size (nr of rows). Can be changed any time calling (e.g.) :code:`myList.pageSize = 10`
    pageSize = 20
    #: Default false. If true, all buttons will be placed in one column, instead of creating one column for each button.
    #: This can only be changed before the first refresh, thus after creation of the list.
    mergeButtonColumns = False
    
    def getStyling(self):
        """
        Returns the :any:`PagedListStyling` object belonging to this :any:`PagedList`.
        """

    def addColumn(self, id, header = id):
        """ Add a column to this list \n
        :param id: self chosen id for the column to be created.
        :param header: text to show in the header. If not specified, id will be used.
        :return: :any:`PagedListColumn`
        """
    
    def setUrl(self, url):
        """ Sets the url for the current used :any:`DataServer`.
        This only makes sence if it is a :any:`AjaxServer`

        :param url: url which will be used by this list to get new data.
        :return: this :any:`PagedList`
        """

    def getUrl(self):
        """ Returns the url for the current used :any:`DataServer`.
        This is only defined if it is a :any:`AjaxServer`
        """

    def onPageRefreshed(self, func = None):
        """ Place a callback function to be called after the list is refreshed. 
        
        :return: this :any:`PagedList`
        """
    
    def addButton(self, id, name, styleClass):
        """ Add a button to this list. The button will possibly be placed in each row.

        :param id: self chosen id for the button to be created. Example: "Select".
        :param name: text to show on the button. Example: "Select now!"
        :param styleClass: html style class to be added to the button. Example: :code:`btn btn-primary btn-xs`
        :return: :any:`PagedListButton`
        """

    def getTopPager(self):
        """ Returns the :any:`Pager` shown at the top. """

    def getBottomPager(self):
        """ Returns the :any:`Pager` shown at the bottom. """
    
    def hideCount(self):
        """ Hide the counter on the top- and bottom pager

        :return: this :any:`PagedList`
        """
    
    def disablePagination(self):
        """ Disable pagination for this list.

        :return: this :any:`PagedList`
        """
    
    def addDefaultButtons(self, *ids):
        """ Add pre-configured default buttons to this :any:`PagedList`. See also :any:`addDefaultButton`.
         
        :param ids: list of all id's, as specified during configuration of the default buttons.

        Default buttons can be called by :code:`myList.id` or :code:`myList['id']` where :code:`id` is the id of the default-buttons.
        """
    
    def getData(self, page, fullPage = False):
        """ Make a POST request to get new data from server and refresh the list.
        
        :param page: page-nr to get
        :param fullPage: if false (default) all values will be updated, if true, all rows in the list will be re-rendered, and expanded rows will be removed.
        
        """
        
    def refresh(self, fullPage = False):
        """ Refresh this list. This will cause the list to get the data for the current page, and update all values.
        
        :param fullPage: if false (default) all values will be updated, if true, all rows in the list will be re-rendered, and expanded rows will be removed.

        """

    def fakeServer(self):
        """ Generates a :any:`FakeServer` and uses that during refreshes, instead of making Ajax calls.

        :return: :any:`FakeServer`
        """

    def getServer(self):
        """ Returns the current used a :any:`DataServer`. See also :any:`fakeServer` and :any:`ajaxServer`

        :return: :any:`DataServer`
        """

    def fakeServer(self):
        """ Creates a :any:`FakeServer` and uses that for this list.

        :return: :any:`FakeServer`
        """

    def ajaxServer(self, url):
        """ Creates a :any:`AjaxServer` and uses that for this list.

        :param: url: url which will be used by this list to get new data
        :return: :any:`AjaxServer`
        """

    def addRowListener(self, event, func):
        """ Attach an event to the body of the table. When the event gets triggered,
        the row is found which contains the event target. If any row is found,
        the function gets executed.

        :param event: event, for example: :code:`"dblclick"`
        :param func: function which accepts an item (data of one row) and (optional) an event.
        :return: function which is added as EventListener. Use this for :any:`removeRowListener`

        If this list contains buttons, be aware to take care of the event propagation.
        For example do something like this:

        .. code-block:: html

            myList.addButton(...).onclick(
                function(item, evt){
                    // do something you want with item
                    evt.stopPropagation();
                });
        
        """

    def removeRowListener(self, event, func):
        """ Remove an event from the body of the table.

        :param event: event, for example: :code:`"dblclick"`
        :param func: function which is returned from :any:`addRowListener`
        """

class PagedListStyling():
    """ Object which is automatically created by :any:`PagedList` and used for styling. Use the object by calling :code:`myList.getStyling()` """

    def rowStyles(self, func):
        """ Specify the html styles for each row. Calling this function multiple times will append all styles.
        To clear all previously added styles, call :code:`myList.rowStyles(null);`

        :param func: function which accepts an item (data of 1 row) and returns a string with styles
        :return: this :any:`PagedListStyling`
        """
    
    def rowClasses(self, func):
        """ Specify the html style classes for each row. Calling this function multiple times will append all classes.
        To clear all previously added classes, call :code:`myList.rowClasses(null);`

        :param func: function which accepts an item (data of 1 row) and returns a string with style classes
        :return: this :any:`PagedListStyling`
        """

    def tableClass(self, styleClass):
        """ Specify the html style class for the table, to override the default value: :code:`table table-striped table-hover`

        :param styleClass: a string with style classes
        :return: this :any:`PagedListStyling`
        """

    def tableStyle(self, style):
        """ Specify the html style for the table

        :param style: a string with the style
        :return: this :any:`PagedListStyling`
        """
    
    def setClassExpanded(self, styleClass):
        """ Specify the html style class for the span in a column row when the row is expanded.
        This will override the default value: :code:`cursor glyphicon glyphicon-triangle-bottom`

        :param styleClass: a string with style classes
        :return: this :any:`PagedListStyling`
        """

    def setClassCollapsed(self, styleClass):
        """ Specify the html style class for the span in a column row when the row is collapsed.
        This will override the default value: :code:`cursor glyphicon glyphicon-triangle-right`

        :param styleClass: a string with style classes
        :return: this :any:`PagedListStyling`
        """
        
    def setClassAscending(self, styleClass):
        """ Specify the html style class for the span in the column header when the column is sorted in <b>ascending</b> order.
        This will override the default value: :code:`glyphicon glyphicon-triangle-top`

        :param styleClass: a string with style classes
        :return: this :any:`PagedListStyling`
        """

    def setClassDescending(self, styleClass):
        """ Specify the html style class for the span in the column header when the column is sorted in <b>descending</b> order.
        This will override the default value: :code:`glyphicon glyphicon-triangle-bottom`

        :param styleClass: a string with style classes
        :return: this :any:`PagedListStyling`
        """

    def setClassButtonColumn(self, styleClass):
        """ Specify the html style class for the button column(s),
        This will override the default value: :code:`pagedList-buttonColumn`

        :param styleClass: a string with style classes
        :return: this :any:`PagedListStyling`
        """

# Function onclick can be added which will be called with row-item as argument.
# Function showIf can be added to 
class PagedListButton():
    """ Button to show for each row in a :any:`PagedList`.
    Buttons are created by calling :any:`addButton` on a :any:`PagedList` instance.
    """
        
    def onclick(self, func):
        """ Add an callback function to this button to be called when button is clicked. 
        
        :param func: function which accepts a item (data for one row)
        :return: this :any:`PagedListButton`
        """
    
    def showIf(self, func):
        """ Add an function to this button to determine if this button is shown for a specific row. 
        
        :param func: function which accepts a item (data for one row) and returns true/false
        :return: this :any:`PagedListButton`
        """
    
class PagedListColumn():
    
    def addClassHeader(self, styleClass):
        """ Add a style-class to the header. Default class which is always added: :code:`pagedListColumnHeader`
        
        :param styleClass: html style class
        :return: this :any:`PagedListColumn`
        """

    def addStyleHeader(self, style):
        """ Add a style to the header.
        
        :param style: html style
        :return: this :any:`PagedListColumn`
        """

    def addClassHeaderSpan(self, styleClass):
        """ Add a style-class to the span in the header.
        
        :param styleClass: html style class
        :return: this :any:`PagedListColumn`
        """

    def addStyleHeaderSpan(self, style):
        """ Add a style to the span in the header.
        
        :param style: html style
        :return: this :any:`PagedListColumn`
        """

    def addClassRows(self, styleClass):
        """ Add a style-class to the rows (all rows, item independent). Default class which is always added: :code:`pagedListColumnRow`
        
        :param styleClass: html style class
        :return: this :any:`PagedListColumn`
        """

    def addStyleRows(self, style):
        """ Add a style to the rows (all rows, item independent).
        
        :param style: html style
        :return: this :any:`PagedListColumn`
        """

    def addStyle(self, style):
        """ Add a style to the header and to the rows. This is the same as calling :any:`addStyleHeader` and :any:`addStyleRows` subsequently.

        :param style: html style
        :return: this :any:`PagedListColumn`
         """

    def addClass(self, styleClass):
        """ Add a style-class to the header and to the rows. This is the same as calling :any:`addClassHeader` and :any:`addClassRows` subsequently.

        :param style: html style class
        :return: this :any:`PagedListColumn`
         """

    def enableSort(self):
        """ Enable sorting for this column. This will give possibility to click on the header, to toggle ascending and descending ordering.
        
        :return: this :any:`PagedListColumn`
        """

    def enableFilter(self, items=None):
        """ Enable filtering for this column. This will show a html input textfield or a html select in the header of the column.
        
        :param items: optional, a list of filter-items to filter on. Example with 2 filter-items: :code:`[{Text: 'Apples', Value: 1}, {Text: 'Oranges', Value: 2}]`
        :return: this :any:`PagedListColumn`

        """
    
    def itemToHtml(self, itemToHtmlFunction):
        """ Define how the column content will be rendered, based on the row data.
        
        :param itemToHtmlFunction: function which accepts an item (data of a row) and returns a html string
        :return: this :any:`PagedListColumn`

        """

    def itemToElement(self, itemToElementFunction):
        """ Define how the column content will be rendered, based on the row data.
        
        :param itemToElementFunction: function which accepts an item (data of a row) and returns a html element
        :return: this :any:`PagedListColumn`

        Note: this function will only be re-rendered if :code:`fullPage=true`, see also :any:`refresh` and :any:`getData`.
        """

    def onExpandItem(self, func):
        """ Make this column expandable. A clickable arrow will be added to each row. On clicking an html-element will be inserted or removed below the clicked row.
        
        :param func: function which accepts an item (data of a row) and returns a html element. The element will be placed inside the second column of a new generated table.
            Styling can be done by the style classes :code:`subPagedListTd`, :code:`subPagedListTable`, :code:`subPagedListCell1` and :code:`subPagedListCell2`.
        :return: this :any:`PagedListColumn`
        """

class Pager():
    """ A Pager shows clickable page numbers and the total count of items, and can be shown at top and bottom of a :any:`PagedList` 
    
    The html element structure gets generated like:

    .. code-block:: html

        <div>
            <table width="100%">
                <tbody>
                    <tr>
                        <td>
                            <ul class="pagination">
                                <li class="active">
                                    <a href="#">1</a>
                                </li>
                                <li>
                                    <a href="#">2</a></li>
                                <li>
                                    <a href="#">3</a></li>
                                <li>
                                    <a href="#">4</a></li>
                                <li>
                                    <a href="#">5</a>
                                </li>
                            </ul>
                        </td>
                        <td align="right">
                            Total: <span class="label label-default">10</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    
    The styling is defined by the following classes:
    
    - :code:`pagination` on the :code:`ul` element, for the page numbers.
    - :code:`active` on the :code:`li` element , for the active page number.
    - :code:`label label-default` on the :code:`span` element for the count number.

    """

    def getElement(self):
        """ Returns the html element of this Pager object, which is a :code:`div` element. """

    def getTable(self):
        """ Returns the html :code:`table` element of this Pager.
        Can for example be used to override the default style :code:`height: 80px;`:
        
        .. code-block:: html

            myList.getTopPager().getTable().style = "height: 150px";
        
         """

    def setPaginationClass(self, styleClass):
        """ Replace the default class :code:`pagination` in the html structure of this :any:`Pager`.
        
        :return: this :any:`Pager`
        """

    def setActiveClass(self, styleClass):
        """ Replace the default class :code:`active` in the html structure of this :any:`Pager`.
        
        :return: this :any:`Pager`
        """
        

    def setCountClass(self, styleClass):
        """ Replace the default class :code:`label label-default` in the html structure of this :any:`Pager`.
        
        :return: this :any:`Pager`
        """

    def hideCount(self):
        """ Hide the counter of this pager 
        
        :return: this :any:`Pager`
        """

    def disable(self):
        """ Disable this pager and make it invisible. 
        
        :return: this :any:`Pager`
        """
    
    def enable(self):
        """ Enable this pager and make it visible (again). 
        
        :return: this :any:`Pager`
        """
        

class DataServer():
    """ Base class for objects who deliver data to :any:`PagedList`. Instantiation is done automatically by creating a PagedList, or manually by invoking :code:`myList.fakeServer()` and :code:`myList.ajaxServer(url)` 
    Any DataServer must take care of filtering, sorting and paging, as requested by the PagedList.
    """

class FakeServer(DataServer):
    """ Object to hold the data used by :any:`PagedList`. This objects takes care of filtering, sorting and paging, doing this all on client side.
    """

    def getMaxId(self):
        """ Returns maximum id of the data items in this server. """

    def addData(self, *items):
        """ Add data to this server. If sorting or filtering is enabled, field names of data-items must correspond with column id.
        """
        
    def getItem(self, id):
        """ Get an item (row) of data with the given id """
    
    def deleteItem(self, id):
        """ Remove an item from data """


class AjaxServer(DataServer):
    """ Object which creates Ajax calls to the server and passes this data to the PagedList.
    """

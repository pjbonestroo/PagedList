PagedList's documentation
=====================================

.. toctree::
   :maxdepth: 2
   :caption: Contents:
   
PagedList is a javascript library to create html lists (or tables) with pagination and auto rendering features.
Columns and buttons can be configured.

Columns are configurable to enable sorting and filtering.
Buttons are default shown for each row, but can be configured to be visible dependent on row data.
Callback functions can be applied on buttons. The row data will be passed to the callback function when a button is clicked.

The list gets refreshed automatically when the user changes sorting or filtering (or browse to an other page). Refreshing can also be done manually by calling :code:`myList.refresh()`

Columns can be configured to expand and collapse, which inserts and deletes an html-element below the clicked row. See :any:`onExpandItem`

Go to :ref:`Installation` and :ref:`CodeExamples` for a quick start.

How does it look
=====================================
Styling can by fully customized. Default styling looks like:

.. image:: /images/example.png

.. _Installation:

Installation
=====================================
Add dependencies to your html file:

- jQuery (`<https://jquery.com/>`_)
- Bootstrap (`<http://getbootstrap.com/>`_)

Add :code:`pagedList.min.js` or :code:`pagedList.js` to your html file, like:

.. code-block:: html

   <script src="pagedList.min.js"></script>

.. _CodeExamples:

Code examples
=====================================
Add a new list to an existing html element with :code:`id=myListId`, using :any:`PagedList`:

.. code-block:: html

   var myList = new pagedList.PagedList(
       "#myListId", "http://myURL/getListItems");

Add a column with sorting and filtering capabilities, using :any:`addColumn`:

.. code-block:: html
   
   var column_one = myList.addColumn("Name", "Name")
        .enableFilter()
        .enableSort();

Define how the column content will be rendered, based on the row data, using :any:`itemToHtml` (alternatively use :any:`itemToElement`):

.. code-block:: html
   
   column_one.itemToHtml(function (item) { 
        return "<div>" + item.Name + "</div>";
    });

Add a button to the list, including style classes, which will be visible dependent on row data, using :any:`addButton`:

.. code-block:: html
   
   myList.addButton("Edit", "Edit", "btn btn-primary btn-xs")
        .onclick(function (item) {
            console.log("Todo: edit item");
        }).showIf(function (item) {
            return item.CanEdit == true;
        });

For more examples, download the standalone example page, which shows a PagedList with data from a fake server.

Globals
=====================================
.. automodule:: pagedList
   :members: addDefaultButton, DefaultText

PagedList
=====================================

.. autoclass:: PagedList
    :members:

PagedListStyling
=====================================

.. autoclass:: PagedListStyling
    :members:

PagedListColumn
=====================================

.. autoclass:: PagedListColumn
    :members:

PagedListButton
=====================================

.. autoclass:: PagedListButton
    :members:

Pager
=====================================

.. autoclass:: Pager
    :members:

DataServer
=====================================

.. autoclass:: DataServer
    :members:

AjaxServer
=====================================

.. autoclass:: AjaxServer
    :members:

FakeServer
=====================================

.. autoclass:: FakeServer
    :members:



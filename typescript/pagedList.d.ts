export as namespace pagedList;

export function addDefaultButton(id: string, name: string, styleClass: string): PagedList;

export class PagedList {
    constructor(container: string, url: string);
    pageSize: number;
    getStyling(): PagedListStyling;
    addColumn(id: string, header: string): PagedListColumn;
    setUrl(url: string): PagedList;
    getUrl(): string;
    onPageRefreshed(func: Function): PagedList;
    onPageRefreshing(func: Function): PagedList;
    addButton(id: string, name: string, styleClass: string): PagedListButton;
    getTopPager(): Pager;
    getBottomPager(): Pager;
    hideCount(): PagedList;
    disablePagination(): PagedList;
    addDefaultButtons(...ids: string[]): void;
    getData(page: number, fullPage: boolean): void;
    refresh(fullPage?: boolean): void;
    refreshItem(item: any, newItem: any);
    getServer(): DataServer;
    fakeServer(): FakeServer;
    ajaxServer(): AjaxServer;
    addRowListener(event: string, func: Function): Function;
    removeRowListener(event: string, func: Function): void;
}

export class PagedListStyling {
    rowStyles(func: (any) => string): PagedListStyling;
    rowClasses(func: (any) => string): PagedListStyling;
    tableClass(styleClass: string): PagedListStyling;
    tableStyle(style: string): PagedListStyling
    setClassExpanded(styleClass: string): PagedListStyling;
    setClassCollapsed(styleClass: string): PagedListStyling;
    setClassAscending(styleClass: string): PagedListStyling;
    setClassDescending(styleClass: string): PagedListStyling;
    setClassButtonColumn(styleClass: string): PagedListStyling;
}

export class PagedListButton {
    onclick(func: Function): PagedListButton
    showIf(func: Function): PagedListButton
}

export class PagedListColumn {
    addClassHeader(styleClass: string): PagedListColumn;
    addStyleHeader(style: string): PagedListColumn;
    addClassHeaderSpan(styleClass: string): PagedListColumn;
    addStyleHeaderSpan(style: string): PagedListColumn;
    addClassRows(styleClass: string): PagedListColumn;
    addStyleRows(style: string): PagedListColumn;
    addStyle(style: string): PagedListColumn;
    addClass(styleClass: string): PagedListColumn;
    enableSort(): PagedListColumn;
    enableFilter(items?: any[]): PagedListColumn;
    itemToHtml(itemToHtmlFunction: Function): PagedListColumn;
    itemToElement(itemToElementFunction: Function): PagedListColumn;
    onExpandItem(func: Function): PagedListColumn;
}

export class Pager {
    getElement(): HTMLElement;
    getTable(): HTMLElement;
    setPaginationClass(styleClass: string): Pager;
    setActiveClass(styleClass: string): Pager;
    setCountClass(styleClass: string): Pager;
    hideCount(): Pager;
    disable(): Pager;
    enable(): Pager;
}

export class DataServer {

}

export class AjaxServer extends DataServer {

}

export class FakeServer extends DataServer {
    getMaxId(): number;
    addData(...items: any[]): void;
    getItem(id: any): any;
    deleteItem(id: any): void;
}
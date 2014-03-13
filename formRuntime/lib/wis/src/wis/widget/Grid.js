/**
 *
 *
 *
 */
wis.widget.Grid = function () {
    this._version = '1.0';

};

wis.widget.Grid.prototype = {
    _cid: null,
    _title: null,
    _checkbox: false,
    _headerRowHeight: null,
    _rowHeight: null,
    _columnWidth: null,
    _gridUrl: null,
    _gridData: null,
    _usePage: true,
    _page: 1,
    _pageSize: 20,
    _pageSizeOptions: [10, 20, 30, 40, 50],
    _pageMsg: "显示记录从{from}到{to}，总数 {total} 条 。每页显示记录数：{pagesize}",
    _params: [],
    _loadingMsg: "正在加载数据，请稍候…",
    _emptyMsg: "没有数据",
    _errorMsg: "取数出错",
    _columns: [],
    _onAfterEdit: null,
    _onBeforeEdit: null,
    _onReload: null,
    _onToFirst: null,
    _onToPrev: null,
    _onToNext: null,
    _onToLast: null,
    _onCurPageEnter: null,
    _onSelectChange: null,
    _onSelectRow: null,
    _onUnSelectRow: null,
    _onBeforeCheckRow: null,
    _onCheckRow: null,
    _onDblClickRow: null,
    _onBeforeCheckAllRow: null,
    _onCheckAllRow: null,
    _addRow: null,
    _deleteRow: null,
    _getGridData: null,
    _setGridData: null,
    _getChange: null,
    _getSelectedRow: null,
    _getSelectedRowObj: null,
    _grid: null,

    getCid: function () {
        return this._cid;
    },

    setCid: function (cid) {
        this._cid = cid;
    },

    getTitle: function () {
        return this._title;
    },

    setTitle: function (title) {
        this._title = title;
    },

    setCheckbox: function (checkbox) {
        this._checkbox = checkbox;
    },

    getCheckbox: function () {
        return this._checkbox;
    },

    setHeaderRowHeight: function (headerRowHeight) {
        this._headerRowHeight = headerRowHeight;
    },

    getHeaderRowHeight: function () {
        return this._headerRowHeight;
    },

    setRowHeight: function (rowHeight) {
        this._rowHeight = rowHeight;
    },

    getRowHeight: function () {
        return this._rowHeight;
    },

    setColumnWidth: function (columnWidth) {
        this._columnWidth = columnWidth;
    },

    getColumnWidth: function () {
        return this._columnWidth;
    },

    setGridUrl: function (gridUrl) {
        this._gridUrl = gridUrl;
    },

    getGridUrl: function () {
        return this._gridUrl;
    },

    setGridData: function (gridData) {
        this._gridData = gridData;
    },

    getGridData: function () {
        return this._gridData;
    },

    setUsePage: function (usePage) {
        this._usePage = usePage;
    },

    getUsePage: function () {
        return this._usePage;
    },

    setPage: function (page) {
        this._page = page;
    },

    getPage: function () {
        return this._page;
    },

    setPageSize: function (pageSize) {
        this._pageSize = pageSize;
    },

    getPageSize: function () {
        return this._pageSize;
    },

    setPageSizeOptions: function (pageSizeOptions) {
        this._pageSizeOptions = pageSizeOptions;
    },

    getPageSizeOptions: function () {
        return this._pageSizeOptions;
    },

    setPageMsg: function (pageMsg) {
        this._pageMsg = pageMsg;
    },

    getPageMsg: function () {
        return this._pageMsg;
    },

    setParams: function (params) {
        this._params = params;
    },

    getParams: function () {
        return this._params;
    },

    setLoadingMsg: function (loadingMsg) {
        this._loadingMsg = loadingMsg;
    },

    getLoadingMsg: function () {
        return this._loadingMsg;
    },

    setEmptyMsg: function (emptyMsg) {
        this._emptyMsg = emptyMsg;
    },

    getEmptyMsg: function () {
        return this._emptyMsg;
    },

    setErrorMsg: function (errorMsg) {
        this._errorMsg = errorMsg;
    },

    getErrorMsg: function () {
        return this._errorMsg;
    },

    setColumns: function (columns) {
        this._columns = columns;
    },

    getColumns: function () {
        return this._columns;
    },

    setColumns: function (columns) {
        this._columns = columns;
    },

    /**
     * 初始化方法
     */
    _init: function (data) {
        this.setCheckbox(data.checkbox);
    },

    /**
     * 初始化渲染方法
     * 仅在第一次调用render时执行
     */
    initRender: function () {
        this._grid = $('<div id=\"gird\"></div>');
        $("body").append(this._grid);
        var grid = this._grid.ligerGrid({
            title: this.getTitle(),
            checkbox: this.getCheckbox(),
            columns: [
                { display: "主键", name: "CustomerID", width: 300 },
                { display: "公司名", name: "CompanyName", width: 100 },
                { display: "联系名", name: "ContactName", width: 100 },
                { display: "城市", name: "City", width: 100 }
            ],
            data: {Rows: [
                {"CustomerID": "ALFKI", "CompanyName": "Alfreds Futterkiste好好学习，天天向上。好好学习，天天向上。好好学习，天天向上。好好学习，天天向上。好好学习，天天向上。好好学习，天天向上。好好学习，天天向上。好好学习，天天向上。好好学习，天天向上。好好学习，天天向上。好好学习，天天向上。好好学习，天天向上。好好学习，天天向上。好好学习，天天向上。", "ContactName": "Maria Anders", "ContactTitle": "Sales Representative", "Address": "Obere Str. 57", "City": "Berlin", "Region": null, "PostalCode": "12209", "Country": "Germany", "Phone": "030-0074321", "Fax": "030-0076545", "users": {"firestName": "赵云"}},
                {"CustomerID": "ANATR", "CompanyName": "Ana Trujillo Emparedados y helados", "ContactName": "Ana Trujillo", "ContactTitle": "Owner", "Address": "Avda. de la Constitución 2222", "City": "México D.F.", "Region": null, "PostalCode": "05021", "Country": "Mexico", "Phone": "(5) 555-4729", "Fax": "(5) 555-3745"},
                {"CustomerID": "ANTON", "CompanyName": "Antonio Moreno Taquería", "ContactName": "Antonio Moreno", "ContactTitle": "Owner", "Address": "Mataderos  2312", "City": "México D.F.", "Region": null, "PostalCode": "05023", "Country": "Mexico", "Phone": "(5) 555-3932", "Fax": null},
                {"CustomerID": "ALFKI", "CompanyName": "Alfreds Futterkiste", "ContactName": "Maria Anders", "ContactTitle": "Sales Representative", "Address": "Obere Str. 57", "City": "Berlin", "Region": null, "PostalCode": "12209", "Country": "Germany", "Phone": "030-0074321", "Fax": "030-0076545", "users": {"firestName": "赵云"}},
                {"CustomerID": "ANATR", "CompanyName": "Ana Trujillo Emparedados y helados", "ContactName": "Ana Trujillo", "ContactTitle": "Owner", "Address": "Avda. de la Constitución 2222", "City": "México D.F.", "Region": null, "PostalCode": "05021", "Country": "Mexico", "Phone": "(5) 555-4729", "Fax": "(5) 555-3745"},
                {"CustomerID": "ANTON", "CompanyName": "Antonio Moreno Taquería", "ContactName": "Antonio Moreno", "ContactTitle": "Owner", "Address": "Mataderos  2312", "City": "México D.F.", "Region": null, "PostalCode": "05023", "Country": "Mexico", "Phone": "(5) 555-3932", "Fax": null},
                {"CustomerID": "ALFKI", "CompanyName": "Alfreds Futterkiste", "ContactName": "Maria Anders", "ContactTitle": "Sales Representative", "Address": "Obere Str. 57", "City": "Berlin", "Region": null, "PostalCode": "12209", "Country": "Germany", "Phone": "030-0074321", "Fax": "030-0076545", "users": {"firestName": "赵云"}},
                {"CustomerID": "ANATR", "CompanyName": "Ana Trujillo Emparedados y helados", "ContactName": "Ana Trujillo", "ContactTitle": "Owner", "Address": "Avda. de la Constitución 2222", "City": "México D.F.", "Region": null, "PostalCode": "05021", "Country": "Mexico", "Phone": "(5) 555-4729", "Fax": "(5) 555-3745"},
                {"CustomerID": "ANTON", "CompanyName": "Antonio Moreno Taquería", "ContactName": "Antonio Moreno", "ContactTitle": "Owner", "Address": "Mataderos  2312", "City": "México D.F.", "Region": null, "PostalCode": "05023", "Country": "Mexico", "Phone": "(5) 555-3932", "Fax": null},
                {"CustomerID": "ALFKI", "CompanyName": "Alfreds Futterkiste", "ContactName": "Maria Anders", "ContactTitle": "Sales Representative", "Address": "Obere Str. 57", "City": "Berlin", "Region": null, "PostalCode": "12209", "Country": "Germany", "Phone": "030-0074321", "Fax": "030-0076545", "users": {"firestName": "赵云"}},
                {"CustomerID": "ANATR", "CompanyName": "Ana Trujillo Emparedados y helados", "ContactName": "Ana Trujillo", "ContactTitle": "Owner", "Address": "Avda. de la Constitución 2222", "City": "México D.F.", "Region": null, "PostalCode": "05021", "Country": "Mexico", "Phone": "(5) 555-4729", "Fax": "(5) 555-3745"},
                {"CustomerID": "ANTON", "CompanyName": "Antonio Moreno Taquería", "ContactName": "Antonio Moreno", "ContactTitle": "Owner", "Address": "Mataderos  2312", "City": "México D.F.", "Region": null, "PostalCode": "05023", "Country": "Mexico", "Phone": "(5) 555-3932", "Fax": null}
            ], Total: 90},
            width: this.getWidth(),
            height:this.getHeight(),
            isScroll: false,
            onCheckRow:this.onCheckRow,
            pageSizeOptions: [5, 10, 15, 20]
        });

        this.getDomInstance().append(grid);
    },

    //渲染前处理方法
    beforeRender: function () {

    },

    //渲染方法
    render: function () {

    },

    //渲染后处理方法
    afterRender: function () {


    },

    //----------必须实现----------
    getData: function () {
        return {
            cid: this.getCid()
        };
    },

    //----------必须实现----------
    setData: function (data) {
        this.setCid(data.cid);
    },

    onSelectRow:function(callBack){
        this._onSelectRow=callBack;
    },
    onCheckRow:function(callBack){
        this._onCheckRoww=callBack;
    }


};
wof.bizWidget.GridComponent = function () {
    //初始化监听消息
    this.setOnReceiveMessage([
        {id: 'wof.bizWidget.DataObject_query', priority: 50, method: 'this._onQueryDataCompleted(message);'},
        {id: 'wof.bizWidget.DataObject_add', proprity: 50, method: 'this._onAddDataCompleted(message);'},
        {id: 'wof.bizWidget.DataObject_update', proprity: 50, method: 'this._onUpdateDataCompleted(message);'},
        {id: 'wof.bizWidget.DataObject_delete', proprity: 50, method: 'this._onDeleteDataCompleted(message);'},
        {id: 'wof.bizWidget.DataObject_undelete', proprity: 50, method: 'this._onUndeleteDataCompleted(message);'},
        {id: 'wof.bizWidget.DataObject_save', proprity: 50, method: 'this._onSaveDataCompleted(message);'}
    ]);
};

wof.bizWidget.GridComponent.prototype = {

    _title: null,  // 标题

    _themes: null, //主题

    _dataSourceType: null, //数据源类型 do数据对象 ds数据源

    _numberDisplay: false,    //序号是否显示

    _headHeight: null,    //表头高度

    _rowHeight: null,  // 行高

    _editor: null,  // 是否编辑模式  view 显示 ，edit 编辑

    _columns: null,  // 列描述

    _rows: null, // 行描述

    _cells: null, // 单元格描述

    _pageBar: null, // 分页条

    _header: null, // 表头定义

    _footer: null, // 表尾定义

    _bindEntityId: null, //绑定的实体id(即实体别名) 在在数据源类型为do时需要使用到

    _cacheData: null,  //缓存数据

    _cachePageNo: null, //缓存页号 数组类型 形如[2,3] 当前只支持缓存两页

    _dataObject: null, //数据对象 在数据源类型为do时需要使用到

    _dataSource: null, //数据源 在数据源类型为ds时需要使用到

    _refData: null,  // 参照数据

    _pageId: null,  // 页面ID

    /**
     *  初始化
     */
    init: function (options) {
        this.setPageBar({
            "pageNo": 1,
            "pageSize": 10
        });
        this.setEditor('view');
        this.setGridSchema(options);
        if (this.getDataSourceType() == 'do') {
            this.setRefData(this.getDo().getRefData());
        } else {
            //TODO ds
        }

        this.gotoPage(this.getPageNo());
    },

    /**
     * 设置属性
     */
    setGridSchema: function (options) {
        if (!options) {
            return;
        }
        if (options.height) {
            this.setHeight(options.height);
        }
        if (options.width) {
            this.setWidth(options.width);
        }
        if (options.title) {
            this.setTitle(options.title);
        }
        if (options.themes) {
            this.setThemes(options.themes);
        }
        if (options.dataSourceType) {
            this.setDataSourceType(options.dataSourceType);
        }
        if (options.numberDisplay) {
            this.setNumberDisplay(options.numberDisplay);
        }
        if (options.headHeight) {
            this.setHeadHeight(options.headHeight);
        }
        if (options.rowHeight) {
            this.setRowHeight(options.rowHeight);
        }
        if (options.editor) {
            this.setEditor(options.editor);
        }
        if (options.columns) {
            this.setColumns(options.columns);
        }
        if (options.rows) {
            this.setRows(options.rows);
        }
        if (options.cells) {
            this.setCells(options.cells);
        }
        if (options.footer) {
            this.setFooter(options.footer);
        }
        if (options.pageBar) {
            this.setPageBar(options.PageBar);
        }
        if (options.dataObject) {
            this.setDo(options.dataObject);
        }
        if (options.bindEntityId) {
            this.setBindEntityId(options.bindEntityId);
        }
        if (options.pageId) {
            this.setPageId(options.pageId);
        }

    },
    setTitle: function (title) {
        this._title = title;
    },
    getTitle: function () {
        return this._title;
    },
    setTitle: function (title) {
        this._title = title;
    },
    getThemes: function () {
        return this._themes;
    },
    setThemes: function (themes) {
        this._themes = themes;
    },
    getDataSourceType: function () {
        return this._dataSourceType;
    },
    setDataSourceType: function (dataSourceType) {
        this._dataSourceType = dataSourceType;
    },
    getRows: function () {
        return this._rows;
    },
    setRows: function (rows) {
        this._rows = rows;
    },
    getCells: function () {
        return this._cells;
    },
    setCells: function (cells) {
        this._cells = cells;
    },
    getFooter: function () {
        return this._footer;
    },
    setFooter: function (footer) {
        this._footer = footer;
    },
    render: function () {
        //todo 需要首先判断显示模式
        if (this.getEditor() == 'view') {
            var cachePageNo = this.getCachePageNo();
            var offset = cachePageNo[0] == this.getPageNo() ? 0 : this.getPageSize();
            var cacheData = this.getCacheData();
            var data = [];
            var end = ((offset + this.getPageSize()) < cacheData.length ? (offset + this.getPageSize()) : cacheData.length) - 1;
            for (var i = offset; i <= end; i++) {
                data.push(cacheData[i]);
            }
            console.log(data);
            //  3 根据data转换成统一API中的数据格式
        } else {
            //todo edit 没实现
        }

    },

    nextPage: function () {
        var pageNo = this.getPageNo();
        var totalPage = this.getTotalPage();
        if (pageNo >= totalPage) {
            alert('没有下页');  //todo 调用widget下的对话框
            return;
        }
        pageNo++;
        this.gotoPage(pageNo);
    },
    prevPage: function () {
        var pageNo = this.getPageNo();
        if (pageNo <= 1) {
            alert('没有上页');  //todo 调用widget下的对话框
            return;
        }
        pageNo--;
        this.gotoPage(pageNo);
    },

    /**
     * 如果pageNo落在当前缓存中 直接从缓存载入数据
     * 如果pageNo不在缓存中 则需要发起新的查询(此查询将修改相关数据和属性)
     *
     */
    gotoPage: function (pageNo) {
        if (pageNo <= 0 || pageNo > this.getTotalPage()) {
            alert(pageNo + '页号不存在');
            return;
        }
        this.setPageNo(pageNo);
        var inCache = this._pageDataInCache(pageNo);
        if (inCache == -1) { //如果返回-1 表明pageNo不在缓存中 需要发起新的查询
            var offset = (pageNo - 1) * this.getPageSize();
            var rowsCount = this.getPageSize() * 2;
            if (this.getDataSourceType() == 'do') {
                this.getDo().queryData(this.getPageId(), 'main', null, null, offset, rowsCount);
            } else {
                //TODO ds没实现
            }

        } else {
            this.render();
        }
    },
    /**
     *
     * 查询完成后 将触发此函数
     */
    _onQueryDataCompleted: function (message) {
        if (this._isDataChange(message)) {
            this.setCacheData(this.getDo().getLocalData());
            this.setCachePageNo([this.getPageNo(), this.getPageNo() + 1]);
            var total = null;
            if (this.getDataSourceType() == 'do') {
                total = this.getDo().getLocalOriginalData().totalCount;
            } else {
                //TODO ds
            }

            var pageBar = this.getPageBar();
            pageBar.total = total;
            this.setPageBar(pageBar);
            this.render();
        }
    },
    _onAddDataCompleted: function (message) {
        if (this._isDataChange(message)) {
            // 在grid上面用特殊颜色标识
            console.log(message);
        }
    },
    _onUpdateDataCompleted: function (message) {
        if (this._isDataChange(message)) {
            // 刷新本页数据
            console.log(message);
        }
    },
    _onDeleteDataCompleted: function (message) {
        if (this._isDataChange(message)) {
            // 刷新本页数据
            console.log(message);
        }
    },
    _onUndeleteDataCompleted: function (message) {
        if (this._isDataChange(message)) {
            // 刷新本页数据
            console.log(message);
        }
    },
    _onSaveDataCompleted: function (message) {
        if (this._isDataChange(message)) {
            // 跳转到第一页
            console.log(message);
        }
    },
    _isDataChange: function (message) {
        if (message && message.data) {
            for (var i = 0; i < message.data.length; i++) {
                if (this.getBindEntityId() === message.data[i]) {
                    break;
                }
            }
            return i === message.data.length ? false : true;
        }
        return false;
    },

    /**
     pageNo页面中的数据是否在缓存中索引， -1代表不在。
     */
    _pageDataInCache: function (pageNo) {
        var index = -1;
        var cachePageNo = this.getCachePageNo();
        if (cachePageNo) {
            for (var i = 0; i < cachePageNo.length; i++) {
                if (cachePageNo[i] == pageNo) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    },
    getTotalPage: function () {
        var total = parseInt(this.getPageBar().total);
        return parseInt(total % this.getPageSize() == 0 ? total / this.getPageSize()
            : total / this.getPageSize() + 1);
    },
    getCacheData: function () {
        return this._cacheData;
    },
    setCacheData: function (cacheData) {
        this._cacheData = cacheData;
    },
    setRefData: function (refData) {
        this._refData = refData;
    },
    getPageId: function () {
        return this._pageId;
    },
    setPageId: function (pageId) {
        this._pageId = pageId;
    },
    getRefData: function () {
        return this._refData;
    },
    deleteColumnByIndex: function (columnIndex) {

    },
    addColumnByIndex: function (columnIndex) {

    },
    moveColumn: function (sourceIndex, targetIndex) {

    },
    setCellValue: function (columnIndex, rowIndex, value) {

    },
    getCellValue: function (columnIndex, rowIndex) {

    },
    getCachePageNo: function () {
        return this._cachePageNo;
    },
    setCachePageNo: function (cachePageNo) {
        this._cachePageNo = cachePageNo;
    },
    getColumns: function () {
        return this._columns;
    },
    setDo: function (dataObject) {
        this._dataObject = dataObject;
    },
    getDo: function () {
        return this._dataObject;
    },
    setColumns: function (column) {
        this._columns = column;
    },
    getColumns: function () {
        return this._column;
    },
    getTotalRecord: function () {
        return this._totalRecord;
    },
    getBindEntityId: function () {
        return this._bindEntityId;
    },
    setBindEntityId: function (bindEntityId) {
        this._bindEntityId = bindEntityId;
    },
    setTotalRecord: function () {
        return this._totalRecord;
    },
    setPageBar: function (pageBar) {
        this._pageBar = pageBar;
    },
    getPageBar: function () {
        return this._pageBar;
    },
    getPageSize: function () {
        return this.getPageBar().pageSize;
    },
    setPageSize: function (pageSize) {
        return this.getPageBar().pageSize = pageSize;
    },
    getPageNo: function () {
        return this.getPageBar().pageNo;
    },
    setPageNo: function (pageNo) {
        this.getPageBar().pageNo = pageNo;
    },
    getDisplayMode: function () {
        return this._displayMode;
    },
    setDisplayMode: function () {
        return this._displayMode;
    },
    getRowHeight: function () {
        return this._rowHeight;
    },

    setRowHeight: function (rowHeight) {
        this._rowHeight = rowHeight;
    },
    getGridData: function () {
        return this._gridData;
    },
    setGridData: function (gridData) {
        return this._gridData = gridData;
    },

    getNumberDisplay: function () {
        return this._numberDisplay;
    },

    setNumberDisplay: function (numberDisplay) {
        this._numberDisplay = numberDisplay;
    },
    getUseMutiplePage: function () {
        return this._useMutiplePage;
    },
    setUseMutiplePage: function () {
        return this._useMutiplePage;
    },
    getHeadHeight: function () {
        return this._headHeight;
    },
    setHeadHeight: function (headHeight) {
        this._headHeight = headHeight;
    },
    refreshGridData: function () {

    },
    setDataObject: function (dataObject) {
        this._dataObject = dataObject;
    },
    getDataObject: function () {
        return this._dataObject;
    },
    addRow: function (data) {
        this.getDo().addData(data);
    },
    deleteRow: function (data) {
        this.getDo().deleteData(data);
    },
    updateRow: function (data) {
        this.getDo().updateData(data);
    },
    undeleteData: function () {
        this.getDo().undeleteData();
    },
    saveData: function () {
        this.getDo().saveData();
    },
    getColumnName: function (columnIndex) {

    },
    setColumnName: function (columnIndex, name) {

    },
    getMultiSelect: function (columnIndex) {

    },
    setMultiSelect: function (columnIndex, selected) {

    },
    getColumnCaption: function (columnIndex) {

    },
    setColumnCaption: function (columnIndex, caption) {

    },
    getColumnDisplay: function (columnIndex) {

    },
    setColumnDisplay: function (columnIndex) {

    },
    getColumnOrderType: function (columnIndex) {

    },
    setColumnOrderType: function (columnIndex, type) {

    },
    getColumnType: function (columnIndex) {

    },
    setColumnType: function (columnIndex) {

    },
    getColumnWidth: function (columnIndex) {

    },
    setColumnWidth: function (columnIndex, width) {

    },
    getBindDataField: function (columnIndex) {

    },
    getIsPin: function (columnIndex) {

    },
    setIsPin: function (columnIndex, pin) {

    },
    getDataTimeFormat: function (columnIndex) {

    },
    setDataTimeFormat: function (columnIndex, pattern) {

    },
    getEditor: function (columnIndex) {
        return this._editor;
    },
    setEditor: function (editor) {
        this._editor = editor;
    },
    getPicUrl: function (columnIndex) {

    },
    setPicUrl: function (columnIndex, url) {

    },

    //事件
    resize: function (newSize, oldSize) {

    },
    beforeRefreshData: function () {

    },
    afterRefreshData: function () {

    },
    beforeAddRow: function (row) {

    },
    afterAddRow: function (row) {

    },
    beforeDeleteRow: function (row) {

    },
    afterDeleteRow: function (row) {

    },
    alterColumnMove: function (columnData, newIndex, oldIndex) {

    },
    onCellValueChange: function (newValue, oldValue) {

    }

}
//wof$.grid({});
//var gridComponentInstance = new wof.bizWidget.GridComponent();
//gridComponentInstance.init({height : 200});



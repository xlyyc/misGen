wof.bizWidget.GridComponent = function () {
    this.setOnReceiveMessage([
        {id: 'wof.bizWidget.DataObject_query', priority: 50, method: 'this.queryData(message);'},
        {id: 'wof.bizWidget.DataObject_add', proprity: 50, method: 'this.addData(message);'},
        {id: 'wof.bizWidget.DataObject_update', proprity: 50, method: 'this.updateData(message);'},
        {id: 'wof.bizWidget.DataObject_delete', proprity: 50, method: 'this.deleteData(message);'},
        {id: 'wof.bizWidget.DataObject_undelete', proprity: 50, method: 'this.undeleteData(message);'}
    ]);
};

wof.bizWidget.GridComponent.prototype = {

    _dataSourceType: null, //数据源类型 do数据对象 ds数据源

    _numberDisplay: false,    //序号是否显示

    _headHeight: null,

    _rowHeight: null,

    _editor: null,

    _columns: null,

    _rows: null,

    _cells: null,

    _pageBar: null,

    _header: null,

    _footer: null,

    _bindEntityId: null, //绑定的实体id(即实体别名) 在在数据源类型为do时需要使用到

    _cacheData: null,  //缓存数据

    _cachePageNo: null, //缓存页号 数组类型 形如[2,3] 当前只支持缓存两页

    _dataObject: null, //数据对象 在数据源类型为do时需要使用到

    _dataSource: null, //数据源 在数据源类型为ds时需要使用到

    init: function (options) {
        if (options.height) {
            this.height = options.height;
        }
        if (options.width) {
            this.width = options.width;
        }
    },
    render: function () {
        //render的依据始终是本地缓存的数据_cacheData
       //  3 根据data转换成统一API中的数据格式
    },
    nextPage: function () {
       // 1 判断是否还有下一页
      //  2 pageNo++

        // 1 根据pageNo检查cachePage中是否存在数据。
        //  2 如果不存在调用DO加载数据，重新render。

      //  3 render
    },
    prevPage: function () {

    },
    _queryData : function (message){
       // 1 从新设置cachePage
      //  2 设置cacheData
      //  3 render
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
    getColumns: function () {
        return this._columns;
    },

    setColumns: function () {
        return this._columns;
    },
    getTotalRecord: function () {
        return this._totalRecord;
    },

    setTotalRecord: function () {
        return this._totalRecord;
    },

    getPageSize: function () {
        return this._pageSize;
    },

    setPageSize: function () {
        return this._pageSize;
    },

    getPageNo: function () {
        return this._pageNo;
    },

    setPageNo: function (pageNo) {
        this._pageNo = pageNo;
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

    setRowHeight: function () {
        return this._rowHeight;
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

    setNumberDisplay: function () {
        return this._numberDisplay;
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

    setHeadHeight: function () {
        return this._headHeight;
    },
    refreshGridData: function () {

    },
    setDataObject: function (dataObject) {
        this._dataObject = dataObject;
    },
    getDataObject: function () {
        return this._dataObject;
    },
    addRow: function (data, index) {
        emapRuntimeDataObject.addData([
            {"zglbref.lbbz": "好员工222", "zgid": wof.util.Tool.uuid()}
        ]);
    },
    deleteRow: function (index) {
        emapRuntimeDataObject.deleteData([
            {"zgid": "362646149296820224"}
        ]);
    },
    updateRow: function (index) {
        emapRuntimeDataObject.updateData([
            {"zglbref.lbbz": "外聘员工111", "zgid": "362646149296820224"}
        ]);
    },
    undeleteRow: function () {
        emapRuntimeDataObject.undeleteData();
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

    },
    setEditor: function (columnIndex, editor) {

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



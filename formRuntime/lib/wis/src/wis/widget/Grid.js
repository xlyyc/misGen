/**
 * 
 * 
 * 
 */
wis.widget.Grid = function() {
	this._version = '1.0';

};

wis.widget.Grid.prototype = {
	_cid : null,
	_title : null,
	_checkbox : false,
	_headerRowHeight : null,
	_rowHeight : null,
	_columnWidth : null,
	_gridUrl : null,
	_gridData : null,
	_usePage : true,
	_page : 1,
	_pageSize : 20,
	_total : null,
	_pageSizeOptions : [ 10, 20, 30, 40, 50 ],
	_pageMsg : "显示记录从{from}到{to}，总数 {total} 条 。每页显示记录数：{pagesize}",
	_params : [],
	_loadingMsg : "正在加载数据，请稍候…",
	_emptyMsg : "没有数据",
	_errorMsg : "取数出错",
	_columns : [],
	_onAfterEdit : null,
	_onBeforeEdit : null,
	_onReload : null,
	_onToFirst : null,
	_onToPrev : null,
	_onToNext : null,
	_onToLast : null,
	_onCurPageEnter : null,
	_onSelectChange : null,
	_onSelectRow : null,
	_onUnSelectRow : null,
	_onBeforeCheckRow : null,
	_onCheckRow : null,
	_onDblClickRow : null,
	_onBeforeCheckAllRow : null,
	_onCheckAllRow : null,
	_addRow : null,
	_deleteRow : null,
	_getGridData : null,
	_setGridData : null,
	_getChange : null,
	_getSelectedRow : null,
	_getSelectedRowObj : null,
	_refData : null,
	_grid : null,

	getCid : function() {
		return this._cid;
	},

	setCid : function(cid) {
		this._cid = cid;
	},
	getRefData : function() {
		return this._refData;
	},

	setRefData : function(refData) {
		this._refData = refData;
	},
	getTitle : function() {
		return this._title;
	},

	setTitle : function(title) {
		this._title = title;
	},

	setCheckbox : function(checkbox) {
		this._checkbox = checkbox;
	},

	getCheckbox : function() {
		return this._checkbox;
	},

	setHeaderRowHeight : function(headerRowHeight) {
		this._headerRowHeight = headerRowHeight;
	},

	getHeaderRowHeight : function() {
		return this._headerRowHeight;
	},

	setRowHeight : function(rowHeight) {
		this._rowHeight = rowHeight;
	},

	getRowHeight : function() {
		return this._rowHeight;
	},

	setColumnWidth : function(columnWidth) {
		this._columnWidth = columnWidth;
	},

	getColumnWidth : function() {
		return this._columnWidth;
	},

	setGridUrl : function(gridUrl) {
		this._gridUrl = gridUrl;
	},

	getTotal : function() {
		return this._total;
	},

	setTotal : function(total) {
		this._total = total;
	},

	getGridUrl : function() {
		return this._gridUrl;
	},

	setGridData : function(gridData) {
		this._gridData = gridData;
	},

	getGridData : function() {
		return this._gridData;
	},

	setUsePage : function(usePage) {
		this._usePage = usePage;
	},

	getUsePage : function() {
		return this._usePage;
	},

	setPage : function(page) {
		this._page = page;
	},

	getPage : function() {
		return this._page;
	},

	setPageSize : function(pageSize) {
		this._pageSize = pageSize;
	},

	getPageSize : function() {
		return this._pageSize;
	},

	setPageSizeOptions : function(pageSizeOptions) {
		this._pageSizeOptions = pageSizeOptions;
	},

	getPageSizeOptions : function() {
		return this._pageSizeOptions;
	},

	setPageMsg : function(pageMsg) {
		this._pageMsg = pageMsg;
	},

	getPageMsg : function() {
		return this._pageMsg;
	},

	setParams : function(params) {
		this._params = params;
	},

	getParams : function() {
		return this._params;
	},

	setLoadingMsg : function(loadingMsg) {
		this._loadingMsg = loadingMsg;
	},

	getLoadingMsg : function() {
		return this._loadingMsg;
	},

	setEmptyMsg : function(emptyMsg) {
		this._emptyMsg = emptyMsg;
	},

	getEmptyMsg : function() {
		return this._emptyMsg;
	},

	setErrorMsg : function(errorMsg) {
		this._errorMsg = errorMsg;
	},

	getErrorMsg : function() {
		return this._errorMsg;
	},

	setColumns : function(columns) {
		this._columns = columns;
	},

	getColumns : function() {
		return this._columns;
	},

	setColumns : function(columns) {
		this._columns = columns;
	},

	/**
	 * 初始化方法
	 */
	_init : function(data) {
		if (data.checkbox) {
			this.setCheckbox(data.checkbox);
		}
		if (data.data) {
			this.setGridData(data.data);
		}
		if (data.columns) {
			this.setColumns(data.columns);
		}
		if (data.total) {
			this.setTotal(data.total);
		}
		if (data.pageNo) {
			this.setPage(data.pageNo)
		}
		if (data.pageSize) {
			this.setPageSize(data.pageSize);
		}
		if (data.onToNext) {
			this.onToNext = data.onToNext;
		}
		if (data.onToPrev) {
			this.onToPrev = data.onToPrev;

		}
		if (data.onToFirst) {
			this.onToFirst = data.onToFirst;
		}
		if (data.onToLast) {
			this.onToLast = data.onToLast;

		}
		if (data.refData) {
			this.setRefData(data.refData);

		}
	},
	addRow : function() {
		var obj = {};
		for (var i = 0; i < this.getColumns().length; i++) {
			var column = this.getColumns()[i];
			obj[column.bindDataField] = '';
		}
		var row = this.grid.addRow(obj);
		var rowDom = row[0];
		var childNodes = rowDom.childNodes;
		this.grid.applyEditor(jQuery(childNodes[1]).children(":first"));
	},
	getCurrentData : function() {
		return this.grid.currentData.Rows;
	},
	getCurrentAddData : function() {
		var rows = this.grid.currentData.Rows;
		var added = [];
		for (var i = 0; i < rows.length; i++) {
			var row = rows[i];
			if (row.__status == "add") {
				delete row.__status;
				added.push(row);
			}
		}
		return added;
	},
	getSelectedRows : function() {
		var rows = this._grid.ligerGetGridManager().getSelectedRowsIndex();
		return rows;
	},
	updateRow : function() {
		var rows = jQuery(this._grid.ligerGetGridManager().getCheckedRowObjs());
		this.grid.applyEditor(rows.children(":first").next());
	},
	/**
	 * 初始化渲染方法 仅在第一次调用render时执行
	 */
	initRender : function() {

	},

	// 渲染前处理方法
	beforeRender : function() {

	},

	// 渲染方法
	render : function() {
		if (this._grid) {
			this._grid.remove();
		}
		var columns = this.getColumns();
		var refData = this.getRefData()
		var formateColumn = [];
		var names = [];
		for (var i = 0; i < columns.length; i++) {
			var column = columns[i];
			var bindDataField = column.bindDataField;
			var editor = {
				type : column.visbleType,
				validator : 'number'
			};
			if (column.visbleType == 'select') {
				var ref = refData[bindDataField].data;
				editor.options = {
					width : 100,
					textField : "name",
					valueField : "value",
					data : ref,
					// isMultiSelect: true,
					isNotShowClear : true
				}
			}
			formateColumn.push({
				editor : editor,
				display : columns[i].caption,
				name : bindDataField,
				width : columns[i].width || 100
			})
			names.push(column.bindDataField)
		}
		var data = this.getGridData();
		var formateData = [];
		for (var i = 0; i < data.length; i++) {
			var obj = {};
			for (var j = 0; j < names.length; j++) {
				var d = data[i].data[names[j]];
				if (d) {
					obj[names[j]] = d.value
				}
			}
			formateData.push(obj);
		}

		this._grid = $('<div></div>');
		var that = this;
		$("body").append(this._grid);
		//this.getDomInstance().append(this._grid);
		this.grid = this._grid.ligerGrid({
			title : this.getTitle(),
			checkbox : this.getCheckbox(),
			columns : formateColumn,
			data : {
				Rows : formateData,
				Total : this.getTotal()
			},
			useClientPage : true,
			width : this.getWidth(),
			height : this.getHeight(),
			isScroll : false,
			onCheckRow : this.onCheckRow,
			pageSizeOptions : [ 5, 10, 15, 20 ],
			enabledEdit : true,
			dblClickToEdit : true,
			pageSize : this.getPageSize(),
			page : this.getPage(),
			onToNext : function(e) {
				that.onToNext(e);
			},
			onToPrev : function(e) {
				that.onToPrev(e);
			},
			onToFirst : function(e) {
				that.onToFirst(e);
			},
			onToLast : function(e) {
				that.onToLast(e);
			}
		});

	},

	// 渲染后处理方法
	afterRender : function() {
		
	},

	// ----------必须实现----------
	getData : function() {
		return {
			cid : this.getCid()
		};
	},

	// ----------必须实现----------
	setData : function(data) {
		this.setCid(data.cid);
	},

	onSelectRow : function(callBack) {
		this._onSelectRow = callBack;
	},
	onCheckRow : function(callBack) {
		this._onCheckRoww = callBack;
	}

};
wis.widget.Grid = function() {
	this._version = '1.0';

};

wis.widget.Grid.prototype = {
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
	_onReload : null,
	_onToFirst : null,
	_onToPrev : null,
	_onToNext : null,
	_onToLast : null,
	_onSelectRow : null,
	_onUnSelectRow : null,
	_onCheckRow : null,
	_onAfterEdit : null, // TODO
	_onBeforeEdit : null, // TODO
	_onCurPageEnter : null, // TODO
	_onSelectChange : null, // TODO
	_onBeforeCheckRow : null,// TODO
	_onDblClickRow : null, // TODO
	_onBeforeCheckAllRow : null, // TODO
	_onCheckAllRow : null, // TODO
	_onPageSizeChange : null,
	_addRow : null,
	_deleteRow : null,
	_getGridData : null,
	_setGridData : null,
	_getChange : null,
	_getSelectedRow : null,
	_getSelectedRowObj : null,
	_refData : null,
	_grid : null,
	_state : null,

	onToFirst : function(callback) {
		this._onToFirst = callback;
	},
	onToPrev : function(callback) {
		this._onToPrev = callback;
	},
	onToNext : function(callback) {
		this._onToNext = callback;
	},
	onToLast : function(callback) {
		this._onToLast = callback;
	},
	onUnSelectRow : function(callback) {
		this._onUnSelectRow = callback;
	},

	getState : function() {
		return this._state;
	},

	setState : function(state) {
		this._state = state;
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
		return this._total || 0;
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
		this.setOptions(data);
	},

	setOptions : function(data) {
		if (data.name) {
			this.setTitle(data.name);
		}
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
		if (data.page) {
			this.setPage(data.page)
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
		if (data.onReload) {
			this.onReload = data.onReload;
		}
		if (data.onSelectRow) {
			this._onSelectRow = data.onSelectRow;
		}
		if (data.onCheckRow) {
			this._onCheckRow = data.onCheckRow;
		}
		if (data.onSelectRow) {
			this._onSelectRow = data.onSelectRow;
		}
		if (data.onToFirst) {
			this._onToFirst = data.onToFirst;
		}
		if (data.onToLast) {
			this._onToLast = data.onToLast;
		}
		if (data.onToPrev) {
			this._onToPrev = data.onToPrev;
		}
		if (data.onToNext) {
			this._onToNext = data.onToNext;
		}
		if (data.onPageSizeChange) {
			this._onPageSizeChange = data.onPageSizeChange;
		}
		if (data.state) {
			this.setState(data.state);
		}
	},

	addRow : function() {
		jQuery(this.getDomInstance()).grid('addRow');
		jQuery(this.getDomInstance()).grid('editRow', 0);
	},
	getCurrentData : function() {
		return jQuery(this.getDomInstance()).grid('getSelectedRowData');
	},
	getCurrentAddData : function() {
		return jQuery(this.getDomInstance()).grid('option').addedRow;
	},
	getSelectedRows : function() {
		return jQuery(this.getDomInstance()).grid('option').checkedRowIndex
	},
	getCheckIndex : function() {
		return jQuery(this.getDomInstance()).grid('option').checkedRowIndex;
	},
	getCheckData : function() {
		return jQuery(this.getDomInstance()).grid('getCheckedRowData');
	},
	updateRow : function(data) {
		jQuery(this.getDomInstance())
				.grid('editRow', this.getSelectedRows()[0]);
	},

	onSelectRow : function(callback) {
		this._onSelectRow = callback;
	},
	onCheckRow : function(callback) {
		this._onCheckRow = callback;

	},
	onReload : function(callback) {
		this._onReload = callback;
	},
	
	getActiveRowIndex : function() {
		return jQuery(this.getDomInstance()).grid('option').activeRowIndex
	},

	/**
	 * 初始化渲染方法 仅在第一次调用render时执行
	 */
	_initRender : function() {

	},

	// 渲染前处理方法
	_beforeRender : function() {

	},

	// 渲染方法
	render : function() {
		var columns = this.getColumns();
		var refData = this.getRefData()
		if (columns) {
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
			var formateData = [];
			var data = this.getGridData();
			if (data) {
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
			}
		}

		var that = this;
		jQuery(this.getDomInstance()).grid({
			title : this.getTitle(),
			width : this.getWidth() || 400,
			height : this.getHeight() || 150,
			// activeRowIndex : 2,
			// checkedRowIndex : [ 1, 2 ],
			totalRecord : this.getTotal(),
			headHeight : this.getHeaderRowHeight() || 20,
			rowHeight : this.getRowHeight() || 20,
			usePage : this.getUsePage(),
			useCheckColumn : this.getCheckbox() || true,
			mode : this.getState() ? this.getState() : 'edit',
			gridData : formateData,
			columns : this.getGridColumnDefine(columns),
			pageNo : this.getPage(),
			pageSize: this.getPageSize(),
			onReload : function() {
				if (that._onSelectRow != null) {
					that._onReload();
				}
			},
			onSelectRow : function(e, data) {
				if (that._onSelectRow != null) {
					that._onSelectRow(data);
				}
			},
			onUnselectRow : function() {
				if (that._onUnSelectRow != null) {
					that._onUnSelectRow(data);
				}

			},
			onCheckRow : function(e, data) {
				if (that._onCheckRow != null) {
					console.log(data);
					that._onCheckRow(data);
				}
			},
			onFirstPage : function() {
				if (that._onToFirst != null) {
					that._onToFirst();
				}
			},
			onLastPage : function() {
				if (that._onToLast != null) {
					that._onToLast();
				}

			},
			onNextPage : function() {
				if (that._onToNext != null) {
					that._onToNext();
				}
			},
			onPrevPage : function() {
				if (that._onToPrev != null) {
					that._onToPrev();
				}
			},
			onPageSizeChange : function(e, data) {
				if (that._onPageSizeChange != null) {
					that._onPageSizeChange(data);
				}
			}
		});

	},

	getGridColumnDefine : function(columns) {
		var convertColumns = [];
		if (columns) {
			for (var i = 0; i < columns.length; i++) {
				var c = columns[i];
				var column = {
					title : c.caption,
					name : c.bindDataField,
					width : c.width,
					lock : c.isPin || false
				};
				convertColumns.push(column);
			}
		}
		return convertColumns;
	},
	// 渲染后处理方法
	_afterRender : function() {

	},

	// ----------必须实现----------
	getData : function() {
		return {

		};
	},

	// ----------必须实现----------
	setData : function(data) {

	}

}